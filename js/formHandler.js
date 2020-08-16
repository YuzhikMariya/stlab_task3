let form = document.querySelector('.currency_rate_form');

let currRate = new CurrencyRate();

form.onsubmit = () => {


    let from = document.querySelector('#dateFrom').value;
    let to = document.querySelector('#dateTo').value;

    let dateFrom = new Date(from);
    let dateTo = new Date(to);
    if(dateFrom > dateTo){
        let tempStr = from;
        from = to;
        to = tempStr;
    }
    let currencyNames = getCheckedCheckBoxes('currency');



    let resultArray = [];

    let processedCurr = 0;
    for(let i = 0; i < currencyNames.length; i++) {

        currRate.getJSON(from, to, currencyNames[i])
        .then(res => {

            for(let j = 0; j < res.length; j++){

                let index = isObjExist(res[j].Date, resultArray);
                if(index == -1){
                    let tempObj = new Currency(res[j].Date);
                    tempObj.addCurrency(currencyNames[i], res[j].Cur_OfficialRate);
                    resultArray.push(tempObj);
                }else{
                    resultArray[index].addCurrency(currencyNames[i], res[j].Cur_OfficialRate);
                }
                
            }
            processedCurr++;
            if(processedCurr == currencyNames.length){
                let section = document.getElementById('answer_section');
                section.innerHTML = '';
                section.appendChild(addTable(resultArray, currencyNames));
            }

        })
        
    };
    
    return false;
}

function addTable(rateArr, currNameArr){
    let table = document.createElement('table');
    table.setAttribute("border", "2px");

    let tr = document.createElement('tr');
    let th = document.createElement('th');

    th.appendChild(document.createTextNode('Date'));
    tr.appendChild(th);
    for(let i = 0; i < currNameArr.length; i++){
        th = document.createElement('th');
        th.appendChild(document.createTextNode(currNameArr[i]));
        tr.appendChild(th);
    }

    table.appendChild(tr);

    for(let i = 0; i < rateArr.length; i++){
        tr = document.createElement('tr');

        let tdDate = document.createElement('td');
        let date = document.createTextNode(getDate(rateArr[i]._date));
        tdDate.appendChild(date);
        tr.appendChild(tdDate);

        for(let j = 0; j < currNameArr.length; j++){
            let td = document.createElement('td');
            let text = document.createTextNode(rateArr[i]._currObj[currNameArr[j]]);

            td.appendChild(text);
            tr.appendChild(td);
        }

        table.appendChild(tr);
    }

    return table;
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
    let month = date.getMonth();
    let year = date.getFullYear();

    let resultStr = "";
    if(day < 10){
        resultStr += '0';
    }
    resultStr += day + '.';
    if(month < 10){
        resultStr += '0';
    }
    resultStr += month + '.' + year;


    return  resultStr;
}