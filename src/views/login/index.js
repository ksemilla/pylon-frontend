import { useNavigate } from "react-router-dom"
import { useAuthContext } from "stores/auth"

import LoginForm from "./components/LoginForm"
import { login } from "api/auth"
import { useEffect } from "react"

const Login = () => {

  const authContext = useAuthContext()
  const navigate = useNavigate()

  useEffect(()=>{
    if (authContext.isLogged) {
      navigate("/")
    }
  }, [authContext.isLogged])

  const onSubmit = data => {
    login(data)
    .then(res=>{
      localStorage.setItem('access', res.data.access)
      authContext.setIsLogged(true)
      navigate("/")
    })
    .catch(err=>{
      console.log(err)
    })
  }

  return (
    <div className="bg-gray-100 h-full pt-24">
      <div className="m-auto w-72 bg-white p-8 border border-gray-200 rounded-md">
        <h1 className="text-center text-3xl font-medium py-4">Welcome back!</h1>
        <LoginForm onSubmit={onSubmit}/>
      </div>
    </div>
  )
}

export default Login