export const isAuthenticated = (token) => {
    if (!token) return false;
    return true;
}

export const logout = (navigate, col) => {
    localStorage.clear();
    navigate('/')
}

