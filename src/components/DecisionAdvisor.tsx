/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Brain,
  HelpCircle,
  FileText,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Building,
  Target,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  MapPin,
  Sparkles,
  RefreshCw,
  Search
} from 'lucide-react';
import { City, SubCategory, DecisionQuery, DecisionAnalysis } from '../types';
import InteractiveDecisionTree from './InteractiveDecisionTree';
import { TRANSLATIONS } from '../translations';

interface DecisionAdvisorProps {
  initialCity?: City;
  language: 'en' | 'hi';
}

const getLocalizedPresets = (language: 'en' | 'hi') => {
  const t = TRANSLATIONS[language];
  return [
    {
      title: t.presetScenarioPensionTitle,
      desc: t.presetScenarioPensionDesc,
      category: 'disability-pension' as SubCategory,
      issue: t.presetScenarioPensionQuery,
      income: 'below-15k' as const,
      disability: 60
    },
    {
      title: t.presetScenarioWheelchairTitle,
      desc: t.presetScenarioWheelchairDesc,
      category: 'assisted-devices' as SubCategory,
      issue: t.presetScenarioWheelchairQuery,
      income: 'below-15k' as const,
      disability: 75
    },
    {
      title: t.presetScenarioVotingTitle,
      desc: t.presetScenarioVotingDesc,
      category: 'voter-id' as SubCategory,
      issue: t.presetScenarioVotingQuery,
      income: 'above-30k' as const,
      disability: 40
    },
    {
      title: t.presetScenarioUdidTitle,
      desc: t.presetScenarioUdidDesc,
      category: 'disability-udid-abha' as SubCategory,
      issue: t.presetScenarioUdidQuery,
      income: '15k-30k' as const,
      disability: 50
    }
  ];
};

