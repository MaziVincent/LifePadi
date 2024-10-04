import { useParams } from 'react-router-dom'
import { getDeliveryUrl } from './rider_uri/RiderURI'
import { CircularProgress } from '@mui/material'
import useFetch from '../../hooks/useFetch'
import useAuth from '../../hooks/useAuth'
import { useQuery } from 'react-query'
import DateFormater from '../shared/DateFormater'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import baseUrl from '../../api/baseUrl'


const ViewDelivery = () => {
    const { auth } = useAuth()
    const fetch = useFetch()
    let totalMoney = 0
    const [logistic, setLogistic] = useState(null)
    const [isLogistic, setIsLogistic] = useState(false)

    const { id } = useParams()
    const url = getDeliveryUrl.replace('{id}', id)

    const addMoney = (money) => {
        totalMoney += money
    }
    
    const geDelivery = async (url) => {
        const response = await fetch(url, auth.accessToken)
        return response.data
    }

    const getLogistics = async (url) => {
      const response = await fetch(url, auth.accessToken);
      return response.data;
    };

    const { 
        data: delivery,
        isError,
        isLoading,
        isSuccess
     } = useQuery({
        queryKey: ['delivery'],
        queryFn: () => geDelivery(url),
        staleTime: 50000,
        keepPreviousData: true,
        refetchOnMount: true,
    })

    if (delivery) {
      if (delivery.PickupType === "Logistics") {
          const res = getLogistics(`${baseUrl}logistics/getByOrder/${delivery.Order.Id}`);
          res.then((data) => {
            setLogistic(data);
            setIsLogistic(true);
          });
          
        }
    }


  return (
    <div>
      <section className='dark:bg-darkMenu dark:bg-gray-900 p-1 sm:p-5'>
        <button>
          <Link
            className='bg-graybg text-accent px-2 rounded-sm text-2xl'
            to='/rider'
          >
            &larr;{' '}
          </Link>
        </button>
        <div className='mx-auto max-w-screen-xl px-2 lg:px-3'>
          <div className='bg-white relative  sm:rounded-lg'>
            <div className='flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4'>
              <div className='w-full md:w-1/2  shadow-lg rounded-lg'>
                <Box className='dark:bg-darkHover rounded-md'>
                  <Typography
                    id='modal-modal-title'
                    variant='h6'
                    component='h2'
                    className='pl-2 pt-2'
                  >
                    Delivery details
                  </Typography>
                  <Box className='h-72 p-3 overflow-auto'>
                    {isError && (
                      <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        <span className='text-red-600'>An error occurred</span>
                      </Typography>
                    )}
                    {delivery && (
                      <>
                        <Typography id='modal-modal-description'>
                          <span className='text-lg font-bold'>
                            Pickup Address:{' '}
                          </span>{' '}
                          <span className='text-sm'>
                            {delivery.PickupAddress}
                          </span>
                        </Typography>
                        <Typography id='modal-modal-description'>
                          <span className='text-lg font-bold'>
                            Delivery Address:{' '}
                          </span>{' '}
                          <span className='text-sm'>
                            {delivery.DeliveryAddress}
                          </span>
                        </Typography>
                        <Typography>
                          <span className='text-lg font-bold'>
                            Delivery Fee:{' '}
                          </span>{' '}
                          &#x20A6;
                          {delivery.DeliveryFee}
                        </Typography>
                        <Typography>
                          <span className='text-lg font-bold'>
                            Delivery Status:{' '}
                          </span>{' '}
                          {delivery.Status == 'Delivered' ? (
                            <span className='text-lightgreen'>
                              {delivery.Status}
                            </span>
                          ) : (
                            delivery.Status
                          )}
                        </Typography>
                        <Typography>
                          <span className='text-lg font-bold'>
                            Delivery Type:{' '}
                          </span>{' '}
                          {delivery.PickupType}
                        </Typography>
                        <Typography>
                          <span className='text-lg font-bold'>
                            Delivery Time:{' '}
                          </span>{' '}
                          {DateFormater(delivery.CreatedAt)}
                        </Typography>
                        <Typography>
                          <span className='text-lg font-bold'>
                            Ordered Date:{' '}
                          </span>{' '}
                          <span className='text-sm'>
                            {DateFormater(delivery.Order.CreatedAt)}
                          </span>
                        </Typography>
                        <Typography>
                          <span className='text-lg font-bold'>
                            Order Status:{' '}
                          </span>{' '}
                          <span className='text-sm'>
                            {delivery.Order.Status}
                          </span>
                        </Typography>
                        {delivery.Order.IsDelivered ? (
                          <Typography>
                            <span className='text-lg font-bold'>
                              Delivery time:{' '}
                            </span>{' '}
                            <span className='text-sm'>
                              {DateFormater(delivery.UpdatedAt)}
                            </span>
                          </Typography>
                        ) : (
                          <Typography>
                            <span className='text-lg font-bold'>
                              Delivery time:{' '}
                            </span>{' '}
                            <span className='text-red-600'>
                              Not yet delivered
                            </span>
                          </Typography>
                        )}
                      </>
                    )}
                  </Box>
                </Box>
              </div>
              <div className='w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0'>
                <Box className='dark:bg-darkHover bg-primary rounded-lg shadow-lg'>
                  <Typography
                    id='modal-modal-title'
                    variant='h6'
                    component='h2'
                    className='pl-2 pt-2'
                  >
                    Customer details
                  </Typography>
                  <Box className='h-72 p-3 overflow-auto'>
                    {isError && (
                      <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        <span className='text-red-600'>An error occurred</span>
                      </Typography>
                    )}
                    {delivery && (
                      <>
                        <Typography id='modal-modal-description'>
                          <span className='text-lg font-bold'>
                            Customer FirstName:{' '}
                          </span>{' '}
                          <span className='text-sm'>
                            {delivery.Order.Customer.FirstName}
                          </span>
                        </Typography>
                        <Typography>
                          <span className='text-lg font-bold'>
                            Customer LastName:{' '}
                          </span>{' '}
                          {delivery.Order.Customer.LastName}
                        </Typography>
                        <Typography>
                          <span className='text-lg font-bold'>
                            Customer Phone:{' '}
                          </span>{' '}
                          {delivery.Order.Customer.PhoneNumber}
                        </Typography>
                        <Typography>
                          <span className='text-lg font-bold'>
                            Customer Address:{' '}
                          </span>{' '}
                          {delivery.Order.Customer.ContactAddress}
                        </Typography>
                        <Typography>
                          <span className='text-lg font-bold'>
                            Customer Email:{' '}
                          </span>{' '}
                          {delivery.Order.Customer.Email}
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
              </div>
              {isLogistic && (
                <div className='w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0'>
                  <Box className='dark:bg-darkHover bg-primary rounded-lg shadow-lg'>
                    <Typography
                      id='modal-modal-title'
                      variant='h6'
                      component='h2'
                      className='pl-2 pt-2'
                    >
                      Logistic details
                    </Typography>
                    <Box className='h-72 p-3 overflow-auto'>
                      {isError && (
                        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                          <span className='text-red-600'>
                            An error occurred
                          </span>
                        </Typography>
                      )}
                      {logistic && (
                        <>
                          <Typography id='modal-modal-description'>
                            <span className='text-lg font-bold'>
                              Sender Name:{' '}
                            </span>{' '}
                            <span className='text-sm'>
                              {logistic.SenderName}
                            </span>
                          </Typography>
                          <Typography>
                            <span className='text-lg font-bold'>
                              Sender Phone:{' '}
                            </span>{' '}
                            {logistic.SenderPhone}
                          </Typography>
                          <Typography>
                            <span className='text-lg font-bold'>
                              Sender Address:{' '}
                            </span>{' '}
                            {logistic.SenderAddress}
                          </Typography>
                          <Typography>
                            <span className='text-lg font-bold'>
                              Receiver Name:{' '}
                            </span>{' '}
                            {logistic.ReceiverName}
                          </Typography>
                          <Typography>
                            <span className='text-lg font-bold'>
                              Receiver Phone:{' '}
                            </span>{' '}
                            {logistic.ReceiverPhone}
                          </Typography>
                          <Typography>
                            <span className='text-lg font-bold'>
                              Receiver Address:{' '}
                            </span>{' '}
                            {logistic.ReceiverAddress}
                          </Typography>
                          <Typography>
                            <span className='text-lg font-bold'>Item: </span>{' '}
                            {logistic.Item}
                          </Typography>
                          <Typography>
                            <span className='text-lg font-bold'>
                              Item Description:{' '}
                            </span>{' '}
                            {logistic.ItemDescription}
                          </Typography>
                          <Typography>
                            <span className='text-lg font-bold'>
                              Item Weight:{' '}
                            </span>{' '}
                            {logistic.ItemWeight}
                          </Typography>
                          <Typography>
                            <span className='text-lg font-bold'>
                              TrackingNumber:{' '}
                            </span>{' '}
                            {logistic.TrackingNumber}
                          </Typography>
                          <Typography>
                            <span className='text-lg font-bold'>Status: </span>{' '}
                            {logistic.Status}
                          </Typography>
                        </>
                      )}
                    </Box>
                  </Box>
                </div>
              )}
            </div>
            <div className='overflow-x-auto'>
              <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th scope='col' className='px-4 py-3'>
                      Product Image
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Product Name
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Product Description
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Price
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Quantity
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Total Price
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Vendor Name
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Vendor Address
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Item Name
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Weight
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Item Description
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      IsFragile
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr className=''>
                      <td colSpan={10} className=''>
                        <div className='p-3 flex flex-row justify-center items-center w-full'>
                          <CircularProgress />
                        </div>
                      </td>
                    </tr>
                  )}
                  {delivery ? (
                    delivery.Order.OrderItems.map((o) => (
                      <tr className='border-b dark:border-gray-700' key={o.Id}>
                        <th
                          scope='row'
                          className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                        >
                          <img src={o.Product.ProductImgUrl} alt='' />
                        </th>
                        <td className='px-4 py-3'>{o.Product.Name}</td>
                        <td className='px-4 py-3'>{o.Product.Description}</td>
                        <td className='px-4 py-3'>
                          &#x20A6; {o.Product.Price}
                        </td>
                        <td className='px-4 py-3'>{o.Quantity}</td>
                        <td className='px-4 py-3'>&#x20A6; {o.TotalAmount}</td>
                        {addMoney(o.TotalAmount)}
                        <td className='px-4 py-3'>{o.Product.Vendor.Name}</td>
                        <td className='px-4 py-3'>
                          {o.Product.Vendor.ContactAddress}
                        </td>
                        <td className='px-4 py-3'>
                          {o.Name ? (
                            o.Name
                          ) : (
                            <span className='text-red'>Null</span>
                          )}
                        </td>
                        <td className='px-4 py-3'>
                          {o.Weight ? (
                            o.Weight
                          ) : (
                            <span className='text-red'>Null</span>
                          )}
                        </td>
                        <td className='px-4 py-3'>
                          {o.Description ? (
                            o.Description
                          ) : (
                            <span className='text-red'>Null</span>
                          )}
                        </td>
                        <td className='px-4 py-3'>
                          {o?.IsFragile ? (
                            <span className='text-lightgreen'>True</span>
                          ) : (
                            <span className='text-red'>False</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className='text-center'>
                        No item found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <div className='flex justify-end'>
            <div className='p-4'>
              <div className='flex justify-between'>
                <h3 className='text-lg font-semibold'>Total Amount: </h3>
                <h3 className='text-lg font-semibold ml-1'>
                  &#x20A6; {totalMoney}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ViewDelivery