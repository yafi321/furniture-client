import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LoginIcon from "@mui/icons-material/Login";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userOut } from "../featurs/userSlice.js";
import LoginUser from "../pages/LoginUser.jsx";
import { useState } from "react";

const NavBar = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const [openLogin, setOpenLogin] = useState(false);
    let navigate = useNavigate();

    return (
        <>
            <AppBar position="fixed">
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    {/* לוגו בצד שמאל */}
                    
                    <Box sx={{ flexGrow: 1 }}>
                        <img 
                            src="public/images/furniture-logo.png" 
                            alt="logo" 
                            style={{ height: "80px" ,
                                margin: "5px"
                            }}
                            onClick={()=> navigate("*")}
                        />
                    </Box>

                    <div style={{marginRight:"350px", fontFamily: "'Heebo', sans-serif", fontSize:"1.2rem"}}>
                     {currentUser ? (
                       <p> {currentUser.userName} שלום </p>
                     ) : (
                       <p>אינך מחובר</p>
                     )}
                   </div>
                 

                    {/* קישורים בצד ימין */}
                    <Box>
                        <Button color="inherit" component={Link} to="/list">מוצרים</Button>
                        <Button color="inherit" component={Link} to="/cart">סל הקניות</Button>
                        {currentUser?.role === "MANAGER" && (
                            <Button color="inherit" component={Link} to="/addfurniture">הוספת מוצר</Button>
                        )}
                        {!currentUser ? (
                            <>
                                <Button color="inherit" component={Link} to="/signup">הרשמה</Button>
                                <IconButton color="inherit" onClick={() => setOpenLogin(true)}>
                                    <LoginIcon />
                                </IconButton>
                            </>
                        ) : (
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
