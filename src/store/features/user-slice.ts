import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { apiSlice } from './api-slice'
import { User } from '@/types/User'

export interface UserListState {
  users: User[]
}

const initialState = {
  users: [],
} as UserListState

const endpointUrl = 'users'

function mutationCreateUser(data: User) {
  return { url: endpointUrl, method: 'POST', body: data }
}

function mutationUpdateUser(data: User) {
  return { url: `${endpointUrl}/${data._id}`, method: 'PUT', body: data }
}

function mutationDeleteUser(data: User) {
  return { url: `${endpointUrl}/${data._id}`, method: 'DELETE' }
}

export const userList = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload)
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex((user) => user._id === action.payload._id)
      state.users[index] = action.payload
    },
    deleteUser: (state, action: PayloadAction<User>) => {
      state.users = state.users.filter((user) => user._id !== action.payload._id)
    },
  },
})

export const userListApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ mutation, query }) => ({
    createUser: mutation<User, User>({
      query: mutationCreateUser,
    }),
    updateUser: mutation<User, User>({
      query: mutationUpdateUser,
    }),
    deleteUser: mutation<User, User>({
      query: mutationDeleteUser,
    }),
    getUsers: query<User[], void>({
      query: () => endpointUrl,
    }),
    getUserById: query<User, string>({
      query: (id) => `${endpointUrl}/${id}`,
    }),
  }),
})

export default userList.reducer
export const { setUsers, addUser, updateUser, deleteUser, } = userList.actions
export const { getUsers, createUser, updateUser: updateUserMutation, deleteUser: deleteUserMutation, getUserById } = userListApiSlice.endpoints

export const { useCreateUserMutation, useDeleteUserMutation, useGetUserByIdQuery, useGetUsersQuery, useLazyGetUserByIdQuery, useLazyGetUsersQuery, useUpdateUserMutation } = userListApiSlice;