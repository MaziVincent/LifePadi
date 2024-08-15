/* eslint-disable react/prop-types */
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import DateFormater from '../shared/DateFormater'
import useUpdate from '../../hooks/useUpdate'
import useDelete from '../../hooks/useDelete'
import useAuth from '../../hooks/useAuth'
import useFetch from '../../hooks/useFetch'
import { useQuery } from 'react-query'
import {
  getCategoriesUrl,
  createProductUrl,
  toggolProductStatusUrl,
  deleteProductUrl,
  updateProductUrl,
} from './vendorUri/VendorURI'
import { useState } from 'react'
import usePost from '../../hooks/usePost'
import { WindowSharp } from '@mui/icons-material'

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
  const fetchdata = useFetch()
  const [productCategory, setProductCategory] = useState(product.Category.Id)
  const [name, setName] = useState(product.Name)
  const [price, setPrice] = useState(product.Price)
  const [description, setDescription] = useState(product.Description)
  const [tag, setTag] = useState(product.Tag)
  const [imgUrl] = useState(product.ProductImgUrl)
  const [image, setImage] = useState(null)
  let vendoId = auth.user.Id
  const [response, setResponse] = useState(null)

  const fetchCategories = async (url) => {
    const response = await fetchdata(url, auth.accessToken)
    return response.data
  }

  const {
    data: categories,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: 'categories',
    queryFn: () => fetchCategories(getCategoriesUrl),
    keepPreviousData: true,
    staleTime: 20000,
    refetchOnMount: 'always',
  })

  const handleUpdateProduct = async (productId) => {
    console.log(productId)
    const formData = new FormData()
    formData.append('Image', image)
    formData.append('Name', name)
    formData.append('Price', Number(price))
    formData.append('Description', description)
    formData.append('Tag', tag)
    formData.append('CategoryId', Number(productCategory))
    formData.append('VendorId', vendoId)
      const updatePUrl = updateProductUrl.replace("{id}", productId)
    try {
        const res = await updateData(
          updatePUrl,
          formData,
          auth.accessToken
        )
        setResponse(res.data)
        setTimeout(() => {
          handleCloseUpdateModal()
          Window.location.refresh()
        }, 2000);
    } catch (error) {
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
        {response && <span className='text-lightgreen p-2'>{response}</span>}
        {isError && <span className='text-red p-2'>{isError}</span>}
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Update Product
          </Typography>
          <div className='mt-2'>
            <form onSubmit={(e) => handleUpdateProduct(e)} method='post'>
              <div className=''>
                <label
                  htmlFor='product-name'
                  className='block text-sm font-medium text-gray-700'
                >
                  Product Name
                </label>
                <div className='mt-1'>
                  <input
                    type='text'
                    name='name'
                    id='product-name'
                    autoComplete='product-name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className='shadow-sm text-lg px-5 py-2 sm:text-sm focus:ring-primary focus:border-primary block w-full border-gray-300 rounded-md'
                  />
                </div>
              </div>
              <div className='mt-4'>
                <label
                  htmlFor='product-price'
                  className='block text-sm font-medium text-gray-700'
                >
                  Product Price
                </label>
                <div className='mt-1'>
                  <input
                    type='number'
                    name='price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    id='product-price'
                    autoComplete='product-price'
                    required
                    className='shadow-sm text-lg px-5 py-2 sm:text-sm focus:ring-primary focus:border-primary block w-full border-gray-300 rounded-md'
                  />
                </div>
              </div>
              <div className='mt-4'>
                <label
                  htmlFor='product-description'
                  className='block text-sm font-medium text-gray-700'
                >
                  Product Description
                </label>
                <div className='mt-1'>
                  <textarea
                    name='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id='product-description'
                    autoComplete='product-description'
                    required
                    className='shadow-sm text-lg px-5 py-2 sm:text-sm focus:ring-primary focus:border-primary block w-full border-gray-300 rounded-md'
                  ></textarea>
                </div>
              </div>
              <div className='mt-4'>
                <label
                  htmlFor='product-tag'
                  className='block text-sm font-medium text-gray-700'
                >
                  Product Tag
                </label>
                <div className='mt-1'>
                  <input
                    type='text'
                    name='tag'
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    id='product-tag'
                    autoComplete='product-tag'
                    required
                    className='shadow-sm text-lg px-5 py-2 sm:text-sm focus:ring-primary focus:border-primary block w-full border-gray-300 rounded-md'
                  />
                </div>
              </div>
              <div className='mt-4'>
                <label
                  htmlFor='product-category'
                  className='block text-sm font-medium text-gray-700'
                >
                  Product Category
                </label>
                <div className='mt-1'>
                  <select
                    name='category'
                    onChange={(e) => setProductCategory(e.target.value)}
                    id='product-category'
                    autoComplete='product-category'
                    required
                    className='shadow-sm text-lg px-5 py-2 sm:text-sm focus:ring-primary focus:border-primary block w-full border-gray-300 rounded-md'
                  >
                    {isLoading && <option>Loading...</option>}
                    {categories &&
                      categories.map((category) => (
                        <>
                          {Number(category.Id) === Number(productCategory) ? (
                            <option
                              key={category.Id}
                              value={category.Id}
                              selected
                            >
                              {category.Name}
                            </option>
                          ) : (
                            <option key={category.Id} value={category.Id}>
                              {category.Name}
                            </option>
                          )}
                        </>
                      ))}
                  </select>
                </div>
              </div>
              <div className='mt-4'>
                <label
                  htmlFor='product-image'
                  className='block text-sm font-medium text-gray-700'
                >
                  Product Image
                </label>
                <div className='mt-1 flex justify-center items-center gap-2'>
                  <div>
                    <input
                      type='file'
                      name='image'
                      onChange={(e) => setImage(e.target.files[0])}
                      id='product-image'
                      autoComplete='product-image'
                      accept='image/png, image/jpeg'
                      required
                      className='shadow-sm text-lg px-5 py-2 sm:text-sm focus:ring-primary focus:border-primary block w-full border-gray-300 rounded-md'
                    />
                  </div>
                  <div className='w-56 '>
                    <span className='block text-center'>Current Image</span>
                    <div className=''>
                      <img src={imgUrl} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex justify-end mt-3 gap-2'>
                <button
                  type='submit'
                  className='bg-secondary hover:bg-lightgreen text-white font-bold py-2 px-4 rounded'
                >
                  Create Product
                </button>
                <button
                  type='button'
                  className='bg-graybg text-darkBg hover:bg-red hover:text-primary font-bold py-2 px-4 rounded'
                  onClick={handleCloseUpdateModal}
                >
                  Cancle
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export const DeleteModal = ({
  productId,
  openDeleteModal,
  setOpenDeleteModal,
}) => {
  const handleCloseDeleteModal = () => setOpenDeleteModal(false)
  const [result, setResult] = useState(null)
  const deleteData = useDelete()
  const { auth } = useAuth()
  const handleDeleteProduct = async (productId) => {
    const url = deleteProductUrl.replace('{id}', productId)
    const response = await deleteData(url, auth.accessToken)
    console.log(response.data)
    setResult(response.data)
    setTimeout(() => {
      handleCloseDeleteModal()
      window.location.reload()
    }, 2000)
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
          {result && <p className='text-lightgreen'>{result}</p>}
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

export const ToggleStatusModal = ({
  product,
  openToggleStatusModal,
  setOpenToggleStatusModal,
}) => {
  const handleCloseToggleModal = () => setOpenToggleStatusModal(false)
  const [response, setResponse] = useState(null)
  const updateData = useUpdate()
  const { auth } = useAuth()
  const handleToggleProductStatus = async (productId) => {
    const url = toggolProductStatusUrl.replace('{id}', productId)
    const res = await updateData(url, null, auth.accessToken)
    // console.log(res.data)
    setResponse(res.data)
    setTimeout(() => {
      handleCloseToggleModal()
      window.location.reload()
    }, 2000);
  }
  return (
    <div>
      <Modal
        open={openToggleStatusModal}
        onClose={handleCloseToggleModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          {response && (<p className='text-lightgreen'>{response}</p>)}
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {product.Status ? 'Deactivate' : 'Activate'} Product
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Are you sure you want to{' '}
            {product.Status ? 'deactivate' : 'activate'} this product?
          </Typography>
          <div className='flex justify-end mt-3 gap-2'>
            <button
              type='button'
              className='bg-secondary hover:bg-lightgreen text-white font-bold py-2 px-4 rounded'
              onClick={() => handleToggleProductStatus(product.Id)}
            >
              Yes
            </button>
            <button
              type='button'
              className='bg-graybg text-darkBg hover:bg-red hover:text-primary font-bold py-2 px-4 rounded'
              onClick={handleCloseToggleModal}
            >
              No
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

const addProductStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '80%',
  maxHeight: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
}

export const AddProductModal = ({
  openAddProductModal,
  setOpenAddProductModal,
}) => {
  const { auth } = useAuth()
  const fetchdata = useFetch()
  const handleCloseAddProductModal = () => setOpenAddProductModal(false)
  const [category, setCategory] = useState(null)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [tag, setTag] = useState('')
  const [image, setImage] = useState(null)
  let vendoId = auth.user.Id
  const postData = usePost()
  const [response, setResponse] = useState(null)

  const fetchCategories = async (url) => {
    const response = await fetchdata(url, auth.accessToken)
    return response.data
  }

  const {
    data: categories,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: 'categories',
    queryFn: () => fetchCategories(getCategoriesUrl),
    keepPreviousData: true,
    staleTime: 20000,
    refetchOnMount: 'always',
  })
  if (categories) {
    console.log(categories)
  }
  const handleAddProduct = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('Image', image)
    formData.append('Name', name)
    formData.append('Price', Number(price))
    formData.append('Description', description)
    formData.append('Tag', tag)
    formData.append('CategoryId', Number(category))
    formData.append('VendorId', vendoId)

    let result = await postData(createProductUrl, formData, auth.accessToken)
    console.log('result', result)
    setResponse(result)
    setTimeout(() => {
      handleCloseAddProductModal()
    }, 3000)
  }
  return (
    <div>
      <Modal
        open={openAddProductModal}
        onClose={handleCloseAddProductModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={addProductStyle}>
          {/* {result && <div>{result}</div>} */}
          {response && (
            <div className='bg-lightgreen'>
              <h4>Successfuly added</h4>
            </div>
          )}
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Add Product
          </Typography>
          {/* <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Are you sure you want to add this product?
          </Typography> */}
          <div className='mt-2'>
            <form onSubmit={(e) => handleAddProduct(e)} method='post'>
              <div className=''>
                <label
                  htmlFor='product-name'
                  className='block text-sm font-medium text-gray-700'
                >
                  Product Name
                </label>
                <div className='mt-1'>
                  <input
                    type='text'
                    name='name'
                    id='product-name'
                    autoComplete='product-name'
                    onChange={(e) => setName(e.target.value)}
                    required
                    className='shadow-sm text-lg px-5 py-2 sm:text-sm focus:ring-primary focus:border-primary block w-full border-gray-300 rounded-md'
                  />
                </div>
              </div>
              <div className='mt-4'>
                <label
                  htmlFor='product-price'
                  className='block text-sm font-medium text-gray-700'
                >
                  Product Price
                </label>
                <div className='mt-1'>
                  <input
                    type='number'
                    name='price'
                    onChange={(e) => setPrice(e.target.value)}
                    id='product-price'
                    autoComplete='product-price'
                    required
                    className='shadow-sm text-lg px-5 py-2 sm:text-sm focus:ring-primary focus:border-primary block w-full border-gray-300 rounded-md'
                  />
                </div>
              </div>
              <div className='mt-4'>
                <label
                  htmlFor='product-description'
                  className='block text-sm font-medium text-gray-700'
                >
                  Product Description
                </label>
                <div className='mt-1'>
                  <textarea
                    name='description'
                    onChange={(e) => setDescription(e.target.value)}
                    id='product-description'
                    autoComplete='product-description'
                    required
                    className='shadow-sm text-lg px-5 py-2 sm:text-sm focus:ring-primary focus:border-primary block w-full border-gray-300 rounded-md'
                  ></textarea>
                </div>
              </div>
              <div className='mt-4'>
                <label
                  htmlFor='product-tag'
                  className='block text-sm font-medium text-gray-700'
                >
                  Product Tag
                </label>
                <div className='mt-1'>
                  <input
                    type='text'
                    name='tag'
                    onChange={(e) => setTag(e.target.value)}
                    id='product-tag'
                    autoComplete='product-tag'
                    required
                    className='shadow-sm text-lg px-5 py-2 sm:text-sm focus:ring-primary focus:border-primary block w-full border-gray-300 rounded-md'
                  />
                </div>
              </div>
              <div className='mt-4'>
                <label
                  htmlFor='product-category'
                  className='block text-sm font-medium text-gray-700'
                >
                  Product Category
                </label>
                <div className='mt-1'>
                  <select
                    name='category'
                    onChange={(e) => setCategory(e.target.value)}
                    id='product-category'
                    autoComplete='product-category'
                    required
                    className='shadow-sm text-lg px-5 py-2 sm:text-sm focus:ring-primary focus:border-primary block w-full border-gray-300 rounded-md'
                  >
                    {isLoading ? (
                      <option>Loading...</option>
                    ) : (
                      <option value=''>Select Category</option>
                    )}

                    {categories &&
                      categories.map((category) => (
                        <option key={category.Id} value={category.Id}>
                          {category.Name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className='mt-4'>
                <label
                  htmlFor='product-image'
                  className='block text-sm font-medium text-gray-700'
                >
                  Product Image
                </label>
                <div className='mt-1'>
                  <input
                    type='file'
                    name='image'
                    onChange={(e) => setImage(e.target.files[0])}
                    id='product-image'
                    autoComplete='product-image'
                    accept='image/png, image/jpeg'
                    required
                    className='shadow-sm text-lg px-5 py-2 sm:text-sm focus:ring-primary focus:border-primary block w-full border-gray-300 rounded-md'
                  />
                </div>
              </div>
              <div className='flex justify-end mt-3 gap-2'>
                <button
                  type='submit'
                  className='bg-secondary hover:bg-lightgreen text-white font-bold py-2 px-4 rounded'
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
