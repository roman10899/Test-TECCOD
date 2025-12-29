import { supabase } from "@/lib/supabase";
import type { Service } from "./types";

export async function getServices(): Promise<Service[]> {
  try {
    const { data, error } = await supabase.from("services").select("*");
    if (error) throw error;
    return (data as Service[]) ?? [];
  } catch (err) {
    console.error("Failed to fetch services from Supabase:", err);
    return [];
  }
}

export async function addService(service: Omit<Service, "id">): Promise<Service | null> {
  try {
    const payload = { ...service, id: `service-${Date.now()}` };
    const { data, error } = await supabase.from("services").insert(payload).select().single();
    if (error) throw error;
    return data as Service;
  } catch (err) {
    console.error("Failed to add service to Supabase:", err);
    return null;
  }
}

export async function deleteService(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) throw error;
    return true;
  } catch (err) {
    console.error("Failed to delete service from Supabase:", err);
    return false;
  }
}
