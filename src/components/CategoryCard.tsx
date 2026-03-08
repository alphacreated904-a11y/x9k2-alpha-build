import React from "react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  name: string;
  icon: React.ReactNode;
  count: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, icon, count }) => {
  return (
    <button className="card-hover flex flex-col items-center gap-3 rounded-xl bg-card p-6 text-center transition-all duration-200 hover:bg-secondary border-0 min-h-[44px]">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <span className="font-semibold text-foreground">{name}</span>
      <span className="text-sm text-muted-foreground">{count} products</span>
    </button>
  );
};

export { CategoryCard };
