export default {

    formataData: (d)=> {

        const data = new Date(d);
        return data.toLocaleDateString() + ' ' + data.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"});

    },
    formataHora: (d)=> {

        const data = new Date(d);
        return data.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"});

    },

    toHoursAndMinutes: (totalMinutes) => {

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return { hours, minutes };

      } ,
    

    distancia: (d) => {

        if(d<1) {
            return d*1000 + ' m';
        } 
        return d.toFixed(1) + ' km';

    },

    duracao: (minutos) => {
   
        if(minutos<60){
            return minutos.toFixed(0) + ' min';
        }
    
        let {hours,minutes} = toHoursAndMinutes(minutos);
    
        minutes = Math.ceil(minutes);
    
        if(minutes<10){
          minutes = '0'+ minutes;
        }
    
        return hours + 'h'+ minutes + 'min';
    },

}