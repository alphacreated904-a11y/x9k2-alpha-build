import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface UnitOption {
  label: string;
  multiplier: number;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export type ProductCategory =
  | "insecticides"
  | "fungicides"
  | "herbicides"
  | "pgr"
  | "fertilizers"
  | "seeds"
  | "bio-pesticides"
  | "equipment";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  basePrice: number;
  originalPrice: number;
  image: string;
  images: string[];
  tag?: string;
  rating: number;
  reviewCount: number;
  units: UnitOption[];
  sku: string;
  description: string;
  specs: ProductSpec[];
  crops: string[];
  pests: string[];
  createdAt?: string;
}

interface DbProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  base_price: number;
  original_price: number;
  image_url: string;
  images: string[];
  tag: string | null;
  rating: number;
  review_count: number;
  units: unknown;
  sku: string;
  description: string;
  specs: unknown;
  crops: string[];
  pests: string[];
  created_at: string;
}

function mapDbToProduct(row: DbProduct): Product {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    category: row.category as Product["category"],
    basePrice: Number(row.base_price),
    originalPrice: Number(row.original_price),
    image: row.image_url,
    images: row.images || [row.image_url],
    tag: row.tag || undefined,
    rating: Number(row.rating),
    reviewCount: row.review_count,
    units: (row.units as UnitOption[]) || [],
    sku: row.sku,
    description: row.description,
    specs: (row.specs as ProductSpec[]) || [],
    crops: row.crops || [],
    pests: row.pests || [],
    createdAt: row.created_at,
  };
}

function mapProductToDb(product: Partial<Product> & { id: string }) {
  const row: Record<string, unknown> = { id: product.id };
  if (product.name !== undefined) row.name = product.name;
  if (product.brand !== undefined) row.brand = product.brand;
  if (product.category !== undefined) row.category = product.category;
  if (product.basePrice !== undefined) row.base_price = product.basePrice;
  if (product.originalPrice !== undefined) row.original_price = product.originalPrice;
  if (product.image !== undefined) row.image_url = product.image;
  if (product.images !== undefined) row.images = product.images;
  if (product.tag !== undefined) row.tag = product.tag || null;
  if (product.rating !== undefined) row.rating = product.rating;
  if (product.reviewCount !== undefined) row.review_count = product.reviewCount;
  if (product.units !== undefined) row.units = product.units;
  if (product.sku !== undefined) row.sku = product.sku;
  if (product.description !== undefined) row.description = product.description;
  if (product.specs !== undefined) row.specs = product.specs;
  if (product.crops !== undefined) row.crops = product.crops;
  if (product.pests !== undefined) row.pests = product.pests;
  return row;
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data as unknown as DbProduct[]).map(mapDbToProduct);
    },
  });
}

export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async (): Promise<Product | null> => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data ? mapDbToProduct(data as unknown as DbProduct) : null;
    },
    enabled: !!id,
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (product: Product) => {
      const row = mapProductToDb(product);
      const { error } = await supabase.from("products").insert(row as any);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product created successfully");
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (product: Partial<Product> & { id: string }) => {
      const row = mapProductToDb(product);
      const { id, ...rest } = row;
      const { error } = await supabase.from("products").update(rest as any).eq("id", id as string);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product updated successfully");
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted");
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export interface CategoryDef {
  id: ProductCategory;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  icon: string; // lucide icon key — resolved in components
}

export const CATEGORIES: CategoryDef[] = [
  { id: "insecticides", name: "Insecticides", nameHi: "कीटनाशक", description: "Control sucking, chewing & boring pests", descriptionHi: "रस चूसने व काटने वाले कीटों का नियंत्रण", icon: "bug" },
  { id: "fungicides", name: "Fungicides", nameHi: "फफूंदनाशक", description: "Prevent & cure fungal diseases", descriptionHi: "फफूंद रोगों की रोकथाम व उपचार", icon: "sprout" },
  { id: "herbicides", name: "Herbicides", nameHi: "खरपतवारनाशक", description: "Selective & non-selective weed control", descriptionHi: "चयनात्मक व गैर-चयनात्मक खरपतवार नियंत्रण", icon: "leaf" },
  { id: "pgr", name: "Plant Growth Regulators", nameHi: "वृद्धि नियंत्रक", description: "Hormones & biostimulants for growth", descriptionHi: "वृद्धि के लिए हार्मोन व जैव-उत्तेजक", icon: "trending-up" },
  { id: "fertilizers", name: "Fertilizers", nameHi: "उर्वरक", description: "Macro, micro & water-soluble nutrition", descriptionHi: "मुख्य, सूक्ष्म व पानी में घुलनशील पोषण", icon: "beaker" },
  { id: "seeds", name: "Seeds", nameHi: "बीज", description: "Hybrid & open-pollinated varieties", descriptionHi: "हाइब्रिड व खुले परागित बीज", icon: "wheat" },
  { id: "bio-pesticides", name: "Bio-Pesticides", nameHi: "जैव कीटनाशक", description: "Eco-friendly biological pest control", descriptionHi: "पर्यावरण-अनुकूल जैविक नियंत्रण", icon: "shield" },
  { id: "equipment", name: "Equipment", nameHi: "उपकरण", description: "Sprayers, tools & farm machinery", descriptionHi: "स्प्रेयर, उपकरण व कृषि मशीनरी", icon: "wrench" },
];

// Brands are dynamically computed from listed products. Empty until products are added.
export const BRANDS: { id: string; label: string; count: number }[] = [];

export const CROP_TYPES = [
  { id: "cotton", label: "Cotton", count: 8 },
  { id: "rice", label: "Rice / Paddy", count: 12 },
  { id: "tomato", label: "Tomato", count: 6 },
  { id: "chilli", label: "Chilli", count: 4 },
  { id: "sugarcane", label: "Sugarcane", count: 5 },
  { id: "vegetables", label: "Vegetables", count: 14 },
];

export const PEST_TYPES = [
  { id: "aphids", label: "Aphids", count: 6 },
  { id: "whitefly", label: "Whitefly", count: 4 },
  { id: "bollworm", label: "Bollworm", count: 3 },
  { id: "late-blight", label: "Late Blight", count: 5 },
  { id: "thrips", label: "Thrips", count: 4 },
  { id: "termites", label: "Termites", count: 3 },
];
