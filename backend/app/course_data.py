"""Course definitions for 12 languages with 5 distinct, topic-specific units each."""

LANGUAGE_COURSES = [
    {
        "name": "Spanish",
        "target_language": "Spanish",
        "flag_emoji": "🇪🇸",
        "tts_locale": "es-ES",
        "learners_count": "42M learners",
        "description": "Learn Spanish from English — basics to conversation!",
        "units": {
            1: {
                "coffee": ("Café", "Coffee"),
                "tea": ("Té", "Tea"),
                "water": ("Agua", "Water"),
                "bread": ("Pan", "Bread"),
                "please": ("Por favor", "Please"),
                "thanks": ("Gracias", "Thank you"),
            },
            2: {
                "hello": ("Hola", "Hello"),
                "goodbye": ("Adiós", "Goodbye"),
                "my_name": ("Me llamo", "My name is"),
                "nice_meet": ("Mucho gusto", "Nice to meet you"),
                "yes": ("Sí", "Yes"),
                "no": ("No", "No"),
            },
            3: {
                "where_is": ("Dónde está", "Where is"),
                "hotel": ("Hotel", "Hotel"),
                "station": ("Estación", "Station"),
                "left": ("Izquierda", "Left"),
                "right": ("Derecha", "Right"),
                "restaurant": ("Restaurante", "Restaurant"),
            },
            4: {
                "mother": ("Madre", "Mother"),
                "father": ("Padre", "Father"),
                "brother": ("Hermano", "Brother"),
                "sister": ("Hermana", "Sister"),
                "friend": ("Amigo", "Friend"),
                "family": ("Familia", "Family"),
            },
            5: {
                "how_much": ("Cuánto cuesta", "How much"),
                "shirt": ("Camisa", "Shirt"),
                "shoes": ("Zapatos", "Shoes"),
                "price": ("Precio", "Price"),
                "card": ("Tarjeta", "Card"),
                "cheap": ("Barato", "Cheap"),
            },
        },
    },
    {
        "name": "French",
        "target_language": "French",
        "flag_emoji": "🇫🇷",
        "tts_locale": "fr-FR",
        "learners_count": "23M learners",
        "description": "Learn French from English — start speaking today!",
        "units": {
            1: {
                "coffee": ("Café", "Coffee"),
                "tea": ("Thé", "Tea"),
                "water": ("Eau", "Water"),
                "bread": ("Pain", "Bread"),
                "please": ("S'il vous plaît", "Please"),
                "thanks": ("Merci", "Thank you"),
            },
            2: {
                "hello": ("Bonjour", "Hello"),
                "goodbye": ("Au revoir", "Goodbye"),
                "my_name": ("Je m'appelle", "My name is"),
                "nice_meet": ("Enchanté", "Nice to meet you"),
                "yes": ("Oui", "Yes"),
                "no": ("Non", "No"),
            },
            3: {
                "where_is": ("Où est", "Where is"),
                "hotel": ("Hôtel", "Hotel"),
                "station": ("Gare", "Station"),
                "left": ("Gauche", "Left"),
                "right": ("Droite", "Right"),
                "restaurant": ("Restaurant", "Restaurant"),
            },
            4: {
                "mother": ("Mère", "Mother"),
                "father": ("Père", "Father"),
                "brother": ("Frère", "Brother"),
                "sister": ("Sœur", "Sister"),
                "friend": ("Ami", "Friend"),
                "family": ("Famille", "Family"),
            },
            5: {
                "how_much": ("Combien coûte", "How much"),
                "shirt": ("Chemise", "Shirt"),
                "shoes": ("Chaussures", "Shoes"),
                "price": ("Prix", "Price"),
                "card": ("Carte", "Card"),
                "cheap": ("Pas cher", "Cheap"),
            },
        },
    },
    {
        "name": "Japanese",
        "target_language": "Japanese",
        "flag_emoji": "🇯🇵",
        "tts_locale": "ja-JP",
        "learners_count": "18M learners",
        "description": "Learn Japanese from English — start with hiragana basics!",
        "units": {
            1: {
                "coffee": ("コーヒー", "Coffee"),
                "tea": ("お茶", "Tea"),
                "water": ("水", "Water"),
                "bread": ("パン", "Bread"),
                "please": ("お願いします", "Please"),
                "thanks": ("ありがとう", "Thank you"),
            },
            2: {
                "hello": ("こんにちは", "Hello"),
                "goodbye": ("さようなら", "Goodbye"),
                "my_name": ("私の名前は", "My name is"),
                "nice_meet": ("はじめまして", "Nice to meet you"),
                "yes": ("はい", "Yes"),
                "no": ("いいえ", "No"),
            },
            3: {
                "where_is": ("どこですか", "Where is"),
                "hotel": ("ホテル", "Hotel"),
                "station": ("駅", "Station"),
                "left": ("左", "Left"),
                "right": ("右", "Right"),
                "restaurant": ("レストラン", "Restaurant"),
            },
            4: {
                "mother": ("母", "Mother"),
                "father": ("父", "Father"),
                "brother": ("兄", "Brother"),
                "sister": ("姉", "Sister"),
                "friend": ("友達", "Friend"),
                "family": ("家族", "Family"),
            },
            5: {
                "how_much": ("いくらですか", "How much"),
                "shirt": ("シャツ", "Shirt"),
                "shoes": ("靴", "Shoes"),
                "price": ("値段", "Price"),
                "card": ("カード", "Card"),
                "cheap": ("安い", "Cheap"),
            },
        },
    },
    {
        "name": "German",
        "target_language": "German",
        "flag_emoji": "🇩🇪",
        "tts_locale": "de-DE",
        "learners_count": "16M learners",
        "description": "Learn German from English — master the basics!",
        "units": {
            1: {
                "coffee": ("Kaffee", "Coffee"),
                "tea": ("Tee", "Tea"),
                "water": ("Wasser", "Water"),
                "bread": ("Brot", "Bread"),
                "please": ("Bitte", "Please"),
                "thanks": ("Danke", "Thank you"),
            },
            2: {
                "hello": ("Hallo", "Hello"),
                "goodbye": ("Auf Wiedersehen", "Goodbye"),
                "my_name": ("Ich heiße", "My name is"),
                "nice_meet": ("Freut mich", "Nice to meet you"),
                "yes": ("Ja", "Yes"),
                "no": ("Nein", "No"),
            },
            3: {
                "where_is": ("Wo ist", "Where is"),
                "hotel": ("Hotel", "Hotel"),
                "station": ("Bahnhof", "Station"),
                "left": ("Links", "Left"),
                "right": ("Rechts", "Right"),
                "restaurant": ("Restaurant", "Restaurant"),
            },
            4: {
                "mother": ("Mutter", "Mother"),
                "father": ("Vater", "Father"),
                "brother": ("Bruder", "Brother"),
                "sister": ("Schwester", "Sister"),
                "friend": ("Freund", "Friend"),
                "family": ("Familie", "Family"),
            },
            5: {
                "how_much": ("Wie viel kostet", "How much"),
                "shirt": ("Hemd", "Shirt"),
                "shoes": ("Schuhe", "Shoes"),
                "price": ("Preis", "Price"),
                "card": ("Karte", "Card"),
                "cheap": ("Günstig", "Cheap"),
            },
        },
    },
    {
        "name": "Italian",
        "target_language": "Italian",
        "flag_emoji": "🇮🇹",
        "tts_locale": "it-IT",
        "learners_count": "14M learners",
        "description": "Learn Italian from English — ciao bella!",
        "units": {
            1: {
                "coffee": ("Caffè", "Coffee"),
                "tea": ("Tè", "Tea"),
                "water": ("Acqua", "Water"),
                "bread": ("Pane", "Bread"),
                "please": ("Per favore", "Please"),
                "thanks": ("Grazie", "Thank you"),
            },
            2: {
                "hello": ("Ciao", "Hello"),
                "goodbye": ("Arrivederci", "Goodbye"),
                "my_name": ("Mi chiamo", "My name is"),
                "nice_meet": ("Piacere", "Nice to meet you"),
                "yes": ("Sì", "Yes"),
                "no": ("No", "No"),
            },
            3: {
                "where_is": ("Dov'è", "Where is"),
                "hotel": ("Hotel", "Hotel"),
                "station": ("Stazione", "Station"),
                "left": ("Sinistra", "Left"),
                "right": ("Destra", "Right"),
                "restaurant": ("Ristorante", "Restaurant"),
            },
            4: {
                "mother": ("Madre", "Mother"),
                "father": ("Padre", "Father"),
                "brother": ("Fratello", "Brother"),
                "sister": ("Sorella", "Sister"),
                "friend": ("Amico", "Friend"),
                "family": ("Famiglia", "Family"),
            },
            5: {
                "how_much": ("Quanto costa", "How much"),
                "shirt": ("Camicia", "Shirt"),
                "shoes": ("Scarpe", "Shoes"),
                "price": ("Prezzo", "Price"),
                "card": ("Carta", "Card"),
                "cheap": ("Economico", "Cheap"),
            },
        },
    },
    {
        "name": "Chinese",
        "target_language": "Chinese",
        "flag_emoji": "🇨🇳",
        "tts_locale": "zh-CN",
        "learners_count": "12M learners",
        "description": "Learn Mandarin Chinese from English — ni hao!",
        "units": {
            1: {
                "coffee": ("咖啡", "Coffee"),
                "tea": ("茶", "Tea"),
                "water": ("水", "Water"),
                "bread": ("面包", "Bread"),
                "please": ("请", "Please"),
                "thanks": ("谢谢", "Thank you"),
            },
            2: {
                "hello": ("你好", "Hello"),
                "goodbye": ("再见", "Goodbye"),
                "my_name": ("我的名字是", "My name is"),
                "nice_meet": ("很高兴认识你", "Nice to meet you"),
                "yes": ("是", "Yes"),
                "no": ("不", "No"),
            },
            3: {
                "where_is": ("在哪里", "Where is"),
                "hotel": ("酒店", "Hotel"),
                "station": ("车站", "Station"),
                "left": ("左边", "Left"),
                "right": ("右边", "Right"),
                "restaurant": ("餐厅", "Restaurant"),
            },
            4: {
                "mother": ("妈妈", "Mother"),
                "father": ("爸爸", "Father"),
                "brother": ("哥哥", "Brother"),
                "sister": ("姐姐", "Sister"),
                "friend": ("朋友", "Friend"),
                "family": ("家庭", "Family"),
            },
            5: {
                "how_much": ("多少钱", "How much"),
                "shirt": ("衬衫", "Shirt"),
                "shoes": ("鞋子", "Shoes"),
                "price": ("价格", "Price"),
                "card": ("刷卡", "Card"),
                "cheap": ("便宜", "Cheap"),
            },
        },
    },
    {
        "name": "Korean",
        "target_language": "Korean",
        "flag_emoji": "🇰🇷",
        "tts_locale": "ko-KR",
        "learners_count": "11M learners",
        "description": "Learn Korean from English — annyeonghaseyo!",
        "units": {
            1: {
                "coffee": ("커피", "Coffee"),
                "tea": ("차", "Tea"),
                "water": ("물", "Water"),
                "bread": ("빵", "Bread"),
                "please": ("주세요", "Please"),
                "thanks": ("감사합니다", "Thank you"),
            },
            2: {
                "hello": ("안녕하세요", "Hello"),
                "goodbye": ("안녕히 가세요", "Goodbye"),
                "my_name": ("제 이름은", "My name is"),
                "nice_meet": ("반갑습니다", "Nice to meet you"),
                "yes": ("네", "Yes"),
                "no": ("아니요", "No"),
            },
            3: {
                "where_is": ("어디에 있나요", "Where is"),
                "hotel": ("호텔", "Hotel"),
                "station": ("역", "Station"),
                "left": ("왼쪽", "Left"),
                "right": ("오른쪽", "Right"),
                "restaurant": ("식당", "Restaurant"),
            },
            4: {
                "mother": ("어머니", "Mother"),
                "father": ("아버지", "Father"),
                "brother": ("남동생", "Brother"),
                "sister": ("여동생", "Sister"),
                "friend": ("친구", "Friend"),
                "family": ("가족", "Family"),
            },
            5: {
                "how_much": ("얼마인가요", "How much"),
                "shirt": ("셔츠", "Shirt"),
                "shoes": ("신발", "Shoes"),
                "price": ("가격", "Price"),
                "card": ("카드", "Card"),
                "cheap": ("싸다", "Cheap"),
            },
        },
    },
    {
        "name": "Russian",
        "target_language": "Russian",
        "flag_emoji": "🇷🇺",
        "tts_locale": "ru-RU",
        "learners_count": "9M learners",
        "description": "Learn Russian from English — privet!",
        "units": {
            1: {
                "coffee": ("Кофе", "Coffee"),
                "tea": ("Чай", "Tea"),
                "water": ("Вода", "Water"),
                "bread": ("Хлеб", "Bread"),
                "please": ("Пожалуйста", "Please"),
                "thanks": ("Спасибо", "Thank you"),
            },
            2: {
                "hello": ("Привет", "Hello"),
                "goodbye": ("До свидания", "Goodbye"),
                "my_name": ("Меня зовут", "My name is"),
                "nice_meet": ("Приятно познакомиться", "Nice to meet you"),
                "yes": ("Да", "Yes"),
                "no": ("Нет", "No"),
            },
            3: {
                "where_is": ("Где находится", "Where is"),
                "hotel": ("Отель", "Hotel"),
                "station": ("Вокзал", "Station"),
                "left": ("Налево", "Left"),
                "right": ("Направо", "Right"),
                "restaurant": ("Ресторан", "Restaurant"),
            },
            4: {
                "mother": ("Мать", "Mother"),
                "father": ("Отец", "Father"),
                "brother": ("Брат", "Brother"),
                "sister": ("Сестра", "Sister"),
                "friend": ("Друг", "Friend"),
                "family": ("Семья", "Family"),
            },
            5: {
                "how_much": ("Сколько стоит", "How much"),
                "shirt": ("Рубашка", "Shirt"),
                "shoes": ("Обувь", "Shoes"),
                "price": ("Цена", "Price"),
                "card": ("Карта", "Card"),
                "cheap": ("Дешево", "Cheap"),
            },
        },
    },
    {
        "name": "Portuguese",
        "target_language": "Portuguese",
        "flag_emoji": "🇧🇷",
        "tts_locale": "pt-BR",
        "learners_count": "8M learners",
        "description": "Learn Portuguese from English — Brazilian style!",
        "units": {
            1: {
                "coffee": ("Café", "Coffee"),
                "tea": ("Chá", "Tea"),
                "water": ("Água", "Water"),
                "bread": ("Pão", "Bread"),
                "please": ("Por favor", "Please"),
                "thanks": ("Obrigado", "Thank you"),
            },
            2: {
                "hello": ("Olá", "Hello"),
                "goodbye": ("Tchau", "Goodbye"),
                "my_name": ("Meu nome é", "My name is"),
                "nice_meet": ("Prazer em conhecer", "Nice to meet you"),
                "yes": ("Sim", "Yes"),
                "no": ("Não", "No"),
            },
            3: {
                "where_is": ("Onde fica", "Where is"),
                "hotel": ("Hotel", "Hotel"),
                "station": ("Estação", "Station"),
                "left": ("Esquerda", "Left"),
                "right": ("Direita", "Right"),
                "restaurant": ("Restaurante", "Restaurant"),
            },
            4: {
                "mother": ("Mãe", "Mother"),
                "father": ("Pai", "Father"),
                "brother": ("Irmão", "Brother"),
                "sister": ("Irmã", "Sister"),
                "friend": ("Amigo", "Friend"),
                "family": ("Família", "Family"),
            },
            5: {
                "how_much": ("Quanto custa", "How much"),
                "shirt": ("Camisa", "Shirt"),
                "shoes": ("Sapatos", "Shoes"),
                "price": ("Preço", "Price"),
                "card": ("Cartão", "Card"),
                "cheap": ("Barato", "Cheap"),
            },
        },
    },
    {
        "name": "Arabic",
        "target_language": "Arabic",
        "flag_emoji": "🇸🇦",
        "tts_locale": "ar-SA",
        "learners_count": "7M learners",
        "description": "Learn Arabic from English — marhaban!",
        "units": {
            1: {
                "coffee": ("قهوة", "Coffee"),
                "tea": ("شاي", "Tea"),
                "water": ("ماء", "Water"),
                "bread": ("خبز", "Bread"),
                "please": ("من فضلك", "Please"),
                "thanks": ("شكرا", "Thank you"),
            },
            2: {
                "hello": ("مرحبا", "Hello"),
                "goodbye": ("مع السلامة", "Goodbye"),
                "my_name": ("اسمي", "My name is"),
                "nice_meet": ("تشرفت بمعرفتك", "Nice to meet you"),
                "yes": ("نعم", "Yes"),
                "no": ("لا", "No"),
            },
            3: {
                "where_is": ("أين هو", "Where is"),
                "hotel": ("فندق", "Hotel"),
                "station": ("محطة", "Station"),
                "left": ("يسار", "Left"),
                "right": ("يمين", "Right"),
                "restaurant": ("مطعم", "Restaurant"),
            },
            4: {
                "mother": ("أمي", "Mother"),
                "father": ("أبي", "Father"),
                "brother": ("أخي", "Brother"),
                "sister": ("أختي", "Sister"),
                "friend": ("صديق", "Friend"),
                "family": ("عائلة", "Family"),
            },
            5: {
                "how_much": ("كم السعر", "How much"),
                "shirt": ("قميص", "Shirt"),
                "shoes": ("حذاء", "Shoes"),
                "price": ("سعر", "Price"),
                "card": ("بطاقة", "Card"),
                "cheap": ("رخيص", "Cheap"),
            },
        },
    },
    {
        "name": "Hindi",
        "target_language": "Hindi",
        "flag_emoji": "🇮🇳",
        "tts_locale": "hi-IN",
        "learners_count": "6M learners",
        "description": "Learn Hindi from English — namaste!",
        "units": {
            1: {
                "coffee": ("कॉफ़ी", "Coffee"),
                "tea": ("चाय", "Tea"),
                "water": ("पानी", "Water"),
                "bread": ("रोटी", "Bread"),
                "please": ("कृपया", "Please"),
                "thanks": ("धन्यवाद", "Thank you"),
            },
            2: {
                "hello": ("नमस्ते", "Hello"),
                "goodbye": ("अलविदा", "Goodbye"),
                "my_name": ("मेरा नाम है", "My name is"),
                "nice_meet": ("आपसे मिलकर खुशी हुई", "Nice to meet you"),
                "yes": ("हाँ", "Yes"),
                "no": ("नहीं", "No"),
            },
            3: {
                "where_is": ("कहाँ है", "Where is"),
                "hotel": ("होटल", "Hotel"),
                "station": ("स्टेशन", "Station"),
                "left": ("बाएँ", "Left"),
                "right": ("दाएँ", "Right"),
                "restaurant": ("रेस्तरां", "Restaurant"),
            },
            4: {
                "mother": ("माँ", "Mother"),
                "father": ("पिताजी", "Father"),
                "brother": ("भाई", "Brother"),
                "sister": ("बहन", "Sister"),
                "friend": ("दोस्त", "Friend"),
                "family": ("परिवार", "Family"),
            },
            5: {
                "how_much": ("कितने का है", "How much"),
                "shirt": ("कमीज", "Shirt"),
                "shoes": ("जूते", "Shoes"),
                "price": ("कीमत", "Price"),
                "card": ("कार्ड", "Card"),
                "cheap": ("सस्ता", "Cheap"),
            },
        },
    },
    {
        "name": "English",
        "target_language": "English",
        "flag_emoji": "🇺🇸",
        "tts_locale": "en-US",
        "learners_count": "30M learners",
        "description": "Master English vocabulary and essential phrases!",
        "units": {
            1: {
                "coffee": ("Coffee", "Coffee"),
                "tea": ("Tea", "Tea"),
                "water": ("Water", "Water"),
                "bread": ("Bread", "Bread"),
                "please": ("Please", "Please"),
                "thanks": ("Thank you", "Thank you"),
            },
            2: {
                "hello": ("Hello", "Hello"),
                "goodbye": ("Goodbye", "Goodbye"),
                "my_name": ("My name is", "My name is"),
                "nice_meet": ("Nice to meet you", "Nice to meet you"),
                "yes": ("Yes", "Yes"),
                "no": ("No", "No"),
            },
            3: {
                "where_is": ("Where is", "Where is"),
                "hotel": ("Hotel", "Hotel"),
                "station": ("Station", "Station"),
                "left": ("Left", "Left"),
                "right": ("Right", "Right"),
                "restaurant": ("Restaurant", "Restaurant"),
            },
            4: {
                "mother": ("Mother", "Mother"),
                "father": ("Father", "Father"),
                "brother": ("Brother", "Brother"),
                "sister": ("Sister", "Sister"),
                "friend": ("Friend", "Friend"),
                "family": ("Family", "Family"),
            },
            5: {
                "how_much": ("How much", "How much"),
                "shirt": ("Shirt", "Shirt"),
                "shoes": ("Shoes", "Shoes"),
                "price": ("Price", "Price"),
                "card": ("Card", "Card"),
                "cheap": ("Cheap", "Cheap"),
            },
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


def build_course_units(lang_name: str, unit_words_dict: dict) -> list:
    """Build 5 distinct, topic-specific unit exercise suites for a language."""
    lang = lang_name

    def mc(prompt, correct, options, audio=None):
        return ("multiple_choice", prompt, correct, options, audio)

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
        unit_idx = idx + 1
        w = unit_words_dict.get(unit_idx, {})

        if unit_idx == 1:
            # UNIT 1: CAFÉ & ORDERING
            c_target, c_eng = w.get("coffee", ("Café", "Coffee"))
            t_target, t_eng = w.get("tea", ("Té", "Tea"))
            w_target, w_eng = w.get("water", ("Agua", "Water"))
            p_target, p_eng = w.get("please", ("Por favor", "Please"))
            th_target, th_eng = w.get("thanks", ("Gracias", "Thank you"))

            ex_list = [
                mc(
                    f"Select the correct English translation for: '{w_target}, {p_target}.'",
                    f"{w_eng}, {p_eng.lower()}.",
                    [f"{w_eng}, {p_eng.lower()}.", f"{c_eng} and {t_eng.lower()}.", "Where is the hotel?", f"{th_eng}!"],
                    f"{w_target}, {p_target}."
                ),
                translate(
                    f"Translate to {lang}: '{c_eng}, {p_eng.lower()}.'",
                    f"{c_target} {p_target}",
                    [c_target, p_target, w_target, t_target, "Hola"]
                ),
                translate(
                    f"Translate to English: '{th_target}'",
                    f"{th_eng}",
                    [th_eng, "Please", "Water", "Coffee", "Hello"]
                ),
                mc(
                    f"Select the correct {lang} translation for: '{t_eng}'",
                    f"{t_target}",
                    [t_target, c_target, w_target, p_target],
                    f"{t_eng}"
                ),
                type_answer(f"Type '{c_eng}' in {lang}", c_target),
                fill_blank(f"Complete: ___ {p_target} ({t_eng} please)", t_target),
                match_pairs(
                    f"Match {lang} café terms with English meanings",
                    f"{c_target}:{c_eng}|{t_target}:{t_eng}|{w_target}:{w_eng}|{p_target}:{p_eng}",
                    None,
                    [
                        {"left": c_target, "right": c_eng},
                        {"left": t_target, "right": t_eng},
                        {"left": w_target, "right": w_eng},
                        {"left": p_target, "right": p_eng},
                    ],
                ),
            ]

        elif unit_idx == 2:
            # UNIT 2: GREETINGS & INTRODUCTIONS
            h_target, h_eng = w.get("hello", ("Hola", "Hello"))
            g_target, g_eng = w.get("goodbye", ("Adiós", "Goodbye"))
            m_target, m_eng = w.get("my_name", ("Me llamo", "My name is"))
            n_target, n_eng = w.get("nice_meet", ("Mucho gusto", "Nice to meet you"))
            y_target, y_eng = w.get("yes", ("Sí", "Yes"))

            ex_list = [
                mc(
                    f"Select the correct English meaning of: '{h_target}, {m_target} Juan.'",
                    f"{h_eng}, {m_eng.lower()} Juan.",
                    [f"{h_eng}, {m_eng.lower()} Juan.", f"{g_eng}, see you tomorrow.", f"{n_eng}.", f"{y_eng}, thank you."],
                    f"{h_target}, {m_target} Juan."
                ),
                translate(
                    f"Translate to {lang}: '{h_eng}, {g_eng.lower()}!'",
                    f"{h_target} {g_target}",
                    [h_target, g_target, m_target, n_target, "Sí"]
                ),
                translate(
                    f"Translate to English: '{n_target}!'",
                    f"{n_eng}!",
                    [n_eng, "Hello", "Goodbye", "Yes", "Please"]
                ),
                mc(
                    f"Select the correct {lang} word for: '{g_eng}'",
                    f"{g_target}",
                    [g_target, h_target, m_target, n_target],
                    f"{g_eng}"
                ),
                type_answer(f"Type '{h_eng}' in {lang}", h_target),
                fill_blank(f"Complete: ___ {m_target} Maria ({h_eng}, my name is Maria)", h_target),
                match_pairs(
                    f"Match {lang} greetings with English translations",
                    f"{h_target}:{h_eng}|{g_target}:{g_eng}|{m_target}:{m_eng}|{n_target}:{n_eng}",
                    None,
                    [
                        {"left": h_target, "right": h_eng},
                        {"left": g_target, "right": g_eng},
                        {"left": m_target, "right": m_eng},
                        {"left": n_target, "right": n_eng},
                    ],
                ),
            ]

        elif unit_idx == 3:
            # UNIT 3: CITY NAVIGATION
            w_target, w_eng = w.get("where_is", ("Dónde está", "Where is"))
            h_target, h_eng = w.get("hotel", ("Hotel", "Hotel"))
            s_target, s_eng = w.get("station", ("Estación", "Station"))
            r_target, r_eng = w.get("restaurant", ("Restaurante", "Restaurant"))
            l_target, l_eng = w.get("left", ("Izquierda", "Left"))

            ex_list = [
                mc(
                    f"Select the correct English translation for: '{w_target} {h_target}?'",
                    f"{w_eng} the {h_eng.lower()}?",
                    [f"{w_eng} the {h_eng.lower()}?", f"Where is the {r_eng.lower()}?", f"Where is the {s_eng.lower()}?", "Turn left here."],
                    f"{w_target} {h_target}?"
                ),
                translate(
                    f"Translate to {lang}: '{w_eng} the {s_eng.lower()}?'",
                    f"{w_target} {s_target}",
                    [w_target, s_target, h_target, r_target, "Hola"]
                ),
                translate(
                    f"Translate to English: '{r_target}'",
                    f"{r_eng}",
                    [r_eng, h_eng, s_eng, "Left", "Right"]
                ),
                mc(
                    f"Select the correct {lang} translation for: '{s_eng}'",
                    f"{s_target}",
                    [s_target, h_target, r_target, l_target],
                    f"{s_eng}"
                ),
                type_answer(f"Type '{h_eng}' in {lang}", h_target),
                fill_blank(f"Complete: {w_target} ___? (Where is the {r_eng.lower()}?)", r_target),
                match_pairs(
                    f"Match {lang} city terms with English meanings",
                    f"{h_target}:{h_eng}|{s_target}:{s_eng}|{r_target}:{r_eng}|{w_target}:{w_eng}",
                    None,
                    [
                        {"left": h_target, "right": h_eng},
                        {"left": s_target, "right": s_eng},
                        {"left": r_target, "right": r_eng},
                        {"left": w_target, "right": w_eng},
                    ],
                ),
            ]

        elif unit_idx == 4:
            # UNIT 4: FAMILY & PEOPLE
            m_target, m_eng = w.get("mother", ("Madre", "Mother"))
            f_target, f_eng = w.get("father", ("Padre", "Father"))
            b_target, b_eng = w.get("brother", ("Hermano", "Brother"))
            s_target, s_eng = w.get("sister", ("Hermana", "Sister"))
            fr_target, fr_eng = w.get("friend", ("Amigo", "Friend"))

            ex_list = [
                mc(
                    f"Select the correct English meaning for: '{m_target} and {f_target}.'",
                    f"{m_eng} and {f_eng.lower()}.",
                    [f"{m_eng} and {f_eng.lower()}.", f"{b_eng} and {s_eng.lower()}.", f"{fr_eng} and family.", "Hotel and station."],
                    f"{m_target} and {f_target}."
                ),
                translate(
                    f"Translate to {lang}: '{b_eng} and {s_eng.lower()}.'",
                    f"{b_target} {s_target}",
                    [b_target, s_target, m_target, f_target, "Agua"]
                ),
                translate(
                    f"Translate to English: '{fr_target}'",
                    f"{fr_eng}",
                    [fr_eng, "Mother", "Father", "Brother", "Sister"]
                ),
                mc(
                    f"Select the correct {lang} word for: '{m_eng}'",
                    f"{m_target}",
                    [m_target, f_target, b_target, s_target],
                    f"{m_eng}"
                ),
                type_answer(f"Type '{m_eng}' in {lang}", m_target),
                fill_blank(f"Complete: {b_target} and ___ ({b_eng} and {s_eng.lower()})", s_target),
                match_pairs(
                    f"Match {lang} family terms with English translations",
                    f"{m_target}:{m_eng}|{f_target}:{f_eng}|{b_target}:{b_eng}|{s_target}:{s_eng}",
                    None,
                    [
                        {"left": m_target, "right": m_eng},
                        {"left": f_target, "right": f_eng},
                        {"left": b_target, "right": b_eng},
                        {"left": s_target, "right": s_eng},
                    ],
                ),
            ]

        else:
            # UNIT 5: SHOPPING & PRICES
            h_target, h_eng = w.get("how_much", ("Cuánto cuesta", "How much"))
            s_target, s_eng = w.get("shirt", ("Camisa", "Shirt"))
            sh_target, sh_eng = w.get("shoes", ("Zapatos", "Shoes"))
            p_target, p_eng = w.get("price", ("Precio", "Price"))
            c_target, c_eng = w.get("cheap", ("Barato", "Cheap"))

            ex_list = [
                mc(
                    f"Select the correct English meaning for: '{h_target} {s_target}?'",
                    f"{h_eng} is this {s_eng.lower()}?",
                    [f"{h_eng} is this {s_eng.lower()}?", f"{h_eng} are the {sh_eng.lower()}?", f"What is the {p_eng.lower()}?", "A glass of water."],
                    f"{h_target} {s_target}?"
                ),
                translate(
                    f"Translate to {lang}: '{h_eng} are the {sh_eng.lower()}?'",
                    f"{h_target} {sh_target}",
                    [h_target, sh_target, s_target, p_target, "Gracias"]
                ),
                translate(
                    f"Translate to English: '{p_target}'",
                    f"{p_eng}",
                    [p_eng, "Shirt", "Shoes", "Cheap", "Card"]
                ),
                mc(
                    f"Select the correct {lang} translation for: '{sh_eng}'",
                    f"{sh_target}",
                    [sh_target, s_target, p_target, c_target],
                    f"{sh_eng}"
                ),
                type_answer(f"Type '{s_eng}' in {lang}", s_target),
                fill_blank(f"Complete: {h_target} ___? (How much is the {p_eng.lower()}?)", p_target),
                match_pairs(
                    f"Match {lang} shopping terms with English meanings",
                    f"{s_target}:{s_eng}|{sh_target}:{sh_eng}|{p_target}:{p_eng}|{h_target}:{h_eng}",
                    None,
                    [
                        {"left": s_target, "right": s_eng},
                        {"left": sh_target, "right": sh_eng},
                        {"left": p_target, "right": p_eng},
                        {"left": h_target, "right": h_eng},
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

