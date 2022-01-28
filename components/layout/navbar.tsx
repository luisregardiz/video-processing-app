import { useRouter } from "next/router";
import { FC } from "react";
import { useAuth } from "../../store/user";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {

    return (
        <div className="bg-secondary p-5 flex justify-between items-center">
            <span className="text-2xl uppercase font-bold text-dark">
                Video Processing App
            </span>
        </div>
    );
};

export default Navbar;
