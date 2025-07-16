'use client';

import { useState, useEffect } from 'react';

export const revalidate = 5;

export default function ReviewFormPage() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({
    name: '',
    review_text: '',
    note: 5,
    date: '',
  });
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
  const fetchReviews = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/reviews?populate=image`);
      const data = await res.json();
      setReviews(data.data); // data.data = tableau d'avis
    } catch (err) {
      console.error('❌ Erreur de récupération des avis:', err);
    }
  };

    fetchReviews();
  }, []);


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const uploadImage = async (): Promise<number | null> => {
    if (!image) return null;
    const imageForm = new FormData();
    imageForm.append('files', image);

    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/upload`, {
      method: 'POST',
      body: imageForm,
    });

    if (!res.ok) throw new Error('Échec de l’upload de l’image');
    const data = await res.json();
    return data[0]?.id ?? null;
  };

  const submitReview = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      const imageId = await uploadImage();

      const payload = {
        data: {
          Name: form.name,
          review_text: form.review_text,
          note: form.note,
          date: form.date,
          ...(imageId && { image: imageId }),
        },
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(`Erreur Strapi: ${res.statusText}`);

      setMessage('Merci pour votre avis !');
      setForm({ name: '', review_text: '', note: 5, date: '' });
      setImage(null);
      setImagePreview(null);
    } catch (err) {
      console.error('❌ Erreur:', err);
      setMessage('Échec de l’envoi');
    }
  };

  return (
    <main className="bg-[#f5ede6] min-h-screen p-6 max-w-xl mx-auto font-montserrat">
      <h1 className="text-3xl font-playfair text-[#0B1D51] mb-6">Laissez votre avis</h1>
      <form className="space-y-4" onSubmit={submitReview}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border text-[#0B1D51] border-[#A0A8B9] rounded placeholder:text-[#4A6C44]"
          placeholder="Nom"
          autoComplete="off"
        />

        <div>
          <label
            htmlFor="image-upload"
            className="block w-full cursor-pointer bg-[#e8d4c3] border border-[#A0A8B9] rounded px-4 py-3 text-[#0B1D51] text-center hover:bg-[#d2b48c] transition"
          >
            {image ? 'Changer l’image' : 'Ajouter une image'}
          </label>
          <input
            id="image-upload"
            type="file"
            name="image"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Aperçu"
              className="mt-2 max-h-32 rounded shadow mx-auto"
            />
          )}
        </div>

        <textarea
          name="review_text"
          value={form.review_text}
          onChange={handleChange}
          className="w-full p-2 border text-[#0B1D51] border-[#A0A8B9] rounded placeholder:text-[#4A6C44]"
          placeholder="Votre avis"
        />
        <input
          name="note"
          type="number"
          min="1"
          max="5"
          value={form.note}
          onChange={handleChange}
          className="w-full p-2 border text-[#0B1D51] border-[#A0A8B9] rounded placeholder:text-[#4A6C44]"
          placeholder="Note sur 5"
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="w-full p-2 border text-[#0B1D51] border-[#A0A8B9] rounded placeholder:text-[#4A6C44]"
        />

        <button
          type="submit"
          className="bg-[#B76E2D] text-white py-2 px-4 rounded hover:opacity-90 font-roboto"
        >
          Envoyer
        </button>

        {message && <p className="text-[#4A6C44] mt-4">{message}</p>}
      </form>
      <section className="mt-12">
        <h2 className="text-2xl font-playfair text-[#0B1D51] mb-4">Les derniers avis</h2>
        <div className="space-y-6">
          {reviews.map((review) => {
            const imageUrl = review.image?.url;

            return (
              <div key={review.id} className="bg-white p-4 rounded shadow border border-[#ddd]">
                <h3 className="text-lg font-semibold text-[#0B1D51]">{review.Name}</h3>
                <p className="text-sm text-[#4A6C44] mb-2">{review.date}</p>
                <p className="text-[#0B1D51]">{review.review_text}</p>
                <p className="mt-2 text-[#B76E2D] font-bold">Note : {review.note}/5</p>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={`Image de ${review.Name}`}
                    className="mt-4 max-h-40 rounded mx-auto"
                  />
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
