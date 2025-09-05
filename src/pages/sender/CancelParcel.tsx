import CancelParcelTable from "@/components/modules/sender/CancelParcelTable"
import { useGetCancelableParcelsQuery } from "@/redux/features/parcel/parcel.api"
import type { ISenderParcel } from "@/types/parcel"

const CancelParcel = () => {
    const { data: cancelableParcels } = useGetCancelableParcelsQuery(undefined)

  return (
    <div className="grid md:grid-cols-2 gap-10 md:gap-x-0 m-5">
        {
            cancelableParcels?.data.map((item: ISenderParcel) => (
                <div key={item._id}>
                    <CancelParcelTable tableItems={{...item}} />
                </div>
            ))
        }    
    </div>
  )
}

export default CancelParcel