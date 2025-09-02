import { baseApi } from "@/redux/baseApi"
import type { ILogin, IUser } from "@/types/auth"
import type { IResponse } from "@/types/response"

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createUser: build.mutation<IResponse, IUser>({
            query: (userInfo) => ({
                url: '/user/register',
                method: 'POST',
                data: userInfo
            })
        }),
        login: build.mutation<IResponse, ILogin>({
            query: (userInfo) => ({
                url: '/auth/login',
                method: 'POST',
                data: userInfo
            })
        }),
        logout: build.mutation<IResponse, null>({
           query: () => ({
                url: '/auth/logout',
                method: 'POST'
           }) 
        }),
        getUser: build.query({
            query: () => ({
                url: '/user'
            })
        })
    })
})

export const { useCreateUserMutation, useLoginMutation, useLogoutMutation, useGetUserQuery } = authApi

