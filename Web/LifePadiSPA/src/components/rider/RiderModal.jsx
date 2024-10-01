/* eslint-disable react/prop-types */
<<<<<<< HEAD
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DateFormater from "../shared/DateFormater";
import useUpdate from "../../hooks/useUpdate";
import useAuth from "../../hooks/useAuth";
import { updateDeliveryOrderStatusUrl } from "./rider_uri/RiderURI";
import { CloseOutlined } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

export const ViewModal = ({ delivery, openViewModal, setOpenViewModal }) => {
  const handleCloseViewModal = () => setOpenViewModal(false);
  console.log(delivery);
=======
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import DateFormater from '../shared/DateFormater'
import useUpdate from '../../hooks/useUpdate'
import useAuth from '../../hooks/useAuth'
import { updateDeliveryOrderStatusUrl } from './rider_uri/RiderURI'
import { CloseOutlined } from '@mui/icons-material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
}

export const ViewModal = ({ delivery, openViewModal, setOpenViewModal }) => {
  const handleCloseViewModal = () => setOpenViewModal(false)
<<<<<<< HEAD
>>>>>>> d8a3578 (created a modal for view and update)
=======
console.log(delivery);
>>>>>>> 556b5a3 (added a view page for vewing delivery)

  return (
    <div>
      <Modal
        open={openViewModal}
        onClose={handleCloseViewModal}
<<<<<<< HEAD
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Delivery details
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
            >
              <span className="text-lg font-bold">Pickup Address: </span>{" "}
              <span className="text-sm">{delivery.PickupAddress}</span>
            </Typography>
            <Typography>
              <span className="text-lg font-bold">Delivery Fee: </span> &#x20A6;
              {delivery.DeliveryFee}
            </Typography>
            <Typography>
              <span className="text-lg font-bold">Delivery Status: </span>{" "}
              {delivery.Status}
            </Typography>
            <Typography>
              <span className="text-lg font-bold">Delivery Type: </span>{" "}
              {delivery.PickupType}
            </Typography>
            <Typography>
              <span className="text-lg font-bold">Delivery Time: </span>{" "}
              {DateFormater(delivery.CreatedAt)}
            </Typography>
            <Typography>
              <span className="text-lg font-bold">Ordered Date: </span>{" "}
              <span className="text-sm">
                {DateFormater(delivery.Order.CreatedAt)}
              </span>
            </Typography>
            <Typography>
              <span className="text-lg font-bold">Order Status: </span>{" "}
              <span className="text-sm">{delivery.Order.Status}</span>
            </Typography>
            {delivery.Order.IsDelivered ? (
              <Typography>
                <span className="text-lg font-bold">Delivery time: </span>{" "}
                <span className="text-sm">
                  {DateFormater(delivery.UpdatedAt)}
                </span>
              </Typography>
            ) : (
              <Typography>
                <span className="text-lg font-bold">Delivery time: </span>{" "}
                <span className="text-red-600">Not yet delivered</span>
              </Typography>
            )}
          </Box>
          <Box>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Order details
            </Typography>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3"
                    >
                      Pick Up Address
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3"
                    >
                      Delivery Fee
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3"
                    >
                      Delivery Status
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3"
                    >
                      Order Status
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3"
                    >
                      IsDelivered
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3"
                    >
                      Customer Name
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3"
                    >
                      Customer Phone
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3"
                    >
                      <span className="">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {riderDeliveriesLoading ? (
                    <tr className="">
                      <td
                        colSpan={6}
                        className=""
                      >
                        <div className="p-3 flex flex-row justify-center items-center w-full">
                          <CircularProgress />
                        </div>
                      </td>
                    </tr>
                  ) : (
                    riderDeliveries.result.map((delivery) => (
                      <tr
                        className="border-b dark:border-gray-700"
                        key={delivery.Id}
                      >
                        <th
                          scope="row"
                          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {delivery.PickupAddress}
                        </th>
                        <td className="px-4 py-3">
                          &#x20A6; {delivery.DeliveryFee}
                        </td>
                        <td className="px-4 py-3">{delivery.Status}</td>
                        <td className="px-4 py-3">{delivery.Order.Status}</td>
                        <td className="px-4 py-3">
                          {delivery.Order?.IsDelivered ? "True" : "False"}
                        </td>
                        <td className="px-4 py-3">
                          {delivery.Order.Customer.LastName +
                            " " +
                            delivery.Order.Customer.FirstName}
                        </td>
                        <td className="px-4 py-3">
                          {delivery.Order.Customer.PhoneNumber}
                        </td>
                        <td className="px-4 py-3 flex items-center justify-end dropdown">
                          <FadeMenu delivery={delivery} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export const UpdateModal = ({
  delivery,
  openUpdateModal,
  setOpenUpdateModal,
}) => {
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);
  const updateData = useUpdate();
  const { auth } = useAuth();

  const handleUpdateStatus = async (deliveryId, orderId) => {
    const url =
      updateDeliveryOrderStatusUrl +
      `?orderId=${delivery.Order.Id}&deliveryId=${delivery.Id}&deliveryStatus=Delivered`;
    const deliveryStatus = "Delivered";
    try {
      const response = await updateData(
        url,
        {
          deliveryId,
          orderId,
          deliveryStatus,
        },
        auth.accessToken
      );
      console.log(response);
      // console.log(deliveryId, orderId);
    } catch (error) {
      console.log(error);
    }
    handleCloseUpdateModal();
  };
=======
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Box>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Delivery details
            </Typography>
<<<<<<< HEAD
            {(delivery.Order.Status === 'Successful' && delivery.Status == 'Delivered') ? (
                <Typography>
                    <span className='text-lg font-bold'>Delivery time: </span>{' '}
                    <span className='text-sm'>
                        {DateFormater(delivery.UpdatedAt)}
                    </span>
                </Typography>
=======
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
              <span className='text-lg font-bold'>Delivery Time: </span>{' '}
              {DateFormater(delivery.CreatedAt)}
            </Typography>
            <Typography>
              <span className='text-lg font-bold'>Ordered Date: </span>{' '}
              <span className='text-sm'>
                {DateFormater(delivery.Order.CreatedAt)}
              </span>
            </Typography>
            <Typography>
              <span className='text-lg font-bold'>Order Status: </span>{' '}
              <span className='text-sm'>{delivery.Order.Status}</span>
            </Typography>
            {delivery.Order.IsDelivered ? (
              <Typography>
                <span className='text-lg font-bold'>Delivery time: </span>{' '}
                <span className='text-sm'>
                  {DateFormater(delivery.UpdatedAt)}
                </span>
              </Typography>
>>>>>>> 556b5a3 (added a view page for vewing delivery)
            ) : (
              <Typography>
                <span className='text-lg font-bold'>Delivery time: </span>{' '}
                <span className='text-red-600'>Not yet delivered</span>
              </Typography>
            )}
          </Box>
          <Box>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Order details
            </Typography>
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
                  {riderDeliveriesLoading ? (
                    <tr className=''>
                      <td colSpan={6} className=''>
                        <div className='p-3 flex flex-row justify-center items-center w-full'>
                          <CircularProgress />
                        </div>
                      </td>
                    </tr>
                  ) : (
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
                        <td className='px-4 py-3 flex items-center justify-end dropdown'>
                          <FadeMenu delivery={delivery} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}



export const UpdateModal = ({ delivery, openUpdateModal, setOpenUpdateModal }) => {
  const handleCloseUpdateModal = () => setOpenUpdateModal(false)
    const updateData = useUpdate()
    const { auth } = useAuth()
    
    const handleUpdateStatus = async (deliveryId, orderId) => {
      const url = updateDeliveryOrderStatusUrl + `?orderId=${delivery.Order.Id}&deliveryId=${delivery.Id}&deliveryStatus=Delivered`
      const deliveryStatus = 'Delivered'
        try{
            const response = await updateData(url, {
                deliveryId,
                orderId,
                deliveryStatus,
            }, auth.accessToken)
            console.log(response)
            // console.log(deliveryId, orderId);
        }catch(error){
            console.log(error)
        }
        handleCloseUpdateModal()
    }
>>>>>>> d8a3578 (created a modal for view and update)

  return (
    <div>
      <Modal
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
<<<<<<< HEAD
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex justify-center items-center h-svh">
          <div className="w-3/4 md:w-2/4 bg-lightGray flex flex-col p-5 rounded-2xl  items-center justify-center  ">
            <div className="flex justify-end w-full p-4">
              <button
                onClick={handleCloseUpdateModal}
                className="p-2 cursor-pointer border-2 rounded-full"
              >
                {" "}
                <CloseOutlined />{" "}
              </button>
            </div>
            <div>
              <h2 className="text-2xl text-center font-bold">
                Update Delivery
              </h2>
              <p className="px-3 text-center">
                Are you sure you want to update the status of this delivery to{" "}
                <span className="text-background"> Delivered </span>?
              </p>
              <div className="flex justify-center mt-3 gap-2 px-5">
                <button
                  type="button"
                  className="bg-secondary hover:bg-lightgreen text-white font-bold py-2 px-4 rounded"
                  onClick={() =>
                    handleUpdateStatus(delivery.Id, delivery.Order.Id)
                  }
                  disabled={delivery.Order.IsDelivered}
                >
                  {delivery.Order.IsDelivered ? "Delivered" : "Yes"}
                </button>
                <button
                  type="button"
                  className="bg-graybg text-darkBg hover:bg-red hover:text-primary font-bold py-2 px-4 rounded"
                  onClick={handleCloseUpdateModal}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
=======
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div className='w-full bg-lightGray flex flex-col  items-center justify-center h-svh '>
          <div className='flex justify-end w-full p-4'>
            <button onClick={handleCloseUpdateModal} className='p-2 cursor-pointer border-2 rounded-full'> <CloseOutlined /> </button>
          </div>
         <div>
         <h2 className='text-2xl text-center font-bold' >
            Update Delivery
          </h2>
          <p className='px-3 text-center'>
            Are you sure you want to update the status of this delivery to <span className='text-background'> Delivered </span>?
          </p>
          <div className='flex justify-center mt-3 gap-2 px-5'>
            <button
              type='button'
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
              onClick={() => handleUpdateStatus(delivery.Id, delivery.Order.Id)}
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
         </div>
        </div>
      </Modal>
    </div>
  )
}
>>>>>>> d8a3578 (created a modal for view and update)
