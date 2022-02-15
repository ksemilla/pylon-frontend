import { Link } from "react-router-dom"

const QuotationInline = ({ quotation }) => {
  return (
      <Link to={`/quotations/${quotation.id}`} className="block p-2 cursor-pointer hover:bg-gray-200">
        {quotation.id}
      </Link>
  )
}

export default QuotationInline