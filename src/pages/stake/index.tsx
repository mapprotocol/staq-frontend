import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { useBalance } from 'wagmi'

import { readContract, writeContract, sendTransaction, waitForTransaction } from '@wagmi/core'
import { abi } from '../../../abi/abi';
import { wagmiConfig } from '../_app';
import { Button, Descriptions, DescriptionsProps, message } from 'antd';
import styles from './index.module.css'
import { ethers } from "ethers";
import moment from 'moment';
import { parseEther, parseGwei } from 'viem';
import Image from 'next/image'
import { abbreviateMiddle } from '../../utils/string';
import { contract_address } from '../../constract/address';
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';

const initData = {
    claimAble: "0",
    unlockTime: "0",
    claimed: "0",
    claimer: "0x",
    token: "0x"
}

const stakeCards = [
    {
        title: 'Total staked with MAPO (TVL)',
        value: '$9,413,365.886'
    },
    {
        title: 'Annual Percentage Rate',
        value: '3.4%'
    },
    {
        title: 'Number of Platform-Issued stMAPOs',
        value: "9,413,365.886"
    },
    {
        title: 'Total Number of Pledges',
        value: '31820'
    }
]





const Home: NextPage = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const { chain } = useNetwork();
    const { switchNetworkAsync } = useSwitchNetwork();
    const { address, isConnected, isConnecting } = useAccount();
    const [loading, setLoading] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [rate, setRate] = useState(1)
    const [stMAPO, setStMAPO] = useState("0")
    const [apr, setApr] = useState(0)
    const result = useBalance({ address })
    useEffect(() => {
        getData()

    }, [])

    const getData = async () => {

        if (address) {
            let stMAPO = await readContract({
                abi,
                address: contract_address,
                functionName: 'balanceOf',
                args: [address]
            })
            setStMAPO(Number(ethers.utils.formatUnits(stMAPO, 18)).toFixed(6))
            let rate = await readContract({
                abi,
                address: contract_address,
                functionName: 'convertToShares',
                args: [parseEther('1')],
                // gas:parseGwei("")
            })
            console.log(rate, 11111)

            setRate(Number(ethers.utils.formatUnits(rate, 18)))
        }

        const url = "https://staq-backend.chainservice.io/queryPrice";


        axios.get(url)
            .then(response => {
                const x = 31104000000 / (new Date(response.data.data.list[0].createdAt).getTime() - new Date(response.data.data.list[1].createdAt).getTime())
                setApr(Number((response.data.data.list[0].price - response.data.data.list[1].price) / response.data.data.list[1].price * x))
                // .setState({
                //   data: response.data,
                // });
            }).catch(error => {
                console.error("Error fetching data: ", error);
            });

    }


    const stakeFunc = async () => {
        if (loading)
            return
        if (Number(inputValue) < 10) {
            messageApi.open({
                type: 'error',
                //@ts-ignore
                content: "At least 10 MAPO",
            });
            return
        }
        if (address && isConnected) {
            try {
                setLoading(true)

                const hashRes = await writeContract({
                    abi,
                    address: contract_address,
                    functionName: 'deposit',
                    args: [
                        parseEther(inputValue)
                    ],
                    gas: parseGwei('0.00025'),
                    // overrides: {
                    //     gasLimit: 21000,
                    //   },
                    value: parseEther(inputValue)
                })

                const res = await waitForTransaction({
                    hash: hashRes.hash,
                })
                if (res.blockHash)
                    messageApi.open({
                        type: 'success',
                        //@ts-ignore
                        content: "Stake success",
                    });
                setLoading(false)

            } catch (err) {
                setLoading(false)

                messageApi.open({
                    type: 'error',
                    //@ts-ignore
                    content: err?.details || "Stake error",
                });
                console.log(err)
            }
        }

    }

    const setMaxInput = () => {
        setInputValue(Number(result.data?.formatted).toFixed(6))

    }

    const handleInputChange = (e: any) => {
        if (isNaN(e.target.value)) {
            return;
        }
        setInputValue(e.target.value);

    }

    return (
        <>
            <title>{"STAQ"}</title>
            <meta name="description" content={"Liquidity for Staked Tokens in Bitcoin Layer2s Ecosystem."} />
            <link rel="icon" href="/images/logo1.png" />
            {contextHolder}
            <div className={styles.body}>
                {/* <div className={styles.total}>
                    <div className={styles.totalTitle}>
                        {"MAP Statistics"}
                    </div>

                    <div className={styles.cards}>
                        {stakeCards.map((item, index) =>
                            <div key={index}
                                className={styles.totalCard}>
                                <div className={styles.cardTitle}>
                                    {item.title}
                                </div>
                                <div className={styles.cardValue}>
                                    {item.value}
                                </div>
                            </div>)}
                        <div>

                        </div>
                    </div>
                </div> */}

                <div className={styles.stake}>
                    <div className={styles.stakeTitle}>
                        {"Stake MAPO"}
                    </div>
                    <div className={styles.stakeDesc}>
                        {"Stake MAPO and receive stMAPO while staking."}
                    </div>
                    {address && <div className={styles.personal}>
                        <div className={styles.personalTitle}>
                            {'Personal Information'}
                            <div className={styles.personalAddress}>{abbreviateMiddle(address, 6, 6)}</div>
                        </div>
                        <div className={styles.personalInfo}>
                            <div className={styles.infoItem}>
                                <div className={styles.personaInfolTitle}>{"Available to Stake"}</div>
                                <div className={styles.personalValue}>{Number(result.data?.formatted).toFixed(6) + " MAPO"}</div>
                            </div>
                            <div className={styles.infoItem}>
                                <div className={styles.personaInfolTitle}>{"Staked Amount"}</div>
                                <div className={styles.personalValue}>{stMAPO + " stMAPO"}</div>
                            </div>
                            <div className={styles.infoItem}>
                                <div className={styles.personaInfolTitle}>{"APR"}</div>
                                <div className={styles.personalValue}>{(apr * 100).toFixed(2) + "%"}</div>
                            </div>
                        </div>
                    </div>}


                    <div className={styles.stakeCard}>
                        <div className={styles.inputOut}>
                            <div className={styles.inputLeft}> <Image
                                height={24}
                                width={24}
                                src="/images/map.png"
                                alt="map" />
                                <input value={inputValue} onChange={handleInputChange} type="text" className={styles.input} placeholder={"MAPO Amount"} />
                            </div>
                            <div onClick={setMaxInput} className={styles.max}>{"MAX"}</div>
                        </div>

                        <ConnectButton.Custom>
                            {({
                                account,
                                chain,
                                openAccountModal,
                                openChainModal,
                                openConnectModal,
                                authenticationStatus,
                                mounted,
                            }) => {
                                const ready = mounted && authenticationStatus !== 'loading';
                                const connected =
                                    ready &&
                                    account &&
                                    chain &&
                                    (!authenticationStatus ||
                                        authenticationStatus === 'authenticated');

                                return (
                                    <div
                                        {...(!ready && {
                                            'aria-hidden': true,
                                            'style': {
                                                opacity: 0,
                                                pointerEvents: 'none',
                                                userSelect: 'none',
                                            },
                                        })}

                                    >
                                        {(() => {
                                            if (!connected) {
                                                return (
                                                    <div className={styles.connectButton} onClick={openConnectModal} >
                                                        Connect Wallet
                                                    </div>
                                                );
                                            }

                                            if (chain.unsupported) {
                                                return (
                                                    <div className={styles.connectButton} onClick={openChainModal}>
                                                        Switch network
                                                    </div>
                                                );
                                            }
                                            if (Number(inputValue) > Number(result.data?.formatted)) {
                                                return (
                                                    <div className={styles.connectButtonDisable}>
                                                        Insufficient balance
                                                    </div>
                                                );
                                            }

                                            return (
                                                <div className={styles.connectButton} onClick={stakeFunc}>
                                                    {loading ? <LoadingOutlined /> : "Stake"}
                                                </div>
                                            );
                                        })()}
                                    </div>
                                );
                            }}
                        </ConnectButton.Custom>
                        <div className={styles.stakeInfo}>
                            <div className={styles.infoItem}>
                                <div className={styles.infoTitle}>{"You will receive"}</div>
                                <div className={styles.infoValue}>{(rate * Number(inputValue)).toFixed(6) + " stMAPO"}</div>
                            </div>
                            <div className={styles.infoItem}>
                                <div className={styles.infoTitle}>{"Exchange rate"}</div>
                                <div className={styles.infoValue}>{"1 MAPO = " + rate.toFixed(6) + " stMAPO"}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
