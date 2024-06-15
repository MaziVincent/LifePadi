import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import Layout from './components/Layout'
import AdminLayout from './components/admin/AdminLayout'
import Overview from './components/admin/OverView'
import AdminService from './components/admin/services/AdminService'
import AdminServiceDetails from './components/admin/services/AdminServiceDetails'
import AdminCategory from './components/admin/categories/AdminCategory'
import AdminRider from './components/admin/riders/AdminRider'
import AdminRiderDetails from './components/admin/riders/AdminRiderDetails'
import AdminCustomer from './components/admin/users/AdminCustomer'
import AdminVendor from './components/admin/vendors/AdminVendor'
import AdminOrderDetails from './components/admin/AdminOrderDetails'
import AdminCategoryDetails from './components/admin/categories/AdminCategoryDetail'


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
        <Route path='/admin/service/:id' element={<AdminServiceDetails />} />
        <Route path='/admin/category' element={<AdminCategory />} />
        <Route path='/admin/category/:id' element={<AdminCategoryDetails />} />
        <Route path='/admin/rider' element={<AdminRider />} />
        <Route path='/admin/rider/:id' element={<AdminRiderDetails />} />
        <Route path='/admin/customer' element={<AdminCustomer />} />
        <Route path='/admin/vendor' element={<AdminVendor />} />
        <Route path='/admin/order/:id' element={<AdminOrderDetails />} />

      </Route>
    </Routes>
      
    </QueryClientProvider>
  )
}

export default App
