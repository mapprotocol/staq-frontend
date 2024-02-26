import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { readContract, writeContract, sendTransaction, waitForTransaction } from '@wagmi/core'
import { abi } from '../../abi/abi';
import { wagmiConfig } from './_app';
import { Button, Descriptions, DescriptionsProps, message } from 'antd';
import styles from './index.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router';


const Home: NextPage = () => {
  const router = useRouter()

  useEffect(() => {

  }, [])


  return (
    <>
      <div className={styles.bg}>
        <Image
          fill
          style={{
            objectFit: "contain",
            zIndex: 1,
            position: 'absolute'
          }}
          src="/images/home.png"
          alt="map" />
        <div className={styles.title}>
          {"Liquidity for Staked Tokens in Bitcoin Layer2s Ecosystem"}
        </div>
        <div onClick={() => {

          router.push('/')

        }} className={styles.enterButton}>
          {"Staking Now"}
        </div>
      </div>
      {/* <div className={styles.body}>
        <div className={styles.left}>
          <div>
            {"staQ解决什么问题？"}
          </div>
          <div>
            {"随着比特币生态的蓬勃发展，用户质押进比特币二层主网节点的代币，虽可享受收益，但受主网的安全机制限制，提出代币一般需要等待很久的时间，让用户流动性需求受阻。"}
          </div>
        </div>
        <div className={styles.right}>
          <Image
            fill
            style={{
              objectFit: "contain",
            }}
            src="/images/1.png"
            alt="map" />
        </div>
      </div> */}


    </>
  );
};

export default Home;
