import vegImage from "@/assets/product-vegetables.webp";
import fruitImage from "@/assets/product-fruits.webp";
import honeyImage from "@/assets/product-honey.webp";
import breadImage from "@/assets/product-bread.webp";
import actaraImage from "@/assets/product-actara.webp";

export interface UnitOption {
  label: string;
  multiplier: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: "seeds" | "crop-protection" | "nutrition" | "equipment";
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
  specs: { label: string; value: string }[];
  crops: string[];
  pests: string[];
}

const SEED_UNITS: UnitOption[] = [
  { label: "1 kg", multiplier: 1 },
  { label: "500 g", multiplier: 0.55 },
  { label: "250 g", multiplier: 0.3 },
  { label: "100 g", multiplier: 0.15 },
];

const LIQUID_UNITS: UnitOption[] = [
  { label: "1 L", multiplier: 1 },
  { label: "500 ml", multiplier: 0.55 },
  { label: "250 ml", multiplier: 0.3 },
];

const EQUIP_UNITS: UnitOption[] = [
  { label: "1 pc", multiplier: 1 },
];

const NUTRITION_UNITS: UnitOption[] = [
  { label: "25 kg", multiplier: 1 },
  { label: "10 kg", multiplier: 0.45 },
  { label: "5 kg", multiplier: 0.25 },
];

export const ALL_PRODUCTS: Product[] = [];
export const CATEGORIES = [
  { id: "seeds", name: "Seeds", description: "Hybrid & open-pollinated seeds for all crops" },
  { id: "crop-protection", name: "Crop Protection", description: "Insecticides, fungicides & herbicides" },
  { id: "nutrition", name: "Nutrition", description: "Fertilizers, micronutrients & growth promoters" },
  { id: "equipment", name: "Equipment", description: "Sprayers, tools & farm machinery" },
];

export const BRANDS = [
  { id: "syngenta", label: "Syngenta", count: 3 },
  { id: "bayer", label: "Bayer", count: 4 },
  { id: "upl", label: "UPL", count: 5 },
  { id: "iffco", label: "IFFCO", count: 3 },
  { id: "mahyco", label: "Mahyco", count: 2 },
  { id: "aspee", label: "Aspee", count: 2 },
  { id: "namdhari", label: "Namdhari Seeds", count: 2 },
];

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
