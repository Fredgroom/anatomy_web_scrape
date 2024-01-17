import axios from 'axios';
import scrape from '.';
import config from '../config';

jest.mock('axios');

describe('scrape', () => {
  const mockData = { data: 'some data' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully return data from the API', async () => {
    (axios.get as jest.Mock).mockResolvedValue(mockData);

    const result = await scrape();

    expect(axios.get).toHaveBeenCalledWith(config.url);
    expect(result).toEqual(mockData.data);
  });

  it('should handle errors during the API call', async () => {
    const error = new Error('Network error');
    (axios.get as jest.Mock).mockRejectedValue(error);
    await scrape();
  });
});
