import mongoose, { Schema, Document, Model } from "mongoose";

// This defines what a Bike object looks like in TypeScript
export interface IBike extends Document {
  name: string;
  slug: string;
  brand: string;
  price: number;
  category: "sport" | "commuter" | "adventure" | "cruiser" | "scooter";
  description: string;
  specs: {
    engine?: string;
    power?: string;
    torque?: string;
    fuelTank?: string;
    seatHeight?: string;
    weight?: string;
    mileage?: string;
    transmission?: string;
    brakes?: string;
    abs?: boolean;
  };
  images: string[];
  isFeatured: boolean;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BikeSchema = new Schema<IBike>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["sport", "commuter", "adventure", "cruiser", "scooter"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    specs: {
      engine: String,
      power: String,
      torque: String,
      fuelTank: String,
      seatHeight: String,
      weight: String,
      mileage: String,
      transmission: String,
      brakes: String,
      abs: { type: Boolean, default: false },
    },
    images: [String],
    isFeatured: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Bike: Model<IBike> =
  mongoose.models.Bike || mongoose.model<IBike>("Bike", BikeSchema);

export default Bike;