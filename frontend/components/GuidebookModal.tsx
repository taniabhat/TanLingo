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

const LANGUAGE_VOCABULARY: Record<string, Record<number, Record<string, [string, string]>>> = {
  Spanish: {
    1: { coffee: ["Café", "Coffee"], tea: ["Té", "Tea"], water: ["Agua", "Water"], bread: ["Pan", "Bread"], please: ["Por favor", "Please"], thanks: ["Gracias", "Thank you"] },
    2: { hello: ["Hola", "Hello"], goodbye: ["Adiós", "Goodbye"], my_name: ["Me llamo", "My name is"], nice_meet: ["Mucho gusto", "Nice to meet you"], yes: ["Sí", "Yes"], no: ["No", "No"] },
    3: { where_is: ["Dónde está", "Where is"], hotel: ["Hotel", "Hotel"], station: ["Estación", "Station"], left: ["Izquierda", "Left"], right: ["Derecha", "Right"], restaurant: ["Restaurante", "Restaurant"] },
    4: { mother: ["Madre", "Mother"], father: ["Padre", "Father"], brother: ["Hermano", "Brother"], sister: ["Hermana", "Sister"], friend: ["Amigo", "Friend"], family: ["Familia", "Family"] },
    5: { how_much: ["Cuánto cuesta", "How much"], shirt: ["Camisa", "Shirt"], shoes: ["Zapatos", "Shoes"], price: ["Precio", "Price"], card: ["Tarjeta", "Card"], cheap: ["Barato", "Cheap"] },
  },
  French: {
    1: { coffee: ["Café", "Coffee"], tea: ["Thé", "Tea"], water: ["Eau", "Water"], bread: ["Pain", "Bread"], please: ["S'il vous plaît", "Please"], thanks: ["Merci", "Thank you"] },
    2: { hello: ["Bonjour", "Hello"], goodbye: ["Au revoir", "Goodbye"], my_name: ["Je m'appelle", "My name is"], nice_meet: ["Enchanté", "Nice to meet you"], yes: ["Oui", "Yes"], no: ["Non", "No"] },
    3: { where_is: ["Où est", "Where is"], hotel: ["Hôtel", "Hotel"], station: ["Gare", "Station"], left: ["Gauche", "Left"], right: ["Droite", "Right"], restaurant: ["Restaurant", "Restaurant"] },
    4: { mother: ["Mère", "Mother"], father: ["Père", "Father"], brother: ["Frère", "Brother"], sister: ["Sœur", "Sister"], friend: ["Ami", "Friend"], family: ["Famille", "Family"] },
    5: { how_much: ["Combien coûte", "How much"], shirt: ["Chemise", "Shirt"], shoes: ["Chaussures", "Shoes"], price: ["Prix", "Price"], card: ["Carte", "Card"], cheap: ["Pas cher", "Cheap"] },
  },
  Japanese: {
    1: { coffee: ["コーヒー", "Coffee"], tea: ["お茶", "Tea"], water: ["水", "Water"], bread: ["パン", "Bread"], please: ["お願いします", "Please"], thanks: ["ありがとう", "Thank you"] },
    2: { hello: ["こんにちは", "Hello"], goodbye: ["さようなら", "Goodbye"], my_name: ["私の名前は", "My name is"], nice_meet: ["はじめまして", "Nice to meet you"], yes: ["はい", "Yes"], no: ["いいえ", "No"] },
    3: { where_is: ["どこですか", "Where is"], hotel: ["ホテル", "Hotel"], station: ["駅", "Station"], left: ["左", "Left"], right: ["右", "Right"], restaurant: ["レストラン", "Restaurant"] },
    4: { mother: ["母", "Mother"], father: ["父", "Father"], brother: ["兄", "Brother"], sister: ["姉", "Sister"], friend: ["友達", "Friend"], family: ["家族", "Family"] },
    5: { how_much: ["いくらですか", "How much"], shirt: ["シャツ", "Shirt"], shoes: ["靴", "Shoes"], price: ["値段", "Price"], card: ["カード", "Card"], cheap: ["安い", "Cheap"] },
  },
  German: {
    1: { coffee: ["Kaffee", "Coffee"], tea: ["Tee", "Tea"], water: ["Wasser", "Water"], bread: ["Brot", "Bread"], please: ["Bitte", "Please"], thanks: ["Danke", "Thank you"] },
    2: { hello: ["Hallo", "Hello"], goodbye: ["Auf Wiedersehen", "Goodbye"], my_name: ["Ich heiße", "My name is"], nice_meet: ["Freut mich", "Nice to meet you"], yes: ["Ja", "Yes"], no: ["Nein", "No"] },
    3: { where_is: ["Wo ist", "Where is"], hotel: ["Hotel", "Hotel"], station: ["Bahnhof", "Station"], left: ["Links", "Left"], right: ["Rechts", "Right"], restaurant: ["Restaurant", "Restaurant"] },
    4: { mother: ["Mutter", "Mother"], father: ["Vater", "Father"], brother: ["Bruder", "Brother"], sister: ["Schwester", "Sister"], friend: ["Freund", "Friend"], family: ["Familie", "Family"] },
    5: { how_much: ["Wie viel kostet", "How much"], shirt: ["Hemd", "Shirt"], shoes: ["Schuhe", "Shoes"], price: ["Preis", "Price"], card: ["Karte", "Card"], cheap: ["Günstig", "Cheap"] },
  },
  Italian: {
    1: { coffee: ["Caffè", "Coffee"], tea: ["Tè", "Tea"], water: ["Acqua", "Water"], bread: ["Pane", "Bread"], please: ["Per favore", "Please"], thanks: ["Grazie", "Thank you"] },
    2: { hello: ["Ciao", "Hello"], goodbye: ["Arrivederci", "Goodbye"], my_name: ["Mi chiamo", "My name is"], nice_meet: ["Piacere", "Nice to meet you"], yes: ["Sì", "Yes"], no: ["No", "No"] },
    3: { where_is: ["Dov'è", "Where is"], hotel: ["Hotel", "Hotel"], station: ["Stazione", "Station"], left: ["Sinistra", "Left"], right: ["Destra", "Right"], restaurant: ["Ristorante", "Restaurant"] },
    4: { mother: ["Madre", "Mother"], father: ["Padre", "Father"], brother: ["Fratello", "Brother"], sister: ["Sorella", "Sister"], friend: ["Amico", "Friend"], family: ["Famiglia", "Family"] },
    5: { how_much: ["Quanto costa", "How much"], shirt: ["Camicia", "Shirt"], shoes: ["Scarpe", "Shoes"], price: ["Prezzo", "Price"], card: ["Carta", "Card"], cheap: ["Economico", "Cheap"] },
  },
  Chinese: {
    1: { coffee: ["咖啡", "Coffee"], tea: ["茶", "Tea"], water: ["水", "Water"], bread: ["面包", "Bread"], please: ["请", "Please"], thanks: ["谢谢", "Thank you"] },
    2: { hello: ["你好", "Hello"], goodbye: ["再见", "Goodbye"], my_name: ["我的名字是", "My name is"], nice_meet: ["很高兴认识你", "Nice to meet you"], yes: ["是", "Yes"], no: ["不", "No"] },
    3: { where_is: ["在哪里", "Where is"], hotel: ["酒店", "Hotel"], station: ["车站", "Station"], left: ["左边", "Left"], right: ["右边", "Right"], restaurant: ["餐厅", "Restaurant"] },
    4: { mother: ["妈妈", "Mother"], father: ["爸爸", "Father"], brother: ["哥哥", "Brother"], sister: ["姐姐", "Sister"], friend: ["朋友", "Friend"], family: ["家庭", "Family"] },
    5: { how_much: ["多少钱", "How much"], shirt: ["衬衫", "Shirt"], shoes: ["鞋子", "Shoes"], price: ["价格", "Price"], card: ["刷卡", "Card"], cheap: ["便宜", "Cheap"] },
  },
  Korean: {
    1: { coffee: ["커피", "Coffee"], tea: ["차", "Tea"], water: ["물", "Water"], bread: ["빵", "Bread"], please: ["주세요", "Please"], thanks: ["감사합니다", "Thank you"] },
    2: { hello: ["안녕하세요", "Hello"], goodbye: ["안녕히 가세요", "Goodbye"], my_name: ["제 이름은", "My name is"], nice_meet: ["반갑습니다", "Nice to meet you"], yes: ["네", "Yes"], no: ["아니요", "No"] },
    3: { where_is: ["어디에 있나요", "Where is"], hotel: ["호텔", "Hotel"], station: ["역", "Station"], left: ["왼쪽", "Left"], right: ["오른쪽", "Right"], restaurant: ["식당", "Restaurant"] },
    4: { mother: ["어머니", "Mother"], father: ["아버지", "Father"], brother: ["남동생", "Brother"], sister: ["여동생", "Sister"], friend: ["친구", "Friend"], family: ["가족", "Family"] },
    5: { how_much: ["얼마인가요", "How much"], shirt: ["셔츠", "Shirt"], shoes: ["신발", "Shoes"], price: ["가격", "Price"], cheap: ["싸다", "Cheap"] },
  },
  Russian: {
    1: { coffee: ["Кофе", "Coffee"], tea: ["Чай", "Tea"], water: ["Вода", "Water"], bread: ["Хлеб", "Bread"], please: ["Пожалуйста", "Please"], thanks: ["Спасибо", "Thank you"] },
    2: { hello: ["Привет", "Hello"], goodbye: ["До свидания", "Goodbye"], my_name: ["Меня зовут", "My name is"], nice_meet: ["Приятно познакомиться", "Nice to meet you"], yes: ["Да", "Yes"], no: ["Нет", "No"] },
    3: { where_is: ["Где находится", "Where is"], hotel: ["Отель", "Hotel"], station: ["Вокзал", "Station"], left: ["Налево", "Left"], right: ["Направо", "Right"], restaurant: ["Ресторан", "Restaurant"] },
    4: { mother: ["Мать", "Mother"], father: ["Отец", "Father"], brother: ["Брат", "Brother"], sister: ["Сестра", "Sister"], friend: ["Друг", "Friend"], family: ["Семья", "Family"] },
    5: { how_much: ["Сколько стоит", "How much"], shirt: ["Рубашка", "Shirt"], shoes: ["Обувь", "Shoes"], price: ["Цена", "Price"], card: ["Карта", "Card"], cheap: ["Дешево", "Cheap"] },
  },
  Portuguese: {
    1: { coffee: ["Café", "Coffee"], tea: ["Chá", "Tea"], water: ["Água", "Water"], bread: ["Pão", "Bread"], please: ["Por favor", "Please"], thanks: ["Obrigado", "Thank you"] },
    2: { hello: ["Olá", "Hello"], goodbye: ["Tchau", "Goodbye"], my_name: ["Meu nome é", "My name is"], nice_meet: ["Prazer em conhecer", "Nice to meet you"], yes: ["Sim", "Yes"], no: ["Não", "No"] },
    3: { where_is: ["Onde fica", "Where is"], hotel: ["Hotel", "Hotel"], station: ["Estação", "Station"], left: ["Esquerda", "Left"], right: ["Direita", "Right"], restaurant: ["Restaurante", "Restaurant"] },
    4: { mother: ["Mãe", "Mother"], father: ["Pai", "Father"], brother: ["Irmão", "Brother"], sister: ["Irmã", "Sister"], friend: ["Amigo", "Friend"], family: ["Família", "Family"] },
    5: { how_much: ["Quanto custa", "How much"], shirt: ["Camisa", "Shirt"], shoes: ["Sapatos", "Shoes"], price: ["Preço", "Price"], card: ["Cartão", "Card"], cheap: ["Barato", "Cheap"] },
  },
  Arabic: {
    1: { coffee: ["قهوة", "Coffee"], tea: ["شاي", "Tea"], water: ["ماء", "Water"], bread: ["خبز", "Bread"], please: ["من فضلك", "Please"], thanks: ["شكرا", "Thank you"] },
    2: { hello: ["مرحبا", "Hello"], goodbye: ["مع السلامة", "Goodbye"], my_name: ["اسمي", "My name is"], nice_meet: ["تشرفت بمعرفتك", "Nice to meet you"], yes: ["نعم", "Yes"], no: ["لا", "No"] },
    3: { where_is: ["أين هو", "Where is"], hotel: ["فندق", "Hotel"], station: ["محطة", "Station"], left: ["يسار", "Left"], right: ["يمين", "Right"], restaurant: ["مطعم", "Restaurant"] },
    4: { mother: ["أمي", "Mother"], father: ["أبي", "Father"], brother: ["أخي", "Brother"], sister: ["أختي", "Sister"], friend: ["صديق", "Friend"], family: ["عائلة", "Family"] },
    5: { how_much: ["كم السعر", "How much"], shirt: ["قميص", "Shirt"], shoes: ["حذاء", "Shoes"], price: ["سعر", "Price"], cheap: ["رخيص", "Cheap"] },
  },
  Hindi: {
    1: { coffee: ["कॉफ़ी", "Coffee"], tea: ["चाय", "Tea"], water: ["पानी", "Water"], bread: ["रोटी", "Bread"], please: ["कृपया", "Please"], thanks: ["धन्यवाद", "Thank you"] },
    2: { hello: ["नमस्ते", "Hello"], goodbye: ["अलविदा", "Goodbye"], my_name: ["मेरा नाम है", "My name is"], nice_meet: ["आपसे मिलकर खुशी हुई", "Nice to meet you"], yes: ["हाँ", "Yes"], no: ["नहीं", "No"] },
    3: { where_is: ["कहाँ है", "Where is"], hotel: ["होटल", "Hotel"], station: ["स्टेशन", "Station"], left: ["बाएँ", "Left"], right: ["दाएँ", "Right"], restaurant: ["रेस्तरां", "Restaurant"] },
    4: { mother: ["माँ", "Mother"], father: ["पिताजी", "Father"], brother: ["भाई", "Brother"], sister: ["बहन", "Sister"], friend: ["दोस्त", "Friend"], family: ["परिवार", "Family"] },
    5: { how_much: ["कितने का है", "How much"], shirt: ["कमीज", "Shirt"], shoes: ["जूते", "Shoes"], price: ["कीमत", "Price"], cheap: ["सस्ता", "Cheap"] },
  },
};

