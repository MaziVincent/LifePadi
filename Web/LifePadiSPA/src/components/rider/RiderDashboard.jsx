import useFetch from '../../hooks/useFetch'
import { useState } from 'react'
import {
  riderDeliveriesUrl,
  successfulDeliveriesCountUrl,
  pendingDeliveriesCountUrl,
} from './rider_uri/RiderURI'
import { useQuery } from 'react-query'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import FadeMenu from './FadeMenu'
import CircularProgress from '@mui/material/CircularProgress'

const RiderDashboard = () => {
  const fetch = useFetch()
  const { auth } = useAuth()
  
  let page = 1;
  let totalPage = 1;
  let pageSize = 5;
  const [search, setSearch] = useState('')
  const [isVeirfied, setIsVerified] = useState(false)
  const riderId = auth.user.Id

  const getRiderDeliveris = async (url) => {
    const response = await fetch(url, auth.accessToken)
    return response.data
  }
  const getRiderPendingDeliverisCount = async (url) => {
    const response = await fetch(url, auth.accessToken)
    return response.data
  }
  const getRiderSuccessfulDeliverisCount = async (url) => {
    const response = await fetch(url, auth.accessToken)
    return response.data
  }

  const {
    data: riderDeliveries,
    isError: riderDeliveriesError,
    isLoading: riderDeliveriesLoading,
    isSuccess: riderDeliveriesSuccess,
  } = useQuery({
    queryKey: ['deliveris', page, search],
    queryFn: () =>
      getRiderDeliveris(
        `${
          riderDeliveriesUrl + riderId
        }?PageNumber=${page}&SearchString=${search}`
      ),
    keepPreviousData: true,
    staleTime: 20000,
    refetchOnMount: 'always',
  })

  if (riderDeliveriesSuccess) {
    if (riderDeliveries){
      totalPage = riderDeliveries.dataList.TotalPages;
      pageSize = riderDeliveries.dataList.PageSize;
      console.log(riderDeliveries.result);
      if (riderDeliveries.result[0].Rider.isVeirfied)
      {
        setIsVerified(true)
      }
    }
  }

  const {
    data: pendingDeliveriesCount,
    isError: pendingDeliveriesCountError,
    isLoading: pendingDeliveriesCountLoading,
    isSuccess: pendingDeliveriesCountSuccess,
  } = useQuery({
    queryKey: 'deliveriesWithStatus',
    queryFn: () =>
      getRiderPendingDeliverisCount(`${pendingDeliveriesCountUrl + riderId}`),
    keepPreviousData: true,
    staleTime: 20000,
    refetchOnMount: 'always',
  })

  const {
    data: successfulDeliveriesCount,
    isError: successfulDeliveriesCountError,
    isLoading: successfulDeliveriesCountLoading,
    isSuccess: successfulDeliveriesCountSuccess,
  } = useQuery({
    queryKey: 'successfulDeliveriesCount',
    queryFn: () =>
      getRiderSuccessfulDeliverisCount(
        `${successfulDeliveriesCountUrl + riderId}`
      ),
    keepPreviousData: true,
    staleTime: 20000,
    refetchOnMount: 'always',
  })
  const setPage = (i) => {
    if (i > 0 && i <= totalPage) {
      page = i;
    }
  }
  const setNextPage = (page) => {
    if (page <= totalPage) {
      page += 1;
    }
  }
  const setPreviousPage = (page) => {
    if (page > 0) {
      page -= 1;
    }
  }

  return (
    <div className='dark:bg-darkBg bg-primary h-auto'>
      <section className='bg-white dark:bg-gray-900 mb-5'>
        <div className='max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6 '>
          <dl className='grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white'>
            <div className='flex flex-col items-center justify-center'>
              <dt className='mb-2 text-3xl md:text-4xl font-extrabold'>
                {riderDeliveriesLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  riderDeliveries && riderDeliveries.dataList.TotalCount + 'M+'
                )}
              </dt>
              <dd className='font-light text-gray-500 dark:text-gray-400'>
                Total Deliveries
              </dd>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <dt className='mb-2 text-3xl md:text-4xl font-extrabold'>
                {successfulDeliveriesCountLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  successfulDeliveriesCountSuccess &&
                  successfulDeliveriesCount + 'M+'
                )}
              </dt>
              <dd className='font-light text-gray-500 dark:text-gray-400'>
                Successful
              </dd>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <dt className='mb-2 text-3xl md:text-4xl font-extrabold'>
                {pendingDeliveriesCountLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  pendingDeliveriesCountSuccess && pendingDeliveriesCount + 'M+'
                )}
              </dt>
              <dd className='font-light text-gray-500 dark:text-gray-400'>
                Pending
              </dd>
            </div>
          </dl>
        </div>
      </section>
      <section className='dark:bg-darkMenu bg-primary dark:bg-gray-900 p-3 sm:p-5'>
        <div className='mx-auto max-w-screen-xl '>
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
                      onKeyUp={(e) => setSearch(e.target.value)}
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
                {isVeirfied ? (
                  <button
                    type='button'
                    className='flex items-center justify-center text-secondary bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800'
                  >
                    {/* <i className='line-icon-Add'></i> */}
                    Verified
                  </button>
                ) : (
                  <button
                    type='button'
                    className='flex items-center justify-center text-red bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800'
                  >
                    {/* <i className='line-icon-Add'></i> */}
                    Not Verified
                  </button>
                )}
                <div className='flex items-center space-x-3 w-full md:w-auto'>
                  <button
                    id='actionsDropdownButton'
                    data-dropdown-toggle='actionsDropdown'
                    className='w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                    type='button'
                  >
                    <svg
                      className='-ml-1 mr-1.5 w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                      aria-hidden='true'
                    >
                      <path
                        clipRule='evenodd'
                        fillRule='evenodd'
                        d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                      />
                    </svg>
                    Actions
                  </button>
                  <div
                    id='actionsDropdown'
                    className='hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600'
                  >
                    <ul
                      className='py-1 text-sm text-gray-700 dark:text-gray-200'
                      aria-labelledby='actionsDropdownButton'
                    >
                      <li>
                        <Link
                          to='#'
                          className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                          Mass Edit
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <button
                    id='filterDropdownButton'
                    data-dropdown-toggle='filterDropdown'
                    className='w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                    type='button'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      aria-hidden='true'
                      className='h-4 w-4 mr-2 text-gray-400'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z'
                        clipRule='evenodd'
                      />
                    </svg>
                    Filter
                    <svg
                      className='-mr-1 ml-1.5 w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                      aria-hidden='true'
                    >
                      <path
                        clipRule='evenodd'
                        fillRule='evenodd'
                        d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                      />
                    </svg>
                  </button>
                  <div
                    id='filterDropdown'
                    className='z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700'
                  >
                    <h6 className='mb-3 text-sm font-medium text-gray-900 dark:text-white'>
                      Choose brand
                    </h6>
                    <ul
                      className='space-y-2 text-sm'
                      aria-labelledby='filterDropdownButton'
                    >
                      <li className='flex items-center'>
                        <input
                          id='apple'
                          type='checkbox'
                          value=''
                          className='w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
                        />
                        <label
                          htmlFor='apple'
                          className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-100'
                        >
                          Apple (56)
                        </label>
                      </li>
                      <li className='flex items-center'>
                        <input
                          id='fitbit'
                          type='checkbox'
                          value=''
                          className='w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
                        />
                        <label
                          htmlFor='fitbit'
                          className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-100'
                        >
                          Microsoft (16)
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className='overflow-x-auto'>
              <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th scope='col' className='px-4 py-3'>
                      Pick Up Address
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Delivery Fee
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Delivery Status
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Order Status
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      IsDelivered
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Customer Name
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Customer Phone
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      <span className=''>Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {riderDeliveriesLoading && (
                    <tr className=''>
                      <td colSpan={8} className=''>
                        <div className='p-3 flex flex-row justify-center items-center w-full'>
                          <CircularProgress />
                        </div>
                      </td>
                    </tr>
                  )}
                  {riderDeliveries ? (
                    riderDeliveries.result.map((delivery) => (
                      <tr
                        className='border-b dark:border-gray-700'
                        key={delivery.Id}
                      >
                        <th
                          scope='row'
                          className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                        >
                          {delivery.PickupAddress}
                        </th>
                        <td className='px-4 py-3'>
                          &#x20A6; {delivery.DeliveryFee}
                        </td>
                        <td className='px-4 py-3'>{delivery.Status}</td>
                        <td className='px-4 py-3'>{delivery.Order.Status}</td>
                        <td className='px-4 py-3'>
                          {delivery.Order?.IsDelivered ? 'True' : 'False'}
                        </td>
                        <td className='px-4 py-3'>
                          {delivery.Order.Customer.LastName +
                            ' ' +
                            delivery.Order.Customer.FirstName}
                        </td>
                        <td className='px-4 py-3'>
                          {delivery.Order.Customer.PhoneNumber}
                        </td>
                        <td className='px-5 py-3 flex items-center justify-end dropdown'>
                          <FadeMenu delivery={delivery} />
                        </td>
                      </tr>
                    ))
                  ): (
                    <tr>
                      <td colSpan={6} className='text-center'>No data found</td>
                    </tr>
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
                  1-
                  {riderDeliveriesLoading ? (
                    <CircularProgress size={20} />
                  ) : (
                    pageSize
                  )}
                </span>
                of
                <span className='font-semibold text-gray-900 dark:text-white m-1'>
                  {riderDeliveriesLoading
                    ? 'Loading'
                    : riderDeliveries?.dataList?.TotalCount}
                </span>
              </span>
              <ul className='inline-flex items-stretch -space-x-px'>
                <li>
                  <button
                    onClick={() => setPreviousPage(page)}
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
                {Array.from({ length: totalPage }, (_, i) => (
                  <li key={i}>
                    <button
                      onClick={() => setPage(i + 1)}
                      className='flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
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
                    onClick={() => setNextPage(page)}
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
    </div>
  )
}

export default RiderDashboard
