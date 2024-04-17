export const isLoggedIn = async (accessToken, refreshToken) => {
    if (!accessToken)
        return false;

    accessToken = accessToken.value;

    let loggedIn = await tryLoggedInEndpoint(accessToken);

    if (!loggedIn) {
        if (!refreshToken)
            return false;

        refreshToken = refreshToken.value;
        const refreshedToken = await refreshAccessToken(refreshToken);
        if (!refreshedToken)
            loggedIn = false;
        else
            loggedIn = await tryLoggedInEndpoint();
    }

    return loggedIn;
}

const tryLoggedInEndpoint = async (accessToken) => {
    const response = await fetch('http://localhost:8080/auth/loggedIn', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    return response.status === 200;
}

const refreshAccessToken = async (refreshToken) => {
    const response = await fetch('http://localhost:8080/auth/token', {
        method: 'GET',
        headers: {
            'Cookie': `refreshToken=${refreshToken}; Path=/; HttpOnly`
        }
    });

    console.log('idk', response.headers.getSetCookie());

    return response.status === 200;
}