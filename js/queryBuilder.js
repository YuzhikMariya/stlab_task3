class QueryBuilder{
    static build(from, to, currencyNames, sectionObj){
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
        let resultArray = [];
        let daysCount = (Date.parse(to) - Date.parse(from)) / (1000 * 60 * 60 * 24),
            yearsCount = Math.ceil(daysCount / 365);
        let processedYear = 0;
        
        for(let i = 0; i < currencyNames.length; i++) {
            for(let k = 0; k < yearsCount; k++){
                let tempFrom = getDate(Date.parse(from)+k*MS_COUNT_IN_YEAR),
                    tempTo = getDate(Math.min(Date.parse(to), Date.parse(tempFrom)+MS_COUNT_IN_YEAR-MS_COUNT_IN_DAY));
                let dataLoader = new DataLoader();
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
                        resultArray.sort(function(a, b){return Date.parse(a._date) - Date.parse(b._date)});
                        sectionObj.section.innerHTML = '';
                        sectionObj.section.appendChild(TableCreator.addTable(resultArray, currencyNames)); 
                    }
    
                })
            }
        };
    }
}