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
  Edit2,
  Trash2,
  UserCheck,
  Check,
  ArrowLeft,
  ShieldCheck,
  Info
} from 'lucide-react';
import { Language, CommunityPost, CommunityCircleGroup, UserProfile } from '../types';
import { initialCommunityPosts } from '../data/initialCommunityData';
import { translations } from '../data/translations';
import { speakText } from '../utils/speech';
import {
  communitySupportGroups,
  canEditPost,
  canDeletePost,
  filterCommunityPosts
} from '../utils/communityLogic';

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

  const [posts, setPosts] = useState<CommunityPost[]>(() => {
    try {
      const saved = localStorage.getItem('sherise_community_posts');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialCommunityPosts;
  });

  // Joined groups state
  const [joinedGroupIds, setJoinedGroupIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sherise_joined_groups');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['circle-education', 'circle-tailoring'];
  });

  const [selectedCircleId, setSelectedCircleId] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [activeReplyPostId, setActiveReplyPostId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Edit post state
  const [editingPost, setEditingPost] = useState<CommunityPost | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  // Delete confirmation
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);

  // Report modal state
  const [reportingPost, setReportingPost] = useState<CommunityPost | null>(null);
  const [reportReason, setReportReason] = useState<string>('inappropriate');
  const [reportSuccessMsg, setReportSuccessMsg] = useState<string | null>(null);

  // Block author state
  const [blockedAuthors, setBlockedAuthors] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sherise_blocked_authors');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });
  const [blockingAuthorName, setBlockingAuthorName] = useState<string | null>(null);

  // New post form fields
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState<'story' | 'question' | 'marketplace' | 'encouragement'>('question');
  const [postCircleId, setPostCircleId] = useState<string>('circle-education');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [customAuthorName, setCustomAuthorName] = useState(userProfile?.name || '');
  const [generalRegion, setGeneralRegion] = useState(userProfile?.location || 'Tamil Nadu');

  const currentUserId = userProfile?.id || 'demo-user-1';
  const currentUserName = isAnonymous
    ? (lang === 'ta' ? 'தோழி (பாதுகாப்பு பெயர்)' : lang === 'hi' ? 'सखी (गोपनीय नाम)' : 'Sister (Anonymous)')
    : (customAuthorName.trim() || userProfile?.name || 'Community Sister');

  const savePosts = (updated: CommunityPost[]) => {
    setPosts(updated);
    try {
      localStorage.setItem('sherise_community_posts', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleToggleJoinGroup = (groupId: string) => {
    setJoinedGroupIds((prev) => {
      const exists = prev.includes(groupId);
      const updated = exists ? prev.filter((id) => id !== groupId) : [...prev, groupId];
      try {
        localStorage.setItem('sherise_joined_groups', JSON.stringify(updated));
      } catch {
        // ignore
      }
      if (!exists) {
        try {
          confetti({ particleCount: 30, spread: 50 });
        } catch {
          // ignore
        }
      }
      return updated;
    });
  };

  const handleLike = (postId: string) => {
    const updated = posts.map((p) => {
      if (p.id === postId) {
        const isLiked = !p.isLiked;
        return {
          ...p,
          likes: isLiked ? p.likes + 1 : Math.max(0, p.likes - 1),
          isLiked,
        };
      }
      return p;
    });
    savePosts(updated);
    try {
      confetti({ particleCount: 20, spread: 35 });
    } catch {
      // ignore
    }
  };

  const handleAddReply = (postId: string) => {
    if (!replyText.trim()) return;

    const authorDisplayName = isAnonymous
      ? (lang === 'ta' ? 'தோழி' : lang === 'hi' ? 'सखी' : 'Sister')
      : (customAuthorName.trim() || (lang === 'ta' ? 'தோழி' : lang === 'hi' ? 'सखी' : 'Sister'));

    const updated = posts.map((p) => {
      if (p.id === postId) {
        return {
          ...p,
          replies: [
            ...p.replies,
            {
              id: `rep-${Date.now()}`,
              authorName: authorDisplayName,
              content: replyText.trim(),
              timestamp: lang === 'ta' ? 'இப்போது' : lang === 'hi' ? 'अभी' : 'Just now',
            },
          ],
        };
      }
      return p;
    });

    savePosts(updated);
    setReplyText('');
    setActiveReplyPostId(null);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) return;

    const newPost: CommunityPost = {
      id: `post-user-${Date.now()}`,
      authorId: currentUserId,
      authorName: currentUserName,
      authorLocation: generalRegion.trim() || (lang === 'ta' ? 'தமிழ்நாடு' : lang === 'hi' ? 'भारत' : 'India'),
      role: lang === 'ta' ? 'தோழிகள் வட்ட உறுப்பினர்' : lang === 'hi' ? 'सखी मंडल सदस्य' : 'Community Member',
      roleTa: 'தோழிகள் வட்ட உறுப்பினர்',
      roleHi: 'सखी मंडल सदस्य',
      category: postCategory,
      circleGroupId: postCircleId,
      title: postTitle.trim(),
      content: postContent.trim(),
      likes: 1,
      isLiked: true,
      timestamp: lang === 'ta' ? 'இப்போது' : lang === 'hi' ? 'अभी' : 'Just now',
      replies: [],
      isAnonymous,
      isSampleStory: false, // Real user created post
    };

    savePosts([newPost, ...posts]);
    setPostTitle('');
    setPostContent('');
    setShowNewPostModal(false);

    try {
      confetti({ particleCount: 45, spread: 60 });
    } catch {
      // ignore
    }
  };

  const handleStartEdit = (post: CommunityPost) => {
    setEditingPost(post);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost || !editTitle.trim() || !editContent.trim()) return;

    const updated = posts.map((p) => {
      if (p.id === editingPost.id) {
        return {
          ...p,
          title: editTitle.trim(),
          content: editContent.trim(),
        };
      }
      return p;
    });

    savePosts(updated);
    setEditingPost(null);
  };

  const handleDeletePost = (postId: string) => {
    const updated = posts.filter((p) => p.id !== postId);
    savePosts(updated);
    setDeletingPostId(null);
  };

  const handleConfirmReport = () => {
    if (!reportingPost) return;
    setReportSuccessMsg(
      lang === 'ta'
        ? `புகார் சமர்ப்பிக்கப்பட்டது. சமூக வழிகாட்டுதல் குழுவால் உடனடியாக மதிப்பாய்வு செய்யப்படும்.`
        : lang === 'hi'
        ? `रिपोर्ट दर्ज की गई। महिला सुरक्षा प्राथमिक समिति द्वारा समीक्षा की जाएगी।`
        : `Report submitted for review. Safety guidelines are strictly enforced.`
    );
    setTimeout(() => {
      setReportingPost(null);
      setReportSuccessMsg(null);
    }, 2000);
  };

  const handleConfirmBlock = () => {
    if (!blockingAuthorName) return;
    const updated = [...blockedAuthors, blockingAuthorName];
    setBlockedAuthors(updated);
    try {
      localStorage.setItem('sherise_blocked_authors', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setBlockingAuthorName(null);
  };

  const filteredPosts = useMemo(() => {
    return filterCommunityPosts(posts, {
      selectedCircleId,
      selectedCategory,
      searchQuery,
      blockedAuthors,
    });
  }, [posts, selectedCircleId, selectedCategory, searchQuery, blockedAuthors]);

  const handleSpeakPost = (post: CommunityPost) => {
    const textToSpeak = `${post.title}. ${post.authorName}: ${post.content}`;
    speakText(textToSpeak, lang);
  };

  const getGroupName = (circle: CommunityCircleGroup) => {
    if (lang === 'ta') return circle.nameTa;
    if (lang === 'hi') return circle.nameHi;
    return circle.name;
  };

  const getGroupDesc = (circle: CommunityCircleGroup) => {
    if (lang === 'ta') return circle.descriptionTa;
    if (lang === 'hi') return circle.descriptionHi;
    return circle.description;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Breadcrumb & Back Bar */}
      <div className="flex items-center justify-between text-xs font-semibold text-stone-600 bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5">
        <div className="flex items-center gap-2">
          {onNavigateBack && (
            <button
              onClick={onNavigateBack}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-stone-300 hover:bg-stone-100 rounded-lg text-stone-800 font-bold transition shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.common.back}</span>
            </button>
          )}
          <span>{lang === 'ta' ? 'முகப்பு' : lang === 'hi' ? 'होम' : 'Home'}</span>
          <span>/</span>
          <span className="text-pink-700 font-bold">{t.nav.community}</span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-stone-500">
          <Shield className="w-4 h-4 text-emerald-600" />
          <span>
            {lang === 'ta' ? 'பாதுகாப்பான பெண்கள் சமூகம்' : lang === 'hi' ? 'सुरक्षित महिला मंच' : 'Safe Women-Only Space'}
          </span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-3xl">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-2">
            {lang === 'ta' ? 'பெண்களுக்கான பாதுகாப்பான சகோதரிகள் வட்டம்' : lang === 'hi' ? 'महिलाओं का सुरक्षित सखी मंडल' : 'Sisterhood Circle & Safe Community'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            {t.community.title}
          </h1>
          <p className="text-xs sm:text-sm text-pink-100 leading-relaxed mb-4">
            {t.community.sub}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowNewPostModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white text-rose-700 hover:bg-rose-50 font-bold text-xs sm:text-sm rounded-full shadow-md transition active:scale-95"
            >
              <PlusCircle className="w-4 h-4 text-rose-600" />
              <span>{t.community.createPostBtn}</span>
            </button>

            <button
              onClick={() => setShowRulesModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-full transition"
            >
              <Shield className="w-4 h-4" />
              <span>{lang === 'ta' ? 'சமூக வழிகாட்டுதல்கள்' : lang === 'hi' ? 'सुरक्षा नियम' : 'Community Guidelines'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Support Groups Discovery Carousel */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
            <Users className="w-4 h-4 text-rose-600" />
            <span>{lang === 'ta' ? 'ஆர்வமுள்ள தோழிகள் வட்டங்கள் (Support Groups):' : lang === 'hi' ? 'सखी सहायता समूह (Support Groups):' : 'Support Groups & Communities:'}</span>
          </h2>
          <span className="text-[11px] text-stone-500">
            {lang === 'ta' ? `${joinedGroupIds.length} குழுக்களில் இணைந்துள்ளீர்கள்` : `${joinedGroupIds.length} Groups Joined`}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {communitySupportGroups.map((group) => {
            const isJoined = joinedGroupIds.includes(group.id);
            const isFiltered = selectedCircleId === group.id;
            return (
              <div
                key={group.id}
                className={`p-3 rounded-2xl border transition flex flex-col justify-between ${
                  isFiltered
                    ? 'bg-rose-50 border-rose-400 shadow-xs'
                    : 'bg-white border-stone-200 hover:border-stone-300'
                }`}
              >
                <div
                  className="cursor-pointer"
                  onClick={() => setSelectedCircleId(selectedCircleId === group.id ? 'all' : group.id)}
                >
                  <div className="text-xl mb-1">{group.icon}</div>
                  <h3 className="font-bold text-xs text-stone-900 leading-tight line-clamp-2">
                    {getGroupName(group)}
                  </h3>
                  <div className="text-[10px] text-stone-500 mt-1 flex items-center gap-1">
                    <Users className="w-3 h-3 text-stone-400" />
                    <span>{group.memberCount} {lang === 'ta' ? 'தோழிகள்' : 'members'}</span>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => handleToggleJoinGroup(group.id)}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition ${
                      isJoined
                        ? 'bg-emerald-100 text-emerald-800 flex items-center gap-0.5'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {isJoined ? (
                      <>
                        <Check className="w-2.5 h-2.5 text-emerald-700" />
                        <span>{lang === 'ta' ? 'இணைந்தீர்கள்' : lang === 'hi' ? 'जुड़े हैं' : 'Joined'}</span>
                      </>
                    ) : (
                      <span>+ {lang === 'ta' ? 'இணைய' : lang === 'hi' ? 'जुड़ें' : 'Join'}</span>
                    )}
                  </button>

                  <button
                    onClick={() => setSelectedCircleId(selectedCircleId === group.id ? 'all' : group.id)}
                    className="text-[10px] text-rose-600 font-semibold hover:underline"
                  >
                    {isFiltered ? (lang === 'ta' ? 'அனைத்தும்' : 'All') : (lang === 'ta' ? 'காண்க' : 'View')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === 'ta'
                  ? 'கேள்விகள், அனுபவங்கள் அல்லது யோசனைகளை தேடுக...'
                  : lang === 'hi'
                  ? 'प्रश्न, अनुभव या व्यावसायिक चर्चा खोजें...'
                  : 'Search community questions, advice, or ideas...'
              }
              className="w-full pl-9 pr-8 py-2 text-xs border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-rose-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-full font-semibold transition whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-rose-600 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {lang === 'ta' ? 'அனைத்து பதிவுகள்' : lang === 'hi' ? 'सभी पोस्ट' : 'All Posts'}
            </button>
            <button
              onClick={() => setSelectedCategory('question')}
              className={`px-3 py-1.5 rounded-full font-semibold transition whitespace-nowrap ${
                selectedCategory === 'question'
                  ? 'bg-rose-600 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              ❓ {lang === 'ta' ? 'கேள்வி & பதில்' : lang === 'hi' ? 'सवाल-जवाब' : 'Q&A Help'}
            </button>
            <button
              onClick={() => setSelectedCategory('story')}
              className={`px-3 py-1.5 rounded-full font-semibold transition whitespace-nowrap ${
                selectedCategory === 'story'
                  ? 'bg-rose-600 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              🌟 {lang === 'ta' ? 'வெற்றிக் கதைகள்' : lang === 'hi' ? 'सफलता की कहानियां' : 'Success Stories'}
            </button>
            <button
              onClick={() => setSelectedCategory('marketplace')}
              className={`px-3 py-1.5 rounded-full font-semibold transition whitespace-nowrap ${
                selectedCategory === 'marketplace'
                  ? 'bg-rose-600 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              🛍️ {lang === 'ta' ? 'உற்பத்திப் பொருட்கள்' : lang === 'hi' ? 'हस्तनिर्मित उत्पाद' : 'Products & Skills'}
            </button>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {filteredPosts.map((post) => {
          const isOwn = canEditPost(post, currentUserId, currentUserName);
          const circle = communitySupportGroups.find((g) => g.id === post.circleGroupId);

          return (
            <div
              key={post.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs hover:border-stone-300 transition space-y-3"
            >
              {/* Header row: Author, Category, Circle, Actions */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 text-white font-bold flex items-center justify-center text-xs">
                    {post.isAnonymous ? '🌸' : post.authorName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-stone-900">
                        {post.authorName}
                      </span>
                      {post.isAnonymous && (
                        <span className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                          <Lock className="w-2.5 h-2.5 text-stone-400" />
                          <span>{lang === 'ta' ? 'பாதுகாப்பு பெயர்' : 'Protected'}</span>
                        </span>
                      )}
                      {post.isSampleStory && (
                        <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded-md">
                          {lang === 'ta' ? 'மாதிரி பகிர்வு' : 'Sample Experience'}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
                      <span>{post.authorLocation}</span>
                      <span>•</span>
                      <span>{post.timestamp}</span>
                      {circle && (
                        <>
                          <span>•</span>
                          <span className="text-rose-600 font-semibold">{getGroupName(circle)}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {/* Read aloud */}
                  <button
                    onClick={() => handleSpeakPost(post)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 rounded-full"
                    title={t.common.readAloud}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  {/* Edit & Delete for own post */}
                  {isOwn && (
                    <>
                      <button
                        onClick={() => handleStartEdit(post)}
                        className="p-1.5 text-stone-400 hover:text-blue-600 rounded-full"
                        title={lang === 'ta' ? 'திருத்துக' : 'Edit Post'}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeletingPostId(post.id)}
                        className="p-1.5 text-stone-400 hover:text-red-600 rounded-full"
                        title={lang === 'ta' ? 'நீக்குக' : 'Delete Post'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}

                  {/* Report / Block menu */}
                  {!isOwn && (
                    <button
                      onClick={() => setReportingPost(post)}
                      className="p-1.5 text-stone-400 hover:text-amber-600 rounded-full"
                      title={lang === 'ta' ? 'புகாரளி' : 'Report'}
                    >
                      <Flag className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Title & Content */}
              <div>
                <h3 className="text-sm font-bold text-stone-900 leading-snug mb-1">
                  {post.title}
                </h3>
                <p className="text-xs text-stone-700 leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>
              </div>

              {/* Action buttons: Like & Reply toggle */}
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition font-semibold ${
                    post.isLiked
                      ? 'text-rose-600 bg-rose-50'
                      : 'hover:text-rose-600 hover:bg-stone-50'
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      post.isLiked ? 'fill-rose-600 text-rose-600' : ''
                    }`}
                  />
                  <span>{post.likes}</span>
                </button>

                <button
                  onClick={() =>
                    setActiveReplyPostId(activeReplyPostId === post.id ? null : post.id)
                  }
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-stone-50 font-semibold transition"
                >
                  <MessageCircle className="w-4 h-4 text-stone-400" />
                  <span>
                    {post.replies.length}{' '}
                    {lang === 'ta' ? 'பதில்கள்' : lang === 'hi' ? 'उत्तर' : 'Replies'}
                  </span>
                </button>
              </div>

              {/* Replies Thread */}
              {post.replies.length > 0 && (
                <div className="bg-stone-50 rounded-xl p-3 space-y-2 border border-stone-100">
                  {post.replies.map((rep) => (
                    <div key={rep.id} className="text-xs text-stone-800 space-y-0.5">
                      <div className="flex items-center gap-1.5 font-bold text-stone-900 text-[11px]">
                        <span>🌸 {rep.authorName}</span>
                        <span className="text-[10px] text-stone-400 font-normal">
                          • {rep.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-stone-700 pl-4">{rep.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Input Bar */}
              {activeReplyPostId === post.id && (
                <div className="flex items-center gap-2 pt-2 animate-fadeIn">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={
                      lang === 'ta'
                        ? 'தோழிக்கு ஊக்கமளிக்கும் பதில் எழுதுங்கள்...'
                        : lang === 'hi'
                        ? 'सखी के लिए उत्तर या सलाह लिखें...'
                        : 'Write a supportive reply or answer...'
                    }
                    className="flex-1 text-xs p-2 border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddReply(post.id);
                    }}
                  />
                  <button
                    onClick={() => handleAddReply(post.id)}
                    className="p-2 bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-6 space-y-2">
            <Users className="w-10 h-10 text-stone-400 mx-auto" />
            <h3 className="text-sm font-bold text-stone-800">
              {lang === 'ta' ? 'பதிவுகள் எதுவும் இல்லை' : 'No posts match your filters'}
            </h3>
            <p className="text-xs text-stone-500">
              {lang === 'ta'
                ? 'உங்கள் அனுபவம் அல்லது கேள்வியை முதல் ஆளாக பகிர்ந்து கொள்ளுங்கள்!'
                : 'Be the first sister to ask a question or share advice in this circle!'}
            </p>
            <button
              onClick={() => setShowNewPostModal(true)}
              className="mt-2 px-4 py-2 bg-rose-600 text-white font-bold text-xs rounded-xl"
            >
              + {t.community.createPostBtn}
            </button>
          </div>
        )}
      </div>

      {/* CREATE NEW POST MODAL */}
      {showNewPostModal && (
        <div
          role="dialog"
          aria-label="Create Post Modal"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h2 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-rose-600" />
                <span>{t.community.createPostBtn}</span>
              </h2>
              <button
                onClick={() => setShowNewPostModal(false)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3.5">
              {/* Group Category */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-800 block">
                  {lang === 'ta' ? 'தோழிகள் வட்டம் (குழு):' : 'Select Support Group:'}
                </label>
                <select
                  value={postCircleId}
                  onChange={(e) => setPostCircleId(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-500"
                >
                  {communitySupportGroups.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.icon} {getGroupName(g)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Post Type */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-800 block">
                  {lang === 'ta' ? 'பதிவின் நோக்கம்:' : 'Post Category:'}
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-1.5 p-2 bg-stone-50 border rounded-xl cursor-pointer">
                    <input
                      type="radio"
                      name="cat"
                      value="question"
                      checked={postCategory === 'question'}
                      onChange={() => setPostCategory('question')}
                    />
                    <span>❓ {lang === 'ta' ? 'கேள்வி & உதவி' : 'Question / Advice'}</span>
                  </label>
                  <label className="flex items-center gap-1.5 p-2 bg-stone-50 border rounded-xl cursor-pointer">
                    <input
                      type="radio"
                      name="cat"
                      value="story"
                      checked={postCategory === 'story'}
                      onChange={() => setPostCategory('story')}
                    />
                    <span>🌟 {lang === 'ta' ? 'வெற்றி அனுபவம்' : 'Success Story'}</span>
                  </label>
                </div>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-800 block">
                  {lang === 'ta' ? 'தலைப்பு:' : 'Post Title:'}
                </label>
                <input
                  type="text"
                  required
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder={
                    lang === 'ta'
                      ? 'சுருக்கமான தலைப்பு (உதா: தையல் துணி மொத்த விற்பனை எங்கு கிடைக்கும்?)'
                      : 'Brief topic headline...'
                  }
                  className="w-full text-xs p-2.5 border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-500"
                />
              </div>

              {/* Content */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-800 block">
                  {lang === 'ta' ? 'முழு விபரம்:' : 'Your Message / Experience:'}
                </label>
                <textarea
                  required
                  rows={4}
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder={
                    lang === 'ta'
                      ? 'உங்கள் கேள்வி அல்லது யோசனையை தெளிவாக எழுதுங்கள்...'
                      : 'Share your question or practical experience with sisters...'
                  }
                  className="w-full text-xs p-2.5 border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-500"
                />
              </div>

              {/* Privacy and Anonymous Protection Toggle */}
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-900">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 text-rose-600 rounded"
                  />
                  <span>
                    🔒 {lang === 'ta' ? 'என் சொந்த பெயரை மறைக்க (Anonymous Sister Shield)' : 'Post Anonymously for Privacy'}
                  </span>
                </label>
                <p className="text-[11px] text-stone-500 pl-6 leading-relaxed">
                  {lang === 'ta'
                    ? 'பெயர் மற்றும் மொபைல் எண்கள் ஒருபோதும் பிறருக்கு காட்டப்படாது. பொதுவான மாநிலம்/மாவட்டம் மட்டுமே தோன்றும்.'
                    : 'Your phone number and precise location are never displayed. Identity is fully protected.'}
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="px-4 py-2 border border-stone-200 text-stone-700 rounded-xl text-xs font-semibold"
                >
                  {t.common.close}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
                >
                  {lang === 'ta' ? 'பதிவிடுக' : 'Publish Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT POST MODAL */}
      {editingPost && (
        <div
          role="dialog"
          aria-label="Edit Post"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h2 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-blue-600" />
                <span>{lang === 'ta' ? 'பதிவை திருத்துக' : 'Edit Your Post'}</span>
              </h2>
              <button
                onClick={() => setEditingPost(null)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1">
                  {lang === 'ta' ? 'தலைப்பு:' : 'Title:'}
                </label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full text-xs p-2.5 border border-stone-200 rounded-xl"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1">
                  {lang === 'ta' ? 'உள்ளடக்கம்:' : 'Content:'}
                </label>
                <textarea
                  required
                  rows={4}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full text-xs p-2.5 border border-stone-200 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  className="px-4 py-2 border border-stone-200 text-stone-700 rounded-xl text-xs font-semibold"
                >
                  {t.common.close}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
                >
                  {lang === 'ta' ? 'சேமிக்க' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingPostId && (
        <div
          role="dialog"
          aria-label="Delete Confirmation"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
        >
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-center">
            <Trash2 className="w-10 h-10 text-red-500 mx-auto" />
            <h3 className="text-base font-extrabold text-stone-900">
              {lang === 'ta' ? 'இப்பதிவை நிச்சயமாக நீக்க வேண்டுமா?' : 'Delete this post?'}
            </h3>
            <p className="text-xs text-stone-600">
              {lang === 'ta'
                ? 'நீக்கப்பட்ட பிறகு இத்தகவலை மீண்டும் பெற இயலாது.'
                : 'This action cannot be undone.'}
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingPostId(null)}
                className="px-4 py-2 border border-stone-200 text-stone-700 rounded-xl text-xs font-semibold"
              >
                {t.common.close}
              </button>
              <button
                onClick={() => handleDeletePost(deletingPostId)}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold"
              >
                {lang === 'ta' ? 'நீக்குக' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COMMUNITY GUIDELINES MODAL */}
      {showRulesModal && (
        <div
          role="dialog"
          aria-label="Community Guidelines"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h2 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>{lang === 'ta' ? 'சகோதரிகள் பாதுகாப்பு விதிகள்' : 'Sisterhood Safety Guidelines'}</span>
              </h2>
              <button
                onClick={() => setShowRulesModal(false)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <ul className="text-xs text-stone-700 space-y-2.5">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">1.</span>
                <span>{lang === 'ta' ? 'அனைத்து பெண்களுக்கும் மரியாதை மற்றும் ஆதரவான தொனியில் பேசுங்கள்.' : 'Always treat sisters with dignity, empathy, and respect.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">2.</span>
                <span>{lang === 'ta' ? 'தனிப்பட்ட தொலைபேசி எண்கள், வங்கி எண்கள் அல்லது வீட்டு முகவரியை பொதுவில் பகிராதீர்கள்.' : 'Never publicly share phone numbers, bank details, or home addresses.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">3.</span>
                <span>{lang === 'ta' ? 'போலி வேலைவாய்ப்புகள் அல்லது கமிஷன் ஆசைகாட்டும் விளம்பரங்கள் உடனடியாக தடை செய்யப்படும்.' : 'Pyramid schemes, commission agent solicitations, and fake jobs are zero-tolerance.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">4.</span>
                <span>{lang === 'ta' ? 'சந்தேகத்திற்கிடமான பதிவுகளை கொடி (Flag) பொத்தான் மூலம் புகாரளிக்கலாம்.' : 'Report suspicious activity using the flag button for 24/7 moderation review.'}</span>
              </li>
            </ul>

            <div className="pt-3 border-t border-stone-100 text-right">
              <button
                onClick={() => setShowRulesModal(false)}
                className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold"
              >
                {lang === 'ta' ? 'புரிந்துகொண்டேன்' : 'I Understand'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REPORT CONTENT MODAL */}
      {reportingPost && (
        <div
          role="dialog"
          aria-label="Report Post"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
        >
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-sm font-extrabold text-stone-900 flex items-center gap-1.5 text-amber-700">
                <Flag className="w-4 h-4 text-amber-600" />
                <span>{lang === 'ta' ? 'பதிவு குறித்து புகாரளி' : 'Report This Post'}</span>
              </h3>
              <button
                onClick={() => setReportingPost(null)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {reportSuccessMsg ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-bold text-center">
                {reportSuccessMsg}
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-stone-600">
                  {lang === 'ta'
                    ? 'இப்பதிவை ஏன் புகாரளிக்கிறீர்கள்?'
                    : 'Why are you reporting this post?'}
                </p>

                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full text-xs p-2.5 border border-stone-200 rounded-xl"
                >
                  <option value="inappropriate">
                    {lang === 'ta' ? 'தவறான அல்லது மரியாதையற்ற மொழி' : 'Disrespectful language'}
                  </option>
                  <option value="privacy">
                    {lang === 'ta' ? 'தனிநபர் விவரங்கள் / தொலைபேசி எண் பகிரப்பட்டுள்ளது' : 'Exposing private phone/address'}
                  </option>
                  <option value="scam">
                    {lang === 'ta' ? 'மோசடி விளம்பரம் / போலி வாக்குறுதி' : 'Scam or commercial middleman'}
                  </option>
                </select>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => {
                      setBlockingAuthorName(reportingPost.authorName);
                      setReportingPost(null);
                    }}
                    className="text-xs text-stone-500 hover:text-red-600 font-semibold flex items-center gap-1"
                  >
                    <UserX className="w-3.5 h-3.5" />
                    <span>{lang === 'ta' ? 'இவரை தடை செய்' : 'Block Author'}</span>
                  </button>

                  <button
                    onClick={handleConfirmReport}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold"
                  >
                    {lang === 'ta' ? 'புகாரை அனுப்பு' : 'Submit Report'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* BLOCK AUTHOR CONFIRMATION */}
      {blockingAuthorName && (
        <div
          role="dialog"
          aria-label="Block Author"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
        >
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-center">
            <UserX className="w-10 h-10 text-stone-600 mx-auto" />
            <h3 className="text-base font-extrabold text-stone-900">
              {lang === 'ta'
                ? `"${blockingAuthorName}"-ஐ தடை செய்யவா?`
                : `Block "${blockingAuthorName}"?`}
            </h3>
            <p className="text-xs text-stone-600">
              {lang === 'ta'
                ? 'இவரின் பதிவுகள் உங்கள் திரையில் இருந்து மறைக்கப்படும்.'
                : 'You will no longer see any posts or replies from this author.'}
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setBlockingAuthorName(null)}
                className="px-4 py-2 border border-stone-200 text-stone-700 rounded-xl text-xs font-semibold"
              >
                {t.common.close}
              </button>
              <button
                onClick={handleConfirmBlock}
                className="px-5 py-2 bg-stone-900 hover:bg-black text-white rounded-xl text-xs font-bold"
              >
                {lang === 'ta' ? 'தடை செய்' : 'Confirm Block'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
