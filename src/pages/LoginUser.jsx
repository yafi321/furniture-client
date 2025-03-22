import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, TextField, Button, IconButton, Typography, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { loginUser } from "../api/userService.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userIn } from "../featurs/userSlice.js";

// פונקציה ליצירת אנימציה מלמעלה למטה
const Transition = React.forwardRef((props, ref) => (
    <Slide direction="down" ref={ref} {...props} />
));

const LoginUser = ({ open, handleClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const save = (data) => {
        console.log(data)
        loginUser(data.userName, data.password)
            .then(res => {
                dispatch(userIn(res.data));
                handleClose();
            })
            .catch(err => {
                console.log(err);
                alert("לא נמצא משתמש, אנא הרשם");
            });
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="xs"
            fullWidth
            TransitionComponent={Transition}
            sx={{ "& .MuiPaper-root": { backgroundColor: "#f5f5f5" } }} // רקע אפור בהיר במקום שחור
        >
            <DialogTitle>
                כניסה לחברים
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{ position: "absolute", right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <form noValidate onSubmit={handleSubmit(save)}>
                    <TextField
                        fullWidth
                        label="שם משתמש"
                        variant="outlined"
                        margin="normal"
                        {...register("userName", {
                            required: { value: true, message: "שם משתמש חובה" },
                            minLength: { value: 2, message: "שם משתמש חייב להיות גדול מ-2" }
                        })}
                    />
                    {errors.userName && <Typography color="error">{errors.userName.message}</Typography>}

                    <TextField
                        fullWidth
                        label="סיסמא"
                        variant="outlined"
                        type="password"
                        margin="normal"
                        {...register("password", {
                            required: { value: true, message: "סיסמא חובה" },
                            minLength: { value: 5, message: "סיסמא חייבת להיות גדולה מ-5" }
                        })}
                    />
                    {errors.password && <Typography color="error">{errors.password.message}</Typography>}

                    <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                        שלח
                    </Button>
                </form>
                <Typography align="center" sx={{ mt: 2 }}>
                    <Button color="secondary" onClick={() => navigate("/signup")}>הרשם</Button>
                </Typography>
            </DialogContent>
        </Dialog>
    );
};

export default LoginUser;
