let form = document.querySelector('.currency_rate_form');

let dataLoader = new DataLoader();

form.onsubmit = () => {


    let from = document.querySelector('#dateFrom').value;
    let to = document.querySelector('#dateTo').value;
    let section = document.getElementById('answer_section');

    let dateFrom = new Date(from);
    let dateTo = new Date(to);
    if(dateFrom > dateTo){
        section.innerHTML = 'Start date must be less than end date';
        return false;
    }
    let currencyNames = getCheckedCheckBoxes('currency');



    let resultArray = [];

    let daysCount = (Date.parse(to) - Date.parse(from)) / (1000 * 60 * 60 * 24),
        yearsCount = Math.ceil(daysCount / 365);
    let processedYear = 0;
    const MS_COUNT_IN_YEAR = 365*24*60*60*1000,
          MS_COUNT_IN_DAY = 24*60*60*1000;
    const CURR_OBJECT = {
            "USD": 0,
            "EUR": 0,
            "PLN": 0,
            "JPY": 0,
            "RUB": 0,
            "KZT": 0
    };
    for(let i = 0; i < currencyNames.length; i++) {

        for(k = 0; k < yearsCount; k++){
            let tempFrom = getDate(Date.parse(from)+k*MS_COUNT_IN_YEAR),
                tempTo = getDate(Math.min(Date.parse(to), Date.parse(tempFrom)+MS_COUNT_IN_YEAR-MS_COUNT_IN_DAY));
            dataLoader.getJSON(tempFrom, tempTo, currencyNames[i])
            .then(res => {

                for(let j = 0; j < res.length; j++){

                    let index = isObjExist(res[j].Date, resultArray);
                    if(index == -1){
                        let tempObj = new Currency(res[j].Date, CURR_OBJECT);
                        tempObj.addCurrency(currencyNames[i], res[j].Cur_OfficialRate);
                        resultArray.push(tempObj);
                    }else{
                        resultArray[index].addCurrency(currencyNames[i], res[j].Cur_OfficialRate);
                    }
                    
                }
                processedYear++;
                if(processedYear == yearsCount*currencyNames.length){
                    section.innerHTML = '';
                    section.appendChild(TableCreator.addTable(resultArray.sort(function(a, b){return Date.parse(a._date) - Date.parse(b._date)}), currencyNames));
                }

            })
        }
    };
    
    return false;
}

function getCheckedCheckBoxes(className) {
    let checkboxes = document.getElementsByClassName(className);
    let checkboxesChecked = [];
    for (let i = 0; i < checkboxes.length; i++) {
       if (checkboxes[i].checked) {
          checkboxesChecked.push(checkboxes[i].value); 
       }
    }
    return checkboxesChecked;
} 

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