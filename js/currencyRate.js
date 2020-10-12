class CurrencyRate{
    static getCurID(currency){
        switch(currency.toUpperCase()){
            case "USD": return 145;
            case "EUR": return 292;
            case "PLN": return 293;
            case "JPY": return 295;
            case "RUB": return 298;
            case "KZT": return 301;
            
        }
    }
}