function getGuidebookData(unitNumber: number, courseName: string): GuidebookContent {
  const langKey = LANGUAGE_VOCABULARY[courseName] ? courseName : "Spanish";
  const unitKey = Math.min(Math.max(unitNumber, 1), 5);
  const words = LANGUAGE_VOCABULARY[langKey]?.[unitKey] || LANGUAGE_VOCABULARY["Spanish"][1];

  let phrases: { target: string; english: string }[] = [];
  let tipTitle = "";
  let tipDesc = "";
  let table: { target: string; english: string }[] = [];

  Object.values(words).forEach(([tgt, eng]) => {
    table.push({ target: tgt, english: eng });
  });

  if (unitKey === 1) {
    const c = words["coffee"] || ["Café", "Coffee"];
    const t = words["tea"] || ["Té", "Tea"];
    const w = words["water"] || ["Agua", "Water"];
    const p = words["please"] || ["Por favor", "Please"];
    const th = words["thanks"] || ["Gracias", "Thank you"];

    phrases = [
      { target: `${c[0]}, ${p[0].toLowerCase()}.`, english: `${c[1]}, ${p[1].toLowerCase()}.` },
      { target: `${t[0]}, ${p[0].toLowerCase()}.`, english: `${t[1]}, ${p[1].toLowerCase()}.` },
      { target: `${w[0]}, ${th[0]}.`, english: `${w[1]}, ${th[1]}.` },
    ];
    tipTitle = `Ordering Drinks in ${courseName}`;
    tipDesc = `Always combine polite expressions like "${p[0]}" (${p[1]}) and "${th[0]}" (${th[1]}) when ordering in ${courseName}.`;
  } else if (unitKey === 2) {
    const h = words["hello"] || ["Hola", "Hello"];
    const g = words["goodbye"] || ["Adiós", "Goodbye"];
    const m = words["my_name"] || ["Me llamo", "My name is"];
    const n = words["nice_meet"] || ["Mucho gusto", "Nice to meet you"];

    phrases = [
      { target: `${h[0]}, ${m[0]} Maria.`, english: `${h[1]}, ${m[1]} Maria.` },
      { target: `${n[0]}!`, english: `${n[1]}!` },
      { target: `${h[0]}, ${g[0]}!`, english: `${h[1]}, ${g[1]}!` },
    ];
    tipTitle = `Greetings & Introductions in ${courseName}`;
    tipDesc = `Use "${h[0]}" (${h[1]}) and "${m[0]}" (${m[1]}) to introduce yourself to new friends in ${courseName}.`;
  } else if (unitKey === 3) {
    const w = words["where_is"] || ["Dónde está", "Where is"];
    const ho = words["hotel"] || ["Hotel", "Hotel"];
    const r = words["restaurant"] || ["Restaurante", "Restaurant"];
    const l = words["left"] || ["Izquierda", "Left"];

    phrases = [
      { target: `${w[0]} ${ho[0]}?`, english: `${w[1]} the ${ho[1].toLowerCase()}?` },
      { target: `${w[0]} ${r[0]}?`, english: `${w[1]} the ${r[1].toLowerCase()}?` },
      { target: `${ho[0]}, ${l[0]}.`, english: `${ho[1]}, on the ${l[1].toLowerCase()}.` },
    ];
    tipTitle = `City Navigation in ${courseName}`;
    tipDesc = `Ask "${w[0]} ...?" (${w[1]} ...?) when navigating places in ${courseName}.`;
  } else if (unitKey === 4) {
    const mo = words["mother"] || ["Madre", "Mother"];
    const fa = words["father"] || ["Padre", "Father"];
    const br = words["brother"] || ["Hermano", "Brother"];
    const si = words["sister"] || ["Hermana", "Sister"];
    const th = words["thanks"] || ["Gracias", "Thank you"];

    phrases = [
      { target: `${mo[0]} & ${fa[0]}.`, english: `${mo[1]} & ${fa[1]}.` },
      { target: `${br[0]} & ${si[0]}.`, english: `${br[1]} & ${si[1]}.` },
      { target: `${mo[0]}, ${th[0]}!`, english: `${mo[1]}, ${th[1]}!` },
    ];
    tipTitle = `Family Terms in ${courseName}`;
    tipDesc = `Learn basic family nouns like "${mo[0]}" (${mo[1]}) and "${fa[0]}" (${fa[1]}) in ${courseName}.`;
  } else {
    const hm = words["how_much"] || ["Cuánto cuesta", "How much"];
    const sh = words["shirt"] || ["Camisa", "Shirt"];
    const sho = words["shoes"] || ["Zapatos", "Shoes"];
    const pr = words["price"] || ["Precio", "Price"];

    phrases = [
      { target: `${hm[0]} ${sh[0]}?`, english: `${hm[1]} is this ${sh[1].toLowerCase()}?` },
      { target: `${hm[0]} ${sho[0]}?`, english: `${hm[1]} are these ${sho[1].toLowerCase()}?` },
      { target: `${pr[0]}?`, english: `What is the ${pr[1].toLowerCase()}?` },
    ];
    tipTitle = `Shopping & Prices in ${courseName}`;
    tipDesc = `Inquire about item prices using "${hm[0]}" (${hm[1]}) when shopping in ${courseName}.`;
  }

  return { phrases, tipTitle, tipDesc, table };
}

export default function GuidebookModal({
  isOpen,
  onClose,
  unitNumber = 1,
  unitTitle,
  courseName = "Spanish",
  ttsLocale = "es-ES",
  flagEmoji = "🇪🇸",
}: GuidebookModalProps) {
  const { speak } = useAudio();

  if (!isOpen) return null;

  const unitNum = Math.min(Math.max(unitNumber, 1), 5);
  const data = getGuidebookData(unitNum, courseName);

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
                    onClick={() => speak(data.phrases[0]?.target || "", ttsLocale)}
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
