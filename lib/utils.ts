// Converts a title into a URL-friendly slug
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Formats price in Nepali style
// 350000 → "Rs. 3,50,000"
export function formatNPR(price: number): string {
  return "Rs. " + price.toLocaleString("en-IN");
}