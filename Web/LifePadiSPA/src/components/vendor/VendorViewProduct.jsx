import { useParams } from 'react-router-dom'
import { getCategoriesUrl, getProductUrl } from './vendorUri/VendorURI'
import useFetch from '../../hooks/useFetch'
import { CircularProgress, Typography, Box } from '@mui/material'
import DateFormater from '../shared/DateFormater'
import useAuth from '../../hooks/useAuth'
import { useQuery } from 'react-query'

const VendorViewProduct = () => {
  const { auth } = useAuth()
  const { id } = useParams()
  const fetch = useFetch()

  const getProduct = async (url) => {
    const response = await fetch(url, auth.accessToken)
    return response.data
  }

  const {
    data: product,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ['product', getProductUrl + id],
    queryFn: () => getProduct(getProductUrl.replace('{id}', id)),
    keepPreviousData: true,
    staleTime: 20000,
    refetchOnMount: 'always',
  })

  return (
    <div>
      <section className='bg-darkMenu dark:bg-gray-900 p-1 sm:p-5'>
        <div className='mx-auto max-w-screen-xl px-2 lg:px-3'>
          <div className='bg-white relative shadow-md sm:rounded-lg'>
            <div className='flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4'>
              <div className='w-full md:w-1/2'>
                <Box className='bg-darkHover rounded-md'>
                  <Typography
                    id='modal-modal-title'
                    variant='h6'
                    component='h2'
                    className='pl-2 pt-2'
                  >
                    Product details
                  </Typography>
                  <Box className='h-72 p-3'>
                    {isError && (
                      <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        <span className='text-red-600'>An error occurred</span>
                      </Typography>
                    )}
                    {isLoading && (
                      <div className='p-3 flex flex-row justify-center items-center w-full'>
                        <CircularProgress size={20} />
                      </div>
                    )}
                    {product && (
                      <>
                        <Typography id='modal-modal-description'>
                          <span className='text-lg font-bold'>
                            Product Name:{' '}
                          </span>{' '}
                          <span className='text-sm'>{product.Name}</span>
                        </Typography>
                        <Typography>
                          <span className='text-lg font-bold'>Price: </span>{' '}
                          &#x20A6;
                          {product.Price}
                        </Typography>
                        <Typography>
                          <span className='text-lg font-bold'>
                            Product Status:{' '}
                          </span>{' '}
                          {product.Status ? (
                            <span className='text-lightgreen'>
                              <i>Active</i>
                            </span>
                          ) : (
                            <span className='text-red'>
                              <i>Inactive</i>
                            </span>
                          )}
                        </Typography>
                        <Typography>
                          <span className='text-lg font-bold'>
                            Product Description:{' '}
                          </span>{' '}
                          {product.Description}
                        </Typography>
                        <Typography>
                          <span className='text-lg font-bold'>
                            Created Time:{' '}
                          </span>{' '}
                          {DateFormater(product.CreatedAt)}
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
              </div>
              <div className='w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0'>
                <Box className='bg-darkHover rounded-md'>
                  <Typography
                    id='modal-modal-title'
                    variant='h6'
                    component='h2'
                    className='px-2 pt-2'
                  >
                    Product Image
                  </Typography>
                  <Box className='h-72 p-3'>
                    {isError && (
                      <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        <span className='text-red-600'>An error occurred</span>
                      </Typography>
                    )}
                    {isLoading && (
                      <div className='p-3 flex flex-row justify-center items-center w-full'>
                        <CircularProgress size={20} />
                      </div>
                    )}
                    {product && (
                      <>
                        <div className='w-full'>
                          <img
                            className='w-full h-64 object-cover rounded-md'
                            src={product.ProductImgUrl}
                            alt=''
                          />
                        </div>
                      </>
                    )}
                  </Box>
                </Box>
              </div>
            </div>
            <div className='overflow-x-auto'>
              <h3 className='text-lg font-semibold p-4'>Product Reviews</h3>
              <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th scope='col' className='px-4 py-3'>
                      Customer Name
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Customer Email
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Rating
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Review
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr className=''>
                      <td colSpan={3} className=''>
                        <div className='p-3 flex flex-row justify-center items-center w-full'>
                          <CircularProgress />
                        </div>
                      </td>
                    </tr>
                  )}
                  {product &&
                    product.ProductReview?.map((pr) => (
                      <tr className='border-b dark:border-gray-700' key={pr.Id}>
                        <th scope='row' className='px-4 py-3'>
                          {pr.Customer.FirstName} {pr.Customer.LastName}
                        </th>
                        <th scope='row' className='px-4 py-3'>
                          {pr.Customer.Email}
                        </th>
                        <td className='px-4 py-3'>{pr.Rating}</td>
                        <td className='px-4 py-3'>{pr.Body}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <div className='flex justify-end'>
            <div className='p-4'>
              <div className='flex justify-between'>
                <h3 className='text-lg font-semibold'>Total Rating: </h3>
                <h3 className='text-lg font-semibold ml-1'> {}</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default VendorViewProduct
