/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  ShieldCheck,
  Smartphone,
  ExternalLink,
  Volume2,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Clock,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Language, EducationOpportunity } from '../types';
import { educationData } from '../data/educationData';
import { translations } from '../data/translations';
import { speakText } from '../utils/speech';

interface EducationViewProps {
  lang: Language;
}

export const EducationView: React.FC<EducationViewProps> = ({ lang }) => {
  const t = translations[lang];
  const [selectedCourse, setSelectedCourse] = useState<EducationOpportunity | null>(null);
  const [activeTab, setActiveTab] = useState<'re-enroll' | 'digital-safety' | 'courses'>('re-enroll');

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-2">
            {lang === 'ta' ? 'இரண்டாம் வாய்ப்பு & முன்னேற்றம்' : 'Second Chances & Lifelong Learning'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            {t.education.title}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            {t.education.sub}
          </p>

          <div className="mt-5 flex items-center gap-3">
            <button
              onClick={() =>
                speakText(
                  lang === 'ta'
                    ? 'கல்வி வாய்ப்புகள் பகுதி. நீங்கள் குடும்பச் சூழலால் 6, 7 அல்லது 8-ஆம் வகுப்போடு படிப்பை நிறுத்தியிருந்தாலும், வீட்டில் இருந்தபடியே தேசிய திறந்தநிலைப் பள்ளி மூலம் 10-ஆம் வகுப்பு முடிக்கலாம். மேலும் டிஜிட்டல் பாதுகாப்பு வழிகாட்டிகளும் உள்ளன.'
                    : 'Education Opportunities. Complete your 10th standard or college degree from home through open universities without attending regular classes.',
                  lang
                )
              }
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white text-emerald-800 hover:bg-emerald-50 rounded-full font-bold text-xs transition shadow-xs"
            >
              <Volume2 className="w-4 h-4 text-emerald-700" />
              <span>{t.common.listen}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Nav pill tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('re-enroll')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition whitespace-nowrap ${
            activeTab === 're-enroll'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          {lang === 'ta' ? 'படிப்பை மீண்டும் தொடங்கும் முறை' : 'Restarting Studies Guide'}
        </button>

        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition whitespace-nowrap ${
            activeTab === 'courses'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          {lang === 'ta' ? 'படிப்பு & சான்றிதழ் விவரங்கள்' : 'Open Courses & Degrees'}
        </button>

        <button
          onClick={() => setActiveTab('digital-safety')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition whitespace-nowrap ${
            activeTab === 'digital-safety'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          {lang === 'ta' ? 'ஸ்மார்ட்போன் & UPI பாதுகாப்பு' : 'Smartphone & UPI Safety'}
        </button>
      </div>

      {/* Tab 1: Re-enrollment Roadmap for Dropouts */}
      {activeTab === 're-enroll' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-stone-900">
                  {t.education.reEnrollmentGuideTitle}
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  {lang === 'ta'
                    ? '10 அல்லது 20 ஆண்டுகளுக்கு முன் படிப்பை நிறுத்தியிருந்தாலும் தயங்க வேண்டாம்; அரசு சட்டப்படி உங்களுக்கு கல்வி உரிமை உண்டு.'
                    : 'Even if you discontinued 10 or 20 years ago, Indian open schooling laws guarantee your right to complete board examinations.'}
                </p>
              </div>
              <button
                onClick={() =>
                  speakText(
                    lang === 'ta'
                      ? 'படிப்பை மீண்டும் தொடங்குவது எப்படி? படி 1: முந்தைய பள்ளி சான்றிதழ் இல்லை என்றாலும் சுய உறுதிமொழி மூலம் NIOS 10-ஆம் வகுப்பில் நேரடியாக சேரலாம். படி 2: வீட்டில் இருந்தே படிக்கலாம். படி 3: எளிதான 5 பாடங்களை தேர்வு செய்து தேர்ச்சி பெறலாம்.'
                      : 'How to restart education: Step 1, apply directly to NIOS even without previous TC. Step 2, study from home with Tamil textbooks. Step 3, write exams in flexible installments.',
                    lang
                  )
                }
                className="p-2 text-stone-400 hover:text-emerald-600 rounded-full hover:bg-emerald-50 transition"
                aria-label="Listen"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* 4 Step Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h3 className="text-xs font-bold text-emerald-950">
                    {lang === 'ta' ? 'சான்றிதழ் இல்லை என்றாலும் சேரலாம்' : 'No TC? Direct Self-Declaration'}
                  </h3>
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  {lang === 'ta'
                    ? 'பழைய பள்ளி டிசி (TC) தொலைந்து விட்டதா? கவலை வேண்டாம்! உங்கள் ஆதார் அட்டை மற்றும் வயது சான்றிதழை (14 வயதுக்கு மேல்) கொண்டு தேசிய திறந்தநிலை பள்ளியில் (NIOS) நேரடியாக 10-ஆம் வகுப்பில் சேரலாம்.'
                    : 'If your old school Transfer Certificate is misplaced, you can enroll directly in NIOS 10th standard based on an age certificate and Aadhaar self-declaration.'}
                </p>
              </div>

              <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h3 className="text-xs font-bold text-teal-950">
                    {lang === 'ta' ? 'எளிய 5 பாடங்கள் தேர்வு' : 'Choose 5 Friendly Subjects'}
                  </h3>
                </div>
                <p className="text-xs text-teal-900 leading-relaxed">
                  {lang === 'ta'
                    ? 'கடினமான கணிதம் அல்லது அறிவியலுக்கு பதில், தமிழ், ஆங்கிலம், மனையியல் (Home Science), ஓவியக் கலை (Painting), மற்றும் கம்ப்யூட்டர் தரவு பதிவு (Data Entry) போன்ற எளிய நடைமுறை பாடங்களை தேர்வு செய்யலாம்.'
                    : 'Instead of difficult calculus, choose practical scoring subjects like Tamil/English, Home Science, Data Entry, and Painting.'}
                </p>
              </div>

              <div className="p-4 bg-cyan-50/70 border border-cyan-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-cyan-600 text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h3 className="text-xs font-bold text-cyan-950">
                    {lang === 'ta' ? 'இலவச பாடப்புத்தகங்கள் & வீட்டு கற்றல்' : 'Free Textbooks Delivered to Home'}
                  </h3>
                </div>
                <p className="text-xs text-cyan-900 leading-relaxed">
                  {lang === 'ta'
                    ? 'பதிவு செய்தவுடன் அரசு எளிய தமிழ் வழியில் அச்சிடப்பட்ட புத்தகங்களை உங்கள் வீட்டிற்கே தபாலில் அனுப்பும். தினமும் பள்ளி செல்ல வேண்டிய அவசியமில்லை; ஓய்வு நேரத்தில் வீட்டில் படிக்கலாம்.'
                    : 'Comprehensive Tamil/English textbooks are mailed directly to your address. Study at your own pace during afternoon household leisure hours.'}
                </p>
              </div>

              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center">
                    4
                  </span>
                  <h3 className="text-xs font-bold text-amber-950">
                    {lang === 'ta' ? 'தவணை முறையில் தேர்வு எழுதும் வசதி' : 'Write Exams in Easy Installments'}
                  </h3>
                </div>
                <p className="text-xs text-amber-900 leading-relaxed">
                  {lang === 'ta'
                    ? 'ஒரே நேரத்தில் 5 பாடங்களையும் எழுத வேண்டிய கட்டாயமில்லை! இந்த ஆண்டு 2 பாடம், அடுத்த ஆண்டு 3 பாடம் என 5 ஆண்டுகளுக்குள் எப்போது வேண்டுமானாலும் எழுதி சான்றிதழ் பெறலாம்.'
                    : 'You have up to 5 years and 9 attempts to pass. Clear 2 subjects first, then complete the remaining 3 at your comfort.'}
                </p>
              </div>
            </div>

            {/* Reassurance Callout */}
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-rose-600 shrink-0" />
              <p className="text-xs text-rose-950 font-medium">
                {lang === 'ta'
                  ? 'நினைவில் கொள்ளுங்கள்: NIOS சான்றிதழ் வழக்கமான மாநில போர்டு (State Board) 10 மற்றும் 12-ஆம் வகுப்பு சான்றிதழுக்கு 100% சமமானது. அரசு வேலை மற்றும் கல்லூரி சேர்க்கைக்கு முழு தகுதியுடையது.'
                  : 'Important Note: NIOS marksheets are 100% equivalent to regular CBSE/State Board certificates for all government jobs, college admissions, and passports.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Courses & Opportunities Directory */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
          {educationData.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {lang === 'ta' ? course.highlightTa : course.highlight}
                  </span>
                  <button
                    onClick={() =>
                      speakText(
                        lang === 'ta'
                          ? `${course.titleTa}. நிறுவனம்: ${course.providerTa}. ${course.descriptionTa}. கட்டணம்: ${course.feesTa}.`
                          : `${course.title}. Provider: ${course.provider}. ${course.description}. Fees: ${course.fees}.`,
                        lang
                      )
                    }
                    className="p-1 text-stone-400 hover:text-emerald-600 rounded-full"
                    aria-label="Listen"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-base font-bold text-stone-900 leading-snug mb-1">
                  {lang === 'ta' ? course.titleTa : course.title}
                </h3>

                <p className="text-xs text-emerald-700 font-semibold mb-2">
                  {lang === 'ta' ? course.providerTa : course.provider}
                </p>

                <p className="text-xs text-stone-600 leading-relaxed mb-3">
                  {lang === 'ta' ? course.descriptionTa : course.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 bg-stone-50 p-2.5 rounded-xl">
                  <div>
                    <span className="font-bold text-stone-700 block">
                      {lang === 'ta' ? 'கால அளவு:' : 'Duration:'}
                    </span>
                    <span>{lang === 'ta' ? course.durationTa : course.duration}</span>
                  </div>
                  <div>
                    <span className="font-bold text-stone-700 block">
                      {lang === 'ta' ? 'கட்டணம்:' : 'Fees:'}
                    </span>
                    <span className="text-emerald-700 font-semibold">
                      {lang === 'ta' ? course.feesTa : course.fees}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-stone-500 font-mono text-[11px]">
                  {course.contactOrLink}
                </span>

                <button
                  onClick={() => setSelectedCourse(course)}
                  className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl transition"
                >
                  {t.common.viewDetails}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Digital Literacy & UPI Safety */}
      {activeTab === 'digital-safety' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-2xs space-y-6 animate-fadeIn">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-cyan-100 text-cyan-800 rounded-2xl">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-stone-900">
                  {t.education.digitalLiteracyTitle}
                </h2>
                <p className="text-xs text-stone-500">
                  {lang === 'ta'
                    ? 'செல்போன் மூலம் பணப்பரிவர்த்தனை செய்யும் போது உங்கள் பணத்தை ஏமாற்றுக்காரர்களிடம் இருந்து காப்பாற்ற 3 பொன் விதிகள்.'
                    : 'Crucial practical safety rules to protect your hard-earned money from mobile scammers.'}
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                speakText(
                  lang === 'ta'
                    ? 'டிஜிட்டல் பாதுகாப்பு முக்கிய விதிகள்: விதி ஒன்று: கூகுள் பே அல்லது போன்பே மூலம் உங்களுக்கு பணம் வரவு வைக்கும் போது நீங்கள் PIN எண் போடத் தேவையில்லை. யாராவது பணம் அனுப்புகிறேன் என்று PIN போடச் சொன்னால் அது 100% மோசடி. விதி இரண்டு: வங்கி மேலாளர் என்று சொல்லி பேசினாலும் யாருக்கும் OTP அல்லது பாஸ்வேர்டை பகிராதீர்கள்.'
                    : 'Digital safety golden rules: Rule 1, you NEVER enter your UPI PIN to receive money. If someone asks you to enter your PIN to get cash, it is a scam. Rule 2, never share your OTP with anyone.',
                  lang
                )
              }
              className="p-2 text-stone-400 hover:text-cyan-600 rounded-full hover:bg-cyan-50"
              aria-label="Listen"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive Golden Safety Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Rule 1 */}
            <div className="p-5 rounded-2xl border-2 border-rose-300 bg-rose-50/60 space-y-2">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-xs">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>{lang === 'ta' ? 'விதி 1: பணம் பெற PIN தேவையில்லை!' : 'Rule 1: Never Enter PIN to Receive Money'}</span>
              </div>
              <p className="text-xs text-rose-950 font-medium leading-relaxed">
                {t.education.upiSafety1}
              </p>
              <div className="text-[11px] bg-white p-2.5 rounded-xl border border-rose-200 text-stone-700">
                {lang === 'ta'
                  ? 'உதாரணம்: "உங்களுக்கு மகளிர் திட்ட பணம் ₹3,000 வந்திருக்கிறது, PIN போடுங்கள்" என யாராவது சொன்னால் அது ஏமாற்று வேலை. உடனடியாக அழைப்பை துண்டியுங்கள்.'
                  : 'Example: Anyone saying "I am sending ₹2,000 grant, just type your PIN to accept" is trying to steal your balance.'}
              </div>
            </div>

            {/* Rule 2 */}
            <div className="p-5 rounded-2xl border-2 border-amber-300 bg-amber-50/60 space-y-2">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
                <span>{lang === 'ta' ? 'விதி 2: OTP ரகசியத்தை பகிராதீர்கள்' : 'Rule 2: Never Share SMS OTP'}</span>
              </div>
              <p className="text-xs text-amber-950 font-medium leading-relaxed">
                {t.education.upiSafety2}
              </p>
              <div className="text-[11px] bg-white p-2.5 rounded-xl border border-amber-200 text-stone-700">
                {lang === 'ta'
                  ? 'உண்மையான வங்கி அதிகாரிகள் அல்லது அரசு ஊழியர்கள் ஒருபோதும் உங்கள் செல்போனுக்கு வரும் 4 அல்லது 6 இலக்க OTP-ஐ கேட்க மாட்டார்கள்.'
                  : 'Authentic bank managers or government officers never ask for your SMS verification code.'}
              </div>
            </div>
          </div>

          {/* Practical WhatsApp Business Tip */}
          <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl space-y-2">
            <h3 className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'ta' ? 'வாட்ஸ்அப் மூலம் வீட்டு வியாபாரம் செய்வது எப்படி?' : 'WhatsApp Business for Village Home Sales'}</span>
            </h3>
            <p className="text-xs text-emerald-900 leading-relaxed">
              {t.education.whatsappBusinessTip}
            </p>
            <ul className="text-xs text-emerald-800 space-y-1 list-disc list-inside">
              <li>
                {lang === 'ta'
                  ? 'நீங்கள் தைத்த ஜாக்கெட் அல்லது தயாரித்த இட்லி பொடி படங்களை வாட்ஸ்அப் ஸ்டேட்டஸில் வையுங்கள்.'
                  : 'Post photos of stitched blouses or homemade snacks to your WhatsApp status.'}
              </li>
              <li>
                {lang === 'ta'
                  ? 'விலை மற்றும் கிடைக்கும் அளவை தெளிவாக குறிப்பில் எழுதுங்கள்.'
                  : 'State price and delivery time clearly.'}
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Course Detailed Modal */}
      {selectedCourse && (
        <div
          role="dialog"
          aria-label="Course Details"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
        >
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 mb-1 inline-block">
                  {lang === 'ta' ? selectedCourse.highlightTa : selectedCourse.highlight}
                </span>
                <h3 className="text-lg font-bold text-stone-900">
                  {lang === 'ta' ? selectedCourse.titleTa : selectedCourse.title}
                </h3>
                <p className="text-xs text-emerald-700 font-semibold">
                  {lang === 'ta' ? selectedCourse.providerTa : selectedCourse.provider}
                </p>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-stone-400 hover:text-stone-700 p-1"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              {lang === 'ta' ? selectedCourse.descriptionTa : selectedCourse.description}
            </p>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-stone-800">
                {lang === 'ta' ? 'சேருவது எப்படி (வழிமுறைகள்):' : 'How to Enroll:'}
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {(lang === 'ta' ? selectedCourse.howToEnrollTa : selectedCourse.howToEnroll).map(
                  (step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{step}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-700 flex items-center justify-between">
              <span>{lang === 'ta' ? 'தொடர்பு / தளம்:' : 'Contact:'}</span>
              <span className="font-bold text-emerald-800">{selectedCourse.contactOrLink}</span>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold"
              >
                {t.common.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
