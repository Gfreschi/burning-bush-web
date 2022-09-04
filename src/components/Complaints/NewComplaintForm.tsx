import { useContext } from 'react'
import FormControl from '@mui/material/FormControl'
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
import { FormLabel } from '@material-ui/core'

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
}

interface Complaint {
  details: string
  severity: number
  kind: number
  longitude: number
  latitude: number
}

// Yup validation schema for form input data
// Replicated schema from the backend
const validationSchema = Yup.object().shape({
  details: Yup.string().required('Details is required'),
  kind: Yup.string().required('Kind is required'),
  severity: Yup.number().required('Severity is required'),
})

export default function NewComplaintForm({
  longitudeProp,
  latitudeProp,
}: {
  longitudeProp: number
  latitudeProp: number
}) {
  // hook form validation
  const formOptions = { resolver: yupResolver(validationSchema) }

  const { control, handleSubmit } = useForm<FormInput>(formOptions)

  async function createComplaint({
    details,
    kind,
    severity,
    longitude,
    latitude,
  }: Complaint) {
    try {
      const response = await api.post(
        '/api/v1/complaints',
        JSON.stringify({
          details: details,
          kind: kind,
          severity: severity,
          longitude: latitudeProp,
          latitude: longitudeProp,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (response?.data.status === '200') {
        alert('Successfully created complaint')
      }
    } catch (error) {
      alert('Error creating complaint')
      console.log(error.response) // response error data
      return error.response
    }
  }

  // handle prop as data for the form
  const onSubmit: SubmitHandler<FormInput> = async (formData: FormInput) => {
    console.log(formData)
    console.log(longitudeProp)
    console.log(latitudeProp)
    createComplaint({
      details: formData.details,
      severity: formData.severity,
      kind: formData.kind,
      longitude: longitudeProp,
      latitude: latitudeProp,
    })
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
                    <FormControl fullWidth>
                      <Controller
                        name={'details'}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <TextField
                            multiline
                            maxRows={4}
                            id="details"
                            type="text"
                            onChange={onChange}
                            value={value}
                            label={'Detalhes'}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl>
                      <Typography sx={{ m: 1 }} component="legend">
                        Severidade
                      </Typography>
                      <Controller
                        name={'severity'}
                        control={control}
                        defaultValue={2}
                        render={({ field: { onChange, value } }) => (
                          <Rating
                            name="severity"
                            size="large"
                            precision={1}
                            max={5}
                            icon={
                              <LocalFireDepartmentIcon fontSize="inherit" />
                            }
                            emptyIcon={
                              <LocalFireDepartmentIcon fontSize="inherit" />
                            }
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl>
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
                    </FormControl>
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
