import { Loader2 } from 'lucide-react'

export default function InitialLoadingPage() {
  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <Loader2 className='h-[40px] w-[40px] animate-spin' />
    </div>
  )
}
