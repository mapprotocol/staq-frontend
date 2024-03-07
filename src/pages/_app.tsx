import '../styles/global.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  Locale,
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { Chain, configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
  zora,
} from 'wagmi/chains';
import Header from '../components/header';
import Layout from './layout';


const map: Chain = {
  id: 22776,
  name: 'MAP Protocol',
  network: 'MAP Protocol',
  nativeCurrency: {
    decimals: 18,
    name: 'MAPO',
    symbol: 'MAPO',
  },
  rpcUrls: {
    public: { http: ['https://rpc.maplabs.io'] },
    default: { http: ['https://rpc.maplabs.io'] },
  },
  blockExplorers: {
    default: { name: 'MAP Scan', url: 'https://maposcan.io/' },
  },
  contracts: {
  
  },
  testnet: false,
};

const map_testnet: Chain = {
  id: 212,
  name: 'MAP Makalu',
  network: 'MAP Testnet Makalu',

  nativeCurrency: {
    decimals: 18,
    name: 'MAP Makalu',
    symbol: 'MAP',
  },
  rpcUrls: {
    public: { http: ['https://testnet-rpc.maplabs.io'] },
    default: { http: ['https://testnet-rpc.maplabs.io'] },
  },
  blockExplorers: {
    default: { name: 'MAP Scan', url: 'https://testnet.maposcan.io/' },
  },

  testnet: false,
};


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    // mainnet,
    // polygon,
    map,
    // map_testnet
  ],
  [publicProvider()]
);

const projectId = '326af5fe4e9b1b9423b70ba2ea688b2e';

const { wallets } = getDefaultWallets({
  appName: 'RainbowKit demo',
  projectId,
  chains,
});

const demoAppInfo = {
  appName: 'Rainbowkit Demo',
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter() as { locale: Locale };
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider appInfo={demoAppInfo} chains={chains} locale={locale}>
        <AntdRegistry><Layout><Component {...pageProps} /></Layout></AntdRegistry>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
