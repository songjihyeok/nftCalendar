export const menus = [
  {
    key: "drops",
    title: "NFT Drops",
    children: [
      {
        key: "featured",
        title: "Featured Drops",
        featured: true,
        route: "/featured"
      },
      {
        key: "today",
        title: "Today's Drops",
        featured: false,
        route: "/todays"
      },
      {
        key: "upcoming",
        title: "Upcoming Drops",
        featured: false,
        route: "/upcoming"
      },
      {
        key: "ongoing",
        title: "Ongoing Drops",
        featured: false,
        route: "/ongoing"
      },
    ],
  },
  {
    key: "news",
    title: "NFT News",
    children: [{
      key: "news",
      title: "news",
      featured: false,
      route: "/news"
    }]
  },
  {
    key: "lists",
    title: "Lists",
    children: [
      {
        key: "nftMarket",
        title: "NFT Marketplaces",
        featured: false,
        route: "/marketplaces"
      },
    ],
  },
  {
    key: "community",
    title: "Community",
    children: [
      {
        key: "discord",
        title: "Discord",
        featured: false,
        route: "https://discord.com/invite/nft-calendar"
      },
      {
        key: "twitter",
        title: "Twitter",
        featured: false,
        route: "https://twitter.com/nftcalendar"
      },
    ],
  },
];
