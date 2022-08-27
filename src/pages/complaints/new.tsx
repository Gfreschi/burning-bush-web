import Layout from 'src/components/Layout'
import NewComplaintForm from 'src/components/Complaints/NewComplaintForm'
import WorldMapBox from 'src/components/WorldMapBox'

export default function New() {
  return (
    <>
      <Layout title="New Complaints">
        <NewComplaintForm />
      </Layout>
    </>
  )
}
