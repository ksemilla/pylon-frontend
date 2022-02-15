import { Route, Routes, useNavigate } from 'react-router-dom'

import Login from "views/login"

import AuthLayout from 'utils/AuthLayout';
import Home from 'views/home';

import Quotations from 'views/quotations'
import QuotationAdd from 'views/quotations/components/add';
import QuotationList from 'views/quotations/list';
import QuotationDetail from 'views/quotations/components/detail';
import QuotationEdit from 'views/quotations/components/edit';

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
  }, [token, authContext, navigate])

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
      </Route>
    </Routes>
  );
}

export default App;
