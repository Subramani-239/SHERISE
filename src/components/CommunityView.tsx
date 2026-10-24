/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
  Sparkles
} from 'lucide-react';
import { Language, CommunityPost, CommunityCircleGroup } from '../types';
import { initialCommunityPosts, communityCircleGroups } from '../data/initialCommunityData';
import { translations } from '../data/translations';
import { speakText } from '../utils/speech';

interface CommunityViewProps {
  lang: Language;
}

export const CommunityView: React.FC<CommunityViewProps> = ({ lang }) => {
  const t = translations[lang];

  const [posts, setPosts] = useState<CommunityPost[]>(() => {
    try {
      const saved = localStorage.getItem('sherise_community_posts');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialCommunityPosts;
  });

  const [selectedCircleId, setSelectedCircleId] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [activeReplyPostId, setActiveReplyPostId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

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
  const [postCategory, setPostCategory] = useState<'story' | 'question' | 'marketplace' | 'encouragement'>('story');
  const [postCircleId, setPostCircleId] = useState<string>('circle-tailoring');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [postAuthor, setPostAuthor] = useState('');
  const [postLocation, setPostLocation] = useState('');

  const savePosts = (updated: CommunityPost[]) => {
    setPosts(updated);
    try {
      localStorage.setItem('sherise_community_posts', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleLike = (postId: string) => {
    const updated = posts.map((p) => {
      if (p.id === postId) {
        const isLiked = !p.isLiked;
        return {
          ...p,
          likes: isLiked ? p.likes + 1 : p.likes - 1,
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

    const updated = posts.map((p) => {
      if (p.id === postId) {
        return {
          ...p,
          replies: [
            ...p.replies,
            {
              id: `rep-${Date.now()}`,
              authorName: isAnonymous
                ? (lang === 'ta' ? 'தோழி' : lang === 'hi' ? 'सहेली' : 'Sister')
                : (postAuthor.trim() || (lang === 'ta' ? 'தோழி' : lang === 'hi' ? 'सहेली' : 'Sister')),
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
      id: `post-${Date.now()}`,
      authorName: isAnonymous
        ? (lang === 'ta' ? 'தோழி (பாதுகாப்பு பெயர்)' : lang === 'hi' ? 'सखी (गोपनीय नाम)' : 'Sister (Anonymous)')
        : postAuthor.trim() || (lang === 'ta' ? 'கிராமத்து தோழி' : lang === 'hi' ? 'ग्रामीण सखी' : 'Village Sister'),
      authorLocation: postLocation.trim() || (lang === 'ta' ? 'தமிழ்நாடு' : lang === 'hi' ? 'भारत' : 'India'),
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
      isSampleStory: false, // Genuine local user post
    };

    savePosts([newPost, ...posts]);
    setPostTitle('');
    setPostContent('');
    setShowNewPostModal(false);

    try {
      confetti({ particleCount: 40, spread: 60 });
    } catch {
      // ignore
    }
  };

  const handleConfirmReport = () => {
    if (!reportingPost) return;
    setReportSuccessMsg(
      lang === 'ta'
        ? `பதிவு நிர்வாகத்தின் ஆய்வுக்கு சமர்ப்பிக்கப்பட்டது. பெண்கள் பாதுகாப்பிற்கு முன்னுரிமை அளிக்கப்படுகிறது.`
        : lang === 'hi'
        ? `पोस्ट रिपोर्ट की गई। महिला सुरक्षा हमारी प्राथमिकता है।`
        : `Post submitted for review. Sister safety is strictly enforced.`
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

  const filteredPosts = posts.filter((p) => {
    if (blockedAuthors.includes(p.authorName)) return false;
    if (selectedCircleId !== 'all' && p.circleGroupId !== selectedCircleId) return false;
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    return true;
  });

  const handleSpeakPost = (post: CommunityPost) => {
    const textToSpeak = `${post.title}. ${post.authorName}: ${post.content}`;
    speakText(textToSpeak, lang);
  };

  const getCircleName = (circle: CommunityCircleGroup) => {
    if (lang === 'ta') return circle.nameTa;
    if (lang === 'hi') return circle.nameHi;
    return circle.name;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-2xl">
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
              <Shield className="w-4 h-4 text-amber-200" />
              <span>{lang === 'ta' ? 'சமூக வழிகாட்டு நெறிகள்' : lang === 'hi' ? 'सखी मंडल नियम' : 'Community Guidelines'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interest Circle Group Discoverer */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-rose-600" />
            <span>{lang === 'ta' ? 'ஆர்வக் குழுக்களைக் கண்டறியுங்கள் (Interest Circles):' : lang === 'hi' ? 'रुचि के अनुसार समूह चुनें:' : 'Discover Circles by Your Skill & Goal:'}</span>
          </span>
          {blockedAuthors.length > 0 && (
            <button
              onClick={() => {
                setBlockedAuthors([]);
                localStorage.removeItem('sherise_blocked_authors');
              }}
              className="text-[11px] text-rose-600 underline"
            >
              {lang === 'ta' ? `முடக்கப்பட்டவர்களை மீட்டமை (${blockedAuthors.length})` : `Unblock all (${blockedAuthors.length})`}
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          <button
            onClick={() => setSelectedCircleId('all')}
            className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition ${
              selectedCircleId === 'all'
                ? 'bg-rose-600 text-white shadow-2xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {lang === 'ta' ? 'அனைத்து வட்டங்களும்' : lang === 'hi' ? 'सभी समूह' : 'All Circles'}
          </button>

          {communityCircleGroups.map((circle) => (
            <button
              key={circle.id}
              onClick={() => setSelectedCircleId(circle.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition ${
                selectedCircleId === circle.id
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <span>{circle.icon}</span>
              <span>{getCircleName(circle)}</span>
              <span className="text-[10px] opacity-75 font-normal">({circle.memberCount})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Community Posts Stream */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs space-y-4 hover:border-rose-200 transition"
          >
            {/* Post Author Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 text-white font-black flex items-center justify-center text-sm shadow-xs">
                  {post.authorName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 text-sm">{post.authorName}</span>
                    {post.isSampleStory ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {lang === 'ta' ? '★ மாதிரி சாதனை கதை' : lang === 'hi' ? '★ अनुकरणीय सफलता कथा' : '★ Sample Story'}
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {lang === 'ta' ? '✓ தோழியின் சொந்த பதிவு' : lang === 'hi' ? '✓ वास्तविक सखी पोस्ट' : '✓ Community Post'}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-stone-400">
                    {lang === 'ta' ? post.roleTa : lang === 'hi' && post.roleHi ? post.roleHi : post.role} • {post.authorLocation} • {post.timestamp}
                  </div>
                </div>
              </div>

              {/* Action Buttons: Speak, Report, Block */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleSpeakPost(post)}
                  className="p-1.5 text-stone-400 hover:text-rose-600 rounded-full hover:bg-rose-50 transition"
                  title="Listen"
                  aria-label="Listen to post"
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setReportingPost(post)}
                  className="p-1.5 text-stone-400 hover:text-amber-600 rounded-full hover:bg-amber-50 transition"
                  title="Report post"
                  aria-label="Report inappropriate post"
                >
                  <Flag className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setBlockingAuthorName(post.authorName)}
                  className="p-1.5 text-stone-400 hover:text-rose-600 rounded-full hover:bg-rose-50 transition"
                  title="Block member"
                  aria-label="Block this author"
                >
                  <UserX className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Post Title & Content */}
            <div className="space-y-1.5">
              <h3 className="font-extrabold text-stone-900 text-sm leading-snug">
                {post.title}
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed whitespace-pre-line">
                {post.content}
              </p>
            </div>

            {/* Post Footer Actions */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1.5 font-bold transition ${
                    post.isLiked ? 'text-rose-600' : 'text-stone-500 hover:text-rose-600'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-rose-600' : ''}`} />
                  <span>{post.likes} {lang === 'ta' ? 'வாழ்த்துகள்' : lang === 'hi' ? 'प्रोत्साहन' : 'Applauds'}</span>
                </button>

                <button
                  onClick={() => setActiveReplyPostId(activeReplyPostId === post.id ? null : post.id)}
                  className="flex items-center gap-1.5 font-bold text-stone-500 hover:text-stone-800 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.replies.length} {lang === 'ta' ? 'பதில்கள்' : lang === 'hi' ? 'जवाब' : 'Replies'}</span>
                </button>
              </div>

              <span className="text-[10px] text-stone-400">
                {lang === 'ta' ? 'பாதுகாப்பான தோழிகள் வட்டம்' : lang === 'hi' ? 'सुरक्षित सखी मंच' : 'Encouraging Sisterhood'}
              </span>
            </div>

            {/* Reply Input Form */}
            {activeReplyPostId === post.id && (
              <div className="pt-3 border-t border-stone-100 space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={
                      lang === 'ta'
                        ? 'உங்கள் வாழ்த்து அல்லது பதிலை எழுதுங்கள்...'
                        : lang === 'hi'
                        ? 'अपनी प्रतिक्रिया या सहेली को प्रोत्साहन लिखें...'
                        : 'Write encouragement or answer...'
                    }
                    className="flex-1 p-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-rose-500"
                  />
                  <button
                    onClick={() => handleAddReply(post.id)}
                    className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs flex items-center gap-1 transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{lang === 'ta' ? 'பதில்' : lang === 'hi' ? 'भेजें' : 'Reply'}</span>
                  </button>
                </div>

                {/* Replies Thread */}
                {post.replies.length > 0 && (
                  <div className="space-y-2 pl-3 border-l-2 border-rose-200">
                    {post.replies.map((reply) => (
                      <div key={reply.id} className="p-2.5 bg-stone-50 rounded-xl text-xs space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900 text-[11px]">{reply.authorName}</span>
                          <span className="text-[10px] text-stone-400">{reply.timestamp}</span>
                        </div>
                        <p className="text-stone-700 leading-relaxed text-[11px]">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div
          role="dialog"
          aria-label="Create Community Post"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <h2 className="text-base font-extrabold text-stone-900">
                  {lang === 'ta' ? 'தோழிகளோடு பகிருங்கள்' : lang === 'hi' ? 'सखियों के साथ साझा करें' : 'Share with Sisters'}
                </h2>
                <p className="text-xs text-stone-500">
                  {lang === 'ta' ? 'உங்கள் அனுபவம் மற்றொரு கிராமத்து பெண்ணுக்கு புதிய தைரியம் தரும்' : 'Your story inspires another sister'}
                </p>
              </div>
              <button
                onClick={() => setShowNewPostModal(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  {lang === 'ta' ? 'பொருத்தமான வட்டம்:' : lang === 'hi' ? 'संबंधित समूह:' : 'Select Circle:'}
                </label>
                <select
                  value={postCircleId}
                  onChange={(e) => setPostCircleId(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-medium"
                >
                  {communityCircleGroups.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.icon} {getCircleName(c)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  {lang === 'ta' ? 'தலைப்பு:' : lang === 'hi' ? 'शीर्षक:' : 'Title:'}
                </label>
                <input
                  type="text"
                  required
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder={lang === 'ta' ? 'உதா: 3 தையல் மெஷின் வாங்கிய அனுபவம்' : 'e.g. How I started my food unit'}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  {lang === 'ta' ? 'முழு விவரம்:' : lang === 'hi' ? 'विवरण:' : 'Your Story or Question:'}
                </label>
                <textarea
                  required
                  rows={4}
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder={lang === 'ta' ? 'எப்படி தொடங்கினீர்கள்? என்னென்ன தடைகள் வந்தது?' : 'Share your journey...'}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    {lang === 'ta' ? 'உங்கள் பெயர் (விரும்பினால்):' : 'Name (Optional):'}
                  </label>
                  <input
                    type="text"
                    disabled={isAnonymous}
                    value={postAuthor}
                    onChange={(e) => setPostAuthor(e.target.value)}
                    placeholder={lang === 'ta' ? 'உதா: செல்வி' : 'e.g. Selvi'}
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    {lang === 'ta' ? 'மாவட்டம் / ஊர்:' : 'District / Town:'}
                  </label>
                  <input
                    type="text"
                    disabled={isAnonymous}
                    value={postLocation}
                    onChange={(e) => setPostLocation(e.target.value)}
                    placeholder={lang === 'ta' ? 'உதா: சேலம்' : 'e.g. Salem'}
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl disabled:opacity-50"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 p-2.5 bg-rose-50 border border-rose-200 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="accent-rose-600 rounded w-4 h-4"
                />
                <span className="font-bold text-rose-900 text-xs">
                  {lang === 'ta' ? 'பாதுகாப்பு பெயர் (பெயரைக் காட்டாமல் அநாமதேயமாக பகிரவும்)' : 'Post anonymously for privacy protection'}
                </span>
              </label>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="px-4 py-2 border border-stone-300 rounded-xl font-bold text-stone-600 hover:bg-stone-50"
                >
                  {lang === 'ta' ? 'ரத்து' : lang === 'hi' ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-xs"
                >
                  {lang === 'ta' ? 'பதிவிடுக' : lang === 'hi' ? 'पोस्ट करें' : 'Publish Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Community Rules Drawer / Safety Modal */}
      {showRulesModal && (
        <div
          role="dialog"
          aria-label="Community Guidelines"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-rose-600" />
                <h2 className="text-base font-extrabold text-stone-900">
                  {lang === 'ta' ? 'தோழிகள் வட்டத்தின் 4 பாதுகாப்பு விதிகள்' : lang === 'hi' ? 'सखी मंडल के 4 सुरक्षा नियम' : '4 Community Safety Rules'}
                </h2>
              </div>
              <button
                onClick={() => setShowRulesModal(false)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-full"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-700 leading-relaxed">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-2.5">
                <span className="font-black text-rose-600">1.</span>
                <span>
                  <strong>{lang === 'ta' ? 'மரியாதை & சகோதரத்துவம்:' : 'Sisterhood Dignity:'}</strong>{' '}
                  {lang === 'ta' ? 'எல்லா பெண்களும் சமமானவர்கள். கல்வி குறைவாக உள்ள சகோதரிகளையும் மரியாதையுடன் நடத்த வேண்டும்.' : 'Every woman deserves encouragement and kindness.'}
                </span>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-2.5">
                <span className="font-black text-rose-600">2.</span>
                <span>
                  <strong>{lang === 'ta' ? 'தனிநபர் தகவல் பாதுகாப்பு:' : 'Zero Sensitive Data:'}</strong>{' '}
                  {lang === 'ta' ? 'ஆதார் எண், வங்கி கணக்கு எண், OTP அல்லது முழு வீட்டு முகவரியை பொதுவெளியில் பதிவிட வேண்டாம்.' : 'Never post Aadhaar numbers, OTPs, or home addresses in public.'}
                </span>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-2.5">
                <span className="font-black text-rose-600">3.</span>
                <span>
                  <strong>{lang === 'ta' ? 'மோசடி விளம்பரங்கள் தடை:' : 'No MLM or Scams:'}</strong>{' '}
                  {lang === 'ta' ? 'ஒரே நாளில் கோடீஸ்வரர் ஆக்கும் ஏமாற்று திட்டங்கள், MLM இணைப்புகள் தடை செய்யப்பட்டுள்ளன.' : 'Fake get-rich-quick schemes and MLM scams are prohibited.'}
                </span>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-2.5">
                <span className="font-black text-rose-600">4.</span>
                <span>
                  <strong>{lang === 'ta' ? 'புகார் & முடக்கம்:' : 'Report & Block:'}</strong>{' '}
                  {lang === 'ta' ? 'சந்தேகத்திற்கிடமான நபர்களை உடனடியாக கொடி (Flag) குறியீட்டை அழுத்தி புகார் செய்யலாம்.' : 'Use the Flag icon to report inappropriate content immediately.'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowRulesModal(false)}
              className="w-full py-2.5 bg-rose-600 text-white font-bold rounded-xl text-xs hover:bg-rose-700 transition"
            >
              {lang === 'ta' ? 'புரிந்து கொண்டேன்' : lang === 'hi' ? 'समझ गई' : 'I Understand & Agree'}
            </button>
          </div>
        </div>
      )}

      {/* Report Post Modal */}
      {reportingPost && (
        <div
          role="dialog"
          aria-label="Report Post"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
        >
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h2 className="text-base font-extrabold text-stone-900">
                  {lang === 'ta' ? 'பதிவு மீது புகார்' : 'Report Post'}
                </h2>
              </div>
              <button
                onClick={() => setReportingPost(null)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-full"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {reportSuccessMsg ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-xs font-bold text-center">
                {reportSuccessMsg}
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <p className="text-stone-600">
                  {lang === 'ta' ? 'இந்த பதிவை புகாரளிப்பதற்கான காரணம் என்ன?' : 'Why are you reporting this post?'}
                </p>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-medium"
                >
                  <option value="inappropriate">{lang === 'ta' ? 'தவறான அல்லது புண்படுத்தும் கருத்து' : 'Inappropriate or offensive'}</option>
                  <option value="spam">{lang === 'ta' ? 'மோசடி அல்லது போலியான விளம்பரம்' : 'Spam or fake advertisement'}</option>
                  <option value="privacy">{lang === 'ta' ? 'தனிநபர் தொலைபேசி/தகவல் பகிர்வு' : 'Privacy violation / phone leak'}</option>
                  <option value="misleading">{lang === 'ta' ? 'தவறான அரசு திட்ட தகவல்' : 'False scheme information'}</option>
                </select>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={() => setReportingPost(null)}
                    className="px-3.5 py-2 border border-stone-300 rounded-xl font-bold text-stone-600 hover:bg-stone-50"
                  >
                    {lang === 'ta' ? 'ரத்து' : lang === 'hi' ? 'रद्द करें' : 'Cancel'}
                  </button>
                  <button
                    onClick={handleConfirmReport}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl"
                  >
                    {lang === 'ta' ? 'புகாரை அனுப்புக' : 'Submit Report'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Block Author Modal */}
      {blockingAuthorName && (
        <div
          role="dialog"
          aria-label="Block Author"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
        >
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <UserX className="w-5 h-5 text-rose-600" />
              <h2 className="text-base font-extrabold text-stone-900">
                {lang === 'ta' ? 'உறுப்பினரை முடக்கு' : 'Block User'}
              </h2>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              {lang === 'ta'
                ? `"${blockingAuthorName}" அவர்களின் பதிவுகள் இனி உங்கள் திரையில் தோன்றாது. நீங்கள் எப்போது வேண்டுமானாலும் இதை மாற்றிக்கொள்ளலாம்.`
                : `Posts by "${blockingAuthorName}" will no longer appear on your screen.`}
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setBlockingAuthorName(null)}
                className="px-3.5 py-2 border border-stone-300 rounded-xl text-xs font-bold text-stone-600"
              >
                {lang === 'ta' ? 'ரத்து' : lang === 'hi' ? 'रद्द करें' : 'Cancel'}
              </button>
              <button
                onClick={handleConfirmBlock}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl"
              >
                {lang === 'ta' ? 'முடக்கு (Block)' : 'Block'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
