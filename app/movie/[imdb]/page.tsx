'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Movie } from '@/types/movie';
import { use } from 'react';
import Image from 'next/image';

export default function MovieModal({
  params,
}: {
  params: Promise<{ imdb: string }>;
}) {
  const { imdb } = use(params);
  const router = useRouter();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    fetch(
      `https://www.omdbapi.com/?i=${imdb}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`
    )
      .then((res) => res.json())
      .then(setMovie);
  }, [imdb]);

  if (!movie) return null;

  return (
    <div className='flex flex-col min-h-screen items-center justify-center font-sans'>
      <main className='flex flex-col min-h-screen w-full bg-white'>
        {movie ? (
          <div className='mt-4'>
            <h2 className='text-2xl font-semibold'>{movie.Title}</h2>
            <Image
              src={movie.Poster !== 'N/A' ? movie.Poster : '/no-image.png'}
              alt={movie.Title}
              width={200}
              height={300}
            />
            <p className='mt-2'>{movie.Plot}</p>
          </div>
        ) : (
          <p className='mt-4'>Loading...</p>
        )}
        <button
          className='bg-purple-500 w-fit p-4 hover:cursor-pointer'
          onClick={() => {
            router.back();
          }}
        >
          home
        </button>
      </main>
    </div>
  );
}
