import LINK from '../../../constants/urls'


export default async function getPekerjaanNasabah(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    const url = LINK.MASTER_PEKERJAAN_URL + "/getPekerjaanDebitur";
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        res.status(200).json(data)
    } catch (error) {
        const infoError = {
            url: url,
            method: "GET",
            message_error: error.message || "Failed to fetch data",
        };
        console.error(`Error occurred while fetching data from /api/param/getPekerjaanDebitur, info: `, infoError);
        res.status(500).json(infoError);
    }
}

export default async function getJabatanBidangUsaha(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    const url = LINK.MASTER_PEKERJAAN_URL + "/getJabatanDanBidangUsaha";
    const { value } = req.body
    const payload = {
        value: value
      }
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        res.status(200).json(data)
    } catch (error) {
        const infoError = {
            url: url,
            method: "POST",
            message_error: error.message || "Failed to fetch data",
        };
        console.error(`Error occurred while fetching data from /api/param/getJabatanDanBidangUsaha, info: `, infoError);
        res.status(500).json(infoError);
    }
}