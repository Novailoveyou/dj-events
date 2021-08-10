import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Event.module.sass'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import AuthContext from '@/context/AuthContext'

const Event = ({
  evt: { id, date, time, name, image, performers, description, venue, address }
}) => {
  const router = useRouter()
  const { user } = useContext(AuthContext)
  const deleteEvent = async e => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE'
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.message)
      } else {
        router.push('/events')
      }
    }
  }

  return (
    <Layout title={name}>
      <div className={styles.event}>
        {user && (
          <div className={styles.controls}>
            <Link href={`/events/edit/${id}`}>
              <a>
                <FaPencilAlt /> Edit Event
              </a>
            </Link>
            <a href='#' className={styles.delete} onClick={deleteEvent}>
              <FaTimes /> Delete Event
            </a>
          </div>
        )}
        <span>
          {new Date(date).toLocaleDateString('en-US')} at {time}
        </span>
        <h1>{name}</h1>
        <ToastContainer />
        {image && (
          <div className={styles.image}>
            <Image src={image.formats.medium.url} width={960} height={600} />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{performers}</p>
        <h3>Description:</h3>
        <p>{description}</p>
        <h3>Venue: {venue}</h3>
        <p>{address}</p>

        <Link href='/events'>
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`)
  const events = await res.json()

  const paths = events.map(evt => ({
    params: { slug: evt.slug }
  }))

  // pahts need to look like this paths: [{params: {slug: 1}}, {params: {slug: 2}}]
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`)
  const events = await res.json()

  return {
    props: {
      evt: events[0]
    },
    revalidate: 1
  }
}

export default Event
