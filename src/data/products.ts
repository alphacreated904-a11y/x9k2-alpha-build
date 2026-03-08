import vegImage from "@/assets/product-vegetables.jpg";
import fruitImage from "@/assets/product-fruits.jpg";
import honeyImage from "@/assets/product-honey.jpg";
import breadImage from "@/assets/product-bread.jpg";

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

export const ALL_PRODUCTS: Product[] = [
  // Seeds
  {
    id: "s1", name: "Hybrid Tomato Seeds – Arka Rakshak", brand: "Syngenta", category: "seeds",
    basePrice: 850, originalPrice: 1100, image: vegImage, images: [vegImage, fruitImage, honeyImage],
    tag: "Bestseller", rating: 4.7, reviewCount: 342, units: SEED_UNITS, sku: "SYN-TOM-001",
    description: "High-yield hybrid tomato seeds with excellent disease resistance. Suitable for Rabi & Kharif seasons.",
    specs: [
      { label: "Germination", value: "85–90%" }, { label: "Season", value: "Rabi / Kharif" },
      { label: "Maturity", value: "60–65 days" }, { label: "Yield", value: "40–50 tons/ha" },
    ],
    crops: ["Tomato"], pests: ["Leaf Curl Virus", "Late Blight"],
  },
  {
    id: "s2", name: "BG-II Bt Cotton Seeds", brand: "Mahyco", category: "seeds",
    basePrice: 960, originalPrice: 1200, image: breadImage, images: [breadImage, vegImage],
    tag: "New", rating: 4.5, reviewCount: 188, units: SEED_UNITS, sku: "MAH-COT-002",
    description: "Bt cotton seeds with bollworm resistance. Ideal for rainfed and irrigated conditions.",
    specs: [
      { label: "Technology", value: "BG-II Bollguard" }, { label: "Duration", value: "150–160 days" },
      { label: "Plant Type", value: "Semi-compact" }, { label: "Boll Weight", value: "4.5–5 g" },
    ],
    crops: ["Cotton"], pests: ["Bollworm"],
  },
  {
    id: "s3", name: "Paddy Seeds – Pusa Basmati 1121", brand: "IARI", category: "seeds",
    basePrice: 380, originalPrice: 480, image: honeyImage, images: [honeyImage, vegImage],
    rating: 4.8, reviewCount: 521, units: SEED_UNITS, sku: "IAR-PAD-003",
    description: "Premium basmati paddy seeds known for extra-long grain and aromatic quality.",
    specs: [
      { label: "Grain Type", value: "Extra Long" }, { label: "Duration", value: "135–145 days" },
      { label: "Yield", value: "45–50 q/ha" }, { label: "Aroma", value: "Strong" },
    ],
    crops: ["Paddy", "Rice"], pests: ["Blast", "BPH"],
  },
  {
    id: "s4", name: "Hybrid Chilli Seeds – NS 1701", brand: "Namdhari Seeds", category: "seeds",
    basePrice: 1250, originalPrice: 1600, image: fruitImage, images: [fruitImage, vegImage],
    tag: "Hot Seller", rating: 4.6, reviewCount: 176, units: SEED_UNITS, sku: "NAM-CHL-004",
    description: "Hybrid green chilli seeds for high pungency and excellent yield potential.",
    specs: [
      { label: "Fruit Length", value: "10–12 cm" }, { label: "Pungency", value: "High" },
      { label: "Duration", value: "120 days" }, { label: "Yield", value: "15–20 tons/ha" },
    ],
    crops: ["Chilli"], pests: ["Thrips", "Mites"],
  },

  // Crop Protection
  {
    id: "cp1", name: "Imidacloprid 17.8% SL – Confidor", brand: "Bayer", category: "crop-protection",
    basePrice: 520, originalPrice: 650, image: honeyImage, images: [honeyImage, vegImage, breadImage],
    tag: "Top Rated", rating: 4.9, reviewCount: 678, units: LIQUID_UNITS, sku: "BAY-IMI-001",
    description: "Systemic insecticide for control of sucking pests in cotton, rice, and vegetables.",
    specs: [
      { label: "Active Ingredient", value: "Imidacloprid 17.8% SL" }, { label: "Dosage", value: "0.5 ml/L water" },
      { label: "Target Pests", value: "Aphids, Jassids, Whitefly" }, { label: "PHI", value: "14 days" },
    ],
    crops: ["Cotton", "Rice", "Vegetables"], pests: ["Aphids", "Jassids", "Whitefly"],
  },
  {
    id: "cp2", name: "Mancozeb 75% WP – Dithane M-45", brand: "UPL", category: "crop-protection",
    basePrice: 450, originalPrice: 560, image: breadImage, images: [breadImage, honeyImage],
    rating: 4.4, reviewCount: 412, units: SEED_UNITS, sku: "UPL-MAN-002",
    description: "Broad-spectrum contact fungicide for preventive control of fungal diseases.",
    specs: [
      { label: "Active Ingredient", value: "Mancozeb 75% WP" }, { label: "Dosage", value: "2–2.5 g/L water" },
      { label: "Target Diseases", value: "Late Blight, Downy Mildew" }, { label: "Mode", value: "Contact / Preventive" },
    ],
    crops: ["Potato", "Tomato", "Grapes"], pests: ["Late Blight", "Downy Mildew"],
  },
  {
    id: "cp3", name: "Chlorpyrifos 20% EC", brand: "Gharda", category: "crop-protection",
    basePrice: 380, originalPrice: 480, image: vegImage, images: [vegImage, honeyImage],
    tag: "Value Pack", rating: 4.3, reviewCount: 295, units: LIQUID_UNITS, sku: "GHA-CHL-003",
    description: "Broad-spectrum organophosphate insecticide for soil and foliar application.",
    specs: [
      { label: "Active Ingredient", value: "Chlorpyrifos 20% EC" }, { label: "Dosage", value: "2.5 ml/L water" },
      { label: "Target Pests", value: "Termites, Cutworms, Borers" }, { label: "Application", value: "Foliar / Soil drench" },
    ],
    crops: ["Sugarcane", "Wheat", "Maize"], pests: ["Termites", "Cutworms", "Borers"],
  },

  // Nutrition
  {
    id: "n1", name: "DAP Fertilizer 18-46-0", brand: "IFFCO", category: "nutrition",
    basePrice: 1350, originalPrice: 1600, image: breadImage, images: [breadImage, vegImage, honeyImage],
    tag: "Essential", rating: 4.6, reviewCount: 892, units: NUTRITION_UNITS, sku: "IFF-DAP-001",
    description: "Di-ammonium phosphate fertilizer providing nitrogen and phosphorus for healthy root development.",
    specs: [
      { label: "NPK Ratio", value: "18-46-0" }, { label: "Application", value: "Basal dose" },
      { label: "Dosage", value: "100–125 kg/ha" }, { label: "Form", value: "Granular" },
    ],
    crops: ["All Crops"], pests: [],
  },
  {
    id: "n2", name: "Urea 46% N", brand: "NFL", category: "nutrition",
    basePrice: 267, originalPrice: 320, image: honeyImage, images: [honeyImage],
    rating: 4.5, reviewCount: 1204, units: NUTRITION_UNITS, sku: "NFL-URE-002",
    description: "High-nitrogen fertilizer for vegetative growth. Apply as top dressing in split doses.",
    specs: [
      { label: "Nitrogen", value: "46%" }, { label: "Form", value: "Prilled / Neem-coated" },
      { label: "Dosage", value: "60–100 kg/ha" }, { label: "Application", value: "Top dressing" },
    ],
    crops: ["All Crops"], pests: [],
  },
  {
    id: "n3", name: "Potash MOP 60% K₂O", brand: "IPL", category: "nutrition",
    basePrice: 1750, originalPrice: 2100, image: vegImage, images: [vegImage, breadImage],
    tag: "Premium", rating: 4.4, reviewCount: 376, units: NUTRITION_UNITS, sku: "IPL-MOP-003",
    description: "Muriate of Potash for improved fruit quality, disease resistance, and water-use efficiency.",
    specs: [
      { label: "K₂O Content", value: "60%" }, { label: "Form", value: "Crystalline" },
      { label: "Dosage", value: "50–100 kg/ha" }, { label: "Application", value: "Basal / Top dressing" },
    ],
    crops: ["Fruits", "Vegetables", "Sugarcane"], pests: [],
  },

  // Equipment
  {
    id: "e1", name: "Knapsack Sprayer 16L – Manual", brand: "Aspee", category: "equipment",
    basePrice: 1850, originalPrice: 2400, image: fruitImage, images: [fruitImage, vegImage, honeyImage],
    tag: "Popular", rating: 4.7, reviewCount: 564, units: EQUIP_UNITS, sku: "ASP-SPR-001",
    description: "Heavy-duty manual knapsack sprayer with brass nozzles for uniform coverage.",
    specs: [
      { label: "Tank Capacity", value: "16 Litres" }, { label: "Pump Type", value: "Manual Piston" },
      { label: "Nozzle", value: "4 brass nozzles" }, { label: "Weight (empty)", value: "3.2 kg" },
    ],
    crops: ["All Crops"], pests: [],
  },
  {
    id: "e2", name: "Battery Sprayer 12V – 16L", brand: "Neptune", category: "equipment",
    basePrice: 3200, originalPrice: 4000, image: breadImage, images: [breadImage, fruitImage],
    tag: "Best Value", rating: 4.5, reviewCount: 231, units: EQUIP_UNITS, sku: "NEP-BSP-002",
    description: "Rechargeable battery-powered sprayer for effortless pest control over large areas.",
    specs: [
      { label: "Battery", value: "12V / 8Ah" }, { label: "Tank", value: "16 Litres" },
      { label: "Pressure", value: "2–4 Bar" }, { label: "Runtime", value: "3–4 hours" },
    ],
    crops: ["All Crops"], pests: [],
  },
];

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
