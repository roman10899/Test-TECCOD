import { 
  Armchair, 
  UserCheck, 
  Wine, 
  UtensilsCrossed, 
  Luggage, 
  Shield,
  LucideIcon
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Armchair,
  UserCheck,
  Wine,
  UtensilsCrossed,
  Luggage,
  Shield,
};

interface ServiceIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const ServiceIcon = ({ name, className, size = 24 }: ServiceIconProps) => {
  const Icon = iconMap[name];
  
  if (!Icon) {
    return null;
  }
  
  return <Icon className={className} size={size} />;
};
