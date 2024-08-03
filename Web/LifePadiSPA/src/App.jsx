<<<<<<< HEAD
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "./components/Layout";
import AdminLayout from "./components/admin/AdminLayout";
import Overview from "./components/admin/OverView";
import AdminService from "./components/admin/services/AdminService";
import AdminServiceDetails from "./components/admin/services/AdminServiceDetails";
import AdminCategory from "./components/admin/categories/AdminCategory";
import AdminRider from "./components/admin/riders/AdminRider";
import AdminRiderDetails from "./components/admin/riders/AdminRiderDetails";
import AdminCustomer from "./components/admin/users/AdminCustomer";
import AdminCustomerDetails from "./components/admin/users/AdminCustomerDetails";
import AdminVendorCategory from "./components/admin/vendors/AdminVendorCategory";
import AdminVendorCategoryDetails from "./components/admin/vendors/AdminVendorCategoryDetails";
import AdminVendorDetails from "./components/admin/vendors/vendor/AdminVendorDetails";
import AdminOrderDetails from "./components/admin/AdminOrderDetails";
import AdminCategoryDetails from "./components/admin/categories/AdminCategoryDetail";
import AdminProduct from "./components/admin/vendors/product/AdminProduct";
import RiderLayout from "./components/rider/RiderLayout";
import RiderdDashboard from "./components/rider/RiderDashboard";
import AdminVoucher from "./components/admin/vouchers/AdminVoucher";
import Admin from "./components/admin/admins/Admin";
import Home from "./components/home/Home";
import Page404 from "./components/Page404";
import ShopLayout from "./components/shop/ShopLayout";
import Shop from "./components/shop/Shop";
import Vendor from "./components/shop/Vendor";
import VendorDashboard from "./components/vendor/VendorDashboard";
import VendorLayout from "./components/vendor/VendorLayout";
import UserDashboard from "./components/customer/UserDashboard";
import UserLayout from "./components/customer/UserLayout";
import Unauthorized from "./components/Unauthorized";
<<<<<<< HEAD
import RequireAuth from "./hooks/RequireAuth";
import PersistLogin from "./components/shared/PersistLogin";
<<<<<<< HEAD
import ViewDelivery from "./components/rider/ViewDelivery";
import VendorViewProduct from "./components/vendor/VendorViewProduct";
import Login from "./components/auth/Login";
import Address from "./components/customer/Address";
import Gift from "./components/customer/Gift";
import Favourite from "./components/customer/Favourite";
import About from "./components/home/About";
import Contact from "./components/home/Contact";
import Logistics from "./components/home/Logistics";
import PaymentResponse from "./components/shop/PaymentResponse";
import RequireAuthAdmin from "./hooks/RequireAuthAdmin";
import OrderDetails from "./components/customer/OrderDetails";
import TryLogistics from "./components/logistics/TryLogistics";
import ForgotPassword from "./components/auth/ForgotPassword";
import TrackOrder from "./components/customer/TrackOrder";
import PrivacyPolicy from "./components/home/PrivacyPolicy";
import TermsAndCondition from "./components/home/TermsAndCondition";
import Faq from "./components/home/Faq";
=======
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
import AdminVendorCategory from './components/admin/vendors/AdminVendorCategory'
import AdminVendorCategoryDetails from './components/admin/vendors/AdminVendorCategoryDetails'
import AdminVendorDetails from './components/admin/vendors/vendor/AdminVendorDetails'
import AdminOrderDetails from './components/admin/AdminOrderDetails'
import AdminCategoryDetails from './components/admin/categories/AdminCategoryDetail'
import AdminProduct from './components/admin/vendors/product/AdminProduct'
<<<<<<< HEAD
=======
import RiderLayout from './components/rider/RiderLayout'
import RiderdDashboard from './components/rider/RiderDashboard'
import AdminVoucher from './components/admin/vouchers/AdminVoucher'
import Admin from './components/admin/admins/Admin'
>>>>>>> a2698f4 (Finishing touches on the admin portal)

>>>>>>> 4dc5d34 (worked on product component)
=======
=======
import ViewDelivery from './components/rider/ViewDelivery'

>>>>>>> c113a33 (added a view page for vewing delivery)
>>>>>>> 556b5a3 (added a view page for vewing delivery)

