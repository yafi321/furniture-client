import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { addToCart, deleteFromCart, reduceProduct } from "../featurs/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckOut from "./CheckOut";

const Cart = () => {
  let currentCart = useSelector((state) => state.cart.arr);
  let totalPrice = useSelector((state) => state.cart.totalSum);
  let dispatch = useDispatch();
  let navig = useNavigate();
  const [openCheckout, setOpenCheckout] = useState(false);

  return (
    <Box display="flex" flexDirection="row-reverse" justifyContent="space-between" p={3}>
      {/* טבלת המוצרים - בצד ימין */}
      <Box flex={2} ml={3}>
        <Typography variant="h4" gutterBottom>
          סל הקניות שלך
        </Typography>
        {currentCart.length === 0 ? (
          <Typography>הסל שלך ריק</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ borderRadius: 2, mt: 2 }}>
            <Table sx={{ direction: "rtl" }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">מוצר</TableCell>
                  <TableCell align="center">מחיר</TableCell>
                  <TableCell align="center">כמות</TableCell>
                  <TableCell align="center">סכום ביניים</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentCart.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell align="center">
                      <Box display="flex" flexDirection="row" alignItems="center">
                        <img src={"images/" + item.url} alt={item.name} width={50} height={50} />
                        <Box ml={1} textAlign="center">
                          <Typography variant="body1" fontWeight="bold">
                            {item.name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">₪{item.price.toFixed(2)}</TableCell>
                    <TableCell align="center">
                      <TextField
                        type="number"
                        size="small"
                        onChange={(e) => {
                          if (e.target.value > item.qty) dispatch(addToCart(item));
                          else dispatch(reduceProduct(item));
                        }}
                        defaultValue={item.qty}
                        inputProps={{
                          min: 1,
                          step: 1,
                        }}
                        sx={{ width: 60 }}
                      />
                    </TableCell>
                    <TableCell align="center">₪{(item.price * item.qty).toFixed(2)}</TableCell>
                    <TableCell align="center">
                      <IconButton color="error">
                        <DeleteIcon onClick={() => {
                          dispatch(deleteFromCart(item));
                        }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {currentCart.length > 0 && (
                  <TableRow>
                    <TableCell colSpan={3} align="center" fontWeight="bold">משלוח</TableCell>
                    <TableCell align="center">₪50.00</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* סיכום סל הקניות - בצד שמאל */}
      <Box flex={1}>
        <Card sx={{ bgcolor: "#E3F6FC", p: 2, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="right">
              סה"כ בסל הקניות
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }} textAlign="right">
              משלוח
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="right">
              משלוח חינם עד הבית להזמנות מעל 300 ש"ח, אחרת בעלות של 50 ש"ח.
            </Typography>
            <Typography variant="body2" color="primary" textAlign="right">
              אפשרויות המשלוח יעודכנו במהלך התשלום בקופה.
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" color="#B76E79" fontWeight="bold" textAlign="right">
              סה"כ: ₪{totalPrice + (currentCart.length > 0 ? 50 : 0)}
            </Typography>
            <Button
              variant="contained"
              color="error"
              fullWidth
              sx={{ mt: 2, fontSize: "1rem", fontWeight: "bold" }}
              onClick={() => setOpenCheckout(true)}
            >
              מעבר לתשלום
            </Button>
          </CardContent>
        </Card>
      </Box>

      {/* חלונית סיום הזמנה */}
      <CheckOut open={openCheckout} handleClose={() => setOpenCheckout(false)} />
    </Box>
  );
};

export default Cart;
