import { useState, useMemo, useCallback } from "react";
import { Service } from "@/entities/service";

export const useServiceSelection = (services: Service[]) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleService = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((serviceId) => serviceId !== id)
        : [...prev, id]
    );
  }, []);

  const totalPrice = useMemo(() => {
    return services
      .filter((service) => selectedIds.includes(service.id))
      .reduce((sum, service) => sum + service.price, 0);
  }, [services, selectedIds]);

  const selectedCount = selectedIds.length;

  return {
    selectedIds,
    toggleService,
    totalPrice,
    selectedCount,
  };
};
