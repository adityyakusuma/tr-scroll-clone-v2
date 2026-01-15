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
      const name = path.parse(img).name;
      const output = path.join(srcDir, `${name}.webp`);

      await sharp(input)
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(output);

      console.log(`Created: ${output}`);
    }
    console.log('Image optimization complete.');
  } catch (err) {
    console.error('Error optimizing images:', err);
    process.exit(1);
  }
})();
