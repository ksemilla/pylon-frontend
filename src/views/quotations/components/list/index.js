import { getQuotations } from "api/quotations"
import { useEffect, useState } from "react"

import QuotationInline from "./components/QuotationInline"

const QuotationList = () => {

  const [quotations, setQuotations] = useState([])

  useEffect(()=>{
    let isMounted = true
    getQuotations()
    .then(res=>{
      if (isMounted) setQuotations(res.data)
    })
    .catch(err=>{
      console.log(err.response)
    })
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-2 grid grid-cols-12 span-x-4 bg-gray-300">
        <div>ID</div>
        <div className="col-span-3">Name</div>
      </div>
      <div>
        {quotations.map((quotation, idx) => (
          <QuotationInline key={quotation.id} quotation={quotation} idx={idx} />
        ))}
        </div>
    </div>
  )
}

export default QuotationList