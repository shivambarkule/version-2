'use client';

import { useParams, useRouter } from 'next/navigation';
import { getExcursionBySlug } from '@/lib/firebase-data';
import { ExcursionData } from '@/data/excursions';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ExcursionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = Array.isArray(params?.slug) ? params.slug.join('/') : (params?.slug as string);
  const [excursion, setExcursion] = useState<(ExcursionData & { id: string }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    async function loadExcursion() {
      try {
        const data = await getExcursionBySlug(slug);
        if (data) {
          setExcursion(data);
        } else {
          router.push('/excursions');
        }
      } catch (error) {
        console.error('Error loading excursion:', error);
        router.push('/excursions');
      } finally {
        setLoading(false);
      }
    }
    if (slug) {
      loadExcursion();
    }
  }, [slug, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading excursion...</div>
      </div>
    );
  }

  if (!excursion) {
    return null;
  }

  return (
    <div className="min-h-full">
      <div className="p-6 md:p-10 pb-20">
        <nav className="text-[11px] uppercase tracking-[0.12em] text-black/60 mb-8">
          <Link href="/" className="hover:text-black transition-colors">HOME</Link>
          <span className="mx-2">&gt;</span>
          <Link href="/excursions" className="hover:text-black transition-colors">EXCURSIONS</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-black font-medium">{excursion.title.toUpperCase()}</span>
        </nav>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">{excursion.title}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {excursion.category && (
              <span className="text-xs px-3 py-1 bg-gray-100 rounded-full">
                {excursion.category}
              </span>
            )}
            {excursion.featured && (
              <span className="text-xs px-3 py-1 bg-yellow-100 rounded-full">
                ⭐ Featured
              </span>
            )}
            {excursion.photoType && (
              <span className="text-xs px-3 py-1 bg-blue-100 rounded-full">
                {excursion.photoType}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-black/70">
            {excursion.location && (
              <div>
                <span className="text-[10px] uppercase tracking-[0.12em] text-black/60">Location</span>
                <div className="mt-1">📍 {excursion.location}</div>
              </div>
            )}
            {excursion.date && (
              <div>
                <span className="text-[10px] uppercase tracking-[0.12em] text-black/60">Date</span>
                <div className="mt-1">📅 {new Date(excursion.date).toLocaleDateString()}</div>
              </div>
            )}
            {excursion.readTime && (
              <div>
                <span className="text-[10px] uppercase tracking-[0.12em] text-black/60">Read Time</span>
                <div className="mt-1">⏱️ {excursion.readTime} min</div>
              </div>
            )}
          </div>
        </div>

        {excursion.images && excursion.images.length > 0 && (
          <div className="mb-12">
            <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 mb-4">
              <img
                src={excursion.images[selectedImageIndex]}
                alt={excursion.title}
                className="w-full h-full object-cover"
              />
              {excursion.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : excursion.images.length - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 text-white p-2 rounded-full hover:bg-black transition-colors"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setSelectedImageIndex((prev) => (prev < excursion.images.length - 1 ? prev + 1 : 0))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 text-white p-2 rounded-full hover:bg-black transition-colors"
                  >
                    →
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-xs">
                    {selectedImageIndex + 1} / {excursion.images.length}
                  </div>
                </>
              )}
            </div>
            
            {excursion.images.length > 1 && (
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                {excursion.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index ? 'border-black' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${excursion.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">About This Excursion</h2>
          <p className="text-[13px] leading-6 text-black/80 whitespace-pre-line">
            {excursion.description}
          </p>
        </div>

        {excursion.blogContent && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Full Story</h2>
            <div className="prose prose-sm max-w-none">
              <div className="text-[13px] leading-6 text-black/80 whitespace-pre-line">
                {excursion.blogContent}
              </div>
            </div>
          </div>
        )}

        {(excursion.cameraSettings || excursion.equipment) && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Photography Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {excursion.cameraSettings && (
                <div>
                  <span className="text-[10px] uppercase tracking-[0.12em] text-black/60">Camera Settings</span>
                  <div className="mt-1 text-sm">{excursion.cameraSettings}</div>
                </div>
              )}
              {excursion.equipment && excursion.equipment.length > 0 && (
                <div>
                  <span className="text-[10px] uppercase tracking-[0.12em] text-black/60">Equipment</span>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {excursion.equipment.map((item, index) => (
                      <span key={index} className="text-xs px-2 py-1 bg-gray-100 rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {excursion.tags && excursion.tags.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {excursion.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-black/10">
          <Link
            href="/excursions"
            className="group inline-flex items-center gap-1 select-none text-sm"
          >
            <span className="transition-transform duration-500 ease-out group-hover:-translate-x-1">[</span>
            <span className="underline-offset-4 group-hover:underline">← Back to All Excursions</span>
            <span className="transition-transform duration-500 ease-out group-hover:translate-x-1">]</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

