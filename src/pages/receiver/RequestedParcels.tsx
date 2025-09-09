import { UniversalSkeleton } from "@/components/layout/Skeleton"
import ReceiverParcelTable from "@/components/modules/receiver/ReceiverParcelTable"
import { useGetRequestedReceiverParcelsQuery } from "@/redux/features/parcel/parcel.api"
import type { IReceiverParcel } from "@/types/parcel"

const RequestedParcels = () => {
  const {data: requestedParcels, isLoading} = useGetRequestedReceiverParcelsQuery(undefined)

  const filteredRequestedParcels = requestedParcels?.data.filter((item: any) => !item.isCanceled)

  if (isLoading) {
    return <UniversalSkeleton />
  }

  return (
    <div className="grid md:grid-cols-2 gap-10 md:gap-x-0 m-5">
      {
        filteredRequestedParcels?.map((item: IReceiverParcel) => (
          <div key={item._id}>
            <ReceiverParcelTable tableItems={{...item}} />
          </div>
        ))
      }    
    </div>
  )
}

export default RequestedParcels