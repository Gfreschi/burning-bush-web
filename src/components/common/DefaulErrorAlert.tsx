import { useSnackbar } from 'notistack'

interface ErrorProps {
  error: Error
}

export default function DefaultErrorAlert({ error }: ErrorProps) {
  const { message } = error

  const { enqueueSnackbar } = useSnackbar()

  enqueueSnackbar(message, {
    variant: 'error',
  })
}
