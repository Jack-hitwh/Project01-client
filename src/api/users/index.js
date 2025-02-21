import http from "@/http/index.js";

export function register(user) {
    return http({
        method: 'POST',
        url: '/user/register',
        data: user
    })
}

export function login(user) {
    return http({
        method: 'POST',
        url: '/user/login',
        data: user
    })
}

//demo
export function tokenVerify(token) {
    return http({
        method: 'POST',
        url: '/user/token-verify',
        data: token
    })
}
