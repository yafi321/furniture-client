import { useState } from "react";
import {
    Card, CardContent, CardMedia, Typography,
    IconButton, CardActionArea, CardActions, Box, Dialog, Snackbar, DialogActions, DialogContent, DialogTitle, Button
} from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../featurs/cartSlice.js";
import FurnitureDetails from "../components/FurnitureDetails.jsx";
import UpdateFurniture from "../pages/UpdateFurniture.jsx";
import { deleteFurniture } from "../api/furnitureService.js";

const OneFurniture = ({ item, onEdit, onDelete, bringFromServer, setOpenedByAdd }) => {
    const dispatch = useDispatch();
    const [openDetails, setOpenDetails] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false); // State for delete confirmation
    let user = useSelector(state => state.user.currentUser);

    const handleDelete = () => {
        deleteFurniture(item, user?.token).then(() => {
            bringFromServer();
        });
        setOpenDeleteConfirm(false); // Close confirmation dialog
    };

    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={() => setOpenDetails(true)}>
                    <CardMedia
                        component="img"
                        height="270"
                        image={"https://node-project-q37j.onrender.com" + item.url}
                        alt={item.name}
                    />
                    <CardContent>
                        <Typography align="right" gutterBottom variant="h5">
                            {item.name}
                        </Typography>
                    </CardContent>
                </CardActionArea>

                <CardActions sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {user?.role === "MANAGER" &&
                        <Box>
                            <IconButton color="error" onClick={() => setOpenDeleteConfirm(true)}>
                                <DeleteIcon />
                            </IconButton>
                            <IconButton color="warning" onClick={() => setOpenEdit(true)}>
                                <EditIcon />
                            </IconButton>
                        </Box>}

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                            color="primary"
                            onClick={() => {
                                dispatch(addToCart(item));
                                setOpenedByAdd(true);
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

            <FurnitureDetails
                furniture={item}
                open={openDetails}
                onClose={() => setOpenDetails(false)}
                setOpenedByAdd={setOpenedByAdd}
            />

            <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="sm">
                <UpdateFurniture furniture={item} onClose={() => {
                    setOpenEdit(false);
                    setUpdateSuccess(true);
                    bringFromServer(1);
                    setTimeout(() => setUpdateSuccess(false), 2000);
                }} />
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={openDeleteConfirm}
                onClose={() => setOpenDeleteConfirm(false)}
                aria-labelledby="delete-confirm-dialog"
                dir = "rtl"
            >
                <DialogTitle>האם אתה בטוח שברצונך למחוק את המוצר?</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        אם תבחר באישור, המוצר ימחק לצמיתות.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteConfirm(false)} color="primary" sx={{marginLeft: "10px"}}>
                        ביטול
                    </Button>
                    <Button onClick={handleDelete} color="error">
                        אישור
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={updateSuccess}
                message={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, backgroundColor: "#333", color: "white", p: 1, borderRadius: "8px", direction: "rtl" }}>
                        <CheckCircleIcon color="success" />
                        <Typography variant="body1" >המוצר התעדכן בהצלחה</Typography>
                    </Box>
                }
                autoHideDuration={2000}
                onClose={() => setUpdateSuccess(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            />
        </>
    );
};

export default OneFurniture;
