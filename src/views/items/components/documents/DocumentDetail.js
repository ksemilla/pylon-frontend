import { fetchDocument } from "api/items"
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

export function useDocument() {
  return useOutletContext();
}

const DocumentDetail = () => {

  const location = useLocation()
  const { id } = useParams()
  const [document, setDocument] = useState()
  const [view, setView] = useState("")

  useEffect(()=>{
    fetchDocument(id)
    .then(res=>{
      console.log("got here")
      setDocument(res.data)
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
        <Outlet context={{ document }}/>
      </div>
    </div> 
  )
}

export default DocumentDetail