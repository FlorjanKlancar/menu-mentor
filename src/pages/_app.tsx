import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { api } from "~/utils/api";

import "~/styles/globals.css";
import Head from "next/head";
import MainLayout from "components/layout/MainLayout";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Menu Mentor</title>
      </Head>
      <ClerkProvider {...pageProps}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ClerkProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
