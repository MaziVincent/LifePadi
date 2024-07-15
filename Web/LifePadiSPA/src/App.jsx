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
import AdminCustomerDetails from './components/admin/users/AdminCustomerDetails'
import AdminVendorCategory from './components/admin/vendors/AdminVendorCategory'
import AdminVendorCategoryDetails from './components/admin/vendors/AdminVendorCategoryDetails'
import AdminVendorDetails from './components/admin/vendors/vendor/AdminVendorDetails'
import AdminOrderDetails from './components/admin/AdminOrderDetails'
import AdminCategoryDetails from './components/admin/categories/AdminCategoryDetail'
import AdminProduct from './components/admin/vendors/product/AdminProduct'
import RiderLayout from './components/rider/RiderLayout'
import RiderdDashboard from './components/rider/RiderDashboard'
import AdminVoucher from './components/admin/vouchers/AdminVoucher'
import Admin from './components/admin/admins/Admin'
import Home from './components/home/Home'
import Page404 from './components/Page404'


function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
    <Routes>
      {/*PIBLIC ROUTES */}
      <Route path='/' element={<Layout />} >
      <Route index element={<Home />} />
      </Route>





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
        <Route path='/admin/customer/:id' element={<AdminCustomerDetails />} />
        <Route path='/admin/vendorcategory' element={<AdminVendorCategory />} />
        <Route path='/admin/vendorcategory/:id' element={<AdminVendorCategoryDetails />} />
        <Route path='/admin/vendor/:id' element={<AdminVendorDetails />} />
        <Route path='/admin/product/:id' element={<AdminProduct />} />

        <Route path='/admin/order/:id' element={<AdminOrderDetails />} />
        <Route path='/admin/voucher' element={<AdminVoucher />} />
        <Route path='/admin/admin' element={<Admin />} />

      </Route>
      <Route path='/rider' element={<RiderLayout />}>
        <Route index element={<RiderdDashboard />} />
      </Route>



      <Route path='*' element={<Page404 />} />
    </Routes>
      
    </QueryClientProvider>
  )
}

export default App
