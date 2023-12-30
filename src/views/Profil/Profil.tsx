"use client"
import * as React from 'react';
import About from '@/components/About';
import Lembaga from '@/components/Lembaga'
import Perangkat from '@/components/Perangkat'
import StrukturOrganisasi from '@/components/Struktur';
import Kantor from '@/components/Kantor';
export default function profil() {
  return (
    <>
      <About />
      <Kantor />
      <StrukturOrganisasi/>
      <Perangkat />
      <Lembaga />
    </>
  );
}
