import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import Toastr from '../shared/components/Toastr'

export default function Home({ contract, account }) {
  const [data, setData] = useState([])
  const [accessAccount, setAccessAccount] = useState([])
  const [loading, setLoading] = useState('')
  const [address, setAddress] = useState(account)
  const [toastr, setToastr] = useState(null)

  const getData = async (e) => {
    if (!address) return
    e?.preventDefault()
    try {
      setLoading(true)
      let dataArray = await contract.display(address)
      setLoading(false)
      setData(dataArray.length ? dataArray?.toString()?.split(',') : [])
      console.log(data)
    } catch (e) {
      setLoading(false)
      setToastr({ message: "You don't have access", type: 'info' })
    }
  }

  const getaccessAccounts = async () => {
    if (!contract) return
    await contract
      .shareAccess()
      .then((res) => {
        console.log('access list', res)
        if (res.length) {
          res = res.filter((shared) => shared.access)
          setAccessAccount(res)
        }
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    setAddress(account)
    getData()
    // getaccessAccounts();
  }, [account])

  return (
    <>
      {toastr && (
        <Toastr
          msg={toastr?.message || ''}
          type={toastr.type}
          onCloseToast={() => setToastr(null)}
        />
      )}
      <Form
        onSubmit={getData}
        className="d-flex flex-row justify-content-center align-items-start mt-2 mb-2"
      >
        <Form.Group controlId="formFileSm" className="mb-3">
          <Form.Control
            disabled={loading}
            value={address}
            onInput={(e) => setAddress(e.target.value)}
            size="sm"
            className="rounded-0"
            type="text"
            placeholder="Account Address*"
            required
          />
          {/* <Form.Select
            aria-label="Select account"
            size="sm"
            className="rounded-0"
            disabled={loading}
            value={address}
            onInput={(e) => setAddress(e.target.value)}
            required
          >
            <option value={account}>(Your) {account}</option>
            {accessAccount.map((shared) => (
              <option value={shared.user}>{shared.user}</option>
            ))}
          </Form.Select> */}
        </Form.Group>
        <Button
          type="submit"
          size="sm"
          className="rounded-0"
          disabled={loading}
        >
          Load {loading && <i className="fa fa-spinner fa-spin"></i>}
        </Button>
      </Form>

      {data.length ? (
      <div className="card-container">
        {data.map((img, i) => (
          <Card key={i}>
            <div className="card-actions-top">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => window.open(img, '_blank')}
              >
                <i className="fa fa-eye"></i>
                <span> View</span>
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => navigator.clipboard.writeText(img)}
              >
                <i className="fa fa-clone"></i>
                <span> Copy</span>
              </Button>
            </div>
            <Card.Img variant="center" alt="..." src={img} />
          </Card>
        ))}
      </div>) : (<div className='mt-4 mb-4 d-flex flex-column justify-content-center align-items-center'>
        <Image alt='Not found' src={require("../images/not-found.png")} height="313px"/>
        <h4>No image</h4>
      </div>)}
    </>
  )
}
