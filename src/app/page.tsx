import Link from 'next/link'

export function Page1Link()
{
  return <Link href="/page1">
    Go to Page1
  </Link>
}

export function Page2Link()
{
  return <Link href="/page2">
    Go to Page2
  </Link>
}

export function BlankLink()
{
  return <Link href="/blank" style={{ color: 'black' }}>
    Blank
  </Link>
}

export default function Page()
{
  return (
    <>
      <h1>Welcome to the home page!</h1>
      <Page1Link /><br />
      <Page2Link /><br />
      <BlankLink />
    </>
  )
}