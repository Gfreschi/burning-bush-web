import React from 'react'
import cx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Rating from '@mui/material/Rating'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import IconButton from '@material-ui/core/IconButton'
import LocationOn from '@material-ui/icons/LocationOn'
import MoreHoriz from '@material-ui/icons/MoreHoriz'
import { useWideCardMediaStyles } from '@mui-treasury/styles/cardMedia/wide'
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded'
import { usePushingGutterStyles } from '@mui-treasury/styles/gutter/pushing'
import { Complaint } from 'src/types/DataTypes'

const useStyles = makeStyles(() => ({
  root: {
    overflow: 'initial',
    maxWidth: 304,
    backgroundColor: 'transparent',
  },
  title: {
    marginBottom: 0,
  },
  subtitle: {
    marginTop: 0,
  },
  rateValue: {
    fontWeight: 'bold',
    marginTop: 2,
    display: 'inline-block',
    alignItems: 'flex-start',
  },
  content: {
    position: 'relative',
    padding: 24,
    margin: '-24% 16px 0',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  favorite: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  locationIcon: {
    marginRight: 4,
    fontSize: 18,
  },
  dateTime: {
    marginTop: 4,
    fontSize: 12,
    color: '#b4b9be',
    display: 'block',
  },
}))

interface ComplaintCardProps {
  complaint: Complaint
}

export const ComplaintCard = React.memo(function ComplaintCard(
  props: ComplaintCardProps
): JSX.Element {
  const styles = useStyles()
  const mediaStyles = useWideCardMediaStyles()
  const shadowStyles = useFadedShadowStyles()
  const gutterStyles = usePushingGutterStyles({ firstExcluded: true })

  const complaintSample = {
    id: 1,
    details: 'DETALHES DA COMPLAINT',
    severity: 5,
    kind: 'QUEIMADA',
    latitude: 1,
    longitude: 1,
    image: 'https://picsum.photos/200/300',
    createdAt: '2021-10-10T00:00:00.000Z',
  }

  const { id, details, severity, kind, image, createdAt } = props.complaint

  return (
    <Card id={`${id}_complaint`} elevation={0} className={styles.root}>
      <CardMedia
        classes={mediaStyles}
        image={image?.url || 'https://picsum.photos/200/300'}
      />
      <CardContent className={cx(shadowStyles.root, styles.content)}>
        <Box color={'grey.500'} display={'flex'} alignItems={'center'} mb={1}>
          <LocationOn className={styles.locationIcon} />
          <span>LOCATION</span>
        </Box>

        <h2 className={styles.title}>FOGO NA PISTA</h2>
        <h3 className={styles.subtitle}>{kind}</h3>

        <Box
          display={'flex'}
          alignItems={'center'}
          mb={1}
          className={gutterStyles.parent}
        >
          <Typography variant={'body2'} className={styles.rateValue}>
            Severidade:
          </Typography>
          <Rating
            name={'rating'}
            precision={1}
            value={severity}
            size={'small'}
            icon={<LocalFireDepartmentIcon fontSize="inherit" />}
            emptyIcon={<LocalFireDepartmentIcon fontSize="inherit" />}
            readOnly
          />
        </Box>

        <Typography color={'textSecondary'} variant={'body2'}>
          {details}
        </Typography>

        <Box
          mt={2}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            className={gutterStyles.parent}
          >
            <Typography
              component={'span'}
              variant={'body2'}
              color={'textSecondary'}
              className={styles.dateTime}
            >
              {createdAt}
            </Typography>
          </Box>
          <IconButton className={styles.favorite} size={'small'}>
            <MoreHoriz />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  )
})

export default ComplaintCard
