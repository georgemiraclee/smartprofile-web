// Import necessary libraries and components
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from "@mui/material/Grid";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Modal from '@mui/material/Modal';
import YouTube from 'react-youtube';
import axios from 'axios';

// Replace 'YOUR_YOUTUBE_API_KEY' with your actual YouTube API key
const API_KEY = 'YOUR_YOUTUBE_API_KEY';

// Define the GaleriItem interface
interface GaleriItem {
  id: number;
  type: 'IMAGE' | 'VIDEO';
  url: string;
  caption: string;
}

// Galeri component
const Galeri = () => {
  const [galeriData, setGaleriData] = useState<GaleriItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [itemToShow, setItemToShow] = useState<GaleriItem | null>(null);

  useEffect(() => {
    // Fetch galeriData using axios
    axios
      .get('https://dera.noretest.com/api/kertamulya/galeri')
      .then((response) => {
        setGaleriData(response.data.data);
      })
      .catch((error) => {
        console.error('Gagal memuat data galeri:', error);
      });
  }, []);

  const dividerStyle = {
    borderBottom: 'solid #17437A',
  };

  const handleOpenModal = (item: GaleriItem) => {
    setItemToShow(item);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setItemToShow(null);
  };

  return (
    <Box
      sx={{
        // Styles for the container
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: "32px",
        gap: "16px",
        marginTop: "64px",
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Gallery title and divider */}
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
          {/* Gallery title */}
          <Typography
            variant="h6"
            sx={{
              letterSpacing: "-0.2px",
              lineHeight: "130%",
              fontWeight: "bold",
              color: '#17437A',
            }}
          >
            Galeri
          </Typography>
          {/* Forward arrow icon */}
          <ArrowForwardIosIcon sx={{ color: '#17437A' }} />
        </Box>
        {/* Divider */}
        <Divider variant="middle" style={dividerStyle} flexItem />
        {/* Grid to display gallery items */}
       <Grid container spacing={3}>
        {galeriData.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            {/* Card component for each gallery item */}
            <Card sx={{ backgroundColor: '#2C61A4', color: 'white' }}>
              {item.type === 'IMAGE' ? (
                // Display image if the item type is IMAGE
                <CardMedia
                  component="img"
                  height="240"
                  image={`https://dera.noretest.com/${item.url}`}
                  onClick={() => handleOpenModal(item)}
                  style={{ cursor: 'pointer' }}
                />
              ) : item.type === 'VIDEO' ? (
                // Display video thumbnail based on the video URL
                <CardMedia
                  component="img"
                  height="240"
                  // Check the video URL and set the thumbnail accordingly
                  image={
                    item.url.includes('youtu.be/G-fayZ62YWA')
                      ? `https://img.youtube.com/vi/G-fayZ62YWA/sddefault.jpg`
                      : item.url.includes('youtu.be/HOZmy4E5Rps')
                      ? `https://img.youtube.com/vi/HOZmy4E5Rps/sddefault.jpg`
                      : item.url.includes('youtu.be/noX0LpLy07U')
                      ? `https://img.youtube.com/vi/noX0LpLy07U/sddefault.jpg`
                      : item.url.includes('youtu.be/HOZmy4E5Rps')
                      ? `https://img.youtube.com/vi/HOZmy4E5Rps/sddefault.jpg`
                      : `https://img.youtube.com/vi/sr-j9BTERhE/sddefault.jpg`
                  }
                  onClick={() => handleOpenModal(item)}
                  style={{ cursor: 'pointer' }}
                />
              ) : null}
              {/* Card content with caption */}
              <CardContent>
                <Typography variant="body2" color="white">
                  {item.caption}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      </Box>

      {/* Modal for displaying the selected item */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            p: 4,
            borderRadius: '1px',
          }}
        >
          {/* Check item type to determine whether to display an image or a video */}
          {itemToShow?.type === 'IMAGE' ? (
            // Display image
            <img src={`https://dera.noretest.com/${itemToShow.url}`} alt="Image" style={{ maxWidth: '100%' }} />
          ) : itemToShow?.type === 'VIDEO' ? (
            // Display YouTube video
            <YouTube videoId={itemToShow.url.split('/').pop()} />
          ) : null}
        </Box>
      </Modal>
    </Box>
  );
};

export default Galeri;
