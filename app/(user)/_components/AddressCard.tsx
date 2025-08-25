import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Trash, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const AddressCard = () => {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">Home Address</h3>
        <Badge variant="outline">Default</Badge>
      </div>
      <p className="text-sm text-muted-foreground">
        123 Main Street
        <br />
        San Francisco, CA 94102
        <br />
        United States
      </p>
      <div className="flex gap-2 mt-3">
        <InteractiveHoverButton icon={<Pencil size={18}/>}>Edit</InteractiveHoverButton>
        <InteractiveHoverButton
          icon={<Trash size={18}/>}
          className="bg-destructive text-white"
        >
          Remove
        </InteractiveHoverButton>
      </div>
    </div>
  );
};
