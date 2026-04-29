import type { RouteObject } from "react-router-dom";
import PersistLogin from "@/components/shared/PersistLogin";
import RequireAuthAdmin from "@/hooks/RequireAuthAdmin";
import AdminLayout from "@/components/admin/AdminLayout";
import Overview from "@/components/admin/OverView";
import AdminService from "@/components/admin/services/AdminService";
import AdminServiceDetails from "@/components/admin/services/AdminServiceDetails";
import AdminCategory from "@/components/admin/categories/AdminCategory";
import AdminCategoryDetails from "@/components/admin/categories/AdminCategoryDetail";
import AdminRider from "@/components/admin/riders/AdminRider";
import AdminRiderDetails from "@/components/admin/riders/AdminRiderDetails";
import AdminCustomer from "@/components/admin/users/AdminCustomer";
import AdminCustomerDetails from "@/components/admin/users/AdminCustomerDetails";
import AdminVendorCategory from "@/components/admin/vendors/AdminVendorCategory";
import AdminVendorCategoryDetails from "@/components/admin/vendors/AdminVendorCategoryDetails";
import AdminVendorDetails from "@/components/admin/vendors/vendor/AdminVendorDetails";
import AdminProduct from "@/components/admin/vendors/product/AdminProduct";
import AdminOrderDetails from "@/components/admin/AdminOrderDetails";
import AdminVoucher from "@/components/admin/vouchers/AdminVoucher";
import Admin from "@/components/admin/admins/Admin";
import { ROLES } from "./roles";

export const adminRoutes: RouteObject[] = [
	{
		element: <PersistLogin />,
		children: [
			{
				element: <RequireAuthAdmin allowedRole={ROLES.admin} />,
				children: [
					{
						path: "/admin",
						element: <AdminLayout />,
						children: [
							{ index: true, element: <Overview /> },
							{ path: "service", element: <AdminService /> },
							{ path: "service/:id", element: <AdminServiceDetails /> },
							{ path: "category", element: <AdminCategory /> },
							{ path: "category/:id", element: <AdminCategoryDetails /> },
							{ path: "rider", element: <AdminRider /> },
							{ path: "rider/:id", element: <AdminRiderDetails /> },
							{ path: "customer", element: <AdminCustomer /> },
							{ path: "customer/:id", element: <AdminCustomerDetails /> },
							{ path: "vendorcategory", element: <AdminVendorCategory /> },
							{
								path: "vendorcategory/:id",
								element: <AdminVendorCategoryDetails />,
							},
							{ path: "vendor/:id", element: <AdminVendorDetails /> },
							{ path: "product/:id", element: <AdminProduct /> },
							{ path: "order/:id", element: <AdminOrderDetails /> },
							{ path: "voucher", element: <AdminVoucher /> },
							{ path: "admin", element: <Admin /> },
						],
					},
				],
			},
		],
	},
];
