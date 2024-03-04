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

          router.push('/stake')

        }} className={styles.enterButton}>
          {"Staking Now"}
        </div>

        <div className={styles.datas}>
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
        </div>
      </div>
      <div className={styles.bodyItem}>
        <div className={styles.left}>
          <div className={styles.bodyTitle}>
            {"staQ解决什么问题？"}
          </div>
          <div className={styles.bodyDesc}>
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
            {"StaQ如何解决？"}
          </div>
          <div className={styles.bodyDesc}>
            {"StaQ在各比特币Layer2搭建主网节点，用户只需将自己的主网代币，委托质押给StaQ的节点，StaQ便会1:1给到用户一个映射代币，该映射代币和主网代币在defi中保持约1：1的兑换比例，并且用户可以自动获得利息收入。"}
          </div>
        </div>
      </div>

      <div className={styles.user}>

        <div className={styles.userTitle}>{"用户如何操作"}</div>
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
            <div className={styles.stepDesc}>{"用户委托质押进StaQ在比特币L2主网节点"}</div>

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
            <div className={styles.stepDesc}>{"收到ST Tokens 以及奖励"}</div>

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
            <div className={styles.stepDesc}>{"将ST Tokens用到各种defi中享受更多的收益"}</div>

          </div>

        </div>
      </div>


      <div className={styles.bodyItem}
        style={{
          background: "linear-gradient(90deg, #EAF3FF 0%, #F8F4FF 100%), #F7F7F7"
        }}>
        <div className={styles.left}>
          <div className={styles.bodyTitle}>
            {"StaQ部署于繁荣的比特币L2网络"}
          </div>
          <div className={styles.bodyDesc}>
            {"包括MAP Protocol、Merlin、BEVM、B Square 等，这意味着StaQ是服务所有比特币生态二层的质押流动性提供商。"}
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
            {"StaQ 通过 MAP Protocol 进行流动性互通"}
          </div>
          <div className={styles.bodyDesc}>
            {"不同主网的Stake Tokens无法互相拥有流动性，StaQ通过比特币二层互操作性入口MAP Protocol，让各个比特币L2主网的staking tokens，实现流动性互换。"}
          </div>
        </div>
      </div>

      <div className={styles.defi}>
        <div className={styles.defiTitle}>
          {"哪些defi支持StaQ？"}
        </div>
        <div className={styles.defiDesc}>
          {"StaQ的stake token被众多比特币L2的defi支持流动性及收益奖励，并在不断增加。"}
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
          {"StaQ审计报告"}
        </div>
        <div>

        </div>
      </div> */}
    </>
  );
};

export default Home;
