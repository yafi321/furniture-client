import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Card, CardMedia, CardContent, Typography, Button, Grid, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { addToCart } from "../featurs/cartSlice.js";

const FurnitureDetails = ({ furniture, open, onClose, setOpenedByAdd }) => {
  const dispatch = useDispatch();
  const [imageOpen, setImageOpen] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(furniture),
  setOpenedByAdd(true));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: "bold" }}>
        {furniture.name}
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Card sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, boxShadow: 3, borderRadius: 3, p: 2 }}>
          <Grid container spacing={3} alignItems="center">
            {/* תמונה */}
            <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
              <CardMedia
                component="img"
                image={"images/" + furniture.url}
                alt={furniture.name}
                sx={{
                  width: "100%",
                  height: "auto",
                  cursor: "pointer",
                  borderRadius: 2,
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" }
                }}
                onClick={() => setImageOpen(true)}
              />
            </Grid>

            {/* פרטים */}
            <Grid item xs={12} md={6}>
              <CardContent>
                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>{furniture.name}</Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {furniture.description}
                </Typography>
                <Typography variant="h5" color="primary" sx={{ fontWeight: "bold", mb: 2 }}>
                  ₪{furniture.price}
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddToCart}
                  sx={{
                    borderRadius: 50,
                    px: 4,
                    py: 1,
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    textTransform: "none",
                    boxShadow: 2,
                    transition: "0.3s",
                    "&:hover": { backgroundColor: "#1565c0" }
                  }}
                >
                  הוספה לסל 🛒
                </Button>

                {/* צבעי המוצר */}
                {furniture.colors && furniture.colors.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      צבעי המוצר
                    </Typography>
                    <Grid container spacing={1}>
                      {furniture.colors.map((color, index) => (
                        <Grid item key={index}>
                          <Box
                            sx={{
                              width: 30,
                              height: 30,
                              borderRadius: "50%",
                              backgroundColor: color,
                              border: "2px solid #fff",
                              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                              cursor: "pointer",
                              transition: "transform 0.3s",
                              "&:hover": { transform: "scale(1.1)" }
                            }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </DialogContent>

      {/* דיאלוג להגדלת תמונה */}
      <Dialog open={imageOpen} onClose={() => setImageOpen(false)}>
        <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
          <img src={"images/" + furniture.url} alt={furniture.name} style={{ width: "100%", height: "auto", borderRadius: "10px" }} />
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};

export default FurnitureDetails;
