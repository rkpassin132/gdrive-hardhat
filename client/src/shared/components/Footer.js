import React from 'react'
import Container from 'react-bootstrap/esm/Container'

export default function Footer() {
  const toTop = ()=> {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
  }
  return (
    <div className='footer'>
      <Container className='px-5'>
          <p className='m-0'>© 2023 Driive, made by Rahul kumar.</p>
          <p className='text-success cursor-pointer' onClick={toTop} >Back to top <i className="fa fa-chevron-up"></i></p>
      </Container>
    </div>
  )
}
