import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
    prepareHeaders: (headers) => {
      headers.set(
        'X-RapidAPI-Key',
        'e0fa496b4emsh0b5bf296222550dp17564cjsnf87af016ce9c'
      );

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => `/charts/world` }),
  }),
});

export const { useGetTopChartsQuery } = shazamCoreApi;
