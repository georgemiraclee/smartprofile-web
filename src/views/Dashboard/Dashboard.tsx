"use client"
import * as React from 'react';
import Hero from '@/components/Hero';
import Statistik from '@/components/statistik';
import Potensi from '@/components/Potensi';
import Artikel from '@/components/Artikel';
import Galeri from '@/components/Galeri';
export default function Dashboard() {
  return (
    <>
      <Hero />
      <Statistik/>
      <Potensi/>
      <Artikel/>
      <Galeri/>
    </>
  );
}
