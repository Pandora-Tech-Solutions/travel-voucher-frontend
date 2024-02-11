import { getCookie } from '@/utils/getCookie'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

export const apiSlice = createApi({
  reducerPath: 'travelVoucherApi',
  tagTypes: ['auth'],
  endpoints: (builder) => ({}),
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.NEXT_PUBLIC_API_URL, 
    headers: { 
      'Content-Type': 'application/json', 
      Authorization: `Bearer ${getCookie('access_token')}` 
    } 
  }),
  extractRehydrationInfo(action: any, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
})