import Avalanche from "/assets/common/coin/Avalanche.png"
import Binance from "/assets/common/coin/BinanceSC.png"
import Cardano from "/assets/common/coin/Cardano.png"
import Elrond from "/assets/common/coin/Elrond.png"
import Ethereum from "/assets/common/coin/Ethereum.png"
import Wax from "/assets/common/coin/WAX.png"
import immutableX from "/assets/common/coin/immutableXs.png"
import Harmony from "/assets/common/coin/Harmony.png"
import Polygon from "/assets/common/coin/Polygon.png"
import Solana from "/assets/common/coin/Solana.png"
import Theta from "/assets/common/coin/THETA.png"
import Flow from "/assets/common/coin/Flow.png"
import Tron from "/assets/common/coin/Tron.png"

export const values = {
  BlockChainMap: {
    1: "ETHEREUM",
    2: "ETHEREUM",
    3: "POLYGON",
    4: "SOLANA",
    5: "BSC",
    11: "FLOW",
    33: "CARDANO",
    34: "AVALANCHE",
    32: "HARMONY",
    9: "EGLD",
    16: "IMMUTABLE X",
    35: ""
  },
  unitMap: {
    1: "ETH",
    2: "ETH",
    3: "MATIC",
    4: "SOL",
    5: "BNB",
    11: "FLOW",
    33: "ADA",
    34: "WAXP",
    32: "ONE",
    9: "EGLD",
    16: "IMX",
    35: ""
  },
  tagsData: [
    // {
    //   title: "Algoland",
    //   image: AlgoLand
    // },
    {
      id: 34,
      title: "Avalanche",
      image: Avalanche,
    },
    {
      id: 5,
      title: "BinanceSC",
      image: Binance,
    },
    {
      id: 33,
      title: "Cardano",
      image: Cardano,
    },
    {
      id: 9,
      title: "Elrond",
      image: Elrond
    },
    {
      id: 1,
      title: "Ethereum",
      image: Ethereum,
    },
    // { title: "FTM", image: FTM },
    {
      id: 16,
      title: "Immtable X",
      image: immutableX,
    },
    {
      id: 32,
      title: "Harmony",
      image: Harmony
    },
    {
      id: 3,
      title: "Polygon",
      image: Polygon,
    },
    {
      id: 4,
      title: "Solana",
      image: Solana
    },
    {
      id: 11,
      title: "Flow",
      image: Flow
    },
    {
      id: 8,
      title: "Wax",
      image: Wax
    },

    // {
    //   title: "THETA", image: Theta },
    // { title: "Tezos", image: Tezos },
    // { title: "Tron", image: Tron },
  ],
  marketMap: [
    { id: 1, title: "OpenSea" },
    { id: 3, title: "magicEden" },
    { id: 5, title: "Rarible" },
    { id: 6, title: "Solsea" },
    { id: 7, title: "MakersPlace" },
    { id: 8, title: "Crypto.com" },
    { id: 9, title: "Solanart" },
    { id: 10, title: "Foundation" },
    { id: 11, title: "Mintable" },
    { id: 12, title: "NiftyGateway" },
  ],
  imageUrl: `${process.env.NEXT_PUBLIC_API_URL}/images`
}

