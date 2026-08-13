"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/hooks/useAudio";
import FlagIcon from "@/components/FlagIcon";

interface GuidebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  unitNumber: number;
  unitTitle: string;
  courseName?: string;
  ttsLocale?: string;
  flagEmoji?: string;
}

interface GuidebookContent {
  phrases: { target: string; english: string }[];
  tipTitle: string;
  tipDesc: string;
  table: { target: string; english: string }[];
}

// 5 DISTINCT UNIT GUIDEBOOKS DATASETS
const UNIT_GUIDEBOOKS: Record<number, Record<string, GuidebookContent>> = {
  // UNIT 1: Café & Ordering
  1: {
    French: {
      phrases: [
        { target: "Bonjour Madame, je voudrais un thé.", english: "Hello Madam, I would like a tea." },
        { target: "Un croissant, s'il vous plaît.", english: "A croissant, please." },
        { target: "Oui, je voudrais un café et un croissant.", english: "Yes, I would like a coffee and a croissant." },
        { target: "Merci, au revoir !", english: "Thank you, goodbye!" },
      ],
      tipTitle: 'Linking with "et" and "ou"',
      tipDesc: 'Use et to mean "and" and ou to mean "or" when connecting food & drink words.',
      table: [
        { target: "et", english: "and" },
        { target: "ou", english: "or" },
        { target: "s'il vous plaît", english: "please" },
      ],
    },
    Spanish: {
      phrases: [
        { target: "Hola, me gustaría un café por favor.", english: "Hello, I would like a coffee please." },
        { target: "Un agua y un té, por favor.", english: "A water and a tea, please." },
        { target: "Sí, muchas gracias. ¡Hasta luego!", english: "Yes, thank you very much. See you later!" },
      ],
      tipTitle: 'Using "y" and "o" in Ordering',
      tipDesc: 'Use y to mean "and" and o to mean "or" when connecting food items in Spanish.',
      table: [
        { target: "y", english: "and" },
        { target: "o", english: "or" },
        { target: "por favor", english: "please" },
      ],
    },
    Default: {
      phrases: [
        { target: "Hello, I would like a coffee please.", english: "Polite coffee order" },
        { target: "A tea and a water, thank you.", english: "Ordering drinks" },
        { target: "Yes, please. Goodbye!", english: "Polite expressions" },
      ],
      tipTitle: "Café Basics & Polite Expressions",
      tipDesc: "Always combine polite words like please and thank you when requesting items.",
      table: [
        { target: "and", english: "connecting words" },
        { target: "please", english: "polite expression" },
      ],
    },
  },

  // UNIT 2: Greetings & Introductions
  2: {
    French: {
      phrases: [
        { target: "Bonjour, je m'appelle Paul.", english: "Hello, my name is Paul." },
        { target: "Enchanté de vous rencontrer !", english: "Nice to meet you!" },
        { target: "D'où venez-vous ?", english: "Where are you from?" },
        { target: "Je viens de Paris.", english: "I come from Paris." },
      ],
      tipTitle: 'Tu vs. Vous (Formality in French)',
      tipDesc: 'Use "tu" with friends and family, but use "vous" when speaking politely to strangers.',
      table: [
        { target: "Tu", english: "you (informal)" },
        { target: "Vous", english: "you (formal / plural)" },
        { target: "Je m'appelle", english: "My name is" },
      ],
    },
    Spanish: {
      phrases: [
        { target: "Hola, me llamo Sofía.", english: "Hello, my name is Sofía." },
        { target: "¡Mucho gusto en conocerte!", english: "Nice to meet you!" },
        { target: "¿De dónde eres?", english: "Where are you from?" },
        { target: "Yo soy de Madrid.", english: "I am from Madrid." },
      ],
      tipTitle: 'Tú vs. Usted (Spanish Formality)',
      tipDesc: 'Address peers with "tú", and use "usted" to show respect to elders or strangers.',
      table: [
        { target: "Tú", english: "you (informal)" },
        { target: "Usted", english: "you (formal)" },
        { target: "Me llamo", english: "My name is" },
      ],
    },
    Default: {
      phrases: [
        { target: "Hello, my name is Alex.", english: "Self introduction" },
        { target: "Nice to meet you!", english: "Greeting response" },
        { target: "Where are you from?", english: "Asking origins" },
      ],
      tipTitle: "Introductions & Names",
      tipDesc: "State your name clearly and respond with polite phrases when meeting new friends.",
      table: [
        { target: "Name", english: "Personal identity" },
        { target: "Welcome", english: "Friendly greeting" },
      ],
    },
  },

  // UNIT 3: City Navigation & Directions
  3: {
    French: {
      phrases: [
        { target: "Où se trouve la gare ?", english: "Where is the train station?" },
        { target: "Tournez à gauche après la banque.", english: "Turn left after the bank." },
        { target: "Allez tout droit, c'est très proche.", english: "Go straight ahead, it is very close." },
        { target: "Est-ce près d'ici ?", english: "Is it near here?" },
      ],
      tipTitle: 'Prepositions of Direction in French',
      tipDesc: 'Use "à gauche" for left, "à droite" for right, and "tout droit" for straight ahead.',
      table: [
        { target: "à gauche", english: "to the left" },
        { target: "à droite", english: "to the right" },
        { target: "tout droit", english: "straight ahead" },
      ],
    },
    Spanish: {
      phrases: [
        { target: "¿Dónde está la estación de tren?", english: "Where is the train station?" },
        { target: "Gira a la izquierda en la esquina.", english: "Turn left at the corner." },
        { target: "Sigue recto, está cerca.", english: "Go straight, it is near." },
      ],
      tipTitle: 'Directions & Landmarks in Spanish',
      tipDesc: 'Use "izquierda" (left), "derecha" (right), and "recto" (straight) for navigation.',
      table: [
        { target: "izquierda", english: "left" },
        { target: "derecha", english: "right" },
        { target: "cerca / lejos", english: "near / far" },
      ],
    },
    Default: {
      phrases: [
        { target: "Where is the bus station?", english: "Asking location" },
        { target: "Turn right and go straight.", english: "Giving directions" },
      ],
      tipTitle: "Navigation & Places",
      tipDesc: "Master directional terms like left, right, and straight to navigate any city.",
      table: [
        { target: "Left", english: "Directional turn" },
        { target: "Right", english: "Directional turn" },
      ],
    },
  },

  // UNIT 4: Family & People
  4: {
    French: {
      phrases: [
        { target: "Voici mon frère et ma sœur.", english: "Here is my brother and my sister." },
        { target: "Elle est très gentille et intelligente.", english: "She is very kind and smart." },
        { target: "Nous avons une grande famille.", english: "We have a big family." },
      ],
      tipTitle: 'Possessive Adjectives (mon, ma, mes)',
      tipDesc: 'Match possessive adjectives with the gender of the noun: mon (masc), ma (fem), mes (plural).',
      table: [
        { target: "mon", english: "my (masculine)" },
        { target: "ma", english: "my (feminine)" },
        { target: "mes", english: "my (plural)" },
      ],
    },
    Spanish: {
      phrases: [
        { target: "Este es mi hermano y mi madre.", english: "This is my brother and my mother." },
        { target: "Ella es muy alegre y amable.", english: "She is very cheerful and kind." },
        { target: "Tenemos una familia feliz.", english: "We have a happy family." },
      ],
      tipTitle: 'Possessives in Spanish (mi, mis)',
      tipDesc: 'Use "mi" for singular items and "mis" for plural family members or objects.',
      table: [
        { target: "mi", english: "my (singular)" },
        { target: "mis", english: "my (plural)" },
        { target: "nuestro", english: "our" },
      ],
    },
    Default: {
      phrases: [
        { target: "This is my brother.", english: "Family relationship" },
        { target: "She is my mother.", english: "Parent relationship" },
      ],
      tipTitle: "Family Relationships",
      tipDesc: "Use possessive words to talk about your family members and loved ones.",
      table: [
        { target: "Brother", english: "Male sibling" },
        { target: "Sister", english: "Female sibling" },
      ],
    },
  },

  // UNIT 5: Shopping & Prices
  5: {
    French: {
      phrases: [
        { target: "Combien coûte cette chemise ?", english: "How much does this shirt cost?" },
        { target: "Je voudrais acheter cette veste.", english: "I would like to buy this jacket." },
        { target: "Acceptez-vous les cartes de crédit ?", english: "Do you accept credit cards?" },
        { target: "C'est un très bon prix !", english: "That is a very good price!" },
      ],
      tipTitle: 'Asking Prices & Buying in French',
      tipDesc: 'Use "Combien coûte... ?" to inquire about prices when shopping.',
      table: [
        { target: "combien", english: "how much / how many" },
        { target: "prix", english: "price" },
        { target: "acheter", english: "to buy" },
      ],
    },
    Spanish: {
      phrases: [
        { target: "¿Cuánto cuesta esta camisa?", english: "How much does this shirt cost?" },
        { target: "Quiero comprar estos zapatos.", english: "I want to buy these shoes." },
        { target: "¿Puedo pagar con tarjeta?", english: "Can I pay with a card?" },
      ],
      tipTitle: 'Shopping & Currency in Spanish',
      tipDesc: 'Ask "¿Cuánto cuesta?" to get the cost of any clothing or item.',
      table: [
        { target: "¿Cuánto cuesta?", english: "How much is it?" },
        { target: "tarjeta", english: "credit card" },
        { target: "comprar", english: "to buy" },
      ],
    },
    Default: {
      phrases: [
        { target: "How much is this shirt?", english: "Price enquiry" },
        { target: "Can I pay with credit card?", english: "Payment method" },
      ],
      tipTitle: "Shopping & Transactions",
      tipDesc: "Learn key phrases for asking costs, buying items, and checking out.",
      table: [
        { target: "Cost", english: "Item price" },
        { target: "Buy", english: "Purchase action" },
      ],
    },
  },
};

