import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { apiSlice } from './api-slice'
import { User } from '@/types/User'

export interface AuthState {
  access_token: string
  user: User
}

export interface LoginPayload {
  email: string
  password: string
}

const initialState = {
  access_token: "",
  user: {
    _id: "",
    email: "",
    name: "",
    roles: [],
    companies: [],
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      neighborhood: "",
      number: "",
      complement: "",
      zipcode: ""
    },
    cpf: "",
    phone: "",
    rg: "",
  }
} as AuthState

const endpointUrl = 'auth/login'

function mutationLoginUser(data: LoginPayload) {
  return { url: endpointUrl, method: 'POST', body: data }
}

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: () => {
      document.cookie = `access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      console.log('aqui')
      window.location.href = '/login'
      return initialState
    },
    logIn: (_, action: PayloadAction<AuthState>) => {
      const now = new Date();
      const time = now.getTime();
      const expireTime = time + 3600 * 1000;
      now.setTime(expireTime);
      document.cookie = `access_token=${action.payload.access_token}; expires=${now.toUTCString()}; path=/`;
      return {
        access_token: action.payload.access_token,
        user: action.payload.user
      }
    },
  }
})

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ mutation }) => ({
    loginUser: mutation<AuthState, LoginPayload>({
      query: mutationLoginUser,
      invalidatesTags: ['auth'],
    })
  })
})

export default auth.reducer;
export const { logIn, logOut } = auth.actions

export const { useLoginUserMutation } = authApiSlice