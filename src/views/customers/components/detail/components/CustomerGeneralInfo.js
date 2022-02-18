import { updateCustomer } from "api/customers"
import { useState } from "react"
import { useCustomer } from ".."
import CustomerGeneralInfoForm from "../../forms/CustomerGeneralInfoForm"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const CustomerGeneralInfo = () => {

  const { customer } = useCustomer()
  const [disabled, setDisabled] = useState(true)

  const onSubmit = data => {
    updateCustomer(data)
    .then(res=>{
      console.log(res)
    })
    .catch(res=>{
      console.log(res.response)
    })
  }

  return (
    <div className="bg-white p-2 border border-gray-200 rounded-md">
      <div onClick={()=>setDisabled(!disabled)} className={classNames(
        "cursor-pointer",
        disabled ? "text-gray-500" : "text-blue-500"
      )}>
        Edit
      </div>
      <CustomerGeneralInfoForm initialValues={customer} onSubmit={onSubmit} disabled={disabled} />
    </div>
  )
}

export default CustomerGeneralInfo