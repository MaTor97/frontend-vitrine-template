import { fetchFromStrapi } from "@/lib/strapi";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 60;

export default async function ServicePage() {
    const res = await fetchFromStrapi<{ data: { id: number; title: string; image?: { url: string; alternativeText?: string } }[] }>("services");
    const services = res.data;


    return (
        <main className="bg-[#F5F0E6] text-[#0B1D51] min-h-screen px-4 py-8 md:px-12 lg:px-32 font-montserrat">
            <header className="mb-10 text-center">
                <h1 className="text-4xl md:text-5xl font-playfair font-bold tracking-wide">
                    Nos Services
                </h1>
                <p className="text-[#A0A8B9] mt-2 text-lg">
                    Découvrez nos services
                </p>
            </header>

            <section className="flex flex-wrap gap-3 justify-center">
                {services.map((service) => {
                    const imageUrl = service.image[0].url;

                    return (
                        <Link key={service.id} href={`/services/${service.id}`} className="block w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-12px)]">
                            <article className="bg-white shadow-sm rounded-lg overflow-hidden border border-[#A0A8B9] hover:shadow-md transition-shadow duration-200 p-6">
                                {imageUrl && (
                                    <Image
                                        src={imageUrl}
                                        width={400}
                                        height={400}
                                        className="w-full rounded shadow mb-8"
                                        alt='Service Image'
                                    />
                                )}
                                <h2 className="text-2xl font-playfair text-[#B76E2D] mb-2">
                                    {service.title}
                                </h2>
                            </article>
                        </Link>
                    );
                })}
            </section>
        </main>
    );
}
