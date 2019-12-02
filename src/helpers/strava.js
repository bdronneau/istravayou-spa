export function getOAuthUrl () {
    const redirect_uri = "http://localhost:8081/exchange_token"
    return `https://www.strava.com/api/v3/oauth/authorize?client_id=10171&response_type=code&redirect_uri=${redirect_uri}&scope=activity:read&state=state1&approval_prompt=force`
}