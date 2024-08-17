import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export default function AboutUs({ showModel, onClose }) {
  const [show, setShow] = useState(showModel)

  const handleClose = () => {
    setShow(false)
    onClose()
  }

  return (
    <>
      <Modal
        fullscreen={'sm-down'}
        show={show}
        onHide={handleClose}
        style={{ color: 'black !important' }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'black' }}>
            About Our Decentralized File System{' '}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-black">
            Our Blockchain-Based Decentralized File System (DFS) allows users to
            securely upload and share images without relying on centralized
            servers. By connecting their wallet, users can manage and control
            their files with full ownership and privacy, all backed by
            blockchain technology.
          </p>
          <h5 className="text-black mb-4">Steps to Upload and Share Files</h5>
          <ul className="text-black">
            <li>
              <h6>Step 1: Connect Your Wallet</h6>
              <p>Begin by connecting your wallet to the system.</p>
            </li>

            <li>
              <h6>Step 2: Create/Select Account</h6>
              <p>
                If you don’t have a wallet, create an account on MetaMask.
                Alternatively, select the account you wish to use for uploading
                images.
              </p>
            </li>
            <li>
              <h6>Step 3: Upload an Image</h6>
              <p>
                Choose the image file you want to upload and click the Upload
                button.
              </p>
            </li>
            <li>
              <h6>Step 4: Load Images</h6>
              <p>To view your uploaded images, click the Load button.</p>
              <p>
                If another user has shared images with you, enter their wallet
                address and click Load to access their shared images.
              </p>
            </li>
            <li>
              <h6>Step 5: Share an Image</h6>
              <p>
                To share an image with another user, click the Share button,
                enter your wallet address, then select the recipient's address
                to share the image with them.
              </p>
            </li>
          </ul>
        </Modal.Body>
      </Modal>
    </>
  )
}
