/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import { SubCategory, City } from './types';

export interface TranslationSet {
  // Navigation / Header
  title: string;
  subtitle: string;
  tagline: string;
  tagline_hi: string;
  accessibilityCheck: string;
  languageSelect: string;
  jamshedpurNode: string;
  ranchiNode: string;
  tabCatalogue: string;
  tabAdvisor: string;
  listenIntro: string;
  listenIntroVoice: string;

  // Login / Email Widget
  emailInviTitle: string;
  emailInviDesc: string;
  emailOptionalBadge: string;
  nameLabel: string;
  emailLabel: string;
  placeholderName: string;
  placeholderEmail: string;
  btnSubmitEmail: string;
  btnSubmittingEmail: string;
  emailPrivacyNote: string;
  successTitle: string;
  successDesc: string;
  successDetails: string;
  smtpLogHeader: string;
  btnLogout: string;

  // Helplines
  helplineHeader: string;
  elderlineTitle: string;
  elderlineDesc: string;
  sabalTitle: string;
  sabalDesc: string;

  // Decision Advisor / Interactive Decision Tree
  advisorTitle: string;
  advisorDesc: string;
  guidedTreeTab: string;
  customAiTab: string;
  presetScenarioHeader: string;
  presetScenarioPensionTitle: string;
  presetScenarioPensionDesc: string;
  presetScenarioPensionQuery: string;
  presetScenarioWheelchairTitle: string;
  presetScenarioWheelchairDesc: string;
  presetScenarioWheelchairQuery: string;
  presetScenarioVotingTitle: string;
  presetScenarioVotingDesc: string;
  presetScenarioVotingQuery: string;
  presetScenarioUdidTitle: string;
  presetScenarioUdidDesc: string;
  presetScenarioUdidQuery: string;

  // AI Form inputs
  formHeader: string;
  cityLabel: string;
  ageLabel: string;
  incomeLabel: string;
  serviceCategoryLabel: string;
  disabilityLabel: string;
  eligibleBadge: string;
  ineligibleBadge: string;
  disabilityDisclaimer: string;
  customQuestionLabel: string;
  placeholderCustomQuestion: string;
  btnRunAi: string;
  btnRunningAi: string;
  aiOutputHeader: string;
  aiOutputSub: string;
  resultsEmptyTitle: string;
  resultsEmptyDesc: string;
  pathwayBadge: string;
  caregiverBriefingTitle: string;
  benefitsTitle: string;
  barriersTitle: string;
  bestRouteLabel: string;
  localPartnersLabel: string;
  
  // Tabs inside results
  tabSimplifiedSteps: string;
  tabProsCons: string;
  tabSwot: string;
  tabComparison: string;

  // Decision Tree Node texts & Leaves (Hindi + English)
  treeStartTitle: string;
  treeStartSubTitle: string;
  treeProgressLabel: string;
  treeStepBack: string;
  treeRestart: string;
  treeProceed: string;
  swotStrengths: string;
  swotWeaknesses: string;
  swotOpportunities: string;
  swotThreats: string;

  // Strategic Roadmap
  roadmapHeader: string;
  roadmapLiveServiceTitle: string;
  roadmapTitle: string;
  roadmapSub: string;
  roadmapLiveTag: string;
  roadmapWhyItMatters: string;
  howRedWaveSolves: string;
  partnershipDisclaimer: string;
}

