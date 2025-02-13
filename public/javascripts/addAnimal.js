function addAnimal() {
    fetch("animals/add", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            Name: Name,
        })
    })
        .then(response => {
            if (response.ok) {
                const resData = 'Created a new animal'
                location.reload()
                return Promise.resolve(resData)
            }
            return Promise.reject(response)
        })
        .catch(response => {
            alert(response.statusText)
        })
}