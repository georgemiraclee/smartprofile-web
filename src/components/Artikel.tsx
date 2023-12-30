// pages/artikel.tsx
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';
import Link from 'next/link';

interface Article {
  id: number;
  judul: string;
  gambar: string[];
  deskripsi_pendek: string;
  tanggal: string;
}

function Artikel() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    // Fetch the articles from the API
    axios
      .get('https://dera.noretest.com/api/kertamulya/artikel')
      .then((response) => {
        setArticles(response.data.data.content);
      })
      .catch((error) => {
        console.error('Failed to load articles:', error);
      });
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: '16px', // Adjust padding for smaller screens
        gap: '16px',
        marginTop: '64px', // Adjust margin to avoid covering the navbar (assuming the navbar is 64px in height)
        position: 'relative',
        zIndex: 1, // Ensure that the component appears above other elements
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          gap: '16px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '8px',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              letterSpacing: '-0.2px',
              lineHeight: '130%',
              fontWeight: 'bold',
              color: '#17437A',
            }}
          >
            Artikel
          </Typography>
          <ArrowForwardIosIcon sx={{ color: '#17437A' }} />
        </Box>
        <Divider variant="middle" sx={{ borderBottom: 'solid #17437A' }} flexItem />
        <Grid container spacing={3}>
          {articles.map((article) => (
            <Grid item key={article.id} xs={12} sm={6}>
              <Card sx={{ height: '100%' }}>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <CardMedia
                      component="img"
                      height="240"
                      width="100%" // Ensure the image takes the full width on smaller screens
                      image={`https://dera.noretest.com/${article.gambar[0]}`}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#17437A' }}>
                        {/* Link to the ArtikelDetail page with the correct article id */}
                        <Link href={`/artikel/${article.id}`} passHref>
                          {article.judul}
                        </Link>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {article.deskripsi_pendek}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {article.tanggal}
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Artikel;
