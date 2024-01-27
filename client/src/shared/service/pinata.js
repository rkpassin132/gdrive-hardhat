import axios from "axios"

export function postImage(data) {
    return axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: data,
        headers: {
            pinata_api_key: `744400a20f5a6c72d999`,
            pinata_secret_api_key: `02ecf68078ad8417f58a323d5f2f05762cc52924aff042d22f32b36003798bbf`,
            "Content-Type": "multipart/form-data",
        },
    })
}
