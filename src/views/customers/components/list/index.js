import { getCustomers } from "api/customers"
import { useEffect, useState } from "react"
import BeatLoader from 'react-spinners/BeatLoader'

import CustomerInline from "./components/CustomerInline"

const CustomerList = () => {

  const [customers, setCustomers] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    setIsLoading(true)
    getCustomers()
    .then(res=>{
      setCustomers(res.data)
      setIsLoading(false)
    })
    .catch(err=>{
      console.log(err.response)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return (
      <div className="text-center p-24">
        <h1 className="p-4">Fetching customers</h1>
        <BeatLoader />
      </div>
    )
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-2 grid grid-cols-12 span-x-4 bg-gray-300">
        <div>ID</div>
        <div className="col-span-2">Code</div>
        <div className="col-span-3">Name</div>
      </div>
      <div>
        {customers.map((customer, idx) => (
          <CustomerInline key={customer.id} customer={customer} idx={idx} />
        ))}
      </div>
    </div>
  )
}

export default CustomerList