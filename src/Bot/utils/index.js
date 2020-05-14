import fs, { read } from 'fs';
import path from 'path';

class Utils {
  constructor() {
    this.readFile();
  }

  readFile() {
    const filePath = path.resolve(__dirname, 'words.json');
    const readFile = fs.readFileSync(filePath, 'utf-8');
    const parsedFile = JSON.parse(readFile);

    const words = Object.values(parsedFile);

    return words;
  }
}

export default Utils;