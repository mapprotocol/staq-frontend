import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { readContract, writeContract, sendTransaction, waitForTransaction } from '@wagmi/core'
import { abi } from '../../../abi/abi';
import { election_abi } from '../../../abi/election';

import { wagmiConfig } from '../_app';
import { Button, Collapse, CollapseProps, Descriptions, DescriptionsProps, message } from 'antd';
import styles from './index.module.css'
import { ethers } from "ethers";
import moment from 'moment';
import { parseEther, parseGwei } from 'viem';
import Image from 'next/image'
import { abbreviateMiddle, zeroAddress } from '../../utils/string';
import { ELECTIONS_ADDRESS, contract_address, validator_ADDRESS } from '../../constract/address';
import axios from 'axios';
import { useRouter } from 'next/router';
import { LoadingOutlined } from '@ant-design/icons';



const stakeInfo = [
    {
        title: 'You will receive',
        value: '0.0 stMAPO'
    },
    {
        title: 'Exchangerate',
        value: '1 MAPO = 1 stMAPO'
    },
    {
        title: 'Gas Fee',
        value: "0.21 MAPO"
    },
]



const Home: NextPage = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const { chain } = useNetwork();
    const { switchNetworkAsync } = useSwitchNetwork();
    const { address, isConnected, isConnecting } = useAccount();
    const [loading, setLoading] = useState(false)
    const [claimActive, setClaimActive] = useState(0)
    const [active, setActive] = useState('request')
    const [stMAPO, setStMAPO] = useState("")
    const [readyList, setReadyList] = useState<CollapseProps['items']>([])
    const [pendingList, setPendingList] = useState<CollapseProps['items']>([])
    const [inputValue, setInputValue] = useState("")
    const [rate, setRate] = useState(1)
    const [withdrawTab, setWithdrawTab] = useState("lido")
    const router = useRouter()

    const [totalClaimable, setTotalClaimable] = useState("0")
    const [totalPending, setTotalPending] = useState("0")
    const [compeletedList, setCompeletedList] = useState<CollapseProps['items']>([])

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
            setStMAPO(Number(ethers.utils.formatUnits(stMAPO, 18)).toFixed(6).slice(0, -1))
            let rate = await readContract({
                abi,
                address: contract_address,
                functionName: 'convertToShares',
                args: [parseEther('1')],

            })
            setRate(Number(ethers.utils.formatUnits(rate, 18)))
            let withdrawals = await readContract({
                abi,
                address: contract_address,
                functionName: 'getUserPendingWithdrawals',
                args: [address]
            })
            console.log(withdrawals, "withdrawals")
            const _readyList: CollapseProps['items'] = []
            let _totalPending = 0
            let _totalClaimable = 0
            const _pendingList: CollapseProps['items'] = []
            withdrawals.forEach((item, index) => {
                if (new Date().getTime() > Number(item.timestamp) * 1000) {
                    _readyList.push({
                        key: index,
                        label: <div className={styles.collapseItemHeader}>
                            <div>{moment(Number(item.timestamp) * 1000).format("YYYY.MM.DD HH:mm")}</div>
                            <div>{"0D 0H 0M"}</div>
                            <div>{Number(ethers.utils.formatUnits(item.value, 18)).toFixed(6)}</div>
                            <div> <Image
                                height={16}
                                width={16}
                                src="/icons/ready.svg"
                                alt="map" /></div>

                        </div>,
                        children: <p>{ }</p>,
                    })
                    _totalClaimable += Number(ethers.utils.formatUnits(item.value, 18))
                }
                else {
                    let duration = moment.duration(Number(item.timestamp) * 1000 - new Date().getTime())
                    let d = Math.floor(duration.asDays());
                    let h = Math.floor(duration.asHours()) - d * 24;
                    let m = Math.floor(duration.asMinutes()) - d * 24 * 60 - h * 60;
                    _pendingList.push({
                        key: index,
                        label: <div className={styles.collapseItemHeader}>
                            <div>{moment(Number(item.timestamp) * 1000).format("YYYY.MM.DD HH:mm")}</div>
                            <div>{d + "D " + h + "H " + m + "M"}</div>
                            <div>{Number(ethers.utils.formatUnits(item.value, 18)).toFixed(6)}</div>
                            <div> <Image
                                height={16}
                                width={16}
                                src="/icons/pending.svg"
                                alt="map" /></div>

                        </div>,
                        children: <p>{ }</p>,
                    })
                    _totalPending += Number(ethers.utils.formatUnits(item.value, 18))

                }
            })
            setTotalClaimable(_totalClaimable.toFixed(6))
            setTotalPending(_totalPending.toFixed(6))

            setReadyList(_readyList)
            setPendingList(_pendingList)
            getCompeletedList()
        }
    }
    const getCompeletedList = () => {
        const _compeletedListList: CollapseProps['items'] = []

        const url = " https://staq-backend.chainservice.io/queryWithdraws";
        const params = {
            from: address,
            page: "1",
            pageSize: "100"
        };

        axios.get(url, { params })
            .then(response => {
                response.data?.data?.list.forEach((item: any, index: number) => {
                    if (new Date().getTime() > Number(item.timestamp) * 1000)
                        _compeletedListList.push({
                            key: index,
                            label: <div className={styles.collapseItemHeader}>
                                <div>{moment(Number(item.timestamp) * 1000).format("YYYY.MM.DD HH:mm")}</div>
                                <div>{"0D 0H 0M"}</div>
                                <div>{Number(item.amount).toFixed(6)}</div>
                                <div> <Image
                                    height={16}
                                    width={16}
                                    src="/icons/completed.svg"
                                    alt="map" /></div>
                            </div>,
                            children: <p>{ }</p>,
                        })
                })
                setCompeletedList(_compeletedListList)
                // .setState({
                //   data: response.data,
                // });
            }).catch(error => {
                console.error("Error fetching data: ", error);
            });

    }
    const claimFunc = async () => {
        if (loading)
            return
        if (address && isConnected) {
            try {
                setLoading(true)
                const hashRes = await writeContract({
                    abi,
                    address: contract_address,
                    functionName: 'withdraw',
                    gas: parseGwei('0.00061'),
                })

                const res = await waitForTransaction({
                    hash: hashRes.hash,
                })
                if (res.blockHash)
                    messageApi.open({
                        type: 'success',
                        //@ts-ignore
                        content: "claim success",
                    });
                getData()
                setLoading(false)

            } catch (err) {
                setLoading(false)

                messageApi.open({
                    type: 'error',
                    //@ts-ignore
                    content: <div className={styles.error}>{err?.message || "unLock error"}</div>,
                });
                console.log(err)
            }
        }

    }

    const withdrawFunc = async () => {
        if (loading)
            return
        if (inputValue == "")
            return
       
        let validators = await readContract({
            abi: election_abi,
            address: ELECTIONS_ADDRESS,
            functionName: 'getTopValidators',
            args: [BigInt(60)]
        })
        let lesser: `0x${string}` = zeroAddress()
        let greater: `0x${string}` = zeroAddress()

        validators.forEach((item, index) => {
            if (item == validator_ADDRESS) {
                if (index == 0) {
                    greater = zeroAddress()
                } else {
                    greater = validators[index - 1]
                }
                if (index == validators.length - 1) {
                    lesser = zeroAddress()
                } else {
                    lesser = validators[index + 1]
                }

            }
        })

        if (address && isConnected) {
            try {
                setLoading(true)
                const hashRes = await writeContract({
                    abi,
                    address: contract_address,
                    functionName: 'unLock',
                    args: [
                        parseEther(inputValue),
                        lesser,
                        greater
                    ],
                    gas: parseGwei('0.00061'),

                })

                const res = await waitForTransaction({
                    hash: hashRes.hash,
                })
                if (res.blockHash)
                    messageApi.open({
                        type: 'success',
                        //@ts-ignore
                        content: "unLock success",
                    });
                await getData()
                setLoading(false)


            } catch (err) {
                setLoading(false)

                messageApi.open({
                    type: 'error',
                    //@ts-ignore
                    content: <div className={styles.error}>{err?.message || "unLock error"}</div>,
                });
            }
        }

    }
    const setMaxValue = () => {
        setInputValue(stMAPO)
    }
    const handleInputChange = (e: any) => {
        if (isNaN(e.target.value)) {
            return;
        }
        setInputValue(e.target.value);
    };
    return (
        <>
            <title>{"STAQ"}</title>
            <meta name="description" content={"Liquidity for Staked Tokens in Bitcoin Layer2s Ecosystem."} />
            <link rel="icon" href="/images/logo1.png" />
            {contextHolder}
            <div className={styles.body}>
                <div className={styles.withdraw}>
                    <div className={styles.withdrawTitle}>
                        {"Withdraw"}
                    </div>
                    <div className={styles.withdrawDesc}>
                        {"Request stMAPO withdrawal and claim MAPO"}
                    </div>

                    {address && <div className={styles.tabs}>
                        <div className={styles.tab}
                            onClick={() => {
                                setActive("request")
                            }}
                            style={{
                                backgroundColor: active == "request" ? '#3F6DFF' : '#fff',
                                color: active == "request" ? '#fff' : '#000',
                            }}>{"Request"}</div>
                        <div className={styles.tab}
                            onClick={() => {
                                setActive("claim")
                            }} style={{
                                backgroundColor: active == "claim" ? '#3F6DFF' : '#fff',
                                color: active == "claim" ? '#fff' : '#000',
                            }}>{"Claim"}</div>
                    </div>}
                    {address && <div className={styles.personal}>
                        <div className={styles.personalTitle}>
                            {'Personal Information'}
                            <div className={styles.personalAddress}>{abbreviateMiddle(address, 6, 6)}</div>
                        </div>
                        <div className={styles.personalInfo}>

                            <> <div className={styles.infoItem}>
                                <div className={styles.personaInfolTitle}>{"stMAP Balance"}</div>
                                <div className={styles.personalValue}>{stMAPO + " stMAPO"}</div>
                            </div>
                                {active == "claim" && <><div className={styles.infoItem}>
                                    <div className={styles.personaInfolTitle}>{"Requests"}</div>
                                    <div className={styles.personalValue}>
                                        <div className={styles.claimstatus}>
                                            <Image
                                                height={16}
                                                width={16}
                                                src="/icons/ready.svg"
                                                alt="" />{"ready"} {readyList?.length}</div>
                                        <div className={styles.claimstatus}>
                                            <Image
                                                height={16}
                                                width={16}
                                                src="/icons/pending.svg"
                                                alt="" />{"pending"} {pendingList?.length}</div>
                                    </div>
                                </div>
                                    <div className={styles.infoItem}>
                                        <div className={styles.personaInfolTitle}>{"Total Pending Amount"}</div>
                                        <div className={styles.personalValue}>{totalPending + " MAPO"}</div>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <div className={styles.personaInfolTitle}>{"Total claimable Amount"}</div>
                                        <div className={styles.personalValue}>{totalClaimable + " MAPO"}</div>
                                    </div></>}
                            </>
                        </div>
                        {active == "claim" && <ConnectButton.Custom>
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
                                            if (Number(totalClaimable) == 0) {
                                                return (
                                                    <div className={styles.connectButtonDisable}>
                                                        Claim
                                                    </div>
                                                );
                                            }
                                            return (
                                                <div className={styles.connectButton} onClick={claimFunc}>
                                                    {loading ? <LoadingOutlined /> : "Claim"}
                                                </div>
                                            );
                                        })()}
                                    </div>
                                );
                            }}
                        </ConnectButton.Custom>}
                    </div>}


                    {active == "request" ? <div className={styles.stakeCard}>
                        <div className={styles.withdrawTab}>
                            <div className={styles.tabs}
                                style={{
                                    width: "300px"
                                }}>
                                <div className={styles.tab}
                                    onClick={() => {
                                        setWithdrawTab("lido")
                                    }}
                                    style={{
                                        width: '150px',
                                        backgroundColor: withdrawTab == "lido" ? '#3F6DFF' : '#FAFAFA',
                                        color: withdrawTab == "lido" ? '#fff' : '#000',
                                    }}>{"Use STAQ"}</div>
                                <div className={styles.tab}
                                    onClick={() => {
                                        setWithdrawTab("aggregators")
                                    }} style={{
                                        width: '150px',
                                        backgroundColor: withdrawTab == "aggregators" ? '#3F6DFF' : '#FAFAFA',
                                        color: withdrawTab == "aggregators" ? '#fff' : '#000',
                                    }}>{"Use Aggregators"}</div>
                            </div>
                        </div>
                        {withdrawTab == "lido" ? <>
                            <div className={styles.inputOut}>
                                <div className={styles.inputLeft}>
                                    <Image
                                        height={24}
                                        width={24}
                                        src="/images/map.png"
                                        alt="map" />
                                    <input value={inputValue} onChange={handleInputChange} type="text" className={styles.input} placeholder={"MAPO Amount"} />
                                </div>
                                <div onClick={
                                    setMaxValue} className={styles.max}>{"MAX"}</div>
                            </div>
                            <div className={styles.output}>
                                <div className={styles.inputLeft}>
                                    <Image
                                        height={24}
                                        width={24}
                                        src="/images/map.png"
                                        alt="map" />
                                    <div className={styles.outputTitle}>MAPO</div>
                                </div>
                                <div className={styles.outputValue}>{(Number(inputValue) / rate).toFixed(6) + " MAPO"}</div>
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
                                                if (inputValue > stMAPO) {
                                                    return (
                                                        <div className={styles.connectButtonDisable}>
                                                            Insufficient balance
                                                        </div>
                                                    );

                                                }
                                                return (
                                                    <div className={styles.connectButton} onClick={withdrawFunc}>
                                                        {loading ? <LoadingOutlined /> : "Request Withdrawal"}
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                    );
                                }}
                            </ConnectButton.Custom>


                            <div className={styles.stakeInfo}>
                                <div className={styles.infoItem}>
                                    <div className={styles.infoTitle}>{"Exchange rate"}</div>
                                    <div className={styles.infoValue}>{"1 stMAPO = " + (1 / rate).toFixed(6) + " MAPO"}</div>
                                </div>
                            </div>

                        </> : <>
                            <div className={styles.aggregator}>
                                <Image
                                    width={32}
                                    height={32}

                                    src="/icons/dex1.png"
                                    alt="map" />
                                <div className={styles.aggregatorRight}>
                                    <div className={styles.aggregatorTitle}>
                                        {"Hiveswap"}
                                        <div
                                            onClick={() => {
                                                window.open('https://app.hiveswap.io/swap')
                                            }}
                                            className={styles.goto}>
                                            {"Go to Hiveswap"}
                                            <Image
                                                width={12}
                                                height={12}

                                                src="/icons/go.svg"
                                                alt="map" />
                                        </div>
                                    </div>
                                    <div className={styles.aggregatorInfo}>
                                        <div style={{
                                            color: '#7A8AA0'
                                        }}>Rate:</div>
                                        <div>1 : 0.997</div>
                                    </div>
                                </div>

                            </div>
                        </>}
                    </div> : <div className={styles.claim}>
                        <div className={styles.claimTabs}>
                            <div className={styles.claimTab}
                                style={{
                                    backgroundColor: claimActive == 0 ? '#53BA95' : '#fafafa',
                                    color: claimActive == 0 ? '#fff' : '#000',
                                }}
                                onClick={() => { setClaimActive(0) }}
                            >  <Image
                                    height={15}
                                    width={15}
                                    src={`/icons/${claimActive == 0 ? "ready-active" : "ready"}.svg`}
                                    alt="icons" />{"Ready"}</div>
                            <div className={styles.claimTab}
                                style={{
                                    backgroundColor: claimActive == 1 ? '#EC8602' : '#fafafa',
                                    color: claimActive == 1 ? '#fff' : '#000',
                                }}
                                onClick={() => { setClaimActive(1) }}
                            >  <Image
                                    height={15}
                                    width={15}
                                    src={`/icons/${claimActive == 1 ? "pending-active" : "pending"}.svg`}
                                    alt="icons" />{"Pending"}</div>
                            <div className={styles.claimTab}
                                style={{
                                    backgroundColor: claimActive == 2 ? '#BCBCBC' : '#fafafa',
                                    color: claimActive == 2 ? '#fff' : '#000',
                                }}
                                onClick={() => { setClaimActive(2) }}
                            >  <Image
                                    height={15}
                                    width={15}
                                    src={`/icons/${claimActive == 2 ? "completed-active" : "completed"}.svg`}
                                    alt="icons" />{"Compeleted"}</div>
                        </div>

                        <div className={styles.collapse}>
                            <div className={styles.collapseHeader}>
                                <div>{"Unlock Date"}</div>
                                <div>{"Time Left"}</div>
                                <div>{"MAPO Amount"}</div>
                                <div>{"State"}</div>
                            </div>
                            <Collapse accordion items={[readyList, pendingList, compeletedList][claimActive]} />
                        </div>
                    </div>}
                </div>
            </div >
        </>
    );
};

export default Home;
