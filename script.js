/* ============================================================
   McDelivery UAE (Demo) — script.js
   Pure vanilla JS, no frameworks, no build tools.
   ============================================================ */

const CART_STORAGE_KEY = "mcdelivery_uae_cart";
const UI_STORAGE_KEY = "mcdelivery_uae_ui";
const DELIVERY_FEE = 7;
const DISCOUNT_RATE = 0.5;

/* ---------- Discount helpers ---------- */
function getDiscountedPrice(item) {
  return Math.round(item.price * (1 - DISCOUNT_RATE) * 100) / 100;
}

/* ---------- Menu data ---------- */
const MENU_ITEMS = [
  {
    id: "burger-big-mac",
    name: "Big Mac",
    category: "Burgers",
    description: "Two 100% pure beef patties, special sauce, lettuce, cheese, pickles, onions on a sesame seed bun.",
    price: 22,
    image: "assets/menu/mcd-bigmac-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "burger-big-tasty",
    name: "Big Tasty",
    category: "Burgers",
    description: "Quarter pound beef patty with fresh lettuce, tomato, cheese, onion and mustard mayo.",
    price: 27,
    image: "assets/menu/mcd-big-tasty-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "burger-beef-burger",
    name: "Beef Burger",
    category: "Burgers",
    description: "A simple, juicy 100% beef patty burger with onions, pickles, ketchup and mustard.",
    price: 9,
    image: "assets/menu/mcd-beef-burger-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "burger-cheeseburger",
    name: "Cheeseburger",
    category: "Burgers",
    description: "Beef patty topped with melted cheese, onions, pickles, ketchup and mustard.",
    price: 9,
    image: "assets/menu/mcd-cheeseburger-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "burger-double-cheeseburger",
    name: "Double Cheeseburger",
    category: "Burgers",
    description: "Two beef patties with melted cheese, onions, pickles, ketchup and mustard.",
    price: 15,
    image: "assets/menu/mcd-double-cheeseburger-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "burger-qpc",
    name: "Quarter Pounder with Cheese",
    category: "Burgers",
    description: "A quarter pound of 100% pure beef with cheese, onions, pickles, ketchup and mustard.",
    price: 23,
    image: "assets/menu/mcd-QPC-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "burger-qpc-deluxe",
    name: "Quarter Pounder Deluxe",
    category: "Burgers",
    description: "Quarter pound beef patty with cheese, lettuce, tomato and mayo.",
    price: 25,
    image: "assets/menu/mcd-QPC-Deluxe-uae-1024.webp",
    emoji: "🍽️"
  },
  {
    id: "burger-veggie-deluxe",
    name: "Veggie Deluxe",
    category: "Burgers",
    description: "A crispy vegetable patty with lettuce, tomato and mayo in a soft bun.",
    price: 18,
    image: "assets/menu/1mcd-Veggie-Deluxe-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "chicken-mcchicken",
    name: "McChicken",
    category: "Chicken & Sandwiches",
    description: "Crispy chicken fillet topped with fresh lettuce and mayo.",
    price: 21,
    image: "assets/menu/mcd-McChicken-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "chicken-spicy-mcchicken",
    name: "Spicy McChicken",
    category: "Chicken & Sandwiches",
    description: "Crispy spicy chicken fillet with lettuce and mayo in a soft bun.",
    price: 22,
    image: "assets/menu/1mcd-Spicy-McChicken-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "chicken-grand-chicken",
    name: "Grand Chicken",
    category: "Chicken & Sandwiches",
    description: "A larger crispy chicken fillet with lettuce, tomato and mayo.",
    price: 28,
    image: "assets/menu/mcd-grand-chicken-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "chicken-grand-chicken-spicy",
    name: "Grand Chicken Spicy",
    category: "Chicken & Sandwiches",
    description: "A larger crispy spicy chicken fillet with lettuce, tomato and mayo.",
    price: 29,
    image: "assets/menu/mcd-GrandChicken-Spicy-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "chicken-mccrispy",
    name: "McCrispy",
    category: "Chicken & Sandwiches",
    description: "Crispy chicken fillet with crinkle-cut pickles and mayo in a potato bun.",
    price: 25,
    image: "assets/menu/mcd-mccrispy-uae-0225.webp",
    emoji: "🍽️"
  },
  {
    id: "chicken-mccrispy-deluxe",
    name: "McCrispy Deluxe",
    category: "Chicken & Sandwiches",
    description: "Crispy chicken fillet with lettuce, tomato and mayo in a potato bun.",
    price: 27,
    image: "assets/menu/mcd-McCrispy-Deluxe-uae-0426.webp",
    emoji: "🍽️"
  },
  {
    id: "chicken-spicy-mccrispy",
    name: "Spicy McCrispy",
    category: "Chicken & Sandwiches",
    description: "Crispy spicy chicken fillet with crinkle-cut pickles and mayo in a potato bun.",
    price: 25,
    image: "assets/menu/mcd-Spicy-McCrispy-uae-0426.webp",
    emoji: "🍽️"
  },
  {
    id: "chicken-chicken-mac",
    name: "Chicken Mac",
    category: "Chicken & Sandwiches",
    description: "Two crispy chicken patties with special sauce, lettuce and cheese.",
    price: 25,
    image: "assets/menu/1mcd-chicken-mac-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "chicken-mcarabia",
    name: "McArabia Grilled Chicken",
    category: "Chicken & Sandwiches",
    description: "Grilled chicken pieces with fresh vegetables and garlic sauce wrapped in Arabic bread.",
    price: 25,
    image: "assets/menu/1mcd-McArabia-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "chicken-chicken-burger",
    name: "Chicken Burger",
    category: "Chicken & Sandwiches",
    description: "A classic crispy chicken burger with lettuce and mayo.",
    price: 16,
    image: "assets/menu/1mcd-chicken-burger-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "chicken-fillet-o-fish",
    name: "Filet-O-Fish",
    category: "Chicken & Sandwiches",
    description: "Wild-caught fish fillet topped with tartar sauce and a slice of cheese.",
    price: 13,
    image: "assets/menu/mcd-fillet-O-Fish-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "chicken-caesar-salad",
    name: "Chicken Caesar Salad",
    category: "Chicken & Sandwiches",
    description: "Grilled chicken strips over fresh salad greens with Caesar dressing.",
    price: 22,
    image: "assets/menu/mcd-Chicken-Ceaser-Salad-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "chicken-tenders-3pc",
    name: "Chicken Tenders (3pc)",
    category: "Chicken & Sandwiches",
    description: "3 pieces of crispy, tender all-white-meat chicken tenders.",
    price: 16,
    image: "assets/menu/mcd-3pc-Chicken_Tenders--uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "chicken-nuggets-4pc",
    name: "Chicken McNuggets (4pc)",
    category: "Chicken & Sandwiches",
    description: "4 pieces of crispy golden chicken nuggets served with your choice of sauce.",
    price: 9,
    image: "assets/menu/mcd-4pc-Chicken-McNuggets-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "chicken-wings-4pc",
    name: "Chicken McWings (4pc)",
    category: "Chicken & Sandwiches",
    description: "4 pieces of spicy, crispy chicken wings.",
    price: 9,
    image: "assets/menu/4pcs-Wings-uae.webp",
    emoji: "🍽️"
  },
  {
    id: "meal-big-mac",
    name: "Big Mac Meal",
    category: "Extra Value Meals",
    description: "Big Mac served with fries and a drink of your choice.",
    price: 34,
    image: "assets/menu/mcd-BIg-Mac-Meal-uae-0724.webp",
    emoji: "🍽️"
  },
  {
    id: "meal-big-tasty",
    name: "Big Tasty Meal",
    category: "Extra Value Meals",
    description: "Big Tasty served with fries and a drink of your choice.",
    price: 39,
    image: "assets/menu/mcd-Big-Tasty-Meal-uae-0724.webp",
    emoji: "🍽️"
  },
  {
    id: "meal-qpc",
    name: "Quarter Pounder with Cheese Meal",
    category: "Extra Value Meals",
    description: "Quarter Pounder with Cheese served with fries and a drink of your choice.",
    price: 35,
    image: "assets/menu/mcd-QPC-Meal-uae-0724.webp",
    emoji: "🍽️"
  },
  {
    id: "meal-qpc-deluxe",
    name: "Quarter Pounder Deluxe Meal",
    category: "Extra Value Meals",
    description: "Quarter Pounder Deluxe served with fries and a drink of your choice.",
    price: 37,
    image: "assets/menu/mcd-QPC-Deluxe-Meal-uae-1024.webp",
    emoji: "🍽️"
  },
  {
    id: "meal-mcchicken",
    name: "McChicken Meal",
    category: "Extra Value Meals",
    description: "McChicken served with fries and a drink of your choice.",
    price: 33,
    image: "assets/menu/mcd-McChicken-Meal-uae-0724.webp",
    emoji: "🍽️"
  },
  {
    id: "meal-spicy-mcchicken",
    name: "Spicy McChicken Meal",
    category: "Extra Value Meals",
    description: "Spicy McChicken served with fries and a drink of your choice.",
    price: 34,
    image: "assets/menu/mcd-Spicy-McChicken-Meal-uae-0724.webp",
    emoji: "🍽️"
  },
  {
    id: "meal-grand-chicken",
    name: "Grand Chicken Meal",
    category: "Extra Value Meals",
    description: "Grand Chicken served with fries and a drink of your choice.",
    price: 40,
    image: "assets/menu/mcd-Grand-Chicken-Meal-uae-0724.webp",
    emoji: "🍽️"
  },
  {
    id: "meal-grand-chicken-spicy",
    name: "Grand Chicken Spicy Meal",
    category: "Extra Value Meals",
    description: "Grand Chicken Spicy served with fries and a drink of your choice.",
    price: 41,
    image: "assets/menu/mcd-Grand-Chicken-Spicy-meal-uae-0724.webp",
    emoji: "🍽️"
  },
  {
    id: "meal-mccrispy",
    name: "McCrispy Meal",
    category: "Extra Value Meals",
    description: "McCrispy served with fries and a drink of your choice.",
    price: 37,
    image: "assets/menu/mcd-mccrispy-meal-uae-0225.webp",
    emoji: "🍽️"
  },
  {
    id: "meal-mccrispy-deluxe",
    name: "McCrispy Deluxe Meal",
    category: "Extra Value Meals",
    description: "McCrispy Deluxe served with fries and a drink of your choice.",
    price: 39,
    image: "assets/menu/mcd-McCrispy-Deluxe-Meal-uae-0426.webp",
    emoji: "🍽️"
  },
  {
    id: "meal-spicy-mccrispy",
    name: "Spicy McCrispy Meal",
    category: "Extra Value Meals",
    description: "Spicy McCrispy served with fries and a drink of your choice.",
    price: 37,
    image: "assets/menu/mcd-Spicy-McCrispy-Meal-uae-0426.webp",
    emoji: "🍽️"
  },
  {
    id: "meal-chicken-mac",
    name: "Chicken Mac Meal",
    category: "Extra Value Meals",
    description: "Chicken Mac served with fries and a drink of your choice.",
    price: 37,
    image: "assets/menu/mcd-ChickenMac-Meal-uae-0724.webp",
    emoji: "🍽️"
  },
  {
    id: "meal-mcarabia",
    name: "McArabia Meal",
    category: "Extra Value Meals",
    description: "McArabia Grilled Chicken served with fries and a drink of your choice.",
    price: 37,
    image: "assets/menu/mcd-McArabia-Meal-uae-0724.webp",
    emoji: "🍽️"
  },
  {
    id: "meal-fillet-o-fish",
    name: "Filet-O-Fish Meal",
    category: "Extra Value Meals",
    description: "Filet-O-Fish served with fries and a drink of your choice.",
    price: 25,
    image: "assets/menu/mcd-Fillet-O-Fish-Meal-uae-0724.webp",
    emoji: "🍽️"
  },
  {
    id: "meal-nuggets-6pc",
    name: "6pc Chicken McNuggets Meal",
    category: "Extra Value Meals",
    description: "6 piece Chicken McNuggets served with fries and a drink of your choice.",
    price: 25,
    image: "assets/menu/mcd-6pc-Nuggets-Meal-uae-0824.webp",
    emoji: "🍽️"
  },
  {
    id: "meal-nuggets-9pc",
    name: "9pc Chicken McNuggets Meal",
    category: "Extra Value Meals",
    description: "9 piece Chicken McNuggets served with fries and a drink of your choice.",
    price: 30,
    image: "assets/menu/mcd-9pc-Chicken-McNuggets-Meal-uae-0824.webp",
    emoji: "🍽️"
  },
  {
    id: "meal-veggie-deluxe",
    name: "Veggie Deluxe Meal",
    category: "Extra Value Meals",
    description: "Veggie Deluxe served with fries and a drink of your choice.",
    price: 30,
    image: "assets/menu/mcd-Veggie-Deluxe-Meal-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "breakfast-big-breakfast",
    name: "Big Breakfast",
    category: "Breakfast",
    description: "Scrambled eggs, hash brown, sausage patty and a warm buttermilk biscuit.",
    price: 19,
    image: "assets/menu/mcd-big-breakfast-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "breakfast-egg-muffin",
    name: "Egg Muffin",
    category: "Breakfast",
    description: "English muffin with fluffy egg and melted cheese.",
    price: 12,
    image: "assets/menu/mcd-egg-muffin-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "breakfast-sausage-muffin",
    name: "Sausage Muffin",
    category: "Breakfast",
    description: "English muffin with a savory sausage patty and melted cheese.",
    price: 12,
    image: "assets/menu/mcd-sausage-muffin-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "breakfast-sausage-egg-muffin",
    name: "Sausage & Egg Muffin",
    category: "Breakfast",
    description: "English muffin with sausage patty, fluffy egg and melted cheese.",
    price: 15,
    image: "assets/menu/mcd-sausage-egg-muffin-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "breakfast-chicken-muffin",
    name: "Chicken Muffin",
    category: "Breakfast",
    description: "English muffin with a crispy chicken patty and melted cheese.",
    price: 13,
    image: "assets/menu/mcd-chicken-muffin-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "breakfast-egg-hashbrown-wrap",
    name: "Egg & Hash Brown Wrap",
    category: "Breakfast",
    description: "Soft tortilla wrap filled with fluffy egg and crispy hash brown.",
    price: 14,
    image: "assets/menu/mcd-egg-hashbrown-wrap-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "breakfast-egg-sausage-wrap",
    name: "Egg & Sausage Wrap",
    category: "Breakfast",
    description: "Soft tortilla wrap filled with fluffy egg and savory sausage.",
    price: 15,
    image: "assets/menu/mcd-egg-sausage-wrap-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "breakfast-hashbrown",
    name: "Hash Brown",
    category: "Breakfast",
    description: "Crispy, golden shredded potato hash brown.",
    price: 6,
    image: "assets/menu/mcd-hashbrown-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "breakfast-hotcakes",
    name: "Hotcakes",
    category: "Breakfast",
    description: "Fluffy pancakes served with syrup and butter.",
    price: 14,
    image: "assets/menu/mcd-hotcake-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "side-small-fries",
    name: "French Fries (Small)",
    category: "Snacks & Sides",
    description: "Golden, crispy world-famous fries, salted to perfection.",
    price: 7,
    image: "assets/menu/mcd-small-Fries-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "side-pineapple-sticks",
    name: "Pineapple Sticks",
    category: "Snacks & Sides",
    description: "Fresh, juicy pineapple sticks — a refreshing snack.",
    price: 6,
    image: "assets/menu/mcd-Pineapple-sticks-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "side-banana",
    name: "Banana",
    category: "Snacks & Sides",
    description: "A fresh whole banana.",
    price: 4,
    image: "assets/menu/mcd-Banana-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "side-ice-cream-cone",
    name: "Ice Cream Cone",
    category: "Snacks & Sides",
    description: "Smooth vanilla soft-serve in a crispy cone.",
    price: 4,
    image: "assets/menu/mcd-Ice-Cream-Cone-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "dessert-mcflurry-oreo",
    name: "McFlurry Oreo",
    category: "Desserts",
    description: "Creamy soft-serve blended with crushed Oreo cookie pieces.",
    price: 11,
    image: "assets/menu/mcd-McFlurry-Oreo-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "dessert-kitkat-mcflurry",
    name: "McFlurry KitKat",
    category: "Desserts",
    description: "Creamy soft-serve blended with crushed KitKat pieces.",
    price: 11,
    image: "assets/menu/mcd-KitKat-McFlurry-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "dessert-caramel-sundae",
    name: "Caramel Sundae",
    category: "Desserts",
    description: "Soft-serve vanilla ice cream topped with rich caramel sauce.",
    price: 8,
    image: "assets/menu/mcd-Caramel-Sundae-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "dessert-hot-fudge-sundae",
    name: "Hot Fudge Sundae",
    category: "Desserts",
    description: "Soft-serve vanilla ice cream topped with warm hot fudge sauce.",
    price: 8,
    image: "assets/menu/mcd-Hot-Fudge-Sundae-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "dessert-strawberry-sundae",
    name: "Strawberry Sundae",
    category: "Desserts",
    description: "Soft-serve vanilla ice cream topped with sweet strawberry sauce.",
    price: 8,
    image: "assets/menu/mcd-Strawberry-Sundae-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "dessert-choco-cookie",
    name: "Double Chocolate Cookie",
    category: "Desserts",
    description: "A soft-baked cookie loaded with double chocolate chunks.",
    price: 7,
    image: "assets/menu/mcd-Choco-Cookie-0124-uae.webp",
    emoji: "🍽️"
  },
  {
    id: "dessert-milk-choco-cookie",
    name: "Milk Chocolate Chunk Cookie",
    category: "Desserts",
    description: "A soft-baked cookie loaded with milk chocolate chunks.",
    price: 7,
    image: "assets/menu/mcd-Milk-Choco-Chunk-Cookie-0124-uae.webp",
    emoji: "🍽️"
  },
  {
    id: "dessert-choco-fudge",
    name: "Choco Fudge Cake",
    category: "Desserts",
    description: "Rich, moist chocolate fudge cake slice.",
    price: 12,
    image: "assets/menu/mcd-Choco-Fudge-0124-uae.webp",
    emoji: "🍽️"
  },
  {
    id: "dessert-choco-croissant",
    name: "Chocolate Croissant",
    category: "Desserts",
    description: "Buttery, flaky croissant filled with rich chocolate.",
    price: 11,
    image: "assets/menu/mcd-Choco-Croissant-0124-uae.webp",
    emoji: "🍽️"
  },
  {
    id: "dessert-cheese-croissant",
    name: "Cheese Croissant",
    category: "Desserts",
    description: "Buttery, flaky croissant filled with creamy cheese.",
    price: 11,
    image: "assets/menu/mcd-Cheese-Croissant-0124-uae.webp",
    emoji: "🍽️"
  },
  {
    id: "dessert-plain-croissant",
    name: "Plain Croissant",
    category: "Desserts",
    description: "A classic buttery, flaky croissant.",
    price: 10,
    image: "assets/menu/mcd-Plain-Croissant-0124-uae.webp",
    emoji: "🍽️"
  },
  {
    id: "dessert-red-velvet",
    name: "Red Velvet Cake",
    category: "Desserts",
    description: "A soft red velvet cake slice with cream cheese frosting.",
    price: 12,
    image: "assets/menu/mcd-Red-Velvet-0124-uae.webp",
    emoji: "🍽️"
  },
  {
    id: "dessert-skinny-bb-muffin",
    name: "Skinny Blueberry Muffin",
    category: "Desserts",
    description: "A light muffin bursting with juicy blueberries.",
    price: 10,
    image: "assets/menu/mcd-Skinny-BB-Muffin-0124-uae.webp",
    emoji: "🍽️"
  },
  {
    id: "dessert-triple-choco-muffin",
    name: "Triple Chocolate Muffin",
    category: "Desserts",
    description: "A rich muffin loaded with triple chocolate chips.",
    price: 10,
    image: "assets/menu/mcd-Triple-Choco-Muffin-0124-uae.webp",
    emoji: "🍽️"
  },
  {
    id: "dessert-sugar-donut",
    name: "Sugar Donut",
    category: "Desserts",
    description: "A soft, fluffy donut coated in sugar.",
    price: 7,
    image: "assets/menu/mcd-Sugar-Donut-0124-uae.webp",
    emoji: "🍽️"
  },
  {
    id: "dessert-blueberry-cheesecake",
    name: "Blueberry Cheesecake",
    category: "Desserts",
    description: "Creamy cheesecake slice topped with blueberry compote.",
    price: 13,
    image: "assets/menu/mcd-blueberry-Cheesecake-0124-uae.webp",
    emoji: "🍽️"
  },
  {
    id: "dessert-mcpops",
    name: "McPops",
    category: "Desserts",
    description: "Bite-sized golden pastry pops filled with sweet filling.",
    price: 9,
    image: "assets/menu/mcd-McPops-uae-0124.webp",
    emoji: "🍽️"
  },
  {
    id: "dessert-macarons",
    name: "Macarons (3pc)",
    category: "Desserts",
    description: "3 delicate French macarons in assorted flavors.",
    price: 14,
    image: "assets/menu/mcd-3pc-Macarons-0124-uae.webp",
    emoji: "🍽️"
  },
  {
    id: "beverage-coca-cola",
    name: "Coca-Cola",
    category: "Beverages",
    description: "Ice-cold Coca-Cola, the perfect companion to your meal.",
    price: 7,
    image: "assets/menu/mcd-Coca-cola-uae-0724.webp",
    emoji: "🍽️"
  },
  {
    id: "beverage-coca-cola-zero",
    name: "Coca-Cola Zero Sugar",
    category: "Beverages",
    description: "All the taste of Coca-Cola with zero sugar.",
    price: 7,
    image: "assets/menu/mcd-Coca-cola_ZERO-uae-0724.webp",
    emoji: "🍽️"
  },
  {
    id: "beverage-sprite",
    name: "Sprite",
    category: "Beverages",
    description: "Crisp, refreshing lemon-lime soda.",
    price: 7,
    image: "assets/menu/mcd-Sprite-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "beverage-sprite-zero",
    name: "Sprite Zero Sugar",
    category: "Beverages",
    description: "Crisp, refreshing lemon-lime soda with zero sugar.",
    price: 7,
    image: "assets/menu/mcd-Sprite-ZERO-uae-0724.webp",
    emoji: "🍽️"
  },
  {
    id: "beverage-fanta",
    name: "Fanta",
    category: "Beverages",
    description: "Fizzy, fruity orange soda.",
    price: 7,
    image: "assets/menu/mcd-Fanta-uae-0724.webp",
    emoji: "🍽️"
  },
  {
    id: "beverage-apple-juice",
    name: "Apple Juice",
    category: "Beverages",
    description: "Refreshing 100% apple juice.",
    price: 9,
    image: "assets/menu/mcd-Apple-juice-uae-0724.webp",
    emoji: "🍽️"
  },
  {
    id: "beverage-orange-juice",
    name: "Orange Juice",
    category: "Beverages",
    description: "Refreshing 100% orange juice.",
    price: 9,
    image: "assets/menu/mcd-Orange-Juice-uae-0724.webp",
    emoji: "🍽️"
  },
  {
    id: "beverage-chocolate-milk",
    name: "Chocolate Milk",
    category: "Beverages",
    description: "Cold, creamy chocolate-flavored milk.",
    price: 8,
    image: "assets/menu/mcd-chocolate-milk-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "beverage-tea",
    name: "Tea",
    category: "Beverages",
    description: "A comforting cup of hot tea.",
    price: 10,
    image: "assets/menu/mcd-Tea-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "beverage-fuze-tea",
    name: "Fuze Tea",
    category: "Beverages",
    description: "Refreshing iced tea with a hint of lemon.",
    price: 9,
    image: "assets/menu/mcd-FuzeTea-uae-0824.webp",
    emoji: "🍽️"
  },
  {
    id: "mccafe-espresso",
    name: "Espresso",
    category: "McCafé",
    description: "A bold, concentrated shot of espresso.",
    price: 11,
    image: "assets/menu/mcd-Espresso-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "mccafe-cappuccino",
    name: "Cappuccino",
    category: "McCafé",
    description: "Espresso topped with steamed milk and a thick layer of foam.",
    price: 14,
    image: "assets/menu/mcd-Cappuccino-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "mccafe-latte",
    name: "Latte",
    category: "McCafé",
    description: "Smooth espresso with steamed milk.",
    price: 14,
    image: "assets/menu/mcd-Latte-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "mccafe-iced-latte",
    name: "Iced Latte",
    category: "McCafé",
    description: "Chilled espresso with cold milk over ice.",
    price: 16,
    image: "assets/menu/mcd-Iced-Latte-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "mccafe-mocha",
    name: "Mocha",
    category: "McCafé",
    description: "Espresso with steamed milk and rich chocolate.",
    price: 16,
    image: "assets/menu/mcd-Mocha-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "mccafe-hot-chocolate",
    name: "Hot Chocolate",
    category: "McCafé",
    description: "Rich and creamy hot chocolate.",
    price: 15,
    image: "assets/menu/mcd-Hot-Chocolate-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "mccafe-chocolate-frappe",
    name: "Chocolate Frappe",
    category: "McCafé",
    description: "A blended iced coffee treat with rich chocolate flavor.",
    price: 18,
    image: "assets/menu/mcd-Chocolate-Frappe-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "mccafe-vanilla-frappe",
    name: "Vanilla Frappe",
    category: "McCafé",
    description: "A blended iced coffee treat with smooth vanilla flavor.",
    price: 18,
    image: "assets/menu/mcd-Vanilla-Frappe-uae-1223.webp",
    emoji: "🍽️"
  },
  {
    id: "happy-cheeseburger-fries",
    name: "Happy Meal Cheeseburger with Fries",
    category: "Happy Meal",
    description: "Cheeseburger, small fries, small drink and a surprise toy.",
    price: 18,
    image: "assets/menu/mcd-cheeseburger-with-fries-uae-0125.webp",
    emoji: "🍽️"
  },
  {
    id: "happy-cheeseburger-banana",
    name: "Happy Meal Cheeseburger with Banana",
    category: "Happy Meal",
    description: "Cheeseburger, banana, small drink and a surprise toy.",
    price: 18,
    image: "assets/menu/mcd-cheeseburger-with-banana-uae-0125.webp",
    emoji: "🍽️"
  },
  {
    id: "happy-cheeseburger-pineapple",
    name: "Happy Meal Cheeseburger with Pineapple",
    category: "Happy Meal",
    description: "Cheeseburger, pineapple sticks, small drink and a surprise toy.",
    price: 18,
    image: "assets/menu/mcd-cheeseburger-with-pineapple-uae-0125.webp",
    emoji: "🍽️"
  },
  {
    id: "happy-chickenburger-fries",
    name: "Happy Meal Chicken Burger with Fries",
    category: "Happy Meal",
    description: "Chicken burger, small fries, small drink and a surprise toy.",
    price: 18,
    image: "assets/menu/mcd-chickenburger-with-fries-uae-0125.webp",
    emoji: "🍽️"
  },
  {
    id: "happy-chickenburger-banana",
    name: "Happy Meal Chicken Burger with Banana",
    category: "Happy Meal",
    description: "Chicken burger, banana, small drink and a surprise toy.",
    price: 18,
    image: "assets/menu/mcd-chickenburger-with-banana-uae-0125.webp",
    emoji: "🍽️"
  },
  {
    id: "happy-chickenburger-pineapple",
    name: "Happy Meal Chicken Burger with Pineapple",
    category: "Happy Meal",
    description: "Chicken burger, pineapple sticks, small drink and a surprise toy.",
    price: 18,
    image: "assets/menu/mcd-chickenburger-with-pineapple-uae-0125.webp",
    emoji: "🍽️"
  },
  {
    id: "happy-nuggets-fries",
    name: "Happy Meal Chicken Nuggets with Fries",
    category: "Happy Meal",
    description: "4pc nuggets, small fries, small drink and a surprise toy.",
    price: 17,
    image: "assets/menu/mcd-chickennuggets-with-fries-uae-0125.webp",
    emoji: "🍽️"
  },
  {
    id: "happy-nuggets-banana",
    name: "Happy Meal Chicken Nuggets with Banana",
    category: "Happy Meal",
    description: "4pc nuggets, banana, small drink and a surprise toy.",
    price: 17,
    image: "assets/menu/mcd-chickennuggets-with-banana-uae-0125.webp",
    emoji: "🍽️"
  },
  {
    id: "happy-nuggets-pineapple",
    name: "Happy Meal Chicken Nuggets with Pineapple",
    category: "Happy Meal",
    description: "4pc nuggets, pineapple sticks, small drink and a surprise toy.",
    price: 17,
    image: "assets/menu/mcd-chickennuggets-with-pineapple-uae-0125.webp",
    emoji: "🍽️"
  },
  {
    id: "happy-beefburger-fries",
    name: "Happy Meal Beef Burger with Fries",
    category: "Happy Meal",
    description: "Beef burger, small fries, small drink and a surprise toy.",
    price: 18,
    image: "assets/menu/mcd-beefburger-with-fries-uae-0125.webp",
    emoji: "🍽️"
  },
  {
    id: "happy-beefburger-pineapple",
    name: "Happy Meal Beef Burger with Pineapple",
    category: "Happy Meal",
    description: "Beef burger, pineapple sticks, small drink and a surprise toy.",
    price: 18,
    image: "assets/menu/mcd-beefburger-with-pineapple-uae-0125.webp",
    emoji: "🍽️"
  },
  {
    id: "happy-beefburger-banana",
    name: "Happy Meal Beef Burger with Banana",
    category: "Happy Meal",
    description: "Beef burger, banana, small drink and a surprise toy.",
    price: 18,
    image: "assets/menu/mcd-hm-beefburger-with-banana-uae-0125.webp",
    emoji: "🍽️"
  }
];

