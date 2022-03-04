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
        <div className="col-span-2">{item.part_number}</div>
        <div className="col-span-3">{item.name}</div>
      </div>
    </Link>
  )
}

export default ItemInline