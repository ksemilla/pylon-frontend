import { updateDocument } from "api/items"
import { useDocument } from "./DocumentDetail"

const { default: DocumentForm } = require("./DocumentForm")

const DocumentGeneralInfo = () => {

  const { document } = useDocument()

  const onSubmit = data => {
    updateDocument(document.id, data)
    .then(res=>{
      console.log(res.data)
    })
    .catch(res=>{
      console.log(res.response)
    })
  }

  return (
    <div className="bg-white p-2 border border-gray-200 rounded-md">
      <DocumentForm initialValues={document} onSubmit={onSubmit} />
    </div>
  )
}

export default DocumentGeneralInfo