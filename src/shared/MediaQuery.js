import React from 'react';
import { useMediaQuery } from 'react-responsive'

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 769 })
  return isDesktop ? children : null
}
// const Tablet = ({ children }) => {
//   const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
//   return isTablet ? children : null
// }
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 })
  return isMobile ? children : null
}
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile ? children : null
}

export { Desktop, Mobile, Default }; 