import { createSlice } from '@reduxjs/toolkit';
import { IUserQuery, User } from '../../types/User';
import { apiSlice } from './api-slice';
import { Company } from '@/types/Company';

interface IInitialCompaniesState {
  data: Company[]
  page: number
  pages: number
  total: number
}

export const initialState = {
  data: [],
  page: 0,
  pages: 0,
  total: 0,
} as IInitialCompaniesState

const endpointUrl = '/companies'

const companySlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    addCompany: (state, action) => {
      state.data.push(action.payload)
    },
    update: (state, action) => {
      const index = state.data.findIndex((company) => company._id === action.payload._id)
      state.data[index] = action.payload
    },
    remove: (state, action) => {
      state.data = state.data.filter((user) => user._id !== action.payload)
    },
    setCompanies: (state, action) => {
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

function getCompanies(params: IUserQuery) {
  return `${endpointUrl}?${parseQueryParams(params)}`
}

export const companyApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCompanies: query<IInitialCompaniesState, IUserQuery>({
      query: getCompanies,
      providesTags: ['companies'],
    }),
    getCompany: query<Company, string>({
      query: (id) => `${endpointUrl}/${id}`,
      providesTags: ['companies'],
    }),
    createCompany: mutation<Company, Company>({
      query: (company) => ({ url: endpointUrl, method: 'POST', body: company }),
      invalidatesTags: ['companies'],
    }),
    updateCompany: mutation<Company, Company>({
      query: (company) => ({ url: `${endpointUrl}/${company._id}`, method: 'PUT', body: company }),
      invalidatesTags: ['companies'],
    }),
    removeCompany: mutation<string, string>({
      query: (id) => ({ url: `${endpointUrl}/${id}`, method: 'DELETE' }),
      invalidatesTags: ['companies'],
    }),
  })
})

export default companySlice.reducer
export const { addCompany, update, remove, setCompanies } = companySlice.actions

export const { 
  useCreateCompanyMutation,
  useGetCompaniesQuery,
  useGetCompanyQuery,
  useRemoveCompanyMutation,
  useUpdateCompanyMutation,
  useLazyGetCompaniesQuery,
  useLazyGetCompanyQuery,
} = companyApiSlice