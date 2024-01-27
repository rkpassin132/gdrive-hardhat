import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

export default function Toastr({ msg, type='info', delay=4000, onCloseToast }) {
  const icon = {
    info: 'circle-exclamation',
    danger: 'bug',
    success: 'check',
  }
  const [show, setShow] = useState(true);
  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
        <Toast bg={type} onClose={() => {setShow(false); onCloseToast();}} show={show} delay={delay} autohide>
          <Toast.Header>
            <i className={`fa fa-${icon[type]}`}></i>
            <strong className="me-auto">{type.toUpperCase()}</strong>
          </Toast.Header>
          <Toast.Body>{ msg }</Toast.Body>
        </Toast>
      </ToastContainer>
  )
}
