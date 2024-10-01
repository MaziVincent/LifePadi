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
>>>>>>> 0ab4b1c (Google Maps Controller)
=======
import ViewDelivery from './components/rider/ViewDelivery'
import Login from "./components/auth/Login";

>>>>>>> c113a33 (added a view page for vewing delivery)
>>>>>>> 556b5a3 (added a view page for vewing delivery)

=======
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

>>>>>>> fd293ff (Google Maps Controller)
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
=======

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/forgotPassword"
          element={<ForgotPassword />}
        />

        {/* SHOP ROUTES */}
<<<<<<< HEAD
>>>>>>> d189281 (worked on Login)

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
=======
>>>>>>> 0ab4b1c (Google Maps Controller)
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
<<<<<<< HEAD
              path="/shop/payment-response"
              element={<PaymentResponse />}
            />
            <Route
              path="/shop/logistics"
              element={<TryLogistics />}
            />
            <Route
=======
>>>>>>> 0ab4b1c (Google Maps Controller)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 5dffde0 (forgot password and live payment)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 28e0a99 (rider corrections and other)

              <Route
                path="/user/track/:status"
                element={<TrackOrder />}
              />
<<<<<<< HEAD
=======
>>>>>>> 0ab4b1c (Google Maps Controller)
=======
              <Route path="/user/address" element={<Address />} />
              <Route path="/user/gift" element={<Gift />} />
              <Route path="/user/favourite" element={<Favourite />} />
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> eda1965 (User Dashboard and Landing Page)
=======
=======
              <Route path="/user/details/:id" element={<OrderDetails />} />
>>>>>>> 7fa87ff (user dashboard commit)
              
>>>>>>> 7a64a18 (created a payment response page)
=======
>>>>>>> 5dffde0 (forgot password and live payment)
=======
>>>>>>> 28e0a99 (rider corrections and other)
            </Route>
          </Route>
        </Route>

        {/*PROTECTED ROUTES ADMIN */}
        <Route element={<PersistLogin />}>
<<<<<<< HEAD
<<<<<<< HEAD
          <Route element={<RequireAuthAdmin allowedRole={ROLES.admin} />}>
=======
          <Route element={<RequireAuth allowedRole={ROLES.admin} />}>
>>>>>>> 0ab4b1c (Google Maps Controller)
=======
          <Route element={<RequireAuthAdmin allowedRole={ROLES.admin} />}>
>>>>>>> 9174884 (require auth commit)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 40d3219 (changes)
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
<<<<<<< HEAD
=======
>>>>>>> 0ab4b1c (Google Maps Controller)
=======
>>>>>>> 40d3219 (changes)
            </Route>
          </Route>
        </Route>
<<<<<<< HEAD
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
<<<<<<< HEAD
>>>>>>> 556b5a3 (added a view page for vewing delivery)

        {/* PROTECTED ROUTES FOR RIDER */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuthAdmin allowedRole={ROLES.rider} />}>
=======
=======
>>>>>>> fd293ff (Google Maps Controller)

        {/* PROTECTED ROUTES FOR RIDER */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRole={ROLES.rider} />}>
>>>>>>> 0ab4b1c (Google Maps Controller)
            <Route
              path="/rider"
              element={<RiderLayout />}
            >
              <Route
                index
                element={<RiderdDashboard />}
              />
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 40d3219 (changes)
              <Route
                path="/rider/delivery/:id"
                element={<ViewDelivery />}
              />
<<<<<<< HEAD
=======
>>>>>>> 0ab4b1c (Google Maps Controller)
=======
>>>>>>> 40d3219 (changes)
            </Route>
          </Route>
<<<<<<< HEAD
<<<<<<< HEAD
        </Route>
<<<<<<< HEAD

        {/* PROTECTED ROUTES FOR VENDOR */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuthAdmin allowedRole={ROLES.vendor} />}>
=======
=======
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
>>>>>>> fd293ff (Google Maps Controller)
=======
>>>>>>> 369df67 (changes)
        </Route>
       

        {/* PROTECTED ROUTES FOR VENDOR */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRole={ROLES.vendor} />}>
>>>>>>> 0ab4b1c (Google Maps Controller)
            <Route
              path="/vendor"
              element={<VendorLayout />}
            >
              <Route
                index
                element={<VendorDashboard />}
              />
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 5dffde0 (forgot password and live payment)
              <Route
                path="/vendor/product/:id"
                element={<VendorViewProduct />}
              />
<<<<<<< HEAD
=======
>>>>>>> 0ab4b1c (Google Maps Controller)
=======
          <Route path='/vendor/product/:id' element={<VendorViewProduct />} />
>>>>>>> 6248978 (added product view page for vendor)
=======
>>>>>>> 5dffde0 (forgot password and live payment)
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
