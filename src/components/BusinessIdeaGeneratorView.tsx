/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Printer,
  Volume2,
  CheckCircle2,
  Coins,
  Clock,
  MapPin,
  Users,
  ShieldAlert,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { Language, BusinessPlan } from '../types';
import { generateCustomBusinessPlan } from '../data/businessIdeasData';
import { translations } from '../data/translations';
import { speakText } from '../utils/speech';
import { formatCurrency } from '../utils/calculator';

interface BusinessIdeaGeneratorViewProps {
  lang: Language;
}

export const BusinessIdeaGeneratorView: React.FC<BusinessIdeaGeneratorViewProps> = ({
  lang,
}) => {
  const t = translations[lang];

  const [skill, setSkill] = useState<string>('cooking');
  const [hours, setHours] = useState<string>('1-2');
  const [budget, setBudget] = useState<string>('low');
  const [location, setLocation] = useState<string>('home');

  const [generatedPlan, setGeneratedPlan] = useState<BusinessPlan | null>(() =>
    generateCustomBusinessPlan({ skill: 'cooking', hours: '1-2', budget: 'low', location: 'home' })
  );

  const handleGenerate = () => {
    const plan = generateCustomBusinessPlan({ skill, hours, budget, location });
    setGeneratedPlan(plan);

    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  };

  const handleSpeakPlan = () => {
    if (!generatedPlan) return;
    const textToSpeak =
      lang === 'ta'
        ? `${generatedPlan.titleTa}. ${generatedPlan.summaryTa}. எதிர்பார்க்கப்படும் மாத வருமானம்: ${generatedPlan.expectedMonthlyIncomeTa}. ஆரம்ப முதலீடு: ${formatCurrency(generatedPlan.estimatedBudget, 'ta')}. முதல் 10 வாடிக்கையாளர்களை பெற: ${generatedPlan.firstCustomersStrategyTa.join('. ')}.`
        : `${generatedPlan.title}. ${generatedPlan.summary}. Expected monthly income: ${generatedPlan.expectedMonthlyIncome}. Initial investment: ${formatCurrency(generatedPlan.estimatedBudget, 'en')}. Customer strategy: ${generatedPlan.firstCustomersStrategy.join('. ')}.`;
    speakText(textToSpeak, lang);
  };

  const handlePrintPlan = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-pink-700 to-rose-700 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-2">
            {lang === 'ta' ? 'சுயதொழில் திட்டம்' : 'Custom Enterprise Planner'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            {t.business.title}
          </h1>
          <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
            {t.business.sub}
          </p>

          <div className="mt-5 flex items-center gap-3">
            <button
              onClick={() =>
                speakText(
                  lang === 'ta'
                    ? 'தொழில் யோசனை உருவாக்கி. உங்கள் கையில் உள்ள சேமிப்பு, உங்களால் ஒதுக்க முடிந்த நேரம் மற்றும் உங்களுக்கு தெரிந்த திறனை தேர்வு செய்து, எனக்கான தொழில் திட்டத்தை உருவாக்கு பொத்தானை அழுத்தவும்.'
                    : 'Custom Business Idea Generator. Select your skill, available hours, and budget to receive an actionable launch roadmap.',
                  lang
                )
              }
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white text-purple-900 hover:bg-purple-50 rounded-full font-bold text-xs transition shadow-xs"
            >
              <Volume2 className="w-4 h-4 text-purple-600" />
              <span>{t.common.listen}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Generator Configuration Form */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-7 shadow-2xs space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Skill Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-800 block">
              {t.business.step1Skill}
            </label>
            <select
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="w-full text-xs font-medium p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-purple-500"
            >
              <option value="cooking">
                {lang === 'ta' ? 'சமையல் & உணவுப் பொருட்கள்' : 'Cooking & Food Making'}
              </option>
              <option value="tailoring">
                {lang === 'ta' ? 'தையல் & ஆரி வேலைப்பாடு' : 'Tailoring & Embroidery'}
              </option>
              <option value="agriculture">
                {lang === 'ta' ? 'நாட்டுக்கோழி / கால்நடை / காளான்' : 'Poultry / Dairy / Mushrooms'}
              </option>
              <option value="teaching">
                {lang === 'ta' ? 'டியூஷன் / குழந்தைகள் கல்வி' : 'Tuition & Child Teaching'}
              </option>
            </select>
          </div>

          {/* 2. Daily Hours */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-800 block">
              {t.business.step2Hours}
            </label>
            <select
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="w-full text-xs font-medium p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-purple-500"
            >
              <option value="1-2">
                {lang === 'ta' ? 'தினமும் 1 - 2 மணி நேரம் (ஓய்வு நேரம்)' : '1 - 2 Hours (Household leisure)'}
              </option>
              <option value="3-4">
                {lang === 'ta' ? 'தினமும் 3 - 4 மணி நேரம் (பகுதி நேரம்)' : '3 - 4 Hours (Part-time)'}
              </option>
              <option value="fullday">
                {lang === 'ta' ? 'முழு நாள் (Dedicated Day)' : 'Full Day'}
              </option>
            </select>
          </div>

          {/* 3. Budget */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-800 block">
              {t.business.step3Budget}
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full text-xs font-medium p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-purple-500"
            >
              <option value="low">
                {lang === 'ta' ? '₹500 முதல் ₹1,500-க்குள்' : 'Under ₹1,500 (Low budget)'}
              </option>
              <option value="medium">
                {lang === 'ta' ? '₹2,000 முதல் ₹5,000 வரை' : '₹2,000 to ₹5,000 (Medium)'}
              </option>
              <option value="high">
                {lang === 'ta' ? '₹10,000-க்கு மேல் (SHG கடன் மூலம்)' : 'Above ₹10,000 (SHG Loan)'}
              </option>
            </select>
          </div>

          {/* 4. Location */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-800 block">
              {t.business.step4Location}
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full text-xs font-medium p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-purple-500"
            >
              <option value="home">
                {lang === 'ta' ? 'வீட்டிலேயே (தாழ்வாரம் / சமையலறை)' : 'From Home (Kitchen/Veranda)'}
              </option>
              <option value="village_market">
                {lang === 'ta' ? 'கிராம சந்தை / பஜார்' : 'Village Market / Bazaar'}
              </option>
              <option value="mobile_delivery">
                {lang === 'ta' ? 'அக்கம்பக்கத்து வீடு விநியோகம்' : 'Door-to-door delivery'}
              </option>
            </select>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={handleGenerate}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-700 hover:to-rose-700 text-white font-bold text-xs rounded-xl shadow-md transition active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{t.business.generateBtn}</span>
          </button>
        </div>
      </div>

      {/* Generated Actionable Plan Display */}
      {generatedPlan && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
          {/* Plan Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
            <div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 mb-1 inline-block">
                {lang === 'ta' ? 'உங்களுக்கான பரிந்துரை' : 'Custom Generated Blueprint'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 leading-snug">
                {lang === 'ta' ? generatedPlan.titleTa : generatedPlan.title}
              </h2>
              <p className="text-xs text-stone-600 mt-1 max-w-2xl">
                {lang === 'ta' ? generatedPlan.summaryTa : generatedPlan.summary}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleSpeakPlan}
                className="p-2 text-stone-500 hover:text-purple-600 rounded-xl hover:bg-purple-50 transition border border-stone-200"
                title="Listen"
                aria-label="Listen to business plan"
              >
                <Volume2 className="w-4 h-4" />
              </button>

              <button
                onClick={handlePrintPlan}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{t.business.printPlan}</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
              <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">
                {t.skills.potentialIncome}
              </div>
              <div className="text-lg font-extrabold text-emerald-950 mt-0.5">
                {lang === 'ta'
                  ? generatedPlan.expectedMonthlyIncomeTa
                  : generatedPlan.expectedMonthlyIncome}
              </div>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl">
              <div className="text-[11px] font-bold text-purple-800 uppercase tracking-wide">
                {lang === 'ta' ? 'தேவையான ஆரம்ப முதலீடு:' : 'Initial Capital Required:'}
              </div>
              <div className="text-lg font-extrabold text-purple-950 mt-0.5">
                {formatCurrency(generatedPlan.estimatedBudget, lang)}
              </div>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl">
              <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wide">
                {lang === 'ta' ? 'தினசரி நேரம்:' : 'Daily Time:'}
              </div>
              <div className="text-lg font-extrabold text-amber-950 mt-0.5">
                {lang === 'ta'
                  ? generatedPlan.dailyTimeRequiredTa
                  : generatedPlan.dailyTimeRequired}
              </div>
            </div>
          </div>

          {/* Budget Breakdown Table */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-purple-600" />
              <span>{t.business.budgetBreakdownTitle}</span>
            </h3>

            <div className="border border-stone-200 rounded-2xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-700 font-bold">
                  <tr>
                    <th className="p-3">{lang === 'ta' ? 'பொருள் / செலவு' : 'Item / Expense'}</th>
                    <th className="p-3 text-right">{lang === 'ta' ? 'தொகை (₹)' : 'Amount (₹)'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {generatedPlan.budgetBreakdown.map((item, idx) => (
                    <tr key={idx} className="hover:bg-stone-50/50">
                      <td className="p-3 text-stone-800">
                        {lang === 'ta' ? item.itemTa : item.item}
                      </td>
                      <td className="p-3 text-right font-bold text-stone-900">
                        {formatCurrency(item.amount, lang)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-purple-50/50 font-bold text-purple-950">
                    <td className="p-3">{lang === 'ta' ? 'மொத்தம்' : 'Total'}</td>
                    <td className="p-3 text-right">
                      {formatCurrency(generatedPlan.estimatedBudget, lang)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 4 Launch Steps Timeline */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-stone-900">
              {t.business.roadmapTitle}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {generatedPlan.stepsToLaunch.map((step) => (
                <div
                  key={step.step}
                  className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-purple-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                      {step.step}
                    </span>
                    <h4 className="text-xs font-bold text-stone-900">
                      {lang === 'ta' ? step.titleTa : step.title}
                    </h4>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed pl-7">
                    {lang === 'ta' ? step.descTa : step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* First 10 Customers Strategy */}
          <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl space-y-2">
            <h3 className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-600" />
              <span>{t.business.customersTitle}</span>
            </h3>
            <ul className="text-xs text-emerald-900 space-y-1.5">
              {(lang === 'ta'
                ? generatedPlan.firstCustomersStrategyTa
                : generatedPlan.firstCustomersStrategy
              ).map((strat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{strat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Caution and Safety */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-amber-900 block mb-0.5">
                {t.business.cautionTitle}
              </span>
              <p className="text-xs text-amber-950 leading-relaxed font-medium">
                {lang === 'ta' ? generatedPlan.cautionAdviceTa : generatedPlan.cautionAdvice}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
