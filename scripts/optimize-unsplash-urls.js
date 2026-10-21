import fs from 'fs';

const files = [
  'src/data/wigData.js',
  'src/components/StoryFeature.jsx',
  'src/components/LookReviewsModal.jsx',
  'src/components/StyleCategories.jsx',
  'src/components/UnboxingExperience.jsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  let count = 0;
  content = content.replace(/(https:\/\/images\.unsplash\.com\/[^"'`\s]+)/g, (url) => {
    if (!url.includes('fm=webp')) {
      count++;
      return url + (url.includes('?') ? '&fm=webp' : '?fm=webp');
    }
    return url;
  });
  if (count > 0) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Updated ${count} URLs in ${file} with &fm=webp`);
  } else {
    console.log(`No URLs needed updating in ${file}`);
  }
}
console.log('Finished updating Unsplash image URLs to WebP format!');
