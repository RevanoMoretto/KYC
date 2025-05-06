import Link from '../../../constants/urls';

// const { GET_IMAGES } = Link;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { order_id, doc_code } = req.body;
    const url = process.env.GET_IMAGES + "/getImageByDocName";

    console.log("API received request:", { order_id, doc_code });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order_id, doc_code }),
        });

        const result = await response.json();
        console.log("Response from external image service:", result);

        return res.status(200).json(result);
    } catch (error) {
        console.error("API Error:", error);
        return res.status(500).json({ message: "Failed to fetch image" });
    }
}
