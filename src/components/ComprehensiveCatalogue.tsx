/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Clock,
  CheckSquare,
  Square,
  AlertCircle,
  Award,
  Building2,
  Calendar,
  Lock,
  Compass,
  ArrowRight,
  UserCheck,
  Zap,
  Info,
  Layers,
  MapPin,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  BookmarkCheck
} from 'lucide-react';
import { TRANSLATIONS } from '../translations';
import { City, SubCategory, SchemeDetail } from '../types';

interface ComprehensiveCatalogueProps {
  currentCity: City;
  onCityChange: (city: City) => void;
  language: 'en' | 'hi';
}

// Highly detailed, fully translated Scheme configurations for high fidelity Hindi / English toggle
const getLocalizedSchemes = (language: 'en' | 'hi'): SchemeDetail[] => {
  if (language === 'hi') {
    return [
      {
        id: 'disability-pension',
        title: 'दिव्यांगता पेंशन योजनाएं (Disability Pension)',
        overview: 'बुनियादी वित्तीय सुरक्षा प्रदान करने के लिए बनाए गए वित्तीय सहायता कार्यक्रम। इसमें राष्ट्रीय कार्यक्रम (IGNDPS) और झारखंड की स्थानीय "स्वामी विवेकानंद निशक्त पेंशन योजना" दोनों शामिल हैं।',
        eligibility: 'झारखंड का अधिवास, चिकित्सा बोर्ड द्वारा न्यूनतम ४०% प्रमाणित दिव्यांगता। आयु का कोई बंधन नहीं।',
        documents: [
          'आधार कार्ड (अनिवार्य)',
          'झारखंड राज्य द्वारा जारी दिव्यांगता प्रमाण पत्र',
          'आधार से लिंक बैंक पासबुक की मूल प्रति',
          'पारिवारिक आय प्रमाण पत्र / बीपीएल राशन कार्ड',
          'पासपोर्ट साइज की तीन हालिया रंगीन तस्वीरें'
        ],
        pros: [
          'लाभार्थियों को हर महीने ₹१,००० का नियमित सीधा भुगतान (डायरेक्ट बेनिफिट ट्रांसफर)।',
          'राशि सीधे बैंक खाते या स्थानीय पोस्ट ऑफिस खाते में बिना किसी बिचौलिये के सुरक्षित भेजी जाती है।',
          'एक बार स्वीकृति मिलने के बाद यह आजीवन सामाजिक सुरक्षा कवच प्रदान करता है।'
        ],
        cons: [
          'प्रशासनिक सत्यापन के कारण पहली पेंशन राशि आने में ३० से ४५ वर्किंग डेज का समय लग सकता है।',
          'उमंग (Umang APP) और राष्ट्रीय पेंशन ऑनलाइन पोर्टल प्रायः तकनीकी तौर पर अस्थिर रहते हैं।',
          'यदि आवेदक के आधार और बैंक खाते में नाम की स्पेलिंग भिन्न है, तो भुगतान अटक जाता है।'
        ],
        nationalAspect: {
          title: 'केंद्रीय योजना: इंदिरा गांधी राष्ट्रीय दिव्यांगता पेंशन (IGNDPS)',
          description: 'यह योजना भारत सरकार के ग्रामीण विकास मंत्रालय द्वारा राष्ट्रीय सामाजिक सहायता कार्यक्रम (NSAP) के तहत प्रायोजित है। ८०% या उससे अधिक दिव्यांगता वाले १८-७९ आयु वर्ग के लोग पात्र हैं।',
          keyBenefits: [
            '₹३०० - ₹५०० प्रति माह का बुनियादी योगदान (केंद्रीय + राज्य)',
            'डीबीटी प्रणाली द्वारा खातों में सीधे संवितरण'
          ]
        },
        stateAspect: {
          title: 'राज्य योजना: स्वामी विवेकानंद निशक्त पेंशन योजना (झारखंड सरकार)',
          description: 'झारखंड सरकार की अपनी प्रमुख पेंशन योजना। इसके नियम व पात्रता बहुत सरल हैं व इसके आवेदन सीधे स्थानीय स्तर पर स्वीकृत होते हैं।',
          keyBenefits: [
            '₹१,००० प्रति माह की निश्चित पेंशन - अत्यंत सुचारू वितरण',
            '४०% की दिव्यांगता पात्रता पर ही त्वरित लाभ'
          ]
        },
        process: {
          jamshedpur: {
            steps: [
              'ऑनलाइन पोर्टल उमंग पूरी तरह अस्थिर है - जमशेदपुर क्षेत्र में कृपया ऑनलाइन का उपयोग न करें।',
              'अपने नजदीकी ब्लॉक विकास अधिकारी (BDO) या अंचल अधिकारी कार्यालय, खास महल (जमशेदपुर) से संपर्क करें।',
              'कार्यालय काउंटर से "स्वामी विवेकानंद निशक्त पेंशन योजना" का ऑफलाइन आवेदन फॉर्म मांगें।',
              'फ़ॉर्म भरें और साथ में आधार, राज्य चिकित्सा बोर्ड का प्रमाणपत्र और बैंक पासबुक संलग्न करें।',
              'संयोजित फाइल को सीधे ब्लॉक कार्यालय के ' + 'समाज कल्याण अंचल अधिकारी के पास जमा कर दें।',
              'स्थानीय अधिकारियों द्वारा भौतिक सत्यापन के बाद ४-६ सप्ताह में आवेदन स्वीकृत हो जाता है।'
            ],
            additionalInfo: 'सहयोग डेस्क: जमशेदपुर ब्लॉक कार्यालय, खास महल अंचल। रेड वेव सहायता डेस्क आपके दस्तावेजों की निःशुल्क जांच और फ़ाइल तैयार करने में मदद करती है।'
          },
          ranchi: {
            steps: [
              'रांची मुख्यालय में राज्य पेंशन के लिए आवेदन प्रज्ञा केंद्रों या सीधे ब्लॉक कार्यालय में ऑफलाइन माध्यम से जमा किए जा सकते हैं।',
              'दस्तावेजों और रंगीन तस्वीरों के साथ बरियातू या स्थानीय रांची ब्लॉक विकास कार्यालय (BDO) का रुख करें।',
              'यह सुनिश्चित करें कि आपके पास झारखंड अंचल द्वारा जारी निवास प्रमाण पत्र अनिवार्य तौर पर उपलब्ध हो।',
              'सत्यापन खंडीय समाज कल्याण अधिकारी के अनुमोदन के बाद पूरा किया जाता है।',
              'सफल अनुमोदन के पश्चात पैसे सीधे आपके दिए गए आधार-जुड़े खाते में जमा किए जाने लगेंगे।'
            ],
            additionalInfo: 'कार्यालय संपर्क: सदर अस्पताल रांची के ठीक पीछे स्थित जिला समाज कल्याण विभाग (DSWO)। आप दीपशिकहा एनजीओ टीम से भी निशुल्क मार्ग-संरेखण हेतु संपर्क कर सकते हैं।'
          }
        }
      },
      {
        id: 'aadhar-card',
        title: 'नया आधार कार्ड एवं बायोमेट्रिक अपडेट (Aadhaar Update)',
        overview: 'यूआईडीएआई (UIDAI) द्वारा जारी १२-अंकों का विशिष्ट पहचान पत्र। यह झारखंड में पेंशन, राशन, बैंक मैपिंग और यूडीआईडी आवेदन प्राप्त करने का अनिवार्य सर्वप्रथम दस्तावेज है।',
        eligibility: 'सभी आयु वर्ग के दिव्यांग नागरिक तथा उनके अभिभावक।',
        documents: [
          'जन्म प्रमाणपत्र या आयु का कोई अन्य प्रमाण',
          'स्थानीय पते का प्रमाण (बिजली बिल, वोटर आईडी, या ग्राम प्रधान का प्रमाणित पत्र)',
          'दिव्यांगता चिकित्सा प्रमाण पत्र (प्राथमिकता कतार का लाभ लेने हेतु)'
        ],
        pros: [
          'सभी प्रकार की सरकारी सब्सिडी, रियायतों और पेंशन पैकेजों को एक्टिव करने वाला मुख्य डिजिटल कार्ड।',
          'रांची और जमशेदपुर के केंद्रीय बैंकों व मुख्य डाकघरों में दिव्यांगजनों के लिए प्राथमिकता काउंटर उपलब्ध हैं।',
          'बायोमेट्रिक (उंगलियों और आँखों की पुतली) मिलान द्वारा सुरक्षित सत्यापन प्रणाली।'
        ],
        cons: [
          'बायोमेट्रिक्स के लिए आवेदक का स्वयं केंद्र जाना जरूरी है, जो गंभीर शारीरिक विकृति वाले मरीजों हेतु कठिन है।',
          'नाम की स्पेलिंग में अंतर होने पर पेंशन या अन्य प्रमाण पत्रों के निरस्त होने का डर रहता है।',
          'वृद्ध नागरिकों तथा बच्चों की उंगलियों के निशान स्कैन करने में कभी-कभी कठिनाई आती है।'
        ],
        process: {
          jamshedpur: {
            steps: [
              'UIDAI की आधिकारिक वेबसाइट (uidai.gov.in) पर जाकर अपने नजदीकी डाकघर या बैंक केंद्र हेतु अप्वाइंटमेंट बुक करें।',
              'बिष्टुपुर या साकची, जमशेदपुर में अपनी सुविधानुसार समय का स्लॉट चुनें।',
              'अनावश्यक कतारों से बचने के लिए चुने हुए समय पर केंद्र पर पहुंचें।',
              'दस्तावेजों का सत्यापन करवाएं और फिंगरप्रिंट तथा आंख की पुतली का डिजिटल स्कैन पूरा करवाएं।',
              'प्रमाण रसीद प्राप्त करें। १०-१५ दिनों के भीतर रसीद संख्या से ई-आधार डाउनलोड किया जा सकता है।'
            ],
            additionalInfo: 'जमशेदपुर मुख्य डाकघर (बिष्टुपुर) एवं बैंक ऑफ बड़ौदा बिष्टुपुर शाखा में सुगम व्हीलचेयर रैंडम प्रवेश काउंटर सक्रिय हैं।'
          },
          ranchi: {
            steps: [
              'भीड़भाड़ से बचने के लिए पहले ही ऑनलाइन अपॉइंटमेंट स्लॉट बुक करना सुनिश्चित करें।',
              'प्रगति हाइट्स (रातु रोड रांची) या अपने निकटतम राष्ट्रीयकृत बैंक की मुख्य शाखा के आधार सेवा केंद्र पर जाएं।',
              'अपने पुराने कागजों और नए आधार पते की जानकारियों का सही मिलान सुनिश्चित करें।',
              'स्थानीय बायोमेट्रिक अपडेट को सीधे पेंशन विभाग की फाइलों में दर्ज करवाएं।'
            ],
            additionalInfo: 'समस्या निवारण: रांची प्रज्ञा केंद्र भी आधार आवेदन दर्ज करते हैं, परंतु प्रगति हाइट्स का यूआईडीएआई सेवा केंद्र बहुत तेज और पूर्णतः सुगम है।'
          }
        }
      },
      {
        id: 'assisted-devices',
        title: 'निःशुल्क व्यावसायिक सहायक उपकरण (ADIP Scheme)',
        overview: 'दिव्यांग भाई-बहनों को दैनिक जीवन में आत्मनिर्भर बनाने के लिए मुफ्त आधुनिक व्हीलचेयर, बैसाखी, मोटराइज्ड ट्राइसाइकिल और स्मार्ट श्रवण/नेत्र उपकरणों का निःशुल्क वितरण।',
        eligibility: '४०% न्यूनतम दिव्यांगता प्रमाण पत्र। पारिवारिक आय ₹१५,०००/माह से कम होने पर १००% मुफ्त, और ₹१५,००० से ₹३०,००० के बीच होने पर ५०% सब्सिडी।',
        documents: [
          'मुख्य चिकित्सा अधिकारी (CMO) द्वारा जारी दिव्यांगता प्रमाण पत्र',
          'राजस्व अधिकारी या अंचल अधिकारी द्वारा विधिवत हस्ताक्षरित आय प्रमाण पत्र',
          'आधार कार्ड की प्रति एवं निवास प्रमाण पत्र',
          'आवेदक की शारीरिक स्थिति दर्शाती रंगीन तस्वीर'
        ],
        pros: [
          'एलिम्को जैसी प्रतिष्ठित सरकारी कंपनियों के आधुनिक उपकरण पूरी तरह से मुफ्त मिलते हैं।',
          'शिविरों में विशेषज्ञ डॉक्टरों एवं इंजीनियरों द्वारा आपके शारीरिक माप के अनुसार व्हीलचेयर को सेट किया जाता है।',
          'चलने-फिरने और सुनने के संकट को तुरंत दूर कर आत्मनिर्भर बनाता है।'
        ],
        cons: [
          'इसके लिए आय प्रमाण पत्र बनवाना एक अतिरिक्त और थकाऊ कागजी कार्रवाई बन जाती है।',
          'वितरण शिविर वर्ष में केवल सीमित बार ही आयोजित किए जाते हैं, जिससे २ से ४ महीने का इंतजार हो सकता है।',
          'मोटराइज्ड गाड़ियों के खराब होने पर उनके बैटरी और आधुनिक पुर्जे स्थानीय बाजारों में मिलना बहुत मुश्किल होता है।'
        ],
        nationalAspect: {
          title: 'राष्ट्रीय अभियान: दिव्यांग व्यक्तियों के लिए सहायक उपकरण योजना (ADIP)',
          description: 'भारत सरकार के सामाजिक न्याय मंत्रालय द्वारा क्रियान्वित। एलिम्को (ALIMCO) कानपुर के सहयोग से सभी जिलों में उच्च गुणवत्ता वाले आधुनिक सहायक उपकरण बांटे जाते हैं।',
          keyBenefits: [
            'स्मार्ट ट्राइसाइकिल, डिजिटल सुनने की मशीन और फोल्डिंग छड़ी मुफ्त',
            'दृष्टिबाधित छात्रों के लिए विशेष सॉफ्टवेयर और ब्रेल पाठन टूल्स'
          ]
        },
        stateAspect: {
          title: 'झारखंड राज्य समाज कल्याण सहायता केंद्र',
          description: 'जिला समाज कल्याण अधिकारी (DSWO) समय-समय पर जिला मुख्यालयों में विशेष एडिप शिविर आयोजित करते हैं।',
          keyBenefits: [
            'कैलीपर्स एवं कृत्रिम अंगों का व्यक्तिगत फिटिंग शिविर',
            'स्थानीय मरम्मत और सर्विस गाइड सपोर्ट'
          ]
        },
        process: {
          jamshedpur: {
            steps: [
              'पूर्वी सिंहभूम अंचल के जिला समाज कल्याण विभाग (DSWO) में अपना लिखित पंजीकरण दर्ज करें।',
              'अपना नवीनतम आय प्रमाणपत्र (₹१५,००० मासिक आय से कम का) अवश्य पास में रखें।',
              'अपनी सटीक जरूरत (जैसे- मैन्युअल व्हीलचेयर या कान की मशीन) आवेदन पत्र में स्पष्ट रूप से उल्लेख करें।',
              'रजिस्ट्रेशन कराने के बाद जिला कार्यालय द्वारा टाटा स्टील सबल केंद्र के सहयोग से आयोजित होने वाले शिविर का शेड्यूल ट्रैक करें।',
              'शिविर के दिन केंद्र पर उपस्थित होकर उपकरण प्राप्त करें और ट्रायल पूरा करें।'
            ],
            additionalInfo: 'जानकारी: खास महल एमजीएम अस्पताल मैदान अथवा सबल केंद्र बिष्टुपुर में सामूहिक वितरण शिविरों का आयोजन त्रैमासिक आधार पर किया जाता है।'
          },
          ranchi: {
            steps: [
              'रांची सदर अस्पताल समाज कल्याण विभाग या दीपशिकहा एनजीओ टीम से संपर्क कर असेसमेंट स्लिप प्राप्त करें।',
              'स्थानीय अंचल अधिकारी (CO) से आय प्रमाण पत्र स्वीकृत करवा कर जमा करें।',
              'रांची कल्याण विभाग वर्ष में कम से कम दो बार बड़े पैमाने पर उपकरण मेलों का आयोजन करता है।',
              'योग्य पाए जाने पर अपनी फिटिंग करवा कर डिजिटल हियरिंग किट अथवा ट्राइसाइकिल ऑन-द-स्पॉट प्राप्त करें।'
            ],
            additionalInfo: 'बच्चों के लिए विशेष पहल: दीपशिकहा विशेष बच्चों के लिए पैरों के अनुकूल कैलीपर्स और कस्टम व्हीलचेयर फिटिंग शिविर आयोजित करता है। संपर्क अधिकारी: प्रमोद कुमार।'
          }
        }
      },
      {
        id: 'caste-certificate',
        title: 'जाति प्रमाण पत्र (Caste Certificate on JharSewa)',
        overview: 'आरक्षित श्रेणियों के योग्य दिव्यांगजनों के लिए झारखंड अंचल से जाति प्रमाणित करने वाला मुख्य सरकारी दस्तावेज। इसके जरिए आप विशेष छात्रवृत्तियां और दोहरे रक्षण कोटा लाभ प्राप्त कर सकते हैं।',
        eligibility: 'झारखंड के मूल निवासी जो अनुसूचित जाति / जनजाति या पिछड़ा वर्ग के अंतर्गत आते हैं।',
        documents: [
          '१९३२ का खतियान (पैतृक भूमि अभिलेख)',
          'आधार कार्ड तथा स्कूल स्थानांतरण (Transfer) प्रमाण पत्र',
          'पिता व अन्य सगे पुरुष रिश्तेदारों के नाम जारी पहले का जाति दस्तावेज',
          'गैर-क्रीमी लेयर के लिए स्व-घोषणा पत्र (OBC हेतु)'
        ],
        pros: [
          'यह दिव्यांग कोटे के साथ-साथ श्रेणी आरक्षण मिलाकर दोहरे शैक्षिक व रोजगार कोटे का लाभ दिलाता है।',
          'झारसेवा मुख्य डिजिटल पोर्टल पर एक बार पंजीकृत होने के बाद यह आजीवन वैध रहता है।',
          'प्रमुख केंद्रीय एवं बीएचयू, जेएनयू जैसी प्रतिष्ठित यूनिवर्सिटी भुगतानों और स्कॉलरशिप के लिए अनिवार्य है।'
        ],
        cons: [
          'इसके लिए पैतृक खतियान (१९३२ का जमीन दस्तावेज) प्रस्तुत करना अनिवार्य है, जो भूमिहीन परिवारों हेतु अत्यधिक जटिल है।',
          'झारसेवा (JharSewa) की वेबसाइट नेत्रहीनों या कंप्यूटर के अकुशल लोगों के लिए बहुत अनुकूल नहीं है।',
          'अंचल के हल्का कर्मचारी, अंचल निरीक्षक और अंचल अधिकारी से गुजरने के चलते समय अधिक लगता है।'
        ],
        process: {
          jamshedpur: {
            steps: [
              'झारसेवा की वेबसाइट (jharsewa.jharkhand.gov.in) खोलकर अपनी यूजर आईडी बनाएं।',
              'जाति प्रमाण पत्र (Caste Certificate) सेवा का चुनाव करें और ऑनलाइन आवेदन फॉर्म खोलें।',
              'अपने आधार, परिवार के भूमि दस्तावेज (खतियान) और स्थानीय पते की साफ स्कैन कॉपियां अपलोड करें।',
              'सफलतापूर्वक ऑनलाइन सबमिशन के बाद मिलने वाले एप्लीकेशन नंबर या पावती रसीद को संभाल कर रखें।',
              'जमशेदपुर के अंचल कार्यालय के हल्का कर्मचारी आपकी फाइलों का भौतिक सत्यापन पूरा करेंगे।',
              'सत्यापन सफल होने के बाद, आप पोर्टल से सीधे डिजिटल हस्ताक्षरित प्रमाण पत्र डाउनलोड कर सकते हैं।'
            ],
            additionalInfo: 'वैकल्पिक सुगम मार्ग: यदि आप स्वयं ऑनलाइन नहीं कर सकते, तो जमशेदपुर के किसी भी करीबी प्रज्ञा केंद्र (जैसे बिष्टुपुर प्रज्ञा केंद्र) पर जाकर मामूली सरकारी शुल्क देकर ऑपरेटर से आवेदन करवा सकते हैं।'
          },
          ranchi: {
            steps: [
              'झारखंड झारसेवा आधिकारिक राज्य पोर्टल पर लॉगिन करें।',
              'ओबीसी वर्ग आवेदन के समय अपने माता-पिता के नवीनतम आय विवरण तथा स्व-घोषणा फॉर्म अवश्य अपलोड करें।',
              'रांची अंचल राजस्व विभाग आपके खतियानी अभिलेखों का सत्यापन सरकारी डेटाबेस से करेगा।',
              'आवेदन स्वीकृत होने पर सीधे आपके मोबाइल फोन पर एसएमएस (SMS) द्वारा जानकारी दी जाएगी।'
            ],
            additionalInfo: 'सहयोग बिंदु: रांची उपयुक्त कमिश्नर कार्यालय भवन के पास स्थित प्रज्ञा केंद्र पुराने दस्तावेजों के डिजिटलीकरण में दिव्यांग सहायता प्रदान करते हैं।'
          }
        }
      },
      {
        id: 'disability-udid-abha',
        title: 'दिव्यांगता यूडीआईडी और आभा पहचान पत्र (Universal ID Card)',
        overview: 'यूडीआईडी (UDID) पूरे भारत में मान्य दिव्यांगजनों का एकमात्र पहचान पत्र है। इसे आयुष्मान स्वास्थ्य आभा (ABHA) कार्ड से जोड़ने पर आपका संपूर्ण मेडिकल इतिहास डिजिटल रूप से सुरक्षित हो जाता है।',
        eligibility: '४०% या उससे अधिक स्थायी या अस्थायी दिव्यांगता वाले सभी भारतीय नागरिक।',
        documents: [
          'आधार कार्ड (अनिवार्य)',
          'आवेदक की पासपोर्ट साइज की साफ फोटो (बैकग्राउंड प्लेन हो)',
          'सरकारी सदर अस्पताल अथवा विशेषज्ञ डॉक्टरों की जाँच पर्ची या रिपोर्ट',
          'आयु प्रमाण पत्र अथवा जन्म प्रमाणपत्र'
        ],
        pros: [
          'बार-बार अनेक पुराने कागजी डॉक्टर प्रमाण पत्र साथ रखने के झंझट से मुक्ति।',
          'रेल टिकटों पर मिलने वाली ७५% तक की किराए की छूट इसी कार्ड की संख्या से ऑनलाइन बुक होती है।',
          'आयुष्मान स्वास्थ्य कार्ड (ABHA) से लिंक होने पर देश भर के अस्पतालों में निःशुल्क इलाज और इतिहास सुरक्षित रहता है।'
        ],
        cons: [
          'चिकित्सा बोर्ड (सदर अस्पताल) के सामने उपस्थित होना थकाऊ हो सकता है, जहां लंबी कतारें लगती हैं।',
          'आवेदन स्वीकृत होने के बावजूद डाक द्वारा प्लास्टिक यूडीआईडी कार्ड घर आने में ४५ से ६० दिन लग जाते हैं।',
          'अस्थायी श्रेणी के प्रमाण पत्रों के लिए प्रत्येक कुछ वर्षों में पुनः मूल्यांकन करवाना पड़ता है।'
        ],
        process: {
          jamshedpur: {
            steps: [
              'स्वावलंबन पोर्टल (swavlambancard.gov.in) खोलें और "Apply for Disability Card" चुनें।',
              'नाम, पता, आधार नंबर और अस्पताल की पुरानी जांच रिपोर्ट डिजिटल रूप से दर्ज करें।',
              'अपने परीक्षण मूल्यांकन केंद्र के रूप में पूर्वी सिंहभूम (जमशेदपुर सदर) का चयन करें।',
              'ऑनलाइन फॉर्म सबमिट करने के बाद प्राप्त रसीद का प्रिंट अवश्य ले लें।',
              'जमशेदपुर के खास महल सदर अस्पताल में निर्धारित चिकित्सा बोर्ड के दिन (प्रायः मंगलवार एवं गुरुवार) परीक्षण हेतु पहुंचें।',
              'डॉक्टरों की जांच के बाद कार्ड को स्वीकृति मिलेगी और डाक द्वारा कुछ हफ़्तों में कार्ड आपके घर भेज दिया जाएगा।',
              'उसी पोर्टल पर जाकर अपने नए कार्ड संख्या की मदद से आभा (ABHA) आईडी लिंक करें।'
            ],
            additionalInfo: 'नोट: पूर्वी सिंहभूम चिकित्सा बोर्ड एमजीएम / खास महल सदर अस्पताल में सप्ताह में दो बार बैठता है। सबल केंद्र की टीम गंभीर रूप से अक्षम लोगों को बोर्ड परीक्षा स्थल तक सुगम एस्कॉर्ट सेवाएं प्रदान करती है।'
          },
          ranchi: {
            steps: [
              'स्वावलंबन कार्ड की वेबसाइट पर जाकर नया आवेदन भरें।',
              'अपने मेडिकल मूल्यांकन हब के रूप में रांची सदर जिला अस्पताल को चुनें।',
              'रांची सदर अस्पताल में जाकर मेडिकल जांच बोर्ड के समक्ष उपस्थित होकर जांच की प्रकिया पूर्ण कराएं।',
              'रांची के सिविल सर्जन बोर्ड द्वारा डिजिटली हस्ताक्षर करने के बाद प्रमाण पत्र लाइव हो जाता है।',
              'सरकारी कल्याण सुविधाओं के लिए आभा स्वास्थ्य कार्ड मैपिंग को अवश्य पूर्ण करें।'
            ],
            additionalInfo: 'मददगार टिप: रांची दीपशिकहा एनजीओ की टीम अस्पताल में विनम्र मूल्यांकन सुनिश्चित करने के लिए विशेष हेल्प डेस्क चलाती है।'
          }
        }
      },
      {
        id: 'voter-id',
        title: 'मतदाता सूची में दिव्यांगता मार्किंग (Saksham Voter ID)',
        overview: 'दिव्यांगों के लिए मतदाता पहचान पत्र सुधार। सक्षम मोबाइल ऐप से रिकॉर्ड लिंक कराने पर मतदान के दिन मुफ्त सवारी, कतारों से छूट और अनुकूल सहायता उपलब्ध कराई जाती है।',
        eligibility: '१८ वर्ष या उससे अधिक आयु के सभी भारतीय नागरिक जो मतदान हेतु पंजीकृत हैं या नया आवेदन करना चाहते हैं।',
        documents: [
          'आधार कार्ड (अनिवार्य पते और उम्र की जांच हेतु)',
          'दिव्यांगता यूडीआईडी कार्ड या राज्य का चिकित्सा प्रमाणपत्र',
          'पासपोर्ट साइज की रंगीन तस्वीर'
        ],
        pros: [
          'मतदान के दिन घर से वोटिंग बूथ तक जाने के लिए निर्वाचन आयोग की विशेष मुफ्त वाहन सेवा मिलती है।',
          'धूप या लंबी कतारों में खड़ा नहीं होना पड़ता; सीधे मतदान कक्ष में प्राथमिकता प्रवेश मिलता है।',
          'दृष्टिबाधित भाई-बहनों के लिए ब्रेल वर्णमाला वाली मशीनें और विशेष सहायक की अनुमति दी जाती है।'
        ],
        cons: [
          'यदि आपने सक्षम ऐप पर अपने नाम के आगे "दिव्यांगता चिह्नित (PwD Flagging)" नहीं करवाया है, तो आपको यह लाभ नहीं मिल सकेगा।',
          'घर-घर सत्यापन करने वाले बूथ स्तर के अधिकारी (BLO) की व्यस्तता के कारण कभी-कभी कार्ड बनने में देरी हो जाती है।',
          'घर के मुख्य रिकॉर्ड और आधार में पते की भिन्नता होने पर फॉर्म रिजेक्ट हो जाता है।'
        ],
        process: {
          jamshedpur: {
            steps: [
              'गूगल प्ले स्टोर से भारत निर्वाचन आयोग का सुगम "सक्षम ऐप" (Saksham App) डाउनलोड करें।',
              'अपना मतदाता संख्या दर्ज करें या "नया पंजीकरण - फॉर्म ६" का चयन करें।',
              'आवेदन फॉर्म में "Person with Disability" के विकल्प पर टिक करें - यह कतार लाभ लेने हेतु अत्यंत आवश्यक है।',
              'अपना आधार और यूडीआईडी/दिव्यांगता प्रमाण पत्र ऐप पर साफ-साफ अपलोड करें।',
              'जमशेदपुर ब्लॉक के बूथ स्तर के अधिकारी (BLO) आपके घर आकर दस्तावेजों का भौतिक मिलान करेंगे।',
              'सत्यापन पूर्ण होने के बाद आपका मतदाता परिचय पत्र अपडेट हो जाएगा और घर तक डिलीवर किया जाएगा।'
            ],
            additionalInfo: 'कल्याण डेस्क: पूर्वी सिंहभूम जिला निर्वाचन अधिकारी जमशेदपुर के मतदान केंद्रों पर पूरी तरह सुगम रैंप तथा व्हीलचेयर रोटेशन सुनिश्चित करते हैं।'
          },
          ranchi: {
            steps: [
              'आधिकारिक "सक्षम" स्मार्टफोन एप्लीकेशन इंस्टॉल करें जो विशेष रूप से दिव्यांग वोटरों हेतु सुगम है।',
              'ऐप पर चुनाव के दिन मिलने वाले सहयोगी टूल्स (जैसे व्हीलचेयर, सहायक, या ब्रेल मशीन) की मांग अभी से दर्ज करें।',
              'रांची निर्वाचन विभाग की बीएलओ टीम आपके पते का सत्यापन ऑनलाइन डेटा की मदद से पूर्ण करेगी।',
              'समस्त सुविधाओं को चालू करने के लिए चुनावी सूची में अपना सुगम मार्ग दर्ज करवाएं।'
            ],
            additionalInfo: 'रांची वार्ड निर्वाचन आयुक्त प्रज्ञा केंद्रों के जरिए भी सक्षम ऐप की दिव्यांग मार्किंग को निःशुल्क अपडेट करने की सेवा प्रदान करते हैं।'
          }
        }
      }
    ];
  }

  // English fallback schemes (Original robust detailed schemes)
  return [
    {
      id: 'disability-pension',
      title: 'Disability Pension Schemes',
      overview: 'Financial assistance programs designed to provide basic security. Features both Central (IGNDPS) and State level programs (Swami Vivekananda Nishakt Pension Scheme in Jharkhand).',
      eligibility: 'Jharkhand residence, minimum 40% disability certified by medical authorities. Age depends on scheme (IGNDPS: 18-79 years, State Pension: No formal range).',
      documents: [
        'Aadhaar Card (Mandatory)',
        'State Government Disability Certificate & Card',
        'Bank Passbook copy (linked to Aadhaar)',
        'Income Certificate / BPL categorization proof (optional for some, mandatory for Central)',
        'Recent Passport-sized photographs'
      ],
      pros: [
        'Reliable financial independence (State program offers a fixed ₹1,005/month payout).',
        'Direct Benefit Transfer (DBT) means funds are wired directly into post office or bank accounts securely.',
        'Lifetime coverage once approved, providing long-term structural social security.'
      ],
      cons: [
        'Long-drawn bureaucratic approval cycle, typically taking 30–45+ working days.',
        'Central digital portals like Umang are often unstable or offline, forcing reliance on local physical block offices.',
        'Strict regional domicile audits make it difficult for migrant or unregistered families to qualify.'
      ],
      nationalAspect: {
        title: 'Central: Indira Gandhi National Disability Pension Scheme (IGNDPS)',
        description: 'Nation-wide pension program managed under the National Social Assistance Program (NSAP). Process was designed for online apps but online registration systems via Umang are currently unstable/offline.',
        keyBenefits: [
          '₹300 - ₹500/month basic pension (Central share + State supplement)',
          'Direct cash transfer to Post Office or Bank accounts'
        ]
      },
      stateAspect: {
        title: 'State: Swami Vivekananda Nishakt Pension Scheme',
        description: 'State government initiative created by Jharkhand Govt. Provides much better coverage and reliable physical submission setups.',
        keyBenefits: [
          '₹1,000/month fixed pension - highly reliable payout',
          'Broader eligibility guidelines within Jharkhand'
        ]
      },
      process: {
        jamshedpur: {
          steps: [
            'Online verification via Umang is currently unstable - do not use for Jamshedpur',
            'Obtain physical application form from Assistant Director Social Security / Block Office',
            'Fill in personal and disability details under the Swami Vivekananda scheme',
            'Attach copy of Aadhaar Card, State Disability Card, and passive Bank Passbook copy',
            'Submit the dossier directly to the Block office (CO/SDO Office) in Jamshedpur',
            'Verification is handled local level, typically takes 30-45 Days'
          ],
          additionalInfo: 'Office liaison points: Jamshedpur Block Office, Khas Mahal. Assisted Desk help is available through Red Wave.'
        },
        ranchi: {
          steps: [
            'State Pension applications can be filed physically at block level in Ranchi',
            'Take passport photos, bank passbook, and proof of 40%+ disability to the local Ranchi Block Development Office (BDO)',
            'Provide Jharkhand residential certificate to show proof of local domicile',
            'CO/SDO evaluates and verifies credentials physically',
            'Funds are routed directly into the linked bank account upon verification'
          ],
          additionalInfo: 'Anchor link: Ranchi Block Office or DSWO department behind Sadar Hospital Ranchi. Contact Pramod Kumar at Deepshikha for assisted community camps.'
        }
      }
    },
    {
      id: 'aadhar-card',
      title: 'Aadhaar Card Enrollment & Updates',
      overview: 'Unique 12-digit identity card issued by UIDAI. It is the primary prerequisite document for any pension, bank account mapping, or UDID card registration in Jharkhand.',
      eligibility: 'All Indian citizens, regardless of age or disability degree.',
      documents: [
        'Birth Certificate or alternative age proof',
        'Proof of Residence (Electricity bill, local declaration, parent ID)',
        'Disability certificate or guardian affidavit if applying with helpers'
      ],
      pros: [
        'The foundational core document required to unlock all other Central & State government aid.',
        'Dedicated high-speed priority counters are available at major banks and main Post Offices in Jamshedpur & Ranchi.',
        'Allows fully secure biometrics (iris/face) mapping to prevent identification spoofing.'
      ],
      cons: [
        'Physical travel is mandatory for biometric capture, which can be highly challenging for individuals with severe locomotor disabilities.',
        'Spelling or mobile matching mismatches between old certificates and Aadhaar are a common cause of downstream scheme rejections.',
        'Elderly citizens often suffer from biometric failure rates due to fading finger ridges or cataract conditions during scans.'
      ],
      process: {
        jamshedpur: {
          steps: [
            'Visit the official UIDAI booking portal (uidai.gov.in) to book an appointment',
            'Select the nearest Aadhaar Seva Kendra or bank branch in Bistupur or Sakshi, Jamshedpur',
            'Assemble physical proof documents to prevent matching blockades',
            'Visit the enrollment branch with your family helper at your booked hour',
            'Biometric scanning is run. PwD priority access desks are available for severe cases',
            'Get tracking slip and download e-Aadhaar in 10-15 days'
          ],
          additionalInfo: 'Central banks (Bistupur branches) and Jamshedpur Main Post Office offer dedicated high-speed slots booking.'
        },
        ranchi: {
          steps: [
            'Book an online appointment prior to visit to prevent tedious standing queues',
            'Head to UIDAI Seva Kendra at Pragati Heights, Ratu Road, or nearby public banks',
            'Ensure names match exactly between disability certificates and old school indices',
            'Secure print trackers on-site for immediate pension mapping use'
          ],
          additionalInfo: 'Pragya Kendras across Ranchi also handle offline updates, but verified UIDAI Seva Kendras are much faster and fully accessible.'
        }
      }
    },
    {
      id: 'assisted-devices',
      title: 'Assisted Devices Scheme (ADIP)',
      overview: 'Free distribution of physical appliances, modern tools, and mobility devices to help bring self-reliance to people with disabilities.',
      eligibility: 'Income ceiling criteria applies. Maximum ₹15,000/month family wage for 100% free devices; ₹15,000 to ₹30,000/month for 50% device subsidy. Min 40% disability necessary.',
      documents: [
        'Disability Certificate from Chief Medical Officer (CMO)',
        'Income Certificate certified by Revenue Authority / Block Officer',
        'Aadhaar Card copy',
        'Passport-sized photo showing the physical condition of the applicant'
      ],
      pros: [
        '100% free high-grade items (wheelchairs, motorized tricycles, calipers, braille kits) for families earning under ₹15,000/month.',
        'Saves families significant medical capital expenditures by providing durable, certified equipment.',
        'On-site fit and custom calibration support are provided at regional camps to ensure comfort.'
      ],
      cons: [
        'Requires obtaining an extra income certificate from a Circle Officer, adding a tedious bureaucratic barrier.',
        'Distribution camps are held infrequently (usually once in 3 to 6 months), causing significant waiting intervals.',
        'Repairs, maintenance, and replacement battery services for motorized units are hard to find in local Jharkhand mechanics.'
      ],
      nationalAspect: {
        title: 'National: Scheme of Assistance to Disabled Persons (ADIP)',
        description: 'Managed by ALIMCO (Artificial Limbs Manufacturing Corporation) and social justice departments. Fully subsidizes standard or specialized mobility tools.',
        keyBenefits: [
          'Free high-grade Wheelchairs, battery Tricycles, and crutches',
          'Special digital hearing aids and software accessories for visually impaired'
        ]
      },
      stateAspect: {
        title: 'Jharkhand State Social Welfare Support',
        description: 'Coordinates holding local camp counters with ALIMCO. Subsidies are routed through District Social Welfare Officers.',
        keyBenefits: [
          'Assurance of local repair blocks for tricycles',
          'State-pooled funds for localized custom-fit calipers'
        ]
      },
      process: {
        jamshedpur: {
          steps: [
            'Register request physical form with local DSWO in East Singhbhum',
            'Upload income certification showing family monthly intake below ₹15,000',
            'Submit target requirements: specify exact assist item (e.g., lightweight folding chair, crutch)',
            'Red Wave tracks the East Singhbhum municipal camp schedule co-sponsored by Tata Steel Sabal',
            'Attend physical distribution camp to test custom calibration on site'
          ],
          additionalInfo: 'Camps are normally hosted quarterly at Sabal Center or MGM Hospital grounds.'
        },
        ranchi: {
          steps: [
            'Collect assessment slip from Sadar Hospital Ranchi, or Deepshikha NGO team',
            'Secure block-level income voucher certified by local CO',
            'Ranchi Social Welfare Office processes mass camp deliveries twice a year',
            'Retrieve high-grade prosthetic joints or digital braille kits under direct supervision'
          ],
          additionalInfo: 'Deepshikha facilitates targeted device measurement campaigns for children. Connect with Pramod Kumar.'
        }
      }
    },
    {
      id: 'caste-certificate',
      title: 'Caste Certificate for PwDs in Jharkhand',
      overview: 'Document certifying local caste status. Required to unlock specialized scholarships, reservation quotas, and vocational schemes for backward categories.',
      eligibility: 'Member of SC / ST / OBC categories residing in Jharkhand under parent lineage parameters.',
      documents: [
        'Lineage record / Khatiyan proving ancestral land holding in Jharkhand',
        'Aadhaar Card and school certificate copy',
        'Self-declaration affidavit of non-creamy layer (for OBC)',
        'Father/lineage male relative caste certificate copy'
      ],
      pros: [
        'Unlocks critical academic reservation seats, customized PwD scholarships, and specialized employment channels.',
        'Direct user-submission on JharSewa makes it a permanent digital credential.',
        'Valid for life once issued, with no requirement for recurring monthly/yearly renewals.'
      ],
      cons: [
        'Absolutely requires ancestral land records (Khatiyan), which is extremely tough for landless or urban migrant families to source.',
        'Requires navigating a complex multi-stage digital platform (JharSewa) that lacks accessibility adjustments.',
        'Often delayed by three structural administrative handoffs (from Halka Karmachari to CI and SDO).'
      ],
      process: {
        jamshedpur: {
          steps: [
            'Open JharSewa portal (jharsewa.jharkhand.gov.in) to create user profile',
            'Fill out online form under Service: Caste Certificate of Jharkhand',
            'Attach digitized copies of Aadhaar, ancestral Khatiyan land records, and local address proof',
            'Submit online. Keep track of the application ID generated',
            'Application passes to Halka Karmachari and Circle Officer (CO) in Jamshedpur',
            'Upon successful physical record verification, download digitally signed certificate from the portal'
          ],
          additionalInfo: 'For physical fallback, visit the nearest Pragya Kendra in Jamshedpur (e.g. Sakchi center) where operators submit for you at a marginal fee.'
        },
        ranchi: {
          steps: [
            'Register on JharSewa state network',
            'Upload necessary non-creamy layer declarations if applying under OBC category',
            'CO and SDO block desks verify records against regional Ranchi land ledgers',
            'SMS trackers provide progressive step updates directly to the registered phone'
          ],
          additionalInfo: 'Pragya Kendra desks near Ranchi Commissionerate assist with old land script digitization.'
        }
      }
    },
    {
      id: 'disability-udid-abha',
      title: 'Disability Certificate & UDID-ABHA Linkage',
      overview: 'The UDID (Unique Disability ID) card is a single national master document for PwDs in India. Linking it with the ABHA (Ayushman Bharat Health Account) maps your medical record and grants health benefits.',
      eligibility: 'Indian residents of any age with documented disability of 40% or more.',
      documents: [
        'Aadhaar Card (Mandatory)',
        'Passport-sized photo with plain white background',
        'Hospital reports indicating diagnosis details',
        'Birth Certificate copy'
      ],
      pros: [
        'Consolidates all disability data into a single physical card, eliminating the need to carry multiple certificates.',
        'Enables high tariff medical tracking and direct cashless benefit sync when mapped to your ABHA profile.',
        'Universally valid across India for railway concession bookings, toll waivers, and bus transit.'
      ],
      cons: [
        'Compulsory physical evaluation by the formal Medical Board at Sadar Hospital (Khas Mahal or Ranchi) often entails painful, exhausting queues.',
        'Highly delayed dispatch cycles; physical cards often take 30 to 60 days to arrive via India Post.',
        'Temporary disability certificates require stressful, recurring assessments at the hospital every few years.'
      ],
      process: {
        jamshedpur: {
          steps: [
            'Navigate to Swavlamban Card portal (swavlambancard.gov.in) to fill registration form',
            'Enter personal, medical, and Aadhaar credential keys',
            'Assign East Singhbhum (Jamshedpur) as your testing assessment hub',
            'Dossier gets forwarded to the Chief Medical Officer (CMO), East Singhbhum at Khas Mahal',
            'Attend physical Medical Board assessment in Khas Mahal to evaluate degree of percentage',
            'Certificate is approved and UDID card is printed/shipped via post in 30-60 days',
            'Link ABHA ID on swavlambancard portal to sync Ayushman Bharat health ledger'
          ],
          additionalInfo: 'East Singhbhum Medical Board generally gathers twice a week. Red Wave has full facilitation desks for accompanying severe locomotor cases.'
        },
        ranchi: {
          steps: [
            'Submit digital application form on swavlambancard website',
            'Select Ranchi as local hospital medical assessment block',
            'Complete physical evaluation at Sadar Hospital Ranchi, under medical board supervision',
            'The Ranchi CMO department digitally signs and registers the 40%+ card',
            'Enable ABHA digital mapping to link medical cards with Ayushman care units'
          ],
          additionalInfo: 'Deepshikha handles protocol instructions and training for Ranchi medical evaluation squads, ensuring polite treatment.'
        }
      }
    },
    {
      id: 'voter-id',
      title: 'Voter ID Card for Persons with Disability',
      overview: 'Official Voter Identification. Registering with PwD identification tags unlocks free local shuttle systems, polling booth accessibility, and queue-cutting privileges on voting day.',
      eligibility: 'Indian citizen of age 18 years or above with the right of voting.',
      documents: [
        'Aadhaar Card (Mandatory)',
        'Disability Certificate from CMO proving percentage',
        'Age proof and residential proof',
        'Passport photo'
      ],
      pros: [
        'Unlocks free door-to-door shuttle transport, private assistance aides, and tactile voting on polling days.',
        'Easy PwD self-identification and reservation requests can be filed on mobile using the specialized Saksham App.',
        'Acts as a strong secondary proof of age and residential citizenship for PwD banking.'
      ],
      cons: [
        'Applicants *must* explicitly check the physical "PwD Flagging" field; failing to do so keeps polling day accessibility perks locked.',
        'Relies heavily on home verification visits by the local Booth Level Officer (BLO), which are frequently delayed or unscheduled.',
        'Spelling differences in address/voter lists can freeze the voter card issuance, requiring corrective Form 8 audits.'
      ],
      process: {
        jamshedpur: {
          steps: [
            'Download official "Saksham App" or go online to NVSP/ECIM portal',
            'Fill Form 6 to apply for new entry, or Form 8 for marking an existing voter as PwD',
            'Tick the "Person with Disability" field - THIS IS MANDATORY to unlock priority facilities',
            'Upload Aadhaar and CMO disability certificate copies',
            'Local Booth Level Officer (BLO) of Jamshedpur will visit your address to physically check',
            'Receive Voter card and get registered for free transport on polling day'
          ],
          additionalInfo: 'Jamshedpur municipal voting camps provide wheelchair ramp accessibility under District Election Officer (East Singhbhum).'
        },
        ranchi: {
          steps: [
            'Use Saksham app designed specifically by the Election Commission for disabled electors',
            'Specify required voting day assist tools (e.g., visual helper, companion, wheelchair)',
            'BLO Ranchi checks digital uploads against local database indicators',
            'Enables queue skipping and volunteer escort mappings at district booths'
          ],
          additionalInfo: 'Voters can map temporary location changes across Ranchi ward circles comfortably via Saksham.'
        }
      }
    }
  ];
};

