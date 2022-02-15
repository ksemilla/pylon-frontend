import { useForm, FormProvider } from "react-hook-form"
import dayjs from "dayjs"

import QuotationItemFieldArray from "./components/QuotationItemsFieldArray"
import { useEffect, useState } from "react"

const QuotationForm = ({ initialValues, onSubmit }) => {

  const { register, handleSubmit, control, watch, setValue, getValues } = useForm({
    defaultValues: initialValues ? {
      ...initialValues,
      created:  dayjs(initialValues.created).format("YYYY-MM-DDTHH:mm"),
      valid_until: dayjs(initialValues.valid_until).format("YYYY-MM-DDTHH:mm"),
    } : {
      created: dayjs().format("YYYY-MM-DDTHH:mm"),
      valid_until: dayjs().add(3, 'day').format("YYYY-MM-DDTHH:mm"),
    }
  })

  const [showInvoiceTo, setShowInvoiceTo] = useState(true)
  const [showDeliveryTo, setShowDeliveryTo] = useState(true)

  const addresses = watch('customer_detail.addresses')

  const submit = handleSubmit((data)=>{
    onSubmit(data)
  })

  return (
    <FormProvider register={register} >
      <form onSubmit={submit}  className="p-2 space-y-8 divide-y divide-gray-200" >
        <div className="grid grid-cols-6 gap-y-2 gap-x-2">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Customer</label>
            <input
              type="text"
              {...register("customer")}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Date Created</label>
            <input
              disabled
              type="datetime-local"
              {...register("created")}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Valid Until</label>
            <input
              type="datetime-local"
              {...register("valid_until")}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <select
              defaultValue=""
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
            >
              <option disabled value="">Select address</option>
              {addresses?.map((address, idx)=>(
                <option key={address.id}>test</option>
              ))}
            </select>
          </div>
          <div className="col-span-3">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              {...register("address")}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
            />
          </div>
        </div>

        <div className="pt-8 space-y-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900 cursor-pointer" onClick={()=>setShowInvoiceTo(!showInvoiceTo)}>Invoice to</h3>
          {showInvoiceTo && <div className="grid grid-cols-6 gap-y-2 gap-x-2">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Line 1</label>
              <input
                type="text"
                {...register("invoice_to.address1")}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Line 2</label>
              <input
                type="text"
                {...register("invoice_to.address2")}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                {...register("invoice_to.city")}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">State</label>
              <input
                type="text"
                {...register("invoice_to.State")}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <input
                type="text"
                {...register("invoice_to.Country")}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">Postal</label>
              <input
                type="text"
                {...register("invoice_to.postal_code")}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
              />
            </div>
          </div>}
        </div>

        <div className="pt-8 space-y-4">
          <div className="flex items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mr-4 cursor-pointer" onClick={()=>setShowDeliveryTo(!showDeliveryTo)}>Delivery to</h3>
            <input type="checkbox" className="mr-2"/>
            <h5>Same as invoice to</h5>
          </div>
          {showDeliveryTo &&  <div className="grid grid-cols-6 gap-y-2 gap-x-2 mb-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Line 1</label>
              <input
                type="text"
                {...register("delivery_to.address1")}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Line 2</label>
              <input
                type="text"
                {...register("delivery_to.address2")}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                {...register("delivery_to.city")}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">State</label>
              <input
                type="text"
                {...register("delivery_to.State")}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <input
                type="text"
                {...register("delivery_to.Country")}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">Postal</label>
              <input
                type="text"
                {...register("delivery_to.postal_code")}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
              />
            </div>
          </div>}
        </div>

        <div>
          <QuotationItemFieldArray {...{ control, register, watch, setValue, getValues }}/>
        </div>

        <button
          type="submit"
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >Submit</button>
      </form>
    </FormProvider>
  )
}

export default QuotationForm