export default function GuidebookModal({
  isOpen,
  onClose,
  unitNumber = 1,
  unitTitle,
  courseName = "French",
  ttsLocale = "fr-FR",
  flagEmoji = "🇫🇷",
}: GuidebookModalProps) {
  const { speak } = useAudio();

  if (!isOpen) return null;

  const unitNum = Math.min(Math.max(unitNumber, 1), 5);
  const unitDict = UNIT_GUIDEBOOKS[unitNum] || UNIT_GUIDEBOOKS[1];
  const data = unitDict[courseName] || unitDict["Default"] || UNIT_GUIDEBOOKS[1]["French"];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#131f24] text-white flex justify-center min-h-screen">
        <div className="w-full max-w-5xl px-4 py-6 flex flex-col md:flex-row gap-8">
          {/* Main Left Content */}
          <div className="flex-1 max-w-2xl">
            {/* Top Back Navigation */}
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-gray-400 hover:text-white font-extrabold text-sm mb-6 transition-colors cursor-pointer"
            >
              <span>←</span>
              <span>Back</span>
            </button>

            {/* Guidebook Title Banner */}
            <div className="flex items-center gap-5 mb-8 border-b border-gray-800 pb-6">
              <div className="text-6xl sm:text-7xl filter drop-shadow-md">🦉</div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-white">
                  Unit {unitNum} Guidebook
                </h1>
                <p className="text-duo-blue font-black text-base mt-1">
                  {unitTitle}
                </p>
              </div>
            </div>

            {/* KEY PHRASES Section */}
            <div className="mb-10">
              <h2 className="text-xs font-black uppercase tracking-widest text-duo-blue mb-4">
                KEY PHRASES
              </h2>
              <div className="space-y-3">
                {data.phrases.map((phrase, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-4 rounded-2xl bg-[#18272c] border-2 border-gray-800 hover:border-duo-blue flex items-center gap-4 transition-all group"
                  >
                    <button
                      onClick={() => speak(phrase.target, ttsLocale)}
                      className="w-10 h-10 rounded-xl bg-duo-blue text-white flex items-center justify-center text-lg shadow-sm group-hover:scale-105 transition-transform shrink-0 cursor-pointer"
                      title="Listen"
                    >
                      🔊
                    </button>
                    <div>
                      <p className="text-lg font-black text-white border-b border-dotted border-duo-blue/60 inline-block pb-0.5">
                        {phrase.target}
                      </p>
                      <p className="text-sm font-bold text-gray-400 mt-1">
                        {phrase.english}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* GRAMMAR / TIP Section */}
            <div className="p-6 rounded-2xl bg-[#18272c] border-2 border-gray-800 mb-8">
              <span className="text-xs font-black uppercase tracking-widest text-duo-blue block mb-1">
                TIP
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                {data.tipTitle}
              </h3>
              <p className="text-sm font-bold text-gray-300 mb-6">
                {data.tipDesc}
              </p>

              {/* Vocabulary Table */}
              <div className="rounded-xl border border-gray-700 overflow-hidden mb-6">
                <table className="w-full text-left text-sm font-bold">
                  <thead className="bg-[#111b21] border-b border-gray-700 text-gray-300">
                    <tr>
                      <th className="p-3 font-extrabold">{courseName}</th>
                      <th className="p-3 font-extrabold">English</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {data.table.map((row, idx) => (
                      <tr key={idx} className="hover:bg-white/5">
                        <td className="p-3 text-duo-blue font-extrabold">{row.target}</td>
                        <td className="p-3 text-white">{row.english}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Sample audio phrase card */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#111b21] border border-gray-800">
                  <button
                    onClick={() => speak(data.phrases[0]?.target || "Bonjour", ttsLocale)}
                    className="text-duo-blue hover:scale-110 transition-transform cursor-pointer"
                  >
                    🔊
                  </button>
                  <span className="text-sm font-bold text-white">
                    {data.phrases[0]?.target || "Key practice phrase"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Widgets */}
          <div className="w-full md:w-80 space-y-4 shrink-0">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#18272c] border border-gray-800 text-sm font-black">
              <div className="flex items-center gap-2">
                <FlagIcon name={courseName} emoji={flagEmoji} className="w-7 h-5" />
                <span>Unit {unitNum}</span>
              </div>
              <div className="flex items-center gap-1 text-duo-orange">
                <span>🔥</span> 1
              </div>
              <div className="flex items-center gap-1 text-duo-blue">
                <span>💎</span> 505
              </div>
              <div className="flex items-center gap-1 text-duo-red">
                <span>❤️</span> 4
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 border border-purple-500/30 text-white relative overflow-hidden shadow-lg">
              <span className="text-xs font-black px-2 py-0.5 rounded bg-purple-500 text-white uppercase tracking-wider block w-fit mb-2">
                SUPER
              </span>
              <h4 className="font-extrabold text-lg">Try Super for free</h4>
              <p className="text-xs text-white/80 font-bold mt-1 mb-4">
                No ads, personalized practice, and unlimited Legendary!
              </p>
              <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 font-black text-xs uppercase tracking-wide rounded-xl shadow-md transition-all cursor-pointer">
                TRY 1 WEEK FREE
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#18272c] border border-gray-800 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-2xl shrink-0">
                🛡️
              </div>
              <div>
                <h5 className="font-extrabold text-sm text-white">Unlock Leaderboards!</h5>
                <p className="text-xs text-gray-400 font-bold mt-0.5">
                  Complete lessons to rise in rankings
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#18272c] border border-gray-800">
              <div className="flex justify-between items-center mb-2">
                <span className="font-extrabold text-sm text-white">Daily Quests</span>
                <span className="text-xs font-bold text-duo-blue uppercase">VIEW ALL</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                <div className="flex-1">
                  <div className="text-xs font-bold text-gray-300 mb-1">Earn 10 XP</div>
                  <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden relative">
                    <div className="h-full bg-duo-yellow w-full rounded-full" />
                    <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-black">
                      10 / 10
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
