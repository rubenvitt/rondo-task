import Passage from '@passageidentity/passage-node'
import {requireEnv} from "@/utils/environment";

let passage: Passage

export async function createPassage() {
    const appId = requireEnv('PASSAGE_APP_ID')
    if (typeof passage == 'undefined') {
        passage = new Passage({
            appID: appId,
            apiKey: requireEnv('PASSAGE_API_KEY'),
            authStrategy: 'HEADER',
        })
    }

    return {
        appId,
        passage,
    }
}

export async function findAuthenticatedUserId(authToken?: string) {
    if (!authToken) {
        return undefined
    }
    const req = {
        headers: {
            authorization: `Bearer ${authToken}`,
        },
    }

    const passage = await createPassage()
    const userId = await passage.passage.authenticateRequest(req).catch(error => undefined)
    if (userId) {
        return userId
    }
    return undefined
}