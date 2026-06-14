/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HelpCircle,
  TrendingUp,
  TrendingDown,
  Building,
  Target,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Smile,
  Compass,
  ChevronRight
} from 'lucide-react';
import { TRANSLATIONS, LEAF_RESULTS_HINDI } from '../translations';

interface LeafResult {
  title: string;
  subtitle: string;
  simplifiedCaregiverSummary: string;
  pros: string[];
  cons: string[];
  bestRoute: string;
  supportingOrgs: { name: string; role: string; city: 'Ranchi' | 'Jamshedpur' | 'Both' }[];
}

interface TreeOption {
  label: string;
  icon: string;
  description: string;
  nextNodeId?: string;
  leafKey?: string; // Point to dynamic translation key
}

interface TreeNode {
  id: string;
  question: string;
  description: string;
  options: TreeOption[];
}

interface InteractiveDecisionTreeProps {
  language: 'en' | 'hi';
}

const LEAF_RESULTS_ENGLISH: Record<string, LeafResult> = {
  central_igndps: {
    title: "Central IGNDPS (Indira Gandhi National Disability Pension)",
    subtitle: "Premium central financial grant mapped directly via the National PFMS repository.",
    simplifiedCaregiverSummary: "This central pension is intended for severely disabled individuals (80% or greater certified score) who belong to families holding a Below Poverty Line (BPL) status. It disburses monthly payouts directly via Aadhaar-linked bank accounts.",
    pros: [
      "Secures direct central budget funds, guaranteeing ₹1,000 to ₹1,500/month if BPL records match.",
      "Integrates cleanly with the national PFMS registry, eliminating intermediate cash-handlers.",
      "Higher payout safety compared to local ad-hoc rural schemes."
    ],
    cons: [
      "The online application portal (Umang / National Social Assistance Portal) has high technical downtime.",
      "Very strict verification standards. A minor spelling error in names will freeze the file for months.",
      "Mandatorily requires a certified Direct Benefit Transfer (DBT) bank account."
    ],
    bestRoute: "Assemble the applicant's physical Aadhaar card copy, 80%+ UDID certificate, and BPL card. Hand over this dossier physically to the Circle Officer (CO) Welfare Desk at Ranchi Sadar or Jamshedpur East Singhbhum block offices directly, as online portal queues are unstable.",
    supportingOrgs: [
      { name: "DSWO Office, East Singhbhum", role: "Primary regional state executive sanctioning central pensions.", city: "Jamshedpur" },
      { name: "Sabal Rehabilitation Center (Sabal Center)", role: "Direct support desk to assist in BPL income validation and filing.", city: "Jamshedpur" },
      { name: "Deepshikha Welfare Organization", role: "Assists rural families in documentation prep and tracking files.", city: "Ranchi" }
    ]
  },
  state_pension: {
    title: "Swami Vivekananda Nishakt Disability Pension (Jharkhand State)",
    subtitle: "Highly accessible state-sponsored financial safeguard with relaxed age & disability eligibility.",
    simplifiedCaregiverSummary: "This regional pension is sponsored by the Jharkhand Government for residents with a certified disability degree of 40% or more, regardless of age requirements. It features straightforward offline processing directly through the Block Development Office.",
    pros: [
      "Extremely friendly age standards (open from young children up to senior citizens).",
      "Available to any individual diagnosed with standard 40%+ disability, bypassing the harsh 80% central threshold.",
      "Locally processed by Block Development Officers, speeding up grievance resolution."
    ],
    cons: [
      "Requires a Ranchi/Jamshedpur region resident domicile certificate (Local residential proof).",
      "Slightly longer initial queues at localized Circle Welfare desks during quarterly camps.",
      "Payments can occasionally run late because of municipal budget releases."
    ],
    bestRoute: "Collect the applicant's resident domicile certificate, native address declarations, and a 40%+ UDID card. Have a localized ward advisor or panchayat representative sign the referral form, then present these directly to the Block Welfare Inspector.",
    supportingOrgs: [
      { name: "Ranchi Welfare Board DSWO", role: "Ranchi-wide state pension administrator.", city: "Ranchi" },
      { name: "Tata Steel Sabal Center", role: "Organizes free local support camps for registration validation.", city: "Jamshedpur" }
    ]
  },
  aadhaar_card: {
    title: "Aadhaar Card Enrollment & Details Update",
    subtitle: "Your fundamental digital link to all central and state welfare benefit schemes in Jharkhand.",
    simplifiedCaregiverSummary: "The Aadhaar card represents the cornerstone of identity validation in India. Every welfare program, bank payout linkage, and UDID application requires an updated Aadhaar record.",
    pros: [
      "Necessary for unlocking every pension, assistive devices list, and free state scheme.",
      "Priority counters exist specifically for PwDs at regional Post Offices and State Banks.",
      "Protects against identification fraud through safe face/iris bio-mapping."
    ],
    cons: [
      "Requires physical attendance at registration centers, which is hard for severe locomotor conditions.",
      "Often suffers from high biometric reading failure rates among children or senior citizens.",
      "System demands strict matches of spellings between birth certificates and school forms."
    ],
    bestRoute: "Book a prioritized slot online via the official UIDAI portal first. Bring the receipt along with a certified medical priority slip to the Bistupur Main Post Office Aadhaar desk in Jamshedpur or Kutchery Road UIDAI Kendra in Ranchi to bypass public lines.",
    supportingOrgs: [
      { name: "UIDAI Pragati Kendra Ranchi", role: "Direct access point for priority biometric mapping.", city: "Ranchi" },
      { name: "Sabal Hub Bistupur", role: "Helps transport and guide severely disabled kids through enrollment drives.", city: "Jamshedpur" }
    ]
  },
  assisted_devices: {
    title: "Assisted Devices Scheme (Central ADIP Program)",
    subtitle: "Fully subsidized mobility, sensory, and communication appliances for qualifying families.",
    simplifiedCaregiverSummary: "Under the central ADIP scheme, ALIMCO manufactures and distributes certified assistive gear (including wheelchair units, motorized transport vehicles, hearing kits, and braille aids) completely free for families with a monthly income under ₹15,000.",
    pros: [
      "Provides premium, medical-grade physical tools (worth thousands) entirely free under the ADIP initiative.",
      "Direct customization, padding setups, and trial calibration are performed by expert engineers at camp sites.",
      "Unlocks active physical independence for scholars and trade apprentices."
    ],
    cons: [
      "Requires sourcing a certified Income/Earnings status form signed by a local Circle Welfare Officer.",
      "Durable distribution camps run on schedules of once every 3 to 6 months, generating waiting backlogs.",
      "Special spares (like motorized tricycle batteries) are hard to replace in micro rural bazaars."
    ],
    bestRoute: "Claim an income certificate certifying family monthly income under ₹15,000 from the local अंचल अधिकारी (Circle Officer). Link the request with nearby NGO-led ALIMCO camps for immediate on-site customized calibration and pick-up.",
    supportingOrgs: [
      { name: "ALIMCO Jharkhand Hub", role: "National manufacturer and distributor of customized physical aids.", city: "Both" },
      { name: "Sabal Center / Sabal Camp Drives", role: "Holds on-the-spot physical diagnostic testing and equipment distribution.", city: "Jamshedpur" },
      { name: "Deepshikha Regional Center", role: "Arranges pediatric calipers, custom chairs, and orthotic fit tests.", city: "Ranchi" }
    ]
  },
  caste_certificate: {
    title: "Jharkhand Caste Certificate for PwD Requirements",
    subtitle: "High priority reservation safeguards, fee concessions, and localized scholarships.",
    simplifiedCaregiverSummary: "A valid caste certificate represents an essential document to claim academic reservation seats, customized scholar benefits, and government vocational program placements under backward categories in Jharkhand.",
    pros: [
      "Doubles your academic leverage by layering reservation benefits with special PwD quotas.",
      "Once registered on JharSewa, it remains safe forever without expiring.",
      "Critically required for high-tier national coaching programs and university aids."
    ],
    cons: [
      "Strict requirement for ancestral 1932 land documents (Khatiyan), which is extremely tough for urban residents.",
      "The JharSewa portal does not support accessible audio or screen-reader features.",
      "Involves a multi-tiered administrative chain of handoffs that easily delays processing."
    ],
    bestRoute: "Create a user profile on the digital JharSewa portal. Submit ancestral ownership documents, address records, and a cover letter explicitly indicating the applicant's certified disability to receive prioritized handling.",
    supportingOrgs: [
      { name: "Jharkhand JharSewa Pragya Kendra", role: "Digital service centers assisting with documentation uploads.", city: "Both" },
      { name: "Ranchi Deputy Commissioner Welfare Desk", role: "Ultimate appeal authority for expediting land lineage exemptions.", city: "Ranchi" }
    ]
  },
  disability_cert_udid: {
    title: "Disability Certificate & Universal National UDID Mappings",
    subtitle: "Sovereign medical passport enabling multi-state benefits and rail travel concessions.",
    simplifiedCaregiverSummary: "The national Unique Disability ID (UDID) maps all medical and handicap statistics into a single smart card, replacing old physical certificates. Linking this card with ABHA (Ayushman Bharat Health Account) preserves online historical treatment records.",
    pros: [
      "Highly respected document valid across all Indian states and transport departments.",
      "Directly links to railway concession portals for instant train booking ticket discounts.",
      "Maps critical healthcare folders to the official ABHA card for seamless cashless medical treatments."
    ],
    cons: [
      "Requires in-person physical assessment by a formal Medical Board at Sadar Hospital, involving long wait times.",
      "Physical cards suffer from delivery delays of 45-60 days through regional postal networks.",
      "Requires periodic reassessments and renewals if the doctor issues a temporary certificate."
    ],
    bestRoute: "Create an online draft registration on swavlambancard.gov.in first. Present the printed application form at Jamshedpur Sadar Hospital (Khas Mahal) or Ranchi Sadar Hospital on the weekly Medical Board day for prioritized physical screening.",
    supportingOrgs: [
      { name: "Civil Surgeon/Sadar Hospital Medical Board", role: "Sole authorized sovereign screening entity to rule on percentage scores.", city: "Both" },
      { name: "Tata Steel Sabal Hub", role: "Provides direct transport and helpers for board evaluations on site.", city: "Jamshedpur" }
    ]
  },
  voter_id: {
    title: "Voter ID Card & Saksham App PwD Priority Mappings",
    subtitle: "Guarantees priority polling booths, wheel-chair transit, and helper support.",
    simplifiedCaregiverSummary: "Disabled electors of Jharkhand receive specialized priority help at polling stations. Registering through the Union Government's Saksham App flags voter details to claim pre-scheduled home vehicle pickup and drop-off services on polling day.",
    pros: [
      "Unlocks complimentary home pick-up/drop-off transport and tactile braille support on election days.",
      "Mobile-friendly priority flagging is fully supported on the central 'Saksham EC' smartphone app.",
      "Doubles as an excellent proof of address and citizenship for commercial banks."
    ],
    cons: [
      "If the specific 'PwD Flag' field is not checked in the electoral roll, you will miss out on booth-side perks.",
      "Depends heavily on physical home validation visits by regional Booth Level Officers (BLOs).",
      "Process can be frozen if spelling mismatches occur across the family voter ledger."
    ],
    bestRoute: "Register or search your name on the Voter Services portal, then download the Union ECI's 'Saksham App' on your mobile. Select 'PwD Tagging Request' and upload your certified UDID certificate to update regional voter records instantly.",
    supportingOrgs: [
      { name: "District Election Office / Booth Level Officers (BLO)", role: "Responsible for home verification and delivering polling assistance.", city: "Both" },
      { name: "Sabal Center Electoral Outreach", role: "Runs local mock voting drives and voter-card updates for first-time youth.", city: "Jamshedpur" }
    ]
  }
};

