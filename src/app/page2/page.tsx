import Link from 'next/link'

export default function Page2()
{
    return (
        <main>
            <h1>Welcome to page2!</h1>
            <Link href="/">
                Go to Home Page
            </Link><br />
            <Link href="/page1">
                Go to Page1
            </Link><br />
        </main>
    )
}