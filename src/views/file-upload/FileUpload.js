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

const FileUpload = () => {
  const [success, setSuccess] = useState(false)
  const [failure, setFailure] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()
  const [vendors, setVendors] = useState([])
  const [createEntity, setCreateEntity] = useState(false)
  const [entity, setEntity] = useState('')
  const [file, setFile] = useState(null)

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

  const handleFileUpload = (event) => {
    setFile(event.target.files[0])
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData()
    data.append('enitiyId', entity)
    data.append('filetoupload', file)

    fetch(APP_URL + '/file', {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        entype: 'multipart/form-data',
        'x-api-key': localStorage.getItem('token'),
      }),
      body: data,
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.error) {
          setFailure(true)
          setErrMsg(res.errMessage)
        } else {
          alert(res.data)
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
                <CFormLabel htmlFor="vendor_id" className="col-sm-2 col-form-label">
                  Vendor
                </CFormLabel>
                <CCol sm={10}>
                  <CFormSelect
                    invalid={
                      (errMsg.length && errMsg.hasOwnProperty('vendor_id') && failure) || false
                    }
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
                <CFormLabel htmlFor="file" className="col-sm-2 col-form-label">
                  File
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    invalid={(errMsg && errMsg.hasOwnProperty('file') && failure) || false}
                    feedbackInvalid={
                      errMsg && errMsg.hasOwnProperty('file') && errMsg['file'].message
                    }
                    type="file"
                    id="file"
                    onChange={handleFileUpload}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
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

export default FileUpload
