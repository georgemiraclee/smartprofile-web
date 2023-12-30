import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ApexCharts from 'react-apexcharts';
import axios from 'axios';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function Potensi() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedYear, setSelectedYear] = useState('2023');
  const [potensiData, setPotensiData] = useState({ labels: [], data: [] });
  const [produkData, setProdukData] = useState({ labels: [], data: [] });
  const [wisataData, setWisataData] = useState({ labels: [], data: [] });
  const [luasLahanData, setLuasLahanData] = useState ({ labels: [], data: [] });
  const [hasilTaniData, sethasilTaniData] = useState ({ labels: [], data: [] });
  const [hasilTernakData, sethasilTernakData] = useState ({ labels: [], data: [] });
  const [hasilIkanData, sethasilIkanData] = useState ({ labels: [], data: [] });
  const [produkPotensiData, setprodukPotensiData] = useState ({ labels: [], data: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      // Fetch potensiData based on the selected year
      axios
        .get(`https://dera.noretest.com/api/kertamulya/getperbandinganpotensi?method=1&tahun=${selectedYear}`)
        .then((response) => {
          const data = response.data.data || { labels: [], data: [] };
          setPotensiData({
            labels: data.labels,
            data: data.data.map((value) => parseFloat(value) || 0),
          });
        })
        .catch((error) => {
          console.error('Failed to fetch potensi data:', error);
        });

      // Fetch produkData
      axios
        .get(`https://dera.noretest.com/api/kertamulya/getperbandinganhasilproduksi?method=2&tahun=${selectedYear}`)
        .then((response) => {
          const data = response.data.data || { labels: [], data: [] };
          setProdukData({
            labels: data.labels,
            data: data.data.map((value) => parseFloat(value) || 0),
          });
        })
        .catch((error) => {
          console.error('Failed to fetch hasil produksi data:', error);
        });

      // Fetch wisataData
      axios
        .get(`https://dera.noretest.com/api/kertamulya/getperbandinganpotensi?method=2&tahun=${selectedYear}`)
        .then((response) => {
          const data = response.data.data || { labels: [], data: [] };
          setWisataData({
            labels: data.labels,
            data: data.data.map((value) => parseFloat(value) || 0),
          });
        })
        .catch((error) => {
          console.error('Failed to fetch hasil wisata data:', error);
        });

      // Fetch luaslahanData
      axios
        .get(`https://dera.noretest.com/api/kertamulya/getperbandinganpotensi?method=3&tahun=${selectedYear}`)
        .then((response) => {
          const data = response.data.data || { labels: [], data: [] };
          setLuasLahanData({
            labels: data.labels,
            data: data.data.map((value) => parseFloat(value) || 0),
          });
        })
        .catch((error) => {
          console.error('Failed to fetch hasil Luas Lahan data:', error);
        });

      // Fetch hasiltaniData
      axios
        .get(`https://dera.noretest.com/api/kertamulya/getperbandinganhasilproduksi?method=2&tahun=${selectedYear}`)
        .then((response) => {
          const data = response.data.data || { labels: [], data: [] };
          sethasilTaniData({
            labels: data.labels,
            data: data.data.map((value) => parseFloat(value) || 0),
          });
        })
        .catch((error) => {
          console.error('Failed to fetch hasil pertanian data:', error);
        });

      // Fetch hasilternakData
      axios
        .get(`https://dera.noretest.com/api/kertamulya/getperbandinganhasilproduksi?method=4&tahun=${selectedYear}`)
        .then((response) => {
          const data = response.data.data || { labels: [], data: [] };
          sethasilTernakData({
            labels: data.labels,
            data: data.data.map((value) => parseFloat(value) || 0),
          });
        })
        .catch((error) => {
          console.error('Failed to fetch hasil perternakan data:', error);
        });

      // Fetch hasilperikanankData
      axios
        .get(`https://dera.noretest.com/api/kertamulya/getperbandinganhasilproduksi?method=5&tahun=${selectedYear}`)
        .then((response) => {
          const data = response.data.data || { labels: [], data: [] };
          sethasilIkanData({
            labels: data.labels,
            data: data.data.map((value) => parseFloat(value) || 0),
          });
        })
        .catch((error) => {
          console.error('Failed to fetch hasil perikanan data:', error);
        });

      // Fetch hasil produksi potensi
      axios
        .get(`https://dera.noretest.com/api/kertamulya/getperbandinganhasilproduksi?method=1&tahun=${selectedYear}`)
        .then((response) => {
          const data = response.data.data || { labels: [], data: [] };
          setprodukPotensiData({
            labels: data.labels,
            data: data.data.map((value) => parseFloat(value) || 0),
          });
        })
        .catch((error) => {
          console.error('Failed to fetch Produk Potensi data:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loading, selectedYear]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    setLoading(true);
  };

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
      position: 'bottom', // Menetapkan posisi legend di bawah
      horizontalAlign: 'center', // Menetapkan penataan horizontal ke tengah
    },
    colors: ["#5368E5", "#6AD168","#9026E3", "#F05656", "#82C0D3"],
  };

  const potensiSeries = potensiData.data;

  const customColors = ["#CB07AC", "#59CF5E", "#DA6B6B", "#7F91F3"]; // Sesuaikan jumlah warna dengan jumlah batang
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
    colors: customColors, // Menggunakan warna kustom untuk masing-masing batang
  };  
  

const hasilProduksiSeries = [{
  name: 'Produksi',
  data: produkData.data,
}];

  

 const WisataOptions = {
  chart: {
    type: 'bar',
    foreColor: '#1c1c1c',
  },
  xaxis: {
    categories: wisataData.labels,
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      columnWidth: '50%',
    },
  },
  colors: [ "#6AD168", "#F05656", "#82C0D3"] // Sesuaikan dengan jumlah batang
};
  
  const WisataSeries = [{
    name: 'Wisata', // You can customize the name as per your requirement
    data: wisataData.data, // Use produkData.data for the bar chart data
  }];
  const LuasLahanOptions = {
    chart: {
      type: 'bar',
      foreColor: '#1c1c1c',
    },
    xaxis: {
      categories: luasLahanData.labels, 
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
      },
    },
    colors: ["#A9A9A9","#F05656", "#82C0D3", "#5368E5", ],
  };
  
  const LuasLahanSeries = [{
    name: 'Luas Lahan', // You can customize the name as per your requirement
    data: luasLahanData.data, // Use produkData.data for the bar chart data
  }];

  const hasilTaniOptions = {
    chart: {
      type: 'bar',
      foreColor: '#1c1c1c',
    },
    xaxis: {
      categories: hasilTaniData.labels, 
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
      },
    },
    colors: ["#CDB11D", "#6AD168", "#F05656", "#82C0D3"],
  };
  
  const hasilTaniSeries = [{
    name: 'Hasil Tani', // You can customize the name as per your requirement
    data: hasilTaniData.data, // Use produkData.data for the bar chart data
  }];
  const hasilTernakOptions = {
    chart: {
      type: 'bar',
      foreColor: '#1c1c1c',
    },
    xaxis: {
      categories: hasilTernakData.labels, 
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
      },
    },
    colors: ["#590E73", "#6AD168", "#F05656", "#82C0D3"],
  };
  
  const hasilTernakSeries = [{
    name: 'Hasil Ternak', // You can customize the name as per your requirement
    data: hasilTernakData.data, // Use produkData.data for the bar chart data
  }];

  const hasilIkanOptions = {
    chart: {
      type: 'bar',
      foreColor: '#1c1c1c',
    },
    xaxis: {
      categories: hasilIkanData.labels, 
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
      },
    },
    colors: ["#82C0D3", "#6AD168", "#F05656", "#82C0D3"],
  };
  
  const hasilIkanSeries = [{
    name: 'Hasil Perikanan', // You can customize the name as per your requirement
    data: hasilIkanData.data, // Use produkData.data for the bar chart data
  }];

  const produkPotensiOptions = {
    chart: {
      type: 'bar',
      foreColor: '#1c1c1c',
    },
    xaxis: {
      categories: produkPotensiData.labels, 
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
      },
    },
    colors: ["#F05656", "#6AD168", "#F05656", "#82C0D3"],
  };
  
  const produkPotensiSeries = [{
    name: 'Hasil Produksi', // You can customize the name as per your requirement
    data: produkPotensiData.data, // Use produkData.data for the bar chart data
  }];
  const Potensi = ({ isMobile, potensiOptions, potensiSeries, hasilProduksiOptions, hasilProduksiSeries, WisataOptions, WisataSeries, LuasLahanOptions, LuasLahanSeries, hasilTaniOptions, hasilTaniSeries, hasilTernakOptions, hasilTernakSeries, hasilIkanOptions, hasilIkanSeries, produkPotensiOptions, produkPotensiSeries })
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
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: "16px",
        }}
      >
          <Typography
            variant="h6"
            sx={{
              letterSpacing: "-0.2px",
              lineHeight: "130%",
              fontWeight: "bold",
              color: '#1C1C1C',
            }}
          >
            Potensi Desa
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{
            fontSize: "18px",
            letterSpacing: "-0.1px",
            lineHeight: "145%",
            fontWeight: "600",
            color: "#707070",
            display: 'flex', // Use flex display to align items
            alignItems: 'center', // Center items vertically
          }}
        >
          Tahun
          <Box sx={{ marginLeft: '8px' }}> {/* Adjust the margin as needed */}
            <Select
              label="Select Year"
              value={selectedYear}
              onChange={handleYearChange}
              variant="outlined"
              sx={{
                minWidth: '120px',
                fontWeight: '600',
                color: '#707070',
                '@media (max-width:600px)': {
                  width: '50%', // Set lebar ke 100% pada layar dengan lebar kurang dari 600px
                },
              }}
            >
              <MenuItem value="2021">2021</MenuItem>
              <MenuItem value="2022">2022</MenuItem>
              <MenuItem value="2023">2023</MenuItem>
            </Select>
          </Box>
        </Typography>
        <Box sx={{ m: 2 }}></Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: isMobile ? "center" : "flex-start",
            justifyContent: "center",
            padding: "8px 0px",
          }}
        >
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: isMobile ? "center" : "flex-start",
            justifyContent: "center",
            padding: "8px 0px",
          }}
        >
          <Box>
          <Box
        sx={{
          flexGrow: 1,
          padding: isMobile ? '16px' : '32px',
        }}
      >
      <Grid container spacing={isMobile ? 2 : 4} justifyContent="center" alignItems={isMobile ? 'flex-start' : 'center'}>
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
                <ApexCharts options={potensiOptions} series={potensiSeries} legend="bottom" type="donut" width={isMobile ? 320 : 500} />
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
                <ApexCharts options={hasilProduksiOptions} series={hasilProduksiSeries} type="bar" width={isMobile ? 320 : 550} />
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
                Perbandingan Jenis Pariwisata
                </Typography>
                <Typography variant="inherit" sx={{ fontWeight: 200, color: "#1c1c1c" }}>
                Grafik perbandingan jenis pariwisata Desa Kertamulya
                </Typography>
                <ApexCharts options={WisataOptions} series={WisataSeries} type="bar" width={isMobile ? 320 : 555} />
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
                Perbandingan Luas Lahan Potensi
                </Typography>
                <Typography variant="inherit" sx={{ fontWeight: 200, color: "#1c1c1c" }}>
                Grafik perbandingan hasil produksi potensi Desa Kertamulya (dalam ha)
                </Typography>
                <ApexCharts options={LuasLahanOptions} series={LuasLahanSeries} type="bar" width={isMobile ? 320 : 515} />
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
                Hasil Produksi Pertanian
                </Typography>
                <Typography variant="inherit" sx={{ fontWeight: 200, color: "#1c1c1c" }}>
                Grafik perbandingan hasil pertanian Desa Kertamulya (dalam ton)
                </Typography>
                <ApexCharts options={hasilTaniOptions} series={hasilTaniSeries} type="bar"width={isMobile ? 320 : 550} />
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
                Hasil Produksi Peternakan
                </Typography>
                <Typography variant="inherit" sx={{ fontWeight: 200, color: "#1c1c1c" }}>
                Grafik perbandingan hasil peternakan Desa Kertamulya (dalam ton)
                </Typography>
                <ApexCharts options={hasilTernakOptions} series={hasilTernakSeries} type="bar" width={isMobile ? 320 : 550} />
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
                Hasil Produksi Perikanan
                </Typography>
                <Typography variant="inherit" sx={{ fontWeight: 200, color: "#1c1c1c" }}>
                Grafik perbandingan hasil perikanan Desa Kertamulya (dalam ton)
                </Typography>
                <ApexCharts options={hasilIkanOptions} series={hasilIkanSeries} type="bar"width={isMobile ? 320 : 555} />
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
                <ApexCharts options={produkPotensiOptions} series={produkPotensiSeries} type="bar" width={isMobile ? 310 : 515} />
              </Paper>
            </Grid>
          </Grid>
          </Box>
        </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Potensi;
