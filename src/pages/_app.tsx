import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { api } from "lib/api";

import "~/styles/globals.css";
import Head from "next/head";
import AppLayout from "components/layout/AppLayout";
import { Toaster } from "react-hot-toast";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Menu Mentor</title>
      </Head>
      <ClerkProvider {...pageProps}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
        <Toaster position="bottom-center" />
      </ClerkProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
