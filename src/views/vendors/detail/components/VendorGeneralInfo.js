import { updateVendor } from "api/vendors"
import { useVendor } from ".."
import VendorForm from "./VendorForm"

const VendorGeneralInfo = () => {

  const { vendor } = useVendor()

  const onSubmit = data => {
    console.log(data)
    updateVendor(vendor?.id, data)
    .then(res=>{
      console.log(res.data)
    })
    .catch(res=>{
      console.log(res.response)
    })
  }

  return (
    <div className="bg-white p-2 border border-gray-200 rounded-md">
      <VendorForm initialValues={vendor} onSubmit={onSubmit} />
    </div>
  )
}

export default VendorGeneralInfo