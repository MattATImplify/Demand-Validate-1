
import { pgTable, text, serial, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  interestLevel: text("interest_level").notNull(), // 'day_pass', 'part_time', 'full_time'
  comments: text("comments"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertLeadSchema = createInsertSchema(leads).omit({ 
  id: true, 
  createdAt: true 
}).extend({
  email: z.string().email(),
  interestLevel: z.enum(['day_pass', 'part_time', 'full_time', 'other'])
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;

export const pricingPlans = [
  {
    id: 'day_pass',
    name: 'Day Pass',
    price: '£20',
    frequency: '/ day',
    description: 'Perfect for the occasional escape from the kitchen table.',
    features: ['Hot desk access', 'High-speed Wi-Fi', 'Unlimited coffee', '9am - 5pm access']
  },
  {
    id: 'part_time',
    name: 'Part-Time',
    price: '£150',
    frequency: '/ month',
    description: '10 days a month. Ideal for hybrid workers.',
    features: ['Guaranteed desk', 'Meeting room credits', 'Locker storage', '24/7 access option']
  },
  {
    id: 'full_time',
    name: 'Full-Time',
    price: '£250',
    frequency: '/ month',
    description: 'Your dedicated desk. Leave your monitor here.',
    features: ['Dedicated desk', 'Business address', 'Priority meeting room', '24/7 access included']
  }
];