export const TRANSLATIONS: Record<'en' | 'hi', TranslationSet> = {
  en: {
    title: "उडाAn THE UDAAN",
    subtitle: "Accessibility & Rights Hub",
    tagline: "Empowering Persons with Disabilities in Jamshedpur & Ranchi",
    tagline_hi: "झारखंड के दिव्यांगजनों के लिए सशक्तिकरण मंच",
    accessibilityCheck: "♿ WCAG AAA Compliant. Custom layout, text scaling and audio controls are fully integrated.",
    languageSelect: "Language / भाषा",
    jamshedpurNode: "📍 Jamshedpur East Singhbhum",
    ranchiNode: "📍 Ranchi Region",
    tabCatalogue: "📋 Schemes Guide & Catalogue",
    tabAdvisor: "🧠 Guided Advisor & Quick AI",
    listenIntro: "🔊 Play Voice Guide",
    listenIntroVoice: "Welcome to The Udaan Accessibility Hub, constructed for Persons with Disabilities in Jharkhand. You can learn about government benefits like pensions, UDID cards, and adaptive support details. Tap the bottom launcher buttons to adapt contrast or hear any paragraph narrated out loud.",

    emailInviTitle: "📧 Save This Guide Offline (Email Copy)",
    emailInviDesc: "Would you like we to save your customized details? Insert your email and name. We will instantly dispatch a fully detailed, printer-friendly welfare checklist to you and CC the coordinator at sainikdutta87@gmail.com for local tracking.",
    emailOptionalBadge: "Optional & Secure",
    nameLabel: "Your Name / Caretaker Name",
    emailLabel: "Your Primary Email Address",
    placeholderName: "Type in your name...",
    placeholderEmail: "Type in your email address...",
    btnSubmitEmail: "Send Checklist to My Email ✉️",
    btnRunningAi: "Gemini AI is processing...",
    btnSubmittingEmail: "Registering Profile & Transmitting Email...",
    emailPrivacyNote: "🔒 Under the RPWD Act, personal details are treated with strict confidentiality. No marketing or spam.",
    successTitle: "Secured Path Confirmation!",
    successDesc: "Your local support checklist has been successfully queued and compiled.",
    successDetails: "Your guidelines are actively flying to your address, with carbon copy routed to the regional manager at sainikdutta87@gmail.com.",
    smtpLogHeader: "📬 SMTP Transmission Log",
    btnLogout: "🔐 Logout & Reset Sidebar",

    helplineHeader: "Regional Welfare Support Contacts",
    elderlineTitle: "Elderline National Help",
    elderlineDesc: "📞 Dial 14567 • Immediate support & pension grievances.",
    sabalTitle: "Tata Sabal Support Center",
    sabalDesc: "♿ Bistupur Office • Biometrics collection & transit fleet.",

    advisorTitle: "Udaan Decision Advisor",
    advisorDesc: "Confused about which government program is best or struggling with complex paperwork? Use our decision helpers below to get an optimized path immediately.",
    guidedTreeTab: "🌳 Guided Decision Tree Quest",
    customAiTab: "🧠 Custom AI Solver",
    presetScenarioHeader: "Or Select a Common Welfare Case:",
    presetScenarioPensionTitle: "Pension Choice Route",
    presetScenarioPensionDesc: "Is state pension faster than central IGNDPS?",
    presetScenarioPensionQuery: "Which pension is faster and more reliable for a 60% disabled adult? Central pension via Umang or state offline form at local Ranchi Block Office?",
    presetScenarioWheelchairTitle: "Free Wheelchair Quest",
    presetScenarioWheelchairDesc: "How to claim fully free tricycle or assistive tool?",
    presetScenarioWheelchairQuery: "I need a high-quality folding wheelchair under the ALIMCO ADIP scheme. My family monthly income is below 15,000. How do I get certified quickly?",
    presetScenarioVotingTitle: "Voting Day Help",
    presetScenarioVotingDesc: "Queue cuts and wheelchair rides on polling day.",
    presetScenarioVotingQuery: "How do I mark my voter profile as PwD on the Saksham Election Commission app to secure free door-to-door transport and skip lines on election day in Jamshedpur?",
    presetScenarioUdidTitle: "UDID & ABHA Combo",
    presetScenarioUdidDesc: "Link universal handicap card with digital health account.",
    presetScenarioUdidQuery: "Why should I map my newly issued national UDID Card to my Ayushman Bharat (ABHA) health ledger? How does this combination help PwDs?",

    formHeader: "Customize Your Parameters",
    cityLabel: "Select Your Current District",
    ageLabel: "Age of the Person with Disability",
    incomeLabel: "Total Monthly Family Income",
    serviceCategoryLabel: "Select Target Welfare Category",
    disabilityLabel: "Certified Disability Percentage",
    eligibleBadge: "Eligible (>= 40%)",
    ineligibleBadge: "Ineligible for standard PwD benefits",
    disabilityDisclaimer: "*A certified medical score of 40% or more is legally mandatory to claim standard disability allowances under state and central rules.",
    customQuestionLabel: "Your Custom Situation or Question",
    placeholderCustomQuestion: "Example: I do not own a 1932 land document. How do I apply for the local Swami Vivekananda state pension in Jamshedpur?",
    btnRunAi: "Run AI Decision Solver",
    aiOutputHeader: "Recommended Action Roadmap",
    aiOutputSub: "Bespoke analysis processed dynamically according to Ranchi/Jamshedpur rules.",
    resultsEmptyTitle: "AI Solver Ready",
    resultsEmptyDesc: "Fill in your details and click 'Run AI Decision Solver' to receive a customized, highly professional step-by-step guideline, comparative analysis, and local partner suggestions.",
    pathwayBadge: "🏆 RECOMMENDED PATHWAY",
    caregiverBriefingTitle: "📑 Plain-Language Caregiver Briefing (Respectful & Clear)",
    benefitsTitle: "✓ Primary Benefits & Advantages",
    barriersTitle: "⚠️ Challenges to Watch Out For",
    bestRouteLabel: "🎯 Direct Step-by-Step Execution Path",
    localPartnersLabel: "🏢 Recommended Regional Coordinators",

    tabSimplifiedSteps: "Simplified Steps 📋",
    tabProsCons: "Pros & Cons ⚖️",
    tabSwot: "SWOT Analysis 📊",
    tabComparison: "Route Comparison 🗒️",

    treeStartTitle: "Simplified Guided Path Explorer",
    treeStartSubTitle: "Click the cards below to narrow down your optimal welfare scheme instantly based on your local Jamshedpur or Ranchi context.",
    treeProgressLabel: "Progress Level",
    treeStepBack: "← Go Back Step",
    treeRestart: "↻ Restart Explorer",
    treeProceed: "Next Step →",
    swotStrengths: "🗣️ Strengths",
    swotWeaknesses: "⚠️ Weaknesses",
    swotOpportunities: "🚀 Opportunities",
    swotThreats: "⛔ Threats",

    roadmapHeader: "Strategic Roadmap under the RPWD Act (2016)",
    roadmapLiveServiceTitle: "Our Live Services & Core Expansion Blueprint",
    roadmapTitle: "Strategic Portfolio Expansion Roadmap",
    roadmapSub: "Under the Rights of Persons with Disabilities Act (2016). We provide one live core service, alongside a strictly defined rollout roadmap co-designed with CSR partners.",
    roadmapLiveTag: "● CORE LIVE FACILITY",
    roadmapWhyItMatters: "Why it represents a critical right:",
    howRedWaveSolves: "Red Wave Active Execution Pathway:",
    partnershipDisclaimer: "Note: Future roadmap projects are active collaborations under development with Deepshikha NGO (Ranchi) and Sabal CSR division (Tata SteelJamshedpur)."
  },
  hi: {
    title: "उडाAn THE UDAAN",
    subtitle: "दिव्यांगता सहायता एवं अधिकार हब",
    tagline: "जमशेदपुर और रांची में दिव्यांगजनों को सशक्त बनाना",
    tagline_hi: "झारखंड के दिव्यांगजनों के लिए सशक्तिकरण मंच",
    accessibilityCheck: "♿ WCAG AAA अनुपालन। कस्टम लेआउट, टेक्स्ट स्केलिंग और वॉयस रीडर पूर्ण रूप से उपलब्ध हैं।",
    languageSelect: "भाषा / Language",
    jamshedpurNode: "📍 जमशेदपुर (पूर्वी सिंहभूम)",
    ranchiNode: "📍 रांची क्षेत्र (झारखंड)",
    tabCatalogue: "📋 सरकारी योजनाएं और दिशा-निर्देश",
    tabAdvisor: "🧠 निर्णय सहायक और त्वरित एआई",
    listenIntro: "🔊 बोलकर समझें (ऑडियो मार्गदर्शिका)",
    listenIntroVoice: "झारखंड के हमारे दिव्यांग भाई-बहनों और अभिभावकों के लिए उड़ान पोर्टल पर आपका स्वागत है। यहां आप पेंशन, यूडीआईडी कार्ड और सहायक उपकरणों के बारे में हिंदी या अंग्रेजी में पूरी जानकारी प्राप्त कर सकते हैं। लेआउट बदलने या बोलकर सुनने के लिए नीचे बाईं ओर दिए गए बटनों का उपयोग करें।",

    emailInviTitle: "📧 यह मार्गदर्शिका ईमेल पर प्राप्त करें",
    emailInviDesc: "क्या आप अपने लिए चुनी गई योजनाओं की सूची सुरक्षित रखना चाहते हैं? अपना नाम और ईमेल दर्ज करें। हम तुरंत आपके ईमेल पर प्रिंट-अनुकूल सहायता सूची भेज देंगे, और इसकी प्रति स्थानीय सहायता के लिए sainikdutta87@gmail.com पर भेज दी जाएगी।",
    emailOptionalBadge: "पूरी तरह से ऐच्छिक और सुरक्षित",
    nameLabel: "आपका नाम या अभिभावक का नाम",
    emailLabel: "आपका मुख्य ईमेल पता",
    placeholderName: "अपना नाम यहाँ लिखें...",
    placeholderEmail: "अपना ईमेल यहाँ लिखें...",
    btnSubmitEmail: "सहायता सूची ईमेल पर भेजें ✉️",
    btnRunningAi: "जेमिनी एआई विश्लेषण कर रहा है...",
    btnSubmittingEmail: "प्रोफ़ाइल दर्ज की जा रही है और ईमेल भेजा जा रहा है...",
    emailPrivacyNote: "🔒 दिव्यांगजन अधिकार अधिनियम (RPWD Act) के तहत आपकी निजी जानकारी पूरी तरह गोपनीय रखी जाती है। कोई विज्ञापन या स्पैम नहीं।",
    successTitle: "सुरक्षित पथ की पुष्टि!",
    successDesc: "आपकी स्थानीय सहायता सूची सफलतापूर्वक संकलित कर ली गई है।",
    successDetails: "चुने हुए निर्देश आपके ईमेल पर भेज दिए गए हैं, और एक प्रति क्षेत्रीय प्रबंधक को sainikdutta87@gmail.com पर भेज दी गई है।",
    smtpLogHeader: "📬 एसएमटीपी ट्रांसमिशन लॉग",
    btnLogout: "🔐 लॉगआउट करें",

    helplineHeader: "क्षेत्रीय कल्याण सहायता संपर्क",
    elderlineTitle: "एल्डरलाइन राष्ट्रीय सहायता",
    elderlineDesc: "📞 सीधे डायल करें 14567 • तत्काल सहायता और पेंशन शिकायतें।",
    sabalTitle: "टाटा सबल सहायता केंद्र",
    sabalDesc: "♿ बिष्टुपुर कार्यालय • बायोमेट्रिक्स संग्रह और सुगम वाहन बेड़ा।",

    advisorTitle: "उड़ान निर्णय सलाहकार",
    advisorDesc: "पेंशन, यूडीआईडी कार्ड या आवश्यक सरकारी कागजी कार्रवाई को लेकर चिंतित हैं? अपनी उलझन दूर करने के लिए नीचे दिए गए हमारे निर्णय सहायकों का उपयोग करें और तुरंत मार्गदर्शन प्राप्त करें।",
    guidedTreeTab: "🌳 निर्देशित निर्णय वृक्ष खोज",
    customAiTab: "🧠 कस्टम एआई समाधान",
    presetScenarioHeader: "या किसी सामान्य स्थिति को चुनें:",
    presetScenarioPensionTitle: "पेंशन चयन मार्ग",
    presetScenarioPensionDesc: "क्या राज्य पेंशन केंद्रीय पेंशन से ज्यादा तेज है?",
    presetScenarioPensionQuery: "६०% दिव्यांग वयस्क के लिए कौन सी पेंशन अधिक तेज़ और विश्वसनीय है? उमंग ऐप के माध्यम से केंद्रीय पेंशन या स्थानीय रांची ब्लॉक कार्यालय में राज्य का ऑफलाइन फॉर्म?",
    presetScenarioWheelchairTitle: "मुफ़्त व्हीलचेयर खोज",
    presetScenarioWheelchairDesc: "मुफ़्त ट्राइसाइकिल या सहायक उपकरण कैसे प्राप्त करें?",
    presetScenarioWheelchairQuery: "मुझे एलिम्को एडिप (ADIP) योजना के तहत मुफ़्त फोल्डिंग व्हीलचेयर की आवश्यकता है। मेरे परिवार की मासिक आय १५,००० से कम है। मैं जल्दी से प्रमाण पत्र कैसे प्राप्त करूं?",
    presetScenarioVotingTitle: "मतदान के दिन सहायता",
    presetScenarioVotingDesc: "मतदान बूथ पर कतार से छूट और व्हीलचेयर सहायता।",
    presetScenarioVotingQuery: "जमशेदपुर में मतदान के दिन मुफ़्त घर-से-घर परिवहन और कतार से छूट प्राप्त करने के लिए मैं सक्षम ऐप पर अपनी मतदाता प्रोफ़ाइल को दिव्यांग के रूप में कैसे चिह्नित करूँ?",
    presetScenarioUdidTitle: "यूडीआईडी और आभा (ABHA) कॉम्बो",
    presetScenarioUdidDesc: "यूडीआईडी कार्ड को डिजिटल स्वास्थ्य खाते से लिंक करें।",
    presetScenarioUdidQuery: "मुझे अपने नए जारी किए गए राष्ट्रीय यूडीआईडी कार्ड को अपने आयुष्मान भारत (ABHA) स्वास्थ्य खाते से क्यों जोड़ना चाहिए? इससे दिव्यांगजनों को क्या लाभ होता है?",

    formHeader: "अपनी जानकारी भरें",
    cityLabel: "अपना वर्तमान जिला चुनें",
    ageLabel: "दिव्यांग व्यक्ति की आयु",
    incomeLabel: "कुल मासिक पारिवारिक आय",
    serviceCategoryLabel: "कल्याणकारी सेवा श्रेणी चुनें",
    disabilityLabel: "दिव्यांगता का प्रमाणित प्रतिशत",
    eligibleBadge: "योग्य (४०% या अधिक)",
    ineligibleBadge: "दिव्यांगता भत्तों के लिए पर्याप्त नहीं",
    disabilityDisclaimer: "*राज्य और केंद्र सरकार के नियमों के तहत भत्तों का दावा करने के लिए न्यूनतम ४०% का चिकित्सा प्रमाणपत्र होना कानूनी रूप से अनिवार्य है।",
    customQuestionLabel: "आपकी स्थिति या कोई विशेष सवाल",
    placeholderCustomQuestion: "उदाहरण: मेरे पास १९३२ का खतियान (भूमि दस्तावेज) नहीं है। मैं जमशेदपुर में स्थानीय स्वामी विवेकानंद राज्य पेंशन के लिए कैसे आवेदन करूँ?",
    btnRunAi: "एआई निर्णय सलाहकार शुरू करें",
    aiOutputHeader: "अनुशंसित कार्य योजना मार्ग",
    aiOutputSub: "रांची और जमशेदपुर के प्रशासनिक नियमों के आधार पर तैयार किया गया विशेष विश्लेषण।",
    resultsEmptyTitle: "एआई सलाहकार तैयार है",
    resultsEmptyDesc: "ऊपर अपनी जानकारी भरें और 'एआई निर्णय सलाहकार शुरू करें' पर क्लिक करें। आपको तुरंत चरण-दर-चरण मार्गदर्शिका, तुलनात्मक विश्लेषण और स्थानीय सहयोगियों की संपर्क जानकारी मिलेगी।",
    pathwayBadge: "🏆 अनुशंसित मार्ग",
    caregiverBriefingTitle: "📑 अभिभावकों/देखभालकर्ताओं के लिए सरल भाषा में सारांश",
    benefitsTitle: "✓ मुख्य लाभ और फायदे",
    barriersTitle: "⚠️ सावधानियां और चुनौतियां",
    bestRouteLabel: "🎯 सीधे आवेदन करने का आसान और प्रभावी तरीका",
    localPartnersLabel: "🏢 अनुशंसित क्षेत्रीय सहयोगी संस्थाएं",

    tabSimplifiedSteps: "सरल चरण 📋",
    tabProsCons: "फायदे और नुकसान ⚖️",
    tabSwot: "SWOT सामर्थ्य विश्लेषण 📊",
    tabComparison: "मार्ग तुलना चार्ट 🗒️",

    treeStartTitle: "सरल निर्देशित मार्ग अन्वेषक",
    treeStartSubTitle: "जमशेदपुर या रांची के प्रशासनिक संदर्भ के आधार पर अपने लिए सबसे उपयुक्त योजना का तुरंत पता लगाने के लिए नीचे दिए गए कार्ड्स पर क्लिक करें।",
    treeProgressLabel: "प्रगति स्तर",
    treeStepBack: "← पीछे जाएं",
    treeRestart: "↻ शुरुआत से शुरू करें",
    treeProceed: "अगला चरण →",
    swotStrengths: "🗣️ खूबियां",
    swotWeaknesses: "⚠️ कमजोरियां (बाधाएं)",
    swotOpportunities: "🚀 नए अवसर",
    swotThreats: "⛔ संभावित खतरे",

    roadmapHeader: "दिव्यांगजन अधिकार अधिनियम (2016) के तहत रणनीतिक रोडमैप",
    roadmapLiveServiceTitle: "हमारी चालू सेवा और आगामी विस्तार योजना",
    roadmapTitle: "रणनीतिक सेवा विस्तार रोडमैप",
    roadmapSub: "दिव्यांगजन अधिकार अधिनियम (२०१६) के तहत। हम वर्तमान में एक मुख्य लाइव सेवा प्रदान करते हैं, और अन्य सेवाओं को सीएसआर सहयोगियों के साथ एक रोडमैप के रूप में प्रस्तुत कर रहे हैं।",
    roadmapLiveTag: "● मुख्य लाइव सुविधा (सक्रिय)",
    roadmapWhyItMatters: "यह क्यों एक आवश्यक अधिकार है:",
    howRedWaveSolves: "रेड वेव निष्पादन का सुगम मार्ग:",
    partnershipDisclaimer: "नोट: रोडमैप में शामिल भविष्य की परियोजनाएं दीपशिखा एनजीओ (रांची) और सबल सीएसआर प्रभाग (टाटा स्टील जमशेदपुर) के साथ मिलकर विकसित की जा रही हैं।"
  }
};

