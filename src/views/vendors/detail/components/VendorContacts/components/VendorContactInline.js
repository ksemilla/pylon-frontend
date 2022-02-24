import VendorContactForm from "./VendorContactForm"

const VendorContactInline = ({ contact }) => {

  const onSubmit = data => {
    console.log(data)
  }

  return (
    <div className="bg-white p-2 border border-gray-200 rounded-md">
      <VendorContactForm initialValues={contact} onSubmit={onSubmit} />
    </div>
  )
}

export default VendorContactInline