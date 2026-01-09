import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertLead } from "@shared/routes";

export function useLeads() {
  return useQuery({
    queryKey: [api.leads.list.path],
    queryFn: async () => {
      const res = await fetch(api.leads.list.path);
      if (!res.ok) throw new Error("Failed to fetch leads");
      return api.leads.list.responses[200].parse(await res.json());
    },
  });
}

export function useLeadStats() {
  return useQuery({
    queryKey: [api.leads.getStats.path],
    queryFn: async () => {
      const res = await fetch(api.leads.getStats.path);
      if (!res.ok) throw new Error("Failed to fetch stats");
      return api.leads.getStats.responses[200].parse(await res.json());
    },
  });
}

export function useCreateLead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertLead) => {
      const res = await fetch(api.leads.create.path, {
        method: api.leads.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.leads.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to submit interest");
      }
      return api.leads.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.leads.list.path] });
      queryClient.invalidateQueries({ queryKey: [api.leads.getStats.path] });
    },
  });
}
