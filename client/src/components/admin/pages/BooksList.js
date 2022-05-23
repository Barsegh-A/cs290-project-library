import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Header from "../../global/components/Header";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import * as React from "react";
import {useEffect, useState} from "react";
import {createBook, deleteBook, getBooks, updateBook} from "../../../api/books";
import {
    Box,
    FormControlLabel,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {Checkbox} from "@mui/material";

const theme = createTheme();

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function BooksList({  user, setUser }) {
    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState({})
    const [openCreateUpdate, setOpenCreateUpdate] = useState(false)
    const [open, setOpen] = useState(false);


    useEffect(() => {
        return () => {
            getBooks().then((response) => {
                setBooks(response.data)
            })
        }
    }, [])

    const deleteSelectedBook = () => {
        deleteBook(selectedBook._id).then(() => {
            const booksCopy = [...books]
            const deletedIndex = books.findIndex((book) => book.id === selectedBook.id)
            if (deletedIndex !== -1) {
                booksCopy.splice(deletedIndex, 1)
            }
            setOpen(false)
            setSelectedBook({})
            setBooks(booksCopy)
        })
    }

    const handleOpen = (row) => {
        setSelectedBook(row)
        setOpen(true)
    }

    const handleClose = () => {
        setSelectedBook({})
        setOpen(false)
    }

    const handleOpenCreateUpdateBook = (row = {}) => {
        setSelectedBook(row)
        setOpenCreateUpdate(true)
    }

    const handleCloseCreateUpdateBook = () => {
        setSelectedBook({})
        setOpenCreateUpdate(false)
    }

    const createUpdateBook = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (!selectedBook._id) {
            createBook({
                title: data.get('title'),
                author: data.get('author'),
                description: data.get('description'),
                category: data.get('category'),
                available: data.get('available') === 'available',
            }).then((response) => {
                const booksCopy = [...books]
                booksCopy.push(response.data.book)
                setOpenCreateUpdate(false)
                setSelectedBook({})
                setBooks(booksCopy)
            })
            .catch(() => {
                alert('Something went wrong')
            })
        } else {
            updateBook(selectedBook, selectedBook._id).then((response) => {
                const booksCopy = [...books]
                const bookIndex = books.findIndex((book) => book.id === selectedBook.id)
                if (bookIndex !== -1) {
                    booksCopy[bookIndex] = response.data
                }
                setOpenCreateUpdate(false)
                setSelectedBook({})
                setBooks(booksCopy)
            })
                .catch(() => {
                    alert('Something went wrong')
                })
        }
    }

    const inputChanges = (event) => {
        setSelectedBook({
            ...selectedBook,
            [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title={`Hi ${user.firstName}`} setUser={setUser} user={user}/>
                <Button  variant="outlined" onClick={handleOpenCreateUpdateBook}>create</Button>
                <main>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Are you sure you want to delete this book?
                            </Typography>
                            <Box mt={2} display="flex" justifyContent="flex-end">
                                <Box>
                                    <Button onClick={handleClose}>Cancel</Button>
                                </Box>
                                <Box  ml={2}>
                                    <Button  variant="outlined"  onClick={deleteSelectedBook}>Delete</Button>
                                </Box>
                            </Box>
                        </Box>

                    </Modal>

                    <Modal
                        open={openCreateUpdate}
                        onClose={handleCloseCreateUpdateBook}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            {selectedBook._id ? 'Update' : 'Create'} book
                            <Box component="form" noValidate onSubmit={createUpdateBook} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="title"
                                            required
                                            fullWidth
                                            value={selectedBook.title}
                                            onChange={inputChanges}
                                            id="title"
                                            label="Title"
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="author"
                                            label="Author"
                                            name="author"
                                            value={selectedBook.author}
                                            onChange={inputChanges}
                                            autoComplete="family-name"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="category"
                                            required
                                            fullWidth
                                            id="category"
                                            value={selectedBook.category}
                                            onChange={inputChanges}
                                            label="Category"
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="description"
                                            label="description"
                                            value={selectedBook.description}
                                            onChange={inputChanges}
                                            type="description"
                                            id="description"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>

                                        <input
                                            type="checkbox"
                                            name="available"
                                            id="available"
                                            checked={selectedBook.available}
                                            onChange={inputChanges}
                                        />
                                        Available
                                    </Grid>
                                </Grid>

                                <Box mt={2} display="flex" justifyContent="flex-end">
                                    <Box>
                                        <Button type="submit"  variant="contained">{selectedBook._id ? 'Update' : 'Create'}</Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Modal>





                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell align="right">Author</TableCell>
                                    <TableCell align="right">Category</TableCell>
                                    <TableCell align="right">Description</TableCell>
                                    <TableCell align="right">Availability</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {books.map((row) => (
                                    <TableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.title}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.author}
                                        </TableCell>
                                        <TableCell align="right">{row.category}</TableCell>
                                        <TableCell align="right">{row.description}</TableCell>
                                        <TableCell align="right">
                                            <Box p="5px" display="inline" color="white" backgroundColor={row.available ? 'lightblue' : 'lightcoral'} borderRadius="10px">
                                                {row.available ? 'available' : 'unavailable'}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleOpen(row)}>Delete</Button>
                                            <Button variant="outlined" onClick={() => handleOpenCreateUpdateBook(row)}>Edit</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </main>
            </Container>
        </ThemeProvider>
    )
}

export default BooksList