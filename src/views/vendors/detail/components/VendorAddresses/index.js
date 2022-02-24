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

  return (
    <div className="grid grid-cols-1 gap-y-2">
      {addresses.map((address, idx) => {
        return (
          <VendorAddressInline key={address.uuid} address={address} />
        )
      })}
    </div>
  )
}

export default VendorAddresses