import { useState, useEffect, useRef } from "react";
import { Box, IconButton, Typography, Button, Grid } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const images = [
  "/images/sale1.png",
  "/images/sale2.png",
  "/images/sale3.png",
  "/images/sale4.png"
];

const HomePage = () => {
  const [index, setIndex] = useState(0);
  const prevIndex = (index - 1 + images.length) % images.length;
  const containerRef = useRef(null);
  let navigator = useNavigate();

  useEffect(() => {
    const handleImageChange = () => {
      const scrollY = window.scrollY;
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
      setTimeout(() => window.scrollTo(0, scrollY), 0);
    };

    const interval = setInterval(handleImageChange, 4000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    const scrollY = window.scrollY;
    setIndex(index === 0 ? images.length - 1 : index - 1);
    setTimeout(() => window.scrollTo(0, scrollY), 0);
  };

  const nextSlide = () => {
    const scrollY = window.scrollY;
    setIndex((index + 1) % images.length);
    setTimeout(() => window.scrollTo(0, scrollY), 0);
  };

  return (
    <Box ref={containerRef}>
      {/* קרוסלת התמונות */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "95vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box sx={{ position: "absolute", width: "100%", height: "100%" }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={images[index]}
              alt={`advertisement-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
              }}
            />
            <motion.img
              key={prevIndex}
              src={images[prevIndex]}
              alt={`previous-${prevIndex}`}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
              }}
            />
          </AnimatePresence>
        </Box>

        <IconButton
          onClick={prevSlide}
          sx={{
            position: "absolute",
            top: "50%",
            left: "2%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0,0,0,0.3)",
            color: "white",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
            padding: "10px",
            borderRadius: "50%",
          }}
        >
          <ArrowBackIos fontSize="large" />
        </IconButton>

        <IconButton
          onClick={nextSlide}
          sx={{
            position: "absolute",
            top: "50%",
            right: "2%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0,0,0,0.3)",
            color: "white",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
            padding: "10px",
            borderRadius: "50%",
          }}
        >
          <ArrowForwardIos fontSize="large" />
        </IconButton>
      </Box>

      {/* קטע האודות והכפתור */}
      <Box
        sx={{
          textAlign: "center",
          padding: "60px 30px",
          backgroundColor: "#f8f8f8",
          borderTop: "5px solid #264653",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{
            fontSize: { xs: "28px", sm: "34px", md: "40px" },
            letterSpacing: "2px",
            color: "#264653",
          }}
        >
          ברוכים הבאים ל-TakeIt - ריהוט מעוצב לבית
        </Typography>
        <Typography
          variant="h6"
          sx={{
            maxWidth: "900px",
            margin: "auto",
            lineHeight: "1.8",
            color: "#555",
            fontSize: { xs: "16px", sm: "18px", md: "20px" },
            marginBottom: "30px",
          }}
        >
          אצלנו תמצאו מגוון רהיטים יוקרתיים ומעוצבים שמתאימים לכל סגנון עיצוב. אנו מתמחים בריהוט איכותי לסלון, לחדרי שינה ולמשרדים – עם דגש על חדשנות, נוחות ועיצוב מרהיב. בואו להתרשם מהקטלוג שלנו ולמצוא את הריהוט המושלם לבית שלכם.
        </Typography>

        <Button
          variant="contained"
          sx={{
            marginTop: "20px",
            fontSize: "18px",
            padding: "12px 30px",
            backgroundColor: "#264653",
            "&:hover": { backgroundColor: "#1d3d39" },
          }}
          onClick={() => navigator("/list")}
        >
          לכל המוצרים
        </Button>
      </Box>

      {/* המלצות לקונים */}
      <Box
        sx={{
          padding: "60px 30px",
          backgroundColor: "#e9f4f3",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            marginBottom: "30px",
            color: "#264653",
            fontSize: { xs: "22px", sm: "26px", md: "30px" },
          }}
        >
          ?מה לקוחותינו אומרים עלינו
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                padding: "20px",
                backgroundColor: "white",
                boxShadow: 3,
                borderRadius: "10px",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontStyle: "italic",
                  marginBottom: "15px",
                  color: "#555",
                }}
              >
                "הספה שרכשנו היא פשוט מושלמת! עיצוב מרהיב, נוחות שאין שנייה לה, והתחושה בבית נהפכה להיות הרבה יותר חמימה. ממליצים בחום!"
              </Typography>
              <Typography sx={{ fontWeight: "bold", color: "#264653" }}>
                נעמי ויוסי, תל אביב
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                padding: "20px",
                backgroundColor: "white",
                boxShadow: 3,
                borderRadius: "10px",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontStyle: "italic",
                  marginBottom: "15px",
                  color: "#555",
                }}
              >
                "החוויות שלנו עם החברה היו פשוט נהדרות! קיבלנו שירות מקצועי, הרהיטים הגיעו בזמן ונראים מדהים. לגמרי שווה את ההשקעה."
              </Typography>
              <Typography sx={{ fontWeight: "bold", color: "#264653" }}>
                דוד ואור, חיפה
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                padding: "20px",
                backgroundColor: "white",
                boxShadow: 3,
                borderRadius: "10px",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontStyle: "italic",
                  marginBottom: "15px",
                  color: "#555",
                }}
              >
                "הרהיטים כל כך איכותיים, אנחנו מרוצים מאוד מהבחירות שעשינו. עיצוב הבית שלנו השתדרג בצורה משמעותית."
              </Typography>
              <Typography sx={{ fontWeight: "bold", color: "#264653" }}>
                מרים ורן, ירושלים
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
