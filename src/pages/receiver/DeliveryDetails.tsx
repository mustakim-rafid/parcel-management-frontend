import DeliveryDetailsTable from "@/components/modules/receiver/DeliveryDetailsTable"
import { useGetAllReceiverParcelsQuery } from "@/redux/features/parcel/parcel.api"

const DeliveryDetails = () => {
    const { data: allParcels } = useGetAllReceiverParcelsQuery(undefined)

    console.log(allParcels?.data)

  return (
     <div className="grid md:grid-cols-2 gap-10 md:gap-x-0 m-5">
        {
        allParcels?.data.map((item: any) => (
            <div key={item._id}>
            <DeliveryDetailsTable tableItems={{
                from: item.senderEmail?.email,
                type: item.type,
                location: item.presentStatus.location,
                note: item.presentStatus.note,
                time: item.presentStatus.timestamp,
                status: item.presentStatus.status
            }} />
            </div>
        ))
        }    
    </div>
  )
}

export default DeliveryDetails