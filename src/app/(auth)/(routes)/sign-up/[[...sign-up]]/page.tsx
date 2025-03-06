import { SignUp } from '@clerk/nextjs'

export function generateStaticParams() {
    return [
        { 'sign-up': [] },
    ];
}

export default function Page() {
    return <SignUp path={"/sign-up"}/>
}