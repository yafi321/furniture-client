import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Grid, Box, InputAdornment, Typography, Chip, Snackbar } from "@mui/material";
import { addFurniture } from "../api/furnitureService.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const AddFurniture = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [colors, setColors] = useState([]);
  const [newColor, setNewColor] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  let currentUser = useSelector(state => state.user.currentUser);
  let navigate = useNavigate();

  const handleColorChange = (e) => setNewColor(e.target.value);

  const addColor = () => {
    if (newColor && !colors.includes(newColor)) {
      setColors([...colors, newColor]);
      setValue("colors", [...colors, newColor]);
      setNewColor("");
    }
  };

  const removeColor = (color) => {
    const updatedColors = colors.filter(c => c !== color);
    setColors(updatedColors);
    setValue("colors", updatedColors);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    try {
      await addFurniture({ ...data, file: selectedFile }, currentUser?.token);
      setOpenSnackbar(true);
      setTimeout(() => navigate("/list"), 2000);
    } catch (err) {
      alert("שגיאה בהוספת מוצר: " + err.response?.data?.message);
    }
  };

  return (
    <Box component="form" dir="rtl" onSubmit={handleSubmit(onSubmit)} sx={{ padding: 3, maxWidth: 600, margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>הוסף מוצר</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField fullWidth label="שם מוצר" variant="outlined" {...register("name", { required: "שם המוצר הוא שדה חובה", minLength: { value: 3, message: "השם חייב להיות לפחות 3 תווים" } })} error={!!errors.name} helperText={errors.name ? errors.name.message : ""} />
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth label="תיאור המוצר" variant="outlined" multiline rows={4} {...register("description", { required: "תיאור המוצר הוא שדה חובה" })} error={!!errors.description} helperText={errors.description ? errors.description.message : ""} />
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth label="מחיר" variant="outlined" type="number" {...register("price", { required: "המחיר הוא שדה חובה", min: { value: 0.1, message: "המחיר חייב להיות גדול מ-0" } })} error={!!errors.price} helperText={errors.price ? errors.price.message : ""} InputProps={{ startAdornment: <InputAdornment position="start">₪</InputAdornment> }} />
        </Grid>

        <Grid item xs={12}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {preview && <img src={preview} alt="תצוגה מקדימה" style={{ marginTop: 10, maxWidth: "100%", height: "200px" }} />}
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth label="תאריך יצור" variant="outlined" type="date" InputLabelProps={{ shrink: true }} {...register("ProductioDate", { required: "תאריך היצור הוא שדה חובה" })} error={!!errors.ProductioDate} helperText={errors.ProductioDate ? errors.ProductioDate.message : ""} />
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth label="הוסף צבע חדש" variant="outlined" value={newColor} onChange={handleColorChange} helperText="הזן צבע בצורת RGB או HEX" />
          <Button variant="contained" color="primary" onClick={addColor} sx={{ marginTop: 1 }}>הוסף צבע</Button>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: 2 }}>
            {colors.map((color, index) => (
              <Chip key={index} label={color} onDelete={() => removeColor(color)} sx={{ margin: 0.5, backgroundColor: color }} />
            ))}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>הוסף מוצר</Button>
        </Grid>
      </Grid>

      <Snackbar open={openSnackbar} message={<Box sx={{ display: "flex", alignItems: "center", gap: 1, backgroundColor: "#333", color: "white", p: 1, borderRadius: "8px" }}><CheckCircleIcon color="success" /><Typography variant="body1">המוצר נוסף בהצלחה</Typography></Box>} autoHideDuration={2000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }} />
    </Box>
  );
};

export default AddFurniture;
