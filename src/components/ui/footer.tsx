
import Link from "next/link"
export default function Footer(){
    return (
        <footer className="bg-white ">
    <div className="container px-6 py-8 mx-auto">


        <hr className="my-10 border-gray-200 dark:border-gray-700" />

        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
            <p className="text-sm text-gray-500">© Copyright 2025. All Rights Reserved.</p>

            <div className="flex mt-3 -mx-2 sm:mt-0 *:mx-2 *:text-sm *:text-gray-500 *:transition-colors *:duration-300 *:hover:text-gray-500">
                <Link href={'#'} aria-label="Reddit">Teams</Link>
                <Link href={'#'} aria-label="Reddit">Privacy</Link>
                <Link href={'#'} aria-label="Reddit"> Cookies</Link>
                
            </div>
        </div>
    </div>
</footer>
    )
}