import { useState } from "react";
import {
    Card, CardContent, CardMedia, Typography,
    IconButton, CardActionArea, CardActions, Box, Dialog
} from "@mui/material";
// לבדוק איך אפשר פה להכניס גם אותם לימפורט אחד 
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { addToCart } from "../featurs/cartSlice.js";
import FurnitureDetails from "../components/FurnitureDetails.jsx";
import UpdateFurniture from "../pages/UpdateFurniture.jsx";
import { deleteFurniture } from "../api/furnitureService.js";

const OneFurniture = ({ item, onEdit, onDelete, bringFromServer }) => {
    const dispatch = useDispatch();
    const [openDetails, setOpenDetails] = useState(false);
    const [openEdit, setOpenEdit] = useState(false); // שליטה בדיאלוג העריכה

    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={() => setOpenDetails(true)}>
                    <CardMedia
                        component="img"
                        height="270"
                        image={"images/" + item.url}
                        alt={item.name}
                    />
                    <CardContent>
                        <Typography align="right" gutterBottom variant="h5">
                            {item.name}
                        </Typography>
                        {/* <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            {item.description}
                        </Typography> */}
                    </CardContent>
                </CardActionArea>

                {/* פעולות בכרטיס */}
                <CardActions sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {/* אייקוני עריכה ומחיקה */}
                    {/* להציג אותם רק אם המשתמש הנוכחי הוא עם תפקיד מנהל */}
                    <Box>
                        <IconButton color="error" onClick={() => {
                            deleteFurniture(item).then(() => {
                                alert("המוצר נמחק בהצלחה")
                                bringFromServer(1); // לקרוא לטעינה מחדש אחרי שהמוצר נמחק
                            });
                        }
                        }>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton color="warning" onClick={() => setOpenEdit(true)}>
                            <EditIcon />
                        </IconButton>
                    </Box>

                    {/* מחיר ואייקון עגלה */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton color="primary" onClick={() => dispatch(addToCart(item))}>
                            <ShoppingCartCheckoutIcon />
                        </IconButton>
                        <Typography variant="h6" sx={{ ml: 1 }}>
                           ₪ {item.price}
                        </Typography>
                    </Box>
                </CardActions>
            </Card>

            {/* חלון פרטי הרהיט */}
            <FurnitureDetails
                furniture={item}
                open={openDetails}
                onClose={() => setOpenDetails(false)}
            />

            {/* חלון עריכה */}
            <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="sm">
                <UpdateFurniture furniture={item} onClose={() => {
                    setOpenEdit(false)
                    bringFromServer(1)
                }} />
            </Dialog>
        </>
    );
};

export default OneFurniture;
