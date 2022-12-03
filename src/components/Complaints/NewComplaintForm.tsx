import { useState } from 'react'
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
import ImageIcon from '@mui/icons-material/Image'
import CircularProgress from '@mui/material/CircularProgress'
import SendIcon from '@mui/icons-material/Send'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../styles/theme'
// importation for the useForm hook
import {
  useForm,
  SubmitHandler,
  Controller,
  useController,
} from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { api } from '../../services/api'
import { useSnackbar } from 'notistack'
import { Input } from '@mui/material'
import { Complaint } from 'src/types/DataTypes'

enum kindEnum {
  fire = 0,
  trash = 1,
  flood = 2,
  other = 3,
}

interface FormInput {
  details: string
  kind: kindEnum
  severity: number
  image: FileList
}

interface ComplaintFormProps {
  complaintCoodinate: {
    latitude: number
    longitude: number
  }
}

// Yup validation schema for form input data
// Replicated schema from the backend
const validationSchema = Yup.object().shape({
  details: Yup.string(),
  kind: Yup.string().required('Kind is required'),
  severity: Yup.number().required('Severity is required'),
  // files: Yup.array()
  //   .of(
  //     Yup.mixed()
  //       .test(
  //         'fileSize',
  //         'Arquivo muito grande',
  //         value => value && value.size <= 2000000
  //       )
  //       .test(
  //         'fileFormat',
  //         'Formato de arquivo inválido',
  //         value =>
  //           value &&
  //           ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type)
  //       )
  //   )
  //   .max(3, 'Only 3 pictures are allowed'),
})

const FileInput = ({ control, name }) => {
  const { field } = useController({ control, name })
  const [value, setValue] = useState('')
  return (
    <input
      type="file"
      value={value}
      onChange={e => {
        setValue(e.target.value)
        field.onChange(e.target.files)
      }}
    />
  )
}

export default function NewComplaintForm(
  props: ComplaintFormProps
): JSX.Element {
  const [show, setShow] = useState<boolean>(true)
  const formOptions = { resolver: yupResolver(validationSchema) }
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormInput>(formOptions)

  const { enqueueSnackbar } = useSnackbar()

  // function to call api
  async function createComplaint(complaintResquestData) {
    try {
      await api.post('/api/v1/complaints', complaintResquestData).then(() => {
        reset()
        setShow(false)
        enqueueSnackbar('Queixa criada com sucesso!', {
          variant: 'success',
        })
      })
    } catch (error) {
      enqueueSnackbar('Erro ao criar queixa!', {
        variant: 'error',
      })
    }
  }

  // handle prop as data for the form
  const onSubmit: SubmitHandler<FormInput> = async (formData: FormInput) => {
    const { details, kind, severity, image } = formData

    const { latitude, longitude } = props.complaintCoodinate

    const complaintResquestData = new FormData()

    // Form data to send to the api
    complaintResquestData.append('complaint[details]', details)
    complaintResquestData.append('complaint[kind]', kind.toString())
    complaintResquestData.append('complaint[severity]', severity.toString())
    complaintResquestData.append('complaint[longitude]', longitude.toString())
    complaintResquestData.append('complaint[latitude]', latitude.toString())
    complaintResquestData.append('complaint[image]', image[0])

    console.log(complaintResquestData)
    createComplaint(complaintResquestData)
  }

  return show ? (
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
                      defaultValue=""
                      render={({ field: { onChange, value }, formState }) => (
                        <>
                          <FormControl fullWidth>
                            <TextField
                              multiline
                              maxRows={4}
                              id="details"
                              type="text"
                              onChange={onChange}
                              value={value}
                              label={'Detalhes'}
                              error={!!formState.errors.details}
                            />
                          </FormControl>
                        </>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name={'severity'}
                      control={control}
                      defaultValue={2}
                      render={({ field: { onChange, value }, formState }) => (
                        <>
                          <FormControl
                            required
                            fullWidth
                            component={'fieldset'}
                            variant={'standard'}
                            defaultValue={2}
                            error={!!formState.errors.severity}
                          >
                            <Typography sx={{ m: 1 }} component="legend">
                              Severidade
                            </Typography>
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
                          </FormControl>
                        </>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name={'kind'}
                      control={control}
                      render={({ field: { onChange, value }, formState }) => (
                        <>
                          <FormControl sx={{ minWidth: '80px' }}>
                            <InputLabel id="kind">Tipo</InputLabel>
                            <Select
                              labelId="kind"
                              id="kind"
                              value={value ?? 0}
                              label="Tipo"
                              onChange={onChange}
                              autoWidth
                              required
                              error={!!formState.errors.kind}
                            >
                              <MenuItem value={'0'}>Queimada</MenuItem>
                              <MenuItem value={'1'}>Lixo</MenuItem>
                              <MenuItem value={'2'}>Alagamento</MenuItem>
                              <MenuItem value={'3'}>Outro</MenuItem>
                            </Select>
                          </FormControl>
                        </>
                      )}
                    />
                  </Grid>
                  {/* Input Image -> TODO: use react dropzone and refactor fileInput component */}
                  <Grid item xs={12} sx={{ mb: 1 }}>
                    <FileInput name="image" control={control} />
                  </Grid>
                </Grid>
                {/* Send Button */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  endIcon={<SendIcon />}
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Criar'
                  )}
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  ) : null
}
