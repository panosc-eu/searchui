import { useSearchStore } from './stores'

function ResultsCount() {
  const count = useSearchStore((state) => state.count)

  return (
    <>
      {count === 50 ? '50+' : count} {`result${count === 1 ? '' : 's'}`}
    </>
  )
}

export default ResultsCount
