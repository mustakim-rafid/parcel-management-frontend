import { LoginForm } from "@/components/modules/auth/LoginForm"
import { useGetUserQuery } from "@/redux/features/auth/auth.api"
import { Navigate } from "react-router"

const Login = () => {
  const {data: userData, isLoading} = useGetUserQuery(undefined)

  if (userData?.data?.email) {
    return <Navigate to={"/"} />
  }

  if (isLoading) return null

  return (
    <div className="min-h-screen flex justify-center items-center">
      <LoginForm className="lg:w-1/3 md:w-1/2 w-full mx-5" />
    </div>
  )
}

export default Login