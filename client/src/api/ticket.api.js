import axios from 'axios';

export const getAllTickets = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.get('http://localhost:3000/v1/ticket',
                {
                    headers: {
                        Authorisation: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjFmODI0NzcxOTU5YTlhYzg3MjEwYTFmIiwiaWF0IjoxNjQ0ODAyODMzLCJleHAiOjE2NDQ4ODkyMzN9.W4mZFcu5MZF4h2tQd5y1_mjxQsBkuAGiKfWt7OPhwBs"
                    }
                }
            )
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })

}
