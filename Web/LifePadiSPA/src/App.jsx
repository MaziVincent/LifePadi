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
import RequireAuth from "./hooks/RequireAuth";
import PersistLogin from "./components/shared/PersistLogin";
import ViewDelivery from "./components/rider/ViewDelivery";
import VendorViewProduct from "./components/vendor/VendorViewProduct";
import Login from "./components/auth/Login";

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
            index
            element={<Home />}
          />
        </Route>

        {/* AUTH */}

        <Route
          path="/login"
          element={<Login />}
        />

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
            </Route>
          </Route>
        </Route>

        {/*PROTECTED ROUTES ADMIN */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRole={ROLES.admin} />}>
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
            </Route>
          </Route>
        </Route>

        {/* PROTECTED ROUTES FOR RIDER */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRole={ROLES.rider} />}>
            <Route
              path="/rider"
              element={<RiderLayout />}
            >
              <Route
                index
                element={<RiderdDashboard />}
              />
            </Route>
          </Route>
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
        </Route>

        {/* PROTECTED ROUTES FOR VENDOR */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRole={ROLES.vendor} />}>
            <Route
              path="/vendor"
              element={<VendorLayout />}
            >
              <Route
                index
                element={<VendorDashboard />}
              />
          <Route path='/vendor/product/:id' element={<VendorViewProduct />} />
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
