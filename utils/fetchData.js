const fetch = require('node-fetch');

const fetchData = async (options) => {
    try {
        let jsonData = await fetch(process.env.DATA_API_URI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(options)
        }).then((response) => {
            return response.json();
        });
        return jsonData;
    } catch (error) {
        return null;
    }
}

module.exports = fetchData;