"""Course definitions for 12 languages with 5 distinct units each."""

LANGUAGE_COURSES = [
    {
        "name": "Spanish",
        "target_language": "Spanish",
        "flag_emoji": "🇪🇸",
        "tts_locale": "es-ES",
        "learners_count": "42M learners",
        "description": "Learn Spanish from English — basics to conversation!",
        "words": {
            "hello": ("Hola", "Hello"),
            "goodbye": ("Adiós", "Goodbye"),
            "thank_you": ("Gracias", "Thank you"),
            "please": ("Por favor", "Please"),
            "yes": ("Sí", "Yes"),
            "no": ("No", "No"),
            "water": ("Agua", "Water"),
            "cat": ("Gato", "Cat"),
            "dog": ("Perro", "Dog"),
            "house": ("Casa", "House"),
        },
    },
    {
        "name": "English",
        "target_language": "English",
        "flag_emoji": "🇺🇸",
        "tts_locale": "en-US",
        "learners_count": "30M learners",
        "description": "Master English vocabulary and essential phrases!",
        "words": {
            "hello": ("Hello", "Hello"),
            "goodbye": ("Goodbye", "Goodbye"),
            "thank_you": ("Thank you", "Thank you"),
            "please": ("Please", "Please"),
            "yes": ("Yes", "Yes"),
            "no": ("No", "No"),
            "water": ("Water", "Water"),
            "cat": ("Cat", "Cat"),
            "dog": ("Dog", "Dog"),
            "house": ("House", "House"),
        },
    },
    {
        "name": "French",
        "target_language": "French",
        "flag_emoji": "🇫🇷",
        "tts_locale": "fr-FR",
        "learners_count": "23M learners",
        "description": "Learn French from English — start speaking today!",
        "words": {
            "hello": ("Bonjour", "Hello"),
            "goodbye": ("Au revoir", "Goodbye"),
            "thank_you": ("Merci", "Thank you"),
            "please": ("S'il vous plaît", "Please"),
            "yes": ("Oui", "Yes"),
            "no": ("Non", "No"),
            "water": ("Eau", "Water"),
            "cat": ("Chat", "Cat"),
            "dog": ("Chien", "Dog"),
            "house": ("Maison", "House"),
        },
    },
    {
        "name": "Japanese",
        "target_language": "Japanese",
        "flag_emoji": "🇯🇵",
        "tts_locale": "ja-JP",
        "learners_count": "18M learners",
        "description": "Learn Japanese from English — start with hiragana basics!",
        "words": {
            "hello": ("こんにちは", "Hello"),
            "goodbye": ("さようなら", "Goodbye"),
            "thank_you": ("ありがとう", "Thank you"),
            "please": ("お願いします", "Please"),
            "yes": ("はい", "Yes"),
            "no": ("いいえ", "No"),
            "water": ("水", "Water"),
            "cat": ("猫", "Cat"),
            "dog": ("犬", "Dog"),
            "house": ("家", "House"),
        },
    },
    {
        "name": "German",
        "target_language": "German",
        "flag_emoji": "🇩🇪",
        "tts_locale": "de-DE",
        "learners_count": "16M learners",
        "description": "Learn German from English — master the basics!",
        "words": {
            "hello": ("Hallo", "Hello"),
            "goodbye": ("Auf Wiedersehen", "Goodbye"),
            "thank_you": ("Danke", "Thank you"),
            "please": ("Bitte", "Please"),
            "yes": ("Ja", "Yes"),
            "no": ("Nein", "No"),
            "water": ("Wasser", "Water"),
            "cat": ("Katze", "Cat"),
            "dog": ("Hund", "Dog"),
            "house": ("Haus", "House"),
        },
    },
    {
        "name": "Italian",
        "target_language": "Italian",
        "flag_emoji": "🇮🇹",
        "tts_locale": "it-IT",
        "learners_count": "14M learners",
        "description": "Learn Italian from English — ciao bella!",
        "words": {
            "hello": ("Ciao", "Hello"),
            "goodbye": ("Arrivederci", "Goodbye"),
            "thank_you": ("Grazie", "Thank you"),
            "please": ("Per favore", "Please"),
            "yes": ("Sì", "Yes"),
            "no": ("No", "No"),
            "water": ("Acqua", "Water"),
            "cat": ("Gatto", "Cat"),
            "dog": ("Cane", "Dog"),
            "house": ("Casa", "House"),
        },
    },
    {
        "name": "Chinese",
        "target_language": "Chinese",
        "flag_emoji": "🇨🇳",
        "tts_locale": "zh-CN",
        "learners_count": "12M learners",
        "description": "Learn Mandarin Chinese from English — ni hao!",
        "words": {
            "hello": ("你好", "Hello"),
            "goodbye": ("再见", "Goodbye"),
            "thank_you": ("谢谢", "Thank you"),
            "please": ("请", "Please"),
            "yes": ("是", "Yes"),
            "no": ("不", "No"),
            "water": ("水", "Water"),
            "cat": ("猫", "Cat"),
            "dog": ("狗", "Dog"),
            "house": ("家", "House"),
        },
    },
    {
        "name": "Korean",
        "target_language": "Korean",
        "flag_emoji": "🇰🇷",
        "tts_locale": "ko-KR",
        "learners_count": "11M learners",
        "description": "Learn Korean from English — annyeonghaseyo!",
        "words": {
            "hello": ("안녕하세요", "Hello"),
            "goodbye": ("안녕히 가세요", "Goodbye"),
            "thank_you": ("감사합니다", "Thank you"),
            "please": ("부탁합니다", "Please"),
            "yes": ("네", "Yes"),
            "no": ("아니요", "No"),
            "water": ("물", "Water"),
            "cat": ("고양이", "Cat"),
            "dog": ("개", "Dog"),
            "house": ("집", "House"),
        },
    },
    {
        "name": "Russian",
        "target_language": "Russian",
        "flag_emoji": "🇷🇺",
        "tts_locale": "ru-RU",
        "learners_count": "9M learners",
        "description": "Learn Russian from English — privet!",
        "words": {
            "hello": ("Привет", "Hello"),
            "goodbye": ("До свидания", "Goodbye"),
            "thank_you": ("Спасибо", "Thank you"),
            "please": ("Пожалуйста", "Please"),
            "yes": ("Да", "Yes"),
            "no": ("Нет", "No"),
            "water": ("Вода", "Water"),
            "cat": ("Кошка", "Cat"),
            "dog": ("Собака", "Dog"),
            "house": ("Дом", "House"),
        },
    },
    {
        "name": "Portuguese",
        "target_language": "Portuguese",
        "flag_emoji": "🇧🇷",
        "tts_locale": "pt-BR",
        "learners_count": "8M learners",
        "description": "Learn Portuguese from English — Brazilian style!",
        "words": {
            "hello": ("Olá", "Hello"),
            "goodbye": ("Tchau", "Goodbye"),
            "thank_you": ("Obrigado", "Thank you"),
            "please": ("Por favor", "Please"),
            "yes": ("Sim", "Yes"),
            "no": ("Não", "No"),
            "water": ("Água", "Water"),
            "cat": ("Gato", "Cat"),
            "dog": ("Cachorro", "Dog"),
            "house": ("Casa", "House"),
        },
    },
    {
        "name": "Arabic",
        "target_language": "Arabic",
        "flag_emoji": "🇸🇦",
        "tts_locale": "ar-SA",
        "learners_count": "7M learners",
        "description": "Learn Arabic from English — marhaban!",
        "words": {
            "hello": ("مرحبا", "Hello"),
            "goodbye": ("مع السلامة", "Goodbye"),
            "thank_you": ("شكرا", "Thank you"),
            "please": ("من فضلك", "Please"),
            "yes": ("نعم", "Yes"),
            "no": ("لا", "No"),
            "water": ("ماء", "Water"),
            "cat": ("قطة", "Cat"),
            "dog": ("كلب", "Dog"),
            "house": ("بيت", "House"),
        },
    },
    {
        "name": "Hindi",
        "target_language": "Hindi",
        "flag_emoji": "🇮🇳",
        "tts_locale": "hi-IN",
        "learners_count": "6M learners",
        "description": "Learn Hindi from English — namaste!",
        "words": {
            "hello": ("नमस्ते", "Hello"),
            "goodbye": ("अलविदा", "Goodbye"),
            "thank_you": ("धन्यवाद", "Thank you"),
            "please": ("कृपया", "Please"),
            "yes": ("हाँ", "Yes"),
            "no": ("नहीं", "No"),
            "water": ("पानी", "Water"),
            "cat": ("बिल्ली", "Cat"),
            "dog": ("कुत्ता", "Dog"),
            "house": ("घर", "House"),
        },
    },
]

