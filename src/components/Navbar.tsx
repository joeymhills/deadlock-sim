import Link from "next/link";

const Navbar: React.FC = () => {
    return (
        <div className="fixed bg-dark top-0 left-0 w-full h-14 flex flex-row justify-center items-center gap-5">
            <Link href="/sim" className="flex justify-center items-center bg-offwhite text-black w-32 rounded-md p-1">Go to Sim</Link>
            <Link href="/" className="flex justify-center items-center text-4xl">Deadlock Battle Sim</Link>
            <Link href="/savedbuilds" className="flex justify-center items-center bg-offwhite text-black w-32 rounded-md p-1">View Builds</Link>
        </div>
    );
  };
  
export default Navbar;