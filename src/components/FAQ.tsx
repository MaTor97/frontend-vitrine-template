import { fetchFromStrapi } from "@/lib/strapi";

export default async function FAQPage() {
    const res = await fetchFromStrapi<{ data: { question: string; answer: string }[] }>('questions');
    const faqs = res.data;
    
    return (
        <main className="bg-[#F5F0E6] text-[#0B1D51] min-h-screen px-4 py-8 md:px-12 lg:px-32 font-montserrat">
            <header className="mb-10 text-center">
                <h1 className="text-4xl md:text-5xl font-playfair font-bold tracking-wide">
                    FAQ
                </h1>
                <p className="text-[#A0A8B9] mt-2 text-lg">
                    Questions fréquemment posées
                </p>
            </header>

            <section className="space-y-6">
                {faqs.map((faq, index) => (
                    <details
                        key={index}
                        className="bg-white shadow-sm rounded-lg border border-[#A0A8B9] group"
                    >
                        <summary className="cursor-pointer p-6 outline-none font-playfair text-xl text-[#B76E2D] mb-2 flex justify-between items-center select-none">
                            {faq.question}
                            <span className="ml-2 transition-transform group-open:rotate-180">&#9660;</span>
                        </summary>
                        <div className="px-6 pb-6 pt-0">
                            <p className="text-base text-[#4A6C44]">{faq.reponse}</p>
                        </div>
                    </details>
                ))}
            </section>
        </main>
    )
}