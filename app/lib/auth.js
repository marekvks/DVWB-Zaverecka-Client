export const isLoggedIn = async (request, response) => {
    if (!request || !request.cookies)
        return false;

    let accessToken = request.cookies.get('accessToken').value;
    const refreshToken = request.cookies.get('refreshToken').value;

    let loggedIn = await tryLoggedInEndpoint(accessToken);

    if (loggedIn)
        return loggedIn;

    if (!refreshToken)
        return false;

    accessToken = await refreshAccessToken(refreshToken);
    if (!accessToken)
        loggedIn = false;
    else {
        response.cookies.set('accessToken', accessToken);
        loggedIn = await tryLoggedInEndpoint(accessToken);
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

    const data = await response.json();
    const accessToken = data.accessToken;

    return accessToken;
}