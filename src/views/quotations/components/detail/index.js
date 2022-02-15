import { fectchQuotation } from "api/quotations"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

const QuotationDetail = () => {

  const { id } = useParams()
  const [quotation, setQuotation] = useState()

  useEffect(()=>{
    fectchQuotation(id)
    .then(res=>{
      setQuotation(res.data)
    })
    .catch(err=>{
      console.log(err.response)
    })
  }, [id])

  return (
    <div>
      <div>{quotation?.id}</div>
      <div>{quotation?.customer}</div>
      <Link to={`/quotations/${id}/edit`}>edit</Link>
    </div>
  )
}

export default QuotationDetail