const redis = require("redis")
const client = redis.createClient(process.env.REDIS_URL)

client.connect()

const setJWT = (key, value) => {
    return client.set(key, value).then((res) => {
        return res;
    }).catch(err => console.error(err));
}

const getJWT = (key) => {
    return client.get(key).then((res) => {
        return res
    }).catch(err => console.error(err))
}

const deleteJWT=(key)=>{
    try {
        client.delete(key);
    } catch (error) {
        console.error(error)
    }
}

module.exports = { setJWT, getJWT, deleteJWT }