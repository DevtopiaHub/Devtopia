#!/usr/bin/env python3
"""
lorem-ipsum - Generate placeholder text

Input: {"paragraphs": 2} or {"words": 50} or {"sentences": 5}
Output: {"text": "Lorem ipsum dolor sit amet..."}
"""

import json
import sys
import random

WORDS = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
    "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
    "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
    "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
    "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
    "deserunt", "mollit", "anim", "id", "est", "laborum", "at", "vero", "eos",
    "accusamus", "iusto", "odio", "dignissimos", "ducimus", "blanditiis",
    "praesentium", "voluptatum", "deleniti", "atque", "corrupti", "quos", "dolores",
    "quas", "molestias", "excepturi", "obcaecati", "cupiditate", "provident",
    "similique", "mollitia", "animi", "recusandae", "itaque", "earum", "rerum",
    "hic", "tenetur", "sapiente", "delectus", "reiciendis", "voluptatibus", "maiores",
    "alias", "perferendis", "doloribus", "asperiores", "repellat"
]

def generate_sentence(min_words=5, max_words=15):
    length = random.randint(min_words, max_words)
    words = [random.choice(WORDS) for _ in range(length)]
    words[0] = words[0].capitalize()
    # Add comma occasionally
    if length > 8 and random.random() > 0.5:
        comma_pos = random.randint(3, length - 3)
        words[comma_pos] = words[comma_pos] + ","
    return " ".join(words) + "."

def generate_paragraph(min_sentences=3, max_sentences=7):
    count = random.randint(min_sentences, max_sentences)
    sentences = [generate_sentence() for _ in range(count)]
    return " ".join(sentences)

def generate_words(count):
    words = []
    while len(words) < count:
        words.append(random.choice(WORDS))
    return " ".join(words[:count])

def generate_lorem(paragraphs=None, sentences=None, words=None):
    # Start with classic opening
    classic_start = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    
    if words:
        text = generate_words(words)
        if words >= 5:
            text = "Lorem ipsum dolor sit amet " + text[len("Lorem ipsum dolor sit amet "):]
        return {
            "text": text,
            "word_count": len(text.split())
        }
    
    if sentences:
        result = [classic_start]
        for _ in range(sentences - 1):
            result.append(generate_sentence())
        text = " ".join(result)
        return {
            "text": text,
            "sentence_count": sentences,
            "word_count": len(text.split())
        }
    
    # Default: paragraphs
    paragraphs = paragraphs or 1
    result = []
    for i in range(paragraphs):
        if i == 0:
            para = classic_start + " " + generate_paragraph(2, 5)
        else:
            para = generate_paragraph()
        result.append(para)
    
    text = "\n\n".join(result)
    return {
        "text": text,
        "paragraph_count": paragraphs,
        "word_count": len(text.split())
    }

if __name__ == "__main__":
    try:
        input_data = json.loads(sys.argv[1] if len(sys.argv) > 1 else '{}')
        
        paragraphs = input_data.get("paragraphs") or input_data.get("p")
        sentences = input_data.get("sentences") or input_data.get("s")
        words = input_data.get("words") or input_data.get("w")
        
        result = generate_lorem(paragraphs=paragraphs, sentences=sentences, words=words)
        print(json.dumps(result))
    except json.JSONDecodeError:
        print(json.dumps({"error": "Invalid JSON input"}))
        sys.exit(1)
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
