"use client";
import React, { useState } from "react";
export default function TravelApp() {
const [activeCategory, setActiveCategory] = useState("all");
const [userLocation, setUserLocation] = useState(null);
const [isTracking, setIsTracking] = useState(false);
const [watchId, setWatchId] = useState(null);
const [trackedPath, setTrackedPath] = useState([]);
const [searchQuery, setSearchQuery] = useState("");
const categories = [
{ id: "all", name: "সব ক্যাটাগরি" },
{ id: "adventure", name: "১. অ্যাডভেঞ্চার ও অভিজ্ঞতা" },
{ id: "culture", name: "২. সংস্কৃতি ও লাইফস্টাইল" },
{ id: "wellness", name: "৩. রিল্যাক্সেশন ও প্রশান্তি" },
{ id: "social", name: "৪. সামাজিক ও বিনোদন" }
];
const travelActivities = [
{
id: 1,
cat: "adventure",
title: "সোলো ট্রাভেলিং (Solo Traveling)",
desc: "একা একা নতুন জায়গায় যাওয়া, নিজের সাথে সময় কাটানো এবং আত্মবিশ্বাস বাড়ানো।",
icon: "🧳",
tags: ["Solo", "Self-Discovery", "Freedom"]
},
{
id: 2,
cat: "adventure",
title: "রোড ট্রিপ ও হাইকিং (Road Trips & Hiking)",
desc: "লং ড্রাইভ, পাহাড়ে ট্র্যাকিং, ক্যাম্পিং এবং প্রকৃতির মাঝে রাতে তাবু টাঙিয়ে থাকা।",
icon: "🏕️",
tags: ["Hiking", "Camping", "RoadTrip"]
},
{
id: 3,
cat: "adventure",
title: "অ্যাডভেঞ্চার স্পোর্টস (Adventure Sports)",
desc: "স্কুবা ডাইভিং, প্যারাগ্লাইডিং, সার্ফিং বা জিপলাইনিংয়ের মতো থ্রিলিং অভিজ্ঞতা নেওয়া।",
icon: "🪂",
tags: ["Thrilling", "Sports", "Diving"]
},
{
id: 4,
cat: "culture",
title: "লোকাল ফুড ট্যুরিজম (Food & Culinary)",
desc: "বিভিন্ন অঞ্চলের ঐতিহ্যবাহী খাবার, স্ট্রিট ফুড ও বিখ্যাত রেস্তোরাঁর স্বাদ নেওয়া।",
icon: "🍲",
tags: ["Foodie", "StreetFood", "Local"]
},
{
id: 5,
cat: "culture",
title: "সংস্কৃতি ও ইতিহাস জানা (Culture & History)",
desc: "ঐতিহাসিক স্থান, জাদুঘর, পুরনো স্থাপত্য ও স্থানীয়দের ঐতিহ্যবাহী উৎসব/মেলায় অংশ নেওয়া।",
icon: "🏛️",
tags: ["History", "Festival", "Museum"]
},
{
id: 6,
cat: "culture",
title: "ফটোগ্রাফি ও কনটেন্ট ক্রিয়েশন",
desc: "ট্রাভেল ব্লগ বা ট্রাভেল ফটোগ্রাফির মাধ্যমে সুন্দর মুহূর্তগুলো ফ্রেমবন্দী করা এবং স্মৃতি ধরে রাখা।",
icon: "📸",
tags: ["Photography", "Blogging", "Memories"]
},
{
id: 7,
cat: "wellness",
title: "প্রকৃতির কাছে যাওয়া (Nature Escapes)",
desc: "সমুদ্রসৈকত, চা-বাগান, বোন বা লেকের পাশে বসে রিল্যাক্স করা।",
icon: "🌿",
tags: ["Beach", "TeaGarden", "Nature"]
},
{
id: 8,
cat: "wellness",
title: "ওয়েলনেস ও স্পা ট্রিপ (Wellness & Spa)",
desc: "যোগব্যায়াম (Yoga Retreats), মেডিটেশন বা রিসোর্টে গিয়ে দৈনন্দিন ব্যস্ততা থেকে বিরতি নেওয়া।",
icon: "🧘‍♀️",
tags: ["Yoga", "Meditation", "Relaxation"]
},
{
id: 9,
cat: "social",
title: "গ্রুপ বা ফ্যামিলি ট্যুর (Group/Family Tour)",
desc: "বন্ধু বা পরিবারের সবাইকে নিয়ে একসাথে নতুন কোনো স্থানে ছুটির সময় কাটানো।",
icon: "👨‍👩‍👧‍👦",
tags: ["Family", "Friends", "Vacation"]
},
{
id: 10,
cat: "social",
title: "মিউজিক ও কালচারাল ফেস্ট (Music Festivals)",
desc: "বিভিন্ন দেশ বা শহরের বড় বড় কনসার্ট, মিউজিক ফেস্টিভ্যাল বা কার্নিভালে অংশ নিতে ভ্রমণ করা।",
icon: "🎶",
tags: ["Concert", "Carnival", "Music"]
}
];
const startTracking = () => {
if ("geolocation" in navigator) {
setIsTracking(true);
const id = navigator.geolocation.watchPosition(
(position) => {
const { latitude, longitude, speed } = position.coords;
const newPoint = {
lat: latitude,
lng: longitude,
speed: speed || 0,
time: new Date().toLocaleTimeString()
};
setUserLocation(newPoint);
setTrackedPath((prev) => [...prev, newPoint]);
},
(error) => {
console.error("GPS Error:", error);
alert("GPS লোকেশন অন করুন অথবা ব্রাউজারে লোকেশন পারমিশন দিন।");
setIsTracking(false);
},
{ enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
);
setWatchId(id);
} else {
alert("আপনার ফোনে জিপিএস ট্র্যাকিং সাপোর্ট করছে না।");
}
};
const stopTracking = () => {
if (watchId !== null) {
navigator.geolocation.clearWatch(watchId);
setWatchId(null);
}
setIsTracking(false);
};
const filteredActivities = travelActivities.filter((item) => {
const matchesCategory = activeCategory === "all" || item.cat === activeCategory;
const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
item.desc.toLowerCase().includes(searchQuery.toLowerCase());
return matchesCategory && matchesSearch;
});
return (
<div className="min-h-screen flex flex-col justify-between">
{/* Header */}
<header className="bg-emerald-600 text-white shadow-md sticky top-0 z-50">
<div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
<div className="flex items-center gap-2">
<span className="text-3xl">🧭</span>
<div>
<h1 className="text-xl font-bold">জীবন ও ট্রাভেল হাব</h1>
<p className="text-xs text-emerald-100">ভ্রমণ পছন্দ, পছন্দসই অ্যাক্টিভিটি ও জিপিএস ট্র্যাকার</p>
</div>
</div>
<input
type="text"
placeholder="পছন্দের কাজ খুঁজুন..."
className="px-3 py-1.5 rounded-lg text-slate-800 text-sm focus:outline-none w-full md:w-64"
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
/>
</div>
</header>
{/* Content Area */}
<main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 w-full flex-grow">
{/* Left: Travel Categories */}
<section className="lg:col-span-2 space-y-6">
<div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200">
{categories.map((cat) => (
<button
key={cat.id}
onClick={() => setActiveCategory(cat.id)}
className={px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${ activeCategory === cat.id ? "bg-emerald-600 text-white shadow" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200" }}
>
{cat.name}
</button>
))}
</div>
{/* Activity Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
{filteredActivities.map((item) => (
<div
key={item.id}
className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col justify-between"
>
<div>
<div className="flex items-center gap-3 mb-2">
<span className="text-3xl p-2 bg-emerald-50 rounded-lg">{item.icon}</span>
<h2 className="font-bold text-slate-800 text-sm sm:text-base">{item.title}</h2>
</div>
<p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">{item.desc}</p>
</div>
<div className="flex flex-wrap gap-1 mt-auto">
{item.tags.map((tag, idx) => (
<span key={idx} className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
#{tag}
</span>
))}
</div>
</div>
))}
</div>
</section>
{/* Right: GPS Live Tracking */}
<section className="space-y-6">
<div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 sticky top-20">
<div className="flex items-center justify-between mb-4 border-b pb-3">
<h2 className="font-bold text-slate-800 flex items-center gap-2 text-base">
<span>📡</span> লাইভ জিপিএস ট্র্যাকার
</h2>
<span className={h-3 w-3 rounded-full ${isTracking ? "bg-red-500 animate-ping" : "bg-slate-300"}}></span>
</div>
<p className="text-xs text-slate-500 mb-4">
ভ্রমণকালীন সময়ে আপনার বর্তমান জিপিএস লোকেশন ও স্পিড ট্র্যাক করতে নিচের বাটনে চাপ দিন।
</p>
<div className="mb-6">
{!isTracking ? (
<button
onClick={startTracking}
className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg font-medium text-sm transition-colors shadow"
>
▶ ট্র্যাকিং শুরু করুন
</button>
) : (
<button
onClick={stopTracking}
className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium text-sm transition-colors shadow"
>
⏹ ট্র্যাকিং বন্ধ করুন
  </button>
)}
</div>
{/* Live Stats */}
<div className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-100 text-xs sm:text-sm mb-4">
<div className="flex justify-between">
<span className="text-slate-500">অক্ষাংশ (Lat):</span>
<span className="font-mono font-medium">{userLocation ? userLocation.lat.toFixed(5) : "N/A"}</span>
</div>
<div className="flex justify-between">
<span className="text-slate-500">দ্রাঘিমাংশ (Lng):</span>
<span className="font-mono font-medium">{userLocation ? userLocation.lng.toFixed(5) : "N/A"}</span>
</div>
<div className="flex justify-between">
<span className="text-slate-500">গতি (Speed):</span>
<span className="font-mono font-medium">
{userLocation && userLocation.speed ? ${(userLocation.speed * 3.6).toFixed(1)} km/h : "0 km/h"}
</span>
</div>
<div className="flex justify-between">
<span className="text-slate-500">সময়:</span>
<span className="font-mono text-xs">{userLocation ? userLocation.time : "--:--"}</span>
</div>
</div>
{/* Location Log */}
<div>
<h3 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
ট্র্যাকড পয়েন্ট তালিকা ({trackedPath.length})
</h3>
<div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
{trackedPath.length === 0 ? (
<p className="text-xs text-slate-400 italic">এখনো ট্র্যাকিং ডাটা নেওয়া হয়নি</p>
) : (
trackedPath.map((pt, i) => (
<div key={i} className="text-xs bg-slate-50 p-2 rounded border border-slate-100 flex justify-between">
<span className="text-slate-600">পয়েন্ট #{i + 1}</span>
<span className="font-mono text-slate-400">{pt.time}</span>
</div>
))
)}
</div>
</div>
</div>
</section>
</main>
<footer className="bg-slate-800 text-slate-400 py-4 text-center text-xs">
<p>© 2026 জীবন ও ট্রাভেল হাব - Vercel Free Hosting</p>
</footer>
</div>
