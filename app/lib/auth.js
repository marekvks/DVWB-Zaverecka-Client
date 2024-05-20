export const isLoggedIn = async (request, response) => {
    if (!request || !request.cookies)
        return false;

    let accessToken = request.cookies.get('accessToken');
    let refreshToken = request.cookies.get('refreshToken');

    if (!accessToken)
        return false;

        accessToken = accessToken.value;

    let loggedIn = await tryLoggedInEndpoint(accessToken);

    if (loggedIn)
        return loggedIn;

    if (!refreshToken)
        return false;

    refreshToken = refreshToken.value;

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
    const response = await fetch('http://localhost:8080/auth/authorized', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    return response.status === 200;
}

const refreshAccessToken = async (refreshToken) => {
    const response = await fetch('http://localhost:8080/auth/accessToken', {
        method: 'GET',
        headers: {
            'Cookie': `refreshToken=${refreshToken}; Path=/; HttpOnly`
        }
    });

    const data = await response.json();
    const accessToken = data.accessToken;

    return accessToken;
}

export const getAccessToken = async (cookies) => {
    if (!cookies)
        return null;

    let accessToken = cookies.get('accessToken');
    
    const accessTokenOk = await tryLoggedInEndpoint(accessToken);

    if (!accessTokenOk) {
        const response = await fetch('http://localhost:8080/auth/accessToken', {
            method: 'GET',
            credentials: 'include'
        });
        if (response.status != 200)
            return null;

        const data = await response.json();
        accessToken = data.accessToken;
        return accessToken;
    }

    return accessToken;
};

export const login = async (email, password) => {
    const reqBody = { email: email, password: password }

    const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(reqBody)
    });

    return response.status === 200;
}

export const register = async (username, email, password) => {
    const reqBody = { username, email, password };
    
    const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(reqBody)
    });

    return response.status === 201;
}

export const checkRefreshToken = async (request, response) => {
    let refreshToken = request.cookies.get('refreshToken');

    if (!refreshToken) return;

    refreshToken = refreshToken.value;

    const res = await fetch('http://localhost:8080/auth/refreshToken', {
        method: 'GET',
        headers: {
            'Cookie': `refreshToken=${refreshToken}; Path=/; HttpOnly`
        }
    });

    const data = await res.json();
    if (data.refreshToken) {
        response.cookies.set('refreshToken', data.refreshToken, { httpOnly: true, secure: false });
    }
}