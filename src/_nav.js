import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilDrop, cilCloudUpload, cilContact, cilSpeedometer } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'navigation',
  },
  {
    component: CNavGroup,
    name: 'Entities',
    to: '/entities',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Entity',
        to: '/entities/create',
      },
      {
        component: CNavItem,
        name: 'All Entities',
        to: '/entities/all',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'File upload',
    to: '/file-upload',
    icon: <CIcon icon={cilCloudUpload} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Vendor',
    to: '/vendors',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Vendor',
        to: '/vendors/create',
      },
      {
        component: CNavItem,
        name: 'All Vendors',
        to: '/vendors/all',
      },
    ],
  },
]

export default _nav
