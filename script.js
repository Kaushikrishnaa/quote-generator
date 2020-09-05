const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show loading
    function showLoadingSpinner() {
        loader.hidden = false;
        quoteContainer.hidden = true;
    }

// Hide Loading and bring back quote container
    function removeLoadingSpinner(){
        if(!loader.hidden) {
            loader.hidden = true;
            quoteContainer.hidden = false;
        }
    }

//  Get Quote from API

async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        if(data.quoteAuthor === '') {
            authorText.innerText = 'Anonymous';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        
        // Reduce font size for long quotes
        
        if(data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        
        quoteText.innerText = data.quoteText;
    
        // stop loader and show quote
        removeLoadingSpinner();

    }catch(error) {
        getQuote();
        console.log('whoops, no quote ', error);
    }
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}


// Event Listners

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();