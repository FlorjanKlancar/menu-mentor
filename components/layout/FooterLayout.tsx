import Footer from "components/Footer";
import PageHeading from "components/PageHeading";
import React, { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  headerTitle: string;
  sideActionButton?: ReactNode;
};

function FooterLayout({ children, headerTitle, sideActionButton }: Props) {
  return (
    <>
      <main className="pb-8">
        <div className="mb-4 flex items-center justify-between border-slate-400 border-opacity-30 sm:border-b-2">
          <PageHeading headerTitle={headerTitle} />
          {sideActionButton}
        </div>
        {children}
      </main>
      <Footer />
    </>
  );
}

export default FooterLayout;
