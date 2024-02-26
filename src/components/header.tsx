import React from 'react';
import styles from './index.module.css'
import Image from 'next/image'
import { Router, useRouter } from 'next/router';



const Header = () => {
  const router = useRouter()
  return (
    <div className={styles.header}>
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
  )
}

export default Header;