import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ApexCharts from 'react-apexcharts';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


function Potensi() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [potensiData, setPotensiData] = useState({ labels: [], data: [] });
  const [produkData, setProdukData] = useState({ labels: [], data: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      // Initialize with default data structure
      const defaultData = { labels: [], data: [] };
  
      // Fetch potensiData
      axios
        .get('https://dera.noretest.com/api/kertamulya/getperbandinganpotensi?method=1&tahun=2023')
        .then((response) => {
          const data = response.data.data || defaultData;
          // Convert string values to numbers for potensiData
          setPotensiData({
            labels: data.labels,
            data: data.data.map(value => parseFloat(value) || 0),
          });
        })
        .catch((error) => {
          console.error('Failed to fetch potensi data:', error);
        });
  
      // Fetch produkData
      axios
      .get('https://dera.noretest.com/api/kertamulya/getperbandinganhasilproduksi?method=2&tahun=2023')
      .then((response) => {
        const data = response.data.data || defaultData;
        setProdukData({
          labels: data.labels,
          data: data.data.map(value => parseFloat(value) || 0),
        });
      })
      .catch((error) => {
        console.error('Failed to fetch hasil produksi data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
    }
  }, [loading]);

  // Jika data masih dimuat, Anda dapat menampilkan pesan loading atau apa pun yang sesuai
  if (loading) {
    return <div>Loading...</div>;
  }

  const potensiOptions = {
    chart: {
      type: 'donut',
      foreColor: '#1c1c1c',
    },
    labels: potensiData.labels,
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

  const potensiSeries = potensiData.data;

  const hasilProduksiOptions = {
    chart: {
      type: 'bar',
      foreColor: '#1c1c1c',
    },
    xaxis: {
      categories: produkData.labels,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
      },
    },
    colors: ["#5368E5", "#6AD168", "#F05656", "#82C0D3"],
  };
  
  const hasilProduksiSeries = [{
    name: 'Produksi',
    data: produkData.data,
  }];
  const dividerStyle = {
    borderBottom: 'solid #17437A',
  };
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
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
              fontWeight: "bold",
              color: "#17437A",
            }}
          >
            Potensi Desa
          </Typography>
        </Box>
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
              Potensi Terbesar
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, color: "#1c1c1c" }}>
              Pertanian
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
              Jumlah Objek Wisata
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, color: "#1c1c1c" }}>
              12 Wisata
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
              Jumlah Wisatawan
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, color: "#1c1c1c" }}>
              1.521
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
              Perbandingan Potensi
            </Typography>
            <Typography variant="inherit" sx={{ fontWeight: 200, color: "#1c1c1c" }}>
              Grafik perbandingan potensi Desa Kertamulya
            </Typography>
            <ApexCharts options={potensiOptions} series={potensiSeries} legend="bottom" type="donut" width={isMobile ? 350 : 500} />
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
              Hasil Produksi Potensi
            </Typography>
            <Typography variant="inherit" sx={{ fontWeight: 200, color: "#1c1c1c" }}>
              Grafik perbandingan hasil produksi potensi Desa Kertamulya (dalam ton)
            </Typography>
            <ApexCharts options={hasilProduksiOptions} series={hasilProduksiSeries} type="bar" width={isMobile ? 330 : 590} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Potensi;
