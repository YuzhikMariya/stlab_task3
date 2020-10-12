class DataLoader{
    async getJSON(dateFrom, dateTo, currency){
        let repeat = true;
        let attempt = 0;
        while(repeat && (attempt < 3)){
            try{
                repeat = false;
                let url = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${CurrencyRate.getCurID(currency)}?startDate=${dateFrom}&endDate=${dateTo}`;
                let response = await fetch(url);
                return await response.json();
            }catch(err){
                alert('Data not loaded. Please try again');
                repeat = true;
                attempt++;
            }
        }   
    }
}