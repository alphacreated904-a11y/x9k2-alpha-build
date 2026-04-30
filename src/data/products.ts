import actaraImage from "@/assets/product-actara.webp";
import { SCRAPED_PRODUCTS } from "./scraped-products";
import {
  SEED_UNITS,
  LIQUID_UNITS,
  EQUIP_UNITS,
  NUTRITION_UNITS,
  GRANULE_UNITS,
} from "./product-units";

export interface UnitOption {
  label: string;
  multiplier: number;
}

export { SEED_UNITS, LIQUID_UNITS, EQUIP_UNITS, NUTRITION_UNITS, GRANULE_UNITS };

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

const GRANULE_UNITS: UnitOption[] = [
  { label: "250 g", multiplier: 1 },
  { label: "100 g", multiplier: 0.45 },
  { label: "50 g", multiplier: 0.25 },
];

export const ALL_PRODUCTS: Product[] = [
  {
    id: "syngenta-actara",
    name: "Syngenta Actara Insecticide",
    brand: "Syngenta",
    category: "crop-protection",
    basePrice: 550,
    originalPrice: 650,
    image: actaraImage,
    images: [actaraImage],
    tag: "Bestseller",
    rating: 4.5,
    reviewCount: 120,
    units: GRANULE_UNITS,
    sku: "SYN-ACT-001",
    description: `<p>Syngenta Actara, widely known as actara insecticide, is a powerful systemic solution designed to control a broad range of sucking and chewing pests such as aphids, jassids, and thrips across multiple crops.</p>
<p>This advanced insecticide is rapidly absorbed by plant leaves and moves throughout the plant via the vascular system, ensuring complete protection from pests.</p>
<h2>How Actara Insecticide Works</h2>
<p>Actara insecticide works by targeting the nervous system of insects, leading to quick pest elimination. Its systemic nature ensures that even newly growing plant parts remain protected.</p>
<p>The Wettable Granular (WG) formulation allows for easy mixing and convenient application through foliar spray, making it highly suitable for modern farming practices.</p>
<h2>Actara Insecticide Technical Name</h2>
<p>Thiamethoxam 25% WG</p>
<h2>Key Features and Benefits of Actara Insecticide</h2>
<h3>Fast Action</h3>
<p>Syngenta Actara begins working within hours of application, providing quick knockdown of harmful pests and reducing crop damage.</p>
<h3>Dual Application Flexibility</h3>
<p>Actara insecticide can be used both as a preventive and curative treatment, giving farmers flexibility in pest management.</p>
<h3>Long-Lasting Protection</h3>
<p>Its strong residual activity ensures prolonged protection, reducing the need for frequent applications.</p>
<h3>Easy to Use</h3>
<p>The WG (Wettable Granular) formulation makes actara insecticide easy to handle, mix, and apply using foliar spray methods.</p>
<h2>Dosage and Application Method</h2>
<h3>Foliar Spray</h3>
<p>Use 0.3 to 0.4 gm per litre of water</p>
<h2>Mode of Action</h2>
<ul><li>Mode of Application: Preventive and Curative</li><li>Mode of Action: Systemic</li></ul>
<h2>Actara Insecticide Uses</h2>
<p>Actara insecticide is suitable for a wide variety of crops, including cotton, potato, mango, rice, citrus, cumin, wheat, brinjal, tea, and other crops.</p>
<h2>Target Pests Controlled by Syngenta Actara</h2>
<ul><li>Jassids</li><li>Aphids</li><li>Whiteflies</li><li>Hoppers</li><li>Stem borers</li><li>Leaf folders</li><li>Other sucking and chewing pests</li></ul>
<h2>Recommended Dosage Table</h2>
<table><thead><tr><th>Suitable Crops</th><th>Target Pests</th><th>Dosage</th></tr></thead><tbody><tr><td>Cotton</td><td>Jassids, aphids, whiteflies</td><td>40 ml</td></tr><tr><td>Potato</td><td>Aphids</td><td>40 to 80 ml</td></tr><tr><td>Mango</td><td>Hopper</td><td>40 ml</td></tr><tr><td>Rice</td><td>Stem borer, leaf folder, hoppers</td><td>40 ml</td></tr><tr><td>Citrus</td><td>Psyllids</td><td>40 ml</td></tr><tr><td>Okra</td><td>Jassids, aphids</td><td>40 ml</td></tr><tr><td>Mustard</td><td>Aphids</td><td>20 to 40 ml</td></tr><tr><td>Cumin</td><td>Aphids</td><td>40 ml</td></tr><tr><td>Wheat</td><td>Aphids</td><td>20 ml</td></tr><tr><td>Brinjal</td><td>Whiteflies, jassids</td><td>80 ml</td></tr><tr><td>Tea</td><td>Mosquito bug</td><td>40 ml</td></tr></tbody></table>
<h2>Safety Precautions</h2>
<ul><li>Always read the product instructions carefully before use</li><li>Wear protective equipment such as gloves, mask, and goggles</li><li>Avoid eating or drinking during application</li><li>Wash hands thoroughly after handling the insecticide</li></ul>
<h2>Important Note</h2>
<p>Syngenta Actara insecticide is strictly intended for agricultural use only.</p>`,
    specs: [
      { label: "Active Ingredient", value: "Thiamethoxam 25% WG" },
      { label: "Formulation", value: "Water Dispersible Granules (WG)" },
      { label: "Mode of Action", value: "Systemic; affects insect nervous system (nAChR)" },
      { label: "Chemical Group", value: "Neonicotinoid (Group 4A)" },
      { label: "Dosage", value: "0.25 – 0.5 g per litre of water (crop dependent)" },
      { label: "Application", value: "Foliar spray / soil application" },
      { label: "Action Time", value: "Starts working within 24 hours" },
    ],
    crops: ["Cotton", "Rice (Paddy)", "Tomato", "Chilli", "Potato", "Vegetables"],
    pests: ["Aphids", "Whiteflies", "Thrips", "Jassids", "Leafhoppers", "Mealybugs", "Beetles"],
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
