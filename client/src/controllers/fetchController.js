function postJSONRequestHandler(url, formValue, callback) {
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValue)
    })
    .then((response) => response.json())
    .then((json) => callback(json));
}

export { postJSONRequestHandler };