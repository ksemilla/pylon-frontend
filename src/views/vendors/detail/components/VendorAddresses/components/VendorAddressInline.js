import VendorAddressForm from "./VendorAddressForm"

import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import { Switch } from '@headlessui/react'
import { createVendorAddress, updateVendorAddress } from "api/vendors"
import { useParams } from "react-router-dom"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const VendorAddressInline = ({ address, setAsPrimary, setAddress }) => {

  const { id } = useParams()
  const [open, setOpen] = useState(false)
  const [enabled, setEnabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const cancelButtonRef = useRef(null)

  const onDelete = (e) => {
    e.preventDefault()
    setOpen(false)
    // deleteVendor(vendor?.id)
    // .then(()=>{
    //   navigate('/vendors')
    // })
    // .catch(res=>{
    //   console.log(res.response)
    // })
  }

  const onSubmit = data => {
    setIsLoading(true)
    if (address.id) {
      updateVendorAddress(id, address.id, data)
      .then(res=>{
        setAddress({...res.data, uuid: address.uuid})
        setIsLoading(false)
      })
      .catch(res=>{
        console.log(res.response)
        setIsLoading(false)
      })
    } else {
      createVendorAddress(id, data)
      .then(res=>{
        setAddress({...res.data, uuid: address.uuid})
        setIsLoading(false)
      })
      .catch(res=>{
        console.log(res.response)
        setIsLoading(false)
      })
    }
  }

  useEffect(()=>{
    if (address.is_primary) {
      setEnabled(true)
    } else {
      setEnabled(false)
    }
  }, [address])

  const onSetAsPrimary = val => {
    setEnabled(val)
    if (val && address.id) {
      setAsPrimary(address.uuid)
      updateVendorAddress(id, address.id, {...address, is_primary: true})
    }
  }

  return (
    <div className="divide-y divide-gray-200 bg-white border border-gray-200 rounded-md">
      <div className="flex justify-between items-center p-2">
        <div className="flex items-center space-x-2">
          <h1 className="text-gray-600 font-bold">{address.id ? `ID ${address.id}` : ""}</h1>
          <Switch
            checked={enabled}
            onChange={onSetAsPrimary}
            className={classNames(
              enabled ? 'bg-indigo-600' : 'bg-gray-200',
              'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            )}
          >
            <span className="sr-only">Is primary</span>
            <span
              aria-hidden="true"
              className={classNames(
                enabled ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
              )}
            />
          </Switch>
          <span>Is primary?</span>
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          onClick={()=>setOpen(true)}
        >Delete</button>
      </div>
      <div className="p-2">
        <VendorAddressForm initialValues={address} onSubmit={onSubmit} isLoading={isLoading} />
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Delete address {address?.id}?
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this address? <br/><br />
                        Code: <span className="font-medium text-gray-700">{address?.code}</span> <br/>
                        Name: <span className="font-medium text-gray-700">{address?.name}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={onDelete}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

    </div>
  )
}

export default VendorAddressInline