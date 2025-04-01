const axios = require('axios');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // ✅ 요청에서 필요한 데이터 추출
  const { phonenumber, msg, template_code } = req.body;

  try {
    const result = await axios.post('https://api.ppurio.com/message/v1/send/kakao', {
      userid: 'yyyk2',
      callback: '01050777627',
      msg,
      phonenumber,
      template_code,
      pf_key: '64343e8d21e198d4c6e13e266bc77efb2ce32b8625adc567447bb13f4f813590'
    }, {
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

