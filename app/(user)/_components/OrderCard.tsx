import { Badge } from "@/components/ui/badge";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

export const OrderCard = () => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-2">
          <span className="font-medium">#ORD-2024-001</span>
          <Badge variant="default">Delivered</Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-1">
          Wireless Headphones, Phone Case
        </p>
        <p className="text-xs text-muted-foreground">Jan 10, 2024</p>
      </div>
      <div className="text-right">
        <p className="font-semibold">$89.99</p>
        <InteractiveHoverButton className="mt-2 bg-transparent">
          View Details
        </InteractiveHoverButton>
      </div>
    </div>
  );
};
