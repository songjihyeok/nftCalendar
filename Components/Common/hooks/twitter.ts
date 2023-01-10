import { useState, useEffect } from "react"
import { service } from "@src/configs";

export const useTwitter = (data) => {
  const [twitterMembers, setTwitterMembers] = useState(0)

  useEffect(() => {
    const getTwitterMembersCount = async () => {
      const twitter = service.getValue(data, "twitterUrl", "")
      const userName = twitter.split("twitter.com/")[1]

      if (!userName) {
        return
      }
      const userNameJson = {
        userName
      }

      const res = await fetch("/api/twitter", {
        method: 'POST',
        body: JSON.stringify(userNameJson),
      });

      const result = await res.json()
      setTwitterMembers(result.counts)

    }
    getTwitterMembersCount()
  }, [data])


  return [twitterMembers]
}