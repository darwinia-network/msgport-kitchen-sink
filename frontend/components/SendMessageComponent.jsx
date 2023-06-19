"use client";

import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "../styles/SendMessageComponent.module.css";

import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";

export default function SendMessageComponent(props) {
  const [supportedChains, setSupportedChains] = useState(props.supportedChains);
  const [activeChain, setActiveChain] = useState(props.activeChain);

  const [fees, setFees] = useState("0.0007");
  const [message, setMessage] = useState("");

  const [busy, setBusy] = useState(false);
  const [btnText, setBtnText] = useState("");

  const { address } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { openConnectModal } = useConnectModal();

  const handleSwitchFromTo = () => {
    setSupportedChains((prev) => ({ from: prev.to, to: prev.from }));
    setActiveChain((prev) => ({ from: prev.to, to: prev.from }));
  };

  const handleSendMessage = async () => {
    setBusy(true);

    try {
      if (!address) {
        openConnectModal();
      } else if (chain.id !== activeChain.from.id) {
        switchNetwork(activeChain.from.id);
      } else {
        // send your message here !
        alert(`Sent "${message}"`);
      }
    } catch (err) {
      console.error(err);
    }

    setBusy(false);
  };

  useEffect(() => {
    if (!address) {
      setBtnText("Connect Wallet");
    } else if (chain.id !== activeChain.from.id) {
      setBtnText("Switch Network");
    } else {
      setBtnText("Send");
    }
  }, [address, chain, activeChain]);

  return (
    <div className={styles.container}>
      <div className={styles.userData}>
        <div className={styles.chainSelectorWrap}>
          <NetworkSelector
            direction="from"
            activeChain={activeChain.from}
            chains={supportedChains.from}
            onSelect={(value) => setActiveChain((prev) => ({ ...prev, from: value }))}
          />
          <span className={styles.switchChain} onClick={handleSwitchFromTo}>{`<=>`}</span>
          <NetworkSelector
            direction="to"
            activeChain={activeChain.to}
            chains={supportedChains.to}
            onSelect={(value) => setActiveChain((prev) => ({ ...prev, to: value }))}
          />
        </div>
        <div className={styles.messageInputWrap}>
          <span className={styles.messageLabel}>Message</span>
          <input
            type="text"
            className={styles.messageInput}
            placeholder="Type any message"
            defaultValue={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className={styles.feeInputWrap}>
          <span className={styles.feeLabel}>IO fees</span>
          <input
            type="text"
            className={styles.feeInput}
            defaultValue={fees}
            onChange={(e) => setFees(e.target.value)}
          />
        </div>
      </div>

      <button className={styles.sendMsgBtn} onClick={handleSendMessage} disabled={busy}>
        {btnText}
      </button>
    </div>
  );
}

function NetworkSelector({
  direction, // from or to
  activeChain,
  chains,
  onSelect,
}) {
  const selectorRef = useRef();
  const dropdownRef = useRef();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const listener = (e) => {
      if (e.target && selectorRef.current && !selectorRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, []);

  return (
    <div className={styles.networkSelector} onClick={() => setOpen((prev) => !prev)} ref={selectorRef}>
      <span className={styles.directionText}>{direction}</span>
      <div className={styles.activeChainWrap}>
        <span className={styles.activeChainName}>{activeChain.name}</span>
        <div className={`${styles.arrow} ${open ? styles.expand : ""}`}>{`>`}</div>
      </div>

      <CSSTransition in={open} timeout={300} unmountOnExit nodeRef={dropdownRef} classNames="fade-dropdown">
        <div ref={dropdownRef} className={styles.chainsDropdown}>
          {chains.map((chain) => (
            <div key={chain.name} className={styles.chainsDropdownItem} onClick={() => onSelect(chain)}>
              <span>{chain.name}</span>
            </div>
          ))}
        </div>
      </CSSTransition>
    </div>
  );
}
