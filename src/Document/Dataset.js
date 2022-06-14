import { Card, Heading, Text } from '../Primitives'

function Dataset(props) {
  const { title, instrument } = props

  return (
    <Card as="article" p={[2, 2, 3]}>
      <Heading as="h3">{title}</Heading>
      <Text as="p">
        {instrument.name} @ {instrument.facility}
      </Text>
    </Card>
  )
}

export default Dataset
