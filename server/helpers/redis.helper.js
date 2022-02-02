const redis = require("redis")
const client = redis.createClient(process.env.REDIS_URL)

client.connect()

const setJWT = (key, value) => {
    return client.set(key, value).then((res) => {
        return res;
    }).catch(err=>{
        console.error(err)
    });

    // return new Promise((resolve, reject) => {
    //     try {
    //       resolve( client.set(key, value, (err, res) => {
    //         if (err) return(err);
    //         return (res);
    //       }))
    //     } catch (error) {
    //       reject(error);
    //     }
    //   });
}

const getJWT = (key) => {
    return client.get(key).then((res) => {
        return res
    }).catch(err => console.error(err))
}

module.exports = { setJWT, getJWT }