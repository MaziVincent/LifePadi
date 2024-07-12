/* eslint-disable react/prop-types */
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import DateFormater from '../shared/DateFormater'
import useUpdate from '../../hooks/useUpdate'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
}

export const ViewModal = ({ delivery, openViewModal, setOpenViewModal }) => {
  const handleCloseViewModal = () => setOpenViewModal(false)

  return (
    <div>
      <Modal
        open={openViewModal}
        onClose={handleCloseViewModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Delivery details
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            <span className='text-lg font-bold'>Pickup Address: </span>{' '}
            <span className='text-sm'>{delivery.PickupAddress}</span>
          </Typography>
          <Typography>
            <span className='text-lg font-bold'>Delivery Fee: </span> &#x20A6;
            {delivery.DeliveryFee}
          </Typography>
          <Typography>
            <span className='text-lg font-bold'>Delivery Status: </span>{' '}
            {delivery.Status}
          </Typography>
          <Typography>
            <span className='text-lg font-bold'>Delivery Type: </span>{' '}
            {delivery.PickupType}
          </Typography>
          <Typography>
            <span className='text-lg font-bold'>Ordered Date: </span>{' '}
            <span className='text-sm'>
              {DateFormater(delivery.Order.CreatedAt)}
            </span>
          </Typography>
            <Typography>
                <span className='text-lg font-bold'>Order Status: </span>{' '}
                <span className='text-sm'>
                {delivery.Order.Status}
                </span>
            </Typography>
        </Box>
      </Modal>
    </div>
  )
}



export const UpdateModal = ({ delivery, openUpdateModal, setOpenUpdateModal }) => {
  const handleCloseUpdateModal = () => setOpenUpdateModal(false)
    const updateData = useUpdate()

    const handleUpdateStatus = async (deliveryId, status, orderId) => {
        try{

            console.log(deliveryId, status, orderId);
        }catch(error){
            console.log(error)
        }
    }

  return (
    <div>
      <Modal
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Update Delivery
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Are you sure you want to update the status of this delivery?
          </Typography>
          <div className='flex justify-end mt-3 gap-2'>
            <button
              type='button'
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
              onClick={() => handleUpdateStatus(delivery.Id, 'Delivered', delivery.Order.Id)}
            >
              Yes
            </button>
            <button
              type='button'
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
              onClick={handleCloseUpdateModal}
            >
              No
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
