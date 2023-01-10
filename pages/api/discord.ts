import axios from "axios";
import { service } from "@src/configs";
import { useState, useEffect } from "react"
// const fetch = require('node-fetch');

const handler = async (req, res) => {

  const server = JSON.parse(req.body)
  if (!server) {
    res.status(400)
  }
  const url = `https://discord.com/api/v9/invites/${server}?with_counts=true&with_expiration=true`
  const result = await axios({
    method: 'get',
    url: url
  })
  const counts = service.getValue(result, "data.approximate_member_count", 0)

  res.status(200).json(JSON.stringify({ counts: counts }))
}

export default handler