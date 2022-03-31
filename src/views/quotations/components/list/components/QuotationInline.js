import { Link } from "react-router-dom"
import dayjs from "dayjs"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const QuotationInline = ({ quotation, idx }) => {

  let total = 0
  quotation.items.forEach(item => {
    total += item.quantity * item.sell_price
  })

  return (
      <Link to={`/quotations/${quotation.id}`} className={classNames(
        "block p-2 cursor-pointer hover:bg-gray-200 grid grid-cols-12 span-x-4",
        idx % 2 === 0 ? "bg-white" : "bg-gray-100"
      )}>
        <div>{quotation.id}</div>
        <div className="col-span-2">{quotation.customer_detail.code}</div>
        <div className="col-span-2">{(Math.round(total * 100) / 100).toFixed(2)}</div>
        <div className="col-span-2">{dayjs(quotation.valid_until).format("DD MMM YYYY")}</div>
        <div className="col-span-2">{quotation.created_by.email}</div>
      </Link>
  )
}

export default QuotationInline