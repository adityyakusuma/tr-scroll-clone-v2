const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const images = ['Fruit01.jpg', 'Fruit02.jpg', 'Fruit03.jpg'];
const srcDir = path.join(__dirname, '..', 'src', 'assets', 'images');

(async () => {
  try {
    for (const img of images) {
      const input = path.join(srcDir, img);
      if (!fs.existsSync(input)) {
        console.warn(`Skipping missing file: ${input}`);
        continue;
      }

      const statBefore = fs.statSync(input).size;
      const tmpOut = path.join(srcDir, `${img}.tmp`);

      await sharp(input)
        .resize({ width: 1600, withoutEnlargement: true })
        .jpeg({ quality: 75, mozjpeg: true })
        .toFile(tmpOut);

      fs.renameSync(tmpOut, input);
      const statAfter = fs.statSync(input).size;
      console.log(`Optimized ${img}: ${Math.round(statBefore / 1024)}KB → ${Math.round(statAfter / 1024)}KB`);
    }

    console.log('JPEG optimization complete.');
  } catch (err) {
    console.error('Error optimizing JPGs:', err);
    process.exit(1);
  }
})();
