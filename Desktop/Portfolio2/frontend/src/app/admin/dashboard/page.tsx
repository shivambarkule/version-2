'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';

export default function AdminDashboard() {
  const [selectedPage, setSelectedPage] = useState<'work' | 'excursions' | 'about' | 'contact' | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/admin');
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/admin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Select Page to Manage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => setSelectedPage('work')}
              className={`p-6 border-2 rounded-lg text-left transition-colors ${
                selectedPage === 'work'
                  ? 'border-black bg-black text-white'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <h3 className="text-lg font-semibold mb-2">Work</h3>
              <p className="text-sm opacity-70">Manage projects and portfolio items</p>
            </button>
            <button
              onClick={() => setSelectedPage('excursions')}
              className={`p-6 border-2 rounded-lg text-left transition-colors ${
                selectedPage === 'excursions'
                  ? 'border-black bg-black text-white'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <h3 className="text-lg font-semibold mb-2">Excursions</h3>
              <p className="text-sm opacity-70">Manage blogs, photography, and travel posts</p>
            </button>
            <button
              onClick={() => setSelectedPage('about')}
              className={`p-6 border-2 rounded-lg text-left transition-colors ${
                selectedPage === 'about'
                  ? 'border-black bg-black text-white'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-sm opacity-70">Add Skills, Publications, Experience, Education, Certificates</p>
            </button>
            <button
              onClick={() => setSelectedPage('contact')}
              className={`p-6 border-2 rounded-lg text-left transition-colors ${
                selectedPage === 'contact'
                  ? 'border-black bg-black text-white'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <h3 className="text-lg font-semibold mb-2">Contact</h3>
              <p className="text-sm opacity-70">Manage contact information</p>
            </button>
          </div>
        </div>

        {selectedPage === 'work' && (
          <div className="bg-white rounded-lg shadow p-6">
            <Link href="/admin/dashboard/work" className="text-blue-600 hover:underline">
              Go to Work Management →
            </Link>
          </div>
        )}

        {selectedPage === 'excursions' && (
          <div className="bg-white rounded-lg shadow p-6">
            <Link href="/admin/dashboard/excursions" className="text-blue-600 hover:underline">
              Go to Excursions Management →
            </Link>
          </div>
        )}

        {selectedPage === 'about' && (
          <div className="bg-white rounded-lg shadow p-6">
            <Link href="/admin/dashboard/about" className="text-blue-600 hover:underline">
              Go to About Management →
            </Link>
          </div>
        )}

        {selectedPage === 'contact' && (
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600">Contact management coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}



