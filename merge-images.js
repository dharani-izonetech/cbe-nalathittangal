const fs = require('fs');

const mainCategories = JSON.parse(fs.readFileSync('src/data/categories.json', 'utf8'));
const src3Categories = JSON.parse(fs.readFileSync('src3/data/categories.json', 'utf8'));

mainCategories.forEach(mainCat => {
    const src3Cat = src3Categories.find(s => s.title.trim() === mainCat.title.trim());
    if (src3Cat && src3Cat.cardImage) {
        mainCat.cardImage = src3Cat.cardImage;
    }
    if (src3Cat && src3Cat.icon) {
        mainCat.icon = src3Cat.icon;
    }
});

fs.writeFileSync('src/data/categories.json', JSON.stringify(mainCategories, null, 4));
console.log('Merge complete!');
