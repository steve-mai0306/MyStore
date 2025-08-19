import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Plus, Heart } from "lucide-react";
import Image from "next/image";

export const WishlistCard = () => {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg">
      <Image
        src={"/placeholder.svg"}
        alt="example"
        className="w-15 h-15 rounded-md object-cover"
      />
      <div className="flex-1">
        <h3 className="font-medium">Premium Laptop Stand</h3>
        <p className="text-lg font-semibold text-primary">$79.99</p>
      </div>
      <div className="flex gap-2">
        <InteractiveHoverButton icon={<Plus />}>
          Add to Cart
        </InteractiveHoverButton>
        <InteractiveHoverButton icon={<Heart className="w-4 h-4" />}>
          Add
        </InteractiveHoverButton>
      </div>
    </div>
  );
};
