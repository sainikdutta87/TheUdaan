/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

// Ensure server binds to host 0.0.0.0 and port 3000
const PORT = 3000;

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getAiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // Decision Advisor / Analysis endpoint using Gemini Pro / Flash
  app.post('/api/gemini/decision', async (req, res) => {
    const { age, disabilityPercentage, city, selectedCategory, specificIssue, incomeLevel } = req.body;

    const queryInfo = `
      Age of person: ${age || 'N/A'} years old
      Disability Percentage: ${disabilityPercentage || 'N/A'}%
      City of application: ${city || 'Jamshedpur'} (Jharkhand, India)
      Selected Service: ${selectedCategory}
      Specific query/situation: "${specificIssue || 'General process optimization'}"
      Income level (monthly): ${incomeLevel || 'N/A'}
    `;

    const ai = getAiClient();

    if (!ai) {
      // Return a highly comprehensive, deterministic offline response
      // if GEMINI_API_KEY is not set. This guarantees the app is fully functional out-of-the-box.
      console.log('No GEMINI_API_KEY found, returning offline fallback analysis.');
      const fallbackResponse = getFallbackAnalysis(selectedCategory, city, disabilityPercentage, age, incomeLevel, specificIssue);
      return res.json(fallbackResponse);
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: `
          You are a professional disability consultant representing "The Udaan Accessibility Hub", a Red Wave initiative in Ranchi and Jamshedpur, Jharkhand.
          Analyze this user's situation and generate a decision/recommendation profile to help the person with a disability achieve all maximum benefits.
          
          User Request details:
          ${queryInfo}

          You MUST output exactly matching the following JSON structure containing clear pathways, SWOT analysis, and simple pediatric-friendly terms:
          {
            "recommendation": "A strong, clear high-level recommendation statement customized to their situation",
            "bestRoute": "A concise overview of the absolute easiest, fastest, and most cost-effective route to succeed",
            "pros": ["Pro 1", "Pro 2", "Pro 3"],
            "cons": ["Con 1", "Con 2"],
            "comparisonTable": [
              { "criterion": "E.g., Time taken", "routeA": "Central (IGNDPS) Route detail", "routeB": "State Route detail" }
            ],
            "swot": {
              "strengths": ["Clear strength in simple words"],
              "weaknesses": ["Clear weakness or bottleneck"],
              "opportunities": ["Upcoming programs or support"],
              "threats": ["E.g. missing documents or invalid percent"]
            },
            "childFriendlySteps": [
              { "stepNo": 1, "title": "Catchy title a child understands", "action": "Simple, short instruction action using child-friendly language" }
            ],
            "supportingOrganizations": [
              { "name": "Deepshikha Ranchi", "role": "Provides RCI-certified assessors and vocational training in Ranchi", "city": "ranchi" }
            ]
          }

          Important Local Details to weave in where applicable:
          - Disability Pension Central IGNDPS is via Umang, but online process does not work; Offline block office is required.
          - State Pension (Swami Vivekananda Nishakt Pension) pays Rs 1,000/month for severe disability (>= 40%). Apply via SDO/CO office.
          - For Jamshedpur, the District Social Welfare Officer (DSWO) and CMO, East Singhbhum (Khas Mahal) oversee UDID processing and camps.
          - For Ranchi, Deepshikha is the anchor institution with Pramod Kumar (Academic Coordinator). Sadar Hospital Ranchi near Albert Ekka Chowk does camps.
          - Voter ID is via Saksham App or ECIM, with step-by-step marking PwD status to get assistance.
          - Assisted Devices Scheme (ADIP) has a national monthly income threshold: free for < Rs 15,000/month, 50% subsidy for Rs 15,000 - Rs 30,000.
          
          Generate structured JSON only.
        `,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recommendation: { type: Type.STRING },
              bestRoute: { type: Type.STRING },
              pros: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              cons: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              comparisonTable: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    criterion: { type: Type.STRING },
                    routeA: { type: Type.STRING },
                    routeB: { type: Type.STRING }
                  },
                  required: ['criterion', 'routeA', 'routeB']
                }
              },
              swot: {
                type: Type.OBJECT,
                properties: {
                  strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                  weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
                  opportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
                  threats: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ['strengths', 'weaknesses', 'opportunities', 'threats']
              },
              childFriendlySteps: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    stepNo: { type: Type.INTEGER },
                    title: { type: Type.STRING },
                    action: { type: Type.STRING }
                  },
                  required: ['stepNo', 'title', 'action']
                }
              },
              supportingOrganizations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    role: { type: Type.STRING },
                    city: { type: Type.STRING }
                  },
                  required: ['name', 'role', 'city']
                }
              }
            },
            required: ['recommendation', 'bestRoute', 'pros', 'cons', 'swot', 'childFriendlySteps', 'supportingOrganizations']
          }
        }
      });

      const text = response.text || '';
      try {
        const jsonResult = JSON.parse(text.trim());
        res.json(jsonResult);
      } catch (err) {
        console.error('Failed to parse Gemini JSON output:', text, err);
        throw err;
      }
    } catch (e: any) {
      console.error('Error in call to Gemini API:', e);
      res.status(500).json({
        error: 'AI is taking a break. Returning reliable guide content instead.',
        fallback: getFallbackAnalysis(selectedCategory, city, disabilityPercentage, age, incomeLevel, specificIssue)
      });
    }
  });

  // User Login & Credentials Email Dispatch endpoint
  app.post('/api/auth/login', async (req, res) => {
    const { email, name, city } = req.body;

    if (!email || !name) {
      return res.status(400).json({ error: 'Name and email are required to login to Udaan.' });
    }

    const loginTime = new Date().toISOString();
    const targetCity = city === 'ranchi' ? 'Ranchi' : 'Jamshedpur';
    const specificEmail = 'sainikdutta87@gmail.com';

    // Build the accessibility briefing content
    const emailSubject = `🔐 The Udaan Hub - Access Confirmation for ${name}`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #f8fafc;">
        <div style="text-align: center; margin-bottom: 25px; border-bottom: 2px solid #e11d48; padding-bottom: 15px;">
          <h1 style="color: #0f172a; margin: 0; font-size: 24px; letter-spacing: 1px;">उडाAn THE UDAAN</h1>
          <p style="color: #64748b; font-size: 11px; text-transform: uppercase; margin: 5px 0 0 0; letter-spacing: 2px;">Red Wave Accessibility Hub</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 20px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); border: 1px solid #f1f5f9; margin-bottom: 20px;">
          <h2 style="color: #4f46e5; font-size: 16px; margin-top: 0;">Access Confirmation &amp; Support Briefing</h2>
          <p style="color: #334155; font-size: 13px; line-height: 1.5; margin: 0 0 15px 0;">Hello <strong>${name}</strong>,</p>
          <p style="color: #334155; font-size: 13px; line-height: 1.5; margin: 0 0 15px 0;">Welcome to The Udaan! You have successfully signed in using our accessible PwD and elder security gate. Your secure session records have been safely compiled.</p>
          
          <table style="width: 100%; font-size: 12px; border-collapse: collapse; margin: 15px 0;">
            <tr style="background-color: #f1f5f9;">
              <td style="padding: 8px; font-weight: bold; color: #475569;">Verified Email</td>
              <td style="padding: 8px; color: #334155;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #475569;">Active Region</td>
              <td style="padding: 8px; color: #334155; text-transform: capitalize;">${targetCity} (Jharkhand)</td>
            </tr>
            <tr style="background-color: #f1f5f9;">
              <td style="padding: 8px; font-weight: bold; color: #475569;">Login Timestamp</td>
              <td style="padding: 8px; color: #334155; font-family: monospace;">${loginTime}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #475569;">Status</td>
              <td style="padding: 8px; color: #16a34a; font-weight: bold;">● Active Hub Connection</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #e0e7ff; padding: 15px; border-radius: 10px; border: 1px solid #c7d2fe; margin-bottom: 20px;">
          <h3 style="color: #3730a3; font-size: 12px; margin-top: 0; text-transform: uppercase; letter-spacing: 1px;">Sovereign RPWD 2016 Guidelines</h3>
          <p style="color: #1e1b4b; font-size: 11px; line-height: 1.4; margin: 0;">Under the Rights of Persons with Disabilities Act (2016), you are entitled to priority public counters, free tricycles/aids under the ADIP scheme (subject to income ceilings), and 75% train concession cards. Keep your UDID digitized with ABHA!</p>
        </div>

        <div style="background-color: #ffffff; padding: 15px; border-radius: 12px; border: 1px solid #f1f5f9; margin-bottom: 20px;">
          <h4 style="color: #334155; font-size: 12px; margin-top: 0; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px;">Key Regional Contact Desks</h4>
          <ul style="font-size: 11px; color: #475569; padding-left: 20px; margin: 5px 0;">
            <li style="margin-bottom: 5px;"><strong>Jamshedpur:</strong> Tata Steel Sabal Center (Bistupur Hub) for free transit and biometric support.</li>
            <li style="margin-bottom: 5px;"><strong>Ranchi:</strong> Pramod Kumar, Academic Coordinator at Deepshikha Welfare Center (RCI registered).</li>
            <li><strong>Sovereign:</strong> District Social Welfare Officer (DSWO) and Civil Surgeon Board at Sadar Hospitals.</li>
          </ul>
        </div>

        <div style="text-align: center; color: #94a3b8; font-size: 10px; border-top: 1px solid #e2e8f0; padding-top: 15px; margin-top: 25px;">
          <p style="margin: 0;">Sent automatically by The Udaan Platform. Registered to Indian National Disability Schemes portal.</p>
          <p style="margin: 5px 0 0 0;">Recipient CC: sainikdutta87@gmail.com</p>
        </div>
      </div>
    `;

    // Try creating transporter using optional env vars, falling back to Ethereal/Simulation
    let sentDetails = { transmitted: false, simulated: true, error: null as any };
    try {
      // Configuration check
      const host = process.env.SMTP_HOST;
      const port = parseInt(process.env.SMTP_PORT || '587');
      const user = process.env.SMTP_USER;
      const pass = process.env.SMTP_PASS;

      let transporter;
      if (host && user && pass) {
        transporter = nodemailer.createTransport({
          host,
          port,
          secure: port === 465,
          auth: { user, pass }
        });
      }

      if (transporter) {
        await transporter.sendMail({
          from: `"The Udaan Accessibility Hub" <${user}>`,
          to: `${email}`,
          cc: specificEmail,
          subject: emailSubject,
          html: emailHtml
        });
        sentDetails.transmitted = true;
        sentDetails.simulated = false;
        console.log(`Real email successfully dispatched to ${email} (CC to ${specificEmail})`);
      } else {
        sentDetails.transmitted = true;
        sentDetails.simulated = true;
        console.log(`Simulation complete. Saved log metadata to memory.`);
      }
    } catch (err: any) {
      console.error('Mail delivery warning/error:', err);
      sentDetails.error = err.message || err;
    }

    res.json({
      success: true,
      user: { name, email, city, loginTime },
      emailSent: sentDetails,
      transparencyLog: {
        subject: emailSubject,
        recipient: email,
        cc: specificEmail,
        sentTimestamp: loginTime,
        bodyPreview: `Successful Login by ${name}. Accessibility Briefing dispatched!`
      }
    });
  });

  // Serve static assets or mount Vite dev server
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`The Udaan App running on http://localhost:${PORT}`);
  });
}

