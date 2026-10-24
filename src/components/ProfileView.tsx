/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  User,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  Clock,
  Coins,
  MapPin,
  HeartHandshake,
  BookOpen,
  ArrowRight,
  RefreshCw,
  PhoneCall,
  ShieldCheck
} from 'lucide-react';
import { Language, UserProfile, ActiveTab } from '../types';
import { sampleDemoProfiles, generateDemoId } from '../data/demoProfilesData';
import { translations } from '../data/translations';
import { formatCurrency } from '../utils/calculator';
import { speakText } from '../utils/speech';

interface ProfileViewProps {
  lang: Language;
  userProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onNavigate: (tab: ActiveTab) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  lang,
  userProfile,
  onUpdateProfile,
  onNavigate,
}) => {
  const t = translations[lang];

  const [formData, setFormData] = useState<UserProfile>(userProfile);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSwitchDemoProfile = (demo: UserProfile) => {
    setFormData(demo);
    onUpdateProfile(demo);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
    try {
      confetti({ particleCount: 30, spread: 45 });
    } catch {
      // ignore
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
    try {
      confetti({ particleCount: 40, spread: 60 });
    } catch {
      // ignore
    }
  };

  const handleSpeakProfile = () => {
    const textToSpeak =
      lang === 'ta'
        ? `சுயவிவரம்: ${formData.name}. நிலை: ${t.profile.roles[formData.role]}. ஊர்: ${formData.location}. தெரிந்த திறன்கள்: ${formData.skills.join(', ')}. ஒதுக்கும் நேரம்: ${formData.availableHoursPerDay} மணிநேரம். ஆரம்ப சேமிப்பு: ${formatCurrency(formData.availableBudget, 'ta')}.`
        : lang === 'hi'
        ? `प्रोफाइल: ${formData.name}। स्थिति: ${t.profile.roles[formData.role]}। स्थान: ${formData.location}। हुनर: ${formData.skills.join(', ')}। उपलब्ध समय: ${formData.availableHoursPerDay} घंटे। बचत: ${formatCurrency(formData.availableBudget, 'hi')}।`
        : `Profile: ${formData.name}. Status: ${t.profile.roles[formData.role]}. Location: ${formData.location}. Skills: ${formData.skills.join(', ')}. Time: ${formData.availableHoursPerDay} hours daily. Capital: ${formatCurrency(formData.availableBudget, 'en')}.`;
    speakText(textToSpeak, lang);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-700 via-pink-700 to-purple-700 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-2">
            <User className="w-3.5 h-3.5 text-amber-300" />
            <span>{t.common.demoBadge}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            {t.profile.title}
          </h1>
          <p className="text-xs sm:text-sm text-rose-100 leading-relaxed">
            {t.profile.sub}
          </p>
        </div>
      </div>

      {/* Mandatory Hackathon Privacy & Demo Notice */}
      <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl flex items-start gap-3 text-xs text-amber-950">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold block">{t.profile.demoNotice}</span>
          <p className="text-[11px] text-amber-900 leading-relaxed">
            {t.common.realDisclaimer}
          </p>
        </div>
      </div>

      {/* Success Notification */}
      {saveSuccess && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-950 rounded-2xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-700" />
          <span>{t.profile.profileSavedNotice}</span>
        </div>
      )}

      {/* Sample Persona Quick Switcher */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-7 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-600" />
              <span>{t.profile.switchDemoTitle}</span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {lang === 'ta'
                ? 'ஹேக்கத்தான் செயல்முறை விளக்கத்திற்கு மாதிரி பயனர் சுயவிவரங்களை எளிதாக மாற்றலாம்.'
                : 'Click any sample persona below to immediately simulate different user journeys.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {sampleDemoProfiles.map((demo) => {
            const isSelected = formData.id === demo.id;
            return (
              <button
                key={demo.id}
                onClick={() => handleSwitchDemoProfile(demo)}
                className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-500 shadow-xs'
                    : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-stone-900">{demo.name}</span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-stone-200 rounded text-stone-700">
                      {demo.id}
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold text-rose-700 mb-1">
                    {t.profile.roles[demo.role]}
                  </div>
                  <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
                    {demo.bio}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-200/60 flex items-center justify-between text-[10px] text-stone-500">
                  <span>{demo.location}</span>
                  <span className="font-bold text-emerald-700">
                    {formatCurrency(demo.availableBudget, lang)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Profile Form */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex items-start justify-between border-b border-stone-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 bg-purple-100 text-purple-900 rounded-lg flex items-center gap-1.5">
                <span>{t.profile.uniqueIdLabel}</span>
                <span className="font-mono font-black">{formData.id}</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-900 rounded-full">
                Simulated ID
              </span>
            </div>
            <h2 className="text-lg font-bold text-stone-900 mt-1">
              {formData.name}
            </h2>
            <p className="text-xs text-stone-500">{formData.location}</p>
          </div>

          <button
            onClick={handleSpeakProfile}
            className="p-2 text-stone-500 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition border border-stone-200"
            title="Listen to profile details"
          >
            <span className="text-xs font-bold flex items-center gap-1">
              🔊 {t.common.listen}
            </span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-stone-700 block mb-1">
                {t.profile.nameLabel}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-medium focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">
                {t.profile.roleLabel}
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-medium focus:ring-2 focus:ring-rose-500"
              >
                <option value="homemaker">{t.profile.roles.homemaker}</option>
                <option value="dropout">{t.profile.roles.dropout}</option>
                <option value="rural_artisan">{t.profile.roles.rural_artisan}</option>
                <option value="entrepreneur">{t.profile.roles.entrepreneur}</option>
                <option value="student">{t.profile.roles.student}</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">
                {t.profile.locationLabel}
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-medium focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">
                {t.profile.languageLabel}
              </label>
              <select
                value={formData.preferredLanguage}
                onChange={(e) =>
                  setFormData({ ...formData, preferredLanguage: e.target.value as Language })
                }
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-medium focus:ring-2 focus:ring-rose-500"
              >
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="en">English</option>
                <option value="hi">हिन्दी (Hindi)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">
                {t.profile.availableTimeLabel}
              </label>
              <input
                type="number"
                min="1"
                max="12"
                value={formData.availableHoursPerDay}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    availableHoursPerDay: Math.max(1, Number(e.target.value)),
                  })
                }
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-bold focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">
                {t.profile.budgetLabel}
              </label>
              <input
                type="number"
                min="0"
                step="500"
                value={formData.availableBudget}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    availableBudget: Math.max(0, Number(e.target.value)),
                  })
                }
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-bold focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-stone-700 block mb-1">
              {t.profile.skillsLabel} (comma separated)
            </label>
            <input
              type="text"
              value={formData.skills.join(', ')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  skills: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                })
              }
              placeholder="e.g. Tailoring, Cooking, Pickles, Embroidery"
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-medium focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="font-bold text-stone-700 block mb-1">
              {t.profile.bioLabel}
            </label>
            <textarea
              rows={2}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-medium focus:ring-2 focus:ring-rose-500 resize-none"
            />
          </div>

          {/* Trusted Emergency Contact Settings */}
          <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 font-bold text-rose-950">
              <PhoneCall className="w-4 h-4 text-rose-600" />
              <span>{t.emergency.sosShareTitle}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-stone-700 block mb-0.5">
                  {t.profile.trustedContactLabel}
                </label>
                <input
                  type="text"
                  value={formData.trustedContactName || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, trustedContactName: e.target.value })
                  }
                  placeholder="e.g. Sister / Mother / SHG Leader"
                  className="w-full p-2 bg-white border border-rose-200 rounded-xl"
                />
              </div>
              <div>
                <label className="font-semibold text-stone-700 block mb-0.5">
                  {t.profile.trustedPhoneLabel}
                </label>
                <input
                  type="tel"
                  value={formData.trustedContactPhone || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, trustedContactPhone: e.target.value })
                  }
                  placeholder="e.g. 9840123456"
                  className="w-full p-2 bg-white border border-rose-200 rounded-xl"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                const newId = generateDemoId();
                setFormData({ ...formData, id: newId });
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-stone-600 hover:text-stone-900 border border-stone-200 rounded-xl"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{lang === 'ta' ? 'புதிய Demo ID உருவாக்கு' : 'Regenerate Demo ID'}</span>
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-xs transition"
            >
              {t.profile.saveProfileBtn}
            </button>
          </div>
        </form>
      </div>

      {/* Cross-Feature Connections Card */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-3xl p-5 sm:p-7 space-y-3">
        <h3 className="text-sm font-bold text-purple-950 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-purple-700" />
          <span>{t.profile.connectedInfo}</span>
        </h3>
        <p className="text-xs text-purple-900 leading-relaxed">
          {lang === 'ta'
            ? `உங்கள் திறன்கள் (${formData.skills.join(', ')}) மற்றும் சேமிப்பு (${formatCurrency(formData.availableBudget, lang)}) அடிப்படையில் பரிந்துரைக்கப்படும் அடுத்த படிகள்:`
            : `Based on your skills (${formData.skills.join(', ')}) and starting capital (${formatCurrency(formData.availableBudget, lang)}), here are your direct next steps:`}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          <button
            onClick={() => onNavigate('business-generator')}
            className="p-3 bg-white border border-purple-200 rounded-xl text-left hover:border-purple-400 transition"
          >
            <div className="font-bold text-xs text-stone-900">
              {t.nav.businessGenerator}
            </div>
            <div className="text-[11px] text-stone-500 line-clamp-1">
              {lang === 'ta' ? 'திறன் சார்ந்த திட்டம்' : 'Generate matched plan'}
            </div>
          </button>

          <button
            onClick={() => onNavigate('skills-learning')}
            className="p-3 bg-white border border-purple-200 rounded-xl text-left hover:border-purple-400 transition"
          >
            <div className="font-bold text-xs text-stone-900">
              {t.nav.skillsLearning}
            </div>
            <div className="text-[11px] text-stone-500 line-clamp-1">
              {lang === 'ta' ? 'புதிய பாடங்கள் படிக்க' : 'Explore skill courses'}
            </div>
          </button>

          <button
            onClick={() => onNavigate('schemes')}
            className="p-3 bg-white border border-purple-200 rounded-xl text-left hover:border-purple-400 transition"
          >
            <div className="font-bold text-xs text-stone-900">
              {t.nav.schemes}
            </div>
            <div className="text-[11px] text-stone-500 line-clamp-1">
              {lang === 'ta' ? 'தகுதியான அரசு சலுகைகள்' : 'Check matching schemes'}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
