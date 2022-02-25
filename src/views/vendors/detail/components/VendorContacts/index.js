import { useEffect, useState } from "react"
import { useVendor } from "../.."
import { v4 as uuidv4 } from 'uuid';
import VendorContactInline from "./components/VendorContactInline";

const VendorContacts = () => {

  const { vendor } = useVendor()

  const [contacts, setContacts] = useState([])

  useEffect(()=>{
    setContacts(vendor ? vendor.contacts.map(contact => ({...contact, uuid: uuidv4()})) : [])
  }, [vendor])

  const onAppendContact = (e) => {
    e.preventDefault()
    setContacts(prevState => ([
      ...prevState,
      {
        uuid: uuidv4()
      }
    ]))
  }

  const setContact = data => {
    setContacts(prevState => prevState.map((address)=>{
      if (data.uuid === address.uuid) {
        return data
      } else {
        return address
      }
    }))
  }

  return (
    <div className="grid grid-cols-1 gap-y-2">
      {contacts.map((contact, idx) => {
        return (
          <VendorContactInline key={contact.uuid} contact={contact} setContact={setContact} />
        )
      })}
      <div>
        <button
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={onAppendContact}
        >
          Add contact
        </button>
      </div>
    </div>
  )
}

export default VendorContacts