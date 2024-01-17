import cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';
import scrape from './scrape';

interface ScrapedData {
  timestamp: Date;
  data: any;
}

function saveData(data: any): void {
  const filePath = path.join(__dirname, '../data/data.json');
  const dataToSave: ScrapedData = { timestamp: new Date(), data: data };
  fs.writeFileSync(filePath, JSON.stringify(dataToSave, null, 2));
}

function loadData(): ScrapedData | null {
  const filePath = path.join(__dirname, '../data/data.json');
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent) as ScrapedData;
  }
  return null;
}

async function main() {
  const existingData = loadData();
  if (
    existingData &&
    new Date().getTime() - new Date(existingData.timestamp).getTime() <
      24 * 60 * 60 * 1000
  ) {
    console.log('Using cached data');
  } else {
    console.log('Scraping new data');
    const newData = await scrape();
    saveData(newData);
  }
}

main();
