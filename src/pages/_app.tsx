import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import store from '@/redux/store';
import '@/styles/index.scss';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ConfigProvider>
  );
};

export default MyApp;
