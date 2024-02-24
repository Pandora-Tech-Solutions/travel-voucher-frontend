import { createSlice } from '@reduxjs/toolkit';
import { Card, CardHistoric, OperationType } from '../../types/Card';
import { apiSlice } from './api-slice';

interface IInitialCardsState {
  data: Card[]
}

export const initialState = {
  data: [],
} as IInitialCardsState

const endpointUrl = '/cards'

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, action) => {
      state.data.push(action.payload)
    },
    update: (state, action) => {
      const index = state.data.findIndex((card) => card._id === action.payload._id)
      state.data[index] = action.payload
    },
    remove: (state, action) => {
      state.data = state.data.filter((card) => card._id !== action.payload)
    },
    setCards: (state, action) => {
      state.data = action.payload.data
    }
  }
})

function getCards() {
  return `${endpointUrl}`
}

export const cardApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCards: query({
      query: getCards,
      providesTags: ['cards'],
    }),
    getCard: query<Card, string>({
      query: (id) => `${endpointUrl}/${id}`,
      providesTags: ['cards'],
    }),
    createCard: mutation<Card, Card>({
      query: (card) => ({ url: endpointUrl, method: 'POST', body: card }),
      invalidatesTags: ['cards'],
    }),
    updateCard: mutation<Card, Card>({
      query: (card) => ({ url: `${endpointUrl}/${card._id}`, method: 'PUT', body: card }),
      invalidatesTags: ['cards'],
    }),
    removeCard: mutation<string, string>({
      query: (id) => ({ url: `${endpointUrl}/${id}`, method: 'DELETE' }),
      invalidatesTags: ['cards'],
    }),
  })
})

export default cardSlice.reducer
export const { addCard, update, remove, setCards } = cardSlice.actions

export const { 
  useCreateCardMutation,
  useGetCardsQuery,
  useGetCardQuery,
  useRemoveCardMutation,
  useLazyGetCardQuery,
  useUpdateCardMutation,
  useLazyGetCardsQuery,
} = cardApiSlice