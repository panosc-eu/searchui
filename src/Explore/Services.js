import useSWR from 'swr/immutable'

import { CHAR } from '../App/helpers'
import providers from '../providers.json'
import Table from './Table'

const multiChecker = (...urls) =>
  Promise.all(
    urls.map(async (url) => {
      if (!url) {
        return true
      }
      try {
        await fetch(url)
        return true
      } catch {
        return false
      }
    }),
  )

const injectPID = (pid, template) => {
  if (!template) {
    return
  }
  if (!template.includes('%')) {
    throw new Error('Invalid service template')
  }
  const [prefix, suffix] = template.split('%')
  return suffix ? prefix + pid + suffix : prefix + pid
}

function Services({ providerURL, pid: unsafePID }) {
  const pid = encodeURIComponent(unsafePID)
  const provider = providers.find((x) => x.url === providerURL)

  const { services: withTemplate } = provider
  const withURL = withTemplate.map((service) => {
    const url = injectPID(pid, service.url)
    const availabilityURL = injectPID(pid, service?.availabilityURL)
    return { ...service, url, availabilityURL }
  })

  const urls = withURL.map((x) => x.availabilityURL)
  const { data: availability } = useSWR(urls, {
    fetcher: multiChecker,
  })

  const services = withURL.filter((_, idx) => availability[idx])
  const tableData = services.map(({ name, url }) => [
    name + CHAR.saferSplit + url,
  ])

  return services.length > 0 && <Table title="Services" data={tableData} />
}

export default Services
