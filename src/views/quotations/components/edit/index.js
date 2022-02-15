import { fectchQuotation, updateQuotation } from "api/quotations"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import QuotationForm from "../form/index"

const QuotationEdit = () => {

  const { id } = useParams()
  const [quotation, setQuotation] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    fectchQuotation(id)
    .then(res=>{
      setQuotation(res.data)
      setLoading(false)
    })
    .catch(err=>{
      console.log(err.response)
      setLoading(false)
    })
  }, [id])

  const onSubmit = (data) => {
    console.log(data)
    updateQuotation(data)
    .then(res=>{
      console.log(res)
    })
    .catch(res=>{
      console.log(res.response)
    })
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <QuotationForm initialValues={quotation} onSubmit={onSubmit} />
    </div>
  )
}
export default QuotationEdit