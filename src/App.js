import { Route, Routes, useNavigate } from 'react-router-dom'

import Login from "views/login"

import AuthLayout from 'utils/AuthLayout';
import Home from 'views/home';

import Quotations from 'views/quotations'
import QuotationAdd from 'views/quotations/components/add';
import QuotationList from 'views/quotations/list';
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

import { useAuthContext } from 'stores/auth';
import { useEffect, useState } from 'react';
import { verify } from 'api/auth';
import { getInventory } from 'api/items';
import { useCommonContext } from 'stores/common';

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

        </Route>

      </Route>
    </Routes>
  );
}

export default App;
