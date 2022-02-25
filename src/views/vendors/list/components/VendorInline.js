import { Link } from "react-router-dom"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const VendorInline = ({ vendor, idx }) => {
  return (
    <Link to={`/vendors/${vendor.id}`} state={{ vendor }}>
      <div className={classNames(
        "block p-2 cursor-pointer hover:bg-gray-200 hover:text-blue-600 grid grid-cols-12 span-x-4",
        idx % 2 === 0 ? "bg-white" : "bg-gray-100"
      )}>
        <div>{vendor.id}</div>
        <div className="col-span-1">{vendor.code}</div>
        <div className="col-span-3">{vendor.name}</div>
      </div>
    </Link>
  )
}

export default VendorInline