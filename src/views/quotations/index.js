import { observer } from "mobx-react-lite"
import { Link, Outlet } from "react-router-dom"

const elements = [
  {
    label: "Quotations",
    path: "/quotations"
  }
]

const Quotations = () => {

  return (
    <div className="bg-white p-2 border border-gray-200 rounded-md">
      <div className="space-x-8">
        <Link to={"/quotations"}>Quotations</Link>
        <Link to={"/quotations/add"}>add</Link>
      </div>
      <Outlet />
    </div>
  )
}

export default observer(Quotations)