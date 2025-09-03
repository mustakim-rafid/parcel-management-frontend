import { baseApi } from "@/redux/baseApi"
import type { ILogin, IUser } from "@/types/auth"
import type { IResponse } from "@/types/response"

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createUser: build.mutation<IResponse<any>, IUser>({
            query: (userInfo) => ({
                url: '/user/register',
                method: 'POST',
                data: userInfo
            })
        }),
        login: build.mutation<IResponse<any>, ILogin>({
            query: (userInfo) => ({
                url: '/auth/login',
                method: 'POST',
                data: userInfo
            })
        }),
        logout: build.mutation<IResponse<any>, null>({
           query: () => ({
                url: '/auth/logout',
                method: 'POST'
           }) 
        }),
        getUser: build.query({
            query: () => ({
                url: '/user'
            })
        }),
        getReceiverByEmail: build.query({
            query: (email) => ({
                url: `/user/receiver?email=${email}`
            })
        })
    })
})

export const { useCreateUserMutation, useLoginMutation, useLogoutMutation, useGetUserQuery, useLazyGetReceiverByEmailQuery } = authApi

