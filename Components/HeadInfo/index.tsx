import Head from "next/head";

interface HeadInfo {
  title: string;
  name?: string;
  contents?: string;
  keywords: string;
}

const HeadInfo = ({ title, name, contents, keywords }: HeadInfo) => {

  function textLengthOverCut(txt, len, lastTxt) {
    if (len == "" || len == null) { // 기본값
      len = 20;
    }

    if (txt.length > len) {
      txt = txt.substr(0, len) + lastTxt;
    }
    return txt;
  }

  const descriptionContent = textLengthOverCut(contents, 150, "...")

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      <meta name={name}></meta>
      <meta name="keywords" content={keywords} ></meta>
      <meta name="description" content={descriptionContent}></meta>
      <meta property="og:image" content={"/assets/logo/thumbnail.png"}></meta>
    </Head>
  );
};

HeadInfo.defaultProps = {
  title: "NFT Drops: NFT Calendar",
  name: "nft calendar",
  contents: "nft calendar",
  keywords: "nft drops, nft calendar, upcoming nft, nft minting, nft events, newest nft, airdrop, nft schedule, nft discord, nft twitter, opensea, nft market, nft art"
};

export default HeadInfo;
