import useFetch from '../../hooks/useFetch'
import { useState } from 'react'
import { useQuery } from 'react-query'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
// import FadeMenu from './FadeMenu'
import CircularProgress from '@mui/material/CircularProgress'
import { vendorProductsUrl, vendorProductStatUrl } from './vendorUri/VendorURI'
import VendorActions from './VendorActions'
import { AddProductModal } from './VendorModals'

const VendorDashboard = () => {
  const fetch = useFetch()
  const { auth } = useAuth()
  let page = 1
  let totalPage = 1
  let pageSize = 5
  const [search, setSearch] = useState('')
  const [isVeirfied, setIsVerified] = useState(false)
  const vendorId = auth.Id
  const vendorProductsURL = vendorProductsUrl.replace('{id}', vendorId)
  const [openAddProductModal, setOpenAddProductModal] = useState(false)
  const handleOpenAddProductModal = () => setOpenAddProductModal(true)

  const getVendorProducts = async (url) => {
    const response = await fetch(url, auth.accessToken)
    return response.data
  }

  const {
    data: vendorProducts,
    isError: vendorProductsError,
    isLoading: vendorProductsIsLoading,
    isSuccess: vendorProductsSuccess,
  } = useQuery({
    queryKey: ['vendorProducts', page, search],
    queryFn: () =>
      getVendorProducts(
        `${vendorProductsURL}?PageNumber=${page}&SearchString=${search}`
      ),
    keepPreviousData: true,
    staleTime: 20000,
    refetchOnMount: 'always',
  })
  // console.log(vendorProductsURL);
  
  const setPage = (i) => {
    if (i > 0 && i <= totalPage) {
      page = i
    }
  }

  const getVendorProductStats = async (url) => {
    const response = await fetch(url, auth.accessToken)
    return response.data
  }

  const {
    data: vendorProductStats,
    isError: vendorProductStatsError,
    isLoading: vendorProductStatsIsLoading,
    isSuccess: vendorProductStatsSuccess,
  } = useQuery({
    queryKey: ['vendorProductStats', vendorId],
    queryFn: () => getVendorProductStats(vendorProductStatUrl.replace('{id}', vendorId)),
    keepPreviousData: true,
    staleTime: 20000,
    refetchOnMount: 'always',
  })

  const setNextPage = (page) => {
    if (page <= totalPage) {
      page += 1
    }
  }
  const setPreviousPage = (page) => {
    if (page > 0) {
      page -= 1
    }
  }

  return (
    <div className='bg-darkBg h-auto overflow-y-auto sm:pt-14'>
      <section className='bg-white dark:bg-gray-900 mb-5'>
        <div className='max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6 '>
          <dl className='grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white'>
            <div className='flex flex-col items-center justify-center'>
              <dt className='mb-2 text-3xl md:text-4xl font-extrabold'>
                {vendorProductStatsIsLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  vendorProductStats && vendorProductStats.TotalProducts
                )}
              </dt>
              <dd className='font-light text-gray-500 dark:text-gray-400'>
                Total Products
              </dd>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <dt className='mb-2 text-3xl md:text-4xl font-extrabold'>
                {vendorProductStatsIsLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  vendorProductStats && vendorProductStats.TotalActiveProducts
                )}
              </dt>
              <dd className='font-light text-gray-500 dark:text-gray-400'>
                Active Products
              </dd>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <dt className='mb-2 text-3xl md:text-4xl font-extrabold'>
                {vendorProductStatsIsLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  vendorProductStats && vendorProductStats.TotalInactiveProducts
                )}
              </dt>
              <dd className='font-light text-gray-500 dark:text-gray-400'>
                Inactive Products
              </dd>
            </div>
          </dl>
        </div>
      </section>
      <section className='bg-darkMenu dark:bg-gray-900 p-3 sm:p-5 h-full'>
        <div className='mx-auto max-w-screen-xl px-2 lg:px-12'>
          <div className='bg-white relative shadow-md sm:rounded-lg'>
            <div className='flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4'>
              <div className='w-full md:w-1/2'>
                <form className='flex items-center'>
                  <label htmlFor='simple-search' className='sr-only'>
                    Search
                  </label>
                  <div className='relative w-full'>
                    <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                      <svg
                        aria-hidden='true'
                        className='w-5 h-5 text-darkBg dark:text-gray-400'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          fillRule='evenodd'
                          d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                    <input
                      //   onKeyUp={(e) => setSearch(e.target.value)}
                      type='text'
                      id='simple-search'
                      className='bg-gray-50 border border-gray-300 text-darkBg text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder='Search'
                      required=''
                    />
                  </div>
                </form>
              </div>
              <div className='w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0'>
                <button
                  type='button'
                  className='flex items-center justify-center text-secondary bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800'
                  onClick={handleOpenAddProductModal}
                >
                  <i className='line-icon-Add'></i>
                  Add Product
                </button>
              </div>
            </div>
            <div className='overflow-auto'>
              <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th scope='col' className='px-4 py-3'>
                      Category Name
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Product Name
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Price
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Tag
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Description
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Status
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      <span className=''>Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {vendorProductsIsLoading ? (
                    <tr className=''>
                      <td colSpan={6} className=''>
                        <div className='p-3 flex flex-row justify-center items-center w-full'>
                          <CircularProgress />
                        </div>
                      </td>
                    </tr>
                  ) : (
                    vendorProductsSuccess &&
                    vendorProducts.result.map((product) => (
                      <tr
                        className='border-b dark:border-gray-700'
                        key={product.Id}
                      >
                        <th
                          scope='row'
                          className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                        >
                          {product.Category.Name}
                        </th>
                        <td className='px-4 py-3'>{product.Name}</td>
                        <td className='px-4 py-3'>&#x20A6; {product.Price}</td>
                        <td className='px-4 py-3'>{product.Tag}</td>
                        <td className='px-4 py-3' title={product.Description}>
                          {product.Description.slice(0, 50)}...
                        </td>
                        <td
                          className={`px-4 py-3 ${
                            product.Status ? 'text-lightgreen' : 'text-red'
                          }`}
                        >
                          {product.Status ? 'Active' : 'Inactive'}
                        </td>
                        <td className='px-4 py-3 flex items-center justify-end dropdown'>
                          {<VendorActions product={product} />}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <nav
              className='flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4'
              aria-label='Table navigation'
            >
              <span className='text-sm font-normal text-gray-500 dark:text-gray-400'>
                Showing
                <span className='font-semibold text-gray-900 dark:text-white m-1'>
                  1-10
                  {/* {riderDeliveriesLoading ? (
                    <CircularProgress size={20} />
                  ) : (
                    pageSize
                  )} */}
                </span>
                of
                {/* <span className='font-semibold text-gray-900 dark:text-white m-1'>
                  {riderDeliveriesLoading
                    ? 'Loading'
                    : riderDeliveries.dataList.TotalCount}
                </span> */}{' '}
                100
              </span>
              <ul className='inline-flex items-stretch -space-x-px'>
                <li>
                  <button
                    // onClick={() => setPreviousPage(page)}
                    className='flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  >
                    <span className='sr-only'>Previous</span>
                    <svg
                      className='w-5 h-5'
                      aria-hidden='true'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </button>
                </li>
                {/* {Array.from({ length: totalPage }, (_, i) => ( */}
                {/* <li key={i}>
                    <button
                      onClick={() => setPage(i + 1)}
                      className='flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    >
                      {i + 1}
                    </button>
                  </li> */}
                {/* ))} */}
                <li>
                  <button
                    // onClick={}
                    className='flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  >
                    1
                  </button>
                </li>
                <li className='hidden'>
                  <Link
                    to='#'
                    className='flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  >
                    ...
                  </Link>
                </li>
                <li className='hidden'>
                  <Link
                    to='#'
                    className='flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  >
                    100
                  </Link>
                </li>
                <li>
                  <button
                    // onClick={() => setNextPage(page)}
                    className='flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  >
                    <span className='sr-only'>Next</span>
                    <svg
                      className='w-5 h-5'
                      aria-hidden='true'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
      <AddProductModal
        openAddProductModal={openAddProductModal}
        setOpenAddProductModal={setOpenAddProductModal}
      />
    </div>
  )
}

export default VendorDashboard
