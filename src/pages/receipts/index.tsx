import React from "react";
import Head from "next/head";
import FooterLayout from "components/layout/FooterLayout";
import ReceiptsGrid from "components/ReceiptsGrid";
import { useRouter } from "next/router";

function ReceiptsPage() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Receipts - Menu Mentor</title>
      </Head>

      <FooterLayout
        headerTitle={`Your Receipts ${String.fromCodePoint(127858)}`}
        sideActionButton={
          <button
            className="btn-secondary btn w-full"
            onClick={() => router.push("/")}
          >
            Generate new Receipt
          </button>
        }
      >
        <div className="h-full min-h-screen">
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            <ReceiptsGrid />
          </ul>
        </div>
      </FooterLayout>
    </>
  );
}

export default ReceiptsPage;
