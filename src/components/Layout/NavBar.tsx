import React from 'react'
import { useRouter } from 'next/router'
import {
  makeStyles,
  Hidden,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Button,
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MapIcon from '@mui/icons-material/Map'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'
import ListAltIcon from '@mui/icons-material/ListAlt'
import InfoIcon from '@mui/icons-material/Info'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

const useStyles = makeStyles(theme => ({
  mobileDrawer: {
    width: 240,
  },
  desktopDrawer: {
    width: 240,
    top: 56,
    height: 'calc(100% - 64px)',
    borderRight: 'none',
  },
  avatar: {
    cursor: 'pointer',
    width: 24,
    height: 24,
  },
  listItem: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: theme.spacing(3),
  },
  listItemText: {
    fontSize: 14,
  },
}))

const primaryMenu = [
  {
    id: 1,
    label: 'Visita ao mapa local',
    path: '/maps/preview',
    icon: MapIcon,
  },
  {
    id: 2,
    label: 'Queixa',
    path: '/complaints/new',
    icon: AddLocationAltIcon,
  },
  {
    id: 3,
    label: 'Listar Incidentes',
    path: '/incidents',
    icon: ListAltIcon,
  },
]

const secondaryMenu = [
  { id: 1, label: 'Sobre', path: '/about', icon: InfoIcon },
  { id: 2, label: 'Apoie', path: '/help', icon: MonetizationOnIcon },
]
function NavBar() {
  const classes = useStyles()

  const router = useRouter()

  const isSelected = (item: {
    id?: number
    label?: string
    path: unknown
    icon?: OverridableComponent<SvgIconTypeMap<'svg'>> & { muiName: string }
  }) => {
    return router.pathname === item.path
  }

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <List>
        {primaryMenu.map(item => {
          const Icon = item.icon
          return (
            <ListItem
              key={item.id}
              button
              classes={{ root: classes.listItem }}
              selected={isSelected(item)}
              onClick={() => router.push(item.path)}
            >
              <ListItemIcon>
                <Icon style={{ color: isSelected(item) && '#f44336' }} />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.listItemText,
                }}
                primary={item.label}
              />
            </ListItem>
          )
        })}
      </List>

      <Divider />

      <List>
        {secondaryMenu.map(item => {
          const Icon = item.icon
          return (
            <ListItem
              key={item.id}
              button
              classes={{ root: classes.listItem }}
              selected={isSelected(item)}
              onClick={() => router.push(item.path)}
            >
              <ListItemIcon>
                <Icon style={{ color: isSelected(item) && '#f44336' }} />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.listItemText,
                }}
                primary={item.label}
              />
            </ListItem>
          )
        })}
      </List>

      <Divider />

      <Box mx={4} my={2}>
        <Typography variant="body2">
          Faça login para criar queixas e verificar incidentes
        </Typography>
        <Box mt={2}>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<AccountCircle />}
            onClick={() => router.push('sessions/sign_in')}
          >
            Fazer login
          </Button>
        </Box>
      </Box>
    </Box>
  )

  return (
    <div>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </div>
  )
}

export default NavBar
