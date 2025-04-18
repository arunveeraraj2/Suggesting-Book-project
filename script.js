async function suggestBooks() {
    const journal = document.getElementById('journalSelect').value;
    const mood = document.getElementById('moodSelect').value;
  
    if (journal === "" || mood === "") {
      alert("Please select both a genre and your mood!");
      return;
    }
  
    const searchQuery = `${journal} ${mood} books`;
  
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&maxResults=10`);
      const data = await response.json();
  
      const booksContainer = document.getElementById('booksContainer');
      booksContainer.innerHTML = "";
  
      // 🔥 Updated this check
      if (!data.items || data.items.length === 0) {
        booksContainer.innerHTML = "<p style='color:white; font-size:20px; text-align:center;'>No books available for your mood. 😔</p>";
        return;
      }
  
      // If books are available, show normally
      data.items.forEach(book => {
        const info = book.volumeInfo;
  
        const title = info.title || "Title not available";
        const authors = info.authors ? info.authors.join(", ") : "Author not available";
        const description = info.description ? info.description.substring(0, 150) + "..." : "No description available.";
        const link = info.infoLink || "#";
  
        const bookCard = document.createElement('div');
        bookCard.className = "book-card";
        bookCard.innerHTML = `
          <h3>${title}</h3>
          <p><strong>Author:</strong> ${authors}</p>
          <p><strong>Summary:</strong> ${description}</p>
          <p><strong>Journal:</strong> ${journal}</p>
          <p><strong>Mood:</strong> ${mood}</p>
          <a class="book-link" href="${link}" target="_blank">📖 View Book</a>
        `;
  
        booksContainer.appendChild(bookCard);
      });
  
    } catch (error) {
      console.error('Error fetching books:', error);
      alert("Something went wrong. Please try again later.");
    }
  }
  