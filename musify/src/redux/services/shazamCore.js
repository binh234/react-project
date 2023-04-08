import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set(
        'X-RapidAPI-Key',
        import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY,
      );

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => 'v1/charts/world' }),
    getSongsByGenre: builder.query({
      query: (genre) => `v1/charts/genre-world?genre_code=${genre}`,
    }),
    getSongsByCountry: builder.query({
      query: (countryCode) => `v1/charts/country?country_code=${countryCode}`,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) => `v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`,
    }),
    getArtistDetails: builder.query({
      query: (artistId) => `v2/artists/details?artist_id=${artistId}`,
    }),
    getSongDetails: builder.query({
      query: ({ songid }) => `v1/tracks/details?track_id=${songid}`,
    }),
    getSongRelated: builder.query({
      query: ({ songid }) => `v1/tracks/related?track_id=${songid}`,
    }),
  }),
});

// export const shazamCoreApi = createApi({
//   reducerPath: 'shazamCoreApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://shazam.p.rapidapi.com/',
//     prepareHeaders: (headers) => {
//       headers.set(
//         'X-RapidAPI-Key',
//         import.meta.env.VITE_SHAZAM_RAPID_API_KEY,
//       );

//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     getTopCharts: builder.query({ query: () => 'charts/track?list_id=genre-global-chart-12' }),
//     getSongsByGenre: builder.query({
//       query: (genre) => `charts/track?list_id=${genre}`,
//     }),
//     getSongsByCountry: builder.query({
//       query: (countryCode) => `charts/track?list_id=ip-country-chart-${countryCode}`,
//     }),
//     getSongsBySearch: builder.query({
//       query: (searchTerm) => `search?term=${searchTerm}`,
//     }),
//     getArtistDetails: builder.query({
//       query: (artistId) => `artists/get-details?id=${artistId}`,
//     }),
//     getArtistSongs: builder.query({
//       query: (artistId) => `artists/get-top-songs?id=${artistId}`,
//     }),
//     getSongDetails: builder.query({
//       query: ({ songid }) => `songs/v2/get-details?id=${songid}`,
//     }),
//     getSongRelated: builder.query({
//       query: ({ songid }) => `songs/list-recommendations?key=${songid}`,
//     }),
//   }),
// });

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
  useGetArtistDetailsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} = shazamCoreApi;
