/* eslint-disable camelcase */
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
import { CssBaseline } from '@mui/material'

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

  const enumKind = {
    1: 'Queimada',
    2: 'Desmatamento',
    3: 'Poluição',
    4: 'Outros',
  }

  const {
    id,
    details,
    severity,
    kind,
    latitude,
    longitude,
    associated_incident,
    image,
    created_at,
  } = props.complaint

  return (
    <>
      <CssBaseline />
      <Card id={`${id}_complaint`} elevation={0} className={styles.root}>
        <CardMedia
          classes={mediaStyles}
          placeholder="blur"
          image={image?.url || '/images/placeholder.png'}
        />
        <CardContent className={cx(shadowStyles.root, styles.content)}>
          <Box color={'grey.500'} display={'flex'} alignItems={'center'} mb={1}>
            <LocationOn className={styles.locationIcon} />
            <span>{latitude?.toPrecision(4)}</span>
            <span>, </span>
            <span>{longitude?.toPrecision(4)}</span>
          </Box>

          <h2 className={styles.title}>{'Queixa'}</h2>
          {associated_incident ? (
            <h3 className={styles.subtitle}>{'Associado a um incidente'}</h3>
          ) : (
            <h3 className={styles.subtitle}>{'Sem incidente associado'}</h3>
          )}

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
            Tipo: {enumKind[kind]}
          </Typography>

          <Typography color={'textSecondary'} variant={'body2'}>
            Detalhes: {details || '-'}
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
                Criado em: {created_at.split('T')[0]}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  )
})

export default ComplaintCard
