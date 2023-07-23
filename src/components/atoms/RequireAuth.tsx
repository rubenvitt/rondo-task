'use client'

import { useEffect } from 'react'

export default function RequireAuth() {
    useEffect(() => {
        require('@passageidentity/passage-elements/passage-auth')
    }, [])
    return <></>
}