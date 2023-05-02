import Footer from "components/Footer";
import React, { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function FooterLayout({ children }: Props) {
  return (
    <>
      <main className="pb-8">{children}</main>
      <Footer />
    </>
  );
}

export default FooterLayout;
