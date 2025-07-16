import { fetchFromStrapi } from "@/lib/strapi";
import Image from "next/image";

export const revalidate = 60;

export default async function GalleryPage() {
    const res = await fetchFromStrapi<{ data: { id: number; legend: string; image: { url: string; alternativeText?: string } }[] }>("photos");
    const galleryItems = res.data;
    console.log('Gallery Items:', galleryItems);

    return (
        <main className="bg-[#F5F0E6] text-[#0B1D51] min-h-screen  py-8 md:px-12 lg:px-32 font-montserrat">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold tracking-wide">Notre Gallerie</h1>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
                {galleryItems.map((item) => {
                    const imageUrl = item.photo[0].url;

                    return (
                        <div key={item.id} className="bg-white shadow-sm rounded-lg overflow-hidden border border-[#A0A8B9] hover:shadow-md transition-shadow duration-200">
                            <Image
                              src={imageUrl}
                              width={600}
                              height={400}
                              className="w-full rounded shadow mb-8"
                              alt="Gallery Image"
                              />
                            <p className="p-4 text-center text-[#4A6C44] font-roboto">
                                {item.legend}
                            </p>
                        </div>
                    )
            })}
            </section>
        </main>
    );
}