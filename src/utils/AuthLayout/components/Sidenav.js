import { FaAlignJustify } from "react-icons/fa"
import { Link } from "react-router-dom"

const elements = [
  {
    label: "Dashboard",
    icon: FaAlignJustify,
    path: "/"
  },
  {
    label: "Quotations",
    icon: FaAlignJustify,
    path: "/quotations"
  }
]

const Sidenav = () => {
  return (
    <div className="w-2/12 relative">
      <div className="sticky -top-0 -left-0 right-0 bot-0 border border-gray-100">
        {elements.map((element, idx) => (
          <Link to={element.path} key={element.label}>
            <div key={idx} className="cursor-pointer hover:bg-gray-100 p-2 items-center grid grid-cols-12">
              <element.icon />
              {element.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Sidenav