export default function DecisionAdvisor({ initialCity = 'jamshedpur', language }: DecisionAdvisorProps) {
  const [query, setQuery] = useState<DecisionQuery>({
    age: 24,
    disabilityPercentage: 50,
    city: initialCity,
    selectedCategory: 'disability-pension',
    specificIssue: '',
    incomeLevel: 'below-15k'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DecisionAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState<'proscons' | 'comparison' | 'swot' | 'steps'>('steps');
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [advisorMode, setAdvisorMode] = useState<'tree' | 'ai'>('tree');

  const t = TRANSLATIONS[language];
  const PRESET_DECISIONS = getLocalizedPresets(language);

  const handlePresetSelect = (preset: typeof PRESET_DECISIONS[0]) => {
    const updated = {
      ...query,
      selectedCategory: preset.category,
      specificIssue: preset.issue,
      incomeLevel: preset.income,
      disabilityPercentage: preset.disability
    };
    setQuery(updated);
    triggerAnalysis(updated);
  };

  const triggerAnalysis = async (customQuery = query) => {
    setLoading(true);
    setErrorStatus(null);
    setResult(null);

    try {
      const response = await fetch('/api/gemini/decision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...customQuery, uiLanguage: language })
      });

      if (!response.ok) {
        throw new Error('Server returned an error');
      }

      const data = await response.json();
      if (data.fallback) {
        // Handle fallback structure from backend or parse local translation structure
        setResult(localiseResult(data.fallback));
        setErrorStatus(language === 'hi' ? 'ऑफ़लाइन गाइड मोड (सक्रिय)' : 'Offline Guide Mode (Ready to use)');
      } else {
        setResult(data);
      }
    } catch (err) {
      console.error(err);
      setErrorStatus(language === 'hi' ? 'ऑफ़लाइन स्व-सहायता मोड सक्रिय' : 'Local Fallback Active');
      const simpleLocal = getLocalFallback(
        customQuery.selectedCategory,
        customQuery.city,
        customQuery.disabilityPercentage
      );
      setResult(simpleLocal);
    } finally {
      setLoading(false);
    }
  };

  // Convert English backend templates dynamically to perfect respectful Hindi under fallback conditions
  const localiseResult = (res: DecisionAnalysis): DecisionAnalysis => {
    if (language !== 'hi') return res;

    // Direct translations for primary keys
    return {
      ...res,
      recommendation: res.recommendation.includes('Swami Vivekananda') || res.recommendation.includes('pension')
        ? 'झारखंड सरकार द्वारा प्रायोजित स्वामी विवेकानंद निशक्त पेंशन योजना के तहत ऑफलाइन आवेदन प्रस्तुत करना ही आपके लिए त्वरित मार्ग है।'
        : `प्रशासनिक सुगमता हेतु सीधे अपने स्थानीय जिला कल्याण प्रभाग या सदर अस्पताल कतार सुधार डेस्क (Ranchi / Jamshedpur) पर संपर्क करें।`,
      bestRoute: res.bestRoute.includes('Block')
        ? 'सभी शैक्षणिक प्रमाण-पत्रों, आधार कार्ड, न्यूनतम ४०% का चिकित्सा प्रमाणपत्र एवं बीपीएल कार्ड को संकलित कर अंचल कल्याण अधिकारी के पास फाइल जमा करें।'
        : 'अपने आधार रिकॉर्ड में अंग्रेजी स्पेलिंग की जांच करवा कर बायोमेट्रिक्स का नवीनीकरण करवाएं। ऑफलाइन रसीद लेकर ब्लॉक काउंटर पर जमा करें।',
      childFriendlySteps: [
        { stepNo: 1, title: 'अधिकार पात्रता जांचें', action: 'अपने चिकित्सा प्रमाण पत्र या यूडीआईडी (UDID) कार्ड में दिव्यांगता प्रतिशत संख्या की जांच करें (न्यूनतम ४०% होना कानूनी रूप से अनिवार्य है)।' },
        { stepNo: 2, title: 'दस्तावेज फोल्डर तैयार करें', action: 'आधार कार्ड, स्थायी निवासी प्रमाण पत्र, जन्म का प्रमाण पत्र और आय घोषणा पत्र को एक साफ फाइल में रखें।' },
        { stepNo: 3, title: 'अधिकारी के समक्ष फाइल जमा करें', action: `अपने नजदीकी प्रखंड कार्यालय (Block Welfare Desk) या रांची/जमशेदपुर सदर अस्पताल जाएँ और रसीद प्राप्त करें।` }
      ]
    };
  };

  const getLocalFallback = (cat: SubCategory, city: City, percent: number): DecisionAnalysis => {
    if (language === 'hi') {
      return {
        recommendation: `अति उत्तम! प्रशासनिक सुगमता हेतु सीधे अपने स्थानीय ब्लॉक विकास अधिकारी (BDO) कार्यालय ${city === 'ranchi' ? 'रांची' : 'जमशेदपुर (खासमहल)'} में ऑफलाइन फाइल जमा करें।`,
        bestRoute: 'दस्तावेजों में नाम की गलती (Spelling Error) से बचने के लिए अंचल अधिकारी काउंटर पर प्रत्यक्ष रूप से सत्यापित रसीद प्राप्त करें।',
        pros: [
          'कार्यालय अधिकारी द्वारा ऑन-द-स्पॉट भौतिक सत्यापन संपन्न',
          'सत्यापन की रसीद तुरंत प्राप्त होने से दावे का कानूनी प्रमाण मिलता है',
          'समस्याओं की स्थिति में वार्ड पार्षदों या ब्लॉक प्रमुख की त्वरित मदद संभव'
        ],
        cons: [
          'कार्यालय जाने के लिए शारीरिक यात्रा आवश्यक है जो गंभीर रोगियों हेतु कठिन हो सकता है',
          'काम के दिनों में सरकारी दफ्तर के व्यस्त घंटों में प्रतीक्षा करनी पड़ सकती है'
        ],
        swot: {
          strengths: ['त्रुटिहीन नाम सत्यापन', 'दस्तावेजों का हाथों-हाथ जमा होना'],
          weaknesses: ['ऑनलाइन सर्वर का अस्थिर रहना', 'Block दफ्तरों में कर्मचारियों की कमी'],
          opportunities: ['जिला समाज कल्याण शिविरों में सीधे उपकरण प्राप्त करने की गुंजाइश'],
          threats: ['आय प्रमाणपत्र समय पर न बनने से फाइल का रुक जाना']
        },
        childFriendlySteps: [
          { stepNo: 1, title: 'दस्तावेज तिगड़ी लाएं', action: 'आधार कार्ड, राज्य चिकित्सा प्रमाण पत्र और अपनी बैंक पासबुक को एक साथ संकलित करें।' },
          { stepNo: 2, title: 'अभिभावक घोषणा पत्र भरें', action: 'यदि बीपीएल राशन कार्ड है, तो आय प्रमाणन हेतु उसकी स्व-सत्यापित प्रति संलग्न करें।' },
          { stepNo: 3, title: 'कल्याण डेस्क कार्यालय पहुंचें', action: `सीधे अपने नजदीकी अंचल कल्याण कार्यालय (खासमहल या रांची कचहरी) में जमा करें और पावती पर्ची लें।` }
        ],
        supportingOrganizations: [
          { name: 'टाटा स्टील सबल पुनर्वास केंद्र', role: 'पूर्वी सिंहभूम का सर्वप्रमुख सुगम फैसिलिटेटर।', city: 'jamshedpur' },
          { name: 'दीपशिखा एनजीओ रांची', role: 'झारखंड का मुख्य बौद्धिक मूल्यांकन एवं शैक्षणिक परामर्श केंद्र।', city: 'ranchi' }
        ]
      };
    }

    return {
      recommendation: `Complete standard offline registration at the local ${city === 'ranchi' ? 'Ranchi' : 'Jamshedpur'} administrative office for optimal processing times.`,
      bestRoute: 'Submit your unified physical dossier to local block authorities directly to bypass online portal errors.',
      pros: ['Guaranteed direct receipt', 'Local physical tracking', 'Highly reliable hand-signed verification'],
      cons: ['Requires direct travel to Block office', 'Wait time is subject to local queue size'],
      swot: {
        strengths: ['Immediate verification check on name matches', 'Direct communication with public desks'],
        weaknesses: ['Online link currently down'],
        opportunities: ['Bundle with transport or free assistive kits'],
        threats: ['Potential spelling issues across different cards']
      },
      childFriendlySteps: [
        { stepNo: 1, title: 'Check Your Medical Score', action: 'Ensure your disability percentage certificate lists at least 40%.' },
        { stepNo: 2, title: 'Gather the Key Papers', action: 'Tuck your Aadhaar, physical certificate and bank passbook under your arm.' },
        { stepNo: 3, title: 'Visit the Town Welfare Center', action: `Visit the District Welfare desk at ${city === 'ranchi' ? 'Ranchi Sadar Office' : 'Jamshedpur Khas Mahal Office'} and submit.` }
      ],
      supportingOrganizations: [
        { name: 'Tata Steel Sabal Center', role: 'Premium assistive partner in East Singhbhum.', city: 'jamshedpur' },
        { name: 'Deepshikha Ranchi', role: 'Academic and evaluation partner in Jharkhand.', city: 'ranchi' }
      ]
    };
  };

  return (
    <div className="space-y-8" id="decision-advisor-id">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-indigo-950 via-indigo-900 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-12 translate-y-12">
          <Brain size={300} />
        </div>
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 text-indigo-250 text-xs font-semibold rounded-full tracking-wider uppercase font-display">
            <Sparkles size={13} /> <span>{language === 'hi' ? 'विशेषज्ञ एआई निर्णय प्रणाली' : 'Udaan Decision Intelligence'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-medium tracking-tight">
            {t.advisorTitle}
          </h2>
          <p className="text-indigo-200 font-light leading-relaxed text-sm sm:text-sm">
            {t.advisorDesc}
          </p>
        </div>
      </div>

      {/* Interactive Mode Toggle Bar */}
      <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl border border-slate-200/50 max-w-lg shadow-3xs">
        <button
          onClick={() => setAdvisorMode('tree')}
          className={`py-2.5 px-4 rounded-xl font-display font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
            advisorMode === 'tree'
              ? 'bg-white text-indigo-705 shadow-xs font-bold animate-pulse-once'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>{t.guidedTreeTab}</span>
        </button>
        <button
          onClick={() => setAdvisorMode('ai')}
          className={`py-2.5 px-4 rounded-xl font-display font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
            advisorMode === 'ai'
              ? 'bg-white text-indigo-705 shadow-xs font-bold animate-pulse-once'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>{t.customAiTab}</span>
        </button>
      </div>

      {advisorMode === 'tree' ? (
        <InteractiveDecisionTree language={language} />
      ) : (
        <>
          {/* Preset Decisions Carousel / Picker */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <HelpCircle className="text-indigo-700" size={18} />
              <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase font-display">
                {t.presetScenarioHeader}
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PRESET_DECISIONS.map((preset, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ y: -3, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handlePresetSelect(preset)}
                  className="bg-white border border-slate-100 hover:border-indigo-400 p-5 rounded-2xl text-left text-xs space-y-2 cursor-pointer shadow-3xs hover:shadow-xs transition-colors group flex flex-col justify-between h-[150px]"
                >
                  <div>
                    <span className="font-display font-bold text-slate-800 block text-xs sm:text-sm group-hover:text-indigo-600 transition-colors">
                      {preset.title}
                    </span>
                    <p className="text-slate-400 font-light mt-1.5 line-clamp-2 leading-relaxed">
                      {preset.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-indigo-600 font-semibold pt-3 border-t border-slate-100 mt-2 w-full">
                    <Brain size={12} className="text-indigo-500" />
                    <span className="text-[10px]">{language === 'hi' ? 'सलाह लें' : 'Analyze Pathway'}</span>
                    <ChevronRight size={12} className="ml-auto group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Main Interactive Form */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-3xs grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-5 space-y-6">
              <h3 className="font-display font-semibold text-base text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
                <span className="p-1.5 bg-indigo-50 text-indigo-700 rounded-lg"><Brain size={18} /></span>
                <span>{t.formHeader}</span>
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {/* District selection */}
                <div className="space-y-1.5 col-span-2">
                  <label className="text-[10px] font-bold tracking-wider text-slate-400 uppercase font-display block leading-none">{t.cityLabel}</label>
                  <div className="grid grid-cols-2 bg-slate-50 p-1 rounded-xl border border-slate-150">
                    <button
                      type="button"
                      onClick={() => setQuery({ ...query, city: 'jamshedpur' })}
                      className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                        query.city === 'jamshedpur'
                          ? 'bg-white text-indigo-850 shadow-sm font-bold'
                          : 'text-slate-500 hover:text-slate-700 font-normal'
                      }`}
                    >
                      {language === 'hi' ? 'जमशेदपुर' : 'Jamshedpur'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuery({ ...query, city: 'ranchi' })}
                      className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                        query.city === 'ranchi'
                          ? 'bg-white text-indigo-850 shadow-sm font-bold'
                          : 'text-slate-500 hover:text-slate-700 font-normal'
                      }`}
                    >
                      {language === 'hi' ? 'रांची' : 'Ranchi'}
                    </button>
                  </div>
                </div>

                {/* Age input */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-wider text-slate-400 uppercase font-display block leading-none">{t.ageLabel}</label>
                  <input
                    type="number"
                    min={1}
                    max={120}
                    value={query.age}
                    onChange={(e) => setQuery({ ...query, age: parseInt(e.target.value) || 24 })}
                    className="w-full bg-slate-50 border border-slate-150 focus:border-indigo-400 focus:bg-white p-3 text-xs rounded-xl focus:outline-hidden font-normal text-slate-750"
                  />
                </div>

                {/* Income level Selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-wider text-slate-400 uppercase font-display block leading-none">{t.incomeLabel}</label>
                  <select
                    value={query.incomeLevel}
                    onChange={(e) => setQuery({ ...query, incomeLevel: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-150 focus:border-indigo-400 focus:bg-white p-3 text-xs rounded-xl focus:outline-hidden font-normal text-slate-750"
                  >
                    <option value="below-15k">{language === 'hi' ? '₹१५,००० से कम' : 'Below ₹15,000'}</option>
                    <option value="15k-30k">{language === 'hi' ? '₹१५,००० - ₹३०,०००' : '₹15,000 - ₹30,000'}</option>
                    <option value="above-30k">{language === 'hi' ? '₹३०,००० से अधिक' : 'Above ₹30,000'}</option>
                  </select>
                </div>
              </div>

              {/* Category selection */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-wider text-slate-400 uppercase font-display block leading-none">{t.serviceCategoryLabel}</label>
                <select
                  value={query.selectedCategory}
                  onChange={(e) => setQuery({ ...query, selectedCategory: e.target.value as SubCategory })}
                  className="w-full bg-slate-50 border border-slate-150 focus:border-indigo-400 focus:bg-white p-3.5 text-xs rounded-xl focus:outline-hidden font-bold text-indigo-950"
                >
                  <option value="disability-pension">{language === 'hi' ? 'डिसेबिलिटी पेंशन योजनाएं (केंद्रीय / राज्य)' : 'Disability Pension (Central IGNDPS / State)'}</option>
                  <option value="aadhar-card">{language === 'hi' ? 'आधार कार्ड नामांकन एवं बायोमेट्रिक अपडेट' : 'Aadhaar Card Enrollment & Details Update'}</option>
                  <option value="assisted-devices">{language === 'hi' ? 'निःशुल्क व्यावसायिक सहायक उपकरण (ADIP)' : 'Assisted Devices Scheme (ADIP Support)'}</option>
                  <option value="caste-certificate">{language === 'hi' ? 'झारखंड जाति प्रमाण पत्र (झारसेवा पोर्टल)' : 'Caste Certificate inside Jharkhand (JharSewa)'}</option>
                  <option value="disability-udid-abha">{language === 'hi' ? 'राष्ट्रीय यूडीआईडी (UDID) कार्ड एवं आभा स्वास्थ्य लिंकेज' : 'Disability Certificate & National UDID-ABHA Card'}</option>
                  <option value="voter-id">{language === 'hi' ? 'मतदाता पहचान पत्र और सक्षम ऐप प्राथमिकता' : 'Voter ID Cards & Saksham App PwD Priority'}</option>
                </select>
              </div>

              {/* Disability Range Slider */}
              <div className="space-y-2 bg-slate-50/50 p-4.5 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase font-display leading-none">{t.disabilityLabel}</span>
                  <span className={`px-2.5 py-0.5 rounded-md font-bold text-[10px] font-display uppercase tracking-wider ${query.disabilityPercentage >= 40 ? 'bg-emerald-50 text-emerald-800 border border-emerald-100/50' : 'bg-amber-50 text-amber-800'}`}>
                    {query.disabilityPercentage}% {query.disabilityPercentage >= 40 ? t.eligibleBadge : t.ineligibleBadge}
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={query.disabilityPercentage}
                  onChange={(e) => setQuery({ ...query, disabilityPercentage: parseInt(e.target.value) })}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <p className="text-[10px] text-slate-400 font-light leading-relaxed">
                  {t.disabilityDisclaimer}
                </p>
              </div>

              {/* Specific query text */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-wider text-slate-400 uppercase font-display block leading-none">{t.customQuestionLabel}</label>
                <div className="relative">
                  <textarea
                    placeholder={t.placeholderCustomQuestion}
                    value={query.specificIssue}
                    onChange={(e) => setQuery({ ...query, specificIssue: e.target.value })}
                    rows={3}
                    className="w-full bg-slate-50 border border-slate-150 focus:border-indigo-400 focus:bg-white p-3 pr-8 text-xs rounded-xl focus:outline-hidden font-light text-slate-800 leading-relaxed"
                  />
                  <Search className="absolute right-3 top-3.5 text-slate-350" size={14} />
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={() => triggerAnalysis()}
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-750 disabled:bg-indigo-305 active:bg-indigo-800 text-white font-display font-medium text-xs py-3.5 px-6 rounded-2xl transition-all shadow-xs hover:shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="animate-spin text-white" size={15} />
                    <span>{t.btnRunningAi}</span>
                  </>
                ) : (
                  <>
                    <Brain size={15} />
                    <span>{t.btnRunAi}</span>
                  </>
                )}
              </button>
            </div>

            {/* Results Desk Display */}
            <div className="col-span-12 lg:col-span-7 bg-slate-50/50 p-6 sm:p-8 rounded-3xl border border-slate-100 relative flex flex-col justify-between min-h-[480px]">
              <AnimatePresence mode="wait">
                {loading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-50/95 rounded-3xl flex flex-col items-center justify-center p-8 space-y-4 z-40"
                  >
                    <div className="w-14 h-14 bg-indigo-50 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    <div className="text-center space-y-1.5">
                      <span className="font-display text-sm font-bold text-slate-800 block">
                        {language === 'hi' ? 'उड़ान निर्णय सलाहकार परामर्श कर रहा है...' : 'Consulting The Udaan Decision Intelligence...'}
                      </span>
                      <p className="text-slate-500 font-light text-[11px] max-w-sm leading-relaxed">
                        {language === 'hi'
                          ? 'झारखंड के स्थानीय कल्याणकारी नियमों का अध्ययन, जिला सीमाओं का विश्लेषण और आसान सारांश तैयार किया जा रहा है।'
                          : 'Mapping Central-State boundaries, analyzing Ranchi/Jamshedpur logistics, and converting rules. Please wait.'}
                      </p>
                    </div>
                  </motion.div>
                )}

                {!result && !loading && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 flex flex-col items-center justify-center text-center p-8"
                  >
                    <div className="w-16 h-16 bg-white border border-slate-150 shadow-3xs rounded-2xl flex items-center justify-center text-slate-400 mb-4">
                      <Brain size={28} />
                    </div>
                    <span className="font-display font-medium text-slate-700 block text-sm">{t.resultsEmptyTitle}</span>
                    <p className="text-xs text-slate-400 font-light mt-1.5 max-w-xs leading-relaxed">
                      {t.resultsEmptyDesc}
                    </p>
                  </motion.div>
                )}

                {result && !loading && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 flex-1"
                  >
                    {/* Result Header */}
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-805 text-[9px] font-bold rounded-lg border border-emerald-100 uppercase tracking-widest font-display">
                          <CheckCircle size={10} /> {t.pathwayBadge}
                        </span>
                        {errorStatus && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-indigo-50 border border-indigo-100 text-indigo-800 text-[9px] font-semibold rounded-md font-mono">
                            {errorStatus}
                          </span>
                        )}
                      </div>
                      <h4 className="text-base sm:text-lg font-display font-bold text-slate-900 leading-snug">
                        {result.recommendation}
                      </h4>
                    </div>

                    {/* Best Way Highlight Box */}
                    <div className="p-4.5 bg-amber-50/55 border border-amber-100/50 rounded-2xl space-y-1 shadow-3xs">
                      <span className="font-display font-bold text-[10px] text-amber-800 flex items-center gap-1.5 uppercase tracking-wider">
                        <Target size={13} className="text-amber-700" />
                        <span>{language === 'hi' ? 'सीधा सुगम निष्पादन मार्ग:' : 'Sovereign Action Pathways:'}</span>
                      </span>
                      <p className="text-xs text-slate-650 leading-relaxed font-normal">
                        {result.bestRoute}
                      </p>
                    </div>

                    {/* Multi-Format Display Tabs */}
                    <div className="flex border-b border-slate-100 gap-1 overflow-x-auto select-none">
                      <button
                        onClick={() => setActiveTab('steps')}
                        className={`py-2 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                          activeTab === 'steps' ? 'border-indigo-600 text-indigo-850 font-bold' : 'border-transparent text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        {t.tabSimplifiedSteps}
                      </button>
                      <button
                        onClick={() => setActiveTab('proscons')}
                        className={`py-2 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                          activeTab === 'proscons' ? 'border-indigo-600 text-indigo-850 font-bold' : 'border-transparent text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        {t.tabProsCons}
                      </button>
                      <button
                        onClick={() => setActiveTab('swot')}
                        className={`py-2 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                          activeTab === 'swot' ? 'border-indigo-600 text-indigo-850 font-bold' : 'border-transparent text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        {t.tabSwot}
                      </button>
                      {result.comparisonTable && result.comparisonTable.length > 0 && (
                        <button
                          onClick={() => setActiveTab('comparison')}
                          className={`py-2 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                            activeTab === 'comparison' ? 'border-indigo-600 text-indigo-850 font-bold' : 'border-transparent text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          {t.tabComparison}
                        </button>
                      )}
                    </div>

                    {/* Dynamic Tab Body */}
                    <div className="min-h-[220px]">
                      {activeTab === 'steps' && (
                        <div className="space-y-4">
                          <p className="text-[11px] text-slate-400 font-normal italic leading-none">
                            {language === 'hi' 
                              ? '*अभिभावकों की समझ के लिए अत्यंत सहज एवं प्रामाणिक शब्दों में प्रस्तुत किया गया सारांश कार्य योजना।' 
                              : '*Respectfully structured simplified action guidelines to bypass queue blocks.'}
                          </p>
                          <div className="grid grid-cols-1 gap-3">
                            {result.childFriendlySteps.map((step) => (
                              <div key={step.stepNo} className="bg-white border border-slate-100 p-4 rounded-xl flex items-start gap-3 shadow-3xs">
                                <span className="w-7 h-7 shrink-0 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center font-display font-bold text-xs">
                                  {step.stepNo}
                                </span>
                                <div className="space-y-0.5 text-xs">
                                  <h5 className="font-display font-extrabold text-slate-850">{step.title}</h5>
                                  <p className="text-slate-500 font-light leading-relaxed">{step.action}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeTab === 'proscons' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* pros card */}
                          <div className="bg-emerald-50/10 border border-emerald-100/50 p-4 rounded-2xl space-y-3">
                            <span className="text-emerald-800 font-display font-bold text-xs uppercase tracking-wider flex items-center gap-1">
                              <TrendingUp size={13} className="text-emerald-700" /> 
                              <span>{language === 'hi' ? 'प्रमुख फायदे और लाभ' : 'Pros (Advantages)'}</span>
                            </span>
                            <ul className="space-y-2.5 text-xs">
                              {result.pros.map((pro, idx) => (
                                <li key={idx} className="flex gap-2 items-start text-slate-650 font-light leading-relaxed">
                                  <span className="text-emerald-600 text-sm mt-px">✓</span>
                                  <span>{pro}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* cons card */}
                          <div className="bg-indigo-50/10 border border-indigo-100/50 p-4 rounded-2xl space-y-3">
                            <span className="text-indigo-805 font-display font-bold text-xs uppercase tracking-wider flex items-center gap-1">
                              <TrendingDown size={13} className="text-indigo-700" /> 
                              <span>{language === 'hi' ? 'महत्वपूर्ण चेतावनी/चुनौतियाँ' : 'Cons (Barriers)'}</span>
                            </span>
                            <ul className="space-y-2.5 text-xs">
                              {result.cons.map((con, idx) => (
                                <li key={idx} className="flex gap-2 items-start text-slate-650 font-light leading-relaxed">
                                  <span className="text-indigo-650 text-sm mt-px">⚠️</span>
                                  <span>{con}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {activeTab === 'swot' && (
                        <div className="grid grid-cols-2 gap-3">
                          {/* S */}
                          <div className="bg-emerald-50/10 border border-emerald-100/50 p-3.5 rounded-xl space-y-1 shadow-3xs">
                            <span className="text-emerald-900 font-display font-bold text-[10px] uppercase tracking-wider block">🗣️ {language === 'hi' ? 'सामर्थ्य / खूबी' : 'Strengths'}</span>
                            <ul className="text-xs space-y-1 text-slate-600 list-disc list-inside font-light">
                              {result.swot.strengths.map((s, i) => <li key={i} className="leading-tight text-[11px]">{s}</li>)}
                            </ul>
                          </div>
                          {/* W */}
                          <div className="bg-amber-50/10 border border-amber-100/55 p-3.5 rounded-xl space-y-1 shadow-3xs">
                            <span className="text-amber-900 font-display font-bold text-[10px] uppercase tracking-wider block">⚠️ {language === 'hi' ? 'प्रशासनिक कमजोरी' : 'Weaknesses'}</span>
                            <ul className="text-xs space-y-1 text-slate-600 list-disc list-inside font-light">
                              {result.swot.weaknesses.map((w, i) => <li key={i} className="leading-tight text-[11px]">{w}</li>)}
                            </ul>
                          </div>
                          {/* O */}
                          <div className="bg-blue-50/10 border border-blue-105 p-3.5 rounded-xl space-y-1 shadow-3xs">
                            <span className="text-blue-900 font-display font-bold text-[10px] uppercase tracking-wider block">🚀 {language === 'hi' ? 'सक्रिय अवसर' : 'Opportunities'}</span>
                            <ul className="text-xs space-y-1 text-slate-600 list-disc list-inside font-light">
                              {result.swot.opportunities.map((o, i) => <li key={i} className="leading-tight text-[11px]">{o}</li>)}
                            </ul>
                          </div>
                          {/* T */}
                          <div className="bg-rose-50/10 border border-rose-100/40 p-3.5 rounded-xl space-y-1 shadow-3xs">
                            <span className="text-rose-900 font-display font-bold text-[10px] uppercase tracking-wider block">⛔ {language === 'hi' ? 'संभावित खतरे' : 'Threats'}</span>
                            <ul className="text-xs space-y-1 text-slate-600 list-disc list-inside font-light">
                              {result.swot.threats.map((t, i) => <li key={i} className="leading-tight text-[11px]">{t}</li>)}
                            </ul>
                          </div>
                        </div>
                      )}

                      {activeTab === 'comparison' && result.comparisonTable && (
                        <div className="overflow-x-auto rounded-xl border border-slate-100 bg-white">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-slate-50 border-b border-slate-100 text-slate-650 font-bold font-display">
                                <th className="p-3">Criterion</th>
                                <th className="p-3">Option A</th>
                                <th className="p-3">Option B</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                              {result.comparisonTable.map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50/60 transition-colors text-slate-600 font-light">
                                  <td className="p-3 font-semibold text-slate-800">{row.criterion}</td>
                                  <td className="p-3 leading-relaxed">{row.routeA}</td>
                                  <td className="p-3 leading-relaxed">{row.routeB}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>

                    {/* Local Supporting Organizations linked */}
                    <div className="pt-6 border-t border-slate-100 space-y-3">
                      <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase font-display flex items-center gap-1.5">
                        <Building size={12} /> 
                        <span>{language === 'hi' ? 'रांची और जमशेदपुर में सहायक संगठन सहयोग केंद्र:' : 'Supporting Organizations & Local Partner Desks:'}</span>
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {result.supportingOrganizations.map((org, idx) => (
                          <div key={idx} className="p-3.5 bg-white border border-slate-100 rounded-xl space-y-1 shadow-3xs flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-center">
                                <span className="font-display font-extrabold text-slate-800 text-xs">{org.name}</span>
                                <span className="inline-flex items-center gap-0.5 px-2.5 py-0.5 bg-indigo-50 border border-indigo-100 text-indigo-800 text-[8px] font-bold rounded-md font-mono uppercase">
                                  <MapPin size={8} /> {org.city === 'both' ? 'Both Cities' : org.city}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-550 font-light mt-1.5 leading-relaxed">
                                {org.role}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
