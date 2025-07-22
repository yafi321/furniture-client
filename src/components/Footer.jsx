// src/components/Footer.js
import React from 'react';
import { Container, Grid, Link, Typography } from '@mui/material';
import { Directions } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer style={{ width: '100%',
      backgroundColor: '#1f1f1f',
      padding: '20px 0',
     }}
        >
      <Container dir = "rtl" style={{fontFamily: "'Heebo', sans-serif", }}>
        <Grid container spacing={4} style={{marginRight: "150px"}}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="secondary">קישורים</Typography>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li><Link href="https://www.example.com" color="#e9f4f3" underline='none'>דף הבית</Link></li>
              <li><Link href="https://www.example.com/about" color="#e9f4f3" underline='none'>אודות</Link></li>
              <li><Link href="https://www.example.com/contact" color="#e9f4f3" underline='none'>צור קשר</Link></li>
              <li><Link href="https://www.example.com/privacy" color="#e9f4f3" underline='none'>מדיניות פרטיות</Link></li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="secondary">כתובת</Typography>
            <Typography color="#e9f4f3">רחוב הדוגמה 123<br /> תל אביב, ישראל</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="secondary">עקבו אחרינו</Typography>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li><Link href="https://www.example.com/facebook" color="#e9f4f3" underline='none'>פייסבוק</Link></li>
              <li><Link href="https://www.example.com/instagram" color="#e9f4f3" underline='none'>אינסטגרם</Link></li>
              <li><Link href="https://www.example.com/twitter" color="#e9f4f3" underline='none'>טוויטר</Link></li>
            </ul>
          </Grid>
        </Grid>
        <Typography variant="body2" align="center" style={{ marginTop: '20px', color: '#F1FAEE' }}>
          &copy; 2025 כל הזכויות שמורות. פותח על ידי מירי גרוס ויפי לזר.
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;
