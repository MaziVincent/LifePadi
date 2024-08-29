import useCart from '../../hooks/useCart'
import { Modal } from '@mui/material'
import usePost from '../../hooks/usePost'
import baseUrl from '../../api/baseUrl'
import useAuth from '../../hooks/useAuth'
import CircularProgress from '@mui/material/CircularProgress'
import { useState } from 'react'

const CheckOut = () => {
  const { state, dispatch } = useCart()
  const postData = usePost()
  const url = `${baseUrl}transaction/initiate`
  const { auth } = useAuth()
  const [loading, setLoading] = useState(false)
  // console.log(state);
  
  const handleMakePayment = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = {
      Amount: state.total,
      DeliveryFee: state.deliveryFee,
      VoucherCode: '',
      OrderId: state.order.Id,
      TotalAmount: state.total - state.deliveryFee,
    }

    const res = await postData(url, data, auth.token)
    // console.log(res)

    if (res.status == 200) {
      setLoading(false)
      window.location.href = res.data.link
      // window.open(res.data.link, '_blank')
      // state.checkOut = false
    } else {
      alert(res.response.data)
      setLoading(false)
    }
    // setTimeout(() => {
    // }, 2000);
  }
  return (
    <Modal
      open={state.checkOut}
      onClose={() => {
        dispatch({ type: 'checkOut' })
      }}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <div
        id='defaultModal'
        className=' overflow-y-auto overflow-x-hidden absolute  top-20  z-50 justify-center items-center  w-full h-full pb-24 '
      >
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen   lg:py-0 '>
          <div className='w-full bg-primary rounded-lg p-5 shadow md:mt-0 sm:max-w-md  dark:bg-darkMenu  dark:text-primary overflow-y-auto '>
            <h3 className='text-lg font-semibold text-secondary dark:text-gray-50'>
              Payment
            </h3>

            {/* <!-- Modal body --> */}

            <div className=' w-full'>
              <div className='bg-graybg dark:bg-darkMenu'>
                <p>
                  {' '}
                  <span> Total Amount </span> <span>{state.total}</span>
                </p>
              </div>

              <button
                onClick={handleMakePayment}
                type='submit'
                disabled={loading}
                className={`inline-flex items-center text-background dark:text-gray-50 bg-primary-700 ring-2 hover:ring-background hover:bg-graybg focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-darkHover dark:focus:ring-primary-800`}
              >
                <svg
                  className='mr-1 -ml-1 w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                {loading ? (
                  <CircularProgress size={20} />
                ) : (
                  'Proceed to payment'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default CheckOut
