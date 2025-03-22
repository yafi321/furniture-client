import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { loginUser } from "../api/userService.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userIn } from "../featurs/userSlice.js";

const LoginUser = () => {
    let { register, handleSubmit, formState: { errors } } = useForm();
    let disp = useDispatch();
    let navigate = useNavigate();
    const save = (data) => {
        loginUser(data)
            .then(res => {
                //redux-מעדכן את המשתמש הנוכחי ב 
                disp(userIn(res.data.user))
                navigate("/list")
            }).catch(err => {
                console.log(err)
                navigate("/signup")
                alert("לא נמצא משתמש, אנא הרשם")
            })
    }
    return (
        // לעדכן פה את כל העיצוב של הטוספ הזה
    <form noValidate onSubmit={handleSubmit(save)} style={{ margin: "50px" }}>
        <TextField id="outlined-basic" label="שם משתמש" variant="outlined"
            {...register("userName", {
                required: { value: true, message: "שם משתמש חובה" },
                minLength: { value: 2, message: "שם משתמש חייב להיות גדול מ-2" }
            })} />
        {errors.userName && <div className="err-inp">{errors.userName.message}</div>}

        <TextField id="outlined-basic" label="סיסמא" variant="outlined" type="password"
            {...register("password", {
                required: { value: true, message: " סיסמא חובה" },
                minLength: { value: 5, message: "סיסמא חייבת להיות גדולה מ-5" }
            })} />
        {errors.password && <div className="err-inp">{errors.password.message}</div>}

        <input type="submit" />
    </form>);
}

export default LoginUser;