// Complete fallback database to keep the app 100% robust/functional when offline
function getFallbackAnalysis(
  category: string,
  city: string,
  percentage: number,
  age: number,
  income: string,
  issue: string
) {
  const finalPercent = percentage || 40;
  const isEligibleForPension = finalPercent >= 40;
  const targetCity = city === 'ranchi' ? 'Ranchi' : 'Jamshedpur';

  const defaultOrgs = [
    { name: 'Deepshikha Ranchi', role: 'Provides RCI-certified assessors, vocational programs & training.', city: 'ranchi' as const },
    { name: 'Tata Steel / Sabal Center Jamshedpur', role: 'Platinum partner for co-branding audits, disabled integration & assistive facilitation.', city: 'jamshedpur' as const },
    { name: 'Office of Administrative Block (CO/SDO)', role: 'Local authority handling offline application verifications, physical forms validation.', city: 'both' as const },
    { name: 'Sadar Hospital Camps', role: 'Issues disability percentage certificates on scheduled days.', city: 'both' as const }
  ];

  if (category === 'disability-pension') {
    return {
      recommendation: `Apply for the State Swami Vivekananda Nishakt Pension instead of the Central IGNDPS Scheme because the central online registration system via Umang is currently unstable.`,
      bestRoute: `Submit a physical dossier at the ${targetCity} Block Office (CO/SDO Office) with your Aadhar Card, Disability Card, and passive bank passbook.`,
      pros: [
        'State Pension has a reliable offline setup at Block offices',
        'Direct bank transfer of ₹1,000 every month once approved',
        'Less paperwork than the Central pension route'
      ],
      cons: [
        'Requires minimum 40% certificate from State Doctor',
        'Requires in-person visit to Block office to submit initial form'
      ],
      comparisonTable: [
        { criterion: 'Mode of Process', routeA: 'State Route is strictly Offline (SDO/CO Office)', routeB: 'Central Route via Umang App is currently broken' },
        { criterion: 'Processing Timeline', routeA: '30-45 Days via local verification', routeB: '90+ Days with central queue' },
        { criterion: 'Disability Threshold', routeA: 'Min 40% State-certified', routeB: 'Min 40% with BPL criteria' }
      ],
      swot: {
        strengths: ['Established offline channel', 'Fixed ₹1,000/month payout guaranteed by Jharkhand Govt'],
        weaknesses: ['Online link currently down', 'Verification delays at Block level'],
        opportunities: ['Financial independence for micro-needs', 'Can bundle with free transport passes'],
        threats: ['Failure to associate correct passbook', 'Errors in state disability certificate name tag']
      },
      childFriendlySteps: [
        { stepNo: 1, title: 'Check Your Super Certificate', action: 'Make sure your Disability Certificate says 40% or more. This is your magic card!' },
        { stepNo: 2, title: 'Collect the Paper Trio', action: 'Put your Aadhar Card, Disability Certificate, and Bank Account details in a neat blue folder.' },
        { stepNo: 3, title: 'Visit the Town Helpers', action: `Go to your nearby Block Office in ${targetCity} and ask the friendly desk helper for the "Swami Vivekananda Pension form". Fill it up and hand it over!` }
      ],
      supportingOrganizations: defaultOrgs
    };
  } else if (category === 'aadhar-card') {
    return {
      recommendation: `Book an Aadhaar slot online first to secure priority entry and minimize wait times at the ${targetCity} central post office or bank branch.`,
      bestRoute: `Schedule an online slot via the UIDAI booking portal, print the receipt, and bring helper transport assistance to the enrollment center.`,
      pros: [
        'Online booking ensures zero long standing queues',
        'Special PwD chairs and desk priority are active at UIDAI Seva Kendras',
        'Aadhaar serves as your master ID for all subsequent services'
      ],
      cons: [
        'Biographic details must exactly match past school/birth records',
        'Requires physical presence for fingerprint/iris scan'
      ],
      comparisonTable: [
        { criterion: 'Online Booking', routeA: 'Yes, chosen block slot', routeB: 'Walk-in lines (2-4 hours delay)' },
        { criterion: 'Local Availability', routeA: 'Central bank/head post office', routeB: 'Small camp offices (temporary)' }
      ],
      swot: {
        strengths: ['Universal validation', 'Instant tracking number'],
        weaknesses: ['Machine errors for fingerprint reading of severe locomotor cases'],
        opportunities: ['Get linked with bank account easily', 'Necessary prerequisite for UDID applications'],
        threats: ['Incorrect mobile mapping leading to OTP failures']
      },
      childFriendlySteps: [
        { stepNo: 1, title: 'Book the Timed Ticket', action: 'Ask a parent to open UIDAI online and book a cozy morning slot for the nearest center.' },
        { stepNo: 2, title: 'Match the Spelling Bee', action: 'Write down your full name on a paper and check that your birth report matches it perfectly!' },
        { stepNo: 3, title: 'The Camera Smile', action: 'Go to the center on time. They will take a cool photo and press your fingers on the light scanner!' }
      ],
      supportingOrganizations: defaultOrgs
    };
  } else if (category === 'assisted-devices') {
    return {
      recommendation: `Verify application details under the National ADIP Scheme. Prioritize Jamshedpur DSWO for local hand-outs or Ranchi Sadar Hospital camps.`,
      bestRoute: `Check if your family monthly income is under ₹15,000/month for a fully free device, else you qualify for a 50% subsidy under ₹30,000/month.`,
      pros: [
        'Provides high-quality physical wheelchairs, tricycles, and digital hearing aids for free',
        'Empowered by National Ministry support',
        'No out-of-pocket costs for lower-income groups'
      ],
      cons: [
        'Local camp calendar varies and requires constant checking',
        'Requires income certification issued by a local Gazetted officer'
      ],
      comparisonTable: [
        { criterion: 'National ADIP Scheme', routeA: '100% Free if income < ₹15,000/mo', routeB: '50% Free if income ₹15k-₹30k/mo' },
        { criterion: 'State Scheme/DSWO', routeA: 'Distributes in Jamshedpur & Ranchi directly', routeB: 'Requires certificate & registration with DSWO' }
      ],
      swot: {
        strengths: ['Direct access to high quality tools', 'Substantially reduces transport cost weight'],
        weaknesses: ['Limited inventory of state-of-the-art battery chairs', 'Waitlist sometimes takes 2-4 months'],
        opportunities: ['Gain full classroom/school access', 'Get support from Tata Steel Sabal co-programs'],
        threats: ['Devices of incorrect size distributed if parameters are not written well']
      },
      childFriendlySteps: [
        { stepNo: 1, title: 'Check the Piggy Bank', action: 'Get a clean income certificate paper from the city officer showing your family income.' },
        { stepNo: 2, title: 'Choose Your Gadget', action: 'Mark whether you need a smooth wheelchair, a shiny dark tricycle, or visual white cane helper.' },
        { stepNo: 3, title: 'Give It to DSWO Team', action: `Bring your forms lock-and-load to the ${targetCity} helper DSWO office and await the next camp date list!` }
      ],
      supportingOrganizations: defaultOrgs
    };
  } else if (category === 'caste-certificate') {
    return {
      recommendation: `Utilize the JharSewa portal online for Caste Certificate applications rather than going completely offline. Choose offline block checks only if land revenue papers require physical counters.`,
      bestRoute: `Create a profile on JharSewa, upload land registration (Khatiyan)/land revenue records, and keep the application ID for mobile SMS progress tracking.`,
      pros: [
        'Convenient draft submission from home in Ranchi or Jamshedpur',
        'Automated progressive tracking sent to your linked mobile number',
        'Allows extra reservation benefits on scholarships and local employment routes'
      ],
      cons: [
        'Needs historical land ownership records (Khatiyan) tracing to parent lineage',
        'Requires validation signature check from local Halka Karmachari'
      ],
      comparisonTable: [
        { criterion: 'Submit Method', routeA: 'Online via JharSewa Portal', routeB: 'Vocal/Manual submission at Tehsil Desk' },
        { criterion: 'Tracking Ease', routeA: 'Dynamic SMS on step status', routeB: 'Must visit block clerk repeatedly' }
      ],
      swot: {
        strengths: ['Universal validity for school/job reserve', 'Secured and verified database entry of Jharkhand'],
        weaknesses: ['Older line documents are difficult to read/scan online', 'Administrative backlog during festival seasons'],
        opportunities: ['Combines with PwD quota status for double-linkage grants', 'Enables central scholarships'],
        threats: ['Spelling variations between Aadhar and Ancestral property paper records']
      },
      childFriendlySteps: [
        { stepNo: 1, title: 'Lineage Leaf Quest', action: 'Ask Grandpa or Grandma for the old house paper (Khatiyan) showing family root ownership!' },
        { stepNo: 2, title: 'Log in online', action: 'Ask a teacher or friend to help open JharSewa and type your basic form details carefully.' },
        { stepNo: 3, title: 'Receive the Shield', action: 'Track with your special check code. When the Green checkmark is done, download your shield!' }
      ],
      supportingOrganizations: defaultOrgs
    };
  } else if (category === 'voter-id') {
    return {
      recommendation: `Apply exclusively using the standard Election Commission 'Saksham App' or official Voters Portal instead of using standard un-marked channels. Marking yourself as a PwD is crucial.`,
      bestRoute: `Complete online registration under Form 6, checking the box for 'Person with Disability' and uploading your certificate to auto-claim free wheel-chair transport.`,
      pros: [
        'Entitles you to priority queue cuts at the local polling booth',
        'Enables free door-to-door transport option on Election Day',
        'Guarantees accessible low-gradient ramp setups at designated booths'
      ],
      cons: [
        'Approval depends on timely ground verification by Booth Level Officer (BLO)',
        'Mandatorily requires high-fidelity Aadhar Card mapping'
      ],
      comparisonTable: [
        { criterion: 'Saksham App Route', routeA: 'Auto-flags PwD status; gives polling booth assistance', routeB: 'General Voters App doesn’t mark accessibility tools' },
        { criterion: 'Verification Tier', routeA: 'BLO visits your address at Jamshedpur/Ranchi', routeB: 'Standard validation queue' }
      ],
      swot: {
        strengths: ['Direct access to your democratic power', 'Special volunteers on line to hold doors'],
        weaknesses: ['App interfaces have high terminology words', 'Field officers sometimes miss flag marks'],
        opportunities: ['Participate as an active state asset', 'Earn community representation honors'],
        threats: ['Address mismatches if Aadhaar address isn’t updated']
      },
      childFriendlySteps: [
        { stepNo: 1, title: 'Tap the Saksham Icon', action: 'Download the orange Saksham App from the store. It has easy tools just for you!' },
        { stepNo: 2, title: 'The Badge of Pride', action: 'Attach your 40%+ Disability Card to verify your name, age and cool profile.' },
        { stepNo: 3, title: 'Meet your BLO Friend', action: 'A local block officer will stop by to say hello and activate your voter card!' }
      ],
      supportingOrganizations: defaultOrgs
    };
  } else {
    // disability-udid-abha
    return {
      recommendation: `Apply for the Swavlamban UDID Card online immediately as it is the supreme national proof of disability. Simultaneously link your ABHA card on the portal for seamless medical board tracking.`,
      bestRoute: `Register on swavlambancard.gov.in, choose ${targetCity} Medical Assessment block, get assessed by the local CMO Board, and claim ₹5 Lakh health cover.`,
      pros: [
        'Single document replaces 20 different state certificates',
        'Instantly unlocks high-tier railway concessions (75% off) and bus rides',
        'Integration with digital health passport (ABHA) with zero tracking issues'
      ],
      cons: [
        'Requires mandatory physical assessment by local CMO Medical Board',
        'Card production and shipping takes 45 to 60 days standard'
      ],
      comparisonTable: [
        { criterion: 'UDID Card benefit', routeA: 'National Indian eligibility & 75% rail cut', routeB: 'State Disability passes only' },
        { criterion: 'ABHA Link', routeA: 'Direct digital case records mapping', routeB: 'Requires complex individual hospital queues' }
      ],
      swot: {
        strengths: ['Ultimate supreme validation tag for PwD in India', 'Digital wallet ready on smartphone'],
        weaknesses: ['Board meets only twice a week in East Singhbhum/Ranchi', 'Medical board queue is slow'],
        opportunities: ['Get linked directly to PM-Ayushman Scheme', 'Unlock access to Red Wave Assisted Transport on launching'],
        threats: ['Inconsistent verification from previous state reports']
      },
      childFriendlySteps: [
        { stepNo: 1, title: 'Launch the Big Portal', action: 'Go to swavlambancard.gov.in and write your personal detail book lines.' },
        { stepNo: 2, title: 'Board Evaluation Picnic', action: `Go to Sadar Hospital in ${targetCity} on your assigned camp day. Say cheese to the board doctors!` },
        { stepNo: 3, title: 'Get Your Golden Card', action: 'Track online. Print the temporary PDF or wait for the physical card to fly to your house via post.' }
      ],
      supportingOrganizations: defaultOrgs
    };
  }
}

startServer();
