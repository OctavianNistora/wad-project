import Link from 'next/link'

export function HomePageLink()
{
    return <Link href="/">
        Go to Home Page
    </Link>
}

export function Page1Link()
{
    return <Link href="/page1">
        Go to Page1
    </Link>
}

export default function Page()
{
    return (
        <>
            <h1>Welcome to page2!</h1>
            <HomePageLink /><br />
            <Page1Link /><br />
        </>
    )
}