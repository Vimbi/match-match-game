const regexpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexpNameSymbols = /[~!@#$%*()_—+=|:;"'`<>,.?/^]/g;
const regexpNameNumbers = /^[0-9]/g;

export { regexpEmail, regexpNameNumbers, regexpNameSymbols };