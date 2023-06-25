import { ProgressBar } from "react-loader-spinner";

export const Loader = () => {
  return (
    <>
      <div>Loading...</div>
      <ProgressBar
        height={100}
        width={200}
        ariaLabel="Loading..."
        borderColor="red"
        barColor="red"
      />
    </>
  );
}
