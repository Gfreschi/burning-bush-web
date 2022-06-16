import { makeStyles } from '@material-ui/core'
import { Avatar, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Image from 'next/image'
import { useRouter } from 'next/router'

const useStyles = makeStyles(() => ({
  img: {
    width: '100%',
  },
  caption: {
    fontWeight: 500,
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  },
}))

function Index({ item }) {
  const classes = useStyles()
  const router = useRouter()

  return (
    <>
      <Box>
        <Image
          src="/../../../public/fogoMato.jpeg"
          width={500}
          height={300}
          alt={item.title}
          className={classes.img}
          layout="intrinsic"
          onClick={() =>
            router.push({
              pathname: '/incident/[id]',
              query: { id: item._id },
            })
          }
        />
      </Box>

      <Box display="flex" mt="1">
        <Box mr={2}>
          <Avatar alt="user" src="#">
            User
          </Avatar>
        </Box>

        <Box>
          <Box>
            <Typography
              className={classes.caption}
              gutterBottom
              variant="body1"
              color="textPrimary"
            >
              {item.title}
            </Typography>

            <Typography display="block" variant="body2" color="textSecondary">
              {item.severity}
            </Typography>

            <Typography display="block" variant="body2" color="textSecondary">
              {item.kind}
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
