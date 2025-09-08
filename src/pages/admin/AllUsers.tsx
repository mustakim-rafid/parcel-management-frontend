import { UniversalSkeleton } from '@/components/layout/Skeleton'
import UserTable from '@/components/modules/admin/UserTable'
import { useGetAllUsersQuery } from '@/redux/features/auth/auth.api'
import type { IShowUser } from '@/types/auth'

const AllUsers = () => {
    const { data: users, isLoading } = useGetAllUsersQuery(undefined)

    if (isLoading) {
      return <UniversalSkeleton />
    }
  
    return (
      <div className="grid md:grid-cols-2 gap-10 md:gap-x-0 m-5">
        {
          users?.data.map((item: IShowUser) => (
            <div key={item._id}>
              <UserTable tableItems={{...item}} />
            </div>
          ))
        }    
      </div>
    )
}

export default AllUsers