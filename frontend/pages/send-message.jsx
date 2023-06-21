"use client";

import SendMessageComponent from "../components/SendMessageComponent";
import styles from "../styles/SendMessage.module.css";

import { goerli, bscTestnet, polygonMumbai } from "wagmi/chains";

const SUPPORTED_CHAINS = {
  from: [bscTestnet],
  to: [polygonMumbai, goerli],
};

const ACTIVE_CHAIN = {
  from: SUPPORTED_CHAINS.from[0],
  to: SUPPORTED_CHAINS.to[0],
};

export default function SendMessage() {
  return (
    <main className={styles.main}>
      <SendMessageComponent
        supportedChains={SUPPORTED_CHAINS}
        activeChain={ACTIVE_CHAIN}
      />
    </main>
  );
}
