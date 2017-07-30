import { AsyncStorage } from 'react-native';

import { IQuote } from './types';

const getDateString = (input: string) => {
  const date = new Date(input);
  let dd: any = date.getDate();
  let mm: any = date.getMonth() + 1; //January is 0!
  const yyyy = date.getFullYear();

  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }
  
  return `${mm}/${dd}/${yyyy}`;
}

export const getRandomQuoteAsync = (): Promise<IQuote> => {
  return fetch('https://api.tronalddump.io/random/quote', {
    method: 'GET',
    headers: {
      'accept': 'application/hal+json',
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      const date = getDateString(responseJson.appeared_at);
      return {
        key: responseJson.quote_id,
        body: responseJson.value,
        url: responseJson._embedded.source[0].url,
        date,
      };
    });
};

export const searchQuotesAsync = (query: string, page: number = 1): Promise<Array<IQuote | undefined>> => {
  return fetch(`https://api.tronalddump.io/search/quote?query=${query}&page=${page}`, {
    method: 'GET',
    headers: {
      'accept': 'application/hal+json',
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson._embedded.quotes) {
        return responseJson._embedded.quotes.map((item: any): IQuote => {
          return {
            key: item.quote_id,
            body: item.value,
            date: getDateString(item.appeared_at),
            url: item._embedded.source[0].url,
          };
        })
      }
      else {
        return [];
      }
    })
    .catch(() => {
      return [];
    })
};

export const loadFavoritesAsync = (): Promise<Array<IQuote>> => {
  return AsyncStorage.getItem('@tronalddump:favorites')
    .then((value) => {
      const stored = JSON.parse(value);
      return stored || [];
    })
    .catch(() => {
      return [];
    })
};

export const addFavoriteAsync = (quote: IQuote): Promise<void> => {
  return loadFavoritesAsync()
    .then((favorites) => {
      if (favorites.find((item) => item.key === quote.key)) {
        return favorites;
      }
      else {
        return [
          quote,
          ...favorites,
        ];
      }
    })
    .then((quotes) => {
      return AsyncStorage.setItem('@tronalddump:favorites', JSON.stringify(quotes));
    });
};

export const removeFavoriteAsync = (key?: string): Promise<void> => {
  return loadFavoritesAsync()
    .then((favorites) => {
      return favorites.filter((item) => item.key !== key);
    })
    .then((quotes) => {
      return AsyncStorage.setItem('@tronalddump:favorites', JSON.stringify(quotes));
    });
};
