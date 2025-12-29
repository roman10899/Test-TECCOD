import { Check, Plus } from "lucide-react";
import { Service } from "@/entities/service";
import { ServiceIcon } from "@/shared/ui/ServiceIcon";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export const ServiceCard = ({ service, isSelected, onToggle }: ServiceCardProps) => {
  return (
    <button
      onClick={() => onToggle(service.id)}
      className={cn(
        "group relative w-full text-left",
        "p-5 rounded-lg transition-all duration-200",
        "bg-card shadow-card hover:shadow-card-hover",
        "border-2 border-transparent",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        isSelected && "bg-card-selected border-card-selected-border"
      )}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={cn(
            "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center",
            "transition-colors duration-200",
            isSelected
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground group-hover:text-foreground"
          )}
        >
          <ServiceIcon name={service.icon} size={22} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground leading-tight">
                {service.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {service.description}
              </p>
            </div>
            
            {/* Price */}
            <span className="flex-shrink-0 text-lg font-bold text-price">
              ${service.price}
            </span>
          </div>

          {/* Action indicator */}
          <div className="mt-3 flex items-center justify-end">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium",
                "transition-all duration-200",
                isSelected
                  ? "bg-success text-success-foreground animate-check-bounce"
                  : "bg-secondary text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground"
              )}
            >
              {isSelected ? (
                <>
                  <Check size={16} />
                  Selected
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Add
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
};
