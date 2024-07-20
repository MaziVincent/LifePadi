import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { green } from '@mui/material/colors';

// const options = [
//   {icon:'line-icon-Eye text-green-700 text-xl', text:'View'},
//   {icon:'line-icon-Pen-5 text-blue-700 text-xl', text:'Edit'},
//   {icon:'line-icon-Close text-red-700 text-xl', text:'Delete'} 
  
// ];

// const ITEM_HEIGHT = 48;

export default function LongMenu( {view,edit, id}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='rounded-lg ' >
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon sx={{color:green[500]}} />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        
      >
       
          <MenuItem  selected={true} onClick={() => {
            
            handleClose(); 
            view(id)
            }}>
            <div className='flex gap-2  '> <i className='line-icon-Eye text-lightgreen text-xl'></i><span>View </span></div>
          </MenuItem>

          <MenuItem onClick={ () => {
            handleClose();
            edit({type:'edit'});
            edit({type:'id', payload:id})}}
            >
            <div className='flex gap-2 '> <i className='line-icon-Pen-5 text-blue text-xl'></i><span>Edit </span></div>
          </MenuItem>

          {/* <MenuItem onClick={handleClose}>
            <div className='flex gap-2 '> <i className='line-icon-Close text-red text-xl'></i><span>Delete </span></div>
          </MenuItem> */}
        
      </Menu>
    </div>
  );
}