/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Building2,
  Phone,
  Heart,
  ChevronRight,
  Sparkles,
  Award,
  Users2,
  Bookmark,
  Share2,
  Volume2,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  BookOpen,
  MapPin,
  Sparkle,
  ArrowDownCircle,
  Clock
} from 'lucide-react';
import { City } from './types';
import AppHeader from './components/AppHeader';
import ComprehensiveCatalogue from './components/ComprehensiveCatalogue';
import DecisionAdvisor from './components/DecisionAdvisor';
import AccessibilitySuite from './components/AccessibilitySuite';
import UserLoginGate from './components/UserLoginGate';
import { RED_WAVE_SERVICES } from './data';
import { TRANSLATIONS } from './translations';

export default function App() {
  const [city, setCity] = useState<City>('jamshedpur');
  const [activeTab, setActiveTab] = useState<'catalogue' | 'advisor'>('catalogue');
  const [language, setLanguage] = useState<'en' | 'hi'>('hi');

  // --- Accessibility Custom Controls ---
  const [fontSize, setFontSize] = useState<number>(100); // 100%, 125%, 150%
  const [highContrast, setHighContrast] = useState<'normal' | 'contrast' | 'cream' | 'monochrome'>('normal');
  const [dyslexicFont, setDyslexicFont] = useState<boolean>(false);
  const [voiceAssist, setVoiceAssist] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // --- Auth Session States ---
  const [user, setUser] = useState<{ name: string; email: string; loggedIn: boolean; city: City; lastLog?: any } | null>(null);

  const t = TRANSLATIONS[language];

  // Voice Narrator helper function supporting both English and Hindi synthesis
  const readTextAloud = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = 1;
    utterance.rate = 1.0;
    
    const voices = window.speechSynthesis.getVoices();
    let targetVoice;
    if (language === 'hi') {
      targetVoice = voices.find(v => v.lang.includes('IN') && (v.lang.toLowerCase().includes('hi') || v.name.toLowerCase().includes('hindi')));
    } else {
      targetVoice = voices.find(v => v.lang.includes('IN') || v.lang.includes('GB') || v.lang.includes('US'));
    }
    if (targetVoice) utterance.voice = targetVoice;

    window.speechSynthesis.speak(utterance);
  };

  // Convert English services list dynamically to gorgeous Hindi translations to guarantee thorough bilingual support
  const localizedServices = RED_WAVE_SERVICES.map((srv, index) => {
    if (language !== 'hi') return srv;

    let name = srv.name;
    let description = srv.description;
    let whyItMatters = srv.whyItMatters;
    let howRedWaveAddressesIt = srv.howRedWaveAddressesIt;
    let priceRange = srv.priceRange;

    if (srv.id === 'government-aid') {
      name = "सेवा १ — सरकारी सहायता एवं यूडीआईडी (UDID) कार्ड सुगमता";
      description = "रांची और जमशेदपुर में दिव्यांगनों और वरिष्ठ नागरिकों को सरकारी पेंशन प्राप्त करने, यूडीआईडी स्मार्ट कार्ड बनवाने और उपकरण भत्ते प्राप्त करने में संपूर्ण जमीनी मदद।";
      whyItMatters = "योजनाओं की जानकारी होने के बावजूद, जटिल अस्पतालों की जांच और अंचल कार्यालयों की कागजी प्रक्रिया दिव्यांगों के लिए अत्यंत कठिन है।";
      howRedWaveAddressesIt = "ब्लॉक कार्यालयों में व्यक्तिगत सहायता डेस्क के माध्यम से। दस्तावेज़ों की जांच, चिकित्सा बोर्डों के सामने उपस्थिति में सहायता और त्वरित फाइलों की ट्रैकिंग प्रदान करना।";
      priceRange = "सशुल्क परामर्श / पूर्णतः निःशुल्क (बीपीएल कार्डधारक)";
    } else if (srv.id === 'ai-accessibility') {
      name = "सेवा २ — एआई-संचालित सुगमता ऑडिट (शून्य लागत)";
      description = "दुकानों/भवनों के प्रवेश द्वार, रैंप, गलियारों और शौचालय क्षेत्र की ५ तस्वीरें अपलोड करें और कृत्रिम बुद्धिमानता (एआई) आधारित व्यापक सुगमता समीक्षा रिपोर्ट निःशुल्क प्राप्त करें।";
      whyItMatters = "अधिकांश व्यवसायी अपनी दुकानों को दिव्यांग-अनुकूल बनाना चाहते हैं, लेकिन उन्हें इसकी सही निर्माण लागत और आसान मानकों की सटीक जानकारी नहीं होती।";
      howRedWaveAddressesIt = "कंप्यूटर विज़न प्रणालियों और जेमिनी एपीआई (Gemini API) तकनीक का उपयोग करके तस्वीरों पर आईएस ९9२६ राष्ट्रीय सुगमता मानकों के अनुसार त्वरित सुधार सुझाव देना।";
      priceRange = "पूर्णतः शून्य लागत / सीएसआर प्रायोजित";
    } else if (srv.id === 'certified-accessibility') {
      name = "सेवा ३ — प्रामाणिक सुगमता ऑडिट (प्रीमियम सीएसआर-लिंक्ड)";
      description = "भारतीय पुनर्वास परिषद (RCI) द्वारा पंजीकृत विशेषज्ञों द्वारा वास्तविक भौतिक सुरक्षा आडिट, संवेदीकरण प्रशिक्षण और ब्रांड प्राइड के लिए समावेशी पीतल पट्टिका (Brass Plaque)।";
      whyItMatters = "प्रमुख संस्थानों और उद्योगों को सीएसआर मानकों और टाटा सबल जैसी समावेशी पहलों के साथ औपचारिक मान्यता, प्रतिष्ठा और ग्राहक विश्वास की आवश्यकता होती है।";
      howRedWaveAddressesIt = "दीपशिखा रांची व टाटा स्टील जमशेदपुर के साथ मिलकर व्यावसायिक प्रतिष्ठानों और होटलों को अधिकृत राष्ट्रीय समावेशी प्रमाण-पत्र प्रदान करना।";
      priceRange = "सीएसआर बजट अथवा रियायती शुल्क";
    } else if (srv.id === 'accessible-transport') {
      name = "सेवा ४ — सुगम स्थानीय परिवहन सेवा (मोडिफाइड ई-रिक्शा)";
      description = "रांची और जमशेदपुर में पहली बार मोडिफाइड लो-फ्लोर व्हीलचेयर अनुकूल लिफ्ट ई-रिक्शा 'टोटो' एवं रियर-रैंप एम्बुलेंस सुगम वाहन सेवा का शुभारंभ।";
      whyItMatters = "सामान्य ऑटो या टैक्सियों में यात्रा करने के लिए व्हीलचेयर छोड़नी पड़ती है, जो रीढ़ की हड्डी के रोगियों और गंभीर रोगियों के लिए अत्यंत दर्दनाक एवं असुरक्षित है।";
      howRedWaveAddressesIt = "लोकल ई-रिक्शा मालिकों के साथ मिलकर टोटो वाहनों में रियर-रैंप रैपिंग और जमशेदपुर तथा रांची के मुख्य अस्पतालों के लिए विशेष महिंद्रा विंगर बेड़े का संचालन।";
      priceRange = "प्रायोजित न्यूनतम रियायती किराया";
    } else if (srv.id === 'vehicle-modification') {
      name = "सेवा ५ — अनुकूलित तिपहिया वाहन एवं आरटीओ (RTO) अनुमोदन सहायता";
      description = "शारीरिक असमर्थता से पीड़ित चालकों के वाहनों में हाथों से संचालित होने वाले विशेष ब्रेक, स्वतः लिफ्ट तकनीक और आरटीओ पंजीयन संपरिवर्तन की सेवाएं।";
      whyItMatters = "झारखंड में पेशेवर वाहन संपरिवर्तन मैकेनिकों का अभाव है, जिसके कारण लाभार्थियों को बेंगलुरु या मुंबई की महंगी यात्राएं करनी पड़ती हैं।";
      howRedWaveAddressesIt = "मुंबई के प्राधिकृत इजी मूव (Ezy Mov) के साथ साझेदारी कर जमशेदपुर में कुशल क्षेत्रीय तकनीशियन नेटवर्क एवं लायनिस डेस्क स्थापित करना।";
      priceRange = "रियायती लागत / सीएसआर के तहत अनुदान";
    } else if (srv.id === 'livelihood-linkage') {
      name = "सेवा ६ — आजीविका एवं सम्मानजनक रोजगार लिंकेज";
      description = "संगठनों और टाटा समूह के अंतर्गत दिव्यांग कलाकारों, दस्तकारों और युवाओं को मुख्यधारा के रोजगार और डिजिटल बाजारों (Atypical Advantage आदि) में जोड़ना।";
      whyItMatters = "भारतीय दिव्यांगों में से केवल ३६% के पास सवैतनिक रोजगार है। ग्रामीण क्षेत्रों की कलाकृतियों को राष्ट्रीय और डिजिटल बाज़ार में कोई सुगम मंच नहीं प्राप्त है।";
      howRedWaveAddressesIt = "सैनिक सोसाइटी सुगम विक्रय केंद्रों में उत्पादों की सीधी बिक्री एवं राष्ट्रीय प्रणालियों में दिव्यांगजनों का प्रत्यक्ष पंजीकरण व संवेदीकरण।";
      priceRange = "पूर्णतः प्रायोजित / सीएसआर लिंकेज";
    } else if (srv.id === 'home-accessibility-mod') {
      name = "सेवा ७ — व्यक्तिगत घरों में सुगमता संरचना विकास";
      description = "दुर्घटनाओं से बचाव के लिए घरों की बाथरूम टाइलें बदलना, सुरक्षा ग्रैब बार लगाना, सीढ़ियों पर कंक्रीट रैंप निर्माण जैसी त्वरित सहायक सेवाएं।";
      whyItMatters = "दिव्यांगजन और बुजुर्ग अपना ७०% से अधिक समय घरों में बिताते हैं। बाथरूम और गीले फर्शों पर फिसलने से गंभीर चोटें लगने का जोखिम बना रहता है।";
      howRedWaveAddressesIt = "प्रशिक्षित स्थानीय प्लंबरों और राजमिस्त्रियों की नियुक्ति कर न्यूनतम लागत पर अथवा सरकारी कल्याण सब्सिडी के माध्यम से निर्माण कार्य सम्पन्न कराना।";
      priceRange = "न्यूनतम निर्माण लागत";
    }

    return {
      ...srv,
      name,
      description,
      whyItMatters,
      howRedWaveAddressesIt,
      priceRange
    };
  });

  return (
    <div 
      className={`min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden ${
        highContrast === 'contrast' ? 'theme-high-contrast' : highContrast === 'cream' ? 'theme-cream' : highContrast === 'monochrome' ? 'theme-monochrome' : ''
      } ${dyslexicFont ? 'theme-dyslexic-spacing font-sans-dyslexic' : ''}`}
      id="app-root-container"
      style={{ fontSize: fontSize === 100 ? '16px' : fontSize === 125 ? '20px' : '24px' }}
    >
      {/* Floating Accessibility Control Bar */}
      <AccessibilitySuite
        fontSize={fontSize}
        setFontSize={setFontSize}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        dyslexicFont={dyslexicFont}
        setDyslexicFont={setDyslexicFont}
        voiceAssist={voiceAssist}
        setVoiceAssist={setVoiceAssist}
        reducedMotion={reducedMotion}
        setReducedMotion={setReducedMotion}
      />

      {/* Visual Identity Sticky Header */}
      <AppHeader
        currentCity={city}
        onCityChange={(c) => setCity(c)}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (!reducedMotion) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0 });
          }
        }}
        language={language}
        onLanguageChange={setLanguage}
      />

      {/* Accessibility Alert & Quick Instruction Strip */}
      <div 
        className="bg-indigo-950 text-white text-xs px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2.5 font-display shadow-xs text-center sm:text-left"
        id="accessibility-helper-strip"
      >
        <div className="flex items-center gap-2">
          <span className="animate-pulse bg-emerald-400 h-2.5 w-2.5 rounded-full inline-block shrink-0"></span>
          <span className="font-semibold leading-tight text-white/95">
            {t.accessibilityCheck}
          </span>
        </div>
        <button 
          onClick={() => readTextAloud(t.listenIntroVoice)}
          className="bg-indigo-850 hover:bg-black text-white font-bold uppercase tracking-wider text-[9px] px-3.5 py-1.5 rounded-md flex items-center gap-1.5 cursor-pointer font-display border border-indigo-400/20"
          aria-label="Listen to voice guidelines introduction"
        >
          <Volume2 size={12} className="text-emerald-300" />
          <span>{t.listenIntro}</span>
        </button>
      </div>

      {/* Hero Welcome Unit */}
      <section className="bg-white border-b border-slate-100 py-10 sm:py-14 relative" id="app-hero-welcome-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-800 text-xs font-semibold rounded-full border border-indigo-100/50">
            <Sparkles size={12} className="text-indigo-600 shrink-0" />
            <span>{language === 'hi' ? 'जमशेदपुर और रांची में दिव्यांगजनों को सशक्त बनाना' : 'Empowering Persons with Disabilities in Jamshedpur & Ranchi'}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-title font-medium text-slate-900 tracking-tight leading-tight">
                {language === 'hi' ? (
                  <>आपकी गरिमा, आपका अधिकार — <span className="text-indigo-600 italic border-b-2 border-indigo-200 pb-1">सरकारी कल्याण सुगमताएं</span> अब अत्यंत सरल व स्पष्ट।</>
                ) : (
                  <>Your rights, made real — clear steps to unlock <span className="text-indigo-600 italic border-b-2 border-indigo-200 pb-1">all disability entitlements</span>.</>
                )}
              </h1>
              <p className="text-slate-500 font-light leading-relaxed text-sm sm:text-base">
                {language === 'hi' ? (
                  <><strong>उड़ान सुगम दिव्यांगता हब</strong> में आपका स्वागत है। इसे विशेष रूप से रांची और जमशेदपुर के दिव्यांगजनों, उनके अभिभावकों और देखभालकर्ताओं के लिए डिज़ाइन किया गया है। सरकारी पेंशन, आधार बायोमेट्रिक सुधार, राष्ट्रीय (UDID) कार्ड की स्थिति और सुगम उपकरण वितरण के विषय में सरल व स्पष्ट जानकारी प्राप्त करें।</>
                ) : (
                  <>Welcome to <strong>The Udaan Accessibility Hub</strong>, designed to assist families, caretakers and children navigate government pensions, Aadhaar mappings, UDID configurations, and certified accessibility audits. Switch tabs above to read the <strong>comprehensive local guide</strong> or request immediate <strong>decisions analysis by our AI module</strong>.</>
                )}
              </p>
            </div>

            {/* Quick stats panel */}
            <div className="lg:col-span-4 bg-slate-50 p-5 rounded-3xl border border-slate-100 grid grid-cols-2 gap-4">
              <div className="space-y-0.5">
                <span className="text-slate-400 text-[10px] font-extrabold tracking-widest uppercase block">{language === 'hi' ? 'सक्रिय जिला फोकस' : 'Active District Focus'}</span>
                <span className="text-xs font-semibold text-slate-800 flex items-center gap-1 font-display">
                  📍 {city === 'jamshedpur' ? (language === 'hi' ? 'जमशेदपुर (पूर्वी सिंहभूम)' : 'Jamshedpur (E. Singhbhum)') : (language === 'hi' ? 'Ranchi Region (JH)' : 'Ranchi Region (JH)')}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-slate-400 text-[10px] font-extrabold tracking-widest uppercase block">{language === 'hi' ? 'प्रमाणन स्थिति' : 'Certification'}</span>
                <span className="text-[10px] font-bold text-emerald-850 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block font-display uppercase font-mono border border-emerald-100/50">
                  ● ACCESSIBILITY OK
                </span>
              </div>
              <div className="col-span-2 pt-3 border-t border-slate-200 space-y-1">
                <span className="text-slate-400 text-[8px] font-bold tracking-widest uppercase block">{language === 'hi' ? 'राष्ट्रीय मानक अनुपालन' : 'National Target Integration'}</span>
                <p className="text-xs font-light text-slate-650">
                  {language === 'hi' 
                    ? 'दिव्यांगजन अधिकार अधिनियम २०१६ (RPWD Act) और भारत सरकार के स्वावलंबन स्वाइप कार्ड दिशानिर्देशों के अनुरूप।'
                    : 'Fully compliant with RPWD Act 2016 & swavlambancard schemas to secure sovereign welfare.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8" id="app-main-content-id">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main workspace section */}
          <div className="lg:col-span-8 space-y-8" id="main-content-column-id">
            <AnimatePresence mode="wait">
              {activeTab === 'catalogue' ? (
                <motion.div
                  key="catalogue-tab"
                  initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  <ComprehensiveCatalogue
                    currentCity={city}
                    onCityChange={(c) => {
                      setCity(c);
                      // Fire descriptive announcement upon localization toggle
                      readTextAloud(language === 'hi' ? `शहर को बदलकर ${c === 'ranchi' ? 'रांची' : 'जमशेदपुर'} कर दिया गया है।` : `City changed to ${c}.`);
                    }}
                    language={language}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="advisor-tab"
                  initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  <DecisionAdvisor initialCity={city} language={language} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Area: Handles user authentication status and log tracker */}
          <div className="lg:col-span-4 space-y-6 sticky top-24" id="sidebar-widgets-column-id">
            
            {/* 1. Optional Account / Session Management Card */}
            <div id="auth-tracker-widget">
              {!user ? (
                <UserLoginGate
                  currentCity={city}
                  language={language}
                  onLoginSuccess={(userData) => {
                    setUser(userData);
                    readTextAloud(language === 'hi' ? `सत्र सक्रिय हो चुका है, ${userData.name}! क्रेडेंशियल्स आपके ईमेल पर भेज दिए गए हैं।` : `Welcome back, ${userData.name}! Your account session is active and a report was emailed.`);
                  }}
                />
              ) : (
                <div className="bg-white border-2 border-indigo-600 rounded-3xl overflow-hidden shadow-lg p-6 space-y-4" id="auth-logged-in-box">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <div className="h-10 w-10 bg-indigo-50 text-indigo-700 rounded-full flex items-center justify-center font-display font-black text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="block text-[9px] font-bold tracking-wider text-indigo-700 uppercase leading-none">{language === 'hi' ? 'सत्र सत्यापित' : 'Session Verified'}</span>
                      <strong className="text-slate-800 text-sm font-display block leading-normal mt-0.5">{user.name}</strong>
                    </div>
                    <div className="ml-auto bg-green-50 text-green-700 px-2.5 py-0.5 rounded-md text-[8px] font-bold uppercase font-mono border border-green-100">
                      ACTIVE
                    </div>
                  </div>

                  <div className="text-xs space-y-3 font-light text-slate-550 leading-relaxed font-sans">
                    <p>
                      {language === 'hi' ? (
                        <>शुभकामनाएं! क्रेडेंशियल्स और मार्गदर्शिका सूची आपके ईमेल पते <strong className="text-slate-800 font-normal">{user.email}</strong> पर भेज दी गई है। इसकी एक प्रति समीक्षा के लिए व्यवस्थापक <strong className="text-indigo-850 font-normal">sainikdutta87@gmail.com</strong> को प्रेषित की गई है।</>
                      ) : (
                        <>Greetings. Credentials have been dispatched to your email <strong className="text-slate-700 font-normal">{user.email}</strong>, with copies sent to the administrator at <strong className="text-indigo-850 font-normal">sainikdutta87@gmail.com</strong>.</>
                      )}
                    </p>
                    
                    <div className="bg-slate-50 border border-slate-150 p-3 rounded-xl space-y-1">
                      <div className="flex items-center gap-1.5 text-[9px] font-extrabold text-slate-400 uppercase font-mono tracking-widest block leading-none">
                        <Clock size={11} className="text-indigo-500" /> <span>{language === 'hi' ? 'ट्रांसमिशन और डिस्पैच विवरण' : 'Dispatch Registry Details'}</span>
                      </div>
                      <div className="text-[10px] space-y-0.5 text-slate-600 pt-1 leading-snug">
                        <span className="block">● {language === 'hi' ? 'सत्यापित ईमेल' : 'Verified Address'}: {user.email}</span>
                        <span className="block">● {language === 'hi' ? 'क्षेत्रीय प्रखंड' : 'Regional Block'}: {user.city.toUpperCase()}</span>
                        <span className="block">● {language === 'hi' ? 'डेटा टोकन' : 'Secure Token'}: UDAAN-Active-2026</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setUser(null);
                      readTextAloud(language === 'hi' ? "आप सत्र फ़ोल्डर से सुरक्षित बाहर आ गए हैं।" : "You have successfully signed out of the session folder.");
                    }}
                    className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-650 font-display font-semibold hover:text-slate-900 border border-slate-150 rounded-xl text-[10px] uppercase tracking-wider text-center cursor-pointer transition-colors"
                  >
                    🔐 {t.btnLogout}
                  </button>
                </div>
              )}
            </div>

            {/* Sabal Support Helpline Widget */}
            <div className="bg-white border border-slate-150 rounded-3xl p-5 space-y-4 shadow-3xs" id="quick-helpline-widget">
              <span className="text-[9px] font-black tracking-widest text-indigo-750 uppercase block font-display">
                {t.helplineHeader}
              </span>
              <div className="space-y-3">
                <div className="flex gap-2.5 text-xs items-start">
                  <span className="text-lg">📞</span>
                  <div className="space-y-0.5">
                    <strong className="text-slate-800 font-display text-xs block leading-tight font-black">{t.elderlineTitle}</strong>
                    <span className="text-[10px] text-slate-500 font-mono leading-none">{t.elderlineDesc}</span>
                  </div>
                </div>
                <div className="flex gap-2.5 text-xs pt-3 border-t border-slate-100 items-start">
                  <span className="text-lg">♿</span>
                  <div className="space-y-0.5">
                    <strong className="text-slate-805 font-display text-xs block leading-tight font-black">{t.sabalTitle}</strong>
                    <span className="text-[10px] text-slate-500 font-mono leading-none">{t.sabalDesc}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* --- DEDICATED SERVICES SECTION --- */}
        <section 
          className="border-t border-slate-200 mt-16 pt-12 space-y-8 animate-fade-in" 
          id="sovereign-services-section-id"
        >
          <div className="border-l-4 border-indigo-650 pl-4 space-y-1">
            <span className="text-indigo-700 font-display font-extrabold text-[10px] uppercase tracking-widest leading-none block">
              {language === 'hi' ? 'रेड वेव संप्रभु आजीविका पोर्टफोलियो' : 'Red Wave Sovereign Portfolio'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-slate-800 tracking-tight flex items-center gap-2">
              📂 {language === 'hi' ? 'झारखंड ७ सुगम सेवाओं की विस्तृत सूची' : 'Comprehensive Registry of Defined Services'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-light max-w-4xl">
              {language === 'hi' 
                ? 'रेड वेव द्वारा दिव्यांगजनों के लिए निर्धारित ७ मुख्य सामाजिक विकास योजनाएं। संपूर्ण विवरण को बोलकर सुनने के लिए प्ले वॉइस (Play Voice) पर क्लिक करें।' 
                : 'Below are the 7 core services laid out by the Udaan initiative. Clicking a service plays a descriptive vocal overview detailing how we assist Persons with Disabilities (PwDs).'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {localizedServices.map((srv, index) => {
              const active = srv.status === 'active';
              return (
                <div 
                  key={srv.id} 
                  className={`bg-white border-2 hover:border-indigo-400 p-6 rounded-3xl space-y-4 transition-all relative overflow-hidden flex flex-col justify-between shadow-3xs hover:shadow-xs group`}
                  id={`service-card-${srv.id}`}
                  data-tts="true"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-indigo-505 font-bold tracking-widest">
                        {language === 'hi' ? `सेवा कूट 0${index + 1}` : `SERVICE REF 0${index + 1}`}
                      </span>
                      <span className={`px-2 py-0.5 rounded-sm font-display text-[9px] font-extrabold uppercase tracking-wider ${
                        active 
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-100/50' 
                          : 'bg-slate-100 text-slate-500 border border-slate-150'
                      }`}>
                        {active ? (language === 'hi' ? '● लाइव सक्रिय' : '● Active') : (language === 'hi' ? '📋 आगामी योजना' : '📋 Upcoming')}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-slate-800 text-sm sm:text-base leading-snug group-hover:text-indigo-600 transition-colors">
                      {srv.name}
                    </h3>
                    
                    <p className="text-xs text-slate-455 font-normal leading-relaxed">
                      {srv.description}
                    </p>

                    <div className="space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-[10px] text-slate-600 font-light font-sans">
                      <div><strong className="text-slate-800 block mb-0.5">{language === 'hi' ? 'महत्व क्यों है:' : 'Why it matters:'}</strong> {srv.whyItMatters}</div>
                      <div className="mt-2 text-indigo-900 border-t border-slate-150 pt-1.5"><strong className="text-indigo-805 block mb-0.5">{language === 'hi' ? 'उड़ान समाधान मार्ग:' : 'How Red Wave Solves:'}</strong> {srv.howRedWaveAddressesIt}</div>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-slate-400 font-mono">
                      {srv.priceRange || 'Sponsored / CSR'}
                    </span>
                    <button
                      onClick={() => readTextAloud(`${srv.name}. ${srv.description}. ${srv.whyItMatters}. ${srv.howRedWaveAddressesIt}`)}
                      className="px-2.5 py-1.5 bg-indigo-50 hover:bg-slate-950 text-indigo-750 hover:text-white text-[10px] font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                      aria-label={`Read details of ${srv.name}`}
                    >
                      <Volume2 size={11} className="text-indigo-500 group-hover:text-white" />
                      <span>{language === 'hi' ? 'सुनें (Voice)' : 'Play Voice'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>

      {/* Structured Footer / Contact Partners */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 sm:py-16 mt-20" id="app-footer-id">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4 md:col-span-2">
              <span className="text-white font-display font-black text-xl tracking-wide uppercase">
                The Udaan उडाAन
              </span>
              <p className="text-xs text-slate-400 font-light leading-relaxed max-w-sm">
                {language === 'hi'
                  ? "उड़ान (रेड वेव पहल) जमशेदपुर और रांची में सरकारी योजनाओं, अंचल कार्यालय सेवाओं और बायोमेट्रिक सुधारों में मदद करने वाला दिव्यांग हितैषी हब है।"
                  : "Red Wave is the first-mover disability facilitator in Jamshedpur & Ranchi, JharSewa and UDID domains. We link families directly to expert assessors to skip administrative queue blocks."}
              </p>
              <blockquote className="border-l-2 border-indigo-500 pl-3 italic text-[11px] text-slate-400 font-light">
                &ldquo;Accessibility is not a feature — it is a fundamental right.&rdquo; <br/>
                <span className="text-indigo-455 font-semibold font-display not-italic text-[10px] uppercase tracking-wider block mt-1">— Red Wave, Jamshedpur, 2026</span>
              </blockquote>
            </div>

            <div className="space-y-3">
              <span className="text-slate-200 text-xs font-bold uppercase tracking-wider font-display block">{language === 'hi' ? 'जमशेदपुर मुख्य संपर्क' : 'Key Jamshedpur Contacts'}</span>
              <ul className="text-xs space-y-2.5 font-light">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></span>
                  <div>
                    <strong className="text-slate-350 block leading-tight">Tata Steel / Sabal Center</strong>
                    <span className="text-[10px] text-slate-500">{language === 'hi' ? 'विशेष बायोमेट्रिक शिविर और उपकरण वितरण।' : 'Platinum co-branding audit & fleet funding.'}</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></span>
                  <div>
                    <strong className="text-slate-350 block leading-tight">Chief Medical Officer (CMO)</strong>
                    <span className="text-[10px] text-slate-500">{language === 'hi' ? 'खासमहल अस्पताल में मेडिकल बोर्ड बोर्ड सहायता।' : 'Government liaison for physical UDID boards.'}</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-slate-200 text-xs font-bold uppercase tracking-wider font-display block">{language === 'hi' ? 'रांची मुख्य संपर्क' : 'Key Ranchi Contacts'}</span>
              <ul className="text-xs space-y-2.5 font-light">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></span>
                  <div>
                    <strong className="text-slate-350 block leading-tight">Deepshikha NGO</strong>
                    <span className="text-[10px] text-slate-500">{language === 'hi' ? 'अकादमिक मूल्यांकन विशेषज्ञ टीम रांची।' : 'Academic Coordinator & RCI-registered assessments.'}</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></span>
                  <div>
                    <strong className="text-slate-350 block leading-tight">DSWO Welfare Office</strong>
                    <span className="text-[10px] text-slate-500">{language === 'hi' ? 'राज्य सामाजिक सुरक्षा पेंशन प्रभाग।' : 'State pensions & BPL device subsidy.'}</span>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-slate-500">
            <div>
              &copy; 2026 Red Wave Accessibility Hub. All Rights Reserved. Co-sponsored by Sabal &amp; Deepshikha.
            </div>
            <div className="flex gap-4">
              <span className="hover:text-white transition-colors cursor-pointer">Privacy Charter</span>
              <span>•</span>
              <span className="hover:text-white transition-colors cursor-pointer">Sovereign Compliance</span>
              <span>•</span>
              <span className="hover:text-white transition-colors cursor-pointer">RPWD 2016 Alignment</span>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
