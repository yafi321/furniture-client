import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Grid, Box, InputAdornment, Typography, Chip } from "@mui/material";
import { updateFurniture } from "../api/furnitureService.js";

const UpdateFurniture = ({ furniture, onClose }) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [colors, setColors] = useState(furniture.colors || []);
    const [newColor, setNewColor] = useState("");

    useEffect(() => {
        // הגדרת ערכים ראשוניים בשדות
        setValue("name", furniture.name);
        setValue("description", furniture.description);
        setValue("price", furniture.price);
        setValue("url", furniture.url);
        setValue("ProductioDate", furniture.ProductioDate ? furniture.ProductioDate.split("T")[0] : "");
        setValue("colors", furniture.colors || []);
    }, [furniture, setValue]);

    const handleColorChange = (e) => setNewColor(e.target.value);

    const addColor = () => {
        if (newColor && !colors.includes(newColor)) {
            const updatedColors = [...colors, newColor];
            setColors(updatedColors);
            setValue("colors", updatedColors);
            setNewColor("");
        }
    };

    const removeColor = (color) => {
        const updatedColors = colors.filter(c => c !== color);
        setColors(updatedColors);
        setValue("colors", updatedColors);
    };

    const onSubmit = async (data) => {
        const productData = { ...data, colors ,_id: furniture._id};
        try {
            console.log(productData);
            let response = await updateFurniture(productData);
            console.log(response);
            onClose();
        } catch (err) {
            console.log(err);
            alert("שגיאה בעדכון מוצר");
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ padding: 3, maxWidth: 600, margin: "0 auto" }}>
            <Typography variant="h4" gutterBottom>עדכן מוצר</Typography>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="שם מוצר"
                        variant="outlined"
                        {...register("name", { required: "שם המוצר הוא שדה חובה", minLength: { value: 3, message: "השם חייב להיות לפחות 3 תווים" } })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="תיאור המוצר"
                        variant="outlined"
                        multiline
                        rows={4}
                        {...register("description", { required: "תיאור המוצר הוא שדה חובה" })}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="מחיר"
                        variant="outlined"
                        type="number"
                        {...register("price", { required: "המחיר הוא שדה חובה", min: { value: 0.1, message: "המחיר חייב להיות גדול מ-0" } })}
                        error={!!errors.price}
                        helperText={errors.price?.message}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">₪</InputAdornment>,
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="תמונה (URL)"
                        variant="outlined"
                        {...register("url", { required: "שדה זה הוא חובה" })}
                        error={!!errors.url}
                        helperText={errors.url?.message}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="תאריך יצור"
                        variant="outlined"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        {...register("ProductioDate", { required: "תאריך היצור הוא שדה חובה" })}
                        error={!!errors.ProductioDate}
                        helperText={errors.ProductioDate?.message}
                    />
                </Grid>

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

                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        עדכן מוצר
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default UpdateFurniture;
