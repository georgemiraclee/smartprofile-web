import React, { useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import axios from 'axios';
import Link from '@mui/material/Link';


const apiUrl = 'https://dera.noretest.com/api/kertamulya/profile';

const ProfileComponent: React.FC = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setProfileData(response.data.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, []);

  const villageHead = profileData?.perangkat_desa?.find((person: any) => person.id === 3);

  return (
    <Box
      className="frame"
      sx={{
        alignItems: 'flex-start',
        backgroundColor: '#F7F7F7',
        padding: isMobile ? '32px' : '108px 200px',
        position: 'relative',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
      }}
    >
      <Box
        className="div"
        sx={{
          alignItems: 'flex-start',
          flex: 1,
          flexDirection: 'column',
          flexGrow: 1,
          gap: isMobile ? '20px' : '48px',
          position: 'relative',
          padding: isMobile ? '20px' : '0',
        }}
      >
        <Typography variant="h4" sx={{ color: '#404040', fontFamily: 'sans-serif', fontSize: '24px', fontWeight: 'bold', letterSpacing: '-0.2px', lineHeight: '130%', position: 'relative', whiteSpace: 'nowrap', width: 'fit-content' }}>
          Kantor
        </Typography>
        {profileData && (
          <>
            <Box
              className="location-container"
              sx={{
                width: isMobile ? '100%' : 'auto',
                textAlign: isMobile ? 'left' : 'center',
              }}
            >
              <Typography
                variant="inherit"
                sx={{
                  color: '#404040',
                  fontFamily: 'inter.style.fontFamily',
                  fontWeight: 'bold',
                  letterSpacing: '-0.2px',
                  lineHeight: '130%',
                  position: 'relative',
                  width: '100%',
                }}
                paragraph
              >
                Desa {profileData.nama} - {profileData.kecamatan.nama} - {profileData.kota.nama}
              </Typography>
            </Box>
            <Box className="div-3">
            <Typography className="body1">Alamat</Typography>
            <Typography className="body1" sx={{ marginTop: isMobile ? '20px' : '0' }}>{profileData.alamat}</Typography>
          </Box>
          <Box className="div-3">
            <Typography className="body1">Kode Pos</Typography>
            <Typography className="body1">{profileData.kodepos}</Typography>
          </Box>
          <Box className="div-3">
            <Typography className="body1">No Telp</Typography>
            <Typography className="body1">{profileData.telp || '-'}</Typography>
          </Box>
          <Box className="div-3">
            <Typography className="body1">Fax</Typography>
            <Typography className="body1">{profileData.fax || 'N/A'}</Typography>
          </Box>
          <Box className="div-3">
            <Typography className="body1">Email</Typography>
            <Link
              href={`mailto:${profileData.email}`}
              target="_blank"
              rel="noopener noreferrer"
              underline="none" // Untuk menghilangkan garis bawah default
              sx={{ marginTop: isMobile ? '19px' : '0', display: isMobile ? 'block' : 'inline' }}
            >
              <Typography className="body1">{profileData.email}</Typography>
            </Link>
          </Box>
            <Box className="div-3">
              <Typography className="body1">Website</Typography>
              <Typography className="body1">{profileData.website}</Typography>
            </Box>
          </>
        )}
      </Box>
      {villageHead && (
        <Box
          className="div-kepala-desa"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '48px',
            position: 'relative',
            padding: isMobile ? '50px' : '50px 50px',
          }}
        >
          <Typography variant="h4" sx={{ color: '#404040', fontFamily: 'sans-serif', fontSize: '24px', fontWeight: 'bold', letterSpacing: '-0.2px', lineHeight: '130%', position: 'relative', whiteSpace: 'nowrap', width: 'fit-content' }}>
            Kepala Desa
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
            {villageHead.foto && (
              <img
                className="image"
                alt="Kepala Desa"
                src={`https://dera.noretest.com/${villageHead.foto}`}
                style={{ width: '100px', height: '150px', objectFit: 'cover' }}
              />
            )}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px', width: '100%' }}>
              <Box className="div-3">
                <Typography className="body1">Nama</Typography>
                <Typography className="body1">{villageHead.nama}</Typography>
              </Box>
              <Box className="div-3">
                <Typography className="body1">NIP</Typography>
                <Typography className="body1">-</Typography>
              </Box>
              <Box className="div-3">
                <Typography className="body1">Jabatan</Typography>
                <Typography className="body1">{villageHead.jabatan}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProfileComponent;
