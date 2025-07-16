import { fetchFromStrapi } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import type { Service } from '@/types/strapi';

export default async function Page({ params }: { params: { id: string } }) {
  // Récupère toutes les actualités depuis Strapi
  const res = await fetchFromStrapi<{ data: Service[] }>('services');

  // Trouve celle qui correspond à l'ID donné
  const service = res.data.find((a) => a.id === Number(params.id));

  console.log('Service:', service);

  if (!service) {
    notFound();
  }

  const imageUrl = service.image[0].url;

  return (
    <main className="min-h-screen p-6 bg-[#F5F0E6] text-[#0B1D51]">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-playfair mb-4 text-[#B76E2D]">
          {service.title}
        </h1>
        <img
          src={imageUrl}
          alt={service.image?.alternativeText || 'Service Image'}
          className="w-full h-64 object-cover mb-6 shadow-md"
          />
        <p className="text-sm text-[#4A6C44] mb-6 font-roboto">
          {service.description}
        </p>
      </article>
    </main>
  );
}
