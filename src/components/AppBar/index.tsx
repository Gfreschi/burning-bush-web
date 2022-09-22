import * as React from 'react'
import Head from 'next/head'
import NavBar from './NavBar'

function AppBar({ children, title }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={classes.root}>
        <NavBar />
        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AppBar

// const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${theme.drawerWidth}px`,
//     ...(open && {
//       transition: theme.transitions.create('margin', {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   })
// )

// const Root = styled('div')(({theme})) = ({
//   root: {
//     backgroundColor: theme.palette.background.dark,
//     display: 'flex',
//     height: '100vh',
//     overflow: 'hidden',
//     width: '100vw',
//   },
//   wrapper: {
//     display: 'flex',
//     flex: '1 1 auto',
//     overflow: 'hidden',
//     paddingTop: 64,
//     [theme.breakpoints.up('lg')]: {
//       paddingLeft: 256,
//     },
//   },
//   contentContainer: {
//     display: 'flex',
//     flex: '1 1 auto',
//     overflow: 'hidden',
//   },
//   content: {
//     flex: '1 1 auto',
//     height: '100%',
//     overflow: 'auto',
//   },
// }))
