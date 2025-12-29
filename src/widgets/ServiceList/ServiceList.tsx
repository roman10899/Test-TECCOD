import { Service } from "@/entities/service";
import { ServiceCard } from "@/widgets/ServiceCard/ServiceCard";

interface ServiceListProps {
  services: Service[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export const ServiceList = ({ services, selectedIds, onToggle }: ServiceListProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => (
        <div
          key={service.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <ServiceCard
            service={service}
            isSelected={selectedIds.includes(service.id)}
            onToggle={onToggle}
          />
        </div>
      ))}
    </div>
  );
};
