import { fectchQuotation, updateQuotation, createQuotation } from "api/quotations"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import QuotationForm from "../form/index"

const QuotationAdd = () => {

  const onSubmit = (data) => {
    console.log(data)
    createQuotation(data)
    .then(res=>{
      console.log(res)
    })
    .catch(res=>{
      console.log(res.response)
    })
  }

  return (
    <div>
      <QuotationForm onSubmit={onSubmit} />
    </div>
  )
}
export default QuotationAdd