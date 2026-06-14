/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Type, 
  Eye, 
  Sparkles, 
  BookOpen, 
  CornerDownRight, 
  EyeOff, 
  X,
  Languages,
  Activity
} from 'lucide-react';

interface AccessibilitySuiteProps {
  fontSize: number; // 100, 125, 150
  setFontSize: (size: number) => void;
  highContrast: 'normal' | 'contrast' | 'cream' | 'monochrome';
  setHighContrast: (mode: 'normal' | 'contrast' | 'cream' | 'monochrome') => void;
  dyslexicFont: boolean;
  setDyslexicFont: (active: boolean) => void;
  voiceAssist: boolean;
  setVoiceAssist: (active: boolean) => void;
  reducedMotion: boolean;
  setReducedMotion: (active: boolean) => void;
}

export default function AccessibilitySuite({
  fontSize,
  setFontSize,
  highContrast,
  setHighContrast,
  dyslexicFont,
  setDyslexicFont,
  voiceAssist,
  setVoiceAssist,
  reducedMotion,
  setReducedMotion
}: AccessibilitySuiteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSpeech, setActiveSpeech] = useState<SpeechSynthesisUtterance | null>(null);

  // Play a quick chime or read aloud the activated status
  const speakText = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel(); // Stop any current speech
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = 1;
    utterance.rate = 1.05;
    utterance.pitch = 1.1; // Friendly and high pitches
    
    // Choose an English voice with indian accent if possible or default helpful voice
    const voices = window.speechSynthesis.getVoices();
    const targetVoice = voices.find(v => v.lang.includes('IN') || v.lang.includes('GB') || v.lang.includes('US'));
    if (targetVoice) utterance.voice = targetVoice;

    window.speechSynthesis.speak(utterance);
    setActiveSpeech(utterance);
  };

  // Setup live hover narrative triggers across the whole app
  useEffect(() => {
    if (!voiceAssist) {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      return;
    }

    speakText("Screen Narrator is now active. Hover over or tap any text or card to hear it described.");

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      // Track elements with text or specific labels
      const hasTtsAttr = target.closest('[data-tts="true"]');
      const isHeaderOrText = target.tagName.match(/^(H1|H2|H3|H4|P|BUTTON|LI|SPAN)$/) && (target.textContent || '').length < 250;
      
      const readableElement = hasTtsAttr || (isHeaderOrText ? target : null);
      
      if (readableElement) {
        const textToRead = readableElement.getAttribute('aria-label') || readableElement.textContent;
        if (textToRead) {
          // Debounce slightly to avoid rapid trigger
          speakText(textToRead.trim());
        }
      }
    };

    document.addEventListener('mouseover', handleHover);
    return () => {
      document.removeEventListener('mouseover', handleHover);
    };
  }, [voiceAssist]);

  // Set HTML root classes corresponding to settings
  useEffect(() => {
    const root = document.documentElement;
    
    // 1. Text sizing
    root.style.fontSize = fontSize === 100 ? '16px' : fontSize === 125 ? '20px' : '24px';
    
    // 2. High Contrast class toggles
    root.classList.remove('theme-high-contrast', 'theme-cream', 'theme-monochrome');
    if (highContrast === 'contrast') {
      root.classList.add('theme-high-contrast');
    } else if (highContrast === 'cream') {
      root.classList.add('theme-cream');
    } else if (highContrast === 'monochrome') {
      root.classList.add('theme-monochrome');
    }

    // 3. Dyslexic layout spacing
    if (dyslexicFont) {
      root.classList.add('theme-dyslexic-spacing');
    } else {
      root.classList.remove('theme-dyslexic-spacing');
    }
  }, [fontSize, highContrast, dyslexicFont]);

  // Read current active accessibility configuration out loud
  const triggerSelfExplain = () => {
    const speechLines = [
      `Accessibility Level is currently adjusted.`,
      `Text Size level set to ${fontSize}%`,
      `Contrast Theme matches ${highContrast === 'contrast' ? 'High Contrast Black and Gold' : highContrast === 'cream' ? 'Warm Eye Care Cream' : 'Normal Light Colorway'}`,
      `Dyslexia tracking helper is ${dyslexicFont ? 'Active' : 'Deactivated'}`,
      `Voice Narrative Assistant is ${voiceAssist ? 'Listening and Active' : 'Off'}`
    ].join('. ');
    speakText(speechLines);
  };

  return (
    <div className="fixed bottom-6 left-6 z-55 print:hidden" id="accessibility-suite-anchor-id">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            speakText("Accessibility options panel opened. Tap options to adapt the layout.");
          }}
          className="h-14 w-14 bg-indigo-750 hover:bg-indigo-900 border border-indigo-400 text-white rounded-full shadow-lg flex items-center justify-center cursor-pointer relative group transition-all animate-bounce"
          aria-label="Open disability accessibility adjustments bar"
          id="accessibility-launcher-btn"
        >
          <div className="absolute -top-1 -right-1 bg-rose-500 rounded-full h-4 w-4 animate-ping"></div>
          <div className="absolute -top-1 -right-1 bg-rose-500 rounded-full h-4 w-4 flex items-center justify-center text-[10px] font-bold text-white leading-none">★</div>
          <Eye size={24} className="group-hover:scale-110 transition-transform" />
          <span className="absolute left-16 bg-slate-900 text-white text-[10px] uppercase font-bold py-1 px-2.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
            ♿ Adapt Accessibility
          </span>
        </button>
      )}

      {/* Floating Expanded Accommodations Suite */}
      {isOpen && (
        <div 
          className="bg-white border-2 border-indigo-200 p-5 rounded-3xl shadow-2xl w-[320px] space-y-5 transition-all max-h-[85vh] overflow-y-auto"
          id="accessibility-options-panel-box"
        >
          {/* Controls title */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="space-y-0.5">
              <span className="text-[9px] font-bold tracking-wider text-indigo-700 uppercase font-display block">Sovereign Compliance</span>
              <h4 className="font-display font-bold text-slate-800 text-sm flex items-center gap-1.5 leading-none">
                ♿ Inclusivity Adjuster
              </h4>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                if (window.speechSynthesis) window.speechSynthesis.cancel();
              }}
              className="p-1 text-slate-400 hover:text-slate-800 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
              aria-label="Close panel"
            >
              <X size={16} />
            </button>
          </div>

          <div className="space-y-4">
            
            {/* 1. Voice Assist Screen Reader */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-display">
                🗣️ Screen Voice Narrator (Auditory)
              </span>
              <button
                onClick={() => setVoiceAssist(!voiceAssist)}
                className={`w-full p-2.5 rounded-xl border flex items-center gap-2.5 cursor-pointer text-xs transition-all ${
                  voiceAssist 
                    ? 'bg-rose-50 border-rose-300 text-rose-800 font-bold' 
                    : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-650'
                }`}
                aria-label={`Toggle Screen read-aloud system. Currently ${voiceAssist ? 'on' : 'off'}`}
              >
                {voiceAssist ? <Volume2 size={16} className="text-rose-600 animate-pulse" /> : <VolumeX size={16} className="text-slate-400" />}
                <div className="text-left flex-1 leading-tight">
                  <span className="block text-xs">Hover Read Aloud</span>
                  <span className="text-[9px] font-light text-slate-450 block">Speak labels out loud when hovered</span>
                </div>
                {voiceAssist && (
                  <span className="text-[8px] bg-rose-200 text-rose-800 font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-widest font-mono">
                    LIVE
                  </span>
                )}
              </button>
            </div>

            {/* 2. Text Scaling */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-display">
                📐 Text Size Expansion (Visual)
              </span>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/50">
                {[100, 125, 150].map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setFontSize(size);
                      speakText(`Text scaled to ${size} percent`);
                    }}
                    className={`py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                      fontSize === size
                        ? 'bg-indigo-600 text-white shadow-xs font-black'
                        : 'text-slate-600 hover:text-slate-900 bg-white/50'
                    }`}
                  >
                    {size === 100 ? 'Standard' : size === 125 ? '1.25x' : '1.50x'}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Custom Dyslexia and Visual Readability Adjust */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-display">
                📖 Cognitive Reading (Tracking)
              </span>
              <button
                onClick={() => {
                  setDyslexicFont(!dyslexicFont);
                  speakText(dyslexicFont ? "Standard spacing restored" : "Wide tracking activated to improve word separation");
                }}
                className={`w-full p-2.5 rounded-xl border flex items-center gap-2.5 cursor-pointer text-xs transition-all ${
                  dyslexicFont 
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-800 font-bold' 
                    : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-650'
                }`}
              >
                <BookOpen size={15} className={dyslexicFont ? 'text-indigo-600' : 'text-slate-400'} />
                <div className="text-left flex-1 leading-tight">
                  <span className="block text-xs">Wide Spacing (Dyslexia Friendly)</span>
                  <span className="text-[9px] font-light text-slate-450 block">Increases character spacing & margins</span>
                </div>
              </button>
            </div>

            {/* 4. Contrast Themes */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-display">
                🎨 Contrast Accommodations
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'normal', name: '🎨 Light Standard' },
                  { id: 'contrast', name: '🖤 High Contrast Gold' },
                  { id: 'cream', name: '🍦 Eye-Care Sepia' },
                  { id: 'monochrome', name: '💿 Gray Grayscale' }
                ].map((th) => (
                  <button
                    key={th.id}
                    onClick={() => {
                      setHighContrast(th.id as any);
                      speakText(`Contrast theme changed to ${th.name}`);
                    }}
                    className={`p-2 rounded-xl text-[10px] border font-medium text-left leading-tight cursor-pointer transition-all ${
                      highContrast === th.id
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold shadow-xs'
                        : 'border-slate-100 bg-white hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <span>{th.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Reduced Motion for Vestibular / Seizure safety */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-display">
                ⚡ Motion Safeguards
              </span>
              <button
                onClick={() => {
                  setReducedMotion(!reducedMotion);
                  speakText(reducedMotion ? "Animations restored" : "Transitions frozen to prevent motion sickness");
                }}
                className={`w-full p-2.5 rounded-xl border flex items-center gap-2.5 cursor-pointer text-xs transition-all ${
                  reducedMotion 
                    ? 'bg-amber-50 border-amber-300 text-amber-800 font-bold' 
                    : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-650'
                }`}
              >
                <Activity size={15} className={reducedMotion ? 'text-amber-600' : 'text-slate-400'} />
                <div className="text-left leading-tight flex-1">
                  <span className="block text-xs">Reduced Motion (Freeze animations)</span>
                  <span className="text-[9px] font-light text-slate-450 block">Safeguards against flashing or fast loops</span>
                </div>
              </button>
            </div>

          </div>

          {/* Read Status Summary Button */}
          <button
            onClick={triggerSelfExplain}
            className="w-full py-2.5 bg-slate-900 hover:bg-black text-white text-[11px] font-bold rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-3xs transition-all"
            id="read-current-state-speech-btn"
          >
            <Sparkles size={12} className="text-yellow-400 animate-spin" />
            <span>🔊 Read My Status Out-Loud</span>
          </button>
        </div>
      )}
    </div>
  );
}
