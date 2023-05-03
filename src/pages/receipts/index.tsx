import React from "react";
import Head from "next/head";
import FooterLayout from "components/layout/FooterLayout";
import ReceiptsGrid from "components/ReceiptsGrid";

function ReceiptsPage() {
  return (
    <>
      <Head>
        <title>Receipts - Menu Mentor</title>
      </Head>

      <FooterLayout>
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
