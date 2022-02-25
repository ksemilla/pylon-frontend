import { createVendor } from "api/vendors"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import VendorForm from "../forms/VendorForm"

const VendorAdd = () => {

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = data => {
    setIsLoading(true)
    createVendor(data)
    .then(res=>{
      setIsLoading(false)
      navigate(`/vendors/${res.data.id}/`, { state: { vendor: res.data } })
    })
    .catch(res=>{
      setIsLoading(false)
      console.log(res.response)
    })
  }

  return (
    <div className="bg-white border border-gray-200 rounded-md p-2">
      <VendorForm onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  )
}

export default VendorAdd