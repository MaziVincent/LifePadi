import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import Layout from './components/Layout'
import AdminLayout from './components/admin/AdminLayout'
import Overview from './components/admin/OverView'
import AdminService from './components/admin/services/AdminService'
import AdminCategory from './components/admin/categories/AdminCategory'
import AdminRider from './components/admin/riders/AdminRider'
import AdminCustomer from './components/admin/users/AdminCustomer'
import AdminVendor from './components/admin/vendors/AdminVendor'
import AdminOrderDetails from './components/admin/AdminOrderDetails'


function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
    <Routes>
      {/*PIBLIC ROUTES */}
      <Route path='/' element={<Layout />} />





      {/*PROTECTED ROUTES ADMIN */}
      <Route path='/admin' element={<AdminLayout />} >
        <Route index element={<Overview />} />
        <Route path='/admin/service' element={<AdminService />} />
        <Route path='/admin/category' element={<AdminCategory />} />
        <Route path='/admin/rider' element={<AdminRider />} />
        <Route path='/admin/customer' element={<AdminCustomer />} />
        <Route path='/admin/vendor' element={<AdminVendor />} />
        <Route path='/admin/order/:id' element={<AdminOrderDetails />} />

      </Route>
    </Routes>
      
    </QueryClientProvider>
  )
}

export default App
