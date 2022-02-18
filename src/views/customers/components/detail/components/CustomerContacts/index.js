import { useEffect, useState } from "react"
import { useCustomer } from "../.."
import { v4 as uuidv4 } from 'uuid';
import CustomerContactInline from "./components/CustomerContactInline"

const CustomerContacts = () => {

  const { customer } = useCustomer()

  const [contacts, setCustomers] = useState([])

  useEffect(()=>{
    if (customer) {
      setCustomers(customer.contacts.map((address) => ({...address, uuid: uuidv4()})))
    }
  }, [customer])

  const onAddContact = e => {
    e.preventDefault()
    setCustomers(prevState => ([
      ...prevState,
      {
        uuid: uuidv4()
      }
    ]))
  }

  return (
    <div>
      <h1 className="font-medium text-2xl">{customer?.name} - {customer?.code}</h1>
      <div className="grid grid-cols-1 gap-y-2">
        {contacts?.map((contact, idx) => {
          return (
            <CustomerContactInline key={contact.uuid} contact={contact} />
          )
        })}
      </div>
      <div className="mt-2">
        <button
          onClick={onAddContact}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >Add New Contact</button>
      </div>
    </div>
  )
}

export default  CustomerContacts