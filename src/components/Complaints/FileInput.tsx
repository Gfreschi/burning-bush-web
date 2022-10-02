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
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

interface FileInputProps {
  name: string
  label: string
  mode: string
  accept: string
  maxFiles: number
  maxFileSize: number
  value: File[]
  onChange: (files: File[]) => void
  register: ReturnType<typeof useForm>['register']
  control: ReturnType<typeof useForm>['control']
  error: string
}

export default function FileInput(props: FileInputProps) {
  const { name, label = name, mode = 'update' } = props

  const {
    register,
    unregister,
    setValue,
    watch,
    formState: { errors },
  } = useForm()

  // const {
  //   _formValues,
  //   register,
  //   unregister,
  //   _getWatch: watch,
  //   _formState: { errors },
  // } = props.control

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
  })

  useEffect(() => {
    register(name)
    console.log(props.control._formValues)
    return () => {
      unregister(name)
    }
  }, [register, unregister, name])

  return (
    // Material UI component for file input
    <>
      <Controller
        name={name}
        control={props.control}
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

// return (
//   <div style={{ padding: '100px' }}>
//     <label
//       className="block text-gray-700 text-sm font-bold mb-2 capitalize"
//       htmlFor={name}
//     >
//       {label}
//     </label>

//     <div {...getRootProps()}>
//       <input
//         {...props}
//         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         id={name}
//         {...getInputProps()}
//       />

//       <div
//         className={
//           'w-full p-2 border border-dashed border-gray-900 ' +
//           (isDragActive ? 'bg-gray-400' : 'bg-gray-200')
//         }
//       >
//         <p className="text-center my-2">Drop the files here ...</p>
//         {!!files?.length && (
//           <div className="grid gap-1 grid-cols-4 mt-2">
//             {files.map(file => {
//               return (
//                 <div key={file.name}>
//                   <img
//                     src={URL.createObjectURL(file)}
//                     alt={file.name}
//                     style={{ width: '100px', height: '100px' }}
//                   />
//                 </div>
//               )
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   </div>
// )