function App() {
  const queryClient = new QueryClient();

  const ROLES = {
    admin: "Admin",
    customer: "Customer",
    rider: "Rider",
    vendor: "Vendor",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/*PIBLIC ROUTES */}
        <Route
          path="/"
          element={<Layout />}
        >
          <Route
            path="about"
            element={<About />}
          />
          <Route
            path="contact"
            element={<Contact />}
          />
          <Route
            path="logistics"
            element={<Logistics />}
          />
          <Route
            path="privacypolicy"
            element={<PrivacyPolicy />}
          />

          <Route
            path="termsandconditions"
            element={<TermsAndCondition />}
          />

          <Route
            path="faq"
            element={<Faq />}
          />

          <Route
            index
            element={<Home />}
          />
        </Route>

        {/* AUTH */}

<<<<<<< HEAD
        <Route
          path="/login"
          element={<Login />}
        />
=======
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
        <Route path='/admin/vendorcategory' element={<AdminVendorCategory />} />
        <Route path='/admin/vendorcategory/:id' element={<AdminVendorCategoryDetails />} />
        <Route path='/admin/vendor/:id' element={<AdminVendorDetails />} />
        <Route path='/admin/product/:id' element={<AdminProduct />} />
>>>>>>> 4dc5d34 (worked on product component)

<<<<<<< HEAD
        <Route
          path="/forgotPassword"
          element={<ForgotPassword />}
        />
=======
        <Route path='/admin/order/:id' element={<AdminOrderDetails />} />
        <Route path='/admin/voucher' element={<AdminVoucher />} />
        <Route path='/admin/admin' element={<Admin />} />
>>>>>>> a2698f4 (Finishing touches on the admin portal)

        {/* SHOP ROUTES */}
        <Route element={<PersistLogin />}>
          <Route
            path="/shop"
            element={<ShopLayout />}
          >
            <Route
              path="/shop/vendor/:id"
              element={<Vendor />}
            />
            <Route
              path="/shop/payment-response"
              element={<PaymentResponse />}
            />
            <Route
              path="/shop/logistics"
              element={<TryLogistics />}
            />
            <Route
              index
              element={<Shop />}
            />
          </Route>
        </Route>

        {/* USER ROUTES */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRole={ROLES.customer} />}>
            <Route
              path="/user"
              element={<UserLayout />}
            >
              <Route
                index
                element={<UserDashboard />}
              />
              <Route
                path="/user/address"
                element={<Address />}
              />
              <Route
                path="/user/gift"
                element={<Gift />}
              />
              <Route
                path="/user/favourite"
                element={<Favourite />}
              />
              <Route
                path="/user/details/:id"
                element={<OrderDetails />}
              />

              <Route
                path="/user/track/:status"
                element={<TrackOrder />}
              />
            </Route>
          </Route>
        </Route>

        {/*PROTECTED ROUTES ADMIN */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuthAdmin allowedRole={ROLES.admin} />}>
            <Route
              path="/admin"
              element={<AdminLayout />}
            >
              <Route
                index
                element={<Overview />}
              />
              <Route
                path="/admin/service"
                element={<AdminService />}
              />
              <Route
                path="/admin/service/:id"
                element={<AdminServiceDetails />}
              />
              <Route
                path="/admin/category"
                element={<AdminCategory />}
              />
              <Route
                path="/admin/category/:id"
                element={<AdminCategoryDetails />}
              />
              <Route
                path="/admin/rider"
                element={<AdminRider />}
              />
              <Route
                path="/admin/rider/:id"
                element={<AdminRiderDetails />}
              />
              <Route
                path="/admin/customer"
                element={<AdminCustomer />}
              />
              <Route
                path="/admin/customer/:id"
                element={<AdminCustomerDetails />}
              />
              <Route
                path="/admin/vendorcategory"
                element={<AdminVendorCategory />}
              />
              <Route
                path="/admin/vendorcategory/:id"
                element={<AdminVendorCategoryDetails />}
              />
              <Route
                path="/admin/vendor/:id"
                element={<AdminVendorDetails />}
              />
              <Route
                path="/admin/product/:id"
                element={<AdminProduct />}
              />

              <Route
                path="/admin/order/:id"
                element={<AdminOrderDetails />}
              />
              <Route
                path="/admin/voucher"
                element={<AdminVoucher />}
              />
              <Route
                path="/admin/admin"
                element={<Admin />}
              />
              <Route
                path="/admin/order/:id"
                element={<AdminOrderDetails />}
              />
              <Route
                path="/admin/voucher"
                element={<AdminVoucher />}
              />
              <Route
                path="/admin/admin"
                element={<Admin />}
              />
            </Route>
          </Route>
        </Route>
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
        <Route
          path="/rider"
          element={<RiderLayout />}
        >
          <Route
            index
            element={<RiderdDashboard />}
          />
        <Route path='/rider/delivery/:id' element={<ViewDelivery />} />
>>>>>>> c113a33 (added a view page for vewing delivery)
        </Route>
>>>>>>> 556b5a3 (added a view page for vewing delivery)

        {/* PROTECTED ROUTES FOR RIDER */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuthAdmin allowedRole={ROLES.rider} />}>
            <Route
              path="/rider"
              element={<RiderLayout />}
            >
              <Route
                index
                element={<RiderdDashboard />}
              />
              <Route
                path="/rider/delivery/:id"
                element={<ViewDelivery />}
              />
            </Route>
          </Route>
        </Route>

        {/* PROTECTED ROUTES FOR VENDOR */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuthAdmin allowedRole={ROLES.vendor} />}>
            <Route
              path="/vendor"
              element={<VendorLayout />}
            >
              <Route
                index
                element={<VendorDashboard />}
              />
              <Route
                path="/vendor/product/:id"
                element={<VendorViewProduct />}
              />
            </Route>
          </Route>
        </Route>

        <Route
          path="/unauthorized"
          element={<Unauthorized />}
        />
        <Route
          path="*"
          element={<Page404 />}
        />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
