import { useState, useEffect } from "react"
import { service } from "@src/configs";
import axios from "axios"

export const useDiscord = (data) => {
  const [discordMembers, setDiscordMembers] = useState(0)


  useEffect(() => {
    const getDiscordMembersCount = async () => {

      const discord = service.getValue(data, "discordUrl", "")
      // const discord = "https://discord.com/invite/b4q5BJukjn"
      const server = discord.split("invite/")[1]

      if (!server) {
        return
      }
      fetch("/api/discord", {
        method: 'POST',
        body: JSON.stringify(server),
      }).then((result: any) => {
        return result.json()
      }).then((parsedData) => {
        const count = service.getValue(parsedData, "counts", 0)
        setDiscordMembers(count)
      })
    }
    getDiscordMembersCount()

  }, [data])

  return [discordMembers]

}