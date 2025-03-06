import { SignIn } from '@clerk/nextjs'

export function generateStaticParams() {
    return [
        { 'sign-in': [] },
    ];
}


export default function Page() {
    return <SignIn path={"/sign-in"}/>

}