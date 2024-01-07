import { formatDistance, formatRelative } from 'date-fns'

export default function BasicDate({ date }: { date: number }) {
  const twoDays = 86400000
  const now = Date.now()
  const twoDayyAgo = now - twoDays

  return (
    <>
      {twoDayyAgo >= date
        ? formatRelative(date, now)
        : formatDistance(date, now, {
            addSuffix: true,
          })}
    </>
  )
}
