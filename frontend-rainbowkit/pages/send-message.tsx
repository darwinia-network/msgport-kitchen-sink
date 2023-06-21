"use client";

import Head from "next/head";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import SendMessageComponent from "../components/SendMessageComponent";
import styles from "../styles/SendMessage.module.css";

import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  goerli,
  polygonMumbai,
  optimismGoerli,
  arbitrumGoerli,
  polygonZkEvm,
  polygonZkEvmTestnet,
} from "wagmi/chains";

const SUPPORTED_CHAINS = {
  from: [mainnet, polygon, optimism, arbitrum, goerli],
  to: [polygonMumbai, optimismGoerli, arbitrumGoerli, polygonZkEvm, polygonZkEvmTestnet],
};

const ACTIVE_CHAIN = {
  from: SUPPORTED_CHAINS.from[0],
  to: SUPPORTED_CHAINS.to[0],
};

export default function SendMessage() {
  return (
    <div>
      <Head>
        <title>Send Message | Darwinia</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className={styles.main}>
        <ConnectButton />
        <SendMessageComponent supportedChains={SUPPORTED_CHAINS} defaultChain={ACTIVE_CHAIN} />
      </main>
    </div>
  );
}
