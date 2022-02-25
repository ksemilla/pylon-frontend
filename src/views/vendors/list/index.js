import { useEffect, useState } from "react"
import BeatLoader from 'react-spinners/BeatLoader'

import { getVendors } from "api/vendors"
import VendorInline from "./components/VendorInline"

const VendorList = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [vendors, setVendors] = useState([])

  useEffect(()=>{
    setIsLoading(true)
    getVendors()
    .then(res=>{
      setVendors(res.data)
      setIsLoading(false)
    })
    .catch(err=>{
      setIsLoading(false)
      console.log(err.response)
    })
  }, [])

  if (isLoading) {
    return (
      <div className="text-center p-24">
        <h1 className="p-4">Fetching vendors</h1>
        <BeatLoader />
      </div>
    )
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-2 grid grid-cols-12 span-x-4 bg-gray-300">
        <div>ID</div>
        <div className="col-span-1">Code</div>
        <div className="col-span-3">Name</div>
      </div>
      <div>
        {vendors.map((vendor, idx) => (
          <VendorInline key={vendor.id} vendor={vendor} idx={idx} />
        ))}
      </div>
    </div>
  )
}

export default VendorList