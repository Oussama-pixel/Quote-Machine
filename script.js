let quotesData;
var colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
  ];
  let quote="";Author = "";
function getRandomNumber(max){ return Math.floor(Math.random() * max);}
function getQuotes(){
    return  $.ajax({
    header:{
        Accept:"application/json"
    },
    url:
    'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success:function(jsonInfo){
        if (typeof jsonInfo === "string"){
            quotesData = JSON.parse(jsonInfo);
            //console.log(quotesData);
        }
    }
});}
function getRandomQuote (){ return quotesData.quotes[getRandomNumber(quotesData.quotes.length)];}
let getQuote = () => {
   const q = getRandomQuote();
    quote = q.quote;
    Author = q.author;
   //console.log(quote+'/'+Author);
    
$(".quote-text").animate({opacity:0},500,function(){
    $(this).animate({opacity:1});
    $("#text").text(quote);
});
$("#quote-author").animate({opacity:0},500,function(){
    $(this).animate({opacity:1},500);
    $("#author").text(Author);
});
$('#tweet-quote').attr(
    'href',
    'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
      encodeURIComponent('"' + quote + '"' + Author)
  );
$("#tumblr-quote").attr(
    'href',
    'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
    encodeURIComponent(Author) +
    '&content=' +
    encodeURIComponent(quote) +
    '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
);
var color = getRandomNumber(colors.length);
$('html body').animate(
    {
        backgroundColor:colors[color],
        color:colors[color]
    },
    1000
);
$(".button").animate(
    {
        backgroundColor:colors[color]
    }
,1000);
}
$(document).ready(function(){
    getQuotes().then(()=>{
        getQuote();
    });
    $('#new-quote').on('click',getQuote);
})