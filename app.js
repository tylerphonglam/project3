// Your Alpha Vantage API key
const apiKey = 'IZM3FO6YJ9P9SWOJ';

// List of stock symbols
const stockSymbols = [
    "RY", "TD", "ENB", "CNI", "CP", "CNQ", "SHOP", "BMO", "TRI", "BNS", "ATD.TO", "LULU", "SU", "CSU.TO", "CVE", "CM",
    "TRP", "BCE", "IMO", "MFC", "NTR", "QSR", "SLF", "GWO.TO", "GOLD", "FNV", "L.TO", "IFC.TO", "TU", "AEM", "GIB", "NA.TO",
    "TECK", "RCI", "FFH.TO", "DOL.TO", "FTS", "WPM", "POW.TO", "CCJ", "WSP.TO", "TOU.TO", "PBA", "FM.TO", "H.TO", "MGA", "WN.TO",
    "BAM", "GFL", "MRU.TO", "PWF-PS.TO", "RBA", "TFII", "IVN.TO", "EMA.TO", "OTEX", "ARX.TO", "SAP.TO", "CAE", "CCL-B.TO", "STN",
    "CHP-UN.TO", "EMP-A.TO", "TIH.TO", "CTC.TO", "FSV", "IAG.TO", "IGM.TO", "DSGX", "BLCO", "X.TO", "KGC", "CU.TO", "WFG", "CAR-UN.TO",
    "LUN.TO", "DOOO", "EFN.TO", "SNC.TO", "ALA.TO", "TOI.V", "KEY.TO", "PAAS", "MEG.TO", "PKI.TO", "WCP.TO", "QBR-B.TO", "AC.TO", "CIGI",
    "GIL", "AQN", "AGI", "ONEX.TO", "PSK.TO", "NPI.TO", "ATS", "CPG", "FTT.TO", "REI-UN.TO", "BTG"
];

// Define the date range
const startDate = '20000-01-01';
const endDate = '2023-09-25';

// Function to fetch data for a stock symbol
function fetchDataForStock(symbol) {
  const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}`;

  return fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const dailyData = data['Time Series (Daily)'];
      const dates = Object.keys(dailyData);
      const closingPrices = dates.map((date) => parseFloat(dailyData[date]['4. close']));

      // Display stock data
      displayStockData(symbol, dates, closingPrices);
    })
    .catch((error) => {
      console.error(`Error fetching data for ${symbol}:`, error);
    });
}

// Function to display stock data using Plotly
function displayStockData(symbol, dates, closingPrices) {
  const data = [{
    x: dates,
    y: closingPrices,
    type: 'scatter',
    mode: 'lines',
    name: `${symbol} Closing Price`,
  }];

  const layout = {
    title: `${symbol} Stock Price`,
    xaxis: {
      title: 'Date',
    },
    yaxis: {
      title: 'Closing Price (USD)',
    },
  };

  Plotly.newPlot('stock-data', data, layout);
}

// Populate the stock symbol dropdown
const stockSymbolDropdown = document.getElementById('stock-symbol');
stockSymbols.forEach((symbol) => {
  const option = document.createElement('option');
  option.value = symbol;
  option.textContent = symbol;
  stockSymbolDropdown.appendChild(option);
});

// Add event listener for symbol selection
stockSymbolDropdown.addEventListener('change', (event) => {
  const selectedSymbol = event.target.value;
  fetchDataForStock(selectedSymbol);
});
