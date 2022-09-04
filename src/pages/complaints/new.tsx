import Layout from 'src/components/Layout'
import NewComplaintForm from 'src/components/Complaints/NewComplaintForm'

export default function New() {
  return (
    <>
      <Layout title="New Complaints">
        <div>
          <NewComplaintForm longitudeProp={0} latitudeProp={0} />
        </div>
      </Layout>
    </>
  )
}
