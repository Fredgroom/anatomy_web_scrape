import axios from 'axios';
import config from '../config';
import logger from '../logs/logger';

export default async function scrape(): Promise<any> {
  try {
    const { data } = await axios.get(config.url);
    logger.info('HTTP request successful', { url: config.url });
    return data;
  } catch (error: any) {
    logger.error('Error during scraping', { error: error.message });
    console.error('Error during scraping:', error);
  }
}
