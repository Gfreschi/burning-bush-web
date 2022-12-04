import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#317a36',
    },
    secondary: {
      main: '#431e1b',
    },
    error: {
      main: red.A400,
    },
  },
})

const bnb = {
  colors: {
    primary: {
      main: '#317a36',
    },
  },
}
export default theme
