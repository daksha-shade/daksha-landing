const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Base SVG for Daksha logo
const logoSvg = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2383e2;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#37352f;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="64" fill="url(#grad)"/>
  <text x="256" y="320" font-family="Inter, system-ui, sans-serif" font-size="280" font-weight="600" text-anchor="middle" fill="white">D</text>
</svg>
`;

// Icon sizes for PWA
const iconSizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'icon-48x48.png' },
  { size: 72, name: 'icon-72x72.png' },
  { size: 96, name: 'icon-96x96.png' },
  { size: 128, name: 'icon-128x128.png' },
  { size: 144, name: 'icon-144x144.png' },
  { size: 152, name: 'icon-152x152.png' },
  { size: 192, name: 'icon-192x192.png' },
  { size: 256, name: 'icon-256x256.png' },
  { size: 384, name: 'icon-384x384.png' },
  { size: 512, name: 'icon-512x512.png' },
];

async function generateIcons() {
  console.log('Generating PWA icons...');
  
  // Generate PNG icons
  for (const { size, name } of iconSizes) {
    await sharp(Buffer.from(logoSvg))
      .resize(size, size)
      .png()
      .toFile(path.join(publicDir, name));
    console.log(`Generated ${name}`);
  }

  // Generate favicon.ico (multi-size ICO file)
  const favicon16 = await sharp(Buffer.from(logoSvg))
    .resize(16, 16)
    .png()
    .toBuffer();
    
  const favicon32 = await sharp(Buffer.from(logoSvg))
    .resize(32, 32)
    .png()
    .toBuffer();

  // For ICO generation, we'll create a simple 32x32 favicon
  await sharp(Buffer.from(logoSvg))
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));
    
  console.log('Generated favicon.ico');

  // Generate Apple touch icon
  await sharp(Buffer.from(logoSvg))
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
    
  console.log('Generated apple-touch-icon.png');

  console.log('All icons generated successfully!');
}

generateIcons().catch(console.error);