import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Box} from "@mui/material";

export default function Book({book}) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-06-1-300x300.png"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {book.title}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    {book.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {book.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Box p="5px" color="white" backgroundColor={book.available ? 'lightblue' : 'lightcoral'} borderRadius="10px">{book.available ? 'available' : 'unavailable'}</Box>
            </CardActions>
        </Card>
    );
}
