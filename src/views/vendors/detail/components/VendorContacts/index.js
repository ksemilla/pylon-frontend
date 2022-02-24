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

  return (
    <div className="grid grid-cols-1 gap-y-2">
      {contacts.map((contact, idx) => {
        return (
          <VendorContactInline key={contact.uuid} contact={contact} />
        )
      })}
    </div>
  )
}

export default VendorContacts