import json

try:
    with open('src/data/categories.json', 'r', encoding='utf-8-sig') as f:
        main_categories = json.load(f)

    with open('src3/data/categories.json', 'r', encoding='utf-8-sig') as f:
        src3_categories = json.load(f)

    for main_cat in main_categories:
        src3_cat = next((s for s in src3_categories if s['title'].strip() == main_cat['title'].strip()), None)
        if src3_cat:
            if 'cardImage' in src3_cat:
                main_cat['cardImage'] = src3_cat['cardImage']
            if 'icon' in src3_cat:
                main_cat['icon'] = src3_cat['icon']

    with open('src/data/categories.json', 'w', encoding='utf-8') as f:
        json.dump(main_categories, f, ensure_ascii=False, indent=4)

    print("Python Merge successful.")
except Exception as e:
    print(f"Error: {e}")
