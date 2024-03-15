
import { useRouter } from "next/router"
import Header from "../components/header"
import Head from 'next/head';

export default function Layout({ children }: any) {
  const router = useRouter()
  return (
    <>
      <Header />
      <Head>

        <title>{"STAQ"}</title>
        <meta name="description" content={"Liquidity for Staked Tokens in Bitcoin Layer2s Ecosystem."} />
        <link rel="icon" href="/images/logo1.png" />
       
      </Head>
      <main >{children}</main>
    </>
  )
}
