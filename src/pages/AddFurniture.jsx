import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Grid, Box, InputAdornment, Typography, Chip } from "@mui/material";
import { useDispatch } from "react-redux";
import { addFurniture } from "../api/furnitureService.js"
import { useNavigate } from "react-router-dom";

const AddFurniture = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [colors, setColors] = useState([]);
  const [newColor, setNewColor] = useState(""); // עבור קלט הצבע החדש

let navigate = useNavigate();

  const handleColorChange = (e) => {
    setNewColor(e.target.value);
  };

  const addColor = () => {
    if (newColor && !colors.includes(newColor)) {
      setColors([...colors, newColor]);
      setValue("colors", [...colors, newColor]);  // עדכון המערך ב- react-hook-form
      setNewColor("");  // איפוס הקלט
    }
  };

  const removeColor = (color) => {
    const updatedColors = colors.filter(c => c !== color);
    setColors(updatedColors);
    setValue("colors", updatedColors); // עדכון המערך ב- react-hook-form
  };

  const onSubmit = async (data) => {
    const productData = {
      ...data, colors
      
    }
    try {

      console.log(productData)
      let a =await addFurniture(productData)
      alert("המוצר נוסף בהצלחה")
      navigate("/list")

    }
    catch (err) {
      console.log(err)
      alert("שגיאה בהוספת מוצר")
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ padding: 3, maxWidth: 600, margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>הוסף מוצר</Typography>

      <Grid container spacing={3}>
        {/* שדה שם מוצר */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="שם מוצר"
            variant="outlined"
            {...register("name", { required: "שם המוצר הוא שדה חובה", minLength: { value: 3, message: "השם חייב להיות לפחות 3 תווים" } })}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
          />
        </Grid>

        {/* שדה תיאור מוצר */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="תיאור המוצר"
            variant="outlined"
            multiline
            rows={4}
            {...register("description", { required: "תיאור המוצר הוא שדה חובה" })}
            error={!!errors.description}
            helperText={errors.description ? errors.description.message : ""}
          />
        </Grid>

        {/* שדה מחיר */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="מחיר"
            variant="outlined"
            type="number"
            {...register("price", { required: "המחיר הוא שדה חובה", min: { value: 0.1, message: "המחיר חייב להיות גדול מ-0" } })}
            error={!!errors.price}
            helperText={errors.price ? errors.price.message : ""}
            InputProps={{
              startAdornment: <InputAdornment position="start">₪</InputAdornment>,
            }}
          />
        </Grid>

        {/* העלאת תמונה */}
        {/* <Grid item xs={12}>
          <input type="file" accept="image/*" />
        </Grid> */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="url"
            variant="outlined"
            type="text"
            {...register("url", { required: "המחיר הוא שדה חובה" })}
            error={!!errors.url}
            helperText={errors.url ? errors.url.message : ""}

          />
        </Grid>



        {/* שדה תאריך יצור */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="תאריך יצור"
            variant="outlined"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("ProductioDate", { required: "תאריך היצור הוא שדה חובה" })}
            error={!!errors.ProductioDate}
            helperText={errors.ProductioDate ? errors.ProductioDate.message : ""}
          />
        </Grid>

        {/* הוספת צבעים */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="הוסף צבע חדש"
            variant="outlined"
            value={newColor}
            onChange={handleColorChange}
            helperText="הזן צבע בצורת RGB או HEX"
          />
          <Button variant="contained" color="primary" onClick={addColor} sx={{ marginTop: 1 }}>הוסף צבע</Button>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: 2 }}>
            {colors.map((color, index) => (
              <Chip
                key={index}
                label={color}
                onDelete={() => removeColor(color)}
                sx={{ margin: 0.5, backgroundColor: color }}
              />
            ))}
          </Box>
        </Grid>

        {/* כפתור שליחה */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            הוסף מוצר
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddFurniture;
