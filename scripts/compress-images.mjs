import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";

const imagesDir = "./src/assets/images";

const files = [
  "nutrition01.jpg",
  "nutrition02.jpg",
  "nutrition03.jpg",
  "nutrition04.jpg",
  "workout01.jpg",
  "workout02.jpg",
  "workout03.png",
  "workout04.png",
  "hellich-hero-image.webp",
];

async function compress() {
  for (const file of files) {
    const filepath = path.join(imagesDir, file);
    const ext = path.extname(file);
    const name = path.basename(file, ext);

    try {
      const meta = await sharp(filepath).metadata();
      const width = meta.width || 1920;
      const height = meta.height || 1080;

      let newPath;
      if (ext === ".webp") {
        newPath = path.join(imagesDir, `${name}-compressed.webp`);
        await sharp(filepath)
          .resize(Math.min(width, 1920), null, { withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(newPath);
      } else if (ext === ".png") {
        newPath = path.join(imagesDir, `${name}-compressed.png`);
        await sharp(filepath)
          .resize(Math.min(width, 1920), null, { withoutEnlargement: true })
          .png({ compressionLevel: 9, quality: 80 })
          .toFile(newPath);
      } else {
        newPath = path.join(imagesDir, `${name}-compressed.jpg`);
        await sharp(filepath)
          .resize(Math.min(width, 1920), null, { withoutEnlargement: true })
          .jpeg({ quality: 80, mozjpeg: true })
          .toFile(newPath);
      }

      const oldSize = (await fs.stat(filepath)).size;
      const newSize = (await fs.stat(newPath)).size;
      const reduction = ((1 - newSize / oldSize) * 100).toFixed(1);

      console.log(
        `${file}: ${(oldSize / 1024).toFixed(0)}KB -> ${(newSize / 1024).toFixed(0)}KB (${reduction}% smaller)`,
      );

      await fs.unlink(filepath);
      await fs.rename(newPath, filepath);
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  }
}

compress();
