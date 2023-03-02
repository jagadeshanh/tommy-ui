import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CContainer,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CForm,
  CButton,
  CAlert,
  CFormTextarea,
} from '@coreui/react'
import { APP_URL, HEADERS } from '../../config'

const CreateVendor = () => {
  const [success, setSuccess] = useState(false)
  const [failure, setFailure] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()
  const [vendors, setVendors] = useState([])
  const [createVendor, setCreateVendor] = useState(false)

  useEffect(() => {
    fetch(APP_URL + '/vendors', {
      method: 'GET',
      headers: new Headers(HEADERS),
    })
      .then((response) => response.json())
      .then((res) => {
        if (!res.error) {
          setVendors(res.data)
        }
      })
      .catch((err) => {
        setFailure(true)
        setErrMsg(err.errMessage)
      })
  }, [])

  const handleClick = (e) => {
    e.preventDefault()
    setCreateVendor(!createVendor)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    fetch(APP_URL + '/vendors', {
      method: 'POST',
      headers: new Headers(HEADERS),
      body: JSON.stringify({
        name: data.get('name'),
        email: data.get('email'),
        address: data.get('address'),
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
          setCreateVendor(false)
          setVendors([...vendors, res.data])
          navigate('/vendors/all')
        }
      })
      .catch((e) => {
        setFailure(true)
        setErrMsg(e.errMessage)
      })
  }

  return (
    <div className="bg-light d-flex flex-row align-items-center">
      <CContainer>
        <CCard>
          <CForm onSubmit={handleSubmit}>
            <CCardBody>
              <CRow className="mb-3">
                <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">
                  Name
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    invalid={(errMsg.hasOwnProperty('name') && failure) || false}
                    feedbackInvalid={errMsg.hasOwnProperty('name') && errMsg['name'].message}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="email" className="col-sm-2 col-form-label">
                  Email
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    invalid={(errMsg.hasOwnProperty('email') && failure) || false}
                    feedbackInvalid={errMsg.hasOwnProperty('email') && errMsg['email'].message}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="address" className="col-sm-2 col-form-label">
                  Address
                </CFormLabel>
                <CCol sm={10} pb={2}>
                  <CFormTextarea name="address" id="address" rows={2} text=""></CFormTextarea>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol sm={10}>
                  {errMsg && errMsg.length && (
                    <CAlert color="danger">{!(errMsg instanceof Object) && errMsg}</CAlert>
                  )}
                </CCol>
              </CRow>
              <CRow>
                <CCol></CCol>
                <CCol sm={10}>
                  <CButton color="primary" type="submit">
                    Submit form
                  </CButton>
                </CCol>
              </CRow>
            </CCardBody>
          </CForm>
        </CCard>
      </CContainer>
    </div>
  )
}

export default CreateVendor
