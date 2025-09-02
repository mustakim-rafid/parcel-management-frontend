import { RegisterForm } from "@/components/modules/auth/RegisterForm"
import { useGetUserQuery } from "@/redux/features/auth/auth.api"
import { Navigate } from "react-router"

const Register = () => {
  const {data: userData, isLoading} = useGetUserQuery(undefined)

  if (userData?.data?.email) {
    return <Navigate to={"/"} />
  }

  if (isLoading) return null

  return (
    <div className="min-h-screen flex justify-center items-center m-5">
      <RegisterForm className="lg:w-1/3" />
    </div>
  )
}

export default Register