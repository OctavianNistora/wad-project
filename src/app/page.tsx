import Link from 'next/link'

export default function Page()
{
  return (
    <main>
      <h1>Welcome to the home page!</h1>
      
      <Link href="/page1">
        Go to Page1
      </Link><br />

      <Link href="/page2">
        Go to Page2
      </Link><br />

      <Link href="/blank">
        Blank
      </Link>
    </main>
  )
}