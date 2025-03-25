import { useState } from "react";
import {
    Card, CardContent, CardMedia, Typography,
    IconButton, CardActionArea, CardActions, Box, Dialog
} from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../featurs/cartSlice.js";
import FurnitureDetails from "../components/FurnitureDetails.jsx";
import UpdateFurniture from "../pages/UpdateFurniture.jsx";
import { deleteFurniture } from "../api/furnitureService.js";

const OneFurniture = ({ item, onEdit, onDelete, bringFromServer, setOpenedByAdd }) => {
    const dispatch = useDispatch();
    const [openDetails, setOpenDetails] = useState(false);
    const [openEdit, setOpenEdit] = useState(false); // שליטה בדיאלוג העריכה
    let user = useSelector(state => state.user.currentUser)

    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={() => setOpenDetails(true)}>
                    <CardMedia
                        component="img"
                        height="270"
                        image={"https://node-project-q37j.onrender.com"+item.url}
                        alt={item.name}
                    />
                    <CardContent>
                        <Typography align="right" gutterBottom variant="h5">
                            {item.name}
                        </Typography>
                    </CardContent>
                </CardActionArea>

                {/* פעולות בכרטיס */}
                
                <CardActions sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {user?.role=="MANAGER"&&
                    <Box>
                        <IconButton color="error" onClick={() => {
                            deleteFurniture(item, user?.token).then(() => {
                                alert("המוצר נמחק בהצלחה");
                                bringFromServer(); // לטעון מחדש את הנתונים מהשרת
                            });
                        }}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton color="warning" onClick={() => setOpenEdit(true)}>
                            <EditIcon />
                        </IconButton>
                    </Box>}

                    {/* מחיר ואייקון עגלה */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                            color="primary"
                            onClick={() => {
                                dispatch(addToCart(item)); // הוספת המוצר לעגלה
                                setOpenedByAdd(true); // מודיע ל-MiniCart שנוסף מוצר וצריך לפתוח את הסל
                            }}
                        >
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
                setOpenedByAdd={setOpenedByAdd}
            />

            {/* חלון עריכה */}
            <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="sm">
                <UpdateFurniture furniture={item} onClose={() => {
                    setOpenEdit(false);
                    bringFromServer(1);
                }} />
            </Dialog>
        </>
    );
};

export default OneFurniture;
