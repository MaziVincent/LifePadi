import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import baseUrl from '../../api/baseUrl'

const PaymentResponse = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [paymentStatus, setPaymentStatus] = useState(null)

    useEffect(() => {
      // Extract query parameters from the URL
      const queryParams = new URLSearchParams(location.search)
      const status = queryParams.get('status')
      const transactionId = queryParams.get('transaction_id')
      const tx_ref = queryParams.get('tx_ref')
      const url = `${baseUrl}/transaction/confirmPayment?tx_ref=${tx_ref}&transaction_id=${transactionId}&status=${status}`


      // Verify the transaction status with your server
        const verifyTransaction = async () => {
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            console.log(res)
            if (res.status === 200) {
                setPaymentStatus('success')
            } else {
            setPaymentStatus('failed')
            }
        }
        verifyTransaction()
    }, [location.search])
  return <div>
    {paymentStatus === 'success' ? <h1>Payment was successful</h1> : <h1>Payment was not successful</h1>}
  </div>
}

export default PaymentResponse
