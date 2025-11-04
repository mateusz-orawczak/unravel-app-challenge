import { FetchHotelResponse } from './types';

export async function fetchHotelData(): Promise<FetchHotelResponse> {
  const response = await fetch('/sample.json');
  
  if (!response.ok) {
    throw new Error('Failed to load hotel data');
  }

  const data = await response.json();
  return data;
}

