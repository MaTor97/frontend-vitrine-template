import { fetchFromStrapi } from "@/lib/strapi";
import Link from "next/link";

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

            <section className="space-y-6">
                {services.map((service) => {
                    console.log('Service:', service);
                    const imageUrl = service.image[0].url

                    return (
                        <Link key={service.id} href={`/services/${service.id}`} className="block">
                            <article className="bg-white shadow-sm rounded-lg overflow-hidden border border-[#A0A8B9] hover:shadow-md transition-shadow duration-200 p-6 w-2/3 mx-auto">
                                {imageUrl && (
                                    <img
                                        src={imageUrl}
                                        alt={'Service Image'}
                                        className="w-full h-64 object-cover mb-4"
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
