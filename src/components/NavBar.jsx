import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userOut } from "../featurs/userSlice.js"
import MiniCart from "./MiniCart.jsx";

const NavBar = () => {

    const currentUser = useSelector((state) => state.user.currentUser);
    let disp = useDispatch();


    return (
        <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    החנות שלי
                </Typography>
                {
                    <div style={{ marginRight: "350px" }}>
                        {currentUser ?
                            (<div>שלום, {currentUser.userName}</div>)
                            : (<div>אינך מחובר</div>)}
                    </div>
                }

                <Box>
                    <Button color="inherit" component={Link} to="/list">מוצרים</Button>
                    <Button color="inherit" component={Link} to="/cart">סל הקניות</Button>
                    <Button color="inherit" component={Link} to="/checkout">סיום הזמנה</Button>
                    <Button color="inherit" component={Link} to="/addfurniture"> הוספת מוצר</Button>


                    {!currentUser && <Button color="inherit" component={Link} to="/signup">הרשמה</Button>}
                    {!currentUser && <Button color="inherit" component={Link} to="/login">התחברות</Button>}
                    {currentUser && <Button color="inherit" onClick={() => { disp(userOut()) }}>יציאה🚪</Button>}


                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
