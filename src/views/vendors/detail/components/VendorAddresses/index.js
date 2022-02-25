import { useEffect, useState } from "react"
import { useVendor } from "../.."
import { v4 as uuidv4 } from 'uuid';
import VendorAddressInline from "./components/VendorAddressInline";

const VendorAddresses = () => {

  const { vendor } = useVendor()

  const [addresses, setAddresses] = useState([])

  useEffect(()=>{
    setAddresses(vendor ? vendor.addresses.map(address => ({...address, uuid: uuidv4()})) : [])
  }, [vendor])

  const onAppendAddress = (e) => {
    e.preventDefault()
    setAddresses(prevState => ([
      ...prevState,
      {
        uuid: uuidv4()
      }
    ]))
  }

  const setAsPrimary = uuid => {
    setAddresses(prevState => prevState.map(address=>{
      if (uuid === address.uuid) {
        return {
          ...address,
          is_primary: true
        }
      } else {
        return {
          ...address,
          is_primary: false
        }
      }
    }))
  }

  const setAddress = data => {
    setAddresses(prevState => prevState.map((address)=>{
      if (data.uuid === address.uuid) {
        return data
      } else {
        return address
      }
    }))
  }

  return (
    <div className="grid grid-cols-1 gap-y-2">
      {addresses.map((address, idx) => {
        return (
          <VendorAddressInline key={address.uuid} address={address} setAsPrimary={setAsPrimary} setAddress={setAddress} />
        )
      })}
      <div>
        <button
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={onAppendAddress}
        >
          Add address
        </button>
      </div>
    </div>
  )
}

export default VendorAddresses