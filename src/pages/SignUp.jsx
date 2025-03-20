import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { addUser } from "../api/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {userIn} from "../featurs/userSlice.js"
const SignUp = () => {
    let { register, handleSubmit, formState: { errors } } = useForm();
    let disp=useDispatch();
    let navigate=useNavigate();
    const save = (data) => {
        addUser(data)
        .then(res=>{
         disp(userIn(res.data))
        navigate("/list")
        }).catch(err=>{
            console.log(err)
            alert("שגיאה בהרשמה")
        })
    }
    return (<form noValidate onSubmit={handleSubmit(save)} style={{ margin: "50px" }}>
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


        <TextField id="outlined-basic" label="מייל" variant="outlined" type="email"
            {...register("email", {
                required: { value: true, message: " מייל חובה" },
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "מייל חייב להיות תקין" }
            })} />
        {errors.email && <div className="err-inp">{errors.email.message}</div>}

        <input type="submit" />
    </form>);
}

export default SignUp;