import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import logoDesa from '@/views/Dashboard/img/image-18@2x.png';
import Divider from '@mui/material/Divider';


function About() {
  return (
    <Box
      component="section"
      sx={{
        py: 8,
        bgcolor: 'background.paper',
        color: 'text.primary',
      }}
    >
      <Container>
        <Grid container alignItems="center" spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Image
                src={logoDesa}
                alt="Logo Desa"
                width={240}
                height={240}
                objectFit="cover"
              />
              <Typography variant="h4" fontWeight="bold">
                Desa Kertamulya
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="text.secondary">
                Kabupaten Bandung Barat
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: 16, sm: 20 }, // Ukuran font responsif
                lineHeight: '150%',
                fontWeight: 600,
                color: '#404040',
                width: '100%',
              }}
            >
              Desa Kertamulya terletak di Kecamatan Padalarang, Kabupaten Bandung
              Barat, Jawa Barat, Indonesia. Dengan jumlah penduduk sebesar 21.050
              jiwa yang mayoritas beragama Islam, potensi terbesar Desa Kertamulya
              adalah pertanian. Desa Kertamulya memiliki luas wilayah sebesar
              305.28 ha.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default About;
