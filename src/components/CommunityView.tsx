/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Users,
  Heart,
  MessageCircle,
  PlusCircle,
  Volume2,
  Shield,
  Send,
  X,
  Share2,
  CheckCircle2,
  Lock,
  Flag,
  UserX,
  AlertTriangle,
  BookOpen,
  Filter,
  Sparkles,
  Search,
  ArrowLeft,
  ShieldCheck,
  Info,
  MapPin,
  TrendingUp,
  Scale,
  Scissors,
  GraduationCap,
  Package,
  HeartHandshake,
  Check,
  ChevronRight,
  HandCoins,
  Megaphone,
  AlertCircle
} from 'lucide-react';
import {
  Language,
  UserProfile,
  ProblemCircle,
  ProblemDiscussionThread,
  CircleProblemCategory
} from '../types';
import { translations } from '../data/translations';
import { initialProblemCircles, initialProblemThreads } from '../data/sisterhoodData';
import {
  filterCirclesByLocationAndProblem,
  getThreadsForCircle,
  toggleCircleMembership,
  toggleThreadUpvote,
  toggleActionPledge,
  addSolutionToThread,
  createProblemThread,
  formatSafeAlias
} from '../utils/sisterhoodCircles';
import { speakText } from '../utils/speech';

interface CommunityViewProps {
  lang: Language;
  userProfile?: UserProfile;
  onNavigateBack?: () => void;
}

