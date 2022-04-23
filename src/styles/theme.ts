import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#7c8046',
    },
    secondary: {
      main: '#d18129',
    },
    error: {
      main: red.A400,
    },
  },
})

const landing = {
  colors: {},
}
export default theme
