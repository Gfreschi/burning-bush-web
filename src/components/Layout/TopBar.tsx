import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import MenuIcon from '@material-ui/icons/Menu'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsIcon from '@mui/icons-material/Notifications'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import Button from '@mui/material/Button'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { Hidden } from '@mui/material'
import Badge from '@material-ui/core/Badge'
import { useRouter } from 'next/router'

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.default,
  },
  toolbar: {
    minHeight: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    cursor: 'pointer',
    height: 32,
    width: 32,
    marginLeft: theme.spacing(3),
  },
  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    height: 35,
    width: 700,
  },
  input: {
    flex: 1,
  },
  icons: {
    paddingRight: theme.spacing(2),
  },
}))

function TopBar() {
  const classes = useStyles()

  const router = useRouter()

  return (
    <AppBar className={classes.root} color="default">
      <Toolbar className={classes.toolbar}>
        <Box display="flex" alignItems="center">
          <MenuIcon />
          <img src="#" alt="logo" className={classes.logo} />
        </Box>

        <Hidden mdDown>
          <Box>
            <Paper component="form" className={classes.search}>
              <InputBase
                className={classes.input}
                placeholder="Pesquisar"
                inputProps={{ 'aria-label': 'search google maps' }}
              />
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Box>
        </Hidden>

        <Box display="flex">
          <IconButton
            size="large"
            aria-label="show new notifications"
            color="inherit"
          >
            <Badge badgeContent={1} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton className={classes.icons}>
            <LocalFireDepartmentIcon />
          </IconButton>

          <Button
            color="secondary"
            component="a"
            variant="outlined"
            startIcon={<AccountCircle />}
            onClick={() => router.push('sessions/login')}
          >
            Fazer Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