const getDecisionTreeNodes = (language: 'en' | 'hi'): Record<string, TreeNode> => {
  if (language === 'hi') {
    return {
      root: {
        id: 'root',
        question: "आपको आज किस प्रकार की सहायता और सरकारी कल्याण सेवा की आवश्यकता है?",
        description: "उड़ान स्वावलंबन गाइड में आपका स्वागत है। नीचे दिए गए विकल्पों में से सबसे उपयुक्त सहायता मार्ग का चयन करें:",
        options: [
          {
            label: "💰 पेंशन और मासिक सीधे बैंक ट्रांसफर सहायता",
            icon: "🪙",
            description: "दवाओं और जीवन निर्वाह के खर्च के लिए केंद्र या राज्य सरकार की मासिक पेंशन सहायता प्रणाली।",
            nextNodeId: 'pension_income'
          },
          {
            label: "🪪 पहचान पत्र और सरकारी प्रमाण पत्र",
            icon: "💳",
            description: "नया आधार कार्ड, जाति प्रमाणपत्र, राष्ट्रीय यूडीआईडी (UDID) या मतदाता पहचान पत्र सुगम प्रक्रियाएं।",
            nextNodeId: 'identity_choice'
          },
          {
            label: "🦽 मुफ़्त व्हीलचेयर और शारीरिक सहायक उपकरण",
            icon: "⚙️",
            description: "एलिम्को योजना के तहत मुफ्त आधुनिक हियरिंग एड, ट्राइसाइकिल, नेत्रहीन सहायक छड़ी या कैलीपर्स प्राप्त करें।",
            leafKey: 'assisted_devices'
          }
        ]
      },
      pension_income: {
        id: 'pension_income',
        question: "अभिभावक/परिवार की कुल मासिक पारिवारिक आय कितनी है?",
        description: "केंद्रीय योजनाओं के लिए कम आय (बीपीएल) प्रमाणपत्र की आवश्यकता होती है, जबकि झारखंड की राज्य योजना अधिक सुलभ है।",
        options: [
          {
            label: "हमारी कुल पारिवारिक आय ₹15,000 प्रति माह से कम है (या बीपीएल कार्ड है)",
            icon: "📉",
            description: "आप केंद्रीय पेंशन योजना (IGNDPS) एवं राज्य पेंशन दोनों के नियमों हेतु उपयुक्त हैं।",
            nextNodeId: 'pension_eligibility_check'
          },
          {
            label: "हमारी पारिवारिक आय प्रति माह ₹15,000 से अधिक है",
            icon: "📈",
            description: "झारखंड की स्वामी विवेकानंद राज्य पेंशन योजना के लिए आय प्रमाण पत्र के सख्त कड़े नियम लागू नहीं होते।",
            leafKey: 'state_pension'
          }
        ]
      },
      pension_eligibility_check: {
        id: 'pension_eligibility_check',
        question: "क्या आवेदक की आयु 18 वर्ष से अधिक है, और उनके पास 80% या उससे अधिक का चिकित्सा प्रमाण पत्र है?",
        description: "आइए जांचें कि क्या आप केंद्रीय पेंशन के हकदार हैं, अन्यथा झारखंड राज्य की पेंशन ४०% दिव्यांगता पर ही तुरंत स्वीकृत हो जाती है!",
        options: [
          {
            label: "हां, दोनों पात्रताओं को पूरा करते हैं (उम्र 18+ वर्ष और 80% से अधिक दिव्यांगता)",
            icon: "🌟",
            description: "अति उत्तम! आप केंद्रीय इंदिरा गांधी राष्ट्रीय दिव्यांगता पेंशन (IGNDPS) योजना के पात्र हैं।",
            leafKey: 'central_igndps'
          },
          {
            label: "नहीं / आयु 18 से कम है / सामान्य दिव्यांगता (40% से 79% के बीच है)",
            icon: "🧸",
            description: "बधाई हो! आप बहुत आसान दस्तावेजों के साथ राज्य की स्वामी विवेकानंद पेंशन के हकदार हैं।",
            leafKey: 'state_pension'
          }
        ]
      },
      identity_choice: {
        id: 'identity_choice',
        question: "आपको किस आवश्यक सरकारी पहचान पत्र के आवेदन में सहायता चाहिए?",
        description: "प्रत्येक दस्तावेज के विशेष लाभ हैं। नीचे से उपयुक्त विकल्प चुनें:",
        options: [
          {
            label: "🪪 नया आधार कार्ड या बायोमेट्रिक्स सुधार",
            icon: "👤",
            description: "पेंशन और बैंक खातों से सीधे लिंक करने के लिए जरूरी प्राथमिकताSeva केन्द्र अपडेट।",
            leafKey: 'aadhaar_card'
          },
          {
            label: "📜 झारखंड जाति प्रमाण पत्र (झारसेवा पोर्टल द्वारा)",
            icon: "📜",
            description: "कॉलेज आरक्षित सीटों, स्कॉलरशिप भत्तों और सरकारी नौकरियों में दोहरे कोटे के लिए मुख्य प्रमाण।",
            leafKey: 'caste_certificate'
          },
          {
            label: "🩺 राष्ट्रीय यूडीआईडी (UDID) कार्ड एवं आभा स्वास्थ्य लिंकेज",
            icon: "🏥",
            description: "पूरे देश में मान्य एकल चिकित्सा प्रमाण पत्र जो रेल टिकटों पर सीधे ७५% तक छूट दिलाता है।",
            leafKey: 'disability_cert_udid'
          },
          {
            label: "🗳️ मतदाता पहचान पत्र और सक्षम ऐप प्राथमिकता",
            icon: "🗳️",
            description: "वोट डालने के दिन सुगम व्हीलचेयर वाहन सुविधा और बूथ पर सीधे आगे बढ़ने का सुगम विकल्प।",
            leafKey: 'voter_id'
          }
        ]
      }
    };
  }

  // English fallback nodes
  return {
    root: {
      id: 'root',
      question: "What category of welfare assistance or credentials do you require today?",
      description: "Welcome to UDAAN's Guided Path Explorer. Select one of the key welfare pillars below to map your optimal route:",
      options: [
        {
          label: "💰 Disability Pensions & Monthly Direct Transfers",
          icon: "🪙",
          description: "Secure structured monthly payouts under State or Central programs directly wired to your bank account.",
          nextNodeId: 'pension_income'
        },
        {
          label: "🪪 Identity Cards & Universal Registration Keys",
          icon: "💳",
          description: "Secure crucial national papers including Aadhaar updates, Caste certificates, Universal UDID, or Voter priority tags.",
          nextNodeId: 'identity_choice'
        },
        {
          label: "🦽 Specialized Assistive Devices & Mobility Aids",
          icon: "⚙️",
          description: "Request free custom-calibrated wheelchairs, motorized units, or hearing aids under the ALIMCO ADIP initiative.",
          leafKey: 'assisted_devices'
        }
      ]
    },
    pension_income: {
      id: 'pension_income',
      question: "What is your total family household monthly income?",
      description: "Central government pensions require a strict low-income threshold check, whereas local Jharkhand plans are highly accessible.",
      options: [
        {
          label: "Total family income is below ₹15,000/month (or hold BPL status)",
          icon: "📉",
          description: "Your household matches the low-income window suitable for both central and regional state pension plans.",
          nextNodeId: 'pension_eligibility_check'
        },
        {
          label: "Total family income is above ₹15,000/month",
          icon: "📈",
          description: "You bypass central BPL checks and qualify directly for the highly accessible Swami Vivekananda regional state pension.",
          leafKey: 'state_pension'
        }
      ]
    },
    pension_eligibility_check: {
      id: 'pension_eligibility_check',
      question: "Is the applicant 18 years or older, with 80% or greater certified disability scores?",
      description: "Let's check if we can secure the premium Central IGNDPS pension, otherwise the Jharkhand state pension is fully accessible for you.",
      options: [
        {
          label: "Yes (Applicant is 18+ years old & medical card lists 80%+ disability)",
          icon: "🌟",
          description: "Excellent, you are positioned to qualify for the Indira Gandhi National Pension Scheme.",
          leafKey: 'central_igndps'
        },
        {
          label: "No / Youth minor / Standard disability (40% to 79% score range)",
          icon: "🧸",
          description: "Successful routing. You qualify for the Swami Vivekananda state pension under relaxed verification guidelines.",
          leafKey: 'state_pension'
        }
      ]
    },
    identity_choice: {
      id: 'identity_choice',
      question: "Which sovereign registration document represents your primary block currently?",
      description: "Sovereign identifiers offer distinct shortcuts. Select the target application you require coordination for today:",
      options: [
        {
          label: "🪪 Aadhaar Card (Biometric enrollments or spelling updates)",
          icon: "👤",
          description: "Associate unique irises and prints to establish access to the direct benefits transfer system.",
          leafKey: 'aadhaar_card'
        },
        {
          label: "📜 Jharkhand Caste Certificate (JharSewa digital pipeline)",
          icon: "📜",
          description: "Essential to secure academic seat reserves, examination concessions, and regional coaching opportunities.",
          leafKey: 'caste_certificate'
        },
        {
          label: "🩺 National UDID smartest card & ABHA linkage portal",
          icon: "🏥",
          description: "Universal medical identifier permitting cashless health tracking and instant railway concessions.",
          leafKey: 'disability_cert_udid'
        },
        {
          label: "🗳️ Voter ID Priority Flagging via Union Saksham App",
          icon: "🗳️",
          description: "Tag elector profiles for priority queues, volunteers, and complimentary home pickup on voting days.",
          leafKey: 'voter_id'
        }
      ]
    }
  };
};

