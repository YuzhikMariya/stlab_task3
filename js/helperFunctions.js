function isObjExist(date, arr){
    let index = -1;
   for(let i = 0; i < arr.length; i++){
       if(arr[i]._date == date){
           index = i;
       }
   }
    return index;
}

function getDate(str){
    let date = new Date(str);
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    let resultStr = year + "-";
    if(month < 10){
        resultStr += '0';
    }
    resultStr += month + "-";
    if(day < 10){
        resultStr += '0';
    }
    resultStr += day;
    return  resultStr;
}