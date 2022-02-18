import { getCustomers } from "api/customers"
import { useEffect, useState } from "react"

import CustomerInline from "./components/CustomerInline"

const CustomerList = () => {

  const [customers, setCustomers] = useState([])

  useEffect(()=>{
    getCustomers()
    .then(res=>{
      setCustomers(res.data)
    })
    .catch(err=>{
      console.log(err.response)
    })
  }, [])

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-2 grid grid-cols-12 span-x-4 bg-gray-300">
        <div>ID</div>
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