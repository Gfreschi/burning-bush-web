import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@mui/material/IconButton'
import NotificationsIcon from '@mui/icons-material/Notifications'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import Button from '@mui/material/Button'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Hidden from '@mui/material/Hidden'
import Badge from '@material-ui/core/Badge'
import { useRouter } from 'next/router'
import { Typography } from '@material-ui/core'

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
          <LocalFireDepartmentIcon className={classes.logo} />
          <a href="/" />
        </Box>

        <Box display="flex" alignItems="center">
          <Hidden smDown>
            <Typography variant="h4" color="textPrimary">
              Burning Bush
            </Typography>
          </Hidden>
        </Box>

        <Box display="flex">
          <IconButton
            size="large"
            aria-label="show new notifications"
            color="inherit"
            className={classes.icons}
          >
            <Badge badgeContent={1} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Button
            color="secondary"
            component="a"
            variant="outlined"
            startIcon={<AccountCircle />}
            onClick={() => router.push('/sessions/sign_in')}
          >
            Fazer Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
