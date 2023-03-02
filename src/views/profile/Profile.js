import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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
  CTable,
  CAlert,
} from '@coreui/react'
import { APP_URL, HEADERS } from '../../config'

const CreateEntity = () => {
  const [success, setSuccess] = useState(false)
  const [failure, setFailure] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()
  const [vendors, setVendors] = useState([])
  const [entities, setEntities] = useState([])
  const [createEntity, setCreateEntity] = useState(false)
  const [vendor, setVendor] = useState('')

  const handleChange = (event) => {
    setVendor(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    fetch(APP_URL + '/users/password/reset/' + localStorage.getItem('user_id'), {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify({
        password: data.get('password'),
        newPassword: data.get('newPassword'),
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.error) {
          setFailure(true)
          setErrMsg(res.errMessage)
        } else {
          localStorage.clear()
          window.location.href = '/login'
        }
      })
      .catch((e) => {
        setFailure(true)
        setErrMsg(e.errMessage)
      })
  }

  const columns = [
    {
      key: 'id',
      label: '#',
      _props: { scope: 'col' },
    },
    {
      key: 'name',
      _props: { scope: 'col' },
    },
    {
      key: 'email',
      _props: { scope: 'col' },
    },
    {
      key: 'created_at',
      _props: { scope: 'col' },
    },
    {
      key: 'status',
      _props: { scope: 'col' },
    },
  ]

  return (
    <div className="bg-light d-flex flex-row align-items-center">
      <CContainer>
        <CCard className="m-3">
          <CCardBody>
            <CRow className="d-flex flex-row">
              <CCol md={12}>
                <CTable
                  responsive
                  columns={columns}
                  items={[JSON.parse(localStorage.getItem('user'))]}
                  hover
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
        <CCard className="m-3">
          <CForm onSubmit={handleSubmit}>
            <CCardBody>
              <CRow className="mb-3">
                <CFormLabel htmlFor="password" className="col-sm-2 col-form-label">
                  Password
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    invalid={(errMsg && errMsg.hasOwnProperty('password') && failure) || false}
                    feedbackInvalid={
                      errMsg && errMsg.hasOwnProperty('password') && errMsg['password'].message
                    }
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="newPassword" className="col-sm-2 col-form-label">
                  New Password
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    invalid={(errMsg && errMsg.hasOwnProperty('newPassword') && failure) || false}
                    feedbackInvalid={
                      errMsg &&
                      errMsg.hasOwnProperty('newPassword') &&
                      errMsg['newPassword'].message
                    }
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    placeholder="New Password"
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol>
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

export default CreateEntity
