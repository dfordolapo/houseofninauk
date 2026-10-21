import sharp from 'sharp';
import fs from 'fs';

async function makeSealMask() {
  const width = 175;
  const height = 175;
  
  // Create an SVG circle mask with feather
  const maskSvg = Buffer.from(`
    <svg width="${width}" height="${height}">
      <defs>
        <radialGradient id="fade" cx="50%" cy="50%" r="50%">
          <stop offset="78%" stop-color="white" stop-opacity="1" />
          <stop offset="95%" stop-color="white" stop-opacity="0.8" />
          <stop offset="100%" stop-color="white" stop-opacity="0" />
        </radialGradient>
      </defs>
      <circle cx="${width/2}" cy="${height/2}" r="${width/2 - 2}" fill="url(#fade)" />
    </svg>
  `);

  const input = await sharp('public/images/wax-seal-isolated.png').ensureAlpha().toBuffer();
  
  await sharp(input)
    .composite([{ input: maskSvg, blend: 'dest-in' }])
    .webp({ quality: 95 })
    .toFile('public/images/wax-seal.webp');
    
  console.log('✓ Created public/images/wax-seal.webp with smooth alpha edge');
}

makeSealMask().catch(console.error);
