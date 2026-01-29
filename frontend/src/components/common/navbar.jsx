import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from "react-router-dom";
import Link from '@mui/material/Link';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { logoutUser } from '../../features/auth/authApi';
import { toast } from 'react-toastify';

export default function MyAppNav() {
  const { loading, error, isAuthenticated,user } = useSelector((s) => s.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch =  useDispatch();
  const navigate = useNavigate();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
    toast.dark('Logged Out Successfuly', {
          position: 'bottom-right',
        });
  };


  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link  href="/" color="inherit" underline="none" sx={{flexGrow: 1  }} >
          <Typography variant="h6" component="div" >
            Money Tracker
          </Typography>
          </Link>
          {!user ? (
            <>
          <Link 
            href="/register" 
            color="inherit"
            underline="none"
            sx={{ m: 1 }}
            >
            Sign Up
          </Link>
          <Link  href="/login" color="inherit" underline="none" sx={{ m: 1 }} >
            Login
          </Link>
          </>
          ) : <>
          <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {/* <MenuItem onClick={handleClose}><Link href="/profile" color="inherit" underline='none' >Profile</Link></MenuItem> */}
                <MenuItem onClick={handleClose}><Link component={RouterLink} to="/profile" underline="none" color="inherit"  >Profile  </Link></MenuItem>
                <MenuItem onClick={handleClose}><Link component={RouterLink} to="/my-account" color="inherit" underline='none' >My account</Link></MenuItem>
                <MenuItem onClick={handleClose}><button onClick={handleLogout}>Logout</button></MenuItem>
              </Menu>
            </div>
          
          </>}
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
