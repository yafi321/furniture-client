import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LoginIcon from "@mui/icons-material/Login";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userOut } from "../featurs/userSlice.js";
import MiniCart from "./MiniCart.jsx";
import LoginUser from "../pages/LoginUser.jsx"; // ייבוא חלון ההתחברות
import { useState } from "react";

const NavBar = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const [openLogin, setOpenLogin] = useState(false);

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        החנות שלי
                    </Typography>

                    <Box>
                        <Button color="inherit" component={Link} to="/list">מוצרים</Button>
                        <Button color="inherit" component={Link} to="/cart">סל הקניות</Button>
                        <Button color="inherit" component={Link} to="/checkout">סיום הזמנה</Button>
                        {currentUser?.role =="MANAGER"&& <Button color="inherit" component={Link} to="/addfurniture">הוספת מוצר</Button>}

                        {!currentUser && (
                            <>
                                <Button color="inherit" component={Link} to="/signup">הרשמה</Button>
                                <IconButton color="inherit" onClick={() => setOpenLogin(true)}>
                                    <LoginIcon />
                                </IconButton>
                            </>
                        )}
                        {currentUser && (
                            <Button color="inherit" onClick={() => dispatch(userOut())}>
                                יציאה🚪
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* חלון ההתחברות */}
            <LoginUser open={openLogin} handleClose={() => setOpenLogin(false)} />
        </>
    );
};

export default NavBar;
