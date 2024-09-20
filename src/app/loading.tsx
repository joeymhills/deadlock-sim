import { BarLoader } from "react-spinners";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="min-h-screen w-full bg-dark flex justify-center items-center">
            <BarLoader
            height={6}
            width={200}
            />
        </div>
    )
  }