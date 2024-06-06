// const API_URL = 'http://192.168.0.103:5000/api';
const API_URL = 'https://stake-mines-backend.onrender.com/api';

export async function authenticate(username, password) {
    const response = await fetch(`${API_URL}/authenticate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    return response.json();
}

export async function getWallet(token) {
    const response = await fetch(`${API_URL}/wallet`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    return response.json();
}

export async function updateWallet(token, amount) {
    const response = await fetch(`${API_URL}/wallet`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ amount }),
    });
    return response.json();
}

export async function logout(token) {
    const response = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    return response.json();
}

export async function startGameApi(token, data) {
    const response = await fetch(`${API_URL}/startgame`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }, body: JSON.stringify(data)
    });
    return  await response.json();
}

export async function getUsername(token){
    const response = await fetch(`${API_URL}/username`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    return response.json();
}

export async function openTileApi(token, data){
    const response = await fetch(`${API_URL}/opentile`, {
        method: "POST", 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }, body: JSON.stringify(data)
    });
    return await response.json();
}

export async function cashoutClickApi(token, data){
    const response = await fetch(`${API_URL}/cashout`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }, body: JSON.stringify(data)
    });
    return await response.json();
}

export async function handleDepositApi(token, data){
    const response = await fetch(`${API_URL}/deposit`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }, body: JSON.stringify(data)
    });
    return await response.json();
}

export async function handleWithdrawApi(token, data){
    const response = await fetch(`${API_URL}/withdraw`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }, body: JSON.stringify(data)
    });
    return await response.json();
}