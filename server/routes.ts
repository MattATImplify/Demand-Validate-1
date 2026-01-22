import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Basic Auth Middleware for Admin
  const adminAuth = (req: any, res: any, next: any) => {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      // If no password set in env, allow access but log warning
      console.warn("ADMIN_PASSWORD not set, admin routes are public");
      return next();
    }

    const providedPassword = req.headers['x-admin-password'];
    if (providedPassword === adminPassword) {
      return next();
    }

    res.status(401).json({ message: "Unauthorized" });
  };

  // Create a lead
  app.post(api.leads.create.path, async (req, res) => {
    try {
      console.log("Received lead submission:", req.body);
      const input = api.leads.create.input.parse(req.body);
      const lead = await storage.createLead(input);
      console.log("Lead created successfully:", lead.id);
      res.status(201).json(lead);
    } catch (err) {
      console.error("Error creating lead:", err);
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // List leads (Protected)
  app.get(api.leads.list.path, adminAuth, async (req, res) => {
    const leads = await storage.getLeads();
    res.json(leads);
  });

  // Get stats (Protected)
  app.get(api.leads.getStats.path, adminAuth, async (req, res) => {
    const leads = await storage.getLeads();
    const stats = {
      total: leads.length,
      byInterest: leads.reduce((acc, lead) => {
        acc[lead.interestLevel] = (acc[lead.interestLevel] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };
    res.json(stats);
  });

  // Seed data if empty (Slightly safer for serverless)
  if (process.env.NODE_ENV !== "production") {
    try {
      const leads = await storage.getLeads();
      if (leads.length === 0) {
        console.log("Seeding database with initial leads...");
        await storage.createLead({
          name: "Sarah Jenkins",
          email: "sarah.j@example.com",
          interestLevel: "full_time",
          comments: "Looking for a quiet place away from the kids!"
        });
      }
    } catch (err) {
      console.error("Failed to seed database:", err);
    }
  }

  return httpServer;
}
