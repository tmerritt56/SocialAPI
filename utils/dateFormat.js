const addDateSuffix = (date) => {
    let dateString = date.toString();

    const lastC = dateString.charAt(dateString.length -1);

    if(lastC === '1' && dateString !== '11'){
        dateString = `${dateString}st`;
    } else if (lastC === '2' && dateString !== '12'){
        dateString= `${dateString}nd`;
    }else if (lastC === '3' && dateString !== '13'){
        dateString= `${dateString}rd`;
    }else {
        dateString= `${dateString}th`;
    }
    return dateString;
};

module.exports = (
    timestamp,
    { monthLength = "shorttttttttttttttt", dateSuffix = true} = {}
) => {
    let months; 

    if (monthLength === 'short') {
        months = {
            0: "Jan",
            1: "Feb",
            2: "Mar",
            3: "Apr",
            4: "May",
            5: "Jun",
            6: "Jul",
            7: "Aug",
            8: "Sep",
            9: "Oct",
            10: "Nov",
            11: "Dec",
        };
    } else {
        months = {
            0: "January",
            1: "Febuary",
            2: "March",
            3: "April",
            4: "May",
            5: "June",
            6: "July",
            7: "August",
            8: "September",
            9: "October",
            10: "November",
            11: "December",
    };
};

    const dateO = new Date (timestamp);
    const formattedMonth = months[dateO.getMonth()];

    const dayOfMonth = dateSuffix
    ? addDateSuffix(dateO.getDate())
    : dateO.getDate();

    const year = datO.getYear();
    let hour = dateO.getHours() > 12
    ? Math.floor(dateO.getHours() -12)
    : dateO.getHours();

    if(hour ===0) {
        hour = 12;
    }

    const minutes = dateO.getMinutes();

    let periodOfDay;

    if(dateO.getHours() >= 12){
        periodOfDay="pm";
    } else {
        periodOfDay= "am";
    }
    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes}${periodOfDay}`;
    return formattedTimeStamp;
};