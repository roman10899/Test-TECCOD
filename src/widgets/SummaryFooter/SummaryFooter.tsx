import { ArrowRight, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryFooterProps {
  itemCount: number;
  totalPrice: number;
  onContinue: () => void;
}

export const SummaryFooter = ({ itemCount, totalPrice, onContinue }: SummaryFooterProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card shadow-footer border-t border-border">
      <div className="container max-w-5xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Summary info */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingBag className="w-6 h-6 text-muted-foreground" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center bg-primary text-primary-foreground text-xs font-bold rounded-full animate-scale-in">
                  {itemCount}
                </span>
              )}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm text-muted-foreground">
                {itemCount === 0
                  ? "No services selected"
                  : `${itemCount} ${itemCount === 1 ? "service" : "services"} selected`}
              </p>
            </div>
          </div>

          {/* Total and CTA */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="text-right">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Total</p>
              <p className={cn(
                "text-xl sm:text-2xl font-bold transition-all duration-200",
                totalPrice > 0 ? "text-foreground" : "text-muted-foreground"
              )}>
                ${totalPrice}
              </p>
            </div>

            <button
              onClick={onContinue}
              className={cn(
                "inline-flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 rounded-lg",
                "font-semibold text-sm sm:text-base",
                "transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                totalPrice > 0
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
              disabled={totalPrice === 0}
            >
              <span className="hidden sm:inline">Continue to Payment</span>
              <span className="sm:hidden">Continue</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
