// views/artikel/[id]/[id].tsx
"use client"
import * as React from "react";
import { useQuery } from 'react-query';
import axios from 'axios';
import { Box, Typography, CircularProgress, Card, CardContent, CardMedia, Divider, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TelegramIcon from '@mui/icons-material/Telegram';

interface Article {
  id: number;
  judul: string;
  gambar: string[];
  content: string;
  tanggal: string;
}

const fetchArticle = async (id: string) => {
  const response = await axios.get(`https://dera.noretest.com/api/kertamulya/artikel/${id}`);
  return response.data.data;
};

export default function Detail({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data: article, isLoading, isError } = useQuery(['article', id], () => fetchArticle(id));

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <div>Error fetching article</div>;
  }

  return (
    <Box sx={{ padding: 3, marginTop: '80px' }}> {/* Adjust the marginTop value as needed */}
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#2C61A4' }}>
            {article.judul}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold', color: "#707070" }}>
            {article.tanggal}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <CardMedia
            component="img"
            alt={article.judul}
            height="240"
            style={{ width: '70%', height: 'auto' ,margin: '0 auto'}}
            image={`https://dera.noretest.com/${article.gambar[0]}`}
          />
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1" dangerouslySetInnerHTML={{ __html: article.content }} />
          <Divider sx={{ my: 2 }} />
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <IconButton href="https://www.facebook.com/kertamulya.desa" target="_blank">
          <FacebookIcon sx={{ bgcolor: 'blue', color:'white'}} />
        </IconButton>
        <IconButton href="https://www.twitter.com/akun-twitter-anda" target="_blank">
          <TwitterIcon sx={{ bgcolor: 'black', color:'white' }} />
        </IconButton>
        <IconButton href="" target="_blank">
          <WhatsAppIcon sx={{ bgcolor: '#25D366', color:'white' }} />
        </IconButton>
        <IconButton href="" target="_blank">
          <ContentCopyIcon sx={{ bgcolor: '#6B4A3B', color:'white' }} />
        </IconButton>
        <IconButton href="" target="_blank">
          <TelegramIcon sx={{ bgcolor: '#0088CC', color:'white'}} />
        </IconButton>
      </div>
    </Box>
  );
}