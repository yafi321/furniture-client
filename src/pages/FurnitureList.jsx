import { useEffect, useState } from "react";
import { getAllfurniture, getTotalPage } from "../api/furnitureService.js";
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
    let [openedByAdd, setOpenedByAdd] = useState(false); // ניהול מצב פתיחת הסל

    useEffect(() => {
        bringPagesFromServer();
    }, []);

    useEffect(() => {
        bringFromServer(currentPage);
    }, [currentPage]);

    const bringFromServer = (page) => {
        getAllfurniture(page)
            .then(res => {
                setArr(res.data);
            })
            .catch(err => {
                console.log(err);
                alert("Product retrieval error");
            });
    };

    const bringPagesFromServer = () => {
        getTotalPage()
            .then(res => {
                setPageCnt(Number(res.data.totalPages));
            })
            .catch(err => {
                console.log(err);
                alert("totalPages retrieval error");
            });
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <div>
            {/* <div>רשימת הרהיטים</div> */}
            <Stack spacing={2} alignItems="center" sx={{margin: "10px"}}>
                <Pagination
                    count={pageCnt}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="secondary"
                />
            </Stack>
            {/* שליחת הפונקציה ל-MiniCart ול-OneFurniture */}
            <MiniCart openedByAdd={openedByAdd} setOpenedByAdd={setOpenedByAdd} />
            <Container>
                <Grid container spacing={3}>
                    {arr.map((item) => (
                        <Grid item xs={12} sm={6} md={3} key={item.id}>
                            <OneFurniture item={item} bringFromServer={bringFromServer} setOpenedByAdd={setOpenedByAdd} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Stack spacing={2} alignItems="center" sx={{margin: "10px"}}>
                <Pagination
                    count={pageCnt}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="secondary"
                />
            </Stack>
        </div>
    );
}

export default FurnitureList;
