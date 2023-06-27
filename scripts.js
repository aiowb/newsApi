// Daten von der News API abrufen
fetch('https://newsapi.org/v2/everything?q=apple&from=2023-06-10&to=2023-06-10&sortBy=popularity&apiKey=e4be3c8ce54e41f1a3f4eb827a164a1b')
    .then(response => response.json()) // Parse die Antwort als JSON
    .then(data => {
        // Filtere die Artikel, um nur solche mit Bildern einzuschließen
        const articlesWithImages = data.articles.filter(article => article.urlToImage);

        // Zeige die Top 5 Artikel im Abschnitt "Featured Articles" an
        displayArticles('featured-articles', articlesWithImages.slice(0, 5));

        // Zeige die nächsten 5 Artikel im Abschnitt "Kategorien" an
        displayArticles('category-articles', articlesWithImages.slice(5, 10));

        // Zeige die nächsten 10 Artikel im Abschnitt "Neueste Nachrichten" an
        displayArticles('latest-articles', articlesWithImages.slice(10, 20));
    })
    .catch(error => console.error('Fehler:', error)); // Fehlerbehandlung

// Funktion zum Umschalten des Dropdown-Menüs
function toggleMenu() {
    var x = document.getElementById("dropdownContent");
    // Wechselt die Anzeige zwischen "none" und "flex"
    if (x.style.display === "none") {
        x.style.display = "flex";
    } else {
        x.style.display = "none";
    }
}

// Rufe die Funktion beim Laden der Seite auf, um das Menü zu verstecken
window.onload = toggleMenu;

// Funktion zur Anzeige von Artikeln in den entsprechenden Abschnitten
function displayArticles(sectionId, articles) {
    const section = document.getElementById(sectionId);
    section.style.display = 'flex';
    section.style.flexWrap = 'wrap';
    section.style.justifyContent = 'space-around';
    articles.forEach((article, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        // Stellt spezielle Layoutregeln für den ersten und jeden fünften Artikel bereit
        if (index === 0) { // Wenn der Artikel der erste ist
            card.style.flex = '1 0 100%'; // Nimmt 100% der Zeilenbreite ein
            card.style.flexDirection = 'row'; // Sortiert die Elemente nebeneinander
        } else if ((index + 1) % 5 === 0) {
            card.style.flex = '1 0 80%'; 
            card.style.flexDirection = 'row';
        } else {
            card.style.flex = '1 0 20%';
        }
        card.style.marginBottom = '2rem';

        const img = document.createElement('img');
        img.src = article.urlToImage;
        img.classList.add('card-img-top');
        // Stellt spezielle Layoutregeln für das Bild für den ersten und jeden fünften Artikel bereit
        if (index === 0 || (index + 1) % 5 === 0) {
            img.style.width = '40%'; // Bild nimmt 40% der Kartenbreite ein
        }

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        // Stellt spezielle Layoutregeln für den Text für den ersten und jeden fünften Artikel bereit
        if (index === 0 || (index + 1) % 5 === 0) {
            cardBody.style.width = '60%'; // Text nimmt 60% der Kartenbreite ein
        }

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = article.title;

        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.textContent = article.description;

        const cardLink = document.createElement('a');
        cardLink.href = article.url;
        cardLink.textContent = 'Mehr lesen';
        cardLink.classList.add('btn', 'btn-primary');

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(cardLink);
        card.appendChild(img);
        card.appendChild(cardBody);
        section.appendChild(card);
    });
}
