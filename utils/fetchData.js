const fetch = require('node-fetch');

const fetchData = async ({ sheetName, authToken }) => {
    let jsonData = await fetch(process.env.DATA_API_URI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            sheetName,
            authToken
        })
    }).then((response)=>{
        return response.json();
    });
    return jsonData;
}

module.exports = fetchData;