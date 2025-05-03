import LINK from '../../../constants/urls'

const {
  GET_DETAIL_KYC,
} = LINK;

export default async function getDetailKyc(req, res) {
  const { no_order } = req.body

  // Make sure no_order is present
  if (!no_order) {
    return res.status(400).json({ error: "no_order is required" });
  }

  const url = GET_DETAIL_KYC + "/detailKyc"

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

    if (!response.ok) {
      const errorBody = await response.json();
      const errorDetail = {
        status: response.status,
        statusText: response.statusText,
        body: errorBody,
      };

      throw errorDetail;
    }

    const data = await response.json()

    res.status(200).json(data)
  } catch (error) {
    const infoError = {
      url: url,
      method: "POST",
      payload: payload,
      message_error: error?.body || error?.message || "Unknown error",
      status: error?.status || 500,
      statusText: error?.statusText || "Internal Server Error",
    }

    console.error(`Error from nextjs server, telah terjadi fetching data error dari ${url}, info: `, infoError)

    res.status(error?.status || 500).json(infoError)
  }
};