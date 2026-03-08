import React from "react";

interface CategoryCardProps {
  name: string;
  icon: React.ReactNode;
  count: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, icon, count }) => {
  return (
    <button className="card-hover flex flex-col items-center gap-3 rounded-2xl bg-card p-6 md:p-8 text-center transition-all duration-200 hover:bg-secondary/50 border-0">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/8 text-primary">
        {icon}
      </div>
      <span className="font-semibold text-foreground text-sm">{name}</span>
      <span className="text-xs text-muted-foreground">{count} products</span>
    </button>
  );
};

export { CategoryCard };
