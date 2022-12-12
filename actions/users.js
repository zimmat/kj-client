const axios = require('axios');

export const getUsers = async () => {
    const url = `/api/users`;
    const { data } = await axios.get(url)
    console.log("data from actions", data)
    return  data 
}