UNIT_CONFIGS = [
    ("Unit 1", "Order at a café", "#58cc02", "☕", "Café Basics"),
    ("Unit 2", "Introduce yourself", "#1cb0f6", "👋", "Greetings & Names"),
    ("Unit 3", "Ask for directions", "#ff9600", "🗺️", "City Navigation"),
    ("Unit 4", "Family & People", "#ce82ff", "👨‍👩‍👧", "Relationships"),
    ("Unit 5", "Shopping & Prices", "#ff4b4b", "🛍️", "Stores & Currency"),
]


def build_course_units(lang_name: str, words: dict) -> list:
    """Build 5 distinct units with skills and lesson exercise data for a language."""
    w = words
    lang = lang_name

    def mc(prompt, correct, options):
        return ("multiple_choice", prompt, correct, options)

    def translate(prompt, correct, word_bank):
        return ("translate", prompt, correct, word_bank)

    def type_answer(prompt, correct):
        return ("type_answer", prompt, correct)

    def fill_blank(prompt, correct):
        return ("fill_blank", prompt, correct)

    def match_pairs(prompt, correct, options=None, pairs=None):
        return ("match_pairs", prompt, correct, options, pairs)

    units_data = []

    for idx, (unit_num, unit_title, color, icon, skill_title) in enumerate(UNIT_CONFIGS):
        target_hello = w.get("hello", ("Hello", "Hello"))[0]
        english_hello = w.get("hello", ("Hello", "Hello"))[1]

        target_water = w.get("water", ("Water", "Water"))[0]
        english_water = w.get("water", ("Water", "Water"))[1]

        target_cat = w.get("cat", ("Cat", "Cat"))[0]
        english_cat = w.get("cat", ("Cat", "Cat"))[1]

        target_thanks = w.get("thank_you", ("Thanks", "Thanks"))[0]
        english_thanks = w.get("thank_you", ("Thanks", "Thanks"))[1]

        ex_list = [
            mc(f"[{unit_num}] How do you say '{english_hello}' in {lang}?", target_hello, [target_hello, target_water, target_cat, target_thanks]),
            translate(f"Translate to {lang}: {english_thanks}", target_thanks, [target_thanks, target_hello, target_water, target_cat]),
            type_answer(f"Type '{english_water}' in {lang}", target_water),
            fill_blank(f"Complete: {target_hello[:2]}___ ({english_hello})", target_hello),
            match_pairs(
                f"Match {lang} terms",
                f"{target_hello}:{english_hello}|{target_water}:{english_water}|{target_cat}:{english_cat}|{target_thanks}:{english_thanks}",
                None,
                [
                    {"left": target_hello, "right": english_hello},
                    {"left": target_water, "right": english_water},
                    {"left": target_cat, "right": english_cat},
                    {"left": target_thanks, "right": english_thanks},
                ],
            ),
        ]

        units_data.append((
            f"{unit_num}",
            f"{unit_title}",
            color,
            [
                (
                    f"{skill_title}",
                    icon,
                    [
                        (f"{unit_title} Lesson", ex_list)
                    ],
                )
            ],
        ))

    return units_data
