import { baseApi } from "@/redux/baseApi"
import type { IReceiverParcel, ISenderParcel } from "@/types/parcel"
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
        }),
        getCancelableParcels: build.query<IResponse<ISenderParcel[]>, any>({
            query: () => ({
                url: '/parcel/sender-parcels?isCancelableParcels=true'
            }),
            providesTags: ["Parcel"]
        }),
        getRequestedReceiverParcels: build.query<IResponse<IReceiverParcel[]>, any>({
            query: () => ({
                url: "/parcel/receiver-parcels?requested=true"
            }),
            providesTags: ["Parcel"]
        }),
        getIncomingReceiverParcels: build.query<IResponse<IReceiverParcel[]>, any>({
            query: () => ({
                url: "/parcel/receiver-parcels?requested=false"
            }),
            providesTags: ["Parcel"]
        }),
        approveParcel: build.mutation<IResponse<any>, any>({
            query: (id) => ({
                url: `parcel/${id}/approve`,
                method: 'PATCH'
            }),
            invalidatesTags: ["Parcel"]
        }),
        cancelParcel: build.mutation<IResponse<any>, any>({
            query: (id) => ({
                url: `parcel/${id}/cancel-parcel`,
                method: `PATCH`
            }),
            invalidatesTags: ["Parcel"]
        }),
        getAllReceiverParcels: build.query<IResponse<any>, any>({
            query: () => ({
                url: "/parcel/receiver-parcels?allParcels=true"
            })
        })
    })
})

export const { useCreateParcelMutation, useGetSenderParcelsQuery, useGetCancelableParcelsQuery, useGetAllReceiverParcelsQuery, useGetRequestedReceiverParcelsQuery, useGetIncomingReceiverParcelsQuery, useApproveParcelMutation, useCancelParcelMutation } = parcelApi

