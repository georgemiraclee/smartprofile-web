'use client'
import React from 'react';
import { Container, Grid, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import useStyles from './FooterStyles';
import "@/app/footer.css";
import '@/app/styleguide.css';

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <div className={classes.footerSection}>
              <Typography variant="h5" className={classes.sectionTitle}>
                Profil
              </Typography>
              <p className={classes.sectionContent}>
                Desa Kertamulya terletak di Kecamatan Padalarang, Kabupaten Bandung Barat, Jawa Barat, Indonesia. Dengan jumlah penduduk sebesar 21.050 jiwa yang mayoritas beragama Islam, potensi terbesar Desa Kertamulya adalah pertanian. Desa Kertamulya memiliki luas wilayah sebesar 305.28 ha.
              </p>
              <div className={classes.socialIcons}>
              <IconButton href="https://www.facebook.com/kertamulya.desa" target="_blank">
                  <FacebookIcon sx={{ color: 'white' }} />
                  </IconButton>
                <IconButton href="https://www.twitter.com/akun-twitter-anda" target="_blank">
                  <TwitterIcon sx={{ color: 'white' }} />
                </IconButton>
              <IconButton href="https://www.instagram.com/kertamulya548/" target="_blank">
                   <InstagramIcon sx={{ color: 'white' }} />
                </IconButton>
              <IconButton href="https://www.youtube.com/channel/UCg4yvrwYo_b_vLLwCSo_qZw" target="_blank">
                  <YouTubeIcon sx={{ color: 'white' }} />
              </IconButton>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
      <div className={classes.footerSection}>
        <Typography variant="h5" className={classes.sectionTitle}>
          Tautan
        </Typography>
        <ul className={classes.sectionList}>
          <li className={classes.listItem}>
            <a href="/statistik" style={{ fontWeight: '500' }}>
              Statistik Penduduk
            </a>
          </li>
          <li className={classes.listItem}>
            <a href="/potensi" style={{ fontWeight: '400' }}>
              Potensi Desa
            </a>
          </li>
          <li className={classes.listItem}>
            <a href="/artikel" style={{ fontWeight: '400' }}>
              Artikel
            </a>
          </li>
          <li className={classes.listItem}>
            <a href="/galeri" style={{ fontWeight: '400' }}>
              Galeri
            </a>
          </li>
        </ul>
      </div>
    </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div className={classes.footerSection}>
              <Typography variant="h5" className={classes.sectionTitle}>
                Kontak
              </Typography>
              <div className={classes.contactInfo}>
                <LocationOnIcon className={classes.contactIcon} />
                <p className={classes.contactText}>
                  Jl. Raya Tagog No. 128 Padalarang, Kode Pos 40553
                </p>
              </div>
              <div className={classes.contactInfo}>
                <LocalPhoneIcon className={classes.contactIcon} />
                <p className={classes.contactText}>022-6623181</p>
              </div>
              <div className={classes.contactInfo}>
                <EmailIcon className={classes.contactIcon} />
                <a
                  href="mailto:pemdes@kertamulya-padalarang.desa.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.contactLink}
                >
                  pemdes@kertamulya-padalarang.desa.id
                </a>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div className={classes.footerSection}>
              <Typography variant="h5" className={classes.sectionTitle}>
                Lokasi
              </Typography>
              <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d63385.132030709705!2d107.4730634284668!3d-6.82194429217944!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e351359d7249%3A0xfe387295e956fa29!2sKertamulya%2C%20Padalarang%2C%20West%20Bandung%20Regency%2C%20West%20Java%2C%20Indonesia!5e0!3m2!1sen!2sus!4v1698293508427!5m2!1sen!2sus"
                width="100%"
                height="300"
                frameBorder="0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
