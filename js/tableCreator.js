class TableCreator{
    static addTable(rateArr, currNameArr){
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
}