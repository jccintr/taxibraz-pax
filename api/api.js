// --host=192.168.0.107

//const BASE_API = 'http://192.168.0.104:3000';
const BASE_API = 'https://taxibraz.onrender.com';
//const BASE_API = 'http://192.168.0.105:3000';



export default {
      

   validateToken: async (token) => {
    const response = await fetch(`${BASE_API}/passengers/auth/token`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    });
    return response;
},

    login: async (email, password) => {
        const response = await fetch(`${BASE_API}/passengers/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
        return response;
    },

    cadastro: async (fd) => {
       
        const response = await fetch(`${BASE_API}/passengers/auth/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fd)
        });
              
        return response;
    },
    verifyEmail: async (token,code) => {
        const response = await fetch(`${BASE_API}/passengers/auth/verifyemail`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({code})
        });
        return response;
    },
    requestVerificationEmail: async (token) => {
        const response = await fetch(`${BASE_API}/passengers/auth/email/verify/request`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
           // body: JSON.stringify({code})
        });
        return response;
    },

    requestPasswordEmail: async (email) => {
        const response = await fetch(`${BASE_API}/passengers/auth/password/request`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email})
        });
        return response;
    },
    resetPassword: async (email,code, password) => {
        const response = await fetch(`${BASE_API}/passengers/auth/password/reset`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,code,password})
        });
        return response;
    },

    getDrivers: async () => {
        const response = await fetch(`${BASE_API}/drivers/location`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
               
            },
        });
        return response;
    },
    getPagamentos: async () => {
        const response = await fetch(`${BASE_API}/pagamentos`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return response;
    },
    addRide: async (token,fd) => {
        const response = await fetch(`${BASE_API}/rides`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(fd)
        });
        return response;
    },
    getRidePrice: async (token,distancia) => {
        const response = await fetch(`${BASE_API}/rides/price`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({distancia})
        });
        return response;
    },
    getRideStatus: async (token,id) => {
        const response = await fetch(`${BASE_API}/rides/${id}/status`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
           
        });
        return response;
    },
    updatePassenger: async (token,fd) => {
        const response = await fetch(`${BASE_API}/passengers/update`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(fd)
        });
        return response;
    },
    rateDriver: async (token,id,rating) => {
        const response = await fetch(`${BASE_API}/rides/${id}/rate/driver`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({rating})
        });
        return response;
    },
    cancelRide: async (token,id) => {
        const response = await fetch(`${BASE_API}/rides/${id}/cancel/passenger`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
           // body: JSON.stringify({rating})
        });
        return response;
    },
    getMyRides: async (token) => {
        const response = await fetch(`${BASE_API}/passengers/rides`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    rideDetails: async (token,id) => {
        const response = await fetch(`${BASE_API}/rides/${id}/detail/passenger`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    restoreRide: async (token,id) => {
        const response = await fetch(`${BASE_API}/rides/${id}/restore/passenger`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
           // body: JSON.stringify({rating})
        });
        return response;
    },
  
   
  




  
   
};