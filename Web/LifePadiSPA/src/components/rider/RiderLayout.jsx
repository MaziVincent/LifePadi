import { Link } from 'react-router-dom'
import SideNav from './SideNav'
import { Outlet } from 'react-router-dom'
import { ClickAwayListener } from '@mui/material'
import { useState } from 'react'
import logo from '../../assets/images/Logo(dark).svg'

const RiderLayout = () => {
    const [aside, setAside] = useState(false);

  return (
    <main>
      <div className='bg-primary dark:bg-darkBg dark:text-primary min-h-[130vh] '>
        <div className='flex justify-between bg-gray-50 text-primary  border-b border-darkMenu px-4 py-2.5 dark:bg-darkMenu fixed left-0 right-0 top-0 z-50 '>
          <ClickAwayListener
            onClickAway={() => {
              setAside(false)
            }}
          >
            <button
              data-drawer-target='drawer-navigation'
              data-drawer-toggle='drawer-navigation'
              aria-controls='drawer-navigation'
              className='p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              onClick={() => setAside((aside) => !aside)}
            >
              <svg
                aria-hidden='true'
                className='w-6 h-6'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                  clipRule='evenodd'
                ></path>
              </svg>

              <svg
                aria-hidden='true'
                className='hidden w-6 h-6'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>

              <span className='sr-only'>Toggle sidebar</span>
            </button>
          </ClickAwayListener>

          <div className=''>
            <Link
              to='#'
              className='flex items-center justify-between gap-5 mr-4'
            >
              <div className='w-10 h-12'>
                {' '}
                <img src={logo} alt='' className='w-full' />{' '}
              </div>
              <span className='self-center text-gray-700 text-2xl font-semibold whitespace-nowrap  dark:text-white'>
                Rider Dashboard
              </span>
            </Link>
          </div>
          <div className='flex  justify-end w-auto items-center'>
            <button className='flex items-center justify-center text-red cursor-pointer focus:border-2  border-red-300 rounded-lg'>
              <svg
                className='w-6 h-6 text-red-500 dark:text-red-500'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2'
                />
              </svg>{' '}
              Logout
            </button>
          </div>
        </div>
        <div className='flex h-screen'>
          <div className=''>
            <SideNav aside={aside} />
          </div>
          <div
            className={`p-2 pl-1 ml-1 md:ml-20 lg:ml-44 py-20 w-full min-h-screen overflow-hidden`}
          >
            <Outlet />
          </div>
        </div>
        <div className='footer fixed bottom-0 dark:border-b border-darkMenu px-4 py-2.5 dark:bg-darkMenu  w-full '>
          <div className='flex justify-center '>
            <span className='text-sm text-gray-500 dark:text-gray-400'>
              &copy; 2024 Listacc All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}

export default RiderLayout