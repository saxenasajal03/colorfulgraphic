import React from "react";
import { Link } from "react-router-dom";

export const navLinks = [
  { name: "Inventory", path: "/inventory" },
  { name: "Same Day Delivery", megaMenu: true, categories: [] },
  { name: "Stationery", megaMenu: true, categories: [] },
  { name: "Corporate Gifts", megaMenu: true, categories: [] },
  { name: "Drinkware", megaMenu: true, categories: [] },
  { name: "Labels & Packaging", megaMenu: true, categories: [] },
  { name: "Apparel", megaMenu: true, categories: [] },
  { name: "Signages", megaMenu: true, categories: [] },
  { name: "Marketing & Promo", megaMenu: true, categories: [] },
  { name: "Photo Gifts", megaMenu: true, categories: [] },
];

// Move the categories data here
const sameDayCategories = [
  {
    title: "Business Essentials",
    items: [
      { name: "Business Cards", badge: "Popular" },
      { name: "Certificates" },
      { name: "Letterheads" },
      { name: "Document Printing" },
      { name: "Brochures" },
      { name: "Cards" },
      { name: "Notepad" },
      { name: "Acrylic Table Top Stands", badge: "Popular", badgeColor: "blue" },
    ],
  },
  {
    title: "Event Stationery",
    items: [
      { name: "ID Cards" },
      { name: "Invitations" },
      { name: "Bookmarks" },
      { name: "Thank You Cards" },
      { name: "Notebooks" },
      { name: "Calendars" },
      { name: "Diaries" },
      { name: "Riteon Notebooks", badge: "New" },
    ],
  },
  {
    title: "Personalized Gifts",
    items: [
      { name: "Photo Frames" },
      { name: "Photo Prints" },
      { name: "Photo Mugs" },
      { name: "Photo with Wooden Stand", badge: "New" },
      { name: "Photo Wall Calendar" },
      { name: "Greeting Cards" },
    ],
  },
  {
    title: "Printed Promotional Materials",
    items: [
      { name: "Flyers and Leaflets", badge: "Recommended", badgeColor: "blue" },
      { name: "Post Cards" },
      { name: "Posters" },
      { name: "Booklets" },
      { name: "Tent Cards" },
      { name: "Danglers" },
    ],
  },
  {
    title: "Packaging Accessories",
    items: [
      { name: "Packaging Sleeves" },
      { name: "Pre-printed Gift Wrapping Papers", badge: "New" },
      { name: "Tags" },
      { name: "Holographic Stickers" },
      { name: "Transparent Packaging Labels" },
    ],
  },
];

const stationeryCategories = JSON.parse(JSON.stringify(sameDayCategories));
const corporateGiftsCategories = JSON.parse(JSON.stringify(sameDayCategories));
const drinkwareCategories = JSON.parse(JSON.stringify(sameDayCategories));
const labelsPackagingCategories = JSON.parse(JSON.stringify(sameDayCategories));
const apparelCategories = JSON.parse(JSON.stringify(sameDayCategories));
const signagesCategories = JSON.parse(JSON.stringify(sameDayCategories));
const marketingPromoCategories = JSON.parse(JSON.stringify(sameDayCategories));
const photoGiftsCategories = JSON.parse(JSON.stringify(sameDayCategories));

const categoriesMap = {
  "Same Day Delivery": sameDayCategories,
  "Stationery": stationeryCategories,
  "Corporate Gifts": corporateGiftsCategories,
  "Drinkware": drinkwareCategories,
  "Labels & Packaging": labelsPackagingCategories,
  "Apparel": apparelCategories,
  "Signages": signagesCategories,
  "Marketing & Promo": marketingPromoCategories,
  "Photo Gifts": photoGiftsCategories,
};

const MegaMenu = ({ link, openDropdownIndex, index, formatCategoryRoute }) => {
  if (!link.megaMenu || openDropdownIndex !== index) return null;
  // Use categories from the map if not provided
  const categories = link.categories && link.categories.length > 0 ? link.categories : categoriesMap[link.name] || [];
  return (
    <div 
      className="fixed left-1/2 transform -translate-x-1/2 z-50 w-[90vw] max-w-7xl bg-white shadow-xl rounded-lg"
      style={{ top: '120px' }}
    >
      <div className="grid grid-cols-5 gap-6 p-8">
        {categories.map((category, catIndex) => (
          <div key={catIndex} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {category.title}
            </h3>
            <ul className="space-y-2">
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Link
                    to={formatCategoryRoute(item.name)}
                    className="flex items-center text-gray-600 hover:text-blue-700"
                  >
                    <span>{item.name}</span>
                    {item.badge && (
                      <span
                        className={`ml-2 px-2 py-0.5 text-xs rounded ${
                          item.badgeColor === "blue"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu; 