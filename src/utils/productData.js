const products = [
    {
        id: "pro1",
        title: "SKETCHFAB Extra Bass 2.0 On-Ear Headphones with Tangle Free Cable, 3.5mm Jack, Headset with Mic for Phone Calls.",
        price: 990,
        rating: 5,
        image: "https://images-na.ssl-images-amazon.com/images/I/511G0DPMuQL._AC_SY450_.jpg",
        category: "electronics",
        tags: ["best-sellers", "deals"]
    },
    {
        id: "pro2",
        title: "Apple Watch Series 5. The most advanced Apple Watch yet, featuring the Always-On Retina display.",
        price: 39999,
        rating: 4,
        image: "https://images-na.ssl-images-amazon.com/images/I/71mbZF8PT1L._AC_SX522_.jpg",
        category: "electronics",
        tags: ["best-sellers", "new-releases"]
    },
    {
        id: "pro3",
        title: "Sofa Sack - Plush, Ultra Soft Bean Bag Chair - Memory Foam Bean Bag Chair with Microsuede Cover - Stuffed Foam Filled Furniture and Accessories for Dorm Room - Black 4'",
        price: 4999,
        rating: 4,
        image: "https://m.media-amazon.com/images/I/71WpQkL-uEL._AC_UL480_FMwebp_QL65_.jpg",
        category: "furniture",
        tags: ["furniture", "home"]
    },
    {
        id: "pro8",
        title: "Heavy Duty 26 Inch Mongoose Men's Mountain Bike with Full Suspension and 21 Speeds - Aluminum Mag Wheels",
        price: 12999,
        rating: 5,
        image: "https://m.media-amazon.com/images/I/81wGh+0kS8L._AC_UL480_FMwebp_QL65_.jpg",
        category: "sports",
        tags: ["sports", "outdoors"]
    },
    {
        id: "pro4",
        title: "Samsung Galaxy S23 Ultra 5G (Green, 12GB, 256GB Storage)",
        price: 124999,
        rating: 5,
        image: "https://images-eu.ssl-images-amazon.com/images/I/61VfL-aiToL._AC_UL600_SR600,400_.jpg",
        category: "mobiles",
        tags: ["mobiles", "android", "best-sellers", "prime"]
    },
    {
        id: "pro5",
        title: "New Apple iPhone 14 Pro Max 128GB - Deep Purple",
        price: 139900,
        rating: 5,
        image: "https://m.media-amazon.com/images/I/71yzJoE7WlL._AC_UY327_FMwebp_QL65_.jpg",
        category: "mobiles",
        tags: ["mobiles", "iphone", "apple", "prime"]
    },
    {
        id: "pro6",
        title: "Apple Watch Ultra [GPS + Cellular 49mm] Titanium Case with Midnight Ocean Band",
        price: 89900,
        rating: 5,
        image: "/images/apple_watch_ultra.png",
        category: "electronics",
        tags: ["electronics", "wearables", "apple"]
    },
    {
        id: "pro7",
        title: "Asian Men's Wonder-13 Sports Running Shoes",
        price: 699,
        rating: 3,
        image: "https://m.media-amazon.com/images/I/61utX8kBDlL._AC_UL480_FMwebp_QL65_.jpg",
        category: "fashion",
        tags: ["fashion", "shoes", "mens"]
    },

    {
        id: "fash1",
        title: "Levi's Men's 511 Slim Fit Jeans",
        price: 2999,
        rating: 4,
        image: "/images/levis_jeans.png",
        category: "fashion",
        tags: ["fashion", "best-sellers"]
    },
    {
        id: "fash2",
        title: "Ray-Ban Aviator Sunglasses",
        price: 8990,
        rating: 5,
        image: "/images/rayban_sunglasses.png",
        category: "fashion",
        tags: ["fashion", "prime"]
    },
    {
        id: "home1",
        title: "Dyson V15 Detect Cordless Vacuum Cleaner",
        price: 64900,
        rating: 5,
        image: "/images/dyson_vacuum.png",
        category: "home",
        tags: ["best-sellers", "prime"]
    },
    {
        id: "mob3",
        title: "OnePlus 11 5G (Eternal Green, 16GB RAM, 256GB Storage)",
        price: 56999,
        rating: 4,
        image: "/images/oneplus_11.png",
        category: "mobiles",
        tags: ["mobiles", "android", "deals"]
    },
    {
        id: "home2",
        title: "Philips Digital Air Fryer HD9252/90 with Touch Panel",
        price: 8999,
        rating: 5,
        image: "/images/air_fryer.png",
        category: "home",
        tags: ["home", "kitchen", "best-sellers"]
    },
    {
        id: "elec1",
        title: "Canon EOS R5 Mirrorless Camera Body",
        price: 339995,
        rating: 5,
        image: "/images/canon_camera.png",
        category: "electronics",
        tags: ["electronics", "prime"]
    },
    {
        id: "elec2",
        title: "JBL Flip 6 Waterproof Portable Bluetooth Speaker - Blue",
        price: 11999,
        rating: 4,
        image: "/images/jbl_speaker.png",
        category: "electronics",
        tags: ["electronics", "deals"]
    },
    {
        id: "fash3",
        title: "Luxury Brown Leather Women's Handbag",
        price: 4500,
        rating: 5,
        image: "/images/leather_handbag.png",
        category: "fashion",
        tags: ["fashion", "best-sellers"]
    },
    {
        id: "elec3",
        title: "Apple AirPods 4 with Active Noise Cancellation (2025 Model)",
        price: 24900,
        rating: 5,
        image: "/images/airpods_4.png",
        category: "electronics",
        tags: ["electronics", "new-releases", "best-sellers"]
    },
    {
        id: "elec4",
        title: "Apple iPad (2025) with A16 Bionic Chip, 10.9-inch Liquid Retina Display, 128GB, Wi-Fi 6",
        price: 44900,
        rating: 5,
        image: "/images/ipad_a16.png",
        category: "electronics",
        tags: ["electronics", "new-releases", "prime"]
    },
    {
        id: "mob4",
        title: "Xiaomi 13 Pro 5G (Ceramic Black, 12GB RAM, 256GB Storage) | Leica Professional Optical Lens",
        price: 74999,
        rating: 4,
        image: "/images/xiaomi_13.png",
        category: "mobiles",
        tags: ["mobiles", "android", "deals"]
    },
    {
        id: "mob5",
        title: "Google Pixel 8 Pro (Hazel, 128 GB) (12 GB RAM)",
        price: 106999,
        rating: 5,
        image: "/images/pixel_8.png",
        category: "mobiles",
        tags: ["mobiles", "android", "new-releases"]
    },
    {
        id: "mob6",
        title: "Samsung Galaxy Z Fold5 5G (Icy Blue, 12GB RAM, 256GB Storage)",
        price: 154999,
        rating: 5,
        image: "/images/fold_5.png",
        category: "mobiles",
        tags: ["mobiles", "android", "premium", "best-sellers"]
    }
];

export default products;
