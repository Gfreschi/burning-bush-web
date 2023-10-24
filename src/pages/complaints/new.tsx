import * as React from 'react'
import Layout from 'src/components/Layout'
import { Button } from '@mui/material'
import { useIncidentsContext } from 'src/contexts/IncidentsContext'
import { useAuthContext } from 'src/contexts/AuthContext'
import Link from 'next/link'
import { api } from 'src/services/api'
import DefaultCard from 'src/components/DefaultCard'
import { Complaint } from 'src/types/DataTypes'
import ComplaintCard from 'src/components/Complaints/ComplaintCard'
import { GoogleLogin, GoogleLogout } from 'react-google-login'

export default function New() {
  // custom hook
  const { incidentCollection, hasIncidents } = useIncidentsContext()
  const { isAuthenticated, user } = useAuthContext()

  const [data, setData] = React.useState<Complaint>(null)
  const [profile, setProfile] = React.useState(null)

  const clientId = 'secret'

  const complaintSample = {
    id: 1,
    details: 'DETALHES DA COMPLAINT',
    severity: 5,
    kind: 'QUEIMADA',
    latitude: 1,
    longitude: 1,
    image: 'https://picsum.photos/200/300',
    createdAt: '2021-10-10T00:00:00.000Z',
  }

  const onSuccess = res => {
    setProfile(res.profileObj)
  }

  const onFailure = err => {
    console.log('failed', err)
  }

  const logOut = () => {
    setProfile(null)
  }

  return (
    <>
      <Layout title="Incidents">
        <Button
          variant="contained"
          onClick={() => {
            console.log(user)
          }}
        >
          Get Incidents on console
        </Button>
        <br></br>
        <Link href="/complaints">Complaints Index</Link>
        <div>
          <h2>{user?.id}</h2>
          <h2>{user?.email}</h2>
          <h2>{user?.name}</h2>
          <h2>{user?.role}</h2>
        </div>

        <div>
          <h2>{data?.id}</h2>
          <h2>{data?.details}</h2>
          <h2>{data?.severity}</h2>
          <h2>{data?.kind}</h2>
          <h2>{data?.latitude}</h2>
          <h2>{data?.longitude}</h2>
          <img src={data?.image.url} alt="image" />
        </div>

        <div>
          <script
            src="https://apis.google.com/js/platform.js?onload=init"
            async
            defer
          ></script>
          {profile ? (
            <div>
              <img src={profile.imageUrl} alt="user image" />
              <h3>User Logged in</h3>
              <p>Name: {profile.name}</p>
              <p>Email Address: {profile.email}</p>
              <br />
              <br />
              <GoogleLogout
                clientId={clientId}
                buttonText="Log out"
                onLogoutSuccess={logOut}
              />
            </div>
          ) : (
            <GoogleLogin
              clientId={clientId}
              buttonText="Sign in with Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
            />
          )}
        </div>

        {hasIncidents ? (
          <h1>Number of incidents: {incidentCollection.length}</h1>
        ) : (
          <h1>No incidents</h1>
        )}
      </Layout>
    </>
  )
}
