import * as React from 'react'
import { Link } from 'react-router-dom'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import AmazonIcon from '../../assets/Amazon_icon.png'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'

const tables = [
    {
        name: 'Accounts',
        link: '/',
    },
    {
        name: 'Campaigns',
        link: '/accounts/:accountId/campaigns',
    },
    {
        name: 'Profiles',
        link: '/accounts/:accountId/profiles',
    },
]

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    )

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    return (
        <AppBar position='static'>
            <Container sx={{ maxWidth: '100%' }} maxWidth={false}>
                <Toolbar disableGutters sx={{ paddingLeft: 2, alignItems: 'center' }}>
                    <Link
                        to={'https://agencyamazon.com/'}
                        style={{ textDecoration: 'none' }}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <img src={AmazonIcon} width={60} height={50} alt='Amazon Icon' />
                    </Link>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none', xl: 'flex' },
                            justifyContent: 'space-around',
                        }}
                    >
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleOpenNavMenu}
                            color='inherit'
                        ></IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {tables.map(table => (
                                <MenuItem key={table.name} onClick={handleCloseNavMenu}>
                                    <Typography textAlign='center'>{table.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'flex' },
                            justifyContent: 'space-around',
                        }}
                    >
                        {tables.map(table => (
                            <Link
                                key={table.name}
                                to={table.link}
                                style={{ textDecoration: 'none' }}
                            >
                                <Button
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    onClick={handleCloseNavMenu}
                                >
                                    {table.name}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default ResponsiveAppBar
