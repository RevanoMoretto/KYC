import LINK from "../../../constants/urls"

export default async function getPaymentMethode(req, res) {
  const { channel_code, fin_type_code, sumber_nasabah_code } = req.body

  const url = LINK.MASTER_PAYMENT_METHODE + "/paymentMethode"

  const payload = {
    channel_code: channel_code,
    fin_type_code: fin_type_code,
    sumber_nasabah_code: sumber_nasabah_code
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

    const data = await response.json()

    if (!response.ok) {
      const errorDetail = {
        status: response.status,
        statusText: response.statusText,
        body: data,
      };

      throw errorDetail;
    }

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