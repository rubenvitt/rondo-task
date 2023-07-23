export const metadata = {
    title: 'RoTodo • Sign in',
    description: 'Sign in to RoTodo',
}

async function passage() {
    return {
        appId: process.env.PASSAGE_APP_ID
    }
}

export default async function SignIn() {
    const {appId} = await passage();

    return <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <passage-auth app-id={appId}></passage-auth>
    </div>
}