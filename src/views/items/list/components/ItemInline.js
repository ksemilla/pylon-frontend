import { Link } from "react-router-dom"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const typer = item => {
  if (item.type === "d") {
    return "documents"
  } else if (item.type === "s") {
    return "stocks"
  } else if (item.type === "l") {
    return "labors"
  } else if (item.type === "a") {
    return "assembly"
  }
  return ""
}

const ItemInline = ({ item, idx }) => {

  const type = typer(item)

  return (
    <Link to={`/items/${type}/${item.id}`} state={{ item }}>
      <div className={classNames(
        "block p-2 cursor-pointer hover:bg-gray-200 grid grid-cols-12 span-x-4",
        idx % 2 === 0 ? "bg-white" : "bg-gray-100"
      )}>
        <div>{item.id}</div>
        <div className="col-span-3 flex items-center gap-x-2">
          <div className={classNames(
              "font-medium text-xs text-white px-1 rounded-sm",
              // item.type === "a" ? "bg-red-600" : item.type === "l" ? "bg-yellow-600" : item.type === "d" ? "bg-green-600": "bg-blue-600",
              "bg-gray-500"
            )}>{item.type.toUpperCase()}</div>
          <div>{item.part_number}</div>
        </div>
        <div className="col-span-3">{item.name}</div>
        <div className="col-span-3">{item.description}</div>
      </div>
    </Link>
  )
}

export default ItemInline