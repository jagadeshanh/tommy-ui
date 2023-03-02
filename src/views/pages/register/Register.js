import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
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
import { Link, useNavigate } from 'react-router-dom'
import { APP_URL } from '../../../config'

const Register = () => {
  const [success, setSuccess] = useState(false)
  const [failure, setFailure] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()
    console.log(event.currentTarget)
    const data = new FormData(event.currentTarget)
    console.log(data)
    console.log(data.get('name'))
    fetch(APP_URL + '/users', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify({
        name: data.get('name'),
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
          setFailure(false)
          setErrMsg('')
          setSuccess(true)
          navigate('/login')
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
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      name="name"
                      placeholder="Name"
                      autoComplete="name"
                      invalid={errMsg.hasOwnProperty('name') && failure}
                      feedbackInvalid={errMsg.hasOwnProperty('name') && errMsg['name'].message}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      name="email"
                      placeholder="Email"
                      autoComplete="email"
                      invalid={errMsg.hasOwnProperty('email') && failure}
                      feedbackInvalid={errMsg.hasOwnProperty('email') && errMsg['email'].message}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
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
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      invalid={errMsg.hasOwnProperty('password_confirmation') && failure}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton type="submit" color="success">
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
              <CCardFooter>
                <Link to="login">Login</Link>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
