const { ethers, run, network } = require("hardhat")

async function main() {
    const UploadFactory = await ethers.getContractFactory("Upload")

    console.log("Deploying contract....")
    const uploadStorage = await UploadFactory.deploy()
    await uploadStorage.deployed()
    console.info(`Deployed contract to: ${uploadStorage.address}`)

    // online verification of contract deployment
    if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
        await uploadStorage.deployTransaction.wait(6)
        await verify(uploadStorage.address, [])
    }
}

async function verify(contractAddress, args) {
    console.log("Verifying contract....")
    try {
        await run("Verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already verified")
        } else {
            console.error(error)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(0)
    })
