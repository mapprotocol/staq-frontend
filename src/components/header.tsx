import React, { useEffect, useState } from 'react';
import styles from './index.module.css'
import Image from 'next/image'
import { Router, useRouter } from 'next/router';
import { useAccount } from 'wagmi';



const Header = () => {
  const { address, isConnected, isConnecting } = useAccount();
  const [showSelect, setShowSelect] = useState(false)
  const router = useRouter()
  useEffect(() => {
    console.log(isConnected)

  }, [])
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <div onClick={() => {
          router.push('/')
        }}>
          <Image
            style={{
              cursor: 'pointer'
            }}
            height={32}
            width={98}
            src="/images/logo.png"
            alt="map" />
        </div>
        <div className={styles.line}></div>
        <div className={styles.item} onClick={() => {
          router.push('/stake')
        }}>
          <Image
            height={16}
            width={16}
            src="/icons/stake.svg"
            alt="map" />
          {'Stake'}
        </div>
        <div className={styles.item} onClick={() => {
          router.push('/withdraw')
        }}>
          <Image
            height={16}
            width={16}
            src="/icons/withdraw.svg"
            alt="map" />
          {'Withdraw'}
        </div>

      </div>
      <div className={styles.headerRight}>
        {(router.route !== "/" && isConnected) ? <div style={{ display: 'flex', gap: "16px", alignItems: 'center' }}>
          <Image
            className={styles.icon}
            height={36}
            onClick={() => {
              window.open("https://docs.bitstaq.io/user-guide/stake")
            }}
            width={36}
            src={`/icons/document.png`}
            alt="map" />
          <div onClick={() => {
            setShowSelect(!showSelect)
          }} className={styles.selectNetwork}>
            <div className={styles.chainLogo}>
              <Image
                style={{
                  cursor: 'pointer'
                }}
                height={24}
                width={24}
                src="/images/chain0.png"
                alt="map" /></div>
            <div className={styles.chainName}>
              {"MAP Protocol"}
              <Image
                style={{
                  marginLeft: "12px"
                }}
                height={10}
                width={10}
                src={`/images/${showSelect ? "up" : "down"}.svg`}
                alt="map" />
            </div>

          </div> </div > : <div> <Image
            className={styles.icon}
            height={32}
            width={32}
            onClick={() => {
              window.open("https://docs.bitstaq.io/introduction/what-is-staq")
            }}
            src={`/icons/github.svg`}
            alt="map" />
          <Image
            className={styles.icon}
            height={32}
            onClick={() => {
              window.open("https://twitter.com/StaQ_io")
            }}
            width={32}
            src={`/icons/x.svg`}
            alt="map" />
        </div>}
        {showSelect && <div>
          <div className={styles.networks}>
            <div className={styles.clainItem}>
              <div className={styles.chainLogo}>
                <Image
                  style={{
                    cursor: 'pointer'
                  }}
                  height={30}
                  width={30}
                  src="/images/chain1.png"
                  alt="map" /></div>
              <div className={styles.chainName}>
                {"Merlin Chain"}
                <div className={styles.coming}>{"coming soon"}</div>

              </div>
            </div>

            <div className={styles.clainItem}>

              <div className={styles.chainLogo}>
                <Image
                  style={{
                    cursor: 'pointer'
                  }}
                  height={30}
                  width={30}
                  src="/images/chain2.png"
                  alt="map" /></div>
              <div className={styles.chainName}>
                {"Conflux"}
                <div className={styles.coming}>{"coming soon"}</div>
              </div>
            </div>
            <div className={styles.clainItem}>

              <div className={styles.chainLogo}>
                <Image
                  style={{
                    cursor: 'pointer'
                  }}
                  height={30}
                  width={30}
                  src="/images/chain3.png"
                  alt="map" /></div>
              <div className={styles.chainName}>
                {"B² Network"}
                <div className={styles.coming}>{"coming soon"}</div>

              </div>
            </div>
          </div>

        </div>}
      </div>
    </div >
  )
}

export default Header;