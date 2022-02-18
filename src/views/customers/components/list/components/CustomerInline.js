import { Link } from "react-router-dom"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const CustomerInline = ({ customer, idx }) => {
  return (
    <Link to={`/customers/${customer.id}`} >
      <div className={classNames(
        "block p-2 cursor-pointer hover:bg-gray-200 grid grid-cols-12 span-x-4",
        idx % 2 === 0 ? "bg-white" : "bg-gray-100"
      )}>
        <div>{customer.id}</div>
        <div className="col-span-3">{customer.name}</div>
      </div>
    </Link>
  )
}

export default CustomerInline