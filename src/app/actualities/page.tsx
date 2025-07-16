import { fetchFromStrapi } from '@/lib/strapi';
import type { Actuality } from '@/types/strapi';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 60;

export default async function ActualitiesPage() {
  const res = await fetchFromStrapi<{ data: Actuality[] }>('actualities');
  const actualities = res.data;

  return (
    <main className="bg-[#F5F0E6] text-[#0B1D51] min-h-screen px-4 py-8 md:px-12 lg:px-32 font-montserrat">
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold tracking-wide">
          Actualités
        </h1>
        <p className="text-[#A0A8B9] mt-2 text-lg">
          Suivez les dernières informations et événements
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-2">
        {actualities.map((actuality) => {
          const image = actuality.image;
          const imageUrl = image?.url?.startsWith('http')
            ? image.url
            : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${image?.url}`;

          return (
            <Link key={actuality.id} href={`/actualities/${actuality.id}`} className="block">
              <article
                className="bg-white justify-center shadow-sm rounded-lg overflow-hidden border border-[#A0A8B9] hover:shadow-md transition-shadow duration-200 w-full mx-auto"
              >
                {image && (
                  <Image
                    src={imageUrl}
                    width={600}
                    height={400}
                    className="w-full rounded shadow mb-8 max-h-80"
                    alt='Actuality Image'
                     />
                )}

                <div className="p-6">
                  <h2 className="text-2xl font-playfair text-[#B76E2D] mb-2">
                    {actuality.title}
                  </h2>
                  <p className="text-sm text-[#4A6C44] mb-4 font-roboto">
                    {new Date(actuality.date).toLocaleDateString()}
                  </p>
                </div>
              </article>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
