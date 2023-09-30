import Link from 'next/link'

export function HomePageLink()
{
    return <Link href="/">
        Go to Home Page
    </Link>
}

export function Page2Link()
{
    return <Link href="/page2">
        Go to Page2
    </Link>
}

export default function Page()
{
    return (
        <>
            <h1>Welcome to page1!</h1>
            <HomePageLink /><br />
            <Page2Link />
        </>
    )
}