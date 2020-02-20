export const iexKey = "pk_f84efb5b1cb949edab9138d663ce62b3";


export const getLastPrice = (ticker) => {
    return $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${iexKey}`
    });
}

export const getCompanyName = ticker => {
    return $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/company?filter=companyName&token=${iexKeyProduction}`
    });
}

export const fetchHistoricalPrices = (ticker, range) => {
    return $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/chart/${range}?filter=close,date,minute,label&token=${iexKeyProduction}`
    });
}