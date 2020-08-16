class Currency{
    _date = "";
    _currObj = {};

    constructor(date){
        this._date = date;
        this._currObj = {
            "USD": 0,
            "EUR": 0,
            "PLN": 0,
            "JPY": 0,
            "RUB": 0,
            "KZT": 0
        };
    }

    addCurrency(curr, rate){
        this._currObj[curr] = rate;
    }
}