import SenderParcelTable from "@/components/modules/sender/SenderParcelTable"
import { useGetSenderParcelsQuery } from "@/redux/features/parcel/parcel.api"
import type { ISenderParcel } from "@/types/parcel"

const SenderParcels = () => {
    const { data: senderParcels } = useGetSenderParcelsQuery(undefined)

  return (
    <div className="grid md:grid-cols-2 gap-5 md:gap-0 m-5">
        {
            senderParcels?.data.map((item: ISenderParcel) => (
                <div key={item._id}>
                    <SenderParcelTable tableItems={{...item}} />
                </div>
            ))
        }    
    </div>
  )
}

export default SenderParcels