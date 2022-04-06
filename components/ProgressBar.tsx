import { useRouter } from "next/router";
import { FC } from "react";

type Props = {
  stat: number;
};

const ProgressBar: FC<Props> = ({ stat }) => {
  const router = useRouter();

  return (
    <div className="h-2 w-full rounded bg-gray-300">
      <div
        style={{ width: `${(stat / 255) * 100}%` }}
        className="h-full rounded bg-blue-500"
      />
    </div>
  );
};

export default ProgressBar;
