import { fetchFromStrapi } from '@/lib/strapi';
import type { Actuality } from '@/types/strapi';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export default async function Page({ params }: { params: { id: string } }) {
  // Récupère toutes les actualités depuis Strapi
  const res = await fetchFromStrapi<{ data: Actuality[] }>('actualities');

  // Trouve celle qui correspond à l'ID donné
  const actuality = res.data.find((a) => a.id === Number(params.id));

  if (!actuality) {
    notFound();
  }

  const imageUrl = actuality.image?.url?.startsWith('http')
    ? actuality.image.url
    : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${actuality.image?.url}`;

  return (
    <main className="min-h-screen p-6 bg-[#F5F0E6] text-[#0B1D51]">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-playfair mb-4 text-[#B76E2D]">
          {actuality.title}
        </h1>

        <p className="text-sm text-[#4A6C44] mb-6 font-roboto">
          {new Date(actuality.date).toLocaleDateString()}
        </p>

        {actuality.image?.url && (
          <Image
            src={imageUrl}
            width={600}
            height={400}
            className="w-full rounded shadow mb-8"
            alt='actuality Image'
            />
        )}

        <div
          className="text-[#0B1D51] leading-relaxed text-base"
          dangerouslySetInnerHTML={{ __html: actuality.content }}
        />
      </article>
    </main>
  );
}
