import { HiOutlineHashtag, HiOutlineHome, HiOutlinePhotograph, HiOutlineUserGroup } from 'react-icons/hi';

export const genres = [
  { title: 'Pop', value: 'POP', code: 'genre-global-chart-1' },
  { title: 'Hip-Hop', value: 'HIP_HOP_RAP', code: 'genre-global-chart-2' },
  { title: 'Dance', value: 'DANCE', code: 'genre-global-chart-3' },
  { title: 'Electronic', value: 'ELECTRONIC', code: 'genre-global-chart-4' },
  { title: 'Soul', value: 'SOUL_RNB', code: 'genre-global-chart-5' },
  { title: 'Alternative', value: 'ALTERNATIVE', code: 'genre-global-chart-6' },
  { title: 'Rock', value: 'ROCK', code: 'genre-global-chart-7' },
  { title: 'Latin', value: 'LATIN', code: 'genre-global-chart-8' },
  { title: 'Film', value: 'FILM_TV', code: 'genre-global-chart-9' },
  { title: 'Country', value: 'COUNTRY', code: 'genre-global-chart-10' },
  { title: 'Worldwide', value: 'WORLDWIDE', code: 'genre-global-chart-12' },
  { title: 'Reggae', value: 'REGGAE_DANCE_HALL', code: 'genre-global-chart-13' },
  { title: 'House', value: 'HOUSE', code: 'genre-global-chart-14' },
  { title: 'K-Pop', value: 'K_POP', code: 'genre-global-chart-15' },
  { title: 'French Pop', value: 'FRENCH_POP', code: 'genre-global-chart-16' },
];

export const links = [
  { name: 'Discover', to: '/', icon: HiOutlineHome },
  { name: 'Around You', to: '/around-you', icon: HiOutlinePhotograph },
  { name: 'Top Artists', to: '/top-artists', icon: HiOutlineUserGroup },
  { name: 'Top Charts', to: '/top-charts', icon: HiOutlineHashtag },
];
