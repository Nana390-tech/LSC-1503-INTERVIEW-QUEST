
import React, { useState, useMemo } from 'react';
import { CATEGORIES, RATING_LABELS } from './constants';
import { UserSelections } from './types';
import { 
  ChevronRight, ChevronLeft, Star, CheckCircle2, Trophy, 
  ArrowRight, ClipboardList, Info, PenTool, Printer, 
  Languages, Lightbulb, Sparkles, Sword, Shield, Zap, Target
} from 'lucide-react';

const triggerConfetti = () => {
  // @ts-ignore
  if (window.confetti) {
    // @ts-ignore
    window.confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981']
    });
  }
};

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'quiz' | 'vocabulary' | 'story' | 'summary'>('intro');
  const [quizIndex, setQuizIndex] = useState(0);
  const [showToolbox, setShowToolbox] = useState(false);
  const [languageFeedback, setLanguageFeedback] = useState<{ type: 'good' | 'tip'; text: string } | null>(null);
  
  const [userSelections, setUserSelections] = useState<UserSelections>({
    ratings: {},
    selectedVocabulary: {},
    topStrengthId: null,
    story: ''
  });

  const quizProgress = Math.round(((quizIndex + 1) / CATEGORIES.length) * 100);

  const handleRate = (itemId: string, score: number) => {
    setUserSelections(prev => ({
      ...prev,
      ratings: { ...prev.ratings, [itemId]: score }
    }));
  };

  const toggleVocabulary = (categoryId: string, word: string) => {
    setUserSelections(prev => {
      const currentWords = prev.selectedVocabulary[categoryId] || [];
      const newWords = currentWords.includes(word)
        ? currentWords.filter(w => w !== word)
        : [...currentWords, word];
      return {
        ...prev,
        selectedVocabulary: { ...prev.selectedVocabulary, [categoryId]: newWords }
      };
    });
  };

  const checkWriting = () => {
    const text = userSelections.story.toLowerCase();
    const pastTenseWords = ['was', 'were', 'did', 'had', 'made', 'worked', 'helped', 'fixed', 'planned', 'started', 'finished', 'solved', 'organized', 'took', 'gave', 'went'];
    const hasPastTense = pastTenseWords.some(word => text.includes(word));
    
    if (text.length < 50) {
      setLanguageFeedback({ type: 'tip', text: "A bit short! Add one more detail about the result." });
    } else if (!hasPastTense) {
      setLanguageFeedback({ type: 'tip', text: "Tip: Use past tense like 'I helped' or 'It was'." });
    } else {
      setLanguageFeedback({ type: 'good', text: "Heroic writing! You used great past tense details." });
    }
  };

  const nextQuizStep = () => {
    const isLastCategory = quizIndex >= CATEGORIES.length - 1;
    if (isLastCategory) {
      setCurrentStep('vocabulary');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setQuizIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const finishActivity = () => {
    setCurrentStep('summary');
    triggerConfetti();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentCategory = CATEGORIES[quizIndex] || CATEGORIES[0];
  const topCategoryData = CATEGORIES.find(c => c.id === userSelections.topStrengthId);

  const highRatedCategories = useMemo(() => {
    const scored = CATEGORIES.filter(cat => cat.items.some(i => (userSelections.ratings[i.id] || 0) >= 4));
    if (scored.length === 0) {
       return CATEGORIES.slice(0, 3);
    }
    return scored;
  }, [userSelections.ratings]);

  const sentenceStarters = [
    { label: "S - Where?", phrases: ["In my last project...", "Last semester...", "At my job..."] },
    { label: "T - What?", phrases: ["The goal was...", "The problem was...", "We needed to..."] },
    { label: "A - Action", phrases: ["I decided to...", "I organized...", "I helped by..."] },
    { label: "R - Result", phrases: ["Finally, we...", "The result was...", "My boss said..."] },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-white pb-12">
      <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>

      {/* Sticky Header */}
      {currentStep !== 'intro' && (
        <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10 px-6 py-4 no-print shadow-2xl">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xl bungee tracking-tighter text-blue-400">LSC 1503</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Higher Colleges of Technology</span>
            </div>
            
            <div className="flex-1 max-w-sm mx-8 hidden sm:block">
              <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase mb-1.5 tracking-widest">
                <span>Quest Progress</span>
                <span>{currentStep === 'quiz' ? quizProgress : 100}%</span>
              </div>
              <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5 p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-700 ease-out"
                  style={{ width: currentStep === 'quiz' ? `${quizProgress}%` : '100%' }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
               <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
               </div>
            </div>
          </div>
        </header>
      )}

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 pt-8">
        {currentStep === 'intro' && (
          <div className="animate-in fade-in zoom-in-95 duration-1000">
            <div className="relative glass-card rounded-[2.5rem] overflow-hidden border-2 border-white/10">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 via-purple-500 via-pink-500 to-orange-500"></div>
              
              <div className="p-8 md:p-16 text-center">
                <div className="inline-flex relative mb-10">
                   <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
                   <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl transform -rotate-6">
                      <Sword className="w-12 h-12 text-white" />
                   </div>
                   <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-xl transform rotate-12">
                      <Target className="w-6 h-6 text-white" />
                   </div>
                </div>

                <div className="flex flex-col gap-2 mb-4">
                  <h2 className="text-xl bungee text-blue-400 tracking-tight">LSC 1503 Professional Spoken Communications</h2>
                  <h1 className="text-5xl md:text-7xl bungee text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 leading-none">
                    INTERVIEW QUEST
                  </h1>
                </div>
                
                <div className="flex flex-col items-center gap-2 mb-10">
                   <div className="h-px w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                   <p className="text-blue-300 font-black uppercase tracking-[0.4em] text-xs">Higher Colleges of Technology</p>
                   <div className="h-px w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                </div>

                <p className="text-slate-300 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-12">
                  Prepare for your future career! Discover your powers, collect professional words, and write your hero story.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                  {[
                    { label: 'STAGE 1', title: 'DISCOVERY', icon: Zap, color: 'text-yellow-400' },
                    { label: 'STAGE 2', title: 'INVENTORY', icon: ClipboardList, color: 'text-blue-400' },
                    { label: 'STAGE 3', title: 'HERO STORY', icon: PenTool, color: 'text-purple-400' }
                  ].map((s, i) => (
                    <div key={i} className="glass-card p-6 rounded-3xl border border-white/5 group hover:border-white/20 transition-all">
                      <span className="text-[10px] font-black text-slate-500 tracking-widest">{s.label}</span>
                      <div className={`my-3 flex justify-center ${s.color}`}>
                         <s.icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
                      </div>
                      <h3 className="font-black text-sm tracking-widest">{s.title}</h3>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setCurrentStep('quiz')}
                  className="group relative w-full sm:w-auto px-12 py-6 bg-white text-slate-900 rounded-[2rem] font-black text-2xl bungee tracking-wider shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(59,130,246,0.4)] hover:scale-[1.02] active:scale-95 transition-all mb-8"
                >
                  START QUEST
                  <ArrowRight className="inline-block ml-3 w-8 h-8 group-hover:translate-x-2 transition-transform" />
                </button>

                <div className="pt-8 border-t border-white/10 mt-4">
                  <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px]">
                    Designed by Nazila Motahari
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'quiz' && (
          <div className="animate-in slide-in-from-right-12 fade-in duration-500">
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-5">
                  <div className={`w-20 h-20 rounded-3xl ${currentCategory.color} shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-center text-4xl border-4 border-white/10`}>
                    {currentCategory.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-black tracking-tight">{currentCategory.name}</h2>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">Skill Category {quizIndex + 1} of 8</p>
                  </div>
               </div>
               <div className="hidden md:flex flex-col items-end">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Level</span>
                  <span className="text-4xl bungee text-blue-500">{quizIndex + 1}</span>
               </div>
            </div>

            <div className="space-y-6">
              {currentCategory.items.map((item, idx) => (
                <div key={item.id} className="glass-card rounded-[2rem] overflow-hidden border border-white/10 p-8 hover:bg-white/[0.07] transition-all group">
                   <div className="flex gap-4 mb-6">
                      <span className="text-slate-600 font-black text-2xl bungee opacity-30">0{idx + 1}</span>
                      <p className="text-2xl font-bold leading-tight text-slate-100">
                        {item.text}
                      </p>
                   </div>
                  
                  <div className="grid grid-cols-5 gap-3">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <button
                        key={score}
                        onClick={() => handleRate(item.id, score)}
                        className={`group relative flex flex-col items-center gap-2 py-5 rounded-2xl transition-all border-2 ${
                          userSelections.ratings[item.id] === score
                            ? 'bg-blue-600 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)] scale-[1.02]'
                            : 'bg-slate-800/40 border-white/5 hover:border-white/20'
                        }`}
                      >
                        <span className={`text-2xl font-black ${userSelections.ratings[item.id] === score ? 'text-white' : 'text-slate-500'}`}>
                          {score}
                        </span>
                        <span className={`text-[9px] font-black uppercase tracking-tighter ${userSelections.ratings[item.id] === score ? 'text-blue-100' : 'text-slate-600'}`}>
                          {RATING_LABELS[score - 1]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex items-center justify-between pb-12">
              <button 
                onClick={() => quizIndex > 0 ? setQuizIndex(quizIndex - 1) : setCurrentStep('intro')}
                className="px-8 py-5 rounded-2xl bg-slate-800/50 hover:bg-slate-800 text-slate-400 font-black flex items-center gap-3 transition-all border border-white/5"
              >
                <ChevronLeft className="w-5 h-5" /> BACK
              </button>
              <button 
                onClick={nextQuizStep}
                disabled={currentCategory.items.some(i => !userSelections.ratings[i.id])}
                className={`px-12 py-5 rounded-2xl font-black text-xl shadow-2xl transition-all flex items-center gap-3 ${
                  currentCategory.items.some(i => !userSelections.ratings[i.id])
                    ? 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-blue-500/20 hover:scale-[1.02] active:scale-95'
                }`}
              >
                {quizIndex >= CATEGORIES.length - 1 ? 'UNLOCK INVENTORY' : 'NEXT STAGE'} <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {currentStep === 'vocabulary' && (
          <div className="animate-in fade-in slide-in-from-bottom-12 duration-700">
            <div className="text-center mb-12">
              <div className="inline-flex p-4 bg-blue-500/10 rounded-full mb-6 ring-1 ring-blue-500/30">
                 <Shield className="w-10 h-10 text-blue-400" />
              </div>
              <h2 className="text-5xl bungee tracking-tight mb-4">SKILL INVENTORY</h2>
              <p className="text-slate-400 max-w-xl mx-auto font-medium">Equip your professional keywords! Click to add them to your hero profile.</p>
            </div>

            <div className="space-y-6">
              {highRatedCategories.map(cat => (
                <div key={cat.id} className="glass-card rounded-[2.5rem] p-8 border border-white/10">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-3xl">{cat.icon}</span>
                    <h3 className="text-2xl font-black text-slate-200 uppercase tracking-tight">{cat.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {cat.vocabulary.map(word => {
                      const isSelected = userSelections.selectedVocabulary[cat.id]?.includes(word);
                      return (
                        <button
                          key={word}
                          onClick={() => toggleVocabulary(cat.id, word)}
                          className={`px-5 py-3 rounded-2xl font-black text-sm border-2 transition-all flex items-center gap-2 ${
                            isSelected
                              ? `${cat.color} text-white border-transparent shadow-[0_0_20px_rgba(255,255,255,0.1)] scale-105`
                              : 'bg-slate-800/40 text-slate-500 border-white/5 hover:border-white/20 hover:text-slate-300'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-4 h-4" />}
                          {word}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 glass-card rounded-[2.5rem] p-10 border-2 border-indigo-500/30 text-center bg-gradient-to-br from-indigo-900/20 to-purple-900/20">
              <h3 className="text-3xl bungee mb-4 text-white">SELECT YOUR MAIN POWER</h3>
              <p className="text-indigo-200/60 font-bold uppercase text-[10px] tracking-[0.3em] mb-10">You can only master one main skill for your story</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
                {CATEGORIES.map(cat => (
                   <button
                    key={cat.id}
                    onClick={() => setUserSelections(prev => ({ ...prev, topStrengthId: cat.id }))}
                    className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 relative overflow-hidden group ${
                      userSelections.topStrengthId === cat.id
                        ? 'bg-white text-indigo-900 border-white scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)]'
                        : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
                    }`}
                   >
                     {userSelections.topStrengthId === cat.id && (
                        <div className="absolute top-2 right-2">
                           <Star className="w-4 h-4 text-indigo-500 fill-indigo-500" />
                        </div>
                     )}
                     <span className="text-4xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                     <span className="font-black text-[10px] uppercase tracking-widest text-center leading-tight">{cat.name}</span>
                   </button>
                ))}
              </div>

              <button 
                onClick={() => setCurrentStep('story')}
                disabled={!userSelections.topStrengthId}
                className={`w-full py-6 rounded-[2rem] font-black text-2xl bungee tracking-widest shadow-2xl transition-all ${
                  !userSelections.topStrengthId
                    ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                    : 'bg-white text-indigo-900 hover:bg-slate-100 hover:scale-[1.01] active:scale-95'
                }`}
              >
                LEVEL UP: WRITE STORY
              </button>
            </div>
          </div>
        )}

        {currentStep === 'story' && (
          <div className="animate-in zoom-in-95 duration-500">
            <div className="text-center mb-10">
              <h2 className="text-5xl bungee tracking-tight mb-4">HERO LOG</h2>
              <p className="text-slate-400 font-medium">"Tell me about a time you used your <span className="text-blue-400 font-black">{topCategoryData?.name}</span> power."</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 mb-8">
              <div className="flex-1">
                <div className="glass-card rounded-[2.5rem] border border-white/10 overflow-hidden">
                  <div className="bg-slate-800/80 px-8 py-5 flex justify-between items-center border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="ml-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Terminal V1.0</span>
                    </div>
                    <button 
                      onClick={() => setShowToolbox(!showToolbox)}
                      className="text-[10px] font-black uppercase text-blue-400 hover:text-white transition-all bg-blue-500/10 px-4 py-1.5 rounded-full ring-1 ring-blue-500/20"
                    >
                      {showToolbox ? 'CLOSE HELP' : 'OPEN HELP'}
                    </button>
                  </div>
                  
                  <div className="p-8">
                    <textarea 
                      value={userSelections.story}
                      onChange={(e) => {
                        setUserSelections(prev => ({ ...prev, story: e.target.value }));
                        setLanguageFeedback(null);
                      }}
                      placeholder="Type your story in past tense... (I helped, We did, I worked...)"
                      className="w-full h-80 p-6 rounded-2xl bg-black/30 border-2 border-white/5 focus:border-blue-500/50 focus:ring-0 transition-all text-xl resize-none font-medium placeholder:text-slate-700 text-blue-100"
                    />
                    
                    <div className="mt-6 flex flex-wrap gap-4 items-center justify-between">
                       <button 
                        onClick={checkWriting}
                        disabled={userSelections.story.length < 10}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl text-sm font-black flex items-center gap-3 transition-all active:scale-95 disabled:opacity-30"
                      >
                        <Sparkles className="w-5 h-5" /> SCAN WRITING
                      </button>
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-800/50 px-4 py-2 rounded-lg border border-white/5">
                        Status: <span className={userSelections.story.length >= 30 ? 'text-green-500' : 'text-yellow-500'}>
                          {userSelections.story.length < 30 ? 'CHARGING...' : 'READY'}
                        </span>
                      </div>
                    </div>

                    {languageFeedback && (
                      <div className={`mt-8 p-6 rounded-[2rem] flex items-start gap-4 animate-in slide-in-from-top-4 ${
                        languageFeedback.type === 'good' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-100' : 'bg-orange-500/10 border border-orange-500/30 text-orange-100'
                      }`}>
                        <div className={`p-3 rounded-2xl ${languageFeedback.type === 'good' ? 'bg-emerald-500 text-white' : 'bg-orange-500 text-white shadow-lg'}`}>
                           {languageFeedback.type === 'good' ? <CheckCircle2 className="w-5 h-5" /> : <Lightbulb className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase tracking-widest mb-1 opacity-60">
                            {languageFeedback.type === 'good' ? "SYSTEM SUCCESS" : "MISSION GUIDANCE"}
                          </p>
                          <p className="font-bold text-lg leading-tight">{languageFeedback.text}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className={`lg:w-80 space-y-4 transition-all duration-300 ${showToolbox ? 'opacity-100 translate-x-0' : 'lg:opacity-100'}`}>
                <div className="glass-card rounded-[2.5rem] p-8 border border-white/10 h-full">
                  <h4 className="font-black text-blue-400 text-[11px] uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                    <Languages className="w-4 h-4" /> PHRASE BOOSTER
                  </h4>
                  <div className="space-y-6">
                    {sentenceStarters.map((starter) => (
                      <div key={starter.label} className="space-y-2">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-2">{starter.label}</span>
                        <div className="flex flex-col gap-2">
                          {starter.phrases.map((phrase) => (
                            <button
                              key={phrase}
                              onClick={() => {
                                setUserSelections(prev => ({ ...prev, story: prev.story + (prev.story ? ' ' : '') + phrase }));
                                setLanguageFeedback(null);
                              }}
                              className="text-left text-[11px] font-bold p-3 bg-white/5 hover:bg-blue-500/20 border border-white/5 rounded-xl text-slate-300 hover:text-white transition-all hover:scale-[1.02]"
                            >
                              {phrase}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pb-12">
              <button 
                onClick={() => setCurrentStep('vocabulary')}
                className="px-8 py-5 rounded-2xl text-slate-500 font-black hover:bg-slate-800/50 transition-all border border-white/5"
              >
                BACK
              </button>
              <button 
                onClick={finishActivity}
                disabled={userSelections.story.length < 30}
                className={`px-16 py-6 rounded-[2rem] font-black text-2xl bungee tracking-widest shadow-[0_0_40px_rgba(79,70,229,0.3)] transition-all ${
                  userSelections.story.length < 30
                    ? 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-40'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:scale-[1.02] active:scale-95'
                }`}
              >
                FINISH QUEST
              </button>
            </div>
          </div>
        )}

        {currentStep === 'summary' && (
          <div className="animate-in zoom-in-90 duration-1000 pb-20">
            <div className="max-w-3xl mx-auto glass-card rounded-[3rem] overflow-hidden border-4 border-white/10 shadow-[0_0_100px_rgba(59,130,246,0.2)] print:border-slate-200 print:shadow-none print:rounded-none">
              
              <div className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-900 p-12 text-center overflow-hidden print:bg-white print:text-slate-900 print:border-b-4 print:border-blue-600">
                <div className="relative z-10">
                  <div className="flex flex-col items-center gap-1 mb-8">
                     <div className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-200">LSC 1503 Interview Profile</span>
                     </div>
                     <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 mt-1">Higher Colleges of Technology</span>
                  </div>

                  <div className="mb-8 floating">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full"></div>
                      <div className="relative w-32 h-32 bg-white rounded-[2.5rem] shadow-2xl flex items-center justify-center text-7xl transform -rotate-3 border-4 border-white/20">
                        {topCategoryData?.icon}
                      </div>
                    </div>
                  </div>

                  <h1 className="text-6xl md:text-7xl bungee tracking-tighter mb-4 text-white leading-none">QUEST COMPLETE!</h1>
                  <p className="text-blue-100 text-xl font-bold opacity-80 max-w-md mx-auto italic">
                    "I have the skills, the words, and the story to succeed."
                  </p>
                </div>
              </div>

              <div className="p-10 md:p-16 space-y-16 bg-slate-900/50 print:bg-white print:text-slate-900">
                <section>
                   <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
                      <h3 className="text-xl font-black uppercase tracking-[0.3em] text-blue-400">Combat Class</h3>
                   </div>
                   <div className="bg-white/5 p-10 rounded-[2.5rem] border-2 border-white/10 print:bg-slate-50 print:border-slate-200">
                      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                         <div className="text-center md:text-left">
                            <span className="text-blue-500 font-black uppercase text-xs tracking-widest">Master Category</span>
                            <h4 className="text-5xl font-black text-white leading-tight mt-1 print:text-blue-900 uppercase bungee">{topCategoryData?.name}</h4>
                            <div className="flex items-center justify-center md:justify-start gap-2 mt-4">
                               {[1,2,3,4,5].map(s => (
                                  <Star key={s} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                               ))}
                               <span className="ml-2 text-xs font-black text-slate-500">MAX LEVEL</span>
                            </div>
                         </div>
                         <div className="bg-white/5 p-6 rounded-3xl border border-white/5 text-center px-10 print:bg-white print:border-slate-300">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Role Description</span>
                            <p className="text-lg font-bold text-slate-300 italic print:text-slate-700">"A reliable professional who drives success."</p>
                         </div>
                      </div>
                   </div>
                </section>

                <section>
                   <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-1 bg-purple-500 rounded-full"></div>
                      <h3 className="text-xl font-black uppercase tracking-[0.3em] text-purple-400">Battle Report</h3>
                   </div>
                   <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                      <div className="relative bg-black/40 backdrop-blur-xl p-12 rounded-[2.5rem] border-2 border-purple-500/30 print:bg-white print:border-slate-300 print:shadow-none">
                         <div className="flex items-center gap-2 text-[10px] font-black text-purple-400 uppercase tracking-[0.3em] mb-6">
                            <PenTool className="w-4 h-4" /> STAR NARRATIVE
                         </div>
                         <p className="text-white text-3xl font-medium leading-relaxed whitespace-pre-wrap font-serif italic print:text-slate-900 print:text-xl">
                            "{userSelections.story}"
                         </p>
                      </div>
                   </div>
                </section>

                <section>
                   <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-1 bg-emerald-500 rounded-full"></div>
                      <h3 className="text-xl font-black uppercase tracking-[0.3em] text-emerald-400">Power Keywords</h3>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {CATEGORIES.filter(cat => cat.items.some(i => (userSelections.ratings[i.id] || 0) >= 4)).map(cat => (
                      <div key={cat.id} className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all print:bg-slate-50 print:border-slate-200">
                        <div className="flex items-center gap-3 mb-6">
                          <span className="text-2xl">{cat.icon}</span>
                          <span className="font-black text-slate-400 text-[10px] uppercase tracking-[0.3em]">{cat.name}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(userSelections.selectedVocabulary[cat.id] || []).map(v => (
                            <span key={v} className="bg-emerald-500/20 px-4 py-2 rounded-xl text-xs font-black text-emerald-400 border border-emerald-500/30 print:bg-white print:text-emerald-700 print:border-emerald-200">
                              {v}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="pt-16 flex flex-col items-center gap-6 no-print border-t border-white/5">
                  <button 
                    onClick={() => window.print()}
                    className="group relative w-full sm:w-auto overflow-hidden bg-white text-slate-900 font-black py-6 px-16 rounded-[2.5rem] shadow-2xl transition-all hover:scale-105 active:scale-95"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    <div className="relative flex items-center justify-center gap-4 text-2xl bungee tracking-widest">
                       <Printer className="w-8 h-8" /> PRINT HERO PROFILE
                    </div>
                  </button>
                  <button 
                    onClick={() => window.location.reload()}
                    className="text-slate-500 hover:text-white font-black text-xs uppercase tracking-[0.4em] transition-all"
                  >
                    RESET SESSION & RE-SPEC
                  </button>
                </div>
              </div>

              <div className="bg-slate-950 p-8 text-center border-t border-white/5 print:bg-white print:text-slate-400 print:border-slate-200">
                 <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.5em] print:text-slate-400">
                    LEGENDARY STATUS • LSC 1503 • HIGHER COLLEGES OF TECHNOLOGY • 2025
                 </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="py-12 text-center text-slate-600 text-[9px] font-black uppercase tracking-[0.5em] no-print">
        <p>Interview Quest • Professional Spoken Communications</p>
      </footer>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .game-bg, .mesh-gradient { display: none !important; }
          main { max-width: 100% !important; padding: 0 !important; margin: 0 !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:border-none { border: none !important; }
          .print\\:rounded-none { border-radius: 0 !important; }
          .print\\:bg-white { background-color: white !important; }
          .print\\:text-slate-900 { color: #0f172a !important; }
          .print\\:text-blue-900 { color: #1e3a8a !important; }
          .print\\:border-slate-200 { border-color: #e2e8f0 !important; }
        }
      `}</style>
    </div>
  );
};

export default App;
