import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../../global/components/Header';
import MainFeaturedPost from '../../global/components/MainFeaturedPost';
import FeaturedPost from '../../global/components/FeaturedPost';
import Main from '../../global/components/Main';
import Sidebar from '../../global/components/Sidebar';
import Footer from '../../global/components/Footer';
import post1 from '../../global/components/blog-post.1.md';
import post2 from '../../global/components/blog-post.1.md';
import post3 from '../../global/components/blog-post.1.md';
import {useEffect, useState} from "react";
import { getBooks } from "../../../api/books";

const sections = [
    { title: 'Technology', url: '#' },
    { title: 'Design', url: '#' },
    { title: 'Culture', url: '#' },
    { title: 'Business', url: '#' },
    { title: 'Politics', url: '#' },
    { title: 'Opinion', url: '#' },
    { title: 'Science', url: '#' },
    { title: 'Health', url: '#' },
    { title: 'Style', url: '#' },
    { title: 'Travel', url: '#' },
];

const mainFeaturedPost = {
    title: 'Title of a longer featured blog post',
    description:
        "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imageText: 'main image description',
    linkText: 'Continue reading…',
};

const theme = createTheme();

export default function Home({ user, setUser }) {
    debugger
    const [books, setBooks] = useState([])

    useEffect(() => {
        getBooks().then((response) => {
            setBooks(response.data)
        })
    }, [])


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="Blog" sections={sections} setUser={setUser} user={user}/>
                <main>
                    {books.map((book) => {
                        return JSON.stringify(book)
                    })}
                </main>
            </Container>
            <Footer
                title="Footer"
                description="Something here to give the footer a purpose!"
            />
        </ThemeProvider>
    );
}