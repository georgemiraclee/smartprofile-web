import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ApexCharts from 'react-apexcharts';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function Statistik() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [genderData, setGenderData] = useState({ labels: [], data: [] });
  const [religionData, setReligionData] = useState({ labels: [], data: [] });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Memuat data perbandingan jenis kelamin
    if (loading) {
      axios
        .get('https://dera.noretest.com/api/kertamulya/getperbandinganpenduduk?method=1&tahun=2023')
        .then((response) => {
          const data = response.data.data;
          setGenderData(data);
        })
        .catch((error) => {
          console.error('Failed to fetch gender data:', error);
        });
    }

    // Memuat data perbandingan agama
    axios
      .get('https://dera.noretest.com/api/kertamulya/getperbandinganpenduduk?method=2&tahun=2023')
      .then((response) => {
        const data = response.data.data;
        setReligionData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch religion data:', error);
        setLoading(false);
      });
  }, [loading]);

  // Jika data masih dimuat, Anda dapat menampilkan pesan loading atau apa pun yang sesuai
  if (loading) {
    return <div>Loading...</div>;
  }

  const genderOptions = {
    chart: {
      type: 'donut',
      foreColor: '#1c1c1c',
    },
    colors: ["#5368E5", "#FF2392"],
    labels: genderData.labels,
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        customScale: 1,
      },
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
    },
  };

  const genderSeries = genderData.data;

  const religionOptions = {
    chart: {
      type: 'donut',
      foreColor: '#1c1c1c',
    },
    labels: religionData.labels,
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        customScale: 1,
      },
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
    },
    colors: ["#5368E5", "#6AD168", "#F05656", "#82C0D3"],
  };

  const religionSeries = religionData.data;

  const dividerStyle = {
    borderBottom: 'solid #17437A',
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F7F7F7",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: isMobile ? "16px" : "108px",
        gap: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: "8px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            letterSpacing: "-0.2px",
            lineHeight: "130%",
            fontWeight: "bold",
            color: '#17437A',
          }}
        >
          Statistik Penduduk
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: isMobile ? "14px" : "18px",
            letterSpacing: "-0.1px",
            lineHeight: "145%",
            fontWeight: "600",
            color: "#707070",
          }}
        >
          Tahun 2023
        </Typography>
        <Divider variant="middle" style={dividerStyle} flexItem />
      </Box>

      <Grid container spacing={isMobile ? 2 : 4}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              borderRadius: "20px",
              backgroundColor: "#fff",
              boxShadow: "0px 0px 16px rgba(12, 49, 97, 0.12)",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: isMobile ? "16px" : "44px 36px",
              gap: "16px",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 500, color: "gray" }}>
              Jumlah Penduduk
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, color: "#1c1c1c" }}>
              21.050 jiwa
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              borderRadius: "20px",
              backgroundColor: "#fff",
              boxShadow: "0px 0px 16px rgba(12, 49, 97, 0.12)",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: isMobile ? "16px" : "44px 36px",
              gap: "16px",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 500, color: "gray" }}>
              Jumlah Kepala Keluarga
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, color: "#1c1c1c" }}>
              6.657 KK
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              borderRadius: "20px",
              backgroundColor: "#fff",
              boxShadow: "0px 0px 16px rgba(12, 49, 97, 0.12)",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: isMobile ? "16px" : "44px 36px",
              gap: "16px",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 500, color: "gray" }}>
              Kepadatan Penduduk
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, color: "#1c1c1c" }}>
              6.895 jiwa/km2
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Paper
            sx={{
              borderRadius: "20px",
              backgroundColor: "#fff",
              boxShadow: "0px 0px 16px rgba(12, 49, 97, 0.12)",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: isMobile ? "16px" : "44px 36px",
              gap: "16px",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, color: "black" }}>
              Perbandingan Jenis Kelamin
            </Typography>
            <Typography variant="inherit" sx={{ fontWeight: 200, color: "#1c1c1c" }}>
              Grafik perbandingan jenis kelamin penduduk Desa Kertamulya
            </Typography>
            <ApexCharts options={genderOptions} series={genderSeries} type="donut" width={isMobile ? 350 : 500} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Paper
            sx={{
              borderRadius: "20px",
              backgroundColor: "#fff",
              boxShadow: "0px 0px 16px rgba(12, 49, 97, 0.12)",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: isMobile ? "16px" : "44px 36px",
              gap: "16px",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, color: "black" }}>
              Perbandingan Agama
            </Typography>
            <Typography variant="inherit" sx={{ fontWeight: 200, color: "#1c1c1c" }}>
              Grafik perbandingan agama penduduk Desa Kertamulya
            </Typography>
            <ApexCharts options={religionOptions} series={religionSeries} type="donut" width={isMobile ? 350 : 500} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Statistik;
