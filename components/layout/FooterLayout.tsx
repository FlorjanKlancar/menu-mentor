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
        <div className="mb-4 flex flex-col items-center justify-between space-y-6 border-slate-400 border-opacity-30 sm:flex-row sm:space-y-0 sm:border-b-2">
          <div className="w-full md:w-1/2">
            <PageHeading headerTitle={headerTitle} />
          </div>
          <div className="flex w-full justify-end pb-2 ">
            {sideActionButton}
          </div>
        </div>
        {children}
      </main>
      <Footer />
    </>
  );
}

export default FooterLayout;
