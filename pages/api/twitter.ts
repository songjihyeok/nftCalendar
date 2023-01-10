import axios from "axios";

// const fetch = require('node-fetch');

const handler = async (req, res) => {

  const userNameBody = JSON.parse(req.body)
  const userName = userNameBody.userName
  const result = await axios({
    method: 'get',
    url: `https://api.twitter.com/2/users/by/username/${userName}?user.fields=public_metrics`,
    headers: {
      "Access-Controll-Allow-Origin": "*",
      "Authorization": "Bearer"
    }
  }).then((result) => {
    return result.data.data.public_metrics.followers_count
  }).catch((error) => {
    // console.log("error", error)
  })
  res.status(200).json({ counts: JSON.stringify(result) })
}

export default handler