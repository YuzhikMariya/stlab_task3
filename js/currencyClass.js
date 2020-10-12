class Currency{
    _date = "";
    _currObj = {};

    constructor(date, currObj){
        this._date = date;
        this._currObj = {...currObj};
    }

    addCurrency(curr, rate){
        this._currObj[curr] = rate;
    }
}