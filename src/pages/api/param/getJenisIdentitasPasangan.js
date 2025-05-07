import LINK from '../../../constants/urls'


export default async function getJenisIdentitasPasangan(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    const url = LINK.MASTER_IDENTITY_TYPE + "/getIdentityCardTypeSpouse";
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
        console.error(`Error occurred while fetching data from /api/param/getJenisIdentitasPasangan, info: `, infoError);
        res.status(500).json(infoError);
    }
}