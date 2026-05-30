import mongoose, { Schema, Document, Model } from "mongoose";

export interface IArticle extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  category: "review" | "comparison" | "news" | "tips" | "guides";
  tags: string[];
  relatedBikes: mongoose.Types.ObjectId[];
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    coverImage: { type: String },
    category: {
      type: String,
      enum: ["review", "comparison", "news", "tips", "guides"],
      required: true,
    },
    tags: [String],
    relatedBikes: [{ type: Schema.Types.ObjectId, ref: "Bike" }],
    isPublished: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Article: Model<IArticle> =
  mongoose.models.Article ||
  mongoose.model<IArticle>("Article", ArticleSchema);

export default Article;