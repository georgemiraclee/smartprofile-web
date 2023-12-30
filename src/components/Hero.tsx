import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import logoDesa from '@/views/Dashboard/img/image-18@2x.png';

interface ImageData {
  url: string;
  caption: string;
}

const images: ImageData[] = [
  {
    url: 'attachment/2023/10/village-banner/2-1698405513.png',
    caption: 'Stone Garden',
  },
  {
    url: 'attachment/2023/10/village-banner/2-1698673666.png',
    caption: 'Website Desa',
  },
  // Add more image data as needed
];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const image = images[currentImageIndex];
  const imageUrl = `https://dera.noretest.com/${image.url}`;
  const imageAlt = image.caption;

  return (
    <div>
      <Box className="bg-[#f2f2f2] p-10" style={{ position: 'relative' }}>
        <div className="container mx-auto" style={{ position: 'relative' }}>
          <div style={{
            position: 'relative',
            width: '100%',
            height: '640px',
            objectFit: 'cover',
          }}>
            <Image
              src={imageUrl}
              alt={imageAlt}
              layout="fill"
              objectFit="cover"
              unoptimized
            />
            <ArrowBackIosIcon
              onClick={handlePrevious}
              style={{ height: '40px', width: '30px', cursor: 'pointer', position: 'absolute', top: '50%', left: '20px', backgroundColor: '#0000005C', color: 'white', borderRadius: '10%' }}
            />
            <ArrowForwardIosIcon
              onClick={handleNext}
              style={{ height: '40px', width: '30px', cursor: 'pointer', position: 'absolute', top: '50%', right: '20px', backgroundColor: '#0000005C', color: 'white', borderRadius: '10%' }}
            />
            <div style={{
              position: 'absolute',
              color: 'white',
              bottom: '10px',
              left: '0',
              right: '0',
              textAlign: 'center',
              backgroundColor: '#0000005C',
              width: '110px', // Atur lebar yang sesuai
              height: '32px', // Atur tinggi yang sesuai
              display: 'inline',
              borderRadius: '10%',
              margin: 'auto', // Atur margin menjadi auto
            }}>
              {image.caption}
            </div>
          </div>
        </div>
      </Box>

      <section className="text-white" id="about">
        <div className={`flex flex-col relative ${isMobile ? 'text-center' : 'text-left'} md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center`} style={{
          alignSelf: "stretch",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "center",
          padding: isMobile ? "20px" : "50px", // Adjusted padding for mobile
          gap: isMobile ? "10px" : "40px", // Adjusted gap for mobile
          fontSize: isMobile ? "18px" : "44px",
          color: "#1c1c1c",
        }}>
          <div className="div">
            <Image src={logoDesa} style={{
              position: "relative",
              width: isMobile ? "190px" : "240px",
              height: isMobile ? "190px" : "240px",
              objectFit: "cover",
            }} alt="Logo Desa" />
            <div className="div-2" style={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px', // Adjust gap for mobile
              position: 'relative',
            }}>
              <div className="text-wrapper" style={{ fontSize: isMobile ? '25px' : '28px', fontWeight: 'bold' }}>Desa Kertamulya</div>
              <div className="text-wrapper-2 " style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: 'bold', color: '#404040' }}>Kabupaten Bandung Barat</div>
            </div>
          </div>

          {isMobile ? (
            // Divider for mobile
            <Divider orientation="horizontal" style={{ width: '100%', margin: '20px 0' }} />
          ) : (
            // Divider for laptop
            <Divider orientation="vertical" style={{ height: '100%', marginRight: '20px' }} />
          )}

          <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
            <p className="text-base lg:text-lg" style={{
              position: "relative",
              fontSize: isMobile ? "16px" : "20px",
              lineHeight: "150%",
              fontWeight: "600",
              color: "#404040",
              display: "inline-block",
              width: isMobile ? "100%" : "520px",
              flexShrink: "0",
            }}>
              Desa Kertamulya terletak di Kecamatan Padalarang, Kabupaten Bandung
              Barat, Jawa Barat, Indonesia. Dengan jumlah penduduk sebesar 21.050
              jiwa yang mayoritas beragama Islam, potensi terbesar Desa Kertamulya
              adalah pertanian. Desa Kertamulya memil iki luas wilayah sebesar
              305.28 ha.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
