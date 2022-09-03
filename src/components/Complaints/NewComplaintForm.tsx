import { useContext } from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import Paper from '@mui/material/Paper'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import SendIcon from '@mui/icons-material/Send'
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../styles/theme'
// importation for the useForm hook
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { api } from '../../services/api'
import { Router } from 'next/router'

enum kindEnum {
  fire = 1,
  trash = 2,
  flood = 3,
  other = 4,
}

interface FormInput {
  details: string
  kind: kindEnum
  severity: number
  longitude: number
  latitude: number
}

// Yup validation schema for form input data
// Replicated schema from the backend
const validationSchema = Yup.object().shape({
  details: Yup.string().required('Details is required'),
  kind: Yup.string().required('Kind is required'),
  severity: Yup.number().required('Severity is required'),
  latitude: Yup.number().required('Latitude is required'),
  longitude: Yup.number().required('Longitude is required'),
})

export default function NewComplaintForm({
  longitude,
  latitude,
}: {
  longitude: number
  latitude: number
}) {
  // hook form validation
  const formOptions = { resolver: yupResolver(validationSchema) }

  const { control, handleSubmit } = useForm<FormInput>(formOptions)

  async function createComplaint({
    details,
    kind,
    severity,
    latitude,
    longitude,
  }: FormInput) {
    try {
      const response = await api.post(
        '/api/v1/complaints',
        JSON.stringify({
          details: details,
          kind: kind,
          severity: severity,
          latitude: latitude,
          longitude: longitude,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      console.log(response)
      if (response?.data.status === '200') {
        alert('Successfully created complaint')

        // Router.push('/maps/preview')

        console.log(response)
      }
    } catch (error) {
      console.log(error.response) // response error data
      return error.response
    }
  }

  const onSubmit: SubmitHandler<FormInput> = async data => {
    console.log(data)
    createComplaint(data)
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            position: 'absolute',
            float: 'right',
            right: 0,
            top: 64,
            zIndex: 1,
            borderRadius: 2,
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            padding={2}
          >
            <Paper elevation={3} sx={{ borderRadius: 2 }}>
              <CssBaseline />
              <Container>
                <Typography sx={{ p: 2 }} variant="h4">
                  Crie uma nova queixa
                </Typography>
              </Container>
              <Box sx={{ m: 2, padding: 1 }}>
                <Grid container spacing={2} alignContent="center">
                  <Grid item xs={12}>
                    <Controller
                      name={'details'}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          fullWidth
                          id="details"
                          type="text"
                          onChange={onChange}
                          value={value}
                          label={'Detalhes'}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name={'latitude'}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          fullWidth
                          id="latitude"
                          type="number"
                          onChange={onChange}
                          value={value}
                          label={'Latitude'}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name={'longitude'}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          fullWidth
                          id="longitude"
                          type="number"
                          onChange={onChange}
                          value={value}
                          label={'Longitude'}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={{ m: 1 }} component="legend">
                      Severidade
                    </Typography>
                    <Controller
                      name={'severity'}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Rating
                          name="severity"
                          size="large"
                          defaultValue={value ?? 2}
                          precision={1}
                          max={5}
                          icon={<LocalFireDepartmentIcon fontSize="inherit" />}
                          emptyIcon={
                            <LocalFireDepartmentIcon fontSize="inherit" />
                          }
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name={'kind'}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <>
                          <InputLabel id="kind">Tipo</InputLabel>
                          <Select
                            sx={{ minWidth: '30%' }}
                            labelId="kind"
                            id="kind"
                            value={value ?? kindEnum.other}
                            label="Tipo"
                            onChange={onChange}
                            autoWidth
                          >
                            <MenuItem value={1}>Queimada</MenuItem>
                            <MenuItem value={2}>Lixo</MenuItem>
                            <MenuItem value={3}>Alagamento</MenuItem>
                            <MenuItem value={4}>Outro</MenuItem>
                          </Select>
                        </>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ mb: 1 }}>
                    <Button
                      variant="contained"
                      component="label"
                      endIcon={<AddPhotoAlternateRoundedIcon />}
                    >
                      Insira fotos aqui...
                      <input type="file" hidden />
                    </Button>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmit(onSubmit)}
                  endIcon={<SendIcon />}
                >
                  Criar
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  )
}
