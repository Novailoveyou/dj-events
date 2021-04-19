import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'

const Home = ({ events }) => {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()

  return {
    props: { events },
    revalidate: 1,
  }
}

export default Home
