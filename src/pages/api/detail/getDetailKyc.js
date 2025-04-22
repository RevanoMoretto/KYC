export default async function getDetailKyc (req, res) {
  const { no_order } = req.body

  const url = "http://detail-kyc-java-uat.apps.ocp4dev.muf.co.id/detailKyc"

  const payload = {
    no_order: no_order
  }

  try {
    const response = await fetch(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      }
    )

    if (!response.ok) throw new Error(response.statusText)

    const data = await response.json()

    res.status(200).json(data)
  } catch (error) {
    const infoError = {
      url: url,
      method: "POST",
      payload: payload,
      message_error: error
    }
    console.error(`Error terjadi pada saat fetching data from /api/detail/getDetailKyc, info: `, infoError)

    res.status(500).json(infoError)
  }
};