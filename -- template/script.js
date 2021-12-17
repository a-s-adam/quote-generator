const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];
var local = 0;

// Get Quotes from API
async function getLocalQuotes(){
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]
    authorText.textContent = quote.author
    quoteText.textContent = quote.text

}
async function getQuotes() {
    try {
        fetch("https://qvoca-bestquotes-v1.p.rapidapi.com/quote", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "SIGN-UP-FOR-KEY",
		"x-rapidapi-host": "qvoca-bestquotes-v1.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});
        apiQuotes = await response.json();
        // quote = apiQuotes.contents.quotes[0]
        console.log(apiQuotes);
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
        quoteText.textContent = quote.quote;

    } catch (error) {
        // Catch error
    }
}

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', getQuotes)
twitterBtn.addEventListener('click',tweetQuote)

if (local){
    getLocalQuotes();
}
else{
    getQuotes();
}
