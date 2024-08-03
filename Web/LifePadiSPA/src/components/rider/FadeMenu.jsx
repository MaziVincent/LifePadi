/* eslint-disable react/prop-types */
import { useState } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Fade from '@mui/material/Fade'
import { Link } from 'react-router-dom'
import { UpdateModal } from './RiderModal'

const FadeMenu = ({delivery}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [openViewModal, setOpenViewModal] = useState(false)
    const handleOpenViewModal = () => setOpenViewModal(true)
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    const handleOpenUpdateModal = () => setOpenUpdateModal(true)
  return (
    <div>
      <Button
        id='fade-button'
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <svg
          className='w-5 h-5'
          aria-hidden='true'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z' />
        </svg>
      </Button>
      <Menu
        id='fade-menu'
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        // sx={{ width: '5rem'}}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>
          <Link to={`delivery/${delivery.Id}`} >
            View
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to='#' onClick={handleOpenUpdateModal}>Update</Link>
        </MenuItem>
      </Menu>
      {/* <ViewModal delivery={delivery} openViewModal={openViewModal} setOpenViewModal={setOpenViewModal} /> */}
      <UpdateModal delivery={delivery} openUpdateModal={openUpdateModal} setOpenUpdateModal={setOpenUpdateModal} />
    </div>
  )
}

export default FadeMenu