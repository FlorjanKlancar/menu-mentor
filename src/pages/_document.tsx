import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />

        <meta
          name="description"
          content="Get personalized food recommendations based on your preferences. Menu Mentor, your culinary guide."
        />
        <meta property="og:site_name" content="Menu Mentor" />
        <meta
          property="og:description"
          content="Get personalized food recommendations based on your preferences. Menu Mentor, your culinary guide."
        />
        <meta property="og:title" content="Menu Mentor" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
