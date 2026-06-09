import ApplyForm from './apply-form'

export const metadata = {
  title: 'Slook · Apply',
  description: 'Submit your application to Slook.',
}

export default function ApplyPage() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <ApplyForm />
    </div>
  )
}
