import { cn } from '../../lib/utils'

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-white/[3%]', className)}
      {...props}
    />
  )
}

export { Skeleton }
