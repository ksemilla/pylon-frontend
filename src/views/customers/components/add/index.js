import { createCustomer } from "api/customers"
import { useNavigate } from "react-router-dom"
import CustomerGeneralInfoForm from "../forms/CustomerGeneralInfoForm"

const CustomerAdd = () => {

  const navigate = useNavigate()

  const onSubmit = data => {
    createCustomer(data)
    .then(res=>{
      navigate(`/customers/${res.data.id}`, { customer: res.data })
    })
    .catch(res=>{
      console.log(res.response)
    })
  }

  return (
    <div className="bg-white p-2 border border-gray-200 rounded-md">
      <CustomerGeneralInfoForm onSubmit={onSubmit} />
    </div>
  )
}

export default CustomerAdd