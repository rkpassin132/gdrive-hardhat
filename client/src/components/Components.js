import React, { useEffect, useState } from "react"
import { ethers } from "ethers"
import Header from "../shared/components/Header"
import Footer from "../shared/components/Footer"
import Home from "./Home"
import Container from "react-bootstrap/esm/Container"
import Upload from "../artifacts/contracts/Upload.sol/Upload.json"
import Toastr from "../shared/components/Toastr"

export default function Components() {
    const [account, setAccount] = useState("")
    const [contract, setContract] = useState("")
    const [provider, setProvider] = useState("")
    const [toastr, setToastr] = useState(null);

    useEffect(() => {
        let provider = null
        try {
            provider = new ethers.providers.Web3Provider(window.ethereum)
        } catch (error) {
            console.log(error)
            if (error instanceof ethers.errors.ContractError) {
                setToastr({ message:'Contract Error: ' + error.reason, type:"error" });
            } else if (error instanceof ethers.errors.TransactionError) {
                setToastr({ message:'Transaction Error: ' + error.reason, type:"error" });
            } else {
                setToastr({ message:'An error occurred. Please try again.', type:"error" });
            }
        }

        const loadProvider = async () => {
            if (provider) {
                console.log("provider",provider)
                window.ethereum.on("chainChanged", () => {
                    window.location.reload()
                })

                window.ethereum.on("accountsChanged", () => {
                    window.location.reload()
                })

                await provider.send("eth_requestAccounts", [])
                const signer = provider.getSigner()
                const address = await signer.getAddress()
                setAccount(address)
                let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
                const contract = new ethers.Contract(
                    contractAddress,
                    Upload.abi,
                    signer
                )
                console.log(contract)
                setContract(contract)
                setProvider(provider)
            } else {
                console.info("Metamask is not installed")
            }
        }
        provider && loadProvider()
    }, [])
    return (
        <>
            {toastr && <Toastr msg={toastr?.message || ''} type={toastr.type}/>}
            <Header account={account} contract={contract} provider={provider} />
            <Container className="compoenent-container">
                <Home account={account} contract={contract} />
            </Container>
            <Footer />
        </>
    )
}
