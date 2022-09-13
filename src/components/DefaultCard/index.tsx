import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { Box, Container } from '@mui/material'

const useStyles = muiBaseTheme => ({
  card: {
    maxWidth: 300,
    margin: 'auto',
    transition: '0.3s',
    boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
    '&:hover': {
      boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
    },
  },
  media: {
    paddingTop: '56.25%',
  },
  content: {
    textAlign: 'left',
    padding: muiBaseTheme.spacing.unit * 3,
  },
  divider: {
    margin: `${muiBaseTheme.spacing.unit * 3}px 0`,
  },
  caption: {
    fontWeight: 500,
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  },
  heading: {
    fontWeight: 'bold',
  },
  subheading: {
    lineHeight: 1.8,
  },
  avatar: {
    display: 'inline-block',
    border: '2px solid white',
    '&:not(:first-of-type)': {
      marginLeft: -muiBaseTheme.spacing.unit,
    },
  },
})

export default function DefaultCard({ classes, item }): JSX.Element {
  classes = useStyles

  return (
    <>
      <div className="DefaultCard" id={item.id}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={
              'https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg'
            }
          />
          <CardContent className={classes.content}>
            <Typography
              className={'MuiTypography--heading'}
              variant={'h6'}
              gutterBottom
            >
              {item.title}
            </Typography>

            <Typography
              className={'MuiTypography--subheading'}
              variant={'caption'}
            >
              {item.details}
            </Typography>

            <Divider className={classes.divider} light />

            <Box display="flex">
              <Container
                className={classes.content}
                sx={{
                  display: 'flex-inline',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  '& > :not(style)': {
                    m: 1,
                  },
                }}
              >
                <Typography
                  display="block"
                  variant="body2"
                  color="textSecondary"
                >
                  {item.severity}
                </Typography>

                <Typography
                  display="block"
                  variant="body2"
                  color="textSecondary"
                >
                  {item.kind}
                </Typography>

                <Typography
                  display="block"
                  variant="body2"
                  color="textSecondary"
                >
                  {item.createdAt}
                </Typography>
              </Container>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  '& > :not(style)': {
                    m: 1,
                  },
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                  className={classes.avatar}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
