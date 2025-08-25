import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";

export const WishlistCard = () => {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg">
      <Image
        src={"/placeholder.svg"}
        alt="example"
        className="w-15 h-15 rounded-md object-cover"
        width={60}
        height={60}
      />
      <div className="flex-1">
        <h3 className="font-medium">Premium Laptop Stand</h3>
        <p className="text-lg font-semibold text-primary">$79.99</p>
      </div>
      <div className="flex gap-2">
        <InteractiveHoverButton icon={<Plus size={18} />}>
          Add to Cart
        </InteractiveHoverButton>
        <InteractiveHoverButton
          icon={<Trash size={18} />}
          className="bg-destructive text-white"
        >
          Remove
        </InteractiveHoverButton>
      </div>
    </div>
  );
};
