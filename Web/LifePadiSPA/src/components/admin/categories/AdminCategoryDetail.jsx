
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import baseUrl from "../../../api/baseUrl";
import useAuth from "../../../hooks/useAuth";
import useFetch from "../../../hooks/useFetch";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import {CircularProgress} from "@mui/material";
import { grey } from "@mui/material/colors";


const AdminCategoryDetails = () => {   

        const { id } = useParams();
        const url = `${baseUrl}category/get`;
        const { auth } = useAuth();
        const fetch = useFetch();


        const columns = [
          { field: "Id", headerName: "ID", width: 50 },
          {
            field: "Name",
            headerName: "Product Name",
            width: 180,
            //editable: true,
          },
          {
            field: "Tag",
            headerName: "Tag",
            width: 180,
            //editable: true,
          },
          {
            field: "Description",
            headerName: "Description",
            //type: "number",
            width: 180,
            //editable: true,
          },
          {
            field: "Price",
            headerName: "Price",
            width: 80,
          },
          {
            field: "Status",
            headerName: "Status",
            width: 80,
          }
        ];
      
        const getService = async (url) => {
          const response = await fetch(url, auth.accessToken);
      
          return response.data;
        };
      
        const { data, isError, isSuccess, isLoading } = useQuery({
          queryKey: ["category"],
          queryFn: () => getService(`${url}/${id}`),
          keepPreviousData: true,
          staleTime: 10000,
          refetchOnMount: "always",
        });
      
        console.log(data);
   
  return (
    <div className="text-gray-900 dark:text-gray-50 flex flex-col gap-10 p-5">
      <Breadcrumbs aria-label="breadcrumb">
            <Link
              to="/admin/category"
              className="hover:border-b-2 hover:border-b-secondary dark:text-primary"
            >
              Category
            </Link>

            <Link
              to="#"
              aria-current="page"
              className="hover:border-b-2 hover:border-b-secondary dark:text-primary"
            >
              {data?.Name}
            </Link>
          </Breadcrumbs>
      <h1 className="text-3xl font-bold text-center p-4">Category Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-evenly items-center">
        <div className="shadow-lg rounded-lg p-3 bg-white ">
          <div className="flex flex-col gap-2 items-center ">
            <h3 className="text-lg font-bold"> Name :</h3>
            <p className="text-gray-800">{data?.Name}</p>
          </div>
        </div>
        <div className=" flex justify-center">
        <div className="rounded-full border-2 w-20 h-20 p-1 ">
          <img src={data?.Icon} alt="" className="w-full h-full" />
        </div>
        </div>
        
        <div className="shadow-lg rounded-lg p-3 bg-white ">
          {" "}
          <div className="flex flex-col gap-2 items-center">
            <h3 className="text-lg font-bold"> Description :</h3>
            <p className="text-gray-800">{data?.Description}</p>
          </div>
        </div>
      </div>
      <div className="col-span-2 text-gray-900 dark:text-gray-50">
          <h2 className="text-2xl font-bold text-center p-5"> Products</h2>
        
        </div>
        <div className="overflow-x-auto bg-graybg rounded-lg">
              {isLoading && (
                <p className="flex items-center justify-center">
                  {" "}
                  <CircularProgress />
                </p>
              )}
              {isError && (
                <p className="flex items-center justify-center">
                  {" "}
                  <Alert severity="error">Error Fetching Data..</Alert>
                </p>
              )}
              {isSuccess && (
                <DataGrid
                  rows={data?.Products}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                  //checkboxSelection
                  disableRowSelectionOnClick
                  getRowId={(row) => row.Id}
                  className="cursor-pointer"
                  
                />
              )}
            </div>
    </div>
  );
};


 
export default AdminCategoryDetails;