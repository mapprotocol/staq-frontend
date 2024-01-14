import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { readContract, writeContract } from '@wagmi/core'
import { abi } from './abi';
import { wagmiConfig } from './_app';
import { Button, Descriptions, DescriptionsProps } from 'antd';
import styles from './index.module.css'
import { ethers } from "ethers";
import moment from 'moment';

const initData = {
  claimAble: "0",
  unlockTime: "0",
  claimed: "0",
  claimer: "0x",
  token: "0x"
}
const contract_address = '0x766A7eB647b684E29A04FE43215eEC1B2C077E27'
const Home: NextPage = () => {

  const { chain } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();
  const { address, isConnected, isConnecting } = useAccount();
  const [data, setData] = useState(initData);

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    loadData()

  }, [chain?.id, address])
  const loadData = async () => {
    try {
      const claimAble = await readContract({
        abi,
        address: contract_address,
        functionName: 'getClaimable'
      })
      const unlockTime = await readContract({
        abi,
        address: contract_address,
        functionName: 'unlockTime'
      })
      const claimed = await readContract({
        abi,
        address: contract_address,
        functionName: 'claimed'
      })
      const claimer = await readContract({
        abi,
        address: contract_address,
        functionName: 'claimer'
      })
      const token = await readContract({
        abi,
        address: contract_address,
        functionName: 'token'
      })
      console.log(claimAble.toString(), claimed.toString(), token, claimer, moment(new Date(Number(unlockTime.toString()) * 1000)).format('MM/DD/YYYY'))
      setData({
        claimAble: ethers.utils.formatUnits(claimAble, 18),
        unlockTime: moment(new Date(Number(unlockTime.toString()) * 1000)).format('YYYY-MM-DD HH:mm:ss'),
        claimed: ethers.utils.formatUnits(claimed, 18),
        claimer: claimer,
        token: token
      })
    }
    catch (e) {
      console.log(e)
      setData(initData)
    }
  }

  const claim = async () => {
    const res = writeContract({
      abi,
      address: contract_address,
      functionName: 'claim',
    })
    console.log(res)
  }

  const items: DescriptionsProps['items'] = [
    {
      key: '2',
      label: 'Unlock start time',
      span: 4,
      children: <p>{data.unlockTime}</p>,
    },
    {
      key: '1',
      label: 'Claimable',
      span: 4,
      children: <p>{data.claimAble}</p>,
    },
    {
      key: '1',
      label: 'Claimed',
      span: 4,
      children: <p>{data.claimed}</p>,
    },
    {
      key: '1',
      label: 'Claimer',
      span: 4,
      children: <p>{data.claimer}</p>,
    },
    {
      key: '1',
      label: 'constrart address',
      span: 4,
      children: <p>{data.token}</p>,
    },
    // {
    //   key: '3',
    //   label: 'Live',
    //   span: 4,
    //   children: <p>Hangzhou, Zhejiang</p>,
    // },
    // {
    //   key: '4',
    //   label: 'Remark',
    //   span: 4,
    //   children: <p>empty</p>,
    // },
    // {
    //   key: '5',
    //   label: 'Address',
    //   children: <p>No. 18, ssWantang Road, Xihu District, Hangzhou, Zhejiang, China</p>,
    // },
  ];

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: 12,
        }}
      >
        <ConnectButton />
      </div>
      <div className={styles.body}>
        <Descriptions className={styles.table} title="Claim Token" bordered items={items} />
        <Button type="primary" onClick={claim}>Claim</Button>

      </div>

      {/* <div onClick={() => {
        switchNetWork()
      }}>switchNetWork</div> */}
    </>
  );
};

export default Home;
