import * as React from 'react';
import Box from "@mui/material/Box";
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import {Link, Typography, IconButton} from "@mui/material";

function Header(props) {
    const { title, setUser, user } = props;
    const navigate = useNavigate()

    const signOut = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('access_token')
        setUser({
            token: '',
            user: {}
        })
        navigate('/')
    }

    const manageBooks = () => {
        navigate('/book/list')
    }

    return (
        <React.Fragment>
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Link to="/home">
                    <Link to="/">Home</Link>
                </Link>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{ flex: 1 }}
                >
                    {title}
                </Typography>
                <IconButton>
                    <></>
                </IconButton>
                {user.role === 'admin' ?
                    <Box mr={2}>
                        <Button variant="outlined" size="small" onClick={manageBooks}>
                            manage
                        </Button>
                    </Box> : null
                }


                <Button variant="outlined" size="small" onClick={signOut}>
                    Sign out
                </Button>
            </Toolbar>
        </React.Fragment>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Header;