import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDocument } from "./DocumentDetail"
import DocumentVendorInline from './DocumentVendorInline';

const DocumentVendors = () => {
  
  const { document } = useDocument()

  const [vendors, setVendors] = useState(document ? document.vendors.map(vendor => ({...vendor, uuid: uuidv4()})) : [])

  const onVendorAdd = e => {
    e.preventDefault()
    setVendors(prevState => ([
      ...prevState,
      {
        uuid: uuidv4()
      }
    ]))
  }

  useEffect(()=>{
    // setVendors(document.vendors.map(vendor => ({...vendor, uuid: uuidv4()})))
    if (document) {
      setVendors(document.vendors.map(vendor => ({...vendor, uuid: uuidv4()})))
    }
  }, [document])

  return (
    <div className='grid grid-cols-1 gap-y-2'>
      {vendors.map((vendor, idx) => {
        return <DocumentVendorInline key={vendor.uuid} vendor={vendor} />
      })}

      <div>
        <button
          onClick={onVendorAdd}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >Add vendor</button>
      </div>

    </div>
  )
}

export default DocumentVendors