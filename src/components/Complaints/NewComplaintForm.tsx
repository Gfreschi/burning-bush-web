import * as React from 'react'
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
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../styles/theme'
// importation for the useForm hook
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

enum kindEnum {
  fire = 'fire',
  trash = 'trash',
  flood = 'flood',
  other = 'other',
}

interface FormInput {
  details: string
  kind: kindEnum
  severity: number
  latitude: number
  longitude: number
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

export default function NewComplaintForm() {
  // hook form validation
  const formOptions = { resolver: yupResolver(validationSchema) }

  const { control, handleSubmit } = useForm<FormInput>(formOptions)
  const onSubmit: SubmitHandler<FormInput> = async data => {
    console.log(data)
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid
          container
          component="main"
          sx={{
            height: '100vh',
            width: '32vw',
            float: 'right',
          }}
        >
          <CssBaseline />
          <Container>
            <Typography variant="h4">Crie uma nova queixa</Typography>
          </Container>
          <Box sx={{ m: 3 }}>
            <Grid container spacing={2} alignContent="center">
              <Grid item xs={12} wrap="nowrap">
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
              <Grid item xs={6}>
                <Typography component="legend">Severidade</Typography>
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
                      emptyIcon={<LocalFireDepartmentIcon fontSize="inherit" />}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name={'kind'}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <InputLabel id="kind">Tipo</InputLabel>
                      <Select
                        labelId="kind"
                        id="kind"
                        value={value}
                        label="Tipo"
                        onChange={onChange}
                      >
                        <MenuItem value={1}>Queimada</MenuItem>
                        <MenuItem value={2}>Lixo</MenuItem>
                      </Select>
                    </>
                  )}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit(onSubmit)}
            >
              Criar
            </Button>
          </Box>
        </Grid>
      </ThemeProvider>
    </>
  )
}
