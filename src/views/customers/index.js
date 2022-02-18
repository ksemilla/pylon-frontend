import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

// const tabs = [
//   { label: "Customers", to: "/customers" },
//   { label: "Add", to: "/customers/add" }
// ]

const tabs = [
  { label: 'Customers', to: '/customers', val: "" },
  { label: 'Add', to: '/customers/add', val: "add" },
]

const Customers = () => {

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
          {/* <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Select a tab
            </label>
            <select
              id="tabs"
              name="tabs"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              defaultValue={tabs.find((tab) => tab.current).name}
            >
              {tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div> */}
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

export default observer(Customers)