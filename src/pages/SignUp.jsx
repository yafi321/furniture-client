import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useForm } from "react-hook-form";
import { addUser } from "../api/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userIn } from "../featurs/userSlice.js";

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const save = (data) => {
        addUser(data)
            .then(res => {
                dispatch(userIn(res.data));
                navigate("/list");
            })
            .catch(err => {
                console.log(err);
                alert("שגיאה בהרשמה");
            });
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: "30px", marginTop: "50px", textAlign: "center" }}>
                <Typography variant="h4" gutterBottom>
                    הרשמה
                </Typography>
                <form noValidate onSubmit={handleSubmit(save)} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <TextField
                        label="שם משתמש"
                        variant="outlined"
                        fullWidth
                        InputProps={{ sx: { textAlign: "right" }, inputProps: { dir: "rtl" } }}
                        {...register("userName", {
                            required: { value: true, message: "שם משתמש חובה" },
                            minLength: { value: 2, message: "שם משתמש חייב להיות גדול מ-2" }
                        })}
                        error={!!errors.userName}
                        helperText={errors.userName?.message}
                    />

                    <TextField
                    
                        label="סיסמא"
                        variant="outlined"
                        type="password"
                        fullWidth
                        {...register("password", {
                            required: { value: true, message: "סיסמא חובה" },
                            minLength: { value: 5, message: "סיסמא חייבת להיות גדולה מ-5" }
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    <TextField
                        label="מייל"
                        variant="outlined"
                        type="email"
                        fullWidth
                        {...register("email", {
                            required: { value: true, message: "מייל חובה" },
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "מייל חייב להיות תקין" }
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        הרשמה
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default SignUp;