export default function InteractiveDecisionTree({ language }: InteractiveDecisionTreeProps) {
  const [currentNodeId, setCurrentNodeId] = useState<string>('root');
  const [history, setHistory] = useState<string[]>([]);
  const [leafKey, setLeafKey] = useState<string | null>(null);

  const t = TRANSLATIONS[language];
  const activeTreeNodes = getDecisionTreeNodes(language);
  const currentNode = activeTreeNodes[currentNodeId];

  // Resolve active leaf result data dynamically depending on language selection
  const getLeafResultData = (): LeafResult | null => {
    if (!leafKey) return null;
    
    const englishBase = LEAF_RESULTS_ENGLISH[leafKey];
    if (!englishBase) return null;

    if (language === 'hi') {
      const hindiTranslation = LEAF_RESULTS_HINDI[leafKey];
      if (hindiTranslation) {
        return {
          title: hindiTranslation.title,
          subtitle: hindiTranslation.subtitle,
          simplifiedCaregiverSummary: hindiTranslation.simplifiedCaregiverSummary,
          pros: hindiTranslation.pros,
          cons: hindiTranslation.cons,
          bestRoute: hindiTranslation.bestRoute,
          supportingOrgs: englishBase.supportingOrgs // Reuse localized organizational desks mapping
        };
      }
    }
    return englishBase;
  };

  const currentLeafResult = getLeafResultData();

  const handleOptionClick = (option: TreeOption) => {
    if (option.leafKey) {
      setHistory([...history, currentNodeId]);
      setLeafKey(option.leafKey);
    } else if (option.nextNodeId) {
      setHistory([...history, currentNodeId]);
      setCurrentNodeId(option.nextNodeId);
    }
  };

  const handleBack = () => {
    if (leafKey) {
      setLeafKey(null);
      const previous = history[history.length - 1] || 'root';
      setCurrentNodeId(previous);
      setHistory(history.slice(0, -1));
    } else if (history.length > 0) {
      const idx = history.length - 1;
      const prev = history[idx];
      setCurrentNodeId(prev);
      setHistory(history.slice(0, idx));
    }
  };

  const handleReset = () => {
    setCurrentNodeId('root');
    setHistory([]);
    setLeafKey(null);
  };

  return (
    <div className="bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-xs space-y-6" id="interactive-decision-tree-block">
      
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <span className="text-[10px] font-bold tracking-widest text-indigo-700 uppercase font-display flex items-center gap-1.5">
            <Compass size={12} className="text-indigo-600 shrink-0" /> {t.guidedTreeTab}
          </span>
          <h3 className="text-lg font-display font-semibold text-slate-800">
            🌳 {language === 'hi' ? 'सुगम सरकारी योजना अन्वेषक' : 'Udaan Guided Path Explorer'}
          </h3>
          <p className="text-xs text-slate-400 font-light max-w-sm sm:max-w-xl">
            {language === 'hi' 
              ? 'झारखंड में उपलब्ध दिव्यांग अधिकारों और कल्याणकारी परियोजनाओं का पता लगाने के लिए एक संवाद-आधारित विज़ार्ड।'
              : 'A step-by-step assistant mapping customized entitlements based on local rules.'}
          </p>
        </div>

        {/* Navigation Action Desks */}
        <div className="flex gap-2 shrink-0">
          {(history.length > 0 || leafKey) && (
            <button
              onClick={handleBack}
              className="px-3 py-2 border border-slate-150 font-display font-medium text-xs rounded-xl text-slate-500 hover:text-slate-855 hover:bg-slate-50 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <ArrowLeft size={13} />
              <span>{language === 'hi' ? 'पीछे जाएँ' : 'Back'}</span>
            </button>
          )}
          {(currentNodeId !== 'root' || leafKey) && (
            <button
              onClick={handleReset}
              className="px-3 py-2 border border-slate-150 font-display font-medium text-xs rounded-xl text-slate-500 hover:text-slate-855 hover:bg-slate-50 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <RotateCcw size={13} />
              <span>{language === 'hi' ? 'पुनः प्रारंभ करें' : 'Reset path'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Progress timeline gauge */}
      {!leafKey && (
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-50">
            <div
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{
                width: `${
                  currentNodeId === 'root'
                    ? 33
                    : currentNodeId === 'pension_income'
                    ? 66
                    : 100
                }%`
              }}
            ></div>
          </div>
          <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase tracking-wider">
            {t.treeProgressLabel}: {currentNodeId === 'root' ? 'Step 1 / 3' : currentNodeId === 'pension_income' ? 'Step 2 / 3' : 'Step 3 / 3'}
          </span>
        </div>
      )}

      {/* Interactive Questionnaire Stage */}
      <AnimatePresence mode="wait">
        {!currentLeafResult ? (
          <motion.div
            key={currentNodeId}
            initial={{ opacity: 0, scale: 0.99, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.99, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Active Question Box */}
            <div className="bg-slate-50 p-5 border border-slate-150/40 rounded-2xl">
              <span className="text-2xl mb-1.5 block">❓</span>
              <h4 className="font-display font-bold text-slate-800 text-sm sm:text-base leading-snug">
                {currentNode?.question}
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500 font-normal mt-1 leading-relaxed">
                {currentNode?.description}
              </p>
            </div>

            {/* Decision grid split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentNode?.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ y: -3, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleOptionClick(opt)}
                  className="bg-white border border-slate-200/80 hover:border-indigo-400 hover:shadow-xs p-5 rounded-2xl text-left cursor-pointer transition-all flex flex-col justify-between group h-full space-y-4 shadow-3xs"
                >
                  <div className="space-y-2">
                    <span className="text-3xl block group-hover:scale-110 transition-transform origin-left">
                      {opt.icon}
                    </span>
                    <span className="font-display font-bold text-slate-800 block text-xs sm:text-sm group-hover:text-indigo-600 transition-colors">
                      {opt.label}
                    </span>
                    <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                      {opt.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-indigo-600 text-[10px] font-semibold pt-3 border-t border-slate-100 w-full mt-2 self-end">
                    <Sparkles size={11} className="text-indigo-500" />
                    <span>{language === 'hi' ? 'आगे बढ़ें' : 'Select Pathway'}</span>
                    <ChevronRight className="ml-auto group-hover:translate-x-1 transition-transform" size={12} />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="leaf-result"
            initial={{ opacity: 0, scale: 0.99, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.99, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-6 animate-fade-in"
          >
            {/* Success Banner */}
            <div className="bg-gradient-to-r from-indigo-950 via-indigo-900 to-slate-900 p-6 sm:p-7 rounded-3xl text-white shadow-xs relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 translate-x-8 translate-y-8">
                <Compass size={220} />
              </div>
              <div className="relative z-10 space-y-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-indigo-500/30 border border-indigo-400/40 text-indigo-100 text-[9px] font-bold rounded-md uppercase tracking-wider font-display">
                  🏆 {language === 'hi' ? 'सफल मार्ग प्राप्त हुआ' : 'Optimal Path Mapped'}
                </span>
                <h4 className="text-base sm:text-lg font-display font-semibold tracking-tight">
                  {currentLeafResult.title}
                </h4>
                <p className="text-xs text-indigo-200/90 font-light max-w-2xl">
                  {currentLeafResult.subtitle}
                </p>
              </div>
            </div>

            {/* Caregiver plain language briefing */}
            <div className="bg-emerald-50/10 border-2 border-emerald-100 p-5 rounded-2xl space-y-2.5">
              <div className="flex items-center gap-1.5 text-emerald-800 font-display font-bold text-[10px] uppercase tracking-wider">
                <Smile size={14} className="text-emerald-700 font-semibold shrink-0" /> {t.caregiverBriefingTitle}
              </div>
              <p className="text-slate-650 text-xs leading-relaxed font-normal italic">
                {currentLeafResult.simplifiedCaregiverSummary}
              </p>
            </div>

            {/* Pros/Cons Side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-slate-150 space-y-3.5 shadow-3xs">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg uppercase tracking-wider font-display">
                  <TrendingUp size={12} className="text-emerald-600" /> {t.benefitsTitle}
                </span>
                <ul className="space-y-2.5">
                  {currentLeafResult.pros.map((pro, index) => (
                    <li key={index} className="text-xs text-slate-650 flex items-start gap-2 leading-relaxed font-light">
                      <span className="text-emerald-500 font-bold shrink-0 text-sm">✓</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-150 space-y-3.5 shadow-3xs">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-805 bg-amber-50 px-2.5 py-1 rounded-lg uppercase tracking-wider font-display">
                  <TrendingDown size={12} className="text-amber-600" /> {t.barriersTitle}
                </span>
                <ul className="space-y-2.5">
                  {currentLeafResult.cons.map((con, index) => (
                    <li key={index} className="text-xs text-slate-650 flex items-start gap-2 leading-relaxed font-light">
                      <span className="text-amber-500 font-bold shrink-0 text-xs mt-0.5">⚠️</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action directions */}
            <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-150 space-y-2 text-xs">
              <span className="font-display font-semibold text-[10px] py-1 px-2.5 bg-indigo-50 border border-indigo-150 text-indigo-900 rounded-md inline-flex items-center gap-1.5 uppercase tracking-wider">
                <Target size={13} className="text-indigo-600" /> {t.bestRouteLabel}
              </span>
              <p className="text-slate-650 font-normal leading-relaxed">
                {currentLeafResult.bestRoute}
              </p>
            </div>

            {/* Local Facilitator Support nodes */}
            <div className="bg-white border border-slate-150 p-5 rounded-2xl space-y-3 shadow-3xs">
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase font-display flex items-center gap-1.5">
                <Building size={12} className="text-slate-400" /> {t.localPartnersLabel}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentLeafResult.supportingOrgs.map((org, index) => (
                  <div key={index} className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-slate-800 text-xs">{org.name}</span>
                      <span className="px-2 py-0.5 rounded-sm bg-indigo-50 text-indigo-750 text-[8px] font-bold uppercase font-mono">
                        {org.city}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                      {org.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
