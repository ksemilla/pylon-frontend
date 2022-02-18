import CustomerContactForm from "./CustomerContactForm"

const CustomerContactInline = ({ contact }) => {
  return (
    <div className="bg-white p-2 border border-gray-200 rounded-md">
      <CustomerContactForm initialValues={contact} /> 
    </div>
  )
}

export default CustomerContactInline