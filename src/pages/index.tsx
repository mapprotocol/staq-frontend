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

          // router.push('/stake')

        }} className={styles.enterButton}>
          {"Staking Now"}
        </div>

        {/* <div className={styles.datas}>
          <div className={styles.data}>
            <div className={styles.dataTitle}>
              {'Total Staked Tokens'}
            </div>
            <div className={styles.dataDesc}>
              {'4044945949499'}
            </div>
          </div>
          <div className={styles.data}>
            <div className={styles.dataTitle}>
              {'Total Rewards Paid'}
            </div>
            <div className={styles.dataDesc}>
              {'54959595'}
            </div>
          </div>
          <div className={styles.data}>
            <div className={styles.dataTitle}>
              {'Stakers'}
            </div>
            <div className={styles.dataDesc}>
              {'394949'}
            </div>
          </div>
          <div className={styles.data}>
            <div className={styles.dataTitle}>
              {'L2 Chains'}
            </div>
            <div className={styles.dataDesc}>
              {'15'}
            </div>
          </div>
        </div> */}
      </div>
      <div className={styles.bodyItem}>
        <div className={styles.left}>
          <div className={styles.bodyTitle}>
            {"What StaQ solves？"}
          </div>
          <div className={styles.bodyDesc}>
            {"As the Bitcoin ecosystem flourishes, users could stake tokens in Bitcoin L2s and enjoy profits. However, the mainnet usually put restrictions for users to reap immediate rewards.Users need to sit through long waiting time which has significantly hindered users' liquidity needs."}
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

      </div>
      <div className={styles.bodyItem} style={{
        backgroundColor: '#F7F7F7'
      }}>
        <div className={styles.right}>
          <Image
            fill
            style={{
              objectFit: "contain",
            }}
            src="/images/2.png"
            alt="map" />
        </div>
        <div className={styles.left}>
          <div className={styles.bodyTitle}>
            {"How StaQ solves it？"}
          </div>
          <div className={styles.bodyDesc}>
            {"StaQ operates mainnet nodes on various Bitcoin L2s. Users only need to delegate their mainnet tokens for staking to StaQ's nodes, and StaQ will give users a mapped token on a 1:1 basis. This mapped token maintains a roughly 1:1 exchange ratio with the mainnet token in DeFi, and users can automatically earn interest income."}
          </div>
        </div>
      </div>

      <div className={styles.user}>

        <div className={styles.userTitle}>{"How to participate"}</div>
        <div className={styles.steps}>

          <div className={styles.step}>
            <div className={styles.stepImage}><Image
              fill
              style={{
                objectFit: "contain",
              }}
              src="/images/step1.png"
              alt="map" /></div>
            <div className={styles.stepTitle}>{"STEP 1"}</div>
            <div className={styles.stepDesc}>{"Delegate tokens for staking in StaQ's Bitcoin L2 mainnet nodes."}</div>

          </div>
          <div className={styles.step}>
            <div className={styles.stepImage}><Image
              fill
              style={{
                objectFit: "contain",
              }}
              src="/images/step2.png"
              alt="map" /></div>
            <div className={styles.stepTitle}>{"STEP 2"}</div>
            <div className={styles.stepDesc}>{"Receive $STAQ and staking rewards."}</div>

          </div>
          <div className={styles.step}>
            <div className={styles.stepImage}><Image
              fill
              style={{
                objectFit: "contain",
              }}
              src="/images/step3.png"
              alt="map" /></div>
            <div className={styles.stepTitle}>{"STEP 3"}</div>
            <div className={styles.stepDesc}>{"Use $STAQ in various DeFi to enjoy more profits."}</div>

          </div>

        </div>
      </div>


      <div className={styles.bodyItem}
        style={{
          background: "linear-gradient(90deg, #EAF3FF 0%, #F8F4FF 100%), #F7F7F7"
        }}>
        <div className={styles.left}>
          <div className={styles.bodyTitle}>
            {"Deployed in the thriving Bitcoin L2 network"}
          </div>
          <div className={styles.bodyDesc}>
            {"StaQ is deployed on various thriving Bitcoin L2s, ncluding MAP Protocol Merlin, BEVM, B Square and more, thus serving as a liquidity provider for staking across all L2s in the Bitcoin ecosystem."}
          </div>
        </div>
        <div className={styles.right}>
          <Image
            fill
            style={{
              objectFit: "contain",
            }}
            src="/images/3.png"
            alt="map" />
        </div>
      </div>
      <div className={styles.bodyItem} style={{
        background: "linear-gradient(90deg, #FFF2E3 3.73%, #DAEAFF 94.08%)"
      }}>
        <div className={styles.right}>
          <Image
            fill
            style={{
              objectFit: "contain",
            }}
            src="/images/4.png"
            alt="map" />
        </div>
        <div className={styles.left}>
          <div className={styles.bodyTitle}>
            {"Facilitates liquidity interchange through MAP Protocol"}
          </div>
          <div className={styles.bodyDesc}>
            {"Staking tokens from different mainnets cannot provide mutual liquidity. StaQ, powered by MAP Protocol – the interoperable gateway of Bitcoin L2s, makes it possible for staking tokens from various Bitcoin L2 mainnets to achieve liquidity exchange."}
          </div>
        </div>
      </div>

      <div className={styles.defi}>
        <div className={styles.defiTitle}>
          {"StaQ with DeFi"}
        </div>
        <div className={styles.defiDesc}>
          {"Staking tokens on StaQ are supported by numerous Bitcoin L2 DeFi services for liquidity and profit rewards, and the list is growing."}
        </div>


        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.cardImage}>
              <Image
                fill
                style={{
                  objectFit: "contain",
                }}
                src="/images/7.png"
                alt="map" />
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardImage}>
              <Image
                fill
                style={{
                  objectFit: "contain",
                }}
                src="/images/8.png"
                alt="map" />
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardImage}>
              <Image
                fill
                style={{
                  objectFit: "contain",
                }}
                src="/images/9.png"
                alt="map" />
            </div>
          </div>
        </div>
      </div>

      {/* <div className={styles.audit}>
        <div className={styles.auditTitle}>
          {"Audit"}
        </div>

        <div className={styles.auditBody}>
          <div className={styles.auditLeft}>
            <div className={styles.metaturst}>
              <Image
                fill
                style={{
                  objectFit: "contain",
                }}
                src="/images/audit1.png"
                alt="map" />
            </div>
            <div className={styles.auditLine}></div>
            
            <div className={styles.auditLeftTitle}>
              {"Stake LiQuid on Bitcoin | Apr 2023"}
            </div>
            <div className={styles.auditLeftDesc}>
              {"METATRUST Audit Report"}
            </div>
            <div className={styles.auditButton}>
              {"See Report"}
            </div>
          </div>
          <div className={styles.auditRight}>
            <div className={styles.auditImage}>
              <Image
                fill
                style={{
                  objectFit: "contain",
                }}
                src="/images/5.png"
                alt="map" />
            </div>
          </div>
        </div>
      </div> */}

      <div className={styles.footer}>

        <div className={styles.footerLeft}>
          <Image
            style={{
              cursor: 'pointer'
            }}
            height={35}
            width={107.5}
            src="/images/logo.png"
            alt="map" />
        </div>

        <div className={styles.footerRight}>
          <div className={styles.footerItem}>
            <div className={styles.footerItemTitle}>{"Network"}</div>
            <div className={styles.footerItemDesc}>{"Map Protocol"}</div>
            <div className={styles.footerItemDesc}>{"Merlin Chain"}<div className={styles.coming}>{"coming soon"}</div></div>
            <div className={styles.footerItemDesc}>{"Conflux"}<div className={styles.coming}>{"coming soon"}</div></div>
            <div className={styles.footerItemDesc}>{"B² Network"}<div className={styles.coming}>{"coming soon"}</div></div>
          </div>
          <div className={styles.footerItem}>
            <div className={styles.footerItemTitle}>{"Node"}</div>
            <div className={styles.footerItemDesc} onClick={()=>{
              window.open("https://www.maposcan.io/validators/0x2ef75b32c26bc92977998c6d19e527e49fad0d9b")
            }}>{"StaQ Map Node"}</div>
          </div>
          <div className={styles.footerItem}>
            <div className={styles.footerItemTitle}>{"Github"}</div>
            <div className={styles.footerItemDesc}>{"Document"}</div>
          </div>
          <div className={styles.footerItem}>
            <div className={styles.footerItemTitle}>{"Media"}</div>
            <div className={styles.footerItemDesc}>{"Telegram"}</div>
            <div className={styles.footerItemDesc}>{"Twitter"}</div>
            <div className={styles.footerItemDesc}>{"Discord"}</div>

          </div>
          <div className={styles.footerButton}>
            {"dApp"}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
