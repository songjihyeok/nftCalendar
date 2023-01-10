export const values = {
  email: {
    mainTitle: "Event Links",
    contact: {
      name: "email",
      label: "Contact Email Address",
      inputType: "string",
      rules: [
        { required: true, message: "type email Address" },
        {
          // required: true,
          message: "check the format",
          type: 'email'
        },
      ],
      placeholder: "email@address.com",
    },
    website: {
      name: "websiteUrl",
      label: "Event Website",
      inputType: "string",
      rules: [
        { required: true, message: "type event website" },
        {
          // required: true,
          message: "check the format",
          type: 'url'
        },
      ],
      placeholder: "https://nftservice.com",
    },
    source: {
      name: "announcementUrl",
      label: "source (Announcement)",
      inputType: "string",
      rules: [
        {
          message: "check the format",
          type: 'url'
        }],
      placeholder: "https://medium/project.com",
    },
    url: {
      name: "marketplaceUrl",
      label: "Marketplace URL",
      inputType: "string",
      rules: [
        {
          message: "check the format",
          type: 'url'
        }],
      placeholder: "https://opensea.io/collection/nft",
    },
    twitter: {
      name: "twitterUrl",
      label: "Project Twitter",
      inputType: "string",
      rules: [
        {
          message: "check the format",
          type: 'url'
        }],
      placeholder: "https://twitter.com/project",
    },
    discord: {
      name: "discordUrl",
      label: "Official Discord Server",
      inputType: "string",
      rules: [
        {
          message: "check the format",
          type: 'url'
        }],
      placeholder: "https://discord.com/invite/project",
    },
    term: {
      name: "term",
      link: "/",
      rules: [{ required: true, message: "Please agree with the terms of use" }],
      description: "I have read and agreed to the terms of use",
    },
  },
};
