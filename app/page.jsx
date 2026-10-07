'use client';

import React, { useState, useEffect } from 'react';
import { 
  Compass, MapPin, Navigation, Mountain, Camera, Utensils, 
  Heart, Users, Music, Activity, ShieldAlert, Award, Share2
} from 'lucide-react';

export default function TravelApp() {
  const [activeTab, setActiveTab] = useState('all');
  const [tracking, setTracking] = useState(false);
  const [currentPos, setCurrentPos] = useState(null);
  const [tripHistory, setTripHistory] = useState([]);
  const [distance, setDistance] = useState(0);

  // লাইভ জিপিএস ট্র্যাকিং সিস্টেম
  useEffect(() => {
    let watchId;
    if (tracking && typeof window !== 'undefined' && 'geolocation' in navigator) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newPoint = { lat: latitude, lng: longitude, time: new Date().toLocaleTimeString('bn-BD') };
          
          setCurrentPos(newPoint);
          setTripHistory((prev) => [...prev, newPoint]);
          
          if (tripHistory.length > 0) {
            setDistance((prev) => prev + 0.05);
          }
        },
        (error) => {
          alert('GPS লোকেশন পেতে সমস্যা হচ্ছে: ' + error.message);
          setTracking(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }
    return () => {
      if (watchId && typeof window !== 'undefined' && 'geolocation' in navigator) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [tracking]);

  // ট্রাভেল কাজের ক্যাটাগরি ও আইটেম
  const categories = [
    { id: 'all', name: 'সব অভিজ্ঞতা' },
    { id: 'adventure', name: '১. অ্যাডভেঞ্চার ও এক্সপ্লোরেশন' },
    { id: 'culture', name: '২. সংস্কৃতি ও লাইফস্টাইল' },
    { id: 'wellness', name: '৩. প্রশান্তি ও ওয়েলনেস' },
    { id: 'social', name: '৪. সামাজিক ও বিনোদন' }
  ];

  const travelActivities = [
    {
      id: 1,
      cat: 'adventure',
      title: 'সোলো ট্রাভেলিং (Solo Traveling)',
      desc: 'একা একা নতুন জায়গায় যাওয়া, নিজের সাথে সময় কাটানো এবং আত্মবিশ্বাস ও জীবনবোধ বাড়ানো।',
      icon: Compass,
      tag: 'অ্যাডভেঞ্চার'
    },
    {
      id: 2,
      cat: 'adventure',
      title: 'রোড ট্রিপ ও হাইকিং (Road Trips & Hiking)',
      desc: 'লং ড্রাইভ, পাহাড়ে ট্র্যাকিং, ক্যাম্পিং এবং প্রকৃতির মাঝে রাতে তাবু টাঙিয়ে তারার নিচে থাকা।',
      icon: Mountain,
      tag: 'অ্যাডভেঞ্চার'
    },
    {
      id: 3,
      cat: 'adventure',
      title: 'অ্যাডভেঞ্চার স্পোর্টস (Adventure Sports)',
      desc: 'স্কুবা ডাইভিং, প্যারাগ্লাইডিং, সার্ফিং বা জিপলাইনিংয়ের মতো থ্রিলিং সব অভিজ্ঞতা নেওয়া।',
      icon: Activity,
      tag: 'অ্যাডভেঞ্চার'
    },
    {
      id: 4,
      cat: 'culture',
      title: 'লোকাল ফুড ট্যুরিজম (Food & Culinary Tours)',
      desc: 'বিভিন্ন অঞ্চলের ঐতিহ্যবাহী খাবার, স্ট্রিট ফুড ও বিখ্যাত স্থানীয় রেস্তোরাঁর খাঁটি স্বাদ নেওয়া।',
      icon: Utensils,
      tag: 'সংস্কৃতি'
    },
    {
      id: 5,
      cat: 'culture',
      title: 'সংস্কৃতি ও ইতিহাস জানা (Culture & Heritage)',
      desc: 'ঐতিহাসিক স্থান, প্রাচীন স্থাপত্য, জাদুঘর ও স্থানীয়দের মেলা বা উৎসবে অংশ নেওয়া।',
      icon: ShieldAlert,
      tag: 'সংস্কৃতি'
    },
    {
      id: 6,
      cat: 'culture',
      title: 'ফটোগ্রাফি ও কনটেন্ট ক্রিয়েশন (Photography)',
      desc: 'ট্রাভেল ব্লগ, ভিডিও বা ট্রাভেল ফটোগ্রাফির মাধ্যমে সুন্দর মুহূর্তগুলো ফ্রেমবন্দী করে স্মৃতি ধরে রাখা।',
      icon: Camera,
      tag: 'সংস্কৃতি'
    },
    {
      id: 7,
      cat: 'wellness',
      title: 'প্রকৃতির কাছে যাওয়া (Nature Retreat)',
      desc: 'সমুদ্রসৈকত, চা-বাগান, পাহাড়ি বন বা শান্ত লেকের পাশে বসে রিল্যাক্স করা ও মানসিক প্রশান্তি লাভ।',
      icon: Heart,
      tag: 'প্রশান্তি'
    },
    {
      id: 8,
      cat: 'wellness',
      title: 'ওয়েলনেস ও স্পা ট্রিপ (Wellness & Spa)',
      desc: 'যোগব্যায়াম (Yoga Retreats), মেডিটেশন বা নিরিবিলি রিসোর্টে গিয়ে দৈনন্দিন ব্যস্ততা থেকে বিরতি।',
      icon: Award,
      tag: 'প্রশান্তি'
    },
    {
      id: 9,
      cat: 'social',
      title: 'গ্রুপ বা ফ্যামিলি ট্যুর (Group Travel)',
      desc: 'প্রিয় বন্ধু বা পরিবারের সবাইকে নিয়ে একসাথে নতুন কোনো স্থানে ছুটির সেরা সময় কাটানো।',
      icon: Users,
      tag: 'সামাজিক'
    },
    {
      id: 10,
      cat: 'social',
      title: 'মিউজিক ও কালচারাল ফেস্ট (Festivals & Concerts)',
      desc: 'দেশ-বিদেশের বড় বড় কনসার্ট, মিউজিক ফেস্টিভ্যাল বা কালচারাল কার্নিভালে অংশ নিতে ভ্রমণ করা।',
      icon: Music,
      tag: 'বিনোদন'
    }
  ];

  const filtered = activeTab === 'all' 
    ? travelActivities 
    : travelActivities.filter(a => a.cat === activeTab);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-12">
      {/* হেডার */}
      <header className="bg-slate-800/80 backdrop-blur sticky top-0 z-50 border-b border-slate-700 px-4 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Navigation className="w-7 h-7 text-emerald-400 animate-pulse"/>
            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              জীবন ও ট্রাভেল হাব
            </h1>
          </div>
          <button 
            onClick={() => setTracking(!tracking)}
            className={`px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 transition-all ${
              tracking 
                ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/30' 
                : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
            }`}
          >
            <MapPin className="w-4 h-4"/>
            {tracking ? 'ট্র্যাকিং বন্ধ করুন' : 'লাইভ ট্র্যাকিং শুরু'}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-6 space-y-6">
        {/* জিপিএস ট্র্যাকার ড্যাশবোর্ড */}
        {tracking && (
          <div className="bg-slate-800 rounded-2xl p-5 border border-emerald-500/40 shadow-xl space-y-4">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
                GPS ট্র্যাকিং চালু রয়েছে
              </span>
              <span className="text-xs text-slate-400">আপডেট হচ্ছে...</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700">
                <p className="text-xs text-slate-400">বর্তমান অক্ষাংশ (Lat)</p>
                <p className="text-lg font-mono text-emerald-300">{currentPos ? currentPos.lat.toFixed(4) : 'খুঁজছে...'}</p>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700">
                <p className="text-xs text-slate-400">বর্তমান দ্রাঘিমাংশ (Lng)</p>
                <p className="text-lg font-mono text-emerald-300">{currentPos ? currentPos.lng.toFixed(4) : 'খুঁজছে...'}</p>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700 col-span-2 md:col-span-1">
                <p className="text-xs text-slate-400">ভ্রমণকৃত দূরত্ব (আনুমানিক)</p>
                <p className="text-lg font-mono text-cyan-300">{distance.toFixed(2)} কি.মি.</p>
              </div>
            </div>

            {/* রুট ট্র্যাকিং হিস্ট্রি */}
            {tripHistory.length > 0 && (
              <div className="pt-2 border-t border-slate-700/60">
                <p className="text-xs text-slate-400 mb-2">সাম্প্রতিক লোকেশন পয়েন্টসমূহ:</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {tripHistory.slice(-5).reverse().map((pt, idx) => (
                    <span key={idx} className="bg-slate-900 text-xs text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 whitespace-nowrap">
                      ⏰ {pt.time} — {pt.lat.toFixed(3)}, {pt.lng.toFixed(3)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ফিল্টার ট্যাব */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === cat.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* অভিজ্ঞতা সমূহের গ্রিড কার্ড */}
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((act) => {
            const IconComp = act.icon;
            return (
              <div 
                key={act.id} 
                className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 shadow-lg flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">
                      <IconComp className="w-6 h-6"/>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-slate-700/60 text-slate-300 border border-slate-600">
                      {act.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-emerald-400 transition-colors">
                    {act.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {act.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-700/50 flex justify-between items-center text-xs text-slate-400">
                  <span className="flex items-center gap-1 hover:text-emerald-400 cursor-pointer">
                    <Share2 className="w-3.5 h-3.5"/> শেয়ার করুন
                  </span>
                  <span className="text-emerald-400 font-medium cursor-pointer hover:underline">
                    প্ল্যান করুন &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
