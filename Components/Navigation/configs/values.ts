import { Ioption, Imenu } from "../configs/types"

export const values = {
  menu: [
    {
      key: "drops",
      mainTitle: "NFT Drops",
      sideTitle: [
        {
          key: "featured",
          name: "Featured Drops",
          featured: true,
          link: "/featured"
        },
        {
          key: "todays",
          name: "Today's Drops",
          featured: false,
          link: "/todays"
        },
        {
          key: "upcoming",
          name: "Upcoming Drops",
          featured: false,
          link: "/upcoming"
        },
        {
          key: "ongoing",
          name: "Ongoing Drops",
          featured: false,
          link: "/ongoing"
        },
      ],
    },
    {
      key: "nftnews",
      mainTitle: "NFT News",
      sideTitle: [
        {
          key: "news",
          name: "NFT News",
          featured: false,
          link: "/news"
        },
      ],
    },
    {
      key: "lists",
      mainTitle: "Lists",
      sideTitle: [
        {
          key: "nftMarket",
          name: "NFT Marketplaces",
          featured: false,
          link: "/marketplaces"
        },
      ],
    },
    {
      key: "community",
      mainTitle: "Community",
      sideTitle: [
        {
          key: "discord",
          name: "Discord",
          featured: false,
          link: "https://discord.com/invite/nft-calendar"
        },
        {
          key: "twitter",
          name: "Twitter",
          featured: false,
          link: "https://twitter.com/nftcalendar"
        },
      ],
    },
  ],
};