// Hindi translations for Leaf Results inside decision tree
export const LEAF_RESULTS_HINDI: Record<string, { title: string; subtitle: string; simplifiedCaregiverSummary: string; pros: string[]; cons: string[]; bestRoute: string }> = {
  central_igndps: {
    title: "केंद्रीय आईजीएनडीपीएस (इंदिरा गांधी राष्ट्रीय दिव्यांगता पेंशन योजना)",
    subtitle: "राष्‍ट्रीय बैंकों के माध्यम से सीधे मिलने वाला मुख्य केंद्रीय वित्तीय अनुदान।",
    simplifiedCaregiverSummary: "यह योजना ८०% या उससे अधिक दिव्यांगता वाले गंभीर नागरिकों के लिए है। इसके तहत लाभार्थियों को सीधे बैंक खाते में प्रत्यक्ष लाभ अंतरण (DBT) के माध्यम से वित्तीय सुरक्षा प्रदान की जाती है, जो आवश्यक दवाओं और शिक्षा के खर्चों की पूर्ति में मदद करती है।",
    pros: [
      "सीधे केंद्रीय बजट से धन सुरक्षित, और पात्रता मिलने पर प्रति माह ₹१००० से ₹१५00 तक की राशि।",
      "बिना बिचौलियों के पीएफएमएस (PFMS) प्रणाली द्वारा सीधे बैंक खाते में भुगतान सुरक्षित।",
      "यह योजना लंबी अवधि की सुरक्षा प्रदान करती है।"
    ],
    cons: [
      "ऑनलाइन अप्लीकेशन पोर्टल (जैसे उमंग या एनएसएपी) में अक्सर तकनीकी खराबी के कारण बाधाएं आती हैं।",
      "दस्तावेजों में नाम या स्पेलिंग की मामूली गलती होने पर भी आवेदन महीनों अटके रह सकते हैं।",
      "इसके लिए आवेदक का बैंक खाता आधार से लिंक (Direct Benefit Transfer - DBT) होना अनिवार्य है।"
    ],
    bestRoute: "सबसे विश्वसनीय तरीका यह है कि आप अपने आधार कार्ड की प्रति, ८०% से अधिक का यूडीआईडी (UDID) प्रमाण पत्र और बीपीएल (BPL) कार्ड को संकलित करें। अस्थिर ऑनलाइन पोर्टल पर निर्भर होने के बजाय, रांची सदर या जमशेदपुर ब्लॉक कार्यालय (अंचल अधिकारी समाज कल्याण डेस्क) में सीधे ऑफलाइन दस्तावेज जमा करें।"
  },
  state_pension: {
    title: "स्वामी विवेकानंद निशक्त पेंशन योजना (झारखंड सरकार)",
    subtitle: "आसान आयु और दिव्यांगता पात्रता वाली बेहद सुलभ वित्तीय सुरक्षा योजना।",
    simplifiedCaregiverSummary: "झारखंड सरकार द्वारा चलाई जाने वाली यह पेंशन योजना ४०% या उससे अधिक दिव्यांगता वाले सभी आयु वर्ग के नागरिकों के लिए है। यह केंद्रीय पेंशन की तुलना में बहुत जल्दी स्वीकृत होती है और स्थानीय ब्लॉक स्तर पर ऑफलाइन रूप से आसानी से लागू की जा सकती है।",
    pros: [
      "उम्र का कोई बंधन नहीं - बच्चों से लेकर बुजुर्गों तक सभी के लिए सुलभ।",
      "गंभीर ८०% की कड़े नियमों के बजाय केवल ४०% प्रमाणित दिव्यांगता होने पर भी पूर्ण अधिकार।",
      "अंचल कार्यालय और ब्लॉक स्तर के अधिकारियों द्वारा त्वरित रूप से निरस्त व निस्तारित।"
    ],
    cons: [
      "इसके लिए झारखंड के स्थायी निवासी होने का प्रमाणपत्र (स्थानीय निवास घोषणा पत्र) आवश्यक है।",
      "त्रैमासिक शिविरों के दौरान ब्लॉक कल्याण कार्यालयों में लंबी कतारों का सामना करना पड़ सकता है।",
      "राज्य के बजट निकासी और आवंटन प्रक्रियाओं के कारण कभी-कभी भुगतान में देरी हो सकती है।"
    ],
    bestRoute: "अपना मूल निवासी प्रमाण पत्र, स्थानीय पते के दस्तावेज और न्यूनतम ४०% का यूडीआईडी प्रमाण पत्र एकत्र करें। अपने स्थानीय वार्ड पार्षद या पंचायत प्रतिनिधि के हस्ताक्षर वाला अनुशंसा पत्र साथ रखें और त्वरित ऑफ़लाइन पंजीकरण के लिए इसे सीधे ब्लॉक समाज कल्याण निरीक्षक के पास जमा करें।"
  },
  aadhaar_card: {
    title: "आधार कार्ड नामांकन और सुधार सेवा",
    subtitle: "सभी राज्य व केंद्र सरकार समाज कल्याण योजनाओं को अनलॉक करने वाला सबसे महत्वपूर्ण डिजिटल लिंक।",
    simplifiedCaregiverSummary: "आधार कार्ड देश की प्रमुख पहचान संख्या है। दिव्यांगजनों से संबंधित पेंशन योजनाएं, सहायक उपकरण दावे और बैंक खाते का प्रत्यक्ष लाभ अंतरण इसी कार्ड की बायोमेट्रिक शुद्धता पर निर्भर करते हैं।",
    pros: [
      "दिव्यांगजनों के लिए सभी प्रकार के पेंशन और वित्तीय लाभ प्राप्त करने के लिए आधार अनिवार्य है।",
      "जमशेदपुर और रांची के मुख्य डाकघरों और प्रमुख बैंकों में दिव्यांगजनों के लिए अलग कतार और प्राथमिकता दी जाती है।",
      "बायोमेट्रिक पहचान प्रणाली के कारण किसी अन्य व्यक्ति द्वारा धोखाधड़ी की संभावनाएं न के बराबर होती हैं।"
    ],
    cons: [
      "बायोमेट्रिक (उंगलियों के निशान और आंखों की पुतली) स्कैनिंग के लिए आवेदक को स्वयं नामांकन केंद्र पर उपस्थित होना पड़ता है।",
      "बुजुर्गों तथा उंगलियों के निशान घिस जाने वाले दिव्यांग भाई-बहनों में बायोमेट्रिक विफलता दर काफी अधिक हो सकती है।",
      "विगत के चिकित्सा प्रमाणपत्र और नए आधार बायोडाटा में अंग्रेजी के नामों की स्पेलिंग में अंतर आने पर अन्य दस्तावेज रुक सकते हैं।"
    ],
    bestRoute: "ऑनलाइन यूआईडीएआई (UIDAI) पोर्टल से पहले एक समय बुक करें (बिष्टुपुर जमशेदपुर मुख्य डाकघर या रांची कचहरी रोड केंद्र)। ऐसा करने पर आपको लंबी कतारों में खड़ा नहीं होना पड़ेगा।"
  },
  assisted_devices: {
    title: "सहायक उपकरण योजना (केंद्रीय एडिप - ADIP कार्यक्रम)",
    subtitle: "दिव्यांगजनों के लिए पूरी तरह से मुफ्त अथवा रियायती आधुनिक उपकरण (जैसे ट्राइसाइकिल, आदि)।",
    simplifiedCaregiverSummary: "केंद्रीय एडिप योजना के अंतर्गत योग्य दिव्यांग नागरिकों को उनके जीवन को सुगम बनाने के लिए बैसाखी, व्हीलचेयर, कान की मशीन, और नेत्रहीनों के लिए विशेष सॉफ्टवेयर युक्त तकनीकी उपकरण मुफ्त प्रदान किए जाते हैं।",
    pros: [
      "पारिवारिक मासिक आय ₹15,000 से कम होने की स्थिति में पूरी तरह से मुफ्त अत्याधुनिक उपकरण दिए जाते हैं।",
      "विशेषज्ञ इंजीनियरों द्वारा वितरण स्थलों पर व्हीलचेयरों या उपकरणों को ठीक से फिट और एडजस्ट किया जाता है।",
      "विद्यार्थियों और रोजगार प्रशिक्षणार्थियों के लिए यह योजना स्वावलंबन लाने में अत्यधिक सहायक है।"
    ],
    cons: [
      "पारिवारिक आय सीमा प्रमाणित करने के लिए अंचल अधिकारी (Circle Officer) द्वारा हस्ताक्षरित प्रमाणपत्र की आवश्यकता होती है।",
      "उपकरण वितरण शिविर साल में केवल २ या ३ बार ही लगाए जाते हैं, जिससे लंबा इंतजार करना पड़ता है।",
      "मोटरयुक्त तिपहिया वाहनों (मोटराइज्ड ट्राइसाइकिल) की बैटरी या विशिष्ट पुर्जे ग्रामीण क्षेत्रों में आसानी से मरम्मत नहीं किए जा सकते।"
    ],
    bestRoute: "पहले अंचल अधिकारी से ₹15,000/माह से कम आय का आय प्रमाण पत्र तैयार करवाएं। एलिम्को (ALIMCO) पोर्टल पर आवेदन करने के साथ ही स्थानीय गैर-सरकारी संस्थानों व टाटा सबल शिविरों के साथ संपर्क रखें, क्योंकि वे बहुत तेजी से उपकरण आवंटित करते हैं।"
  },
  caste_certificate: {
    title: "झारखंड जाति प्रमाण पत्र (झारसेवा पोर्टल)",
    subtitle: "विशेष शैक्षणिक सीटें, आरक्षित सरकारी भत्ते और उच्च स्तरीय योजनाओं के लाभ की सुगम कुंजी।",
    simplifiedCaregiverSummary: "झारखंड में निवास करने वाले अनुसूचित जाति, अनुसूचित जनजाति और पिछड़ा वर्ग के दिव्यांगजन इसके माध्यम से शिक्षा, परीक्षा शुल्क में छूट और नौकरियों में मिलने वाले दोहरे (दिव्यांग + आरक्षित श्रेणी) आरक्षण लाभों को प्राप्त कर सकते हैं।",
    pros: [
      "परीक्षाओं, स्कॉलरशिप और रोजगार कोटा में दोहरे आरक्षण के अवसर खुलते हैं।",
      "झारसेवा (JharSewa) पर एक बार बनने के बाद यह हमेशा के लिए सुरक्षित डिजिटल प्रमाण बन जाता है।",
      "इसके लिए समय-समय पर नवीनीकरण (रिन्यूअल) कराने की आवश्यकता नहीं होती है।"
    ],
    cons: [
      "इसके लिए १९३२ के खतियान (पैतृक भूमि दस्तावेज) की मांग की जाती है, जो किरायेदार या विस्थापित परिवारों के लिए कठिन है।",
      "झारसेवा का ऑनलाइन पोर्टल वर्तमान में दृष्टिबाधितों के अनुकूल स्क्रीन-रीडर का समर्थन नहीं करता है।",
      "प्रमाणपत्र जारी होने में हल्का कर्मचारी से लेकर अंचल अधिकारी तक कई प्रशासनिक स्तरों से होकर गुजरने के कारण समय लगता है।"
    ],
    bestRoute: "अभिभावकों के साथ अंचल भू-अभिलेखों की प्रतियां एकत्र करें। झारसेवा पोर्टल पर एक उपयोगकर्ता आईडी बनाकर आवेदन दर्ज करें और स्थानीय प्रज्ञा केंद्र (Pragya Kendra) के माध्यम से इसे प्राथमिकता श्रेणी के तहत भेजने का अनुरोध करें।"
  },
  disability_cert_udid: {
    title: "दिव्यांगता यूडीआईडी (UDID) कार्ड एवं आभा (ABHA) लिंकेज",
    subtitle: "संपूर्ण भारत में मान्य दिव्यांगजनों का सर्वोपरि एकमात्र राष्ट्रीय चिकित्सा परिचय पत्र।",
    simplifiedCaregiverSummary: "यूडीआईडी (विशिष्ट दिव्यांगता पहचान पत्र) एक राष्ट्रीय स्तर का स्मार्ट कार्ड है जो अन्य सभी दस्तावेजों की आवश्यकता को समाप्त कर देता है। इसे आभा स्वास्थ्य खाते से जोड़ने पर संपूर्ण चिकित्सा डेटा डिजिटल रूप से सुरक्षित हो जाता है।",
    pros: [
      "यह संपूर्ण भारत में रेल रियायती टिकट बुकिंग, टोल टैक्स और बसों में यात्रा के दौरान पूर्णतः मान्य है।",
      "एक ही दस्तावेज होने के कारण यात्रा के दौरान अन्य सरकारी कागजों को ढोने या फटने का डर नहीं रहता।",
      "आयुष्मान स्वास्थ्य योजनाओं में त्वरित उपचार और दवाएं प्राप्त करने के लिए सर्वोत्तम।"
    ],
    cons: [
      "सदर अस्पताल (जमशेदपुर के खास महल या रांची सदर) में मेडिकल बोर्ड के सामने उपस्थित होकर जांच कराना थकाने वाला हो सकता है।",
      "ऑनलाइन आवेदन के बाद डाक विभाग द्वारा कार्ड को घर पहुंचने में ४५ से ६० दिन का समय लग जाता है।",
      "अस्थायी दिव्यांगता होने पर प्रत्येक ३ से ५ वर्ष में मेडिकल बोर्ड से पुनः पुष्टि करानी पड़ती है।"
    ],
    bestRoute: "सबसे पहले स्वावलंबन पोर्टल (swavlambancard.gov.in) पर जाकर अपना फॉर्म भरें। उसका प्रिंट लें और प्रत्येक मंगलवार अथवा गुरुवार को संबंधित सदर अस्पताल में लगने वाले मेडिकल बोर्ड शिविर में त्वरित जांच के लिए पहुंचें।"
  },
  voter_id: {
    title: "मतदाता पहचान पत्र (सक्षम ऐप - Saksham App PwD प्रायरिटी)",
    subtitle: "गरिमापूर्ण ढंग से मतदान करने, घर से मतदान केंद्र तक निःशुल्क वाहन परिवहन और एक्सप्रेस मतदान सुविधा।",
    simplifiedCaregiverSummary: "निर्वाचन आयोग द्वारा दिव्यांगजनों के लिए मतदाता पहचान पत्र के तहत विशेष सुविधाएं दी जाती हैं। सक्षम एप्लीकेशन के माध्यम से अपना विवरण दर्ज करने पर मतदान के दिन निःशुल्क वाहन आपके घर से सहायक सहित आपको मतदान केंद्र ले जाता है।",
    pros: [
      "मतदान के दिन लंबी धूप वाली कतारों में खड़ा नहीं होना पड़ता, एक्सप्रेस कतार का अधिकार मिलता है।",
      "सक्षम मोबाइल ऐप के जरिए घर बैठे ही परिवहन और व्हीलचेयर सहायक की अग्रिम बुकिंग की जा सकती है।",
      "बैंक खाता खोलने या नया सिम लेने के लिए यह पते का एक बेहद सुदृढ़ और विश्वसनीय प्रमाण माना जाता है।"
    ],
    cons: [
      "आवेदन के समय फॉर्म में 'दिव्यांगता फ्लैग (PwD Flag)' को विशेष रूप से चिह्नित करना पड़ता है; ऐसा न करने पर सुविधाएं नहीं मिलतीं।",
      "स्थानीय बूथ लेवल ऑफिसर (BLO) द्वारा घर-घर जाकर भौतिक सत्यापन किए जाने की प्रक्रिया धीमी हो सकती है।",
      "घर के पुराने वोटर कार्ड की स्पेलिंग से भिन्नता होने पर नया आवेदन निरस्त हो सकता है।"
    ],
    bestRoute: "भारत सरकार का आधिकारिक 'सक्षम' (Saksham) ऐप प्ले स्टोर से डाउनलोड करें। वहां 'PwD Marking' का विकल्प चुनकर अपने यूडीआईडी कार्ड का नंबर दर्ज करें। ऐसा करने से आपकी मतदाता प्रोफ़ाइल तुरंत अपडेट हो जाएगी और चुनाव दल को अलर्ट चला जाएगा।"
  }
};
