import React from 'react'
import Link from '../../../constants/urls'
const {
    GET_IMAGES
} = Link;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    const url = GET_IMAGES + "/getImageByDocName";
    const { order_id, doc_code } = req.body;
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ order_id, doc_code })
        })

        const result = await response.json();
        return res.status(200).json(result);
    } catch (error) {
        console.error("API Error:", error);
        return res.status(500).json({ message: "Failed to fetch image" });
    }
}