// Localized upcoming roadmap services under the RPWD Act
const getLocalizedRoadmapServices = (language: 'en' | 'hi') => {
  if (language === 'hi') {
    return [
      {
        id: 'ai-accessibility',
        name: 'सेवा २ — एआई-संचालित सुगमता ऑडिट (निःशुल्क)',
        description: 'जमशेदपुर और रांची के स्थानीय दुकान मालिक अपनी दुकान के ५ फोटो (प्रवेश, रैंप, गलियारा, वॉशरुम, पार्किंग) खींचकर अपलोड करेंगे, जिसके बदले एआई उन्हें भारतीय मानकों (IS 9926) के आधार पर न्यूनतम खर्च पर सुधार करने की मार्गदर्शिका प्रदान करेगा।',
        whyItMatters: 'अधिकांश स्थानीय छोटे व्यवसाय दिव्यांगों की मदद करना चाहते हैं, परंतु उन्हें सुगम रैंप बनाने की सही निर्माण जानकारी अथवा खर्च की जानकारी नहीं होती।',
        howAddressesIt: 'कंप्यूटर विज़न तकनीक (जेमिनी मल्टी-मोडल एपीआई) की मदद से फ़ोटो का विश्लेषण कर व्यावहारिक, कम लागत वाली सुधार कार्य योजना तैयार करना।'
      },
      {
        id: 'certified-accessibility',
        name: 'सेवा ३ — प्रमाणित सुगमता ऑडिट (प्रीमियम — सीएसआर संचालित)',
        description: 'आरसीआई (RCI) पंजीकृत सुगमता विशेषज्ञों द्वारा प्रतिष्ठानों का भौतिक सुगम ऑडिट, सुरक्षा प्रमाणीकरण तथा वहां के स्टाफ के लिए संवेदीकरण प्रशिक्षण सुनिश्चित करना।',
        whyItMatters: 'कॉरपोरेट कंपनियां, मॉल तथा राष्ट्रीय स्तर के बैंक आधुनिक सीएसआर (CSR) निर्देशों के तहत अपने परिसरों को सुगम और सम्मानित समावेशी दर्जा प्रदान करना चाहते हैं।',
        howAddressesIt: 'टाटा स्टील सबल पहल (जमशेदपुर) और दीपशिखा एनजीओ (रांची) के सहयोग से आधिकारिक तौर पर दिव्यांग-अनुकूल परिसरों को सह-ब्रांडेड ब्रास पट्टिका जारी करना।'
      },
      {
        id: 'accessible-transport',
        name: 'सेवा ४ — सुगम सुलभ परिवहन (ई-रिक्शा और सिल्वर शटल)',
        description: 'पहियाकुर्सी (व्हीलचेयर) उपयोगकर्ताओं के लिए विशेष रूप से अपग्रेड की गई स्थानीय टोटो (ई-रिक्शा) सेवा तथा रांची-जमशेदपुर प्रमुख अस्पतालों हेतु विशेष रैंप युक्त सिल्वर शटल सेवा की व्यवस्था।',
        whyItMatters: 'झारखंड में उपलब्ध परंपरागत टैक्सियों या ऑटो में यात्रा करने हेतु दिव्यांग भाई-बहनों को पहियाकुर्सी से उतरकर अत्यंत कठिनाई से बैठना पड़ता है।',
        howAddressesIt: 'स्थानीय टोटो चालकों के साथ मिलकर रिक्शा में ही रोल-इन रैंप प्लेट फिट करना तथा विशेष टाटा विंगर सुलभ एम्बुलेंसों का एक समन्वित नेटवर्क चलाना।'
      },
      {
        id: 'vehicle-modification',
        name: 'सेवा ५ — निजी वाहनों में दिव्यांग-अनुकूल सुधार परामर्श',
        description: 'हाथों से नियंत्रित क्लच-ब्रेक, स्कूटरों में एक्स्ट्रा साइड-व्हील्स व्हील्स फिट करने एवं मोटर वाहन विभाग (RTO) से लाइसेंस संशोधन करवाने में कानूनी सहायता।',
        whyItMatters: 'झारखंड में सुयोग्य ऑटोमोबाइल मॉडिफायर उपलब्ध नहीं होने के कारण दिव्यांगों को गाड़ियों में सुधार करवाने मुंबई या बेंगलुरु जाना पड़ता था।',
        howAddressesIt: 'मुंबई की प्रमुख सेवा प्रदाता संस्था "ईजी मूवेबिलिटी" के स्थानीय फैब्रिकेटर और अधिकृत इंस्टॉलर एजेंट के रूप में जमशेदपुर में तकनीकी सेवाएं स्थापित करना।'
      },
      {
        id: 'livelihood-linkage',
        name: 'सेवा ६ — स्वावलंबन रोजगार और आजीविका लिंकेज',
        description: 'शारीरिक पुनर्वास के बाद दिव्यांग कारीगरों को वित्तीय स्वतंत्रता दिलाने हेतु स्थानीय हस्तशिल्प को बड़े बाजारों से जोड़ना और रोजगार तलाशने में मदद।',
        whyItMatters: 'झारखंड के सुदूर गांवों में रहने वाले दिव्यांग कारीगर अद्भुत कलाकृतियां बनाते हैं, परंतु बाजार संपर्क के अभाव में उन्हें सही पारिश्रमिक नहीं को मिल पाता।',
        howAddressesIt: 'कारीगरों के हस्तशिल्पों को "एटीपिकल एडवांटेज" एवं सरकारी सैनिक सोसाइटी काउंटर्स के सहयोग से सीधे राष्ट्रीय खरीदारों को बेचना।'
      },
      {
        id: 'home-accessibility-mod',
        name: 'सेवा ७ — घरेलू सुगमता मॉडिफिकेशन (सुरक्षित आवास)',
        description: 'दिव्यांग बुजुर्गों के घरों में फिसलने से रोकने वाली टाइल्स, शौचालय सपोर्ट ग्रैब बार एवं दरवाजों पर छोटे पोर्टेबल ढालू रैंप फिट करना।',
        whyItMatters: 'अधिकतर दिव्यांग व्यक्ति दिन का ७०% से अधिक समय घरों में बिताते हैं, जहां गीले बाथरूमों या छोटे चौखटों के कारण गिरकर चोट लगने की संभावनाएं होती हैं।',
        howAddressesIt: 'प्रशिक्षित प्लंबरों और राजमिस्त्रियों की टीम तैनात कर अंचल की जिला समाज कल्याण सब्सिडी या टाटा सीएसआर कोष की मदद से गरीब परिवारों को निशुल्क सामग्री देना।'
      }
    ];
  }

  return [
    {
      id: 'ai-accessibility',
      name: 'Service 2 — AI-Powered Accessibility Audit (Free Tool)',
      description: 'Upload photos of entry gates, ramps, aisles, and washrooms. Computer vision algorithms evaluate construction alignment and estimate low-cost DIY modifications.',
      whyItMatters: 'Most localized business owners desire to incorporate inclusive elements but lack technical blueprint understanding of IS 9926 construction rules.',
      howAddressesIt: 'Leverages Gemini multi-modal processing server-side to instantly structure low-cost actionable adjustments on photo submissions.'
    },
    {
      id: 'certified-accessibility',
      name: 'Service 3 — Certified Physical Accessibility Audits',
      description: 'Comprehensive physical auditing conducted on-site by RCI-registered accessibility planners, backed by personnel sensitivity training.',
      whyItMatters: 'Corporate sectors, banking nodes, and retail complexes require official compliance certifications in sync with institutional CSR parameters.',
      howAddressesIt: 'Joint audit campaigns managed hand-in-hand with Tata Steel Sabal (Jamshedpur) and Deepshikha NGO (Ranchi) providing formal brass inclusion plaque awards.'
    },
    {
      id: 'accessible-transport',
      name: 'Service 4 — Accessible Point-to-Point Transport (Silver Shuttle)',
      description: 'First floor roll-in electrical rickshaws (Totos) in Jharkhand enabling wheelchair users to board without abandoning chairs.',
      whyItMatters: 'Standard auto-rickshaws or public buses require individuals with severe mobility issues to undergo painful boarding lifts.',
      howAddressesIt: 'Contracting with modified local Toto networks, alongside retrofitted Mahindra Wingers for regional hospital transits.'
    },
    {
      id: 'vehicle-modification',
      name: 'Service 5 — Authorized Vehicle Mod Support & RTO Clearance',
      description: 'Assisting people with lower-limb impairments to equip scooters or hatchbacks with approved hand control triggers.',
      whyItMatters: 'Certified custom mechanical modifiers are virtually absent in Jamshedpur or Ranchi, forcing trans-state traveling to Mumbai.',
      howAddressesIt: 'Acting as regional authorized installation managers for prime modifiers, validating work against RTO endorsement standards.'
    },
    {
      id: 'livelihood-linkage',
      name: 'Service 6 — Inclusive Livelihood & Artisan Placement',
      description: 'Aligning disabled artists and weavers directly with digital markets or corporate vocational recruitment channels.',
      whyItMatters: 'Over 60% of rural differently-abled youth remain micro-entrepreneurs lacking structured marketing linkages.',
      howAddressesIt: 'Showcasing local tribal crafts on national portals and channeling candidates to RCI recruitment fairs.'
    },
    {
      id: 'home-accessibility-mod',
      name: 'Service 7 — BPL Home Retrofitting Assemblies',
      description: 'Installing grab rails, anti-skid floor tiling, and portable transition ramps inside residence bathrooms.',
      whyItMatters: 'Minor physical bathroom hazards generate standard slipping accidents, leading to high-tariff bone adjustments for older PwDs.',
      howAddressesIt: 'Utilizing local plumbing guilds to retrofit BPL tenements financed via district social development subsidies.'
    }
  ];
};

