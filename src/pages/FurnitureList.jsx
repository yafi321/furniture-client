import { useEffect, useState } from "react";
import { getAllfurniture, getTotalPage } from "../api/furnitureService.js"
// import { useDispatch } from "react-redux"
// import { addToCart } from "../featurs/cartSlice.js";
import OneFurniture from "./OneFurniture.jsx";
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { Grid, Container } from '@mui/material';
import Stack from '@mui/material/Stack';
import MiniCart from "../components/MiniCart.jsx";


const FurnitureList = () => {
    let [arr, setArr] = useState([]);
    let [pageCnt, setPageCnt] = useState(1);
    let [currentPage, setCurrentPage] = useState(1);
    // let [loading, setLoading] = useState(false);
    // let dispatch = useDispatch();

    useEffect(() => {
        bringPagesFromServer()
    }, [])


    useEffect(() => {
        bringFromServer(currentPage)
    }, [currentPage ])

    const bringFromServer = (page) => {
        getAllfurniture(page)
            .then(res => {
                setArr(res.data);
                // למחוק הדפסות לקונסול
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
                alert("Product retrieval error")
            })
    }

    const bringPagesFromServer = () => {
        getTotalPage()
            .then(res => {
                setPageCnt(Number(res.data.totalPages));
                // למחוק הדפסות לקונסול
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
                alert("totalPages retrieval error")
            })
    }
    const handlePageChange = (event, value) => {
        // למחוק הדפסות לקונסול
        console.log("valur: "+value)
        setCurrentPage(value);

        // כאן תוכל להוסיף לוגיקה נוספת כמו טעינת נתונים לעמוד החדש
    };

    // const handleReload = () => {
    //     setLoading(true); // מפעיל את ה-useEffect מחדש
    // };

    // let buttons = [];
    // for (let i = 1; i < pageCnt + 1; i++) {

    //     buttons.push(<input key={i} className={i == currentPage ? "active" : ""} type="button" value={i} onClick={() => {
    //         setCurrentPage(i)
    //     }}></input>)
    // }

    // console.log("arr" + arr);

    return (
        <div>
            רשימת הרהיטים
            <Stack spacing={2} alignItems="center">
                <Pagination
                    count={pageCnt}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                // variant="outlined"
                // shape="circular"
                />
            </Stack>
            <MiniCart/>
            <Container>
                <Grid container spacing={3}>
                    {arr.map((item) => (
                        <Grid item xs={12} sm={6} md={3}  key={item.id}>
                            <OneFurniture item={item} bringFromServer={bringFromServer}/>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* <ul style={{ listStyle: "none" }}>
                {arr.map(item => <li key={item._id} >
                    <OneFurniture item={item} /> */}

                    {/* <input type="button" value="🛒" onClick={()=>{
                    dispatch(addToCart(item))
                }}>
                </input>
                <img src={"images/"+item.url}/> */}
                {/* </li>)} */}
            {/* </ul> */}
        </div>
    );
}

export default FurnitureList;