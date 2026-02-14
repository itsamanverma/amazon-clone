const products = [
    // --- Electronics ---
    {
        id: "pro1",
        title: "SKETCHFAB Extra Bass 2.0 On-Ear Headphones with Tangle Free Cable, 3.5mm Jack, Headset with Mic for Phone Calls.",
        price: 990,
        rating: 5,
        image: "/images/pro_headphones.png",
        images: [
            "/images/pro_headphones.png",
            "/images/pro_headphones_side.png",
            "/images/pro_headphones_back.png",
            "/images/pro_headphones_lifestyle.png"
        ],
        category: "electronics",
        tags: ["best-sellers", "deals"]
    },
    {
        id: "pro2",
        title: "Apple Watch Series 5. The most advanced Apple Watch yet, featuring the Always-On Retina display.",
        price: 20500,
        rating: 4,
        image: "https://images-na.ssl-images-amazon.com/images/I/71mbZF8PT1L._AC_SX522_.jpg", // Restored external
        images: ["https://images-na.ssl-images-amazon.com/images/I/71mbZF8PT1L._AC_SX522_.jpg"],
        category: "electronics",
        tags: ["best-sellers", "new-releases"]
    },
    {
        id: "elec1",
        title: "Canon EOS R5 Mirrorless Camera Body",
        price: 339995,
        rating: 5,
        image: "/images/canon_camera.png",
        images: ["/images/canon_camera.png"],
        category: "electronics",
        tags: ["electronics", "prime"]
    },
    {
        id: "elec2",
        title: "JBL Flip 6 Waterproof Portable Bluetooth Speaker - Blue",
        price: 11999,
        rating: 4,
        image: "/images/jbl_speaker.png",
        images: ["/images/jbl_speaker.png"],
        category: "electronics",
        tags: ["electronics", "deals"]
    },
    {
        id: "elec3",
        title: "Apple AirPods 4 with Active Noise Cancellation (2025 Model)",
        price: 24900,
        rating: 5,
        image: "/images/airpods_4.png",
        images: ["/images/airpods_4.png"],
        category: "electronics",
        tags: ["electronics", "new-releases", "best-sellers"]
    },
    {
        id: "elec4",
        title: "Apple iPad (2025) with A16 Bionic Chip, 10.9-inch Liquid Retina Display, 128GB, Wi-Fi 6",
        price: 44900,
        rating: 5,
        image: "/images/ipad_a16.png",
        images: ["/images/ipad_a16.png"],
        category: "electronics",
        tags: ["electronics", "new-releases", "prime"]
    },
    {
        id: "lap1", // Renamed from pro6
        title: "Apple MacBook Pro (16-inch, 16GB RAM, 512GB Storage, 2.6GHz 9th Gen Intel Core i7) - Space Grey.",
        price: 189900,
        rating: 4,
        image: "/images/pro_macbook.png",
        images: ["/images/pro_macbook.png", "/images/pro_macbook.png"],
        category: "electronics",
        tags: ["electronics", "best-sellers", "apple"]
    },
    {
        id: "elec5", // Restored Watch Ultra
        title: "Apple Watch Ultra [GPS + Cellular 49mm] Titanium Case with Midnight Ocean Band",
        price: 89900,
        rating: 5,
        image: "/images/apple_watch_ultra.png",
        images: ["/images/apple_watch_ultra.png"],
        category: "electronics",
        tags: ["electronics", "wearables", "apple"]
    },

    // --- Mobiles ---
    {
        id: "mob1", // Restored Samsung
        title: "Samsung Galaxy S23 Ultra 5G (Green, 12GB, 256GB Storage)",
        price: 124999,
        rating: 5,
        image: "https://images-eu.ssl-images-amazon.com/images/I/61VfL-aiToL._AC_UL600_SR600,400_.jpg",
        images: ["https://images-eu.ssl-images-amazon.com/images/I/61VfL-aiToL._AC_UL600_SR600,400_.jpg"],
        category: "mobiles",
        tags: ["mobiles", "android", "best-sellers", "prime"]
    },
    {
        id: "mob2", // Restored iPhone
        title: "New Apple iPhone 14 Pro Max 128GB - Deep Purple",
        price: 139900,
        rating: 5,
        image: "https://m.media-amazon.com/images/I/71yzJoE7WlL._AC_UY327_FMwebp_QL65_.jpg",
        images: ["https://m.media-amazon.com/images/I/71yzJoE7WlL._AC_UY327_FMwebp_QL65_.jpg"],
        category: "mobiles",
        tags: ["mobiles", "iphone", "apple", "prime"]
    },
    {
        id: "mob3",
        title: "OnePlus 11 5G (Eternal Green, 16GB RAM, 256GB Storage)",
        price: 56999,
        rating: 4,
        image: "/images/oneplus_11.png",
        images: ["/images/oneplus_11.png"],
        category: "mobiles",
        tags: ["mobiles", "android", "deals"]
    },
    {
        id: "mob4",
        title: "Xiaomi 13 Pro 5G (Ceramic Black, 12GB RAM, 256GB Storage) | Leica Professional Optical Lens",
        price: 74999,
        rating: 4,
        image: "/images/xiaomi_13.png",
        images: ["/images/xiaomi_13.png"],
        category: "mobiles",
        tags: ["mobiles", "android", "deals"]
    },
    {
        id: "mob5",
        title: "Google Pixel 8 Pro (Hazel, 128 GB) (12 GB RAM)",
        price: 106999,
        rating: 5,
        image: "/images/pixel_8.png",
        images: ["/images/pixel_8.png"],
        category: "mobiles",
        tags: ["mobiles", "android", "new-releases"]
    },
    {
        id: "mob6",
        title: "Samsung Galaxy Z Fold5 5G (Icy Blue, 12GB RAM, 256GB Storage)",
        price: 154999,
        rating: 5,
        image: "/images/fold_5.png",
        images: ["/images/fold_5.png"],
        category: "mobiles",
        tags: ["mobiles", "android", "premium", "best-sellers"]
    },

    // --- Fashion ---
    {
        id: "fash1",
        title: "Levi's Men's 511 Slim Fit Jeans",
        price: 2999,
        rating: 4,
        image: "/images/levis_jeans.png",
        images: ["/images/levis_jeans.png"],
        category: "fashion",
        tags: ["fashion", "best-sellers"]
    },
    {
        id: "fash2",
        title: "Ray-Ban Aviator Sunglasses",
        price: 8990,
        rating: 5,
        image: "/images/rayban_sunglasses.png",
        images: ["/images/rayban_sunglasses.png"],
        category: "fashion",
        tags: ["fashion", "prime"]
    },
    {
        id: "fash3",
        title: "Luxury Brown Leather Women's Handbag",
        price: 4500,
        rating: 5,
        image: "/images/leather_handbag.png",
        images: ["/images/leather_handbag.png"],
        category: "fashion",
        tags: ["fashion", "best-sellers"]
    },
    {
        id: "fash4", // Was pro5
        title: "HEEDERIN Men's Comfortable Mesh Lace up Sport Shoe.",
        price: 799,
        rating: 4,
        image: "/images/pro_shoes.png",
        images: ["/images/pro_shoes.png", "/images/pro_shoes.png"],
        category: "fashion",
        tags: ["fashion", "shoes", "mens"]
    },
    {
        id: "pro7",
        title: "Asian Men's Wonder-13 Sports Running Shoes",
        price: 699,
        rating: 3,
        image: "https://m.media-amazon.com/images/I/61utX8kBDlL._AC_UL480_FMwebp_QL65_.jpg",
        images: ["https://m.media-amazon.com/images/I/61utX8kBDlL._AC_UL480_FMwebp_QL65_.jpg"],
        category: "fashion",
        tags: ["fashion", "shoes", "mens"]
    },

    // --- Home & Sports ---
    {
        id: "pro3",
        title: "Woodlab Furniture Sheesham Wood Armchairs Outdoor Sofa Chairs for Living Room Dining Chiar for Home.",
        price: 3500,
        rating: 3,
        image: "/images/pro_armchair.png",
        images: ["/images/pro_armchair.png", "/images/pro_armchair.png", "/images/pro_armchair.png"],
        category: "furniture",
        tags: ["furniture", "home"]
    },
    {
        id: "home1",
        title: "Dyson V15 Detect Cordless Vacuum Cleaner",
        price: 64900,
        rating: 5,
        image: "/images/dyson_vacuum.png",
        images: ["/images/dyson_vacuum.png"],
        category: "home",
        tags: ["best-sellers", "prime"]
    },
    {
        id: "home2",
        title: "Philips Digital Air Fryer HD9252/90 with Touch Panel",
        price: 8999,
        rating: 5,
        image: "/images/air_fryer.png",
        images: ["/images/air_fryer.png"],
        category: "home",
        tags: ["home", "kitchen", "best-sellers"]
    },
    {
        id: "sport1", // Was pro4
        title: "Hero Kyoto 26T Single Speed Mountain Bike (Black, Ideal For : 12+ Years ).",
        price: 4999,
        rating: 4,
        image: "/images/pro_bike.png",
        images: ["/images/pro_bike.png", "/images/pro_bike.png", "/images/pro_bike.png"],
        category: "sports",
        tags: ["sports", "outdoors"]
    },
    {
        id: "pro8",
        title: "Heavy Duty 26 Inch Mongoose Men's Mountain Bike with Full Suspension and 21 Speeds - Aluminum Mag Wheels",
        price: 12999,
        rating: 5,
        image: "https://m.media-amazon.com/images/I/81wGh+0kS8L._AC_UL480_FMwebp_QL65_.jpg",
        images: ["https://m.media-amazon.com/images/I/81wGh+0kS8L._AC_UL480_FMwebp_QL65_.jpg"],
        category: "sports",
        tags: ["sports", "outdoors"]
    },
    {
        id: "home3", // Sofa Sack restored
        title: "Sofa Sack - Plush, Ultra Soft Bean Bag Chair - Memory Foam Bean Bag Chair - Black 4'",
        price: 4999,
        rating: 4,
        image: "https://m.media-amazon.com/images/I/71WpQkL-uEL._AC_UL480_FMwebp_QL65_.jpg",
        images: ["https://m.media-amazon.com/images/I/71WpQkL-uEL._AC_UL480_FMwebp_QL65_.jpg"],
        category: "furniture",
        tags: ["furniture", "home"]
    }
];

export default products;
