import { getVendors } from "api/vendors"
import { useEffect, useState } from "react"

import VendorInline from "./components/VendorInline"

const VendorList = () => {

  const [vendors, setVendors] = useState([])

  useEffect(()=>{
    getVendors()
    .then(res=>{
      setVendors(res.data)
    })
    .catch(err=>{
      console.log(err.response)
    })
  }, [])

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