import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import './App.css';

function ResponsiveAppBar() {
  const [accountAddress, setAccountAddress] = React.useState('');

  return (
    <AppBar position="static" style={{overflow:"hidden"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div className='navbar_flex'>
            <Typography 
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            class="bi bi-bank bankIcon">

            </Typography>
            <div className="nav_bar_flex">
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
                className="bank_name"
              >
                Decentral Bank (Yield Staking App)
              </Typography>

              <Typography
                sx={{
                  mr: 2,
                  fontFamily: 'monospace',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
                className="account_address"
              >
                Account Address: {accountAddress}
              </Typography>
            </div>      
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
