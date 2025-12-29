import { Link } from "react-router-dom";
import { Plane, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="pt-8 pb-6 px-4">
      <div className="flex items-start justify-between max-w-3xl mx-auto">
        <div className="text-center flex-1">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
            <Plane className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Select Extra Services
          </h1>
          <p className="mt-2 text-muted-foreground max-w-md mx-auto">
            Customize your flight experience with our premium add-ons
          </p>
        </div>
        <Link to="/admin">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Settings className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </header>
  );
};
