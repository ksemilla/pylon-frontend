import { observer } from "mobx-react-lite"
import { Navigate, Outlet } from "react-router-dom"

import Sidenav from "./components/Sidenav"

const { useAuthContext } = require("stores/auth")

const AuthLayout = () => {
  const authContext = useAuthContext()

  if (authContext.isLogged) {
    return (
      <div className="h-full flex">
        <Sidenav />
        <div className="flex-1 p-4 bg-gray-100 h-full overflow-auto">
          <Outlet />
        </div>
      </div>
    )
  } else {
    return <Navigate to={"/login"} replace />
  }
}

export default observer(AuthLayout)