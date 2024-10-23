export default {

    getAddressFromCoords: async (lat,lng,key) => {
        const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+ lng + '&key=' + key;
        const response = await fetch(url,{
            headers:{
                "Content-Type": "application/json",  
        }
        });
        return response;
    }


}