export const LoadingStatus = {
    Initial: 0,
    Loading: 1,
    Success: 2,
    Fail: 3
};

export function genId() {
    const length = 8;
    const a = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const ret = [];
    for (let i = 0; i < length; i++) {
        ret.push(a.substr(Math.floor(Math.random()*a.length), 1));
    }
    return ret.join('');
}

export function cll(method, obj) {
    console.log(`[${method}]`, obj);
}