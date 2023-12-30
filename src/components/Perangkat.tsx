// pages/PerangkatDesa.tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from "@mui/material/Grid";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface PerangkatDesaData {
  id: number;
  nama: string;
  jabatan: string;
  foto: string;
}

const PerangkatDesa = () => {
  const [perangkatDesaData, setPerangkatDesaData] = useState<PerangkatDesaData[]>([]);

  React.useEffect(() => {
    // Fetch your perangkatDesaData here
    axios
      .get('https://dera.noretest.com/api/kertamulya/profile')
      .then((response) => {
        // Assuming the perangkat_desa field contains the array you want
        const perangkatDesaArray = response.data.data.perangkat_desa || [];
        setPerangkatDesaData(perangkatDesaArray);
      })
      .catch((error) => {
        console.error('Error fetching perangkat desa data:', error);
      });
  }, []);

  return (
    <Box
    sx={{
        backgroundColor: "#F0F0F0",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start", // Align items on the left
        justifyContent: "flex-start",
        padding: "24px", // Adjusted for small screens
        gap: "24px",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          letterSpacing: "-0.2px",
          lineHeight: "130%",
          fontWeight: "1000",
          color: '#1C1C1C',
          textAlign: "left", // Align text on the left
        }}
      >
        Perangkat Desa
      </Typography>
      <Grid container spacing={2}>
        {perangkatDesaData.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ backgroundColor: '#2C61A4', color: 'white', width: '100%', height: '100%',  }}>
              {item.foto && (
                <CardMedia
                  component="img"
                  height="240"
                  image={`https://dera.noretest.com/${item.foto}`}
                />
              )}
              <CardContent>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Typography variant="inherit" color="white" sx={{ fontWeight: '500' }}>
                      {item.nama}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" color="white">
                      {item.jabatan}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PerangkatDesa;
