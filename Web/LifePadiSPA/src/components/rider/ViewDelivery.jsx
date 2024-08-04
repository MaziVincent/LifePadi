import { useParams, Link } from 'react-router-dom'
import { getDeliveryUrl } from './rider_uri/RiderURI'
import { CircularProgress } from '@mui/material'
import useFetch from '../../hooks/useFetch'
import useAuth from '../../hooks/useAuth'
import { useQuery } from 'react-query'

const ViewDelivery = () => {
    const { auth } = useAuth()
    const fetch = useFetch()

    const { id } = useParams()
    console.log(id)
    const url = getDeliveryUrl.replace('{id}', id)
    console.log(url);
    
    const geDelivery = async (url) => {
        const response = await fetch(url, auth.accessToken)
        return response.data
    }

    const { 
        data: delivery,
        isError,
        isLoading,
        isSuccess
     } = useQuery({
        queryKey: ['delivery'],
        queryFn: () => geDelivery(url),
        staleTime: 20000,
        keepPreviousData: true,
        refetchOnMount: true,
    })

    if (delivery) {
        console.log(delivery)
    }


  return (
    <div>
      <section className='bg-darkMenu dark:bg-gray-900 p-3 sm:p-5'>
        <div className='mx-auto max-w-screen-xl px-2 lg:px-12'>
          <div className='bg-white relative shadow-md sm:rounded-lg'>
            <div className='flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4'>
              <div className='w-full md:w-1/2'></div>
              <div className='w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0'></div>
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
                      Weight
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Item Name
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
                      <td colSpan={6} className=''>
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
                        <td className='px-4 py-3'>Vendor Name</td>
                        <td className='px-4 py-3'>Vendor Address</td>
                        <td className='px-4 py-3'>{o.Weight}</td>
                        <td className='px-4 py-3'>{o.Name}</td>
                        <td className='px-4 py-3'>{o.Description}</td>
                        <td className='px-4 py-3'>
                          {o?.IsFragile ? <span className='text-lightgreen'>True</span> : <span className='text-red'>False</span>}
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
      </section>
    </div>
  )
}

export default ViewDelivery