import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';

interface LembagaDesaData {
  id: number;
  nama: string;
  alamat: string;
  gambar: string;
}

const Lembaga = () => {
  const [lembagaDesaData, setLembagaDesaData] = useState<LembagaDesaData[]>([]);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    axios
      .get('https://dera.noretest.com/api/kertamulya/profile')
      .then((response) => {
        const lembagaDesaArray = response.data.data.lembaga_desa || [];
        setLembagaDesaData(lembagaDesaArray);
      })
      .catch((error) => {
        console.error('Error fetching lembaga desa data:', error);
      });
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: isMobile ? '32px' : '108px',
        gap: "56px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: "16px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "8px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              letterSpacing: "-0.2px",
              lineHeight: "130%",
              fontWeight: "1000",
              color: '#1C1C1C',
            }}
          >
            Lembaga Desa
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {lembagaDesaData.map((item) => (
            <Grid item key={item.id} xs={12} sm={4}>
              <Card sx={{ backgroundColor: '#fffff', color: 'white' }}>
                {item.gambar && (
                  <CardMedia
                    component="img"
                    height={isMobile ? '140' : '240'}
                    image={`https://dera.noretest.com/${item.gambar}`}
                  />
                )}
                <CardContent>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="h6" sx={{ fontWeight: '1000' , color:'#2C61A4' }}>
                        {item.nama}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2" sx={{ fontWeight: 'medium' , color:'#404040' }} >
                        {item.alamat}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Lembaga;
