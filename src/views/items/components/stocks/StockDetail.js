import { fetchStock } from "api/items"
import { useEffect, useState } from "react"
import { Link, Outlet, useLocation, useOutletContext, useParams } from "react-router-dom"

const navigation = [
  {
    label: "General Info",
    value: "",
    to: ""
  },
  {
    label: "Vendors",
    value: "vendors",
    to: "vendors"
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function useStock() {
  return useOutletContext();
}

const StockDetail = () => {

  const location = useLocation()
  const { id } = useParams()
  const [stock, setStock] = useState()
  const [view, setView] = useState("")

  useEffect(()=>{
    fetchStock(id)
    .then(res=>{
      setStock(res.data)
    })
    .catch(res=>{
      console.log(res.response)
    })
  }, [id])

  useEffect(()=>{
    const locationParts = location.pathname.split("/", 5)
    if (locationParts.length === 5) {
      if (locationParts[4] === "vendors") {
        setView("vendors")
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
              view === item.value && "bg-white text-blue-500"
            )}>
              {item.label}
            </div>
          </Link>
        ))}
      </div>
      <div className="col-span-10">
        <Outlet context={{ stock }}/>
      </div>
    </div> 
  )
}

export default StockDetail