import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CCard, CCardBody, CCardGroup, CCol, CContainer, CRow } from '@coreui/react'

export default function Logout() {
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.clear()
    window.location.href = '/'
  }, [])

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody></CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
