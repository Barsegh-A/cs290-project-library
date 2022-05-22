import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../../global/components/Header';
import {useEffect, useState} from "react";
import { getBooks } from "../../../api/books";
import Book from "../components/Book";
import {Box} from "@mui/material";

const theme = createTheme();

export default function Home({ user, setUser }) {
    const [books, setBooks] = useState([])

    useEffect(() => {
        return () => {
            getBooks().then((response) => {
                setBooks(response.data)
            })
        }
    }, [])


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title={`Hi ${user.firstName}`} setUser={setUser} user={user}/>
                <main>
                    <Box mt="15px">
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {books.map((book) => (
                                <Grid item xs={2} sm={4} md={4} key={book._id}>
                                    <Book book={book} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </main>
            </Container>
        </ThemeProvider>
    );
}