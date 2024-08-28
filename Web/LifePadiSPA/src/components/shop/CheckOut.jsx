import useCart from '../../hooks/useCart'
import { Modal } from '@mui/material'

const CheckOut = () => {
  const { state, dispatch } = useCart()
  const handleMakePayment = (e) => {
    e.preventDefault()
    const data = {
      Amount: state.total,
      DeliveryFee: state.deliveryFee,
      VoucherCode: '',
      OrderId: 6,
      TotalAmount: state.total - state.deliveryFee,
    }
    
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
                Proceed to payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default CheckOut
