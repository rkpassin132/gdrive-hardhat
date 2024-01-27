import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Toastr from './Toastr'

export default function Share({ showModel, contract, onClose }) {
  const [show, setShow] = useState(showModel)
  const [loading, setLoading] = useState('')
  const [address, setAddress] = useState('')
  const [toastr, setToastr] = useState(null)
  const [sharedAccount, setSharedAccount] = useState([])

  const handleClose = () => {
    setShow(false)
    onClose()
  }

  const shareImages = async (e) => {
    if (!address) return
    e.preventDefault()
    setLoading(true)
    await contract.allow(address)
    setLoading(false)
    setShow(false)
    setToastr({
      message: `You shared you images to ${address}`,
      type: 'success',
    })
  }

  const getSharedAccounts = async () => {
    if (!contract) return
    await contract
      .shareAccess()
      .then((res) => {
        console.log('access list', res)
        if (res.length) {
          res = res.filter((shared) => shared.access)
          setSharedAccount(res)
        }
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {getSharedAccounts()}, [contract])

  return (
    <>
      {toastr && (
        <Toastr
          msg={toastr?.message || ''}
          type={toastr.type}
          onCloseToast={() => setToastr(null)}
        />
      )}
      <Modal
        show={show}
        onHide={handleClose}
        style={{ color: 'black !important' }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'black' }}>
            Share your images
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFileSm" className="mb-3">
            <lable className='text-secondary'>Enter account address <span className='text-danger'>*</span></lable>
            <Form.Control
              disabled={loading}
              onInput={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="Account Address*"
              required
            />
          </Form.Group>
          <Form.Group controlId="formFileSm" className="mb-3">
            <label className='text-secondary'>This is the list of you shared accounts</label>
            <Form.Select aria-label="Select account" >
                <option>Your shared account list</option>
              {sharedAccount.map((shared) => (
                <option value={shared.user}>{shared.user}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            Close
          </Button>
          <Button variant="warning" onClick={shareImages} disabled={loading}>
            Share{' '}
            <i className={`fa fa-${loading ? 'spinner fa-spin' : 'share'}`}></i>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
