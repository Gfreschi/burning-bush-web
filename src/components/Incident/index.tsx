import { makeStyles } from '@material-ui/core'
import { Avatar, Typography } from '@mui/material'
import Box from '@mui/material/Box'

const useStyle = makeStyles(() => ({
  caption: {
    fontWeight: '500',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  },
}));

function Index({ item }) {
  const classes = useStyle()
  return (
    <>
      <Box>
        <Box>
          <Avatar alt="user" src="#">
            User
          </Avatar>
        </Box>

        <Box display="flex" mt="1">
          <Box flexGrow={1}>
            <Typography variant="h6">
              <a href="#">{item.title}</a>
            </Typography>

            <Typography display="block" variant="body2" color="textSecondary">
              {item.severity}
            </Typography>

            <Typography display="block" variant="body2" color="textSecondary">
              {item.kind}
            </Typography>

            <Typography
              className={classes.caption}
              variant="body1"
              gutterBottom
              color="textPrimary"
            >
              {item.details}
            </Typography>

            <Typography display="block" variant="body2" color="textSecondary">
              {item.createdAt}
            </Typography>

            {/* <Box mt="1">
              <Typography variant="body2" color="textSecondary">
                {item.location}
              </Typography>
            </Box> */}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Index
