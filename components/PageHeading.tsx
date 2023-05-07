import React from "react";

type Props = {
  headerTitle: string;
};

function PageHeading({ headerTitle }: Props) {
  return (
    <h2 className="flex w-full items-center text-3xl font-bold leading-7 text-gray-900 sm:truncate sm:py-4 sm:text-4xl sm:tracking-tight">
      {headerTitle}
    </h2>
  );
}

export default PageHeading;
