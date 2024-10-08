import Link from "next/link";

const Navbar: React.FC = () => {
    return (
        <div className="fixed pt-2 top-0 left-0 w-full flex flex-row justify-center items-center gap-5">
            <Link href="/sim" className="flex justify-center items-center bg-offwhite hover:bg-offwhite/80 text-black w-32 rounded-md p-1">Go to Sim</Link>
            <Link href="/" className="flex text-shadow-lg justify-center items-center text-5xl">Deadlock Battle Sim</Link>
            <Link href="/savedbuilds" className="flex justify-center items-center bg-offwhite hover:bg-offwhite/80 text-black w-32 rounded-md p-1 shadow-lg">My Builds</Link>
        </div>
    );
  };
  
export default Navbar;