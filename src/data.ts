/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SchemeDetail, ServiceDefinition } from './types';

export const RED_WAVE_SERVICES: ServiceDefinition[] = [
  {
    id: 'government-aid',
    name: 'Service 1 — Government Aid & UDID Card Facilitation',
    status: 'active',
    description: 'Empowering PwDs & senior citizens in Jamshedpur & Ranchi to claim government pensions, get universal ID cards, and apply for assistive tech devices.',
    whyItMatters: 'Awareness exists, but last-mile execution is difficult. PwDs struggle with complex web portals, medical board visits, and documentation.',
    howRedWaveAddressesIt: 'By providing an offline + assisted desk experience. Helping with online registrations, form validation, assembly support for medical boards, and status tracking.',
    priceRange: 'Free to ₹2,000 depending on service tier',
    milestones: [
      { title: 'Free Information Hub', desc: 'Step-by-step guides, check-lists and WhatsApp-based helpdesk.' },
      { title: 'Assisted Service (₹200–₹500)', desc: 'Document review, online form-filling, status updates.' },
      { title: 'Full Facilitation (₹1,000–₹2,000)', desc: 'Home document collection, physical accompaniment to medical board, appeals support.' }
    ]
  },
  {
    id: 'ai-accessibility',
    name: 'Service 2 — AI-Powered Accessibility Audit (Free Model)',
    status: 'upcoming',
    description: 'Upload 5 photos of your store/space (entrance, ramp, aisle, washroom, parking) and get a comprehensive accessibility report with estimated DIY fix costs.',
    whyItMatters: 'Most business owners want to be accessible but do not know how or think it is too expensive. We remove the friction.',
    howRedWaveAddressesIt: 'Using generative AI & computer vision (Claude/Gemini APIs) to visually inspect spaces and generate actionable improvements based on IS 9926 standards.'
  },
  {
    id: 'certified-accessibility',
    name: 'Service 3 — Certified Accessibility Audit (Premium — CSR-Linked)',
    status: 'upcoming',
    description: 'Full physical audit by RCI-registered experts, staff sensitivity training, and a co-branded official brass plaque showing inclusion status.',
    whyItMatters: 'Businesses want formal prestige, customer trust, and alignment with modern CSR directives (Tata Steel / Sabal initiative).',
    howRedWaveAddressesIt: 'Partnering with Deepshikha (Ranchi) and Tata Steel (Jamshedpur) to certify inclusive establishments.'
  },
  {
    id: 'accessible-transport',
    name: 'Service 4 — Accessible Transportation (E-Rickshaw + Silver Shuttle)',
    status: 'upcoming',
    description: 'First modified point-to-point transit system inside Jamshedpur and Ranchi. Retain space inside the ride without having to leave the wheelchair.',
    whyItMatters: 'Existing autos or generic wheelchair app fleets require users to step out of wheelchairs. True folding/roll-in facilities do not exist.',
    howRedWaveAddressesIt: 'Partnering with modified local Toto electrical networks for short routes, plus Mahindra Winger rear-ramp vehicles to key hospitals.'
  },
  {
    id: 'vehicle-modification',
    name: 'Service 5 — Vehicle Modification & Assistive Technology',
    status: 'upcoming',
    description: 'Assisting people with limb disabilities to modify their cars or scooters with hand controls, lifts, and RTO endorsements.',
    whyItMatters: 'Custom fabricator expertise is non-existent in Jharkhand. PwDs are forced to travel to Mumbai or Bengaluru.',
    howRedWaveAddressesIt: 'Serving as the regional authorized installer/franchise for Ezy Mov (Mumbai). Providing local installation and liaison.'
  },
  {
    id: 'livelihood-linkage',
    name: 'Service 6 — Livelihood & Employment Linkage',
    status: 'upcoming',
    description: 'Closing the loop between disability status, physical rehabilitation, and dignified financial independence.',
    whyItMatters: 'Only 36% of India’s 26.8 million PwDs are employed. No local platforms actively link local artisans to modern markets.',
    howRedWaveAddressesIt: 'Connecting local candidates directly to Atypical Advantage & SwarajAbility. Selling goods via the Sainik Society Counter.'
  },
  {
    id: 'home-accessibility-mod',
    name: 'Service 7 — Home Accessibility Modification',
    status: 'upcoming',
    description: 'Doorstep ramps, bathroom support bars, seat lifters, and non-slip tiles installed at a marginal price.',
    whyItMatters: 'PwDs spend 70%+ of their day at home. Simple visual hazards lead to critical fall injuries.',
    howRedWaveAddressesIt: 'Deploying trained local plumbers & handymen. Unlocking state ADIP/DSWO subsidies or CSR funds for below-poverty-line families.'
  }
];

export const SCHEME_DETAILS: SchemeDetail[] = [
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
      'Reliable financial independence (State program offers a fixed ₹1,000/month payout).',
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
      'Often delayed by multiple structural administrative handoffs (from Halka Karmachari to CI and SDO).'
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
    overview: 'Official Voter Identification. Registering with PwD identification tags unlocks free local shuttle systems, polling booth accessibility, and queue-cutting privileges.',
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
