import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imagesDir = path.resolve('public/images');

async function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (/\.(png|jpe?g)$/i.test(entry.name)) {
      const ext = path.extname(entry.name);
      const baseName = path.basename(entry.name, ext);
      const webpPath = path.join(dir, `${baseName}.webp`);
      
      try {
        console.log(`Converting ${entry.name} -> ${baseName}.webp...`);
        const info = await sharp(fullPath)
          .webp({ quality: 82, effort: 6 })
          .toFile(webpPath);
        
        const originalSize = fs.statSync(fullPath).size;
        const newSize = info.size;
        const savings = (((originalSize - newSize) / originalSize) * 100).toFixed(1);
        console.log(`✓ ${baseName}.webp created: ${(originalSize/1024).toFixed(0)}KB -> ${(newSize/1024).toFixed(0)}KB (${savings}% smaller)`);
      } catch (err) {
        console.error(`Error converting ${fullPath}:`, err);
      }
    }
  }
}

async function run() {
  console.log('Starting image conversion to WebP...');
  await processDirectory(imagesDir);
  console.log('Image conversion completed!');
}

run();
