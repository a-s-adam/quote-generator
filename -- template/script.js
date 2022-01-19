const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];
var local = 0;

//Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}


// Get Quotes from API
async function getLocalQuotes(){
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]
    authorText.textContent = quote.author
    quoteText.textContent = quote.text
}
async function getQuotes() {
    loading();
    try{
        loading();
        const apiUrl = "https://type.fit/api/quotes";
        const response = await fetch(apiUrl);
        apiQuotes = await response.json(); 
        quote = apiQuotes[Math.floor(Math.random() * localQuotes.length)]
        //Check if Author Field is blank
        if (!quote.author){
            authorText.textContent = "Unknown";
        }
        else{
            authorText.textContent = quote.author;    
        }
        //Check Quote Length
        if(quote.length > 10){
            quoteText.classList.add('long-quote');
        }
        else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.textContent = quote.text;
        complete();
    }
    catch{
        console.log("could not fetch quote")
    }
}

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', getQuotes)
twitterBtn.addEventListener('click',tweetQuote)

getQuotes();