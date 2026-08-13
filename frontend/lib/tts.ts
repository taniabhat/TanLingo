/**
 * Web Speech API TTS Service for Duolingo Voice Pronunciation
 */

let voices: SpeechSynthesisVoice[] = [];

function loadVoices() {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  voices = window.speechSynthesis.getVoices();
}

if (typeof window !== "undefined" && window.speechSynthesis) {
  loadVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
}

/**
 * Speak text in the specified locale using Web Speech API
 */
export function speakText(text: string, locale = "es-ES") {
  if (typeof window === "undefined" || !window.speechSynthesis || !text) return;

  try {
    // Cancel any active speech utterance to avoid stacking
    window.speechSynthesis.cancel();

    // Clean up text (strip brackets or prompt markers)
    const cleanText = text.replace(/\[.*?\]/g, "").trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = locale;
    utterance.rate = 0.88; // Clear, natural learning pace
    utterance.pitch = 1.0;

    // Pick best matching voice for the target locale
    if (voices.length === 0) {
      voices = window.speechSynthesis.getVoices();
    }

    if (voices.length > 0) {
      const targetLang = locale.toLowerCase();
      const targetPrefix = targetLang.split("-")[0];

      // Exact match (e.g. fr-FR)
      let matchedVoice = voices.find((v) => v.lang.toLowerCase() === targetLang);

      // Language prefix match (e.g. fr)
      if (!matchedVoice) {
        matchedVoice = voices.find((v) => v.lang.toLowerCase().startsWith(targetPrefix));
      }

      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn("TTS Playback error:", err);
  }
}

export function stopSpeech() {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}
