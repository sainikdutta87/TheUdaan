/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, User, ShieldCheck, CheckCircle2, Send, AlertCircle, RefreshCw } from 'lucide-react';
import { City } from '../types';
import { TRANSLATIONS } from '../translations';
import emailjs from '@emailjs/browser';

interface UserLoginGateProps {
  onLoginSuccess: (user: { name: string; email: string; loggedIn: boolean; city: City; lastLog: any }) => void;
  currentCity: City;
  language: 'en' | 'hi';
}

export default function UserLoginGate({ onLoginSuccess, currentCity, language }: UserLoginGateProps) {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successData, setSuccessData] = useState<any | null>(null);

  const t = TRANSLATIONS[language];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userEmail.trim()) {
      setErrorMessage(language === 'hi' ? 'कृपया अपना नाम और सही ईमेल पता दर्ज करें।' : 'Please type in a friendly name and verified email address to login.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    
    try {
      const response = await emailjs.send(
          'service_08ohh49',      // from emailjs dashboard
          'template_c96jf9v',     // from emailjs dashboard
          {
            to_email: email,
            user_name: name,
            user_city: city,
            login_time: new Date().toISOString(),
          },
          'SENfmGvtGYVPHx7pO'       // from emailjs dashboard
        );
      const data = await response.json();
      if (response.ok && data.success) {
        setSuccessData(data);
        setTimeout(() => {
          onLoginSuccess({
            name: data.user.name,
            email: data.user.email,
            loggedIn: true,
            city: data.user.city,
            lastLog: data.transparencyLog
          });
        }, 2200);
      } else {
        setErrorMessage(data.error || (language === 'hi' ? 'ईमेल प्रेषण त्रुटि। कृपया पुनः प्रयास करें।' : 'Authentication failure. Please check details or retry.'));
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(language === 'hi' ? 'सर्वर से कनेक्ट होने में समस्या। कृपया इंटरनेट की जांच करें।' : 'Network timeout connecting with Server. Please check connection and retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border-2 border-indigo-100 rounded-3xl overflow-hidden shadow-xs" id="user-login-gate-box">
      <div className="bg-indigo-950 px-6 py-6 text-white relative">
        <div className="absolute right-4 top-4 opacity-10 font-black font-display text-7xl select-none leading-none">
          ✉️
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-indigo-500/20 text-indigo-300 text-[9px] font-bold tracking-wider uppercase rounded-md border border-indigo-500/35 mb-2.5">
          <ShieldCheck size={11} className="text-indigo-300" />
          <span>{t.emailOptionalBadge}</span>
        </div>
        <h3 className="font-display font-medium text-base leading-tight">
          {t.emailInviTitle}
        </h3>
        <p className="text-xs text-indigo-200 font-light mt-1.5 leading-relaxed">
          {t.emailInviDesc}
        </p>
      </div>

      <div className="p-6">
        {!successData ? (
          <form onSubmit={handleLogin} className="space-y-4">
            
            {errorMessage && (
              <div className="bg-rose-50 border border-rose-105 p-3.5 rounded-xl flex items-start gap-2.5 text-xs text-rose-800" id="login-error-log">
                <AlertCircle size={15} className="shrink-0 mt-0.5 text-rose-600" />
                <p className="font-light">{errorMessage}</p>
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase font-display mb-1.5" htmlFor="login-name-input">
                  {t.nameLabel}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <User size={15} />
                  </span>
                  <input
                    id="login-name-input"
                    type="text"
                    required
                    placeholder={t.placeholderName}
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:border-indigo-650 focus:outline-hidden font-light text-slate-800 bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase font-display mb-1.5" htmlFor="login-email-input">
                  {t.emailLabel}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <Mail size={15} />
                  </span>
                  <input
                    id="login-email-input"
                    type="email"
                    required
                    placeholder={t.placeholderEmail}
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:border-indigo-650 focus:outline-hidden font-light text-slate-800 bg-slate-50/50"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-750 text-white font-display font-medium text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
              id="login-submit-trigger-btn"
            >
              {loading ? (
                <>
                  <RefreshCw className="animate-spin text-white" size={14} />
                  <span className="text-[11px]">{t.btnSubmittingEmail}</span>
                </>
              ) : (
                <>
                  <span>{t.btnSubmitEmail}</span>
                  <Send size={12} className="text-indigo-205" />
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-slate-400 font-light leading-relaxed">
              {t.emailPrivacyNote}
            </p>
          </form>
        ) : (
          <div className="py-2.5 text-center space-y-4" id="login-success-visual-panel">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto animate-bounce animate-duration-1000">
              <CheckCircle2 size={24} />
            </div>
            
            <div className="space-y-1.5">
              <h4 className="font-display font-bold text-slate-800 text-sm leading-none">
                {t.successTitle}
              </h4>
              <p className="text-[11px] text-emerald-800 font-semibold leading-relaxed">
                {t.successDesc}
              </p>
              <p className="text-[11px] text-slate-550 font-normal leading-relaxed">
                {language === 'hi'
                  ? `एक आधिकारिक सुगमता ब्रीफिंग ${successData.user.email} और sainikdutta87@gmail.com पर भेज दी गई है।`
                  : `An official accessibility briefing is flying to ${successData.user.email} with CC to sainikdutta87@gmail.com.`}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-100 text-left p-4 rounded-xl space-y-2 mt-4 max-h-[160px] overflow-y-auto">
              <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase font-mono font-bold leading-none border-b border-slate-100 pb-1.5">
                <span>{t.smtpLogHeader}</span>
                <span className="text-emerald-700 font-black">ACTIVE</span>
              </div>
              <div className="text-[10px] text-slate-500 font-light space-y-1 my-1 leading-snug">
                <div><strong className="text-slate-650">Sender:</strong> &lt;system.udaan@redwave.jh&gt;</div>
                <div><strong className="text-slate-650">Recipient To:</strong> {successData.user.email}</div>
                <div><strong className="text-slate-650">Recipient CC:</strong> sainikdutta87@gmail.com</div>
                <div><strong className="text-slate-650">Mail Subject:</strong> {successData.transparencyLog.subject}</div>
                <div className="pt-1.5 border-t border-slate-100/50 mt-1 italic text-[9px] text-slate-400 font-mono">
                  {language === 'hi' 
                    ? `"सत्र सुरक्षित रूप से संकलित। झारखंड की स्थानीय कल्याणकारी नियमावली ईमेल पर भेजी जा चुकी है।"`
                    : `"Access logs recorded. Local support coordinates configured for ${currentCity === 'ranchi' ? 'Ranchi' : 'Jamshedpur'}. Swavlamban guidelines added."`}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
