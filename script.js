document.getElementById("ex-tx").style.display = "none";
let searchWordInput = document.getElementById("search-word");

searchWordInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        search()
    }
});

function search() {
    let searchWord = searchWordInput.value.trim();
    if (searchWord === "") {
        alert("Enter a word to search");
    } else {
        const api = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`;
        fetch(api)
            .then(response => {
                if (!response.ok) {
                    document.getElementById("meaning").textContent = "No definition found for the word.";
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                if (data[0] && data[0].meanings[0] && data[0].meanings[0].definitions[0]) {

                    const word = data[0].word
                    document.getElementById("searched-word").textContent = word;

                    const definitions = data[0].meanings[0].definitions[0].definition;
                    document.getElementById("meaning").textContent = definitions;

                    const phonetic = data[0].phonetic || "No phonetic available";
                    document.getElementById("phonetic").textContent = phonetic;

                    const example = data[0].meanings[0].definitions[0].example || "No example available";
                    document.getElementById("example").textContent = "• " + example;

                    console.log(data)
                    document.getElementById("ex-tx").style.display = "block";
                } else {
                    document.getElementById("meaning").textContent = "No definition found for the word.";
                }
            })
            .catch(error => console.error('Error:', error));
    }
}
