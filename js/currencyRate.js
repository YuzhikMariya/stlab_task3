class CurrencyRate{
    

    getCurID(currency){
        switch(currency.toUpperCase()){
            case "USD": return 145;
            case "EUR": return 292;
            case "PLN": return 293;
            case "JPY": return 295;
            case "RUB": return 298;
            case "KZT": return 301;
            
        }
    }

    async getJSON(dateFrom, dateTo, currency){
        let repeat = true;
        let attempt = 0;
        while(repeat && (attempt < 3)){
            try{
                repeat = false;
                let url = "https://www.nbrb.by/API/ExRates/Rates/Dynamics/" + this.getCurID(currency) + "?startDate=" + dateFrom + "&endDate=" + dateTo;
                let response = await fetch(url);

                return await response.json();

            }catch(err){
                alert('err');
                repeat = true;
                attempt++;
            }
        }
        
    }

}