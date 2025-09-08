import { UniversalSkeleton } from '@/components/layout/Skeleton'
import ParcelTable from '@/components/modules/admin/ParcelTable'
import { useGetAllParcelsQuery } from '@/redux/features/parcel/parcel.api'
import type { IParcel } from '@/types/parcel'

const AllParcels = () => {
    const {data: allParcels, isLoading} = useGetAllParcelsQuery(undefined)

    if (isLoading) {
      return <UniversalSkeleton />
    }
  
    return (
      <div className="grid md:grid-cols-2 gap-10 md:gap-x-0 m-5">
        {
          allParcels?.data.map((item: IParcel) => (
            <div key={item._id}>
              <ParcelTable tableItems={{...item}} />
            </div>
          ))
        }    
      </div>
    )
}

export default AllParcels