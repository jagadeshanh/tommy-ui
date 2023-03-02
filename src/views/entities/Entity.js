import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { APP_URL, HEADERS } from '../../config'

const Entity = () => {
  const [entities, setEntities] = useState([])

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
        alert('something went wrong')
      })
  }, [])

  const columns = [
    {
      key: 'id',
      label: '#',
      _props: { scope: 'col' },
    },
    {
      key: 'code',
      _props: { scope: 'col' },
    },
    {
      key: 'name',
      _props: { scope: 'col' },
    },
    {
      key: 'type',
      _props: { scope: 'col' },
    },
    {
      key: 'vendor_id',
      _props: { scope: 'col' },
    },
  ]

  return (
    <div className="bg-light d-flex flex-row align-items-center">
      <CContainer>
        <CCard>
          <CCardBody>
            <CRow className="d-flex flex-row">
              <CCol md={12}>
                <CTable responsive columns={columns} items={entities} hover />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CContainer>
    </div>
  )
}

export default Entity
