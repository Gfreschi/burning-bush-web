import Layout from 'src/components/Layout'
import NewComplaintForm from 'src/components/Complaints/NewComplaintForm'

export default function New() {
  return (
    <>
      <Layout title="New Complaints">
        <div>
          <NewComplaintForm longitude={0} latitude={0} />
          <h1>TESTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE</h1>
        </div>
      </Layout>
    </>
  )
}
