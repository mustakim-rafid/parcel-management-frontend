import { baseApi } from "@/redux/baseApi"
import type { ISenderParcel } from "@/types/parcel"
import type { IResponse } from "@/types/response"

export const parcelApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createParcel: build.mutation<IResponse<any>, any>({
            query: (parcelInfo) => ({
                url: '/parcel',
                method: 'POST',
                data: parcelInfo
            })
        }),
        getSenderParcels: build.query<IResponse<ISenderParcel[]>, any>({
            query: () => ({
                url: '/parcel/sender-parcels'
            })
        })
    })
})

export const { useCreateParcelMutation, useGetSenderParcelsQuery } = parcelApi

