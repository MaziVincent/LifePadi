/* eslint-disable react/prop-types */
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import DateFormater from '../shared/DateFormater'
import useUpdate from '../../hooks/useUpdate'
import useAuth from '../../hooks/useAuth'


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

export const ViewModal = ({ product, openViewModal, setOpenViewModal }) => {
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
            Product details
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            <span className='text-lg font-bold'>Category Name: </span>{' '}
            <span className='text-sm'>{product.Category.Name}</span>
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            <span className='text-lg font-bold'>Product Name: </span>{' '}
            <span className='text-sm'>{product.Name}</span>
          </Typography>
          <Typography>
            <span className='text-lg font-bold'>Price: </span> &#x20A6;
            {product.Price}
          </Typography>
          <Typography>
            <span className='text-lg font-bold'>Product Status: </span>{' '}
            {product.Status ? 'Active' : 'Inactive'}
          </Typography>
          <Typography>
            <span className='text-lg font-bold'>Description: </span>{' '}
            {product.Description}
          </Typography>
          <Typography>
            <span className='text-lg font-bold'>Product Tag: </span>{' '}
            {product.Tag}
          </Typography>
          <Typography>
            <span className='text-lg font-bold'>Created Date: </span>{' '}
            <span className='text-sm'>{DateFormater(product.CreatedAt)}</span>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export const UpdateModal = ({
  product,
  openUpdateModal,
  setOpenUpdateModal,
}) => {
  const handleCloseUpdateModal = () => setOpenUpdateModal(false)
  const updateData = useUpdate()
  const { auth } = useAuth()

  const handleUpdateProduct = async (productId) => {
    console.log(productId);
    // const url =
    //   updateDeliveryOrderStatusUrl +
    //   `?orderId=${delivery.Order.Id}&deliveryId=${delivery.Id}&deliveryStatus=Delivered`
    // const deliveryStatus = 'Delivered'
    try {
    //   const response = await updateData(
    //     url,
    //     {
    //       deliveryId,
    //       orderId,
    //       deliveryStatus,
    //     },
    //     auth.accessToken
    //   )
    //   console.log(response)
      // console.log(deliveryId, orderId);
    } catch (error) {
      console.log(error)
    }
    handleCloseUpdateModal()
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
            Update Product
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Are you sure you want to update this product?
          </Typography>
          <div className='flex justify-end mt-3 gap-2'>
            
            <button
              type='button'
              className='bg-graybg text-darkBg hover:bg-red hover:text-primary font-bold py-2 px-4 rounded'
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

export const DeleteModal = ({ productId, openDeleteModal, setOpenDeleteModal }) => {
    const handleCloseDeleteModal = () => setOpenDeleteModal(false)
    const handleDeleteProduct = (productId) => {
        console.log(productId);
    }
  return (
    <div>
      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Delete Product
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Are you sure you want to delete this product?
          </Typography>
          <div className='flex justify-end mt-3 gap-2'>
            <button
              type='button'
              className='bg-secondary hover:bg-lightgreen text-white font-bold py-2 px-4 rounded'
              onClick={() => handleDeleteProduct(productId)}
            >
              Yes
            </button>
            <button
              type='button'
              className='bg-graybg text-darkBg hover:bg-red hover:text-primary font-bold py-2 px-4 rounded'
              onClick={handleCloseDeleteModal}
            >
              No
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}