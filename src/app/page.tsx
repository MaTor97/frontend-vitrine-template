import FAQPage from "@/components/FAQ";
import ReviewFormPage from "@/components/reviews";
import { fetchFromStrapi } from "@/lib/strapi";
import { HomeContent } from "@/types/strapi";

export default async function Home() {
  const res = await fetchFromStrapi<{ data: HomeContent }>('home');
  const homeContent = res.data;
  console.log(homeContent);

  return (
    <main className="bg-[#F5F0E6] text-[#0B1D51] font-montserrat">
  {/* Hero Section */}
  <section className="px-6 py-12 flex items-center text-center space-y-6">
    <img
      src={homeContent.heroimage.url}
      alt="Hero"
      className="max-w-5/8 h-auto rounded "
    />
    <div>
      <h1 className="text-3xl md:text-5xl font-playfair font-bold text-[#B76E2D] mb-4">
        {homeContent.title}
      </h1>
      <h2 className="text-lg md:text-xl mb-2">
        {homeContent.subtitle}
      </h2>
      <p className="text-sm md:text-base">
        {homeContent.ctatext}
      </p>
    </div>
  </section>

  {/* FAQ + Reviews Section */}
  <section className="flex flex-col lg:flex-row min-h-[calc(100vh_-_80px)] overflow-hidden">
    {/* Bloc Reviews */}
    <div className="lg:w-1/3 w-full px-6 pb-8 h-180 scrollbar-hide lg:pb-0 lg:overflow-y-auto">
      <ReviewFormPage />
    </div>

    {/* Bloc FAQ */}
    <div className="lg:w-2/3 w-full px-6 pb-8">
      <FAQPage />
    </div>
  </section>
</main>

  );
}
