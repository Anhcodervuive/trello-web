import { useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { verifyUserAPI } from '~/apis'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'

function AccountVerification() {
  let [searchParams] = useSearchParams()

  const email = searchParams.get('email')
  const token = searchParams.get('token')

  useEffect(() => {
    if (email && token) {
      verifyUserAPI({ email, token })
        .then(() => setVerified(true))
    }
  }, [email, token])

  const [verified, setVerified] = useState(false)

  if (!email || !token) {
    return <Navigate to='/404'/>
  }

  if (!verified) {
    return <PageLoadingSpinner caption='Verifying your account...' />
  }

  return <Navigate to={`/login?verifiedEmail=${email}`} />
}

export default AccountVerification