import { toast } from "sonner";
import { useEffect, useState } from "react";
import { getServices } from "@/entities/service/api";
import { useServiceSelection } from "@/features/service-selection/useServiceSelection";
import { Header } from "@/widgets/Header/Header";
import { ServiceList } from "@/widgets/ServiceList/ServiceList";
import { SummaryFooter } from "@/widgets/SummaryFooter/SummaryFooter";

const Index = () => {
  const [servicesList, setServicesList] = useState<any[]>([]);
  const { selectedIds, toggleService, totalPrice, selectedCount } =
    useServiceSelection(servicesList);

  useEffect(() => {
    let mounted = true;
    getServices().then((remote) => {
      if (mounted && remote && remote.length) setServicesList(remote);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const handleContinue = () => {
    toast.success("Proceeding to payment", {
      description: `${selectedCount} services selected for $${totalPrice}`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <div className="container max-w-5xl mx-auto">
        <Header />
        
        <main className="px-4 pb-8">
          <ServiceList
            services={servicesList}
            selectedIds={selectedIds}
            onToggle={toggleService}
          />
        </main>
      </div>

      <SummaryFooter
        itemCount={selectedCount}
        totalPrice={totalPrice}
        onContinue={handleContinue}
      />
    </div>
  );
};

export default Index;
