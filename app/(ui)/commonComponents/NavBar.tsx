import Link from "next/link";
import { FaSquareGithub } from "react-icons/fa6";
import ButtonCreateMap from "../maps/components/maps/ButtonCreateMap";

export default function NavBar(){
    return(
        <nav className="h-10 mb-8 w-full flex justify-between font-sans items-center px-3">
            <h2 className="flex text-3xl">
                <Link href="/" className="hover:opacity-70"> Meus Mapas </Link>
            </h2>
            <div className="flex gap-10 items-center px-5">
                <Link href="https://github.com/pedro-seco/testeTecnico" target="_blank" className="hover:opacity-70 text-4xl"><FaSquareGithub/></Link>
            </div>
        </nav>
    );
}