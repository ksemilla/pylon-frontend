import { Link } from "react-router-dom"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const QuotationInline = ({ quotation, idx }) => {
  return (
      <Link to={`/quotations/${quotation.id}`} className={classNames(
        "block p-2 cursor-pointer hover:bg-gray-200 grid grid-cols-12 span-x-4",
        idx % 2 === 0 ? "bg-white" : "bg-gray-100"
      )}>
        {quotation.id}
      </Link>
  )
}

export default QuotationInline