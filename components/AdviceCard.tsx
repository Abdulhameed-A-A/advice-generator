'use client';
import image from "../public/icon-dice.svg"
import divider1 from "../public/pattern-divider-desktop.svg"
import divider2 from "../public/pattern-divider-mobile.svg"
import { useState, useEffect } from 'react';
import { Advice } from '@/types/advice';
import { getRandomAdvice } from '@/lib/api';
import Image from 'next/image';

export default function AdviceCard() {
  const [advice, setAdvice] = useState<Advice | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAdvice = async () => {
    setIsLoading(true);
    try {
      const newAdvice = await getRandomAdvice();
      setAdvice(newAdvice);
    } catch (error) {
      console.error('Error fetching advice:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="min-h-screen bg-dark-blue flex items-center justify-center px-4">
      <div className="bg-dark-grayish-blue rounded-2xl shadow-2xl p-8 max-w-[540px] w-full mx-auto text-center relative">

        <p className="text-neon-green text-xs font-semibold tracking-[0.3em] uppercase mb-6">
          Advice #{advice?.id || '...'}
        </p>

        <h1 className="text-light-cyan text-2xl md:text-[28px] leading-[1.4] font-semibold mb-8">
          &ldquo;{advice?.advice || 'Loading...'}&rdquo;
        </h1>

        <div className="mb-10">
          <div className="block md:hidden">
            <Image
              src={divider2}
              alt="Divider"
              width={295}
              height={16}
              className="mx-auto"
            />
          </div>

          <div className="hidden md:block">
            <Image
              src={divider1}
              alt="Divider"
              width={444}
              height={16}
              className="mx-auto"
            />
          </div>
        </div>

        <button
          onClick={fetchAdvice}
          disabled={isLoading}
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-neon-green hover:bg-neon-green/90 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_30px_rgba(82,255,168,0.8)] disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-dark-blue border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Image src={image} alt="my image" />
          )}
        </button>
      </div>
    </div >
  );
}