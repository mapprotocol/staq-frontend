
import { useRouter } from "next/router"
import Header from "../components/header"

export default function Layout({ children }:any ) {
  const router = useRouter()
  return (
    <>
      <Header />
      <main >{children}</main>
    </>
  )
}
