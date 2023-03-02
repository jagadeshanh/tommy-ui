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

  useEffect(() => {
    fetch(APP_URL + '/entity', {
      method: 'GET',
      headers: new Headers(HEADERS),
    })
      .then((response) => response.json())
      .then((res) => {
        if (!res.error) {
          setEntities(res.data)
        }
      })
      .catch((err) => {
        setFailure(true)
        setErrMsg(err.errMessage)
      })

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

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    fetch(APP_URL + '/entity', {
      method: 'POST',
      headers: new Headers(HEADERS),
      body: JSON.stringify({
        code: data.get('code'),
        name: data.get('name'),
        type: data.get('type'),
        vendor_id: data.get('vendor_id'),
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
          setCreateEntity(false)
          setEntities([...entities, res.data])
          navigate('/entities/all')
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
                <CFormLabel htmlFor="code" className="col-sm-2 col-form-label">
                  Code
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    invalid={(errMsg.hasOwnProperty('code') && failure) || false}
                    feedbackInvalid={errMsg.hasOwnProperty('code') && errMsg['code'].message}
                    type="text"
                    name="code"
                    id="code"
                    placeholder="Code"
                  />
                </CCol>
              </CRow>
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
                <CFormLabel htmlFor="type" className="col-sm-2 col-form-label">
                  Type
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    invalid={(errMsg.hasOwnProperty('type') && failure) || false}
                    feedbackInvalid={errMsg.hasOwnProperty('type') && errMsg['type'].message}
                    type="text"
                    name="type"
                    id="type"
                    placeholder="Type"
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="vendor_id" className="col-sm-2 col-form-label">
                  Vendor
                </CFormLabel>
                <CCol sm={10}>
                  <CFormSelect
                    invalid={errMsg.hasOwnProperty('vendor_id') && failure}
                    feedbackInvalid={
                      errMsg.hasOwnProperty('vendor_id') && errMsg['vendor_id'].message
                    }
                    aria-label="Default select example"
                    id="vendor_id"
                    name="vendor_id"
                  >
                    <option>Choose vendor</option>
                    {vendors &&
                      vendors.length &&
                      vendors.map((v) => {
                        return (
                          <option value={v.id} key={v.id}>
                            {v.name}
                          </option>
                        )
                      })}
                  </CFormSelect>
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
