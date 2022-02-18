import { fectchCustomer } from "api/customers"
import { useEffect, useState } from "react"
import { Link, Outlet, useLocation, useOutletContext, useParams } from "react-router-dom"

const navigation = [
  {
    label: "General Info",
    value: "",
    to: ""
  },
  {
    label: "Addresses",
    value: "addresses",
    to: "addresses"
  },
  {
    label: "Contacts",
    value: "contacts",
    to: "contacts"
  }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function useCustomer() {
  return useOutletContext();
}

const CustomerDetail = () => {

  const location = useLocation()
  const { id } = useParams()
  const [customer, setCustomer] = useState()
  const [view, setView] = useState("")

  useEffect(()=>{
    fectchCustomer(id)
    .then(res=>{
      setCustomer(res.data)
    })
    .catch(res=>{
      console.log(res.response)
    })
  }, [id])

  useEffect(()=>{
    const locationParts = location.pathname.split("/", 4)
    if (locationParts.length === 4) {
      if (locationParts[3] === "addresses") {
        setView("addresses")
      } else if (locationParts[3] === "contacts") {
        setView("contacts")
      }
    } else {
      setView("")
    }
  }, [location.pathname])

  return (
    <div className="col-span-12 grid grid-cols-12 gap-y-2 gap-x-2">
      <div className="col-span-2 flex flex-col gap-y-2">
        {navigation.map((item, idx) => (
          <Link to={item.to} key={idx}>
            <div className={classNames(
              "p-2 rounded-md text-center hover:bg-gray-200",
              view === item.value && "bg-white"
            )}>
              {item.label}
            </div>
          </Link>
        ))}
      </div>
      <div className="col-span-10">
        <Outlet context={{ customer }}/>
      </div>
    </div> 
  )
}

export default CustomerDetail