export default function ComprehensiveCatalogue({ currentCity, onCityChange, language }: ComprehensiveCatalogueProps) {
  const [selectedCategory, setSelectedCategory] = useState<SubCategory>('disability-pension');
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  const t = TRANSLATIONS[language];
  const localizedSchemes = getLocalizedSchemes(language);
  const activeCategoryDetail = localizedSchemes.find((s) => s.id === selectedCategory)!;
  
  // Roadmap services
  const roadmapServices = getLocalizedRoadmapServices(language);

  const toggleDoc = (doc: string) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [doc]: !prev[doc]
    }));
  };

  const getSubcategoryIcon = (id: SubCategory) => {
    switch (id) {
      case 'disability-pension': return '🪙';
      case 'aadhar-card': return '🪪';
      case 'assisted-devices': return '🦽';
      case 'caste-certificate': return '📜';
      case 'disability-udid-abha': return '❤️';
      case 'voter-id': return '🗳️';
    }
  };

  return (
    <div className="space-y-8" id="comp-catalogue-id">
      
      {/* City Toggle Banner */}
      <div className="bg-white border border-slate-100 p-4 sm:p-5 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-3xs">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-indigo-50 text-indigo-700 rounded-2xl flex items-center justify-center">
            <Compass size={20} />
          </div>
          <div>
            <span className="font-display font-bold text-slate-800 block text-sm">
              {language === 'hi' ? 'अपनी क्षेत्रीय प्रशासनिक सीमा चुनें' : 'Select Your Administrative coverage sphere'}
            </span>
            <p className="text-[11px] text-slate-400 font-light leading-snug">
              {language === 'hi'
                ? 'रेड वेव द्वारा मैप की गई रांची या जमशेदपुर जिला-विशिष्ट प्रक्रियाओं और कार्यालयों का पता लगाएं।'
                : 'Explore city-specific processes, offices and coordinator desks mapped in detail.'}
            </p>
          </div>
        </div>
        <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-150 relative w-full sm:w-auto shadow-3xs">
          <button
            onClick={() => onCityChange('jamshedpur')}
            className={`flex-1 sm:flex-none py-2 px-4 rounded-xl font-display font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              currentCity === 'jamshedpur'
                ? 'bg-white text-indigo-850 shadow-sm font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <MapPin size={13} className={currentCity === 'jamshedpur' ? 'text-indigo-600' : 'text-slate-450'} />
            <span>{t.jamshedpurNode}</span>
          </button>
          <button
            onClick={() => onCityChange('ranchi')}
            className={`flex-1 sm:flex-none py-2 px-4 rounded-xl font-display font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              currentCity === 'ranchi'
                ? 'bg-white text-indigo-850 shadow-sm font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <MapPin size={13} className={currentCity === 'ranchi' ? 'text-indigo-600' : 'text-slate-450'} />
            <span>{t.ranchiNode}</span>
          </button>
        </div>
      </div>

      {/* Headline LIVE Service Module Panel */}
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-indigo-50/50 to-white border-2 border-indigo-150 p-6 rounded-3xl space-y-4">
          <div className="flex items-center gap-2 text-indigo-805 font-display font-extrabold text-[10px] uppercase tracking-widest leading-none">
            <span className="h-2 w-2 rounded-full bg-indigo-600 animate-ping"></span> 
            <span>{t.roadmapLiveTag}</span>
          </div>
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-display font-semibold text-slate-800 tracking-tight">
              {language === 'hi' ? 'सेवा १ - सुगम उड़ान सहायता एवं अधिकार मूल्यांकन सेवा' : 'Service Pillar 1 - Guided Udaan Support & Entitlement Assessment'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-550 font-normal leading-relaxed">
              {language === 'hi'
                ? 'झारखंड में रहने वाले दिव्यागंजनों और बुजुर्गों के लिए तैयार हमारा प्रमुख लाइव मॉड्यूल। हम आपके दस्तावेजों की निःशुल्क समीक्षा करते हैं, कतारों से बचाने वाले मार्ग साझा करते हैं, और सीधे ब्लॉक कार्यालयों तथा नागरिकता समन्वयकों से जोड़ते हैं।'
                : 'Our primary, fully functional service system for regional families. Instantly lookup entitlements, print step-by-step physical filing paths for block officers, and clear matching errors.'}
            </p>
          </div>
        </div>

        {/* 6 Sub-Categories Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {localizedSchemes.map((scheme) => (
            <button
              key={scheme.id}
              onClick={() => setSelectedCategory(scheme.id)}
              className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between h-[105px] group shadow-3xs ${
                selectedCategory === scheme.id
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                  : 'bg-white border-slate-100 hover:border-indigo-300 text-slate-700'
              }`}
            >
              <span className="text-2xl">{getSubcategoryIcon(scheme.id)}</span>
              <span className={`font-display font-bold text-xs leading-tight line-clamp-2 ${
                selectedCategory === scheme.id ? 'text-white' : 'text-slate-800 group-hover:text-indigo-600'
              }`}>
                {scheme.title}
              </span>
            </button>
          ))}
        </div>

        {/* Active Category Display Box */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xs p-6 sm:p-8 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-2 max-w-2xl">
              <div className="text-[10px] font-bold tracking-widest text-indigo-700 uppercase font-display flex items-center gap-1.5">
                <Layers size={11} className="text-indigo-600" /> 
                <span>{language === 'hi' ? 'सक्रिय कल्याणकारी योजना विश्लेषण' : 'Target Entitlement Detail'}</span>
              </div>
              <h3 className="text-xl font-display font-bold text-slate-800 leading-tight">
                {activeCategoryDetail.title}
              </h3>
              <p className="text-xs sm:text-xs font-normal text-slate-500 leading-relaxed">
                {activeCategoryDetail.overview}
              </p>
            </div>
            
            {/* Quick eligibility badge */}
            <div className="bg-slate-50 border border-slate-150 p-4 rounded-2xl lg:min-w-[280px]">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-display block mb-1">
                {language === 'hi' ? 'सामान्य योग्यता नियम:' : 'Standard Eligibility Guidelines:'}
              </span>
              <p className="text-xs font-semibold text-slate-700 font-display leading-tight">
                {activeCategoryDetail.eligibility}
              </p>
            </div>
          </div>

          {/* Pros and Cons comparative guide */}
          <div className="bg-slate-50/50 border border-slate-150 p-5 sm:p-6 rounded-2xl space-y-5">
            <div>
              <h4 className="font-display font-bold text-slate-850 text-xs flex items-center gap-1.5 leading-none">
                {language === 'hi' ? 'पारदर्शी लाभ और सीमाएं तुलना' : 'Welfare Benefits and Limitations Guide'}
              </h4>
              <p className="text-[11px] text-slate-400 font-light mt-1">
                {language === 'hi'
                  ? 'अधिकारियों के समक्ष फाइल प्रस्तुत करने से पहले अपनी योजना के अच्छे और बुरे पहलुओं को बारीकी से समझें।'
                  : 'An objective summary intended to assist families to prepare for administrative filing loops.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Pros segment */}
              <div className="bg-white p-4.5 rounded-xl border border-slate-150 shadow-3xs space-y-3.5">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg uppercase tracking-wider font-display">
                  <ThumbsUp size={12} className="text-emerald-600" /> {t.benefitsTitle}
                </span>
                <ul className="space-y-2.5">
                  {activeCategoryDetail.pros.map((pro, index) => (
                    <li key={index} className="text-xs text-slate-650 flex items-start gap-2 leading-relaxed font-light">
                      <span className="text-emerald-505 font-bold shrink-0 text-sm">✓</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons segment */}
              <div className="bg-white p-4.5 rounded-xl border border-slate-150 shadow-3xs space-y-3.5">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-805 bg-amber-50 px-2.5 py-1 rounded-lg uppercase tracking-wider font-display">
                  <ThumbsDown size={12} className="text-amber-600" /> {t.barriersTitle}
                </span>
                <ul className="space-y-2.5">
                  {activeCategoryDetail.cons.map((con, index) => (
                    <li key={index} className="text-xs text-slate-650 flex items-start gap-2 leading-relaxed font-light">
                      <span className="text-amber-500 font-bold shrink-0 text-xs mt-0.5">⚠️</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left side: Regional Process Stepper */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-display font-bold text-xs tracking-wider text-slate-500 uppercase flex items-center gap-2">
                  <Clock size={14} className="text-indigo-600" /> 
                  <span>{language === 'hi' ? `${currentCity === 'ranchi' ? 'रांची' : 'जमशेदपुर'} के लिए चरण-दर-चरण आवेदन विधि` : `Filing Procedure for ${currentCity === 'ranchi' ? 'Ranchi' : 'Jamshedpur'}`}</span>
                </span>
                <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-800 text-[9px] font-bold rounded-md font-mono uppercase tracking-wider">
                  {language === 'hi' ? '१००% क्षेत्रीय दिशानिर्देश' : '100% Local Checklist'}
                </span>
              </div>

              {/* Stepper Cards */}
              <div className="space-y-3">
                {activeCategoryDetail.process[currentCity].steps.map((step, idx) => {
                  const isWarning = step.toLowerCase().includes('unstable') || step.includes('अस्थिर') || step.toLowerCase().includes('broken') || step.toLowerCase().includes('do not use');
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
                        isWarning
                          ? 'bg-amber-50/40 border-amber-200 text-amber-900'
                          : 'bg-slate-50/40 border-slate-150 text-slate-700 hover:bg-slate-50 hover:border-slate-200'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-display font-extrabold text-[10px] shrink-0 mt-0.5 ${
                        isWarning ? 'bg-amber-100 text-amber-850' : 'bg-white border border-slate-155 text-slate-500 shadow-3xs'
                      }`}>
                        {idx + 1}
                      </span>
                      <div className="space-y-1 text-xs">
                        {isWarning && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
                            <AlertCircle size={9} /> {language === 'hi' ? 'आवश्यक चेतावनी' : 'Operational Alert'}
                          </span>
                        )}
                        <p className={`font-normal leading-relaxed ${isWarning ? 'font-semibold' : ''}`}>{step}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {activeCategoryDetail.process[currentCity].additionalInfo && (
                <div className="bg-slate-100/50 p-4 rounded-2xl flex items-start gap-2.5 text-xs text-slate-500 font-normal italic leading-relaxed">
                  <Info size={14} className="text-indigo-700 shrink-0 mt-0.5" />
                  <span>{activeCategoryDetail.process[currentCity].additionalInfo}</span>
                </div>
              )}
            </div>

            {/* Right side: National/State Scope & Document Checklist */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Central vs State structures split */}
              {(activeCategoryDetail.nationalAspect || activeCategoryDetail.stateAspect) && (
                <div className="my-4 bg-slate-50/40 p-5 rounded-2xl border border-slate-150 space-y-4">
                  <span className="font-display font-bold text-xs tracking-wider text-slate-500 uppercase block">
                    {language === 'hi' ? 'योजना का दोहरा ढांचा विश्लेषण' : 'Scheme Structural Framework'}
                  </span>
                  <div className="space-y-4">
                    {activeCategoryDetail.nationalAspect && (
                      <div className="space-y-1.5">
                        <span className="inline-flex py-0.5 px-2 bg-slate-200 text-slate-800 font-bold text-[8px] rounded-sm font-display uppercase tracking-wider leading-none">
                          {language === 'hi' ? 'केंद्रीय योगदान विवरण' : 'Central Contribution Aspect'}
                        </span>
                        <h5 className="font-display font-extrabold text-slate-850 text-xs leading-none">{activeCategoryDetail.nationalAspect.title}</h5>
                        <p className="text-[11px] text-slate-500 font-light leading-relaxed">{activeCategoryDetail.nationalAspect.description}</p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {activeCategoryDetail.nationalAspect.keyBenefits.map((b, i) => (
                            <span key={i} className="text-[9px] bg-white border border-slate-150 text-slate-650 px-2 py-0.5 rounded-md font-mono leading-none">{b}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeCategoryDetail.stateAspect && (
                      <div className="space-y-1.5 pt-3.5 border-t border-slate-100">
                        <span className="inline-flex py-0.5 px-2 bg-indigo-50 text-indigo-805 font-bold text-[8px] rounded-sm font-display uppercase tracking-wider leading-none">
                          {language === 'hi' ? 'झारखंड राज्य संवितरण लाभ' : 'State Jharkhand Aspect'}
                        </span>
                        <h5 className="font-display font-extrabold text-slate-850 text-xs leading-none">{activeCategoryDetail.stateAspect.title}</h5>
                        <p className="text-[11px] text-slate-500 font-light leading-relaxed">{activeCategoryDetail.stateAspect.description}</p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {activeCategoryDetail.stateAspect.keyBenefits.map((b, i) => (
                            <span key={i} className="text-[9px] bg-indigo-50 text-indigo-750 px-2 py-0.5 rounded-md font-semibold leading-none">{b}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Checklist Box */}
              <div className="bg-indigo-50/5 p-5 rounded-2xl border border-indigo-100/40 space-y-4">
                <div className="space-y-1">
                  <span className="font-display font-bold text-xs py-0.5 px-2.5 bg-indigo-50 border border-indigo-100 text-indigo-855 rounded-sm inline-block uppercase tracking-wider">
                    {language === 'hi' ? 'दस्तावेज मिलान चेकलिस्ट (इंटरएक्टिव)' : 'Interactive Document Checklist'}
                  </span>
                  <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                    {language === 'hi'
                      ? 'अधिकारी से संपर्क करने से पहले अपने अटेस्ट किए हुए दस्तावेजों को चेक करें ताकि कोई कार्य बाधित न हो!'
                      : 'Audit your current documents folder to prevent common name or matching errors at block desks.'}
                  </p>
                </div>

                <div className="space-y-2">
                  {activeCategoryDetail.documents.map((doc, idx) => {
                    const isChecked = !!checkedDocs[doc];
                    return (
                      <button
                        key={idx}
                        onClick={() => toggleDoc(doc)}
                        className={`w-full p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between group shadow-3xs ${
                          isChecked
                            ? 'bg-emerald-50/10 border-emerald-100/50 text-emerald-900 font-medium'
                            : 'bg-white border-slate-150 hover:border-slate-350 text-slate-650'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {isChecked ? (
                            <CheckSquare className="text-emerald-600 shrink-0 font-extrabold" size={15} />
                          ) : (
                            <Square className="text-slate-300 group-hover:text-slate-400 shrink-0" size={15} />
                          )}
                          <span className={`font-light ${isChecked ? 'line-through text-slate-405' : ''}`}>{doc}</span>
                        </div>
                        {isChecked && (
                          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                            {language === 'hi' ? 'तैयार' : 'Ready'}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Portfolio Expansion Roadmap (Red Wave strategic development plan) */}
      <div className="space-y-6 pt-4">
        <div className="border-l-4 border-slate-400 pl-4 space-y-1">
          <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-display block">
            {t.roadmapHeader}
          </span>
          <h3 className="font-display font-semibold text-slate-800 text-lg">
            {t.roadmapTitle}
          </h3>
          <p className="text-xs text-slate-400 font-light max-w-4xl">
            {t.roadmapSub}
          </p>
        </div>

        {/* Cohesive design grid for Roadmap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {roadmapServices.map((service, idx) => (
            <div key={idx} className="bg-slate-50/40 border border-slate-150 rounded-2xl p-5 space-y-3.5 relative overflow-hidden flex flex-col justify-between group hover:border-slate-300 transition-all shadow-3xs">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold text-slate-500 bg-slate-150 px-2 py-0.5 rounded-md border border-slate-200 uppercase tracking-wider font-display">
                    <Lock size={9} className="text-slate-400" /> 
                    <span>{language === 'hi' ? `फेज ${idx + 2} योजना` : `Phase ${idx + 2} Rollout`}</span>
                  </span>
                  <span className="text-slate-300 font-mono text-[9px] font-bold uppercase">
                    {language === 'hi' ? 'आरपीडब्ल्यूडी अनुकूल' : 'RPWD Blueprint'}
                  </span>
                </div>
                <h4 className="font-display font-medium text-slate-800 text-sm leading-snug group-hover:text-indigo-600 transition-colors">
                  {service.name}
                </h4>
                <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-150">
                <div className="text-[10px] text-slate-600/90 leading-relaxed font-light">
                  <strong className="font-display font-bold uppercase tracking-wider text-slate-550 block">
                    {t.roadmapWhyItMatters}
                  </strong>
                  <span>{service.whyItMatters}</span>
                </div>
                <div className="text-[10px] text-indigo-950/95 leading-relaxed font-light">
                  <strong className="font-display font-bold uppercase tracking-wider text-indigo-805 block">
                    {t.howRedWaveSolves}
                  </strong>
                  <span>{service.howAddressesIt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-[10px] text-slate-400/80 font-light italic text-center max-w-4xl mx-auto">
          {t.partnershipDisclaimer}
        </p>
      </div>
    </div>
  );
}
