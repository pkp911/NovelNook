
const cheerio = require('cheerio');
let query = "Sherlock Holmes"
const t = "https://openlibrary.org";
const url = `https://openlibrary.org/search.json?q=${query}&fields=key,title,author_name,editions`;

async function getData() {
    try {
        
        let data = await fetch(url);
        data = await data.json();
        
       
        const bookUrl = t.concat(data.docs[0].key);
        console.log(`Fetching details from: ${bookUrl}`);

        
        let bookPage = await fetch(bookUrl);
        bookPage = await bookPage.text();

      
        const $ = cheerio.load(bookPage);
        const imageUrl = $('img[itemprop="image"]').attr('src');
        const bookDetails = {
            title: data.docs[0].title,
            author: data.docs[0].author_name ? data.docs[0].author_name.join(', ') : 'Unknown',
            editions: data.docs[0].editions ? data.docs[0].editions.length : 0,
            imageUrl: imageUrl ? `https:${imageUrl}` : 'No image available',
            key: data.docs[0].key,
            fullUrl: bookUrl
        };
        return bookDetails;

    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

getData().then((bookDetails) => {
    // console.log(bookDetails);/
    res.status(200).json(bookDetails);
});

