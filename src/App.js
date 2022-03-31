  // STAGING
import { Route, Routes, useNavigate } from 'react-router-dom'

import Login from "views/login"

import AuthLayout from 'utils/AuthLayout';
import Home from 'views/home';

import Quotations from 'views/quotations'
import QuotationAdd from 'views/quotations/components/add';
import QuotationList from 'views/quotations/components/list';
import QuotationDetail from 'views/quotations/components/detail';
import QuotationEdit from 'views/quotations/components/edit';

import Customers from 'views/customers'
import CustomerList from 'views/customers/components/list';
import CustomerDetail from 'views/customers/components/detail';
import CustomerAdd from 'views/customers/components/add';
import CustomerGeneralInfo from 'views/customers/components/detail/components/CustomerGeneralInfo'
import CustomerAddresses from 'views/customers/components/detail/components/CustomerAddresses';
import CustomerContacts from 'views/customers/components/detail/components/CustomerContacts';

import Items from 'views/items';
import ItemList from 'views/items/list';
import ItemAdd from 'views/items/add';
import ItemDetail from 'views/items/detail';

import Vendors from 'views/vendors';
import VendorList from 'views/vendors/list';
import VendorAdd from 'views/vendors/add';
import VendorDetail from 'views/vendors/detail';
import VendorGeneralInfo from 'views/vendors/detail/components/VendorGeneralInfo';
import VendorContacts from 'views/vendors/detail/components/VendorContacts';
import VendorAddresses from 'views/vendors/detail/components/VendorAddresses';

import DocumentDetail from 'views/items/components/documents/DocumentDetail';
import StockDetail from 'views/items/components/stocks/StockDetail';

import { useAuthContext } from 'stores/auth';
import { useEffect, useState } from 'react';
import { verify } from 'api/auth';
import { getInventory } from 'api/items';
import { useCommonContext } from 'stores/common';
import DocumentForm from 'views/items/components/documents/DocumentForm';
import DocumentVendors from 'views/items/components/documents/DocumentVendors';
import DocumentGeneralInfo from 'views/items/components/documents/DocumentGeneralInfo';
import { getVendors } from 'api/vendors';
import StockGeneralInfo from 'views/items/components/stocks/StockGeneralInfo';
import StockVendors from 'views/items/components/stocks/StockVendors';
import LaborDetail from 'views/items/components/labors/LaborDetail';
import LaborGeneralInfo from 'views/items/components/labors/LaborGeneralInfo';
import LaborVendors from 'views/items/components/labors/LaborVendors';
import AssemblyDetail from 'views/items/components/assemblys/AssemblyDetail';
import AssemblyGeneralInfo from 'views/items/components/assemblys/AssemblyGeneralInfo';
import AssemblyVendors from 'views/items/components/assemblys/AssemblyVendors';

function App() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const authContext = useAuthContext()
  const commonContext = useCommonContext()

  const token = localStorage.getItem("access")

  useEffect(()=>{
    if (token) {
      verify(token)
      .then(res=>{
        authContext.logUserIn({})
        setLoading(false)
      })
      .catch(err=>{
        setLoading(false)
      })
    } else {
      navigate("/login")
      setLoading(false)
    }
  }, [token, authContext.isLogged])

  useEffect(()=>{
    if (authContext.isLogged) {
      getInventory()
      .then(res=>{
        commonContext.setInventory(res.data)
      })
      .catch(err=>{
        console.log(err.response)
      })
      getVendors()
      .then(res=>{
        commonContext.setVendors(res.data)
      })
      .catch(res=>{
        console.log(res.response)
      })
    }
  }, [authContext.isLogged, commonContext])

  if (loading) {
    return <div>Loading app...</div>
  }

  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route  element={<AuthLayout />}>

        <Route path='/' element={<Home />} />

        <Route path='/quotations' element={<Quotations />}>
          <Route path='' element={<QuotationList />} />
          <Route path='add' element={<QuotationAdd />} />
          <Route path=':id' element={<QuotationDetail />} />
          <Route path=':id/edit' element={<QuotationEdit />} />
        </Route>

        <Route path='/customers' element={<Customers />}>
          <Route path='' element={<CustomerList />} />
          <Route path='add' element={<CustomerAdd />} />
          <Route path=':id' element={<CustomerDetail />}>
            <Route path='' element={<CustomerGeneralInfo />} />
            <Route path='addresses' element={<CustomerAddresses />} />
            <Route path='contacts' element={<CustomerContacts />} />
          </Route>
        </Route>

        <Route path='/items' element={<Items />}>
          <Route path='' element={<ItemList />} />
          <Route path='add' element={<ItemAdd />} />
          <Route path='documents'>
            <Route path=':id' element={<DocumentDetail />}>
              <Route path='' element={<DocumentGeneralInfo />} />
              <Route path='vendors' element={<DocumentVendors />} />
            </Route>
          </Route>
          <Route path='stocks'>
            <Route path=':id' element={<StockDetail />}>
              <Route path='' element={<StockGeneralInfo />} />
              <Route path='vendors' element={<StockVendors />} />
            </Route>
          </Route>
          <Route path='labors'>
            <Route path=':id' element={<LaborDetail />}>
              <Route path='' element={<LaborGeneralInfo />} />
              <Route path='vendors' element={<LaborVendors />} />
            </Route>
          </Route>
          <Route path='assembly'>
            <Route path=':id' element={<AssemblyDetail />}>
              <Route path='' element={<AssemblyGeneralInfo />} />
              <Route path='vendors' element={<AssemblyVendors />} />
            </Route>
          </Route>
          <Route path=':id' element={<ItemDetail />}>

          </Route>
        </Route>

        <Route path='/vendors' element={<Vendors />}>
          <Route path='' element={<VendorList />} />
          <Route path='add' element={<VendorAdd />} />
          <Route path=':id' element={<VendorDetail />}>
            <Route path='' element={<VendorGeneralInfo />} />
            <Route path='addresses' element={<VendorAddresses />} />
            <Route path='contacts' element={<VendorContacts />} />
          </Route>
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
