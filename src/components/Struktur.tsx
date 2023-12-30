// components/StrukturOrganisasi.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface ProfileData {
  gambar_struktur: string;
}

const StrukturOrganisasi = (): JSX.Element => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dera.noretest.com/api/kertamulya/profile');
        setProfileData(response.data.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      className="frame"
      sx={{
        alignItems: 'flex-start',
        backgroundColor: '#FFFFFF',
        padding: { xs: '16px', md: '108px 288px' }, // Responsive padding
        position: 'relative',
      }}
    >
      <Box
        className="div"
        sx={{
          alignItems: 'flex-start',
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          flexGrow: 1,
          gap: '24px', // Adjusted for mobile view
          position: 'relative',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: '#404040',
            fontFamily: 'sans-serif',
            fontSize: { xs: '20px', md: '24px' }, // Responsive font size
            fontWeight: 'bold',
            letterSpacing: '-0.2px',
            lineHeight: '130%',
            position: 'relative',
            whiteSpace: 'nowrap',
            width: 'fit-content',
          }}
        >
          Struktur Organisasi
        </Typography>
        {profileData?.gambar_struktur && (
          <img
            className="image"
            alt="Image"
            src={`https://dera.noretest.com/${profileData.gambar_struktur}`}
            style={{ width: '70%', height: 'auto' }} // Responsive image style
          />
        )}
      </Box>
    </Box>
  );
};

export default StrukturOrganisasi;
