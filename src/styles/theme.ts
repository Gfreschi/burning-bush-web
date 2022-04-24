import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#006400',
    },
    secondary: {
      main: '#b81414',
    },
    error: {
      main: red.A400,
    },
  },
})

const bnb = {
  colors: {
    primary: {
      main: '#006400',
    },
  },
}
export default theme
