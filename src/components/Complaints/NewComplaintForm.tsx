import * as React from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
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

interface IFormInput {
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
  severity: Yup.number().required('Required'),
  latitude: Yup.number().required('Required'),
  longitude: Yup.number().required('Required'),
})

export default function NewComplaintForm() {
  // hook form validation
  const formOptions = { resolver: yupResolver(validationSchema) }

  const { control, register, handleSubmit } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = async data => {
    console.log(data)
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundColor: t =>
                t.palette.mode === 'light'
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name={'details'}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        id="details"
                        type="text"
                        onChange={onChange}
                        value={value}
                        label={'Detalhes'}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
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
                  <Typography component="legend">Severidade</Typography>
                  <Controller
                    name={'severity'}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Rating
                        name="severity"
                        size="large"
                        defaultValue={2}
                        precision={1}
                        icon={<LocalFireDepartmentIcon fontSize="inherit" />}
                        emptyIcon={
                          <LocalFireDepartmentIcon fontSize="inherit" />
                        }
                        max={5}
                        value={value}
                        onChange={onChange}
                      />
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
        </Grid>
      </ThemeProvider>
    </>
  )
}
