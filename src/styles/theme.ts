import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#1b4332',
    },
    secondary: {
      main: '#40916c',
    },
    error: {
      main: red.A400,
    },
  },
})

const bnb = {
  colors: {
    primary: {
      main: '#1b4332',
    },
  },
}
export default theme