export const CommunityView: React.FC<CommunityViewProps> = ({
  lang,
  userProfile,
  onNavigateBack,
}) => {
  const t = translations[lang];

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // 1. Circles State (Persistent in LocalStorage)
  const [circles, setCircles] = useState<ProblemCircle[]>(() => {
    try {
      const saved = localStorage.getItem('sherise_problem_circles');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialProblemCircles;
  });

  // 2. Discussion Threads State
  const [threads, setThreads] = useState<ProblemDiscussionThread[]>(() => {
    try {
      const saved = localStorage.getItem('sherise_problem_threads');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialProblemThreads;
  });

  // 3. Joined Circle IDs State
  const [joinedCircleIds, setJoinedCircleIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sherise_joined_circles');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['circle-pondy-education-reentry', 'circle-karaikal-tailoring-orders'];
  });

  // 4. Navigation & Active View State
  const [selectedCircleForDetail, setSelectedCircleForDetail] = useState<ProblemCircle | null>(null);

  // 5. Filter States
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'puducherry' | 'tamil_nadu'>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showJoinedOnly, setShowJoinedOnly] = useState<boolean>(false);

  // 6. Action & Form Modals
  const [showNewProblemModal, setShowNewProblemModal] = useState<boolean>(false);
  const [newProblemTitle, setNewProblemTitle] = useState<string>('');
  const [newProblemDesc, setNewProblemDesc] = useState<string>('');
  const [newProblemCategory, setNewProblemCategory] = useState<CircleProblemCategory>('education_restart');
  const [isAnonymousPost, setIsAnonymousPost] = useState<boolean>(true);
  const [customAuthorAlias, setCustomAuthorAlias] = useState<string>(userProfile?.name || 'Sister');
  const [collectiveActionTitle, setCollectiveActionTitle] = useState<string>('');
  const [collectiveActionDesc, setCollectiveActionDesc] = useState<string>('');
  const [collectiveAuthority, setCollectiveAuthority] = useState<string>('');

  // 7. Replying / Adding Solution State
  const [activeReplyingThreadId, setActiveReplyingThreadId] = useState<string | null>(null);
  const [newSolutionText, setNewSolutionText] = useState<string>('');
  const [isAnonymousSolution, setIsAnonymousSolution] = useState<boolean>(false);

  // 8. Reporting & Blocking State
  const [reportingItemId, setReportingItemId] = useState<string | null>(null);
  const [reportReason, setReportReason] = useState<string>('spam');
  const [reportFeedback, setReportFeedback] = useState<string | null>(null);
  const [blockedAuthors, setBlockedAuthors] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sherise_blocked_authors');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sherise_joined_circles', JSON.stringify(joinedCircleIds));
    } catch {
      // ignore
    }
  }, [joinedCircleIds]);

  useEffect(() => {
    try {
      localStorage.setItem('sherise_problem_threads', JSON.stringify(threads));
    } catch {
      // ignore
    }
  }, [threads]);

  // Handle Browser Back (popstate) to return from Circle Detail to Circle List
  useEffect(() => {
    const handlePopState = () => {
      if (selectedCircleForDetail) {
        setSelectedCircleForDetail(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedCircleForDetail]);

  const handleOpenCircleDetail = (circle: ProblemCircle) => {
    setSelectedCircleForDetail(circle);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    try {
      window.history.pushState({ screen: 'circle-detail', circleId: circle.id }, '');
    } catch {
      // ignore
    }
  };

  const handleCloseCircleDetail = () => {
    setSelectedCircleForDetail(null);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleTopBackClick = () => {
    if (selectedCircleForDetail) {
      handleCloseCircleDetail();
    } else if (onNavigateBack) {
      onNavigateBack();
    }
  };

  // Helper for localized strings
  const getLocalized = (ta?: string, hi?: string, en?: string): string => {
    if (lang === 'ta' && ta) return ta;
    if (lang === 'hi' && hi) return hi;
    return en || ta || '';
  };

  // District options based on region selection
  const districtOptions = useMemo(() => {
    if (selectedRegion === 'puducherry') {
      return [
        { id: 'all', label: lang === 'ta' ? 'அனைத்து புதுச்சேரி பகுதிகள்' : 'All Puducherry UT Districts' },
        { id: 'Puducherry', label: 'Puducherry (புதுச்சேரி)' },
        { id: 'Karaikal', label: 'Karaikal (காரைக்கால்)' },
        { id: 'Mahe', label: 'Mahe (மாகே)' },
        { id: 'Yanam', label: 'Yanam (ஏனாம்)' },
      ];
    }
    if (selectedRegion === 'tamil_nadu') {
      return [
        { id: 'all', label: lang === 'ta' ? 'அனைத்து தமிழ்நாடு மாவட்டங்கள்' : 'All Tamil Nadu Districts' },
        { id: 'Chennai', label: 'Chennai (சென்னை)' },
        { id: 'Madurai', label: 'Madurai (மதுரை)' },
        { id: 'Coimbatore', label: 'Coimbatore (கோவை)' },
        { id: 'Salem', label: 'Salem (சேலம்)' },
        { id: 'Tiruchirappalli', label: 'Tiruchirappalli (திருச்சி)' },
        { id: 'Vellore', label: 'Vellore (வேலூர்)' },
        { id: 'Tirunelveli', label: 'Tirunelveli (திருநெல்வேலி)' },
        { id: 'Thanjavur', label: 'Thanjavur (தஞ்சாவூர்)' },
        { id: 'Erode', label: 'Erode (ஈரோடு)' },
      ];
    }
    return [
      { id: 'all', label: lang === 'ta' ? 'அனைத்து மாவட்டங்களும் (All)' : 'All Districts' },
      { id: 'Puducherry', label: 'Puducherry (புதுச்சேரி)' },
      { id: 'Karaikal', label: 'Karaikal (காரைக்கால்)' },
      { id: 'Chennai', label: 'Chennai (சென்னை)' },
      { id: 'Madurai', label: 'Madurai (மதுரை)' },
      { id: 'Coimbatore', label: 'Coimbatore (கோவை)' },
      { id: 'Salem', label: 'Salem (சேலம்)' },
      { id: 'Tiruchirappalli', label: 'Tiruchirappalli (திருச்சி)' },
      { id: 'Vellore', label: 'Vellore (வேலூர்)' },
    ];
  }, [selectedRegion, lang]);

  // Categories list
  const problemCategories = [
    {
      id: 'all',
      label: lang === 'ta' ? 'அனைத்து பிரச்சனைகளும்' : lang === 'hi' ? 'सभी समस्याएं' : 'All Categories',
      icon: '✨'
    },
    {
      id: 'education_restart',
      label: lang === 'ta' ? '🎓 படிப்பு தொடங்குதல்' : lang === 'hi' ? '🎓 अधूरी पढ़ाई शुरू करें' : '🎓 Education Restart',
      icon: '🎓'
    },
    {
      id: 'business_capital',
      label: lang === 'ta' ? '💰 கடன் சுமை & முதலீடு' : lang === 'hi' ? '💰 पूंजी व ऋण मुक्ति' : '💰 Capital & Debt Relief',
      icon: '💰'
    },
    {
      id: 'job_orders',
      label: lang === 'ta' ? '✂️ தையல் & வேலை ஆர்டர்கள்' : lang === 'hi' ? '✂️ सिलाई व काम के ऑर्डर' : '✂️ Tailoring & Work Orders',
      icon: '✂️'
    },
    {
      id: 'legal_family',
      label: lang === 'ta' ? '⚖️ தனித்து வாழும் பெண்கள் & சட்டம்' : lang === 'hi' ? '⚖️ कानूनी व पारिवारिक अधिकार' : '⚖️ Legal & Single Women',
      icon: '⚖️'
    },
    {
      id: 'health_nutrition',
      label: lang === 'ta' ? '🩺 தாய்மார்கள் ஊட்டச்சத்து' : lang === 'hi' ? '🩺 मातृ स्वास्थ्य व पोषण' : '🩺 Maternal Health',
      icon: '🩺'
    },
    {
      id: 'unorganized_labor',
      label: lang === 'ta' ? '🧵 அமைப்புசாரா கூலி & நலவாரியம்' : lang === 'hi' ? '🧵 असंगठित मजदूर कल्याण' : '🧵 Labor & Welfare Board',
      icon: '🧵'
    },
  ];

  // Filtered circles
  const filteredCircles = useMemo(() => {
    let result = filterCirclesByLocationAndProblem(
      circles,
      selectedRegion,
      selectedDistrict,
      selectedCategory,
      searchQuery
    );
    if (showJoinedOnly) {
      result = result.filter((c) => joinedCircleIds.includes(c.id));
    }
    return result;
  }, [circles, selectedRegion, selectedDistrict, selectedCategory, searchQuery, showJoinedOnly, joinedCircleIds]);

  // Filtered threads for current circle detail
  const currentCircleThreads = useMemo(() => {
    if (!selectedCircleForDetail) return [];
    const raw = getThreadsForCircle(threads, selectedCircleForDetail.id, 'all', searchQuery);
    return raw.filter((t) => !blockedAuthors.includes(t.authorAlias));
  }, [threads, selectedCircleForDetail, searchQuery, blockedAuthors]);

  // Actions
  const handleToggleJoin = (circleId: string) => {
    const next = toggleCircleMembership(joinedCircleIds, circleId);
    setJoinedCircleIds(next);
    try {
      if (next.includes(circleId)) {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
      }
    } catch {
      // ignore
    }
  };

  const handleUpvoteThread = (threadId: string) => {
    setThreads((prev) =>
      prev.map((t) => (t.id === threadId ? toggleThreadUpvote(t) : t))
    );
  };

  const handlePledgeAction = (threadId: string) => {
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === threadId) {
          const updated = toggleActionPledge(t);
          if (updated.collectiveAction?.hasUserPledged) {
            try {
              confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
            } catch {
              // ignore
            }
          }
          return updated;
        }
        return t;
      })
    );
  };

  const handleAddSolution = (threadId: string) => {
    if (!newSolutionText.trim()) return;
    const author = isAnonymousSolution
      ? 'Anonymous Sister (தோழி)'
      : formatSafeAlias(customAuthorAlias || userProfile?.name || 'Sister', false, userProfile?.location);

    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === threadId) {
          return addSolutionToThread(t, newSolutionText.trim(), author, isAnonymousSolution);
        }
        return t;
      })
    );

    setNewSolutionText('');
    setActiveReplyingThreadId(null);
  };

  const handleCreateNewProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProblemTitle.trim() || !newProblemDesc.trim()) return;

    const targetCircleId = selectedCircleForDetail
      ? selectedCircleForDetail.id
      : circles[0]?.id || 'circle-pondy-education-reentry';

    const safeAlias = formatSafeAlias(
      customAuthorAlias || userProfile?.name || 'Sister',
      isAnonymousPost,
      userProfile?.location || 'Puducherry'
    );

    const newThread = createProblemThread(
      targetCircleId,
      newProblemTitle.trim(),
      newProblemDesc.trim(),
      newProblemCategory,
      safeAlias,
      userProfile?.location || 'Puducherry / Tamil Nadu',
      isAnonymousPost,
      collectiveActionTitle.trim() || undefined,
      collectiveActionDesc.trim() || undefined,
      collectiveAuthority.trim() || undefined
    );

    setThreads((prev) => [newThread, ...prev]);
    setShowNewProblemModal(false);
    setNewProblemTitle('');
    setNewProblemDesc('');
    setCollectiveActionTitle('');
    setCollectiveActionDesc('');
    setCollectiveAuthority('');

    try {
      confetti({ particleCount: 45, spread: 65, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
  };

  const handleReportItem = (id: string) => {
    setReportingItemId(id);
  };

  const submitReport = () => {
    setReportFeedback(
      lang === 'ta'
        ? 'உங்கள் புகார் பதிவு செய்யப்பட்டது. பாதுகாப்பு குழுவினர் 24 மணி நேரத்திற்குள் ஆய்வு செய்வர்.'
        : 'Thank you for reporting. Our moderation safety team will review this within 24 hours.'
    );
    setTimeout(() => {
      setReportingItemId(null);
      setReportFeedback(null);
    }, 2500);
  };

  const handleBlockAuthor = (authorAlias: string) => {
    const updated = [...blockedAuthors, authorAlias];
    setBlockedAuthors(updated);
    try {
      localStorage.setItem('sherise_blocked_authors', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Breadcrumb & Consistent Back Navigation */}
      <div className="flex items-center justify-between text-xs font-semibold text-stone-600 bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5">
        <div className="flex items-center gap-2">
          <button
            onClick={handleTopBackClick}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-stone-300 hover:bg-stone-100 rounded-lg text-stone-800 font-bold transition shadow-2xs"
            aria-label="Back"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.common.back}</span>
          </button>
          <span>{lang === 'ta' ? 'முகப்பு' : lang === 'hi' ? 'होम' : 'Home'}</span>
          <span>/</span>
          <span
            onClick={() => {
              if (selectedCircleForDetail) handleCloseCircleDetail();
            }}
            className={`cursor-pointer ${
              selectedCircleForDetail ? 'text-stone-600 hover:text-stone-900' : 'text-rose-700 font-bold'
            }`}
          >
            {lang === 'ta' ? 'தோழிகள் வட்டம்' : lang === 'hi' ? 'सहेली मंडल' : 'Sisterhood Circles'}
          </span>
          {selectedCircleForDetail && (
            <>
              <span>/</span>
              <span className="text-rose-700 font-bold line-clamp-1 max-w-[160px] sm:max-w-xs">
                {getLocalized(selectedCircleForDetail.nameTa, selectedCircleForDetail.nameHi, selectedCircleForDetail.name)}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 text-[11px] text-stone-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="hidden sm:inline">
            {lang === 'ta' ? 'பாதுகாப்பான பெண்கள் சமூகம்' : 'Confidential Women Safe Space'}
          </span>
        </div>
      </div>

      {/* Main Header Banner */}
      <div className="bg-gradient-to-r from-rose-800 via-rose-700 to-pink-700 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-xs">
              {lang === 'ta' ? 'பிரச்சனை அடிப்படையிலான ஆதரவு வட்டம்' : 'Problem-Based Sisterhood Community'}
            </span>
            <span className="px-3 py-1 bg-amber-400 text-stone-900 rounded-full text-xs font-bold">
              📍 Puducherry & Tamil Nadu
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            {lang === 'ta'
              ? 'தோழிகள் வட்டம் (சகோதரத்துவ கூட்டு நடவடிக்கை)'
              : lang === 'hi'
              ? 'सहेली मंडल (समस्या समाधान एवं सामूहिक पहल)'
              : 'Sisterhood Circles: Collective Problem Solving'}
          </h1>
          <p className="text-rose-100 text-xs sm:text-sm leading-relaxed max-w-2xl">
            {lang === 'ta'
              ? 'படிப்பு பாதியில் நின்றவர்கள், கடன் சுமையில் தவிப்பவர்கள், நியாயமான தையல் கூலி பெறாதவர்கள் மற்றும் சட்ட உதவி தேவைப்படும் பெண்கள் தங்கள் பகுதியின் தோழிகளுடன் இணைந்து தீர்வுகளைக் காணும் பாதுகாப்பான தளம்.'
              : 'Connect with women facing the exact same real-life struggles in your district. Share verified solutions, pledge mutual support, and organize collective community action.'}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowNewProblemModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white text-rose-800 font-bold text-xs sm:text-sm rounded-xl hover:bg-rose-50 transition shadow-sm"
            >
              <PlusCircle className="w-4 h-4 text-rose-600" />
              <span>{lang === 'ta' ? 'என் பிரச்சனையை / யோசனையை பகிர்கிறேன்' : 'Raise a Challenge or Collective Action'}</span>
            </button>

            <div className="flex items-center gap-2 text-xs text-rose-100 bg-black/20 px-3 py-2 rounded-xl backdrop-blur-xs">
              <Lock className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {lang === 'ta' ? 'தொலைபேசி எண் பகிரப்படாது • அநாமதேய அடையாளம்' : 'Privacy Protected: Anonymous Aliases'}
              </span>
            </div>
          </div>
        </div>

        {/* Decorative background watermark */}
        <div className="absolute -right-6 -bottom-8 opacity-10 pointer-events-none select-none text-9xl">
          👭
        </div>
      </div>

      {/* VIEW 1: CIRCLE DETAIL VIEW */}
      {selectedCircleForDetail ? (
        <div className="space-y-6">
          {/* Back button banner */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleCloseCircleDetail}
              className="flex items-center gap-2 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 px-3.5 py-2 rounded-xl transition border border-rose-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === 'ta' ? '← அனைத்து வட்டங்கள் பட்டியலுக்கு திரும்பு' : '← Back to All Circles'}</span>
            </button>

            <button
              onClick={() => handleToggleJoin(selectedCircleForDetail.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs ${
                joinedCircleIds.includes(selectedCircleForDetail.id)
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-rose-600 text-white hover:bg-rose-700'
              }`}
            >
              {joinedCircleIds.includes(selectedCircleForDetail.id) ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{lang === 'ta' ? 'இணைந்துள்ளீர்கள் (Joined)' : 'Joined Circle'}</span>
                </>
              ) : (
                <>
                  <Users className="w-3.5 h-3.5" />
                  <span>
                    {selectedCircleForDetail.isPrivate
                      ? lang === 'ta'
                        ? 'ரகசிய வட்டத்தில் இணைய விண்ணப்பி'
                        : 'Request Confidential Access'
                      : lang === 'ta'
                      ? 'இந்த வட்டத்தில் இணை'
                      : 'Join Circle'}
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Active Circle Focus Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                <span className="px-3 py-1 bg-rose-100 text-rose-900 rounded-full flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-600" />
                  <span>
                    {getLocalized(selectedCircleForDetail.districtTa, selectedCircleForDetail.districtHi, selectedCircleForDetail.district)}
                  </span>
                </span>
                {selectedCircleForDetail.isPrivate ? (
                  <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full flex items-center gap-1">
                    <Lock className="w-3 h-3 text-amber-700" />
                    <span>{lang === 'ta' ? 'ரகசிய ஆதரவு குழு' : 'Private Confidential Circle'}</span>
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full flex items-center gap-1">
                    <Users className="w-3 h-3 text-emerald-700" />
                    <span>{lang === 'ta' ? 'திறந்த சமூகம்' : 'Open Circle'}</span>
                  </span>
                )}
                <span className="text-stone-400">•</span>
                <span className="text-stone-600">
                  {selectedCircleForDetail.memberCount} {lang === 'ta' ? 'தோழிகள்' : 'Sisters'}
                </span>
                <span className="text-stone-400">•</span>
                <span className="text-emerald-700 font-bold">
                  {selectedCircleForDetail.solvedCount} {lang === 'ta' ? 'தீர்க்கப்பட்ட வழக்குகள்' : 'Issues Solved'}
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                {getLocalized(selectedCircleForDetail.nameTa, selectedCircleForDetail.nameHi, selectedCircleForDetail.name)}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-1">
                {getLocalized(selectedCircleForDetail.descriptionTa, selectedCircleForDetail.descriptionHi, selectedCircleForDetail.description)}
              </p>
            </div>

            {/* Active Challenge Alert Banner */}
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <span className="font-bold text-amber-950 uppercase tracking-wide">
                  {lang === 'ta' ? 'தற்போது நிலவும் முக்கிய சவால்:' : 'Current Urgent Challenge:'}
                </span>
                <p className="font-semibold text-amber-900 leading-relaxed">
                  {getLocalized(selectedCircleForDetail.activeProblemTa, selectedCircleForDetail.activeProblemHi, selectedCircleForDetail.activeProblem)}
                </p>
              </div>
            </div>
          </div>

          {/* Problem Discussion Threads Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-rose-600" />
                <span>
                  {lang === 'ta' ? 'தோழிகளின் விவாதங்கள் & கூட்டு தீர்வுகள்' : 'Discussions & Verified Solutions'}
                </span>
                <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-semibold">
                  {currentCircleThreads.length}
                </span>
              </h3>

              <button
                onClick={() => setShowNewProblemModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>{lang === 'ta' ? 'கேள்வி / யோசனை கேட்க' : 'Post Challenge'}</span>
              </button>
            </div>

            {currentCircleThreads.map((thread) => (
              <div
                key={thread.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4"
              >
                {/* Thread Author & Location Bar */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
                      {thread.isAnonymous ? '🔒' : '👩'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-stone-900">
                          {thread.authorAlias}
                        </span>
                        {thread.isAnonymous && (
                          <span className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.2 rounded font-medium">
                            {lang === 'ta' ? 'அநாமதேயம்' : 'Anonymous'}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-stone-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        <span>{thread.authorLocation}</span>
                        <span>•</span>
                        <span>{thread.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  {/* Upvote & Action Bar */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpvoteThread(thread.id)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition ${
                        thread.isUpvoted
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          thread.isUpvoted ? 'fill-rose-600 text-rose-600' : 'text-stone-400'
                        }`}
                      />
                      <span>{thread.upvotes}</span>
                    </button>

                    <button
                      onClick={() => handleReportItem(thread.id)}
                      className="p-1.5 text-stone-300 hover:text-stone-600 rounded-lg transition"
                      title={lang === 'ta' ? 'புகாரளி' : 'Report'}
                    >
                      <Flag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Problem Title & Description */}
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-stone-900 leading-snug">
                    {thread.problemTitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-1 whitespace-pre-line">
                    {thread.problemDescription}
                  </p>
                </div>

                {/* Collective Community Action Card */}
                {thread.collectiveAction && (
                  <div className="p-4 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-2xl space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-teal-900 uppercase tracking-wide">
                          <Megaphone className="w-4 h-4 text-teal-700" />
                          <span>{lang === 'ta' ? 'தோழிகள் கூட்டு நடவடிக்கை (Collective Action):' : 'Collective Action Campaign:'}</span>
                        </div>
                        <h5 className="text-sm font-bold text-teal-950">
                          {thread.collectiveAction.actionTitle}
                        </h5>
                        <p className="text-xs text-teal-800 leading-relaxed">
                          {thread.collectiveAction.actionDescription}
                        </p>
                        <div className="text-[11px] font-semibold text-teal-900 flex items-center gap-1 pt-1">
                          <span>{lang === 'ta' ? 'அதிகார அமைப்பு:' : 'Target Authority:'}</span>
                          <span className="underline decoration-teal-400">{thread.collectiveAction.targetAuthority}</span>
                        </div>
                      </div>

                      {/* Pledge Button */}
                      <div className="text-right shrink-0">
                        <div className="text-xs font-extrabold text-teal-900 mb-1">
                          {thread.collectiveAction.pledgedCount} {lang === 'ta' ? 'தோழிகள் ஆதரவு' : 'Pledged'}
                        </div>
                        <button
                          onClick={() => handlePledgeAction(thread.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-xs ${
                            thread.collectiveAction.hasUserPledged
                              ? 'bg-teal-700 text-white'
                              : 'bg-white text-teal-800 border border-teal-400 hover:bg-teal-100'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>
                            {thread.collectiveAction.hasUserPledged
                              ? lang === 'ta'
                                ? 'ஆதரவு தெரிவித்தீர்கள்'
                                : 'Pledged!'
                              : lang === 'ta'
                              ? 'ஒன்றுபடுவோம் (Pledge)'
                              : 'Pledge Support'}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Verified Peer Solutions Section */}
                <div className="space-y-3 pt-2 border-t border-stone-100">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-700">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>{lang === 'ta' ? 'பகிர்ந்த தீர்வுகள்' : 'Verified Solutions & Advice'} ({thread.solutions.length})</span>
                    </span>

                    <button
                      onClick={() =>
                        setActiveReplyingThreadId(
                          activeReplyingThreadId === thread.id ? null : thread.id
                        )
                      }
                      className="text-xs font-bold text-rose-700 hover:text-rose-800 flex items-center gap-1"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>{lang === 'ta' ? 'நடைமுறை தீர்வை எழுது' : 'Add Solution'}</span>
                    </button>
                  </div>

                  {thread.solutions.map((sol) => (
                    <div
                      key={sol.id}
                      className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/70 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-900">{sol.authorAlias}</span>
                          {sol.isVerifiedByMentor && (
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded-full flex items-center gap-0.5">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>{lang === 'ta' ? 'சரிபார்க்கப்பட்ட தீர்வு' : 'Mentor Verified'}</span>
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-stone-400">{sol.timestamp}</span>
                      </div>
                      <p className="text-stone-700 leading-relaxed">{sol.solutionText}</p>
                    </div>
                  ))}

                  {/* Add Solution Input Drawer */}
                  {activeReplyingThreadId === thread.id && (
                    <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-2xl space-y-2 animate-fadeIn">
                      <textarea
                        value={newSolutionText}
                        onChange={(e) => setNewSolutionText(e.target.value)}
                        placeholder={
                          lang === 'ta'
                            ? 'தோழிக்கு உதவும் உங்கள் நடைமுறை ஆலோசனையை எழுதுங்கள்...'
                            : 'Write your practical solution or guidance for sister...'
                        }
                        rows={2}
                        className="w-full text-xs p-2.5 rounded-xl border border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                      />
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-1.5 text-xs text-stone-600 font-medium">
                          <input
                            type="checkbox"
                            checked={isAnonymousSolution}
                            onChange={(e) => setIsAnonymousSolution(e.target.checked)}
                            className="rounded text-rose-600 focus:ring-rose-500"
                          />
                          <span>{lang === 'ta' ? 'அநாமதேயமாக பதிலளி' : 'Post as Anonymous Sister'}</span>
                        </label>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setActiveReplyingThreadId(null)}
                            className="px-3 py-1 bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold"
                          >
                            {t.common.close}
                          </button>
                          <button
                            onClick={() => handleAddSolution(thread.id)}
                            className="px-3.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
                          >
                            <Send className="w-3 h-3" />
                            <span>{lang === 'ta' ? 'அனுப்புக' : 'Submit'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {currentCircleThreads.length === 0 && (
              <div className="p-8 text-center bg-white rounded-3xl border border-stone-200">
                <MessageCircle className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-stone-700">
                  {lang === 'ta' ? 'இன்னும் விவாதங்கள் தொடங்கப்படவில்லை' : 'No discussions started yet'}
                </h4>
                <p className="text-xs text-stone-500 mt-1">
                  {lang === 'ta'
                    ? 'முதல் கேள்வியை அல்லது சவாலை நீங்கள் முன்வையுங்கள்.'
                    : 'Be the first sister to post your question or solution in this circle.'}
                </p>
                <button
                  onClick={() => setShowNewProblemModal(true)}
                  className="mt-3 px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold"
                >
                  {lang === 'ta' ? 'முதல் கேள்வியை பகிர்கிறேன்' : 'Ask First Question'}
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* VIEW 2: CIRCLES DIRECTORY / EXPLORER VIEW */
        <div className="space-y-6">
          {/* Filters Bar: Location & Category */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
            {/* Top row: Region tabs + District dropdown + Search */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Region Pill Tabs */}
              <div className="flex items-center bg-stone-100 rounded-2xl p-1 text-xs font-bold">
                <button
                  onClick={() => {
                    setSelectedRegion('all');
                    setSelectedDistrict('all');
                  }}
                  className={`px-3 py-1.5 rounded-xl transition ${
                    selectedRegion === 'all'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {lang === 'ta' ? 'அனைத்து பகுதிகள்' : 'All Regions'}
                </button>
                <button
                  onClick={() => {
                    setSelectedRegion('puducherry');
                    setSelectedDistrict('all');
                  }}
                  className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1 ${
                    selectedRegion === 'puducherry'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <span>🌴 Puducherry UT</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedRegion('tamil_nadu');
                    setSelectedDistrict('all');
                  }}
                  className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1 ${
                    selectedRegion === 'tamil_nadu'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <span>🏛️ Tamil Nadu</span>
                </button>
              </div>

              {/* District Filter Dropdown */}
              <div className="flex items-center gap-2 text-xs font-bold">
                <MapPin className="w-4 h-4 text-rose-600" />
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  {districtOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Input */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    lang === 'ta'
                      ? 'வட்டம், பிரச்சனை அல்லது ஊரைத் தேடுங்கள்...'
                      : 'Search circles, problems or keywords...'
                  }
                  className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              {/* Joined Only Toggle */}
              <button
                onClick={() => setShowJoinedOnly(!showJoinedOnly)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                  showJoinedOnly
                    ? 'bg-rose-50 text-rose-800 border-rose-300'
                    : 'bg-white text-stone-600 hover:bg-stone-50 border-stone-200'
                }`}
              >
                <Check className="w-3.5 h-3.5 text-rose-600" />
                <span>{lang === 'ta' ? 'என் வட்டங்கள்' : 'My Circles'} ({joinedCircleIds.length})</span>
              </button>
            </div>

            {/* Problem Category Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-medium no-scrollbar">
              {problemCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? 'bg-rose-700 text-white font-bold shadow-2xs'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Circles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCircles.map((circle) => {
              const isJoined = joinedCircleIds.includes(circle.id);
              const title = getLocalized(circle.nameTa, circle.nameHi, circle.name);
              const desc = getLocalized(circle.descriptionTa, circle.descriptionHi, circle.description);
              const problem = getLocalized(circle.activeProblemTa, circle.activeProblemHi, circle.activeProblem);
              const distName = getLocalized(circle.districtTa, circle.districtHi, circle.district);

              return (
                <div
                  key={circle.id}
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 hover:border-rose-300 transition shadow-xs hover:shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* Top tags row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-800 border border-rose-200 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-rose-600" />
                          <span>{distName}</span>
                        </span>

                        {circle.isPrivate ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200 flex items-center gap-1">
                            <Lock className="w-3 h-3 text-amber-700" />
                            <span>{lang === 'ta' ? 'ரகசிய குழு' : 'Confidential'}</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-900 border border-emerald-200 flex items-center gap-1">
                            <Users className="w-3 h-3 text-emerald-700" />
                            <span>{lang === 'ta' ? 'திறந்த வட்டம்' : 'Open'}</span>
                          </span>
                        )}
                      </div>

                      <span className="text-[11px] text-stone-500 font-medium">
                        {circle.memberCount} {lang === 'ta' ? 'தோழிகள்' : 'members'}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-base font-bold text-stone-900 leading-snug">
                        {title}
                      </h3>
                      <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed">
                        {desc}
                      </p>
                    </div>

                    {/* Active Challenge Box */}
                    <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-xs space-y-1">
                      <span className="font-bold text-amber-950 text-[10px] uppercase tracking-wider flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                        <span>{lang === 'ta' ? 'முக்கிய பிரச்சனை:' : 'Current Focus Issue:'}</span>
                      </span>
                      <p className="text-amber-900 font-semibold line-clamp-2">
                        {problem}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {circle.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-stone-100 text-stone-600 rounded-md text-[10px] font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <button
                      onClick={() => handleToggleJoin(circle.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                        isJoined
                          ? 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                          : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
                      }`}
                    >
                      {isJoined
                        ? lang === 'ta'
                          ? 'இணைந்துள்ளீர்கள் ✓'
                          : 'Joined ✓'
                        : circle.isPrivate
                        ? lang === 'ta'
                          ? 'விண்ணப்பி'
                          : 'Request to Join'
                        : lang === 'ta'
                        ? 'இணை'
                        : 'Join Circle'}
                    </button>

                    <button
                      onClick={() => handleOpenCircleDetail(circle)}
                      className="flex items-center gap-1 px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition shadow-xs"
                    >
                      <span>{lang === 'ta' ? 'வட்டத்திற்குள் செல்' : 'Enter & Discuss'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredCircles.length === 0 && (
            <div className="p-12 text-center bg-white rounded-3xl border border-stone-200">
              <AlertCircle className="w-10 h-10 text-stone-300 mx-auto mb-2" />
              <h4 className="text-base font-bold text-stone-800">
                {lang === 'ta' ? 'வட்டங்கள் எதுவும் கிடைக்கவில்லை' : 'No circles match this filter'}
              </h4>
              <p className="text-xs text-stone-500 mt-1">
                {lang === 'ta'
                  ? 'தேடல் சொற்களை மாற்றவும் அல்லது பிற மாவட்டங்களை தேர்ந்தெடுக்கவும்.'
                  : 'Try selecting All Regions or clearing your search query.'}
              </p>
              <button
                onClick={() => {
                  setSelectedRegion('all');
                  setSelectedDistrict('all');
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setShowJoinedOnly(false);
                }}
                className="mt-3 px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold"
              >
                {lang === 'ta' ? 'அனைத்து வடிகட்டிகளையும் நீக்கு' : 'Reset All Filters'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* MODAL: RAISE NEW PROBLEM / COLLECTIVE ACTION */}
      {showNewProblemModal && (
        <div
          role="dialog"
          aria-label="Raise Problem in Circle"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
        >
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-rose-600" />
                <span>
                  {lang === 'ta' ? 'புதிய பிரச்சனை / கூட்டு நடவடிக்கை பகிர்க' : 'Raise Challenge or Collective Action'}
                </span>
              </h3>
              <button
                onClick={() => setShowNewProblemModal(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewProblem} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {lang === 'ta' ? 'பிரச்சனை வகை (Category):' : 'Problem Category:'}
                </label>
                <select
                  value={newProblemCategory}
                  onChange={(e) => setNewProblemCategory(e.target.value as CircleProblemCategory)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="education_restart">🎓 Discontinued Education / Open Schooling</option>
                  <option value="business_capital">💰 Micro-Capital Crunch & Anti-Debt Support</option>
                  <option value="job_orders">✂️ Tailoring & Fair Work Orders</option>
                  <option value="legal_family">⚖️ Legal Rights & Single Women Maintenance</option>
                  <option value="health_nutrition">🩺 Maternal Health & Nutrition Aid</option>
                  <option value="unorganized_labor">🧵 Unorganized Labor & Fair Wages</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {lang === 'ta' ? 'தலைப்பு (சுருக்கமாக):' : 'Challenge Title (Brief):'}
                </label>
                <input
                  type="text"
                  required
                  value={newProblemTitle}
                  onChange={(e) => setNewProblemTitle(e.target.value)}
                  placeholder={
                    lang === 'ta'
                      ? 'எ.கா: காரைக்காலில் 12-ஆம் வகுப்பு தனித்தேர்வு எழுத உதவி தேவை'
                      : 'e.g., Need advice on recovering college marksheet in Puducherry'
                  }
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {lang === 'ta' ? 'விளக்கம் (நடந்த சூழ்நிலை):' : 'Detailed Situation & What Help You Need:'}
                </label>
                <textarea
                  required
                  rows={3}
                  value={newProblemDesc}
                  onChange={(e) => setNewProblemDesc(e.target.value)}
                  placeholder={
                    lang === 'ta'
                      ? 'நீங்கள் சந்திக்கும் சிரமத்தை தெளிவாக விளக்குங்கள். தோழிகள் நடைமுறை தீர்வு சொல்வார்கள்...'
                      : 'Describe the situation and what guidance you are seeking from sisters...'
                  }
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              {/* Optional Collective Action Proposal */}
              <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-teal-900 flex items-center gap-1.5">
                  <Megaphone className="w-4 h-4 text-teal-700" />
                  <span>{lang === 'ta' ? 'கூட்டு நடவடிக்கை முன்மொழிய விரும்புகிறீர்களா? (விருப்பத்திற்குரியது)' : 'Propose a Collective Community Action (Optional)'}</span>
                </span>
                <input
                  type="text"
                  value={collectiveActionTitle}
                  onChange={(e) => setCollectiveActionTitle(e.target.value)}
                  placeholder={
                    lang === 'ta'
                      ? 'கூட்டு நடவடிக்கை தலைப்பு (எ.கா: கலெக்டரிடம் மனு, மொத்த மூலப்பொருள் கொள்முதல்)'
                      : 'Campaign Title (e.g. Joint representation to District Collector)'
                  }
                  className="w-full text-xs p-2 rounded-xl border border-teal-300 focus:outline-none bg-white"
                />
                <input
                  type="text"
                  value={collectiveAuthority}
                  onChange={(e) => setCollectiveAuthority(e.target.value)}
                  placeholder={
                    lang === 'ta'
                      ? 'அதிகார அமைப்பு (எ.கா: மாவட்ட ஆட்சியர், பள்ளி கல்வித்துறை)'
                      : 'Target Authority or Organization'
                  }
                  className="w-full text-xs p-2 rounded-xl border border-teal-300 focus:outline-none bg-white"
                />
              </div>

              {/* Privacy Setting */}
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <label className="flex items-center gap-2 text-xs text-stone-800 font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymousPost}
                    onChange={(e) => setIsAnonymousPost(e.target.checked)}
                    className="rounded text-rose-600 focus:ring-rose-500"
                  />
                  <span>
                    {lang === 'ta'
                      ? 'பாதுகாப்பான அநாமதேய அடையாளத்தில் ("Anonymous Sister") பதிவிடு'
                      : 'Post as Anonymous Sister (Protects your identity)'}
                  </span>
                </label>
                {!isAnonymousPost && (
                  <div className="pt-1">
                    <input
                      type="text"
                      value={customAuthorAlias}
                      onChange={(e) => setCustomAuthorAlias(e.target.value)}
                      placeholder="Display Name / Alias (e.g. Sister Meena)"
                      className="w-full text-xs p-2 rounded-xl border border-stone-300 bg-white"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewProblemModal(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold"
                >
                  {t.common.close}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
                >
                  {lang === 'ta' ? 'பதிவிடுக' : 'Publish to Circle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REPORT MODAL */}
      {reportingItemId && (
        <div
          role="dialog"
          aria-label="Report item"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn"
        >
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>{lang === 'ta' ? 'பதிவை புகாரளி' : 'Report Content'}</span>
              </h4>
              <button onClick={() => setReportingItemId(null)} className="text-stone-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            {reportFeedback ? (
              <div className="p-3 bg-emerald-50 text-emerald-900 rounded-xl text-xs font-semibold">
                {reportFeedback}
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <p className="text-stone-600">
                  {lang === 'ta'
                    ? 'இந்த பதிவு எதனால் SHERISE மகளிர் சமூக விதிகளுக்கு முரணானது?'
                    : 'Why does this content violate SHERISE community safety guidelines?'}
                </p>
                <div className="space-y-1.5">
                  {[
                    { id: 'harassment', label: lang === 'ta' ? 'அநாகரீக பேச்சு அல்லது துன்புறுத்தல்' : 'Harassment or Disrespect' },
                    { id: 'fake_info', label: lang === 'ta' ? 'போலி அல்லது தவறான தகவல்' : 'False or Misleading Advice' },
                    { id: 'spam', label: lang === 'ta' ? 'வணிக விளம்பரம் அல்லது ஸ்பேம்' : 'Commercial Spam / Broker' },
                  ].map((r) => (
                    <label key={r.id} className="flex items-center gap-2 font-medium text-stone-700 cursor-pointer">
                      <input
                        type="radio"
                        name="reportReason"
                        value={r.id}
                        checked={reportReason === r.id}
                        onChange={(e) => setReportReason(e.target.value)}
                        className="text-rose-600 focus:ring-rose-500"
                      />
                      <span>{r.label}</span>
                    </label>
                  ))}
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setReportingItemId(null)}
                    className="px-3 py-1.5 bg-stone-100 rounded-xl text-xs font-semibold"
                  >
                    {t.common.close}
                  </button>
                  <button
                    onClick={submitReport}
                    className="px-4 py-1.5 bg-rose-600 text-white rounded-xl text-xs font-bold"
                  >
                    {lang === 'ta' ? 'புகாரை அனுப்புக' : 'Submit Report'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
