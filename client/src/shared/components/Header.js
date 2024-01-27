import React, { useRef, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Toastr from './Toastr'
import { ethers } from 'ethers'
import { postImage } from '../service/pinata'
import Share from './Share'

export default function Header({ account, provider, contract }) {
  const [file, setFile] = useState(null)
  const [toastr, setToastr] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return
    try {
      const formData = new FormData()
      formData.append('file', file)
      setUploading(true)
      const resFile = await postImage(formData)
      const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`
      await contract
        .add(account, ImgHash)
        .then((res) => {
          setToastr({ message: 'Successfully Image Uploaded', type: 'success' })
          setFile(null)
          formRef.current.reset()
        })
        .catch((error) => {
          setToastr({ message: error.reason, type: 'danger' });
          return;
        })
      setUploading(false)
    } catch (error) {
      setUploading(false)
      setToastr({
        message: 'An error occurred. Please try again.',
        type: 'danger',
      })
      console.log(error)
    }
  }
  const retrieveFile = (e) => {
    if (!e.target.files.length) return
    const data = e.target.files[0] //files array of files object
    var fileExtension = data.name.split('.').pop().toLowerCase()
    if (!['png', 'jpeg', 'jpg'].includes(fileExtension)) {
      setToastr({
        message: 'Please uplaod only .png .jpeg .jpg',
        type: 'danger',
      })
      return
    }
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(data)
    reader.onloadend = () => {
      setFile(e.target.files[0])
    }
    e.preventDefault()
  }
  const copyAddress = () => {
    navigator.clipboard.writeText(account)
  }
  return (
    <>
      {toastr && <Toastr msg={toastr?.message || ''} type={toastr.type} onCloseToast={() => setToastr(null)} />}
      {showShare && (
        <Share
          showModel={showShare}
          contract={contract}
          onClose={() => setShowShare(false)}
        />
      )}
      <div className="header-container">
        <Navbar expand="lg" className="bg-body-transparen">
          <Container fluid>
            <Navbar.Brand href="#" className="text-white">
              Drive
            </Navbar.Brand>
            <Button variant="warning" onClick={() => setShowShare(true)}>
              Share <i className="fa fa-share"></i>
            </Button>
          </Container>
        </Navbar>
        <div className="text-center">
          <h1 className="page-title">Decentralize File System</h1>
          <div className="d-flex flex-row justify-content-center align-items-center">
            <p className="mb-0 px-2">
              Account: <span>{account ? account : 'Not connected'}</span>
            </p>
            <Button size="sm" variant="secondary" onClick={copyAddress}>
              <i className="fa fa-clone"></i>
            </Button>
          </div>
        </div>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          className="d-flex flex-row justify-content-center align-items-start mt-2 mb-2"
        >
          <Form.Group controlId="formFileSm" className="mb-3">
            <Form.Control
              disabled={uploading}
              type="file"
              size="sm"
              accept=".png,.jpg,.jpeg"
              className="rounded-0"
              required
              onChange={retrieveFile}
            />
          </Form.Group>
          <Button
            type="submit"
            size="sm"
            className="rounded-0"
            disabled={uploading}
          >
            Upload {uploading && <i className="fa fa-spinner fa-spin"></i>}
          </Button>
        </Form>
      </div>
    </>
  )
}
