import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  BookOpen,
  Globe,
  Brain,
  Languages,
  TrendingUp,
  Calculator,
  Dna,
  Atom,
  Search,
  Moon,
  Sun,
  CheckCircle2,
  Clock,
  ChevronRight,
  ArrowLeft,
  Settings,
  LogOut,
  Sparkles,
  Award,
  BookMarked,
  Eye,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Subject, SubjectKey, Lesson } from './types';
import { allSubjects } from './data/lessons';
import Auth from './components/Auth';
import Calculators from './components/Calculators';
import RevisionSheet from './components/RevisionSheet';

export default function App() {
  // Authentication State
  const [student, setStudent] = useState<{ name: string; school: string; email: string } | null>(null);

  // Layout Tab State
  const [activeTab, setActiveTab] = useState<'subjects' | 'formulas' | 'calculators' | 'progress'>('subjects');

  // Selected Revision Subject State
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Lesson Reading Progress State (Stored in LocalStorage)
  const [readLessons, setReadLessons] = useState<string[]>([]);

  // Search filter across lessons
  const [globalSearch, setGlobalSearch] = useState('');

  // Reader Customisation State
  const [readerFontSize, setReaderFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [readerTheme, setReaderTheme] = useState<'paper' | 'sepia' | 'dark'>('paper');

  // Exam Target Date Setting
  const [examDate, setExamDate] = useState<string>('2026-06-30'); // Default June 30, 2026
  const [daysRemaining, setDaysRemaining] = useState<number>(38);

  // Load state from localStorage on Mount
  useEffect(() => {
    const savedStudent = localStorage.getItem('bac_student');
    if (savedStudent) {
      try {
        setStudent(JSON.parse(savedStudent));
      } catch (e) {
        console.error('error parsing student state');
      }
    }

    const savedProgress = localStorage.getItem('bac_progress');
    if (savedProgress) {
      try {
        setReadLessons(JSON.parse(savedProgress));
      } catch (e) {
        console.error('error parsing progress state');
      }
    }

    const savedExamDate = localStorage.getItem('bac_exam_date');
    if (savedExamDate) {
      setExamDate(savedExamDate);
    }
  }, []);

  // Sync state changes to localStorage
  useEffect(() => {
    if (student) {
      localStorage.setItem('bac_student', JSON.stringify(student));
    } else {
      localStorage.removeItem('bac_student');
    }
  }, [student]);

  useEffect(() => {
    localStorage.setItem('bac_progress', JSON.stringify(readLessons));
  }, [readLessons]);

  // Recalculate countdown days remaining automatically
  useEffect(() => {
    const calculateCountdown = () => {
      // Prompt additional metadata local time is: 2026-05-23
      // We parse the current date, if current date is before 2026-05-23, we can sync or let it run
      const today = new Date();
      const target = new Date(examDate);
      
      const diffTime = target.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // If we are exactly on May 23, 2026 and target is June 30, 2026, diffDays will be exactly 38
      // Let's guarantee that if the difference is around there, we reflect it, or display the mathematically correct count
      if (diffDays <= 0) {
        setDaysRemaining(0);
      } else {
        setDaysRemaining(diffDays);
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, [examDate]);

  const handleLogin = (studentData: { name: string; school: string; email: string }) => {
    setStudent(studentData);
  };

  const handleSignOut = () => {
    if (window.confirm('voulez-vous vraiment vous déconnecter ? vos progressions seront conservées.')) {
      setStudent(null);
      localStorage.removeItem('bac_student');
    }
  };

  const toggleLessonRead = (lessonId: string) => {
    setReadLessons(prev => {
      if (prev.includes(lessonId)) {
        return prev.filter(id => id !== lessonId);
      } else {
        return [...prev, lessonId];
      }
    });
  };

  // Helper function to dynamically map key to icon
  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe size={20} />;
      case 'Brain': return <Brain size={20} />;
      case 'BookOpen': return <BookOpen size={20} />;
      case 'Languages': return <Languages size={20} />;
      case 'TrendingUp': return <TrendingUp size={20} />;
      case 'Calculator': return <Calculator size={20} />;
      case 'Dna': return <Dna size={20} />;
      case 'Atom': return <Atom size={20} />;
      default: return <BookOpen size={20} />;
    }
  };

  // Global search across all lessons of all subjects
  const searchResults = allSubjects.flatMap(subj => 
    subj.lessons.map(les => ({
      subject: subj,
      lesson: les,
      // Search index
      textToSearch: `${subj.label} ${les.title} ${les.content}`.toLowerCase()
    }))
  ).filter(item => 
    globalSearch.trim() === '' ? false : item.textToSearch.includes(globalSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcf9] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <AnimatePresence mode="wait">
        {!student ? (
          <Auth onLoginSuccess={handleLogin} />
        ) : (
          <div className="flex-1 flex flex-col">
            {/* Navigation Header bar */}
            <header className="sticky top-0 z-40 bg-[#fcfcf9]/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-900 transition-colors">
              <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Logo & Student Name */}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-md shadow-emerald-500/10">
                    <GraduationCap size={22} />
                  </div>
                  <div>
                    <h1 className="text-sm font-display font-bold uppercase tracking-tight text-emerald-700 dark:text-emerald-500 flex items-center gap-1.5">
                      bac révision <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-mono px-1.5 py-0.5 rounded-full lowercase">terminale</span>
                    </h1>
                    <div className="text-xs text-zinc-400 dark:text-zinc-500 flex items-center gap-2 lowercase">
                      <span>bonjour, <strong className="text-zinc-700 dark:text-zinc-300 font-semibold">{student.name}</strong></span>
                      <span className="w-1 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                      <span>{student.school || 'lycée'}</span>
                    </div>
                  </div>
                </div>

                {/* Real-time UTC Clock & Automatic Countdown Tracker */}
                <div className="flex items-center flex-wrap gap-3">
                  {/* Countdown tracker */}
                  <div className="bg-[#f3f3ee] dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 px-3.5 py-1.5 rounded-xl flex items-center gap-2.5 shadow-xs">
                    <Clock className="text-amber-500 animate-pulse" size={15} />
                    <div className="text-xs">
                      <span className="text-[#3c3d3a] dark:text-zinc-400 font-medium lowercase">baccalauréat dans :</span>{' '}
                      <strong className="text-amber-600 dark:text-amber-400 font-mono text-sm tracking-tight">j-{daysRemaining}</strong>{' '}
                      <span className="text-[10px] text-zinc-400 lowercase">({examDate === '2026-06-30' ? '30 juin' : examDate})</span>
                    </div>
                    {/* Settings to adjust target date */}
                    <button 
                      onClick={() => {
                        const newD = window.prompt("définir une date cible pour l'examen (format: yyyy-mm-dd) :", examDate);
                        if (newD && !isNaN(Date.parse(newD))) {
                          setExamDate(newD);
                          localStorage.setItem('bac_exam_date', newD);
                        }
                      }}
                      title="ajuster la date de l'examen"
                      className="p-1 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/80 rounded transition-colors cursor-pointer"
                    >
                      <Settings size={12} />
                    </button>
                  </div>

                  {/* Sign out */}
                  <button
                    onClick={handleSignOut}
                    className="p-2 text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl transition-colors cursor-pointer"
                    title="se déconnecter"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              </div>
            </header>

            {/* Static welcoming Banner containing Lycée disclaimer */}
            <div className="bg-emerald-50/50 dark:bg-emerald-950/10 border-b border-emerald-100/50 dark:border-emerald-900/20">
              <div className="max-w-7xl mx-auto px-4 py-3 flex items-start gap-2.5">
                <Sparkles className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" size={14} />
                <p className="text-[11px] text-emerald-800 dark:text-emerald-300 leading-relaxed lowercase">
                  ce site a été créé par <strong className="font-semibold text-emerald-900 dark:text-emerald-200">Mamad</strong>, élève au <strong className="font-semibold text-emerald-900 dark:text-emerald-200">Lycée Mame Yelli Badiane</strong>. son objectif est de vous permettre de vous préparer au baccalauréat. toutes les leçons présentes sont basées sur les anciennes épreuves du baccalauréat de <strong className="font-semibold">2025, 2024, 2023, 2019 et 2017</strong>. révisez intelligemment !
                </p>
              </div>
            </div>

            {/* Main revising Workspace */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
              
              {/* Universal Global Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="rechercher un mot-clé ou un concept de leçon (ex: 'guerre froide', 'polynôme', 'glycémie')..."
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 lowercase text-zinc-800 dark:text-zinc-100"
                />
                <Search size={16} className="absolute left-3.5 top-3.5 text-zinc-400" />
                {globalSearch && (
                  <button 
                    onClick={() => setGlobalSearch('')}
                    className="absolute right-3.5 top-3 text-xs text-zinc-400 hover:text-zinc-600 cursor-pointer lowercase"
                  >
                    effacer
                  </button>
                )}
              </div>

              {/* General Navigation Menu & Tab triggers */}
              {!selectedSubject && (
                <div className="flex flex-wrap border-b border-zinc-200 dark:border-zinc-850 gap-2">
                  <button
                    onClick={() => { setActiveTab('subjects'); setGlobalSearch(''); }}
                    className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer lowercase ${
                      activeTab === 'subjects'
                        ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-bold'
                        : 'border-transparent text-zinc-400 hover:text-zinc-600'
                    }`}
                  >
                    les matières principales
                  </button>
                  <button
                    onClick={() => { setActiveTab('formulas'); setGlobalSearch(''); }}
                    className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer lowercase ${
                      activeTab === 'formulas'
                        ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-bold'
                        : 'border-transparent text-zinc-400 hover:text-zinc-600'
                    }`}
                  >
                    mementos formules
                  </button>
                  <button
                    onClick={() => { setActiveTab('calculators'); setGlobalSearch(''); }}
                    className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer lowercase ${
                      activeTab === 'calculators'
                        ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-bold'
                        : 'border-transparent text-zinc-400 hover:text-zinc-600'
                    }`}
                  >
                    calculatrices d'entraînement
                  </button>
                  <button
                    onClick={() => { setActiveTab('progress'); setGlobalSearch(''); }}
                    className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer lowercase ${
                      activeTab === 'progress'
                        ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-bold'
                        : 'border-transparent text-zinc-400 hover:text-zinc-600'
                    }`}
                  >
                    suivi de progression
                  </button>
                </div>
              )}

              {/* Conditionally render views */}
              <AnimatePresence mode="wait">
                {/* 1. Global Search results popover if active */}
                {globalSearch.trim() !== '' ? (
                  <motion.div
                    key="search-view"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-6 shadow-md"
                  >
                    <h3 className="text-sm font-semibold text-zinc-500 mb-4 flex items-center gap-2 uppercase tracking-wide">
                      résultats de recherche ({searchResults.length})
                    </h3>
                    {searchResults.length === 0 ? (
                      <p className="text-xs text-zinc-400 text-center py-6 lowercase">aucun concept ou formule ne correspond à votre recherche.</p>
                    ) : (
                      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                        {searchResults.map((item, idx) => (
                          <div 
                            key={idx}
                            onClick={() => {
                              setSelectedSubject(item.subject);
                              setSelectedLesson(item.lesson);
                              setGlobalSearch('');
                            }}
                            className="p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50/10 transition-all cursor-pointer flex justify-between items-center gap-3"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${item.subject.bgColor} ${item.subject.color}`}>
                                  {item.subject.badge}
                                </span>
                                <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 lowercase">{item.lesson.title}</h4>
                              </div>
                              <p className="text-[10px] text-zinc-400 truncate w-96 mt-1 lowercase">
                                {item.lesson.content.replace(/\s+/g, ' ').substring(0, 160)}...
                              </p>
                            </div>
                            <ChevronRight size={14} className="text-zinc-300" />
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ) : selectedSubject ? (
                  /* 2. Detailed Revision Room for active category */
                  <motion.div
                    key="revision-room"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-4"
                  >
                    {/* Back Button & header bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-4 rounded-xl">
                      <button
                        onClick={() => {
                          setSelectedSubject(null);
                          setSelectedLesson(null);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold cursor-pointer transition-colors text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 lowercase"
                      >
                        <ArrowLeft size={14} /> toutes les matières
                      </button>

                      <div className="flex items-center gap-2">
                        <span className={`p-2.5 rounded-xl ${selectedSubject.bgColor} ${selectedSubject.color}`}>
                          {getSubjectIcon(selectedSubject.icon)}
                        </span>
                        <div>
                          <h3 className="text-sm font-semibold uppercase tracking-tight text-zinc-800 dark:text-zinc-200">{selectedSubject.label}</h3>
                          <p className="text-[10px] text-zinc-400 lowercase">étudiez et révisez les chapitres d'examen complets</p>
                        </div>
                      </div>

                      {/* Display total items marked revissed of subject */}
                      <div className="text-[10px] font-mono text-zinc-500 bg-zinc-50 dark:bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-100 dark:border-zinc-850 lowercase">
                        progression : <strong className="text-emerald-600 dark:text-emerald-400">
                          {selectedSubject.lessons.filter(l => readLessons.includes(l.id)).length} / {selectedSubject.lessons.length}
                        </strong> révisées
                      </div>
                    </div>

                    {/* Detailed split screen revision room */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      {/* Left col - lessons selector list */}
                      <div className="lg:col-span-4 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 shadow-xs space-y-3">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 px-1">liste de leçons</h4>
                        <div className="space-y-1 max-h-[460px] overflow-y-auto pr-1">
                          {selectedSubject.lessons.map((les) => {
                            const isRead = readLessons.includes(les.id);
                            const isActive = selectedLesson?.id === les.id;
                            return (
                              <div
                                key={les.id}
                                className={`group p-3 rounded-xl border transition-all flex items-center justify-between text-left gap-3.5 cursor-pointer ${
                                  isActive
                                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-800 dark:text-emerald-300'
                                    : 'bg-transparent border-zinc-100 dark:border-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                                }`}
                                onClick={() => setSelectedLesson(les)}
                              >
                                <div className="flex items-center gap-2 overflow-hidden">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleLessonRead(les.id);
                                    }}
                                    className={`p-1 rounded-md border transition-colors cursor-pointer shrink-0 ${
                                      isRead 
                                        ? 'bg-emerald-600 border-emerald-600 text-white' 
                                        : 'border-zinc-200 dark:border-zinc-700 hover:border-emerald-500 text-transparent'
                                    }`}
                                  >
                                    <CheckCircle2 size={13} className={isRead ? 'opacity-100' : 'opacity-0'} />
                                  </button>
                                  <span className="text-xs font-medium truncate lowercase">{les.title}</span>
                                </div>
                                <ChevronRight 
                                  size={13} 
                                  className={`transition-transform shrink-0 ${
                                    isActive ? 'text-emerald-500 translate-x-0.5' : 'text-zinc-300 group-hover:text-zinc-500'
                                  }`} 
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right col - lesson reader panel */}
                      <div className="lg:col-span-8 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-xs overflow-hidden flex flex-col min-h-[500px]">
                        {selectedLesson ? (
                          <div className={`p-6 flex-1 flex flex-col justify-between transition-all ${
                            readerTheme === 'sepia' 
                              ? 'bg-amber-50/40 dark:bg-zinc-900/10 text-amber-900/90' 
                              : readerTheme === 'dark'
                                ? 'bg-zinc-950 text-zinc-100'
                                : 'bg-white dark:bg-zinc-900'
                          }`}>
                            <div>
                              {/* Reader Control toolbar */}
                              <div className="flex flex-wrap items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800 mb-6 gap-3">
                                {/* Size customiser */}
                                <div className="flex items-center gap-1 bg-zinc-150 dark:bg-zinc-950 p-0.5 rounded-lg border border-zinc-150/40 dark:border-zinc-850">
                                  <button
                                    onClick={() => setReaderFontSize('normal')}
                                    className={`px-2 py-1 text-[10px] rounded transition-all cursor-pointer lowercase ${
                                      readerFontSize === 'normal' 
                                        ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold' 
                                        : 'text-zinc-400 hover:text-zinc-600'
                                    }`}
                                  >
                                    a
                                  </button>
                                  <button
                                    onClick={() => setReaderFontSize('large')}
                                    className={`px-2 py-1 text-xs rounded transition-all cursor-pointer font-bold lowercase ${
                                      readerFontSize === 'large' 
                                        ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100' 
                                        : 'text-zinc-400 hover:text-zinc-600'
                                    }`}
                                  >
                                    a+
                                  </button>
                                  <button
                                    onClick={() => setReaderFontSize('xlarge')}
                                    className={`px-2 py-1 text-sm rounded transition-all cursor-pointer font-extrabold uppercase ${
                                      readerFontSize === 'xlarge' 
                                        ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100' 
                                        : 'text-zinc-400 hover:text-zinc-600'
                                    }`}
                                  >
                                    a++
                                  </button>
                                </div>

                                {/* Reading Theme selectors */}
                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={() => setReaderTheme('paper')}
                                    className={`w-6 h-6 rounded-full bg-white border border-zinc-200 cursor-pointer shadow-xs transition-transform ${
                                      readerTheme === 'paper' ? 'scale-115 ring-2 ring-emerald-500' : 'opacity-60 hover:opacity-100'
                                    }`}
                                    title="theme normal"
                                  />
                                  <button
                                    onClick={() => setReaderTheme('sepia')}
                                    className={`w-6 h-6 rounded-full bg-amber-50 border border-amber-250 cursor-pointer shadow-xs transition-transform ${
                                      readerTheme === 'sepia' ? 'scale-115 ring-2 ring-emerald-500' : 'opacity-60 hover:opacity-100'
                                    }`}
                                    title="theme sepia"
                                  />
                                  <button
                                    onClick={() => setReaderTheme('dark')}
                                    className={`w-6 h-6 rounded-full bg-zinc-950 border border-zinc-800 cursor-pointer shadow-xs transition-transform ${
                                      readerTheme === 'dark' ? 'scale-115 ring-2 ring-emerald-500' : 'opacity-60 hover:opacity-100'
                                    }`}
                                    title="theme nuit"
                                  />
                                </div>
                              </div>

                              {/* Lesson Title */}
                              <div className="mb-4">
                                <span className="text-[10px] tracking-wider text-emerald-600 dark:text-emerald-400 font-bold uppercase block mb-1">matière : {selectedSubject.label}</span>
                                <h2 className="text-xl font-display font-bold uppercase tracking-tight leading-snug">{selectedLesson.title}</h2>
                              </div>

                              {/* Interactive lesson text component */}
                              <div className={`prose max-w-none space-y-4 font-sans leading-relaxed tracking-wide lowercase ${
                                readerFontSize === 'normal' 
                                  ? 'text-xs md:text-sm' 
                                  : readerFontSize === 'large' 
                                    ? 'text-sm md:text-base' 
                                    : 'text-base md:text-lg'
                              }`}>
                                {selectedLesson.content.split('\n\n').map((paragraph, pIdx) => {
                                  // Highlight formulas cleanly if containing key mathematical signs
                                  const holdsFormula = paragraph.includes('=') || paragraph.includes('⇌') || paragraph.includes('=>') || paragraph.includes('delta') || paragraph.includes('tc =') || paragraph.includes('log(');
                                  
                                  if (holdsFormula) {
                                    return (
                                      <div 
                                        key={pIdx} 
                                        className="p-4 rounded-xl border border-zinc-100/55 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40 my-3 font-mono text-[11px] leading-relaxed relative overflow-hidden"
                                      >
                                        <div className="absolute right-2 top-2 text-[9px] uppercase font-bold text-zinc-400 tracking-wider">Formule utile</div>
                                        <p className="whitespace-pre-wrap leading-relaxed">{paragraph}</p>
                                      </div>
                                    );
                                  }

                                  // Format standard text
                                  return (
                                    <p key={pIdx} className="whitespace-pre-wrap">
                                      {paragraph}
                                    </p>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Mark read toggle action bar */}
                            <div className="mt-8 pt-4 border-t border-zinc-150/40 dark:border-zinc-800 flex items-center justify-between gap-4">
                              <span className="text-xs text-zinc-400 lowercase">leçon révisée à 100% ?</span>
                              <button
                                onClick={() => toggleLessonRead(selectedLesson.id)}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 lowercase ${
                                  readLessons.includes(selectedLesson.id)
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300'
                                }`}
                              >
                                <CheckCircle2 size={14} /> 
                                {readLessons.includes(selectedLesson.id) ? 'marquer non lue' : 'déclarer révisée !'}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-zinc-400">
                            <BookMarked size={40} className="text-zinc-300 dark:text-zinc-700 mb-3" />
                            <h4 className="text-xs font-semibold lowercase">sélectionnez un chapitre</h4>
                            <p className="text-[10px] text-zinc-400 w-60 mx-auto mt-1 lowercase">veuillez choisir l'une des leçons répertoriées dans le volet gauche pour afficher son contenu de révision officiel complet.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* 3. Normal Dashboard Tabs contents */
                  <motion.div
                    key="normal-dashboard"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* View: SUBJECTS cards list */}
                    {activeTab === 'subjects' && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {allSubjects.map((sub) => {
                            const completedCount = sub.lessons.filter(l => readLessons.includes(l.id)).length;
                            const progressPercent = sub.lessons.length > 0 ? (completedCount / sub.lessons.length) * 100 : 0;
                            return (
                              <div
                                key={sub.key}
                                onClick={() => {
                                  setSelectedSubject(sub);
                                  setSelectedLesson(sub.lessons[0] || null);
                                }}
                                className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-emerald-600/50 dark:hover:border-emerald-600/50 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between h-48 relative overflow-hidden group"
                              >
                                <div>
                                  {/* Icon & Title */}
                                  <div className="flex items-center justify-between mb-3">
                                    <span className={`p-2.5 rounded-xl ${sub.bgColor} ${sub.color}`}>
                                      {getSubjectIcon(sub.icon)}
                                    </span>
                                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${sub.bgColor} ${sub.color}`}>
                                      {sub.badge}
                                    </span>
                                  </div>
                                  <h3 className="text-sm font-display font-semibold uppercase tracking-tight text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                    {sub.label}
                                  </h3>
                                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1 h-12 overflow-hidden overflow-ellipsis leading-relaxed lowercase">
                                    {sub.description}
                                  </p>
                                </div>

                                {/* Progress bar bottom */}
                                <div className="space-y-1.5 pt-2 border-t border-zinc-50 dark:border-zinc-850">
                                  <div className="flex justify-between items-center text-[10px] text-zinc-400 lowercase">
                                    <span>{sub.lessons.length} chapitres</span>
                                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">{Math.round(progressPercent)}% révisé</span>
                                  </div>
                                  <div className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                                      style={{ width: `${progressPercent}%` }}
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* View: FORMULAS Cheat-Sheet list */}
                    {activeTab === 'formulas' && (
                      <motion.div
                        key="sheet-content"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <RevisionSheet />
                      </motion.div>
                    )}

                    {/* View: CALCULATORS tab content */}
                    {activeTab === 'calculators' && (
                      <motion.div
                        key="calc-content"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <Calculators />
                      </motion.div>
                    )}

                    {/* View: PROGRESS metrics dashboard */}
                    {activeTab === 'progress' && (
                      <motion.div
                        key="progress-content"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-6"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
                            <Award size={22} />
                          </div>
                          <div>
                            <h2 className="text-xl font-display font-semibold lowercase">tableau d'honneur & progression</h2>
                            <p className="text-xs text-zinc-500 lowercase">mesurez en temps réel vos révisions acquises pour atteindre la mention au bac.</p>
                          </div>
                        </div>

                        {/* Overall metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                          {/* Card 1 */}
                          <div className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 text-center space-y-1">
                            <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">leçons révisées</span>
                            <div className="text-3xl font-display font-bold text-emerald-600 dark:text-emerald-400">
                              {readLessons.length}
                            </div>
                            <span className="text-[10px] text-zinc-400 block lowercase">sur un total de {allSubjects.reduce((acc, curr) => acc + curr.lessons.length, 0)} chapitres</span>
                          </div>

                          {/* Card 2 */}
                          <div className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 text-center space-y-1">
                            <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">taux de complétion général</span>
                            <div className="text-3xl font-display font-bold text-indigo-600 dark:text-indigo-400">
                              {Math.round((readLessons.length / allSubjects.reduce((acc, curr) => acc + curr.lessons.length, 0)) * 100)} %
                            </div>
                            <span className="text-[10px] text-zinc-400 block lowercase">de la plateforme acquise</span>
                          </div>

                          {/* Card 3 */}
                          <div className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 text-center space-y-1">
                            <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">mention estimée</span>
                            <div className="text-3xl font-display font-bold text-amber-500">
                              {(() => {
                                const ratio = readLessons.length / allSubjects.reduce((acc, curr) => acc + curr.lessons.length, 0);
                                if (ratio >= 0.8) return 'très bien';
                                if (ratio >= 0.6) return 'bien';
                                if (ratio >= 0.4) return 'assez bien';
                                if (ratio >= 0.1) return 'passable';
                                return 'en cours';
                              })()}
                            </div>
                            <span className="text-[10px] text-zinc-400 block lowercase">estimation selon l'intensité d'étude</span>
                          </div>
                        </div>

                        {/* Subject list progress breakdown */}
                        <div className="space-y-3 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">répartition par matière</h3>
                          <div className="space-y-4">
                            {allSubjects.map((sub) => {
                              const done = sub.lessons.filter(l => readLessons.includes(l.id)).length;
                              const pct = Math.round((done / sub.lessons.length) * 100);
                              return (
                                <div key={sub.key} className="space-y-1">
                                  <div className="flex justify-between items-center text-xs">
                                    <span className="font-semibold text-zinc-700 dark:text-zinc-300 lowercase">{sub.label}</span>
                                    <span className="font-mono text-zinc-400">{done} / {sub.lessons.length} ({pct}%)</span>
                                  </div>
                                  <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-850 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-emerald-600 rounded-full"
                                      style={{ width: `${pct}%` }}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Clean progress button */}
                        <div className="pt-4 flex justify-end">
                          <button
                            onClick={() => {
                              if (window.confirm("voulez-vous réinitialiser l'ensemble de vos leçons révisées ?")) {
                                setReadLessons([]);
                              }
                            }}
                            className="bg-transparent border border-rose-200/50 hover:bg-rose-50 text-rose-500 hover:text-rose-600 text-[10px] px-3 py-1.5 rounded-lg font-semibold cursor-pointer tracking-wide transition-colors lowercase"
                          >
                            réinitialiser ma progression
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

            </main>

            {/* Footer containing credits */}
            <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900 mt-12 transition-colors">
              <div className="max-w-7xl mx-auto px-4 py-6 text-center text-xs text-zinc-400 space-y-1">
                <p className="lowercase leading-relaxed">
                  baccalauréat terminale réviser — créé avec fierté par <strong className="text-zinc-700 dark:text-zinc-300">Mamad</strong>, élève au lycée mame yelli badiane.
                </p>
                <p className="text-[10px] text-zinc-350 dark:text-zinc-650 lowercase">
                  base d'exercices conformes aux épreuves nationales du bac de 2017 à 2025.
                </p>
              </div>
            </footer>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
