'use client';

import { Movie } from '@/types/movie';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
      if (query.length === 0) {
        setMovies([]);
        return;
      }
      const res = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`
      );
      const data = await res.json();
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    };
    fetchMovies();
    console.log(movies);
  }, [query]);
  return (
    <div className='flex min-h-screen items-center justify-center font-sans'>
      <main className='flex min-h-screen w-full bg-green-500 flex-col'>
        <div className='m-4 flex flex-row'>
          <input
            className='bg-white w-3xl pl-2 pr-2'
            placeholder='Enter movie here'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setQuery(inputValue);
              }
            }}
          ></input>
          <button
            className='bg-blue-500 p-3 hover:cursor-pointer'
            onClick={() => {
              setQuery(inputValue);
            }}
          >
            Search
          </button>
        </div>
        <div className='m-4 grid grid-cols-3 gap-4 '>
          {movies.length > 0 ? (
            movies.map((movie, index) => (
              <Link
                href={`/movie/${movie.imdbID}`}
                key={index}
                // scroll={false}
                className='mb-4 bg-pink-500 border-4 p-4 hover:cursor-pointer'
                // onClick={() => {
                //   router.push(`/movie/${movie.imdbID}`);
                // }}
              >
                <Image
                  src={movie.Poster !== 'N/A' ? movie.Poster : '/no-image.png'}
                  alt={movie.Title}
                  width={200}
                  height={300}
                />
                <h3 className='text-xl font-semibold'>{movie.Title}</h3>
                <p>{movie.Year}</p>
              </Link>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </main>
    </div>
  );
}
