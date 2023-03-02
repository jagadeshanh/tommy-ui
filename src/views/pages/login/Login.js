import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { APP_URL } from '../../../config'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const [success, setSuccess] = useState(false)
  const [failure, setFailure] = useState(false)
  const [errMsg, setErrMsg] = useState({})
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()
    const data = new FormData(event.currentTarget)

    fetch(APP_URL + '/users/login', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify({
        email: data.get('email'),
        password: data.get('password'),
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.error) {
          setFailure(true)
          setErrMsg(res.errMessage)
        } else {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('user_id', res.data.id)
          localStorage.setItem('user', JSON.stringify(res.data))
          console.log('redirecting...')
          window.location.href = '/'
        }
      })
      .catch((e) => {
        setFailure(true)
        setErrMsg(e.errMessage)
      })
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                        invalid={errMsg.hasOwnProperty('email') && failure}
                        feedbackInvalid={errMsg.hasOwnProperty('email') && errMsg['email'].message}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        invalid={errMsg.hasOwnProperty('password') && failure}
                        feedbackInvalid={
                          errMsg.hasOwnProperty('password') && errMsg['password'].message
                        }
                      />
                    </CInputGroup>
                    <CRow className="mb-2">
                      <CCol>
                        {!(errMsg instanceof Object) && <CAlert color="danger">{errMsg}</CAlert>}
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" type="submit" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
