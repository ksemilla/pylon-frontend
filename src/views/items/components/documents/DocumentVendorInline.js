import { createDocumentVendor, updateDocumentVendor } from "api/items"
import { useParams } from "react-router-dom"
import DocumentVendorForm from "./DocumentVendorForm"

const DocumentVendorInline = ({ vendor }) => {

  const { id } = useParams()

  const onSubmit = data => {
    if (vendor.id) {
      updateDocumentVendor(id, vendor.id, data)
      .then(res=>{
        console.log(res.data)
      })
      .catch(err=>{
        console.log(err.response)
      })
    } else {
      createDocumentVendor(id, data)
      .then(res=>{
        console.log(res.data)
      })
      .catch(err=>{
        console.log(err.response)
      })
    }
  }

  return (
    <div className="bg-white p-2 border border-gray-200 rounded-md">
      <DocumentVendorForm initialValues={vendor} onSubmit={onSubmit} />
    </div>
  )
}

export default DocumentVendorInline