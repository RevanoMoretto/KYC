export default async function getRelationWithNasabah(req, res) {
  const url = process.env.MASTER_RELATION_CUST + "/getRelationWithNasabah"

  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
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
      method: "GET",
      payload: "",
      message_error: error?.body || error?.message || "Unknown error",
      status: error?.status || 500,
      statusText: error?.statusText || "Internal Server Error",
    }

    console.error(`Error from nextjs server, telah terjadi fetching data error dari ${url}, info: `, infoError)

    res.status(error?.status || 500).json(infoError)
  }
};