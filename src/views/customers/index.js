import { observer } from "mobx-react-lite"
import { Link, Outlet } from "react-router-dom"

const Customers = () => {

  return (
    <div className="bg-white p-2 border border-gray-200 rounded-md">
      <div className="space-x-8">
        <Link to={"/customers"}>Customers</Link>
        <Link to={"/customers/add"}>add</Link>
      </div>
      <Outlet />
    </div>
  )
}

export default observer(Customers)