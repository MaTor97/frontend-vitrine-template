import Link from "next/link";
import { LinkedinSVG, FacebookSVG, InstagramSVG, XSVG } from "./SVG";

export default function Footer() {
    return (
        <footer className="bg-[#F5F0E6] text-[#0B1D51] px-6 py-12 text-sm font-montserrat">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
                {/* Liens informations */}
                <div>
                    <h3 className="font-bold mb-2 text-[#B76E2D]">Informations</h3>
                    <ul className="space-y-1">
                        <li><Link href="/faq">FAQ</Link></li>
                        <li><Link href="/cgv">CGV</Link></li>
                        <li><Link href="/retours">Politique de retour</Link></li>
                    </ul>
                </div>

                {/* Logos réseaux sociaux */}
                <div className="flex justify-center space-x-4">
                    <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FacebookSVG className="w-8 h-8 text-[#0B1D51] hover:text-[#B76E2D] transition-colors" />
                    </Link>
                    <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <InstagramSVG className="w-8 h-8 text-[#0B1D51] hover:text-[#B76E2D] transition-colors" />
                    </Link>
                    <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <LinkedinSVG className="w-8 h-8 text-[#0B1D51] hover:text-[#B76E2D] transition-colors" />
                    </Link>
                    <Link href="https://x.com" target="_blank" rel="noopener noreferrer">
                        <XSVG className="w-8 h-8 text-[#0B1D51] hover:text-[#B76E2D] transition-colors" />
                    </Link>
                </div>

                {/* Infos contact */}
                <div>
                    <h3 className="font-bold mb-2 text-[#B76E2D]">Contact</h3>
                    <p>Email : contact@tonsite.com</p>
                    <p>Téléphone : 012 345 6789</p>
                </div>
            </div>
        </footer>
    );
}
