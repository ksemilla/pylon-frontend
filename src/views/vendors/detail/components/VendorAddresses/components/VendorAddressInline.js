import VendorAddressForm from "./VendorAddressForm"

const VendorAddressInline = ({ address }) => {

  const onSubmit = data => {
    console.log(data)
  }

  return (
    <div className="bg-white p-2 border border-gray-200 rounded-md">
      <VendorAddressForm initialValues={address} onSubmit={onSubmit} />
    </div>
  )
}

export default VendorAddressInline