/* ---------- State ---------- */
let cart = loadCart();
let currentCategory = "All";
let currentSearch = "";

/* ---------- Persistence helpers ---------- */
function loadCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function loadUiState() {
  try {
    const raw = localStorage.getItem(UI_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveUiState() {
  localStorage.setItem(
    UI_STORAGE_KEY,
    JSON.stringify({ category: currentCategory, search: currentSearch })
  );
}

/* ---------- Cart helpers ---------- */
function getQty(id) {
  return cart[id] || 0;
}

function setQty(id, qty) {
  const clamped = Math.max(0, qty);
  if (clamped === 0) {
    delete cart[id];
  } else {
    cart[id] = clamped;
  }
  saveCart();
  renderAll();
}

function addItem(id) {
  setQty(id, getQty(id) + 1);
}

function removeItem(id) {
  setQty(id, getQty(id) - 1);
}

function cartTotalCount() {
  return Object.values(cart).reduce((sum, q) => sum + q, 0);
}

function cartSubtotal() {
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = MENU_ITEMS.find((m) => m.id === id);
    return item ? sum + getDiscountedPrice(item) * qty : sum;
  }, 0);
}

/* ---------- Rendering: Menu ---------- */
function getFilteredItems() {
  return MENU_ITEMS.filter((item) => {
    const matchesCategory =
      currentCategory === "All" || item.category === currentCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
      item.description.toLowerCase().includes(currentSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}

function productImageMarkup(item) {
  if (item.image) {
    return `<img src="${item.image}" alt="${item.name}" />`;
  }
  return item.emoji || "🍽️";
}

function renderMenu() {
  const grid = document.getElementById("menuGrid");
  const noResults = document.getElementById("noResults");
  const items = getFilteredItems();

  grid.innerHTML = "";

  if (items.length === 0) {
    noResults.hidden = false;
  } else {
    noResults.hidden = true;
  }

  items.forEach((item) => {
    const qty = getQty(item.id);
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-image">${productImageMarkup(item)}</div>
      <div class="product-body">
        <h3 class="product-name">${item.name}</h3>
        <p class="product-desc">${item.description}</p>
        <p class="product-price">
          <span class="price-old">${item.price} AED</span>
          <span class="price-new">${getDiscountedPrice(item)} AED</span>
          <span class="price-badge">-50%</span>
        </p>
        <div class="product-actions">
          ${
            qty > 0
              ? `<div class="qty-controls">
                   <button class="qty-btn" data-action="remove" data-id="${item.id}" aria-label="Remove one ${item.name}">−</button>
                   <span class="qty-value">${qty}</span>
                   <button class="qty-btn" data-action="add" data-id="${item.id}" aria-label="Add one ${item.name}">+</button>
                 </div>`
              : `<button class="add-btn" data-action="add" data-id="${item.id}">Add</button>`
          }
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* ---------- Rendering: Cart ---------- */
function renderCart() {
  const cartItemsEl = document.getElementById("cartItems");
  const cartEmptyMsg = document.getElementById("cartEmptyMsg");
  const cartSummary = document.getElementById("cartSummary");

  const entries = Object.entries(cart).filter(([, qty]) => qty > 0);

  cartItemsEl.innerHTML = "";

  if (entries.length === 0) {
    cartEmptyMsg.hidden = false;
    cartSummary.hidden = true;
    return;
  }

  cartEmptyMsg.hidden = true;
  cartSummary.hidden = false;

  entries.forEach(([id, qty]) => {
    const item = MENU_ITEMS.find((m) => m.id === id);
    if (!item) return;
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div class="cart-item-icon">${productImageMarkup(item)}</div>
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">
          <span class="price-old">${item.price} AED</span>
          <span class="price-new">${getDiscountedPrice(item)} AED</span> × ${qty} = ${Math.round(getDiscountedPrice(item) * qty * 100) / 100} AED
        </p>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" data-action="remove" data-id="${id}" aria-label="Remove one ${item.name}">−</button>
        <span class="qty-value">${qty}</span>
        <button class="qty-btn" data-action="add" data-id="${id}" aria-label="Add one ${item.name}">+</button>
      </div>
    `;
    cartItemsEl.appendChild(row);
  });

  const subtotal = cartSubtotal();
  const total = subtotal + DELIVERY_FEE;

  document.getElementById("subtotalVal").textContent = `${subtotal} AED`;
  document.getElementById("deliveryVal").textContent = `${DELIVERY_FEE} AED`;
  document.getElementById("totalVal").textContent = `${total} AED`;
}

function renderCartBadge() {
  document.getElementById("cartBadge").textContent = cartTotalCount();
}

function renderAll() {
  renderMenu();
  renderCart();
  renderCartBadge();
}

/* ---------- Drawer / Modal controls ---------- */
function openCart() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("overlay").classList.add("visible");
}

function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("overlay").classList.remove("visible");
}

function openCheckout() {
  if (cartTotalCount() === 0) return;
  renderCheckoutSummary();
  goToCheckoutStep(1);
  document.getElementById("checkoutModal").classList.add("open");
  document.getElementById("checkoutOverlay").classList.add("visible");
  closeCart();
}

function closeCheckout() {
  document.getElementById("checkoutModal").classList.remove("open");
  document.getElementById("checkoutOverlay").classList.remove("visible");
}

function goToCheckoutStep(step) {
  document.getElementById("checkoutPanel1").hidden = step !== 1;
  document.getElementById("checkoutPanel2").hidden = step !== 2;
  document.querySelectorAll(".checkout-step").forEach((el) => {
    el.classList.toggle("active", Number(el.dataset.step) === step);
  });
}

function renderCheckoutSummary() {
  const el = document.getElementById("checkoutSummary");
  const subtotal = cartSubtotal();
  const total = subtotal + DELIVERY_FEE;
  const entries = Object.entries(cart).filter(([, qty]) => qty > 0);

  let itemsHtml = entries
    .map(([id, qty]) => {
      const item = MENU_ITEMS.find((m) => m.id === id);
      if (!item) return "";
      const discounted = getDiscountedPrice(item);
      return `<div class="summary-row"><span>${item.name} × ${qty}</span><span><span class="price-old">${item.price * qty} AED</span> <span class="price-new">${Math.round(discounted * qty * 100) / 100} AED</span></span></div>`;
    })
    .join("");

  el.innerHTML = `
    ${itemsHtml}
    <div class="summary-row"><span>Subtotal</span><span>${subtotal} AED</span></div>
    <div class="summary-row"><span>Delivery Fee</span><span>${DELIVERY_FEE} AED</span></div>
    <div class="summary-row total-row"><span>Total</span><span>${total} AED</span></div>
  `;
}

/* ---------- Event wiring ---------- */
function handleQtyClick(e) {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  const id = btn.dataset.id;
  const action = btn.dataset.action;
  if (action === "add") addItem(id);
  if (action === "remove") removeItem(id);
}

function initCategories() {
  const container = document.getElementById("categories");
  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    container
      .querySelectorAll(".chip")
      .forEach((c) => c.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.dataset.category;
    saveUiState();
    renderMenu();
  });
}

function initSearch() {
  const input = document.getElementById("searchInput");
  input.addEventListener("input", () => {
    currentSearch = input.value.trim();
    saveUiState();
    renderMenu();
  });
}

function initCartControls() {
  document.getElementById("cartBtn").addEventListener("click", openCart);
  document.getElementById("closeCartBtn").addEventListener("click", closeCart);
  document.getElementById("overlay").addEventListener("click", closeCart);
  document.getElementById("cartItems").addEventListener("click", handleQtyClick);
  document.getElementById("checkoutBtn").addEventListener("click", openCheckout);
}

function initCheckoutControls() {
  document
    .getElementById("closeCheckoutBtn")
    .addEventListener("click", closeCheckout);
  document
    .getElementById("checkoutOverlay")
    .addEventListener("click", closeCheckout);
  document
    .getElementById("toPaymentBtn")
    .addEventListener("click", handleContinueToPayment);
  document
    .getElementById("toDeliveryBtn")
    .addEventListener("click", () => goToCheckoutStep(1));

  document.querySelectorAll('input[name="payment"]').forEach((radio) => {
    radio.addEventListener("change", updateCardFieldsVisibility);
  });
  updateCardFieldsVisibility();

  initCardFieldFormatting();
}

function updateCardFieldsVisibility() {
  const selected = document.querySelector('input[name="payment"]:checked');
  const cardFields = document.getElementById("cardFields");
  cardFields.hidden = !selected || selected.value !== "Card";
}

function initCardFieldFormatting() {
  const numberInput = document.getElementById("cardNumber");
  numberInput.addEventListener("input", () => {
    const digits = numberInput.value.replace(/\D/g, "").slice(0, 16);
    numberInput.value = digits.replace(/(.{4})/g, "$1 ").trim();
  });

  const expiryInput = document.getElementById("cardExpiry");
  expiryInput.addEventListener("input", () => {
    const digits = expiryInput.value.replace(/\D/g, "").slice(0, 4);
    expiryInput.value =
      digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  });

  const cvvInput = document.getElementById("cardCvv");
  cvvInput.addEventListener("input", () => {
    cvvInput.value = cvvInput.value.replace(/\D/g, "").slice(0, 4);
  });
}

function handleContinueToPayment() {
  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const address = document.getElementById("custAddress").value.trim();
  const area = document.getElementById("custArea").value.trim();
  const errorEl = document.getElementById("step1Error");

  if (!name || !phone || !address || !area) {
    errorEl.textContent = "Please fill in all required fields.";
    errorEl.hidden = false;
    return;
  }

  errorEl.hidden = true;
  goToCheckoutStep(2);
}

function initHeroCta() {
  document.getElementById("orderNowBtn").addEventListener("click", () => {
    document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
  });
}

function initMenuGridEvents() {
  document.getElementById("menuGrid").addEventListener("click", handleQtyClick);
}

function restoreUiState() {
  const state = loadUiState();
  if (state.category) {
    currentCategory = state.category;
    document.querySelectorAll(".chip").forEach((chip) => {
      chip.classList.toggle("active", chip.dataset.category === currentCategory);
    });
  }
  if (state.search) {
    currentSearch = state.search;
    document.getElementById("searchInput").value = currentSearch;
  }
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  restoreUiState();
  initCategories();
  initSearch();
  initCartControls();
  initCheckoutControls();
  initHeroCta();
  initMenuGridEvents();
  renderAll();
});
