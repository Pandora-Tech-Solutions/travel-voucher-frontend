import { createSlice } from '@reduxjs/toolkit';
import { IUserQuery, User } from '../../types/User';
import { apiSlice } from './api-slice';
import { get } from 'http';

interface IInitialUsersState {
  data: User[]
  page: number
  pages: number
  total: number
}

export const initialState = {
  data: [],
  page: 0,
  pages: 0,
  total: 0,
} as IInitialUsersState

const endpointUrl = '/users'

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.data.push(action.payload)
    },
    update: (state, action) => {
      const index = state.data.findIndex((user) => user._id === action.payload._id)
      state.data[index] = action.payload
    },
    remove: (state, action) => {
      state.data = state.data.filter((user) => user._id !== action.payload)
    },
    setUsers: (state, action) => {
      state.data = action.payload.data
      state.page = action.payload.page
      state.pages = action.payload.pages
      state.total = action.payload.total
    }
  }
})

function parseQueryParams(params: IUserQuery = { limit: 10, page: 1 }) {
  const query = new URLSearchParams()
  if (params.page) query.append('page', params.page.toString())
  if (params.limit) query.append('limit', params.limit.toString())
  if (params.search) query.append('search', params.search)
  return query.toString()
}

function getUsers(params: IUserQuery) {
  return `${endpointUrl}?${parseQueryParams(params)}`
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getUsers: query<IInitialUsersState, IUserQuery>({
      query: getUsers,
      providesTags: ['users'],
    }),
    getUser: query<User, string>({
      query: (id) => `${endpointUrl}/${id}`,
      providesTags: ['users'],
    }),
    createUser: mutation<User, User>({
      query: (user) => ({ url: endpointUrl, method: 'POST', body: user }),
      invalidatesTags: ['users'],
    }),
    updateUser: mutation<User, User>({
      query: (user) => ({ url: `${endpointUrl}/${user._id}`, method: 'PUT', body: user }),
      invalidatesTags: ['users'],
    }),
    removeUser: mutation<string, string>({
      query: (id) => ({ url: `${endpointUrl}/${id}`, method: 'DELETE' }),
      invalidatesTags: ['users'],
    }),
  })
})

export default userSlice.reducer
export const { addUser, update, remove, setUsers } = userSlice.actions

export const { 
  useCreateUserMutation, 
  useGetUserQuery, 
  useGetUsersQuery, 
  useLazyGetUserQuery, 
  useLazyGetUsersQuery, 
  useRemoveUserMutation, 
  useUpdateUserMutation,
} = userApiSlice