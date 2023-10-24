import {
  Avatar,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { Controller, useForm } from 'react-hook-form'

interface FileInputProps {
  name: string
  label: string
  mode: string
  accept: string
  maxFiles: 1
  maxFileSize: 1000000
  value: File[]
  control: ReturnType<typeof useForm>['control']
  error: string
}

// TODO: REFACTOR THIS COMPONENT AND USE IN THE CREATE COMPLAINT FORM
export default function FileInput(props: FileInputProps) {
  const { name, label = name, mode = 'update' } = props

  const { control } = props
  const { register, unregister } = control

  const {
    setValue,
    watch,
    formState: { errors },
  } = useForm()

  const files = watch(name)

  const onDrop = useCallback(
    droppedFiles => {
      let newFiles =
        mode === 'update' ? droppedFiles : [...(files || []), ...droppedFiles]
      if (mode === 'append') {
        newFiles = newFiles.reduce((prev, file) => {
          const fo = Object.entries(file)
          if (
            prev.find(e => {
              const eo = Object.entries(e)
              return eo.every(
                ([key, value], index) =>
                  key === fo[index][0] && value === fo[index][1]
              )
            })
          ) {
            return prev
          } else {
            return [...prev, file]
          }
        }, [])
      }
      setValue(name, newFiles, { shouldValidate: true })
    },
    [setValue, name, mode, files]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: props.accept,
    maxFiles: props.maxFiles,
    maxSize: props.maxFileSize,
  })

  useEffect(() => {
    register(name)
    return () => unregister(name)
  }, [register, unregister, name])

  return (
    // Material UI component for file input
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id={name} />
            {/* getRootProps and getInputProps are used to make the component a dropzone */}
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <TextField
                  label={label}
                  variant="outlined"
                  value="Solte os arquivos aqui..."
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <AddIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={!!props.error}
                  helperText={props.error}
                />
              ) : (
                <Button variant="contained" component="span">
                  Upload
                </Button>
              )}
            </div>

            <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            >
              {!!files?.length &&
                files.map((file, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar>
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          style={{ width: '100px', height: '100px' }}
                        />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={file.name}
                      secondary={file.size + ' bytes'}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => {
                          const newFiles = files.filter((_, i) => i !== index)
                          setValue(name, newFiles, { shouldValidate: true })
                        }}
                      >
                        x
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
            </List>
          </FormControl>
        )}
      />
    </>
  )
}
