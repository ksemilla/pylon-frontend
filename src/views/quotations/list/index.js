import { getQuotations } from "api/quotations"
import { useEffect, useState } from "react"

import QuotationInline from "./components/QuotationInline"

const QuotationList = () => {

  const [quotations, setQuotations] = useState([])

  useEffect(()=>{
    getQuotations()
    .then(res=>{
      setQuotations(res.data)
    })
    .catch(err=>{
      console.log(err.response)
    })
  }, [])

  return (
    <div>
      quotation list
      {quotations.map((quotation) => (
        <QuotationInline key={quotation.id} quotation={quotation} />
      ))}
    </div>
  )
}

export default QuotationList