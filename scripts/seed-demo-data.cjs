/* eslint-disable @typescript-eslint/no-require-imports -- This standalone Node seed script intentionally uses CommonJS. */
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

function loadLocalEnv() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;

  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
  }
}

loadLocalEnv();

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is required in .env.local");
}

const bikeSchema = new mongoose.Schema(
  {
    name: String,
    slug: { type: String, unique: true },
    brand: String,
    price: Number,
    category: String,
    description: String,
    specs: mongoose.Schema.Types.Mixed,
    images: [String],
    isFeatured: Boolean,
    isAvailable: Boolean,
  },
  { timestamps: true }
);

const articleSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    content: String,
    excerpt: String,
    coverImage: String,
    category: String,
    tags: [String],
    relatedBikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bike" }],
    isPublished: Boolean,
    isFeatured: Boolean,
  },
  { timestamps: true }
);

const Bike = mongoose.models.Bike || mongoose.model("Bike", bikeSchema);
const Article =
  mongoose.models.Article || mongoose.model("Article", articleSchema);

const image = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=85`;

const bikes = [
  {
    name: "Bajaj Pulsar N160",
    slug: "bajaj-pulsar-n160",
    brand: "Bajaj",
    price: 389900,
    category: "commuter",
    description:
      "A sharp, everyday street bike with enough performance for city commutes and weekend rides.",
    specs: { engine: "164.82 cc", power: "16 PS", torque: "14.65 Nm", fuelTank: "14 L", seatHeight: "795 mm", weight: "154 kg", mileage: "45 km/l", transmission: "5-speed", brakes: "Disc / Disc", abs: true },
    images: [image("photo-1558981806-ec527fa84c39")],
    isFeatured: true,
    isAvailable: true,
  },
  {
    name: "Bajaj Pulsar NS200",
    slug: "bajaj-pulsar-ns200",
    brand: "Bajaj",
    price: 449900,
    category: "sport",
    description: "A lively naked sport bike known for its rev-happy engine and muscular street presence.",
    specs: { engine: "199.5 cc", power: "24.5 PS", torque: "18.74 Nm", fuelTank: "12 L", seatHeight: "805 mm", weight: "158 kg", mileage: "35 km/l", transmission: "6-speed", brakes: "Disc / Disc", abs: true },
    images: [image("photo-1558981359-219d6364c9c8")],
    isFeatured: true,
    isAvailable: true,
  },
  {
    name: "KTM Duke 200",
    slug: "ktm-duke-200",
    brand: "KTM",
    price: 599900,
    category: "sport",
    description: "A lightweight, high-energy streetfighter for riders who want quick acceleration and agile handling.",
    specs: { engine: "199.5 cc", power: "25 PS", torque: "19.3 Nm", fuelTank: "13.5 L", seatHeight: "822 mm", weight: "159 kg", mileage: "33 km/l", transmission: "6-speed", brakes: "Disc / Disc", abs: true },
    images: [image("photo-1568772585407-9361f9bf3a87")],
    isFeatured: true,
    isAvailable: true,
  },
  {
    name: "KTM Duke 390",
    slug: "ktm-duke-390",
    brand: "KTM",
    price: 969900,
    category: "sport",
    description: "A premium performance naked with thrilling power, modern electronics, and a lightweight chassis.",
    specs: { engine: "398.63 cc", power: "46 PS", torque: "39 Nm", fuelTank: "15 L", seatHeight: "800 mm", weight: "168 kg", mileage: "28 km/l", transmission: "6-speed", brakes: "Disc / Disc", abs: true },
    images: [image("photo-1591637333184-19aa84b3e01f")],
    isFeatured: true,
    isAvailable: true,
  },
  {
    name: "Yamaha MT-15 V2",
    slug: "yamaha-mt-15-v2",
    brand: "Yamaha",
    price: 549900,
    category: "sport",
    description: "A compact street machine blending strong fuel efficiency with Yamaha's engaging VVA engine.",
    specs: { engine: "155 cc", power: "18.4 PS", torque: "14.1 Nm", fuelTank: "10 L", seatHeight: "810 mm", weight: "141 kg", mileage: "48 km/l", transmission: "6-speed", brakes: "Disc / Disc", abs: true },
    images: [image("photo-1558981285-6f0c94958bb6")],
    isFeatured: true,
    isAvailable: true,
  },
  {
    name: "Yamaha FZ-S FI V3",
    slug: "yamaha-fzs-fi-v3",
    brand: "Yamaha",
    price: 429900,
    category: "commuter",
    description: "A comfortable and refined 150 cc bike designed for practical urban riding.",
    specs: { engine: "149 cc", power: "12.4 PS", torque: "13.3 Nm", fuelTank: "13 L", seatHeight: "790 mm", weight: "136 kg", mileage: "50 km/l", transmission: "5-speed", brakes: "Disc / Disc", abs: true },
    images: [image("photo-1615172282427-9a72ef5f8f18")],
    isFeatured: false,
    isAvailable: true,
  },
  {
    name: "Hero Xpulse 200 4V",
    slug: "hero-xpulse-200-4v",
    brand: "Hero",
    price: 476900,
    category: "adventure",
    description: "An accessible dual-sport motorcycle ready for rough roads, trails, and everyday exploration.",
    specs: { engine: "199.6 cc", power: "19.1 PS", torque: "17.35 Nm", fuelTank: "13 L", seatHeight: "825 mm", weight: "159 kg", mileage: "38 km/l", transmission: "5-speed", brakes: "Disc / Disc", abs: true },
    images: [image("photo-1558980394-0c7f2f625d57")],
    isFeatured: true,
    isAvailable: true,
  },
  {
    name: "Royal Enfield Classic 350",
    slug: "royal-enfield-classic-350",
    brand: "Royal Enfield",
    price: 585000,
    category: "cruiser",
    description: "An iconic retro cruiser with a relaxed riding position and timeless road presence.",
    specs: { engine: "349 cc", power: "20.2 PS", torque: "27 Nm", fuelTank: "13 L", seatHeight: "805 mm", weight: "195 kg", mileage: "35 km/l", transmission: "5-speed", brakes: "Disc / Disc", abs: true },
    images: [image("photo-1609630875171-b1321377ee65")],
    isFeatured: true,
    isAvailable: true,
  },
  {
    name: "Royal Enfield Himalayan 450",
    slug: "royal-enfield-himalayan-450",
    brand: "Royal Enfield",
    price: 875000,
    category: "adventure",
    description: "A long-distance adventure bike built for mountain highways, broken roads, and all-day comfort.",
    specs: { engine: "452 cc", power: "40 PS", torque: "40 Nm", fuelTank: "17 L", seatHeight: "825 mm", weight: "196 kg", mileage: "30 km/l", transmission: "6-speed", brakes: "Disc / Disc", abs: true },
    images: [image("photo-1524444781019-0972b821e842")],
    isFeatured: true,
    isAvailable: true,
  },
  {
    name: "Honda CB350RS",
    slug: "honda-cb350rs",
    brand: "Honda",
    price: 895000,
    category: "cruiser",
    description: "A polished neo-retro roadster with easy torque delivery and Honda reliability.",
    specs: { engine: "348.36 cc", power: "21.1 PS", torque: "30 Nm", fuelTank: "15 L", seatHeight: "800 mm", weight: "179 kg", mileage: "35 km/l", transmission: "5-speed", brakes: "Disc / Disc", abs: true },
    images: [image("photo-1568708167240-a8ce9c6c9f58")],
    isFeatured: false,
    isAvailable: true,
  },
  {
    name: "TVS Apache RTR 160 4V",
    slug: "tvs-apache-rtr-160-4v",
    brand: "TVS",
    price: 369900,
    category: "commuter",
    description: "A sporty commuter with responsive performance, practical running costs, and assertive styling.",
    specs: { engine: "159.7 cc", power: "17.55 PS", torque: "14.73 Nm", fuelTank: "12 L", seatHeight: "800 mm", weight: "146 kg", mileage: "45 km/l", transmission: "5-speed", brakes: "Disc / Disc", abs: true },
    images: [image("photo-1558981852-426c6c22a060")],
    isFeatured: false,
    isAvailable: true,
  },
  {
    name: "Suzuki Gixxer SF 250",
    slug: "suzuki-gixxer-sf-250",
    brand: "Suzuki",
    price: 679900,
    category: "sport",
    description: "A smooth and capable quarter-litre sport tourer for fast commutes and longer rides.",
    specs: { engine: "249 cc", power: "26.5 PS", torque: "22.2 Nm", fuelTank: "12 L", seatHeight: "800 mm", weight: "161 kg", mileage: "35 km/l", transmission: "6-speed", brakes: "Disc / Disc", abs: true },
    images: [image("photo-1558981403-c5f9899a28bc")],
    isFeatured: false,
    isAvailable: true,
  },
  {
    name: "Honda Dio 125",
    slug: "honda-dio-125",
    brand: "Honda",
    price: 299900,
    category: "scooter",
    description: "A nimble automatic scooter with youthful styling and excellent convenience for city trips.",
    specs: { engine: "123.97 cc", power: "8.3 PS", torque: "10.4 Nm", fuelTank: "5.3 L", seatHeight: "765 mm", weight: "104 kg", mileage: "50 km/l", transmission: "Automatic", brakes: "Disc / Drum", abs: false },
    images: [image("photo-1558980664-10ea5c19d1a3")],
    isFeatured: false,
    isAvailable: true,
  },
  {
    name: "TVS Ntorq 125",
    slug: "tvs-ntorq-125",
    brand: "TVS",
    price: 319900,
    category: "scooter",
    description: "A feature-rich scooter for riders who want lively performance and connected convenience.",
    specs: { engine: "124.8 cc", power: "9.38 PS", torque: "10.5 Nm", fuelTank: "5.8 L", seatHeight: "770 mm", weight: "118 kg", mileage: "45 km/l", transmission: "Automatic", brakes: "Disc / Drum", abs: false },
    images: [image("photo-1625047509248-ec889cbff17f")],
    isFeatured: false,
    isAvailable: true,
  },
  {
    name: "Hero Splendor Plus",
    slug: "hero-splendor-plus",
    brand: "Hero",
    price: 269900,
    category: "commuter",
    description: "A trusted, fuel-efficient everyday motorcycle built for simple and dependable commuting.",
    specs: { engine: "97.2 cc", power: "8.02 PS", torque: "8.05 Nm", fuelTank: "9.8 L", seatHeight: "785 mm", weight: "112 kg", mileage: "70 km/l", transmission: "4-speed", brakes: "Drum / Drum", abs: false },
    images: [image("photo-1568772585407-9361f9bf3a87")],
    isFeatured: false,
    isAvailable: true,
  },
];

const articles = [
  {
    title: "Best Bikes Under Rs. 5 Lakh in Nepal",
    slug: "best-bikes-under-5-lakh-nepal",
    category: "guides",
    excerpt: "A practical shortlist of everyday and sporty motorcycles that offer the most value below Rs. 5 lakh.",
    content: "Shopping below Rs. 5 lakh opens up a strong mix of practical commuters, sporty street bikes, and entry-level adventure machines.\n\nStart with the way you ride. For daily city travel, prioritize comfort, fuel efficiency, and easy service support. If you enjoy weekend rides, a stronger engine, confident brakes, and a six-speed gearbox can make a meaningful difference.\n\nThe Bajaj Pulsar N160, Yamaha FZ-S FI V3, TVS Apache RTR 160 4V, and Hero Xpulse 200 4V each serve a distinct purpose. Test ride at least two options before deciding, and include insurance, riding gear, and the first service in your budget.",
    tags: ["buying guide", "budget", "commuter"],
    relatedSlugs: ["bajaj-pulsar-n160", "yamaha-fzs-fi-v3", "tvs-apache-rtr-160-4v", "hero-xpulse-200-4v"],
    isFeatured: true,
  },
  {
    title: "KTM Duke 390 vs Royal Enfield Himalayan 450",
    slug: "ktm-duke-390-vs-himalayan-450",
    category: "comparison",
    excerpt: "Two exciting motorcycles, two very different definitions of a perfect weekend ride.",
    content: "The Duke 390 and Himalayan 450 both deliver serious performance, but they are made for different roads.\n\nChoose the Duke if you want sharp responses, lower weight, and spirited cornering on paved roads. Choose the Himalayan if your plan includes long tours, uneven surfaces, luggage, and mountain routes.\n\nYour typical route matters more than peak power. A short test ride in traffic and on a rough patch of road will quickly reveal which seating position and suspension setup feel right.",
    tags: ["comparison", "adventure", "performance"],
    relatedSlugs: ["ktm-duke-390", "royal-enfield-himalayan-450"],
    isFeatured: true,
  },
  {
    title: "How to Choose Your First Motorcycle",
    slug: "how-to-choose-first-motorcycle-nepal",
    category: "tips",
    excerpt: "A simple, confidence-building checklist for first-time riders in Nepal.",
    content: "Your first motorcycle should feel manageable, not intimidating. Start with a bike you can comfortably balance, turn, and stop in daily traffic.\n\nLook beyond the showroom price. Fuel use, spare-part availability, tire costs, insurance, and service intervals all shape long-term ownership.\n\nA practical 125 to 160 cc motorcycle is enough for most new riders. Invest in a certified helmet and gloves from day one, and practice slow-speed control before taking longer rides.",
    tags: ["first bike", "safety", "buying guide"],
    relatedSlugs: ["bajaj-pulsar-n160", "yamaha-fzs-fi-v3", "hero-splendor-plus"],
    isFeatured: true,
  },
  {
    title: "Why the Yamaha MT-15 V2 Works So Well in the City",
    slug: "yamaha-mt-15-v2-city-review",
    category: "review",
    excerpt: "A closer look at the compact street bike that balances punchy performance with everyday efficiency.",
    content: "The MT-15 V2 has become a familiar sight on city roads for good reason. Its compact dimensions make filtering through traffic straightforward, while the 155 cc VVA engine still feels energetic once the road opens up.\n\nThe riding posture is upright but engaged, and the low weight helps newer riders build confidence. The small fuel tank and firm rear seat are worth considering if you ride two-up often.\n\nFor solo commuting with occasional weekend runs, it remains one of the most complete premium 150 cc options.",
    tags: ["Yamaha", "street bike", "review"],
    relatedSlugs: ["yamaha-mt-15-v2"],
    isFeatured: true,
  },
  {
    title: "Preparing Your Bike for a Nepal Road Trip",
    slug: "prepare-bike-nepal-road-trip",
    category: "guides",
    excerpt: "A no-nonsense checklist for safer, smoother touring beyond the valley.",
    content: "A road trip starts with preparation. Inspect tire condition, chain slack, lights, brake pads, fluid levels, and the toolkit before leaving.\n\nPack light and keep heavy items low and close to the bike. Carry a puncture kit, basic first-aid supplies, rain protection, and copies of your documents.\n\nPlan fuel stops conservatively. In the hills, a route can take longer than expected because of weather, road work, or traffic. Ride within your limits and make daylight your friend.",
    tags: ["touring", "maintenance", "safety"],
    relatedSlugs: ["royal-enfield-himalayan-450", "hero-xpulse-200-4v"],
    isFeatured: false,
  },
  {
    title: "Scooter or Motorcycle: Which Is Better for Daily Commutes?",
    slug: "scooter-vs-motorcycle-daily-commute",
    category: "comparison",
    excerpt: "Choose confidently by comparing convenience, comfort, fuel use, and confidence in traffic.",
    content: "Scooters make short city trips simple. Their automatic transmission, storage space, and easy step-through design are especially useful in stop-and-go traffic.\n\nMotorcycles usually offer larger wheels, a wider gear range, and greater confidence on longer or rougher routes. They are often better suited to frequent highway use or carrying a passenger outside the city.\n\nThere is no universal winner. Match the machine to your daily distance, parking situation, road conditions, and riding experience.",
    tags: ["scooter", "commuter", "comparison"],
    relatedSlugs: ["honda-dio-125", "tvs-ntorq-125", "bajaj-pulsar-n160"],
    isFeatured: false,
  },
  {
    title: "Understanding ABS and Why It Matters",
    slug: "understanding-motorcycle-abs",
    category: "tips",
    excerpt: "What anti-lock braking does, when it helps, and why it is worth prioritizing.",
    content: "ABS helps prevent the wheels from locking during hard braking. It does not replace good technique or safe following distance, but it can make emergency stops more controllable on wet, dusty, or uneven surfaces.\n\nFor a first or daily motorcycle, single-channel ABS is a meaningful safety baseline. Dual-channel ABS offers more complete support by monitoring both wheels.\n\nPractice progressive braking in a quiet, open area so you understand how your bike responds before you need it in traffic.",
    tags: ["safety", "ABS", "riding tips"],
    relatedSlugs: ["ktm-duke-200", "bajaj-pulsar-ns200", "honda-cb350rs"],
    isFeatured: false,
  },
  {
    title: "Royal Enfield Classic 350: A Relaxed Ride with Timeless Character",
    slug: "royal-enfield-classic-350-review",
    category: "review",
    excerpt: "The Classic 350 prioritizes a calm, characterful riding experience over outright speed.",
    content: "The Classic 350 is at its best when ridden unhurriedly. Its torquey engine and relaxed ergonomics make city rides and scenic weekend routes feel easygoing.\n\nThe bike is heavier than many commuters, so newer riders should spend time getting comfortable at low speeds. In return, it feels planted on open roads and carries a passenger with confidence.\n\nIf you value character, comfort, and a laid-back pace, the Classic has a very distinct appeal.",
    tags: ["Royal Enfield", "cruiser", "review"],
    relatedSlugs: ["royal-enfield-classic-350"],
    isFeatured: false,
  },
];

const articleImageIds = [
  "photo-1558981806-ec527fa84c39",
  "photo-1524444781019-0972b821e842",
  "photo-1615172282427-9a72ef5f8f18",
  "photo-1558981285-6f0c94958bb6",
  "photo-1558980394-0c7f2f625d57",
  "photo-1558980664-10ea5c19d1a3",
  "photo-1558981852-426c6c22a060",
  "photo-1609630875171-b1321377ee65",
];

articles.forEach((article, index) => {
  article.coverImage = image(articleImageIds[index]);
});

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  for (const bike of bikes) {
    await Bike.findOneAndUpdate({ slug: bike.slug }, bike, {
      upsert: true,
      runValidators: true,
    });
  }

  const storedBikes = await Bike.find({ slug: { $in: bikes.map((bike) => bike.slug) } });
  const bikeIds = new Map(storedBikes.map((bike) => [bike.slug, bike._id]));

  for (const { relatedSlugs, ...article } of articles) {
    await Article.findOneAndUpdate(
      { slug: article.slug },
      {
        ...article,
        isPublished: true,
        relatedBikes: relatedSlugs.map((slug) => bikeIds.get(slug)).filter(Boolean),
      },
      { upsert: true, runValidators: true }
    );
  }

  const [bikeCount, articleCount, featuredBikeCount, featuredArticleCount] = await Promise.all([
    Bike.countDocuments(),
    Article.countDocuments(),
    Bike.countDocuments({ isFeatured: true, isAvailable: true }),
    Article.countDocuments({ isFeatured: true, isPublished: true }),
  ]);

  console.log(
    `Seed complete: ${bikeCount} bikes (${featuredBikeCount} featured) and ${articleCount} articles (${featuredArticleCount} featured).`
  );
}

seed()
  .catch((error) => {
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
