import { useEffect, useState } from "react"
import { 
  FaTabletAlt,
  FaBookOpen,
  FaBox,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"
import { useAuthContext } from "stores/auth"

const elements = [
  {
    label: "Dashboard",
    icon: FaTabletAlt,
    path: "/",
    value: ""
  },
  {
    label: "Quotations",
    icon: FaBookOpen,
    path: "/quotations",
    value: "quotations"
  },
  {
    label: "Items",
    icon: FaBox,
    path: "/items",
    value: "items"
  },
  {
    label: "Customers",
    icon: FaUsers,
    path: "/customers",
    value: "customers"
  },
  {
    label: "Vendors",
    icon: FaUsers,
    path: "/vendors",
    value: "vendors"
  }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Sidenav = () => {

  const authContext = useAuthContext()
  const location = useLocation()
  const [view, setView] = useState("")

  useEffect(()=>{
    const param = location.pathname.split("/", 2)[1]
    if (param === "quotations") {
      setView("quotations")
    } else if (param === "items") {
      setView("items")
    } else if (param === "customers") {
      setView("customers")
    } else if (param === "vendors") {
      setView("vendors")
    } else {
      setView("")
    }
  }, [location.pathname])

  return (
    <div className="w-2/12 relative flex flex-col border border-gray-200">
      <div className="h-full border-b border-gray-200">
        {elements.map((element, idx) => (
          <Link to={element.path} key={element.label}>
            <div key={idx} className={classNames(
              view === element.value ? "bg-gray-200 text-black" : "text-gray-600 hover:bg-gray-50 hover:text-black",
              "cursor-pointer items-center grid grid-cols-12 p-2 m-2 rounded-md",
            )}>
              <div className="col-span-2 justify-center flex">
                <element.icon />
              </div>
              {element.label}
            </div>
          </Link>
        ))}
      </div>
      <div className="cursor-pointer hover:bg-gray-100 p-2 items-center grid grid-cols-12" onClick={()=>authContext.logUserOut()}>
        <div className="col-span-2 justify-center flex">
          <FaSignOutAlt />
        </div>
        Logout
      </div>
    </div>
  )
}

export default Sidenav