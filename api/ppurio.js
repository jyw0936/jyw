const axios = require('axios');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const result = await axios.post('https://api.ppurio.com/message/v1/send/kakao', req.body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return res.status(200).json({ success: true, data: result.data });
  } catch (error) {
    console.error('Ppurio API Error:', error.response?.data || error.message);
    return res.status(500).json({ success: false, error: error.response?.data || error.message });
  }
}
