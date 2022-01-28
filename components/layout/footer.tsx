import { FC } from "react";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
    const getFullYear = new Date().getFullYear();

    return (
        <footer className="bg-dark flex items-center justify-center py-5">
            <span className="text-light font-medium text-lg">
                &copy; {getFullYear} Video Processing App
            </span>
        </footer>
    );
};

export default Footer;
