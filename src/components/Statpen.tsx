import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ApexCharts from 'react-apexcharts';
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// Komponen Statistik
function Statistik() {
  const [selectedYear, setSelectedYear] = useState('2023'); // Default selected year
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [perubahanPendudukData, setPerubahanPendudukData] = useState({ labels: [], data: [] });
  const [genderData, setGenderData] = useState({ labels: [], data: [] });
  const [religionData, setReligionData] = useState({ labels: [], data: [] });
  const [maritalStatusData, setMaritalStatusData] = useState({ labels: [], data: [] });
  const [citizenshipData, setCitizenshipData] = useState({ labels: [], data: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDataForYear(selectedYear);
  }, [selectedYear]);

  const fetchDataForYear = (year) => {
    setLoading(true);
    
    // Fetch perubahan penduduk data
    axios
      .get(`https://dera.noretest.com/api/kertamulya/getperubahanpenduduk?tahun=${year}`)
      .then((response) => {
        const data = response.data.data;
        setPerubahanPendudukData(data);
      })
      .catch((error) => {
        console.error('Failed to fetch perubahan penduduk data:', error);
      });

    // Fetch gender data
    axios
      .get(`https://dera.noretest.com/api/kertamulya/getperbandinganpenduduk?method=1&tahun=${year}`)
      .then((response) => {
        const data = response.data.data;
        setGenderData(data);
      })
      .catch((error) => {
        console.error('Failed to fetch gender data:', error);
      });

    // Fetch religion data
    axios
      .get(`https://dera.noretest.com/api/kertamulya/getperbandinganpenduduk?method=2&tahun=${year}`)
      .then((response) => {
        const data = response.data.data;
        setReligionData(data);
      })
      .catch((error) => {
        console.error('Failed to fetch religion data:', error);
      });

    // Fetch marital status data
    axios
      .get(`https://dera.noretest.com/api/kertamulya/getperbandinganpenduduk?method=3&tahun=${year}`)
      .then((response) => {
        const data = response.data.data;
        setMaritalStatusData(data);
      })
      .catch((error) => {
        console.error('Failed to fetch marital status data:', error);
      });

    // Fetch citizenship data
    axios
      .get(`https://dera.noretest.com/api/kertamulya/getperbandinganpenduduk?method=4&tahun=${year}`)
      .then((response) => {
        const data = response.data.data;
        setCitizenshipData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch citizenship data:', error);
        setLoading(false);
      });
  };
  // Konfigurasi opsi grafik donut untuk perbandingan jenis kelamin
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
      position: 'bottom', // Menetapkan posisi legend di bawah
      horizontalAlign: 'center', // Menetapkan penataan horizontal ke tengah
    },
  };

  const genderSeries = genderData.data;

  // Konfigurasi opsi grafik donut untuk perbandingan agama
  const religionOptions = {
    chart: {
      type: 'donut',
      foreColor: '#1c1c1c',
    },
    labels: religionData.labels,
    dataLabels: {
      enabled: false,
      position: "bottom"
    },
    plotOptions: {
      pie: {
        customScale: 1,
        position: "bottom"
      },
    },
    legend: {
      position: 'bottom', // Menetapkan posisi legend di bawah
      horizontalAlign: 'center', // Menetapkan penataan horizontal ke tengah
    },
    colors: ["#5368E5", "#6AD168", "#F05656", "#82C0D3"], 
  };

  const religionSeries = religionData.data;

  // Konfigurasi opsi grafik donut untuk perbandingan status perkawinan
  const maritalStatusOptions = {
    chart: {
      type: 'donut',
      foreColor: '#1c1c1c',
    },
    colors: ['#5368E5', '#FF2392'],
    labels: maritalStatusData.labels,
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
    colors: ["#5FE06C", "#CC7F37", "#4F7DF1", "#781255"],
  };

  const maritalStatusSeries = maritalStatusData.data;

  // Konfigurasi opsi grafik donut untuk perbandingan kewarganegaraan
  const citizenshipOptions = {
    chart: {
      type: 'donut',
      foreColor: '#1c1c1c',
    },
    colors: ["#5368E5", "#FF2392"],
    labels: citizenshipData.labels,
    dataLabels: {
      enabled: false,
      position: "bottom"
    },
    plotOptions: {
      pie: {
        customScale: 1,
        dataLabels: {
        },
      },
    },
    legend: {
      position: 'bottom', // Menetapkan posisi legend di bawah
      horizontalAlign: 'center', // Menetapkan penataan horizontal ke tengah
    },
    colors: ["#FF0000", "#72ED7E"],
  };
  
  const citizenshipSeries = citizenshipData.data;

  // Fungsi untuk mendapatkan indeks nilai maksimum
  const getMaxValueIndex = (data) => {
    const maxValue = Math.max(...data);
    return data.indexOf(maxValue);
  };

  // Fungsi untuk mendapatkan label pada nilai maksimum
  const getLabelAtMaxValue = (data, labels) => {
    const maxIndex = getMaxValueIndex(data);
    return labels[maxIndex];
  };

  // Fungsi untuk mendapatkan opsi dengan teks tengah
  const getOptionsWithCenterText = (options, series, labels) => {
    const maxLabel = getLabelAtMaxValue(series, labels);

    return {
      ...options,
      plotOptions: {
        pie: {
          ...options.plotOptions.pie,
          customScale: 1,
          dataLabels: {
            ...options.plotOptions.pie.dataLabels,
            text: maxLabel,
            offsetY: 30, // Sesuaikan nilai offsetY sesuai kebutuhan
          },
        },
      },
    };
  };

  // Terapkan opsi tengah pada grafik jenis kelamin
  const genderOptionsWithCenterText = getOptionsWithCenterText(genderOptions, genderSeries, genderData.labels);
  // Terapkan opsi tengah pada grafik agama
  const religionOptionsWithCenterText = getOptionsWithCenterText(religionOptions, religionSeries, religionData.labels);
  // Terapkan opsi tengah pada grafik status perkawinan
  const maritalStatusOptionsWithCenterText = getOptionsWithCenterText(maritalStatusOptions, maritalStatusSeries, maritalStatusData.labels);
  // Terapkan opsi tengah pada grafik kewarganegaraan
  const citizenshipOptionsWithCenterText = getOptionsWithCenterText(citizenshipOptions, citizenshipSeries, citizenshipData.labels);

  const LineChart = ({ data, width, height }) => {
    const chartOptions = {
      chart: {
        type: 'line',
      },
      xaxis: {
        categories: data.labels,
      },
    };
    const maxWidth = isMobile ? '100%' : '1200px';
    const maxHeight = isMobile ? '250px' : '500px';
    return (
      <ApexCharts
        options={chartOptions}
        series={[{ name: 'Perubahan Jumlah Penduduk', data: data.data }]}
        type="line"
        width={maxWidth}
        height={maxHeight}
  
      />
    );
  };
  return (
     <Box
      sx={{
        backgroundColor: "#FFFFF",
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
          flexDirection: "row",  // Change to row to align items horizontally
          alignItems: "center",   // Align items vertically in the center
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
            Statistik Penduduk
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
          <Box sx={{ marginLeft: '10px' }}>
          <Select
            label="Select Year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            variant="outlined"
            sx={{
              minWidth: '120px',
              marginRight: '16px',
              fontWeight: '600',
              color: '#707070',
              '@media (max-width:600px)': {
                width: '50%',
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
            alignItems: "center",
            justifyContent: "center",
            padding: "8px 0px",
          }}
        >
          {/* Konten tambahan di sini */}
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
                  padding: "44px 36px",
                  gap: "16px", 
                  '@media (max-width: 600px)': {
                    padding: '20px',
                    gap: '16px',
                }}}
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
                  padding: "44px 36px",
                  gap: "16px", 
                  '@media (max-width: 600px)': {
                    padding: '20px',
                    gap: '16px',
                }}}
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
                  padding: "44px 36px",
                  gap: "16px", 
                  '@media (max-width: 600px)': {
                    padding: '20px',
                    gap: '16px',
                }}}
              >
                <Typography variant="h6" sx={{ fontWeight: 500, color: "gray" }}>
                  Kepadatan Penduduk
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 600, color: "#1c1c1c" }}>
                  6.895 jiwa/km2
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
            <Paper
            sx={{
              borderRadius: "20px",
              backgroundColor: "#fff",
              boxShadow: "0px 0px 16px rgba(12, 49, 97, 0.12)",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: isMobile ? "20px" : "44px 36px",
              gap: "16px",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, color: "black" }}>
              Perubahan Jumlah Penduduk
            </Typography>
            <Typography variant="inherit" sx={{ fontWeight: 200, color: "#1c1c1c" }}>
              Grafik perubahan jumlah penduduk Desa Kertamulya (per tahun)
            </Typography>
            {loading ? (
              <Typography variant="inherit" sx={{ fontWeight: 200, color: "#1c1c1c" }}>
                Loading...
              </Typography>
            ) : (
          <LineChart
            data={perubahanPendudukData}
            width={['60%', '60%', '50%']} // Sesuaikan lebar sesuai kebutuhan pada mobile dan laptop
            height={['100px', '200px', '300px']} // Sesuaikan tinggi sesuai kebutuhan pada mobile dan laptop
          />
            )}
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
                  padding: "44px 36px",
                  gap: "16px", 
                  '@media (max-width: 600px)': {
                    padding: '20px',
                    gap: '16px',
                }}}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, color: "black" }}>
                  Perbandingan Jenis Kelamin
                </Typography>
                <Typography variant="inherit" sx={{ fontWeight: 200, color: "#1c1c1c" }}>
                  Grafik perbandingan jenis kelamin penduduk Desa Kertamulya
                </Typography>
               <ApexCharts options={genderOptionsWithCenterText} series={genderSeries} type="donut" width={isMobile ? 300 : 500} />
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
                  padding: "44px 36px",
                  gap: "16px", 
                  '@media (max-width: 600px)': {
                    padding: '20px',
                    gap: '16px',
                }}}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, color: "black" }}>
                  Perbandingan Agama
                </Typography>
                <Typography variant="inherit" sx={{ fontWeight: 200, color: "#1c1c1c" }}>
                  Grafik perbandingan agama penduduk Desa Kertamulya
                </Typography>
                <ApexCharts options={religionOptions} series={religionSeries} type="donut" width={isMobile ? 300 : 500} />
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
                  padding: "44px 36px",
                  gap: "16px", 
                  '@media (max-width: 600px)': {
                    padding: '20px',
                    gap: '16px',
                }}}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, color: "black" }}>
                Perbandingan Status Perkawinan
                </Typography>
                <Typography variant="inherit" sx={{ fontWeight: 200, color: "#1c1c1c" }}>
                Grafik perbandingan status perkawinan penduduk Desa Kertamulya
                </Typography>
                <ApexCharts options={maritalStatusOptions} series={maritalStatusSeries} type="donut" width={isMobile ? 300 : 500} />
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
                  padding: "44px 36px",
                  gap: "16px", 
                  '@media (max-width: 700px)': {
                    padding: '20px',
                    gap: '16px',
                }}}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, color: "black" }}>
                Perbandingan Kewarganegaraan
                </Typography>
                <Typography variant="inherit" sx={{ fontWeight: 200, color: "#1c1c1c" }}>
                  Grafik perbandingan kewarganegaraan penduduk Desa Kertamulya
                </Typography>
               <ApexCharts options={citizenshipOptions} series={citizenshipSeries} type="donut" width={isMobile ? 300 : 500} />
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

export default Statistik;
