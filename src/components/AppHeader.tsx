/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from 'react';
import { Compass, BookOpen, Brain, MapPin, Building2, Phone } from 'lucide-react';
import { City } from '../types';
import { TRANSLATIONS } from '../translations';

interface AppHeaderProps {
  currentCity: City;
  onCityChange: (city: City) => void;
  activeTab: 'catalogue' | 'advisor';
  onTabChange: (tab: 'catalogue' | 'advisor') => void;
  language: 'en' | 'hi';
  onLanguageChange: (lang: 'en' | 'hi') => void;
}

export default function AppHeader({
  currentCity,
  onCityChange,
  activeTab,
  onTabChange,
  language,
  onLanguageChange
}: AppHeaderProps) {
  const t = TRANSLATIONS[language];

  return (
    <header className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-3xs" id="app-header-id">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Render the actual Logo Concept in SVG & Typography */}
        <div className="flex items-center gap-3.5 select-none shrink-0" id="logo-block">
          <div className="relative h-14 w-20 flex-shrink-0" id="logo-icon-container">
            <svg viewBox="0 0 120 70" className="w-full h-full" referrerPolicy="no-referrer">
              {/* Outer door frame */}
              <rect x="25" y="5" width="40" height="60" rx="2" fill="none" stroke="#4a5568" strokeWidth="4" />
              
              {/* Sun rising inside door */}
              <circle cx="45" cy="25" r="10" fill="#f6ad55" />
              
              {/* Green hills & curves pathway leading through the door */}
              <path d="M27,45 Q40,35 55,40 T63,45" fill="none" stroke="#48bb78" strokeWidth="6" strokeLinecap="round" />
              <path d="M27,55 Q38,48 48,50 T63,55" fill="#38a169" />
              
              {/* Open Red Door */}
              <path d="M63,5 L85,15 L85,65 L63,55 Z" fill="#e53e3e" rx="1" />
              <circle cx="80" cy="40" r="1.5" fill="#ffffff" />
              
              {/* Wave flow extending outward */}
              <path d="M25,55 Q50,45 75,52 T105,53" fill="none" stroke="#e11d48" strokeWidth="4.5" strokeLinecap="round" />
            </svg>
          </div>

          <div className="space-y-0.5">
            <div className="flex items-baseline gap-1.5" id="logo-main-typography">
              <span className="font-display font-black text-slate-900 tracking-wide text-2xl uppercase">
                {t.title}
              </span>
              <span className="text-[10px] font-bold text-indigo-600 font-display tracking-wider uppercase opacity-90">
                {t.subtitle}
              </span>
            </div>
            <div className="text-[9px] font-bold tracking-widest text-slate-500 font-display uppercase flex items-center gap-1 leading-none">
              <span className="inline-block h-1 w-1 bg-indigo-600 rounded-full"></span>
              <span>{language === 'hi' ? 'आरपीडब्ल्यूडी २०१६ गठबंधन • रांची और जमशेदपुर' : 'A RED WAVE INITIATIVE • Ranchi & Jamshedpur'}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-slate-50 border border-slate-150 p-1 rounded-2xl relative w-full md:w-auto overflow-hidden shadow-3xs">
          <button
            onClick={() => onTabChange('catalogue')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-display font-medium text-xs transition-colors cursor-pointer ${
              activeTab === 'catalogue'
                ? 'bg-white text-indigo-705 shadow-xs font-bold'
                : 'text-slate-500 hover:text-slate-800 font-normal'
            }`}
          >
            <BookOpen size={14} className={activeTab === 'catalogue' ? 'text-indigo-600' : 'text-slate-400'} />
            <span>{t.tabCatalogue}</span>
          </button>
          <button
            onClick={() => onTabChange('advisor')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-display font-medium text-xs transition-colors cursor-pointer ${
              activeTab === 'advisor'
                ? 'bg-white text-indigo-705 shadow-xs font-bold'
                : 'text-slate-500 hover:text-slate-800 font-normal'
            }`}
          >
            <Brain size={14} className={activeTab === 'advisor' ? 'text-indigo-600' : 'text-slate-400'} />
            <span>{t.tabAdvisor}</span>
          </button>
        </div>

        {/* Language Selection Toggle */}
        <div className="flex bg-indigo-100/40 border border-indigo-200/50 p-1 rounded-2xl shadow-3xs text-[11px] font-display font-semibold shrink-0">
          <button
            onClick={() => onLanguageChange('en')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer font-bold ${
              language === 'en'
                ? 'bg-indigo-600 text-white shadow-xs scale-102 font-bold'
                : 'text-indigo-800 hover:bg-indigo-100/60'
            }`}
          >
            English
          </button>
          <button
            onClick={() => onLanguageChange('hi')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer font-bold ${
              language === 'hi'
                ? 'bg-indigo-600 text-white shadow-xs scale-102 font-bold'
                : 'text-indigo-800 hover:bg-indigo-100/60'
            }`}
          >
            हिन्दी
          </button>
        </div>

      </div>
    </header>
  );
}
