import Link from 'next/link'
export default function Page1()
{
    return (
        <main>
            <h1>Welcome to page1!</h1>

            <Link href="/">
                Go to Home Page
            </Link><br />
            
            <Link href="/page2">
                Go to Page2
            </Link>
        </main>
    )
}