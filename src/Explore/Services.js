import useSWR from 'swr/immutable'

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

const injectId = (id, template) => {
  if (!template) {
    return
  }
  if (!template.includes('%')) {
    throw new Error('Invalid service template')
  }
  const [prefix, suffix] = template.split('%')
  return suffix ? prefix + id + suffix : prefix + id
}

function Services({ provider, pid: unsafePID }) {
  const pid = encodeURIComponent(unsafePID)

  const { services: withTemplate } = provider
  const withURL = withTemplate.map((service) => {
    const url = injectId(pid, service.url)
    const availabilityURL = injectId(pid, service?.availabilityURL)
    return { ...service, url, availabilityURL }
  })

  const urls = withURL.map((x) => x.availabilityURL)
  const { data: availability } = useSWR(urls, {
    fetcher: multiChecker,
  })

  const services = withURL.filter((_, idx) => availability[idx])
  const tableData = services.map(({ name, url }) => [[name, url]])

  return services.length > 0 && <Table title="Services" data={tableData} />
}

export default Services
