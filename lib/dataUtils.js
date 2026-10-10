import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'portfolio.json');

export function getPortfolioData() {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading portfolio data:", error);
    return { projects: [], experiences: [] };
  }
}

export function savePortfolioData(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error("Error saving portfolio data:", error);
    return false;
  }
}

const messagesFilePath = path.join(process.cwd(), 'data', 'messages.json');

export function getMessagesData() {
  try {
    const fileContents = fs.readFileSync(messagesFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading messages data:", error);
    return { messages: [] };
  }
}

export function saveMessagesData(data) {
  try {
    fs.writeFileSync(messagesFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error("Error saving messages data:", error);
    return false;
  }
}

export function getCertificates() {
  try {
    const certsDir = path.join(process.cwd(), 'public', 'certificates');
    if (!fs.existsSync(certsDir)) return [];
    
    const files = fs.readdirSync(certsDir);
    return files
      .filter(file => /\.(jpg|jpeg|png|webp|pdf)$/i.test(file))
      .map(file => {
        const ext = path.extname(file).toLowerCase();
        const isPdf = ext === '.pdf';
        const nameWithoutExt = path.basename(file, ext);
        
        // Format clean, human-readable title
        const title = nameWithoutExt
          .replace(/[_-]+/g, ' ')
          .replace(/\s+/g, ' ')
          .replace(/\b\w/g, c => c.toUpperCase())
          .trim();

        return {
          filename: file,
          url: `/certificates/${encodeURI(file)}`,
          title,
          type: isPdf ? 'pdf' : 'image',
          extension: ext.replace('.', '').toLowerCase(),
        };
      })
      .sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error("Error reading certificates:", error);
    return [];
  }
}

