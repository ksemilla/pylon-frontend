import { useEffect, useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const tabs = [
  { label: 'Vendors', to: '/vendors', val: "" },
  { label: 'Add', to: '/vendors/add', val: "add" },
]

const Vendors = () => {

  const location = useLocation()

  const [view, setView] = useState("")

  useEffect(()=>{
    const param = location.pathname.split("/", 3)[2]
    if (param === "add") {
      setView("add")
    } else if (param === undefined) {
      setView("")
    } else {
      setView(null)
    }
  }, [location.pathname])

  return (
    <div className="grid grid-cols-1 gap-y-2 ">
      <div className="col-span-1 space-x-8 bg-white p-2 border border-gray-200 rounded-md">
        <div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {tabs.map((tab) => (
                  <Link
                    key={tab.val}
                    to={tab.to}
                    className={classNames(
                      tab.val === view
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                      'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                    )}
                  >
                    {tab.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default Vendors