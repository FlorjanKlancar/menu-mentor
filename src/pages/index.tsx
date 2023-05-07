import HomePageChat from "components/HomePageChat";
import PageHeading from "components/PageHeading";

export default function Home() {
  return (
    <div className="flex h-[calc(100vh-136px)] flex-col space-y-4">
      <PageHeading
        headerTitle={`Chat with a Nutrition Specialist ${String.fromCodePoint(
          127791
        )}`}
      />

      <HomePageChat />
    </div>
  );
}
