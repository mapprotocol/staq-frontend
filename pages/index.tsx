import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { readContract, writeContract, sendTransaction, waitForTransaction } from '@wagmi/core'
import { abi } from '../abi/abi';
import { wagmiConfig } from './_app';
import { Button, Descriptions, DescriptionsProps, message } from 'antd';
import styles from './index.module.css'
import { ethers } from "ethers";
import moment from 'moment';
import { parseEther } from 'viem';

const initData = {
  claimAble: "0",
  unlockTime: "0",
  claimed: "0",
  claimer: "0x",
  token: "0x"
}

const contract_address = '0x766A7eB647b684E29A04FE43215eEC1B2C077E27'
const Home: NextPage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const { chain } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();
  const { address, isConnected, isConnecting } = useAccount();
  const [data, setData] = useState(initData);
  const [loading, setLoading] = useState(false)
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
        claimAble: ethers.utils.formatUnits(claimAble, 6),
        unlockTime: moment(new Date(Number(unlockTime.toString()) * 1000)).format('YYYY-MM-DD HH:mm:ss'),
        claimed: ethers.utils.formatUnits(claimed, 6),
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
    try {
      setLoading(true)

      const hashRes = await writeContract({
        abi,
        address: contract_address,
        functionName: 'claim',
      })
      // const hashRes = await sendTransaction({
      //   to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      //   value: parseEther('0.01'),
      // })
      const res = await waitForTransaction({
        hash: hashRes.hash,
      })
      if (res.blockHash)
        messageApi.open({
          type: 'success',
          //@ts-ignore
          content: "claim success",
        });
      loadData()
      setLoading(false)

    } catch (err) {
      setLoading(false)

      messageApi.open({
        type: 'error',
        //@ts-ignore
        content: err?.details || "claim error",
      });
      console.log(err)
    }
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
      span: 2,
      children: <p>{data.claimAble}</p>,
    },
    {
      key: '1',
      label: 'Claimed',
      span: 2,
      children: <p>{data.claimed}</p>,
    },
    {
      key: '1',
      label: 'Claimer address',
      span: 4,
      children: <p>{data.claimer}</p>,
    },
    {
      key: '1',
      label: 'Token address',
      span: 4,
      children: <p>{data.token}</p>,
    },
    {
      key: '1',
      label: 'Constrart address',
      span: 4,
      children: <p>{data.claimAble === "0" ? "0x" : contract_address}</p>,
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
      {contextHolder}
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
        <Button type="primary"
          disabled={!(Number(data.claimAble) > 0)} 
          loading={loading}
          onClick={claim}>Claim</Button>

      </div>

      {/* <div onClick={() => {
        switchNetWork()
      }}>switchNetWork</div> */}
    </>
  );
};

export default Home;
