const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

const results = document.getElementById("results");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");

searchBtn.addEventListener("click", searchBooks);

async function searchBooks() {

  const query = searchInput.value.trim();

  if (query === "") {
    errorMessage.textContent =
      "Please enter a book name";
    return;
  }

  results.innerHTML = "";
  errorMessage.textContent = "";

  loading.classList.remove("hidden");

  try {

    const response = await fetch(
      `https://openlibrary.org/search.json?q=${query}`
    );

    if (!response.ok) {
      throw new Error("API Error");
    }

    const data = await response.json();

    loading.classList.add("hidden");

    if (data.docs.length === 0) {
      errorMessage.textContent =
        "No books found";
      return;
    }

    data.docs.slice(0, 12).forEach(book => {

      const card = document.createElement("article");

      card.classList.add("book-card");

      card.innerHTML = `
        <h2>${book.title}</h2>
        <p><strong>Author:</strong>
        ${book.author_name?.[0] || "Unknown"}</p>

        <p><strong>First Publish:</strong>
        ${book.first_publish_year || "N/A"}</p>
      `;

      results.appendChild(card);

    });

  } catch (error) {

    loading.classList.add("hidden");

    errorMessage.textContent =
      "Something went wrong";

    console.error(error);

  }

}