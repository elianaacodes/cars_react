const token = '06a146580fbffe6e6e9aee9bd8ae9b53da7f293b57cc4bf3'

export const server_calls = {
    get: async () => { 
        const response = await fetch(`https://flasktrial3.onrender.com/cars`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'x-access-token': `Bearer ${token}`
            }

        });

        if (!response.ok){
            throw new Error('Failed to fetch data from the server')
        }

        return await response.json()
    },
    
}