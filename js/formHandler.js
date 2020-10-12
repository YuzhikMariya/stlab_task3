let form = document.querySelector('.currency_rate_form');

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
    QueryBuilder.build(from, to, currencyNames, {section: section});
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

