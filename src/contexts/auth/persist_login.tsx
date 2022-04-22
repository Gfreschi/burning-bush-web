import { Outlet } from '@mui/icons-material';
import React, { useEffect } from 'react'


function PersistLogin() {
  const loading = false
  const accessToken = false
  const refreshToken = null
  //const dispatch = useDispatch();

  useEffect(() => {
    function verifyRefreshToken() {
      try {
        // dispatch(refreshAccessToken(refreshToken));
      } catch (error) {
        console.log(error);
      }
    }
    if (!accessToken) {
      verifyRefreshToken();
    }
  }, [accessToken, refreshToken]);

  return (
    <>
      {loading ? <p>Loading...</p> : <Outlet />}
    </>
  )
}

export default PersistLogin
