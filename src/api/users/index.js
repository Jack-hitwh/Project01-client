import http from "@/http/index.js";

export function register(user) {
    return http({
        method: 'POST',
        url: '/register',
        data: user
    })
}