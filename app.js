/* ============================================================
   CineVault — app.js
   Beginner-Friendly JavaScript | TMDB API Integration
   Author : Md. Shahid Chowdhury
   GitHub : https://github.com/shahidchowdhurydev
   Email  : engr.mdshahid@gmail.com
   ============================================================

   📌 HOW TO GET YOUR FREE API KEY:
   1. Go to https://www.themoviedb.org/
   2. Create a free account
   3. Go to Settings → API → Request an API Key
   4. Copy your API key and paste it below ↓
   ============================================================ */

// ─── 1. CONFIGURATION ────────────────────────────────────────
const API_KEY  = "3dc0013efba2dba77ecc82621459498c"; // ← Paste your TMDB API key here
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";
const IMG_BACK = "https://image.tmdb.org/t/p/original";

// ─── 2. GRAB HTML ELEMENTS ────────────────────────────────────
// We find elements by their ID so we can read/change them
const moviesGrid    = document.getElementById("moviesGrid");
const spinner       = document.getElementById("spinner");
const errorBox      = document.getElementById("errorBox");
const errorMsg      = document.getElementById("errorMsg");
const searchForm    = document.getElementById("searchForm");
const searchInput   = document.getElementById("searchInput");
const sectionTitle  = document.getElementById("sectionTitle");
const resultCount   = document.getElementById("resultCount");
const loadMoreWrap  = document.getElementById("loadMoreWrap");
const loadMoreBtn   = document.getElementById("loadMoreBtn");
const modalOverlay  = document.getElementById("modalOverlay");
const modalClose    = document.getElementById("modalClose");
const modalInner    = document.getElementById("modalInner");
const heroSection   = document.getElementById("heroSection");
const homeBtn       = document.getElementById("homeBtn");
const filterBtns    = document.querySelectorAll(".filter-btn");

// ─── 3. APP STATE ─────────────────────────────────────────────
// These variables remember what we're currently doing
let currentPage     = 1;   // Which page of results we are on
let currentEndpoint = "popular"; // Which list to show
let currentQuery    = "";  // What the user searched for
let totalPages      = 1;   // How many pages the API has

// ─── 4. UTILITY HELPERS ───────────────────────────────────────

/**
 * showSpinner / hideSpinner
 * Adds/removes the "visible" class to show or hide the loading animation
 */
function showSpinner() { spinner.classList.add("visible"); }
function hideSpinner() { spinner.classList.remove("visible"); }

/**
 * showError — displays a friendly error message
 * @param {string} message — the text to show
 */
function showError(message) {
  errorBox.style.display = "block";
  errorMsg.textContent   = message;
}

/** hideError — hides the error box */
function hideError() { errorBox.style.display = "none"; }

/**
 * getRatingClass — pick a CSS class based on a score
 * @param {number} score — movie rating (0–10)
 * @returns {string} — one of three CSS class names
 */
function getRatingClass(score) {
  if (score >= 7) return "rating-good";   // green
  if (score >= 5) return "rating-mid";    // orange
  return "rating-low";                    // red
}

/**
 * getYear — extract just the year from a date string like "2023-08-15"
 * @param {string} dateStr — a date string
 * @returns {string} — just the year, or "N/A"
 */
function getYear(dateStr) {
  if (!dateStr) return "N/A";
  return dateStr.split("-")[0]; // "2023-08-15" → "2023"
}

/**
 * formatVotes — turn big numbers into readable text
 * 12500 → "12.5K" | 1200000 → "1.2M"
 */
function formatVotes(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

// ─── 5. API FETCH FUNCTION ───────────────────────────────────

/**
 * fetchMovies — the main function that calls the TMDB API
 *
 * @param {string} url    — the full API url to request
 * @param {boolean} append — if true, add cards to grid; if false, replace
 */
async function fetchMovies(url, append = false) {
  // Show loading spinner, hide old errors
  showSpinner();
  hideError();

  // If we're starting fresh (not "load more"), clear the grid
  if (!append) {
    moviesGrid.innerHTML = "";
    loadMoreWrap.style.display = "none";
  }

  try {
    // Call the API using fetch() — a built-in browser function
    const response = await fetch(url);

    // Check if the server gave us a good response (status 200)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Convert the response to a JavaScript object (JSON parsing)
    const data = await response.json();

    // Save how many pages exist so we know when to hide "Load More"
    totalPages = data.total_pages || 1;

    // If no results found
    if (!data.results || data.results.length === 0) {
      showError("No movies found. Try a different search term!");
      return;
    }

    // Show result count
    const total = data.total_results ? data.total_results.toLocaleString() : "";
    resultCount.textContent = total ? `${total} results` : "";

    // Create cards for each movie and add them to the grid
    data.results.forEach(movie => {
      const card = createMovieCard(movie);
      moviesGrid.appendChild(card);
    });

    // Show "Load More" button only if there are more pages
    if (currentPage < totalPages) {
      loadMoreWrap.style.display = "block";
    } else {
      loadMoreWrap.style.display = "none";
    }

  } catch (error) {
    // Something went wrong — show a helpful message
    console.error("Fetch error:", error);

    if (API_KEY === "YOUR_TMDB_API_KEY_HERE") {
      showError("⚠️ Please add your TMDB API key in app.js to see movies.");
    } else {
      showError("Could not load movies. Please check your internet connection.");
    }

  } finally {
    // Always hide the spinner, whether success or error
    hideSpinner();
  }
}

// ─── 6. CREATE A MOVIE CARD ───────────────────────────────────

/**
 * createMovieCard — builds the HTML for one movie card
 *
 * @param {Object} movie — a movie object from the TMDB API
 * @returns {HTMLElement} — a <div> element (the card)
 */
function createMovieCard(movie) {
  // Build the image URL (or use a placeholder if no image exists)
  const posterUrl  = movie.poster_path
    ? IMG_BASE + movie.poster_path
    : null;

  // Format rating to 1 decimal place
  const rating     = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  const ratingClass = getRatingClass(movie.vote_average);
  const year       = getYear(movie.release_date);

  // Create the card element
  const card = document.createElement("div");
  card.classList.add("movie-card");

  // Set the inner HTML structure
  card.innerHTML = `
    <div class="card-poster-wrap">

      ${posterUrl
        ? `<img class="card-poster" src="${posterUrl}" alt="${movie.title}" loading="lazy"/>`
        : `<div class="card-poster-placeholder">
             <i class="fa-solid fa-film"></i>
             <span>No Image</span>
           </div>`
      }

      <!-- Rating badge (top-right corner) -->
      <div class="card-rating">
        <i class="fa-solid fa-star"></i>
        <span class="${ratingClass}">${rating}</span>
      </div>

      <!-- Hover overlay: "View Details" button -->
      <div class="card-overlay">
        <span class="overlay-view">
          <i class="fa-solid fa-circle-play"></i> View Details
        </span>
      </div>

    </div>

    <div class="card-body">
      <h3 class="card-title">${movie.title}</h3>
      <div class="card-meta">
        <span class="card-year">
          <i class="fa-regular fa-calendar"></i> ${year}
        </span>
        <span>${formatVotes(movie.vote_count || 0)} votes</span>
      </div>
    </div>
  `;

  // When someone clicks the card, open the detail modal
  card.addEventListener("click", () => openModal(movie.id));

  return card;
}

// ─── 7. LOAD MOVIES (Popular / Top Rated / Upcoming / Now Playing) ──

/**
 * loadMoviesByCategory
 * Called when the user clicks a filter button
 *
 * @param {string} endpoint — e.g. "popular", "top_rated", "upcoming"
 * @param {boolean} append  — whether to add to existing results
 */
function loadMoviesByCategory(endpoint, append = false) {
  currentQuery    = "";           // Clear any search term
  currentEndpoint = endpoint;

  const url = `${BASE_URL}/movie/${endpoint}?api_key=${API_KEY}&language=en-US&page=${currentPage}`;

  // Update the section title
  const labels = {
    popular:    "🔥 Popular Movies",
    top_rated:  "⭐ Top Rated Movies",
    upcoming:   "🎬 Upcoming Movies",
    now_playing:"🍿 Now Playing"
  };
  sectionTitle.innerHTML = labels[endpoint] || "Movies";

  fetchMovies(url, append);
}

// ─── 8. SEARCH MOVIES ────────────────────────────────────────

/**
 * searchMovies
 * Called when the user submits the search form
 *
 * @param {string} query  — the search text
 * @param {boolean} append — whether to append results
 */
function searchMovies(query, append = false) {
  if (!query.trim()) return; // Don't search if input is empty

  currentQuery = query;
  const url    = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${currentPage}`;

  // Update section title to show what was searched
  sectionTitle.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i> Results for "<em>${query}</em>"`;

  // Hide the hero when searching
  heroSection.style.display = "none";

  // Remove active state from filter buttons (we're searching, not filtering)
  filterBtns.forEach(btn => btn.classList.remove("active"));

  fetchMovies(url, append);
}

// ─── 9. MOVIE DETAIL MODAL ───────────────────────────────────

/**
 * openModal — fetch full movie details and display in a popup
 * @param {number} movieId — the TMDB movie ID
 */
async function openModal(movieId) {
  // Show the modal overlay immediately (empty while loading)
  modalInner.innerHTML = `
    <div style="padding: 60px; text-align: center; color: var(--text-secondary);">
      <div class="spinner" style="margin: 0 auto 16px;"></div>
      <p>Loading details…</p>
    </div>
  `;
  modalOverlay.classList.add("open");
  document.body.style.overflow = "hidden"; // Prevent background scrolling

  try {
    // Fetch detailed movie info
    const url      = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    const response = await fetch(url);
    const movie    = await response.json();

    // Build genre tags from the genres array
    const genreTags = (movie.genres || [])
      .slice(0, 3)
      .map(g => `<span class="badge badge-genre">${g.name}</span>`)
      .join("");

    // Format runtime: 148 mins → "2h 28m"
    const runtime = movie.runtime
      ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
      : "N/A";

    // Format budget / revenue as currency
    const formatMoney = (n) => n && n > 0
      ? "$" + n.toLocaleString()
      : "N/A";

    // Poster and backdrop image URLs
    const posterUrl   = movie.poster_path   ? IMG_BASE + movie.poster_path   : null;
    const backdropUrl = movie.backdrop_path ? IMG_BACK + movie.backdrop_path : null;

    const rating      = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
    const ratingClass = getRatingClass(movie.vote_average);

    // Build the modal HTML
    modalInner.innerHTML = `
      <!-- Backdrop image behind the title -->
      <div class="modal-hero">
        ${backdropUrl
          ? `<img class="modal-backdrop" src="${backdropUrl}" alt="${movie.title}"/>`
          : `<div style="width:100%;height:100%;background:linear-gradient(135deg,#1a1a2e,#16213e);"></div>`
        }
        <div class="modal-hero-overlay">
          ${posterUrl
            ? `<img class="modal-poster" src="${posterUrl}" alt="${movie.title}"/>`
            : ""
          }
          <div class="modal-title-block">
            <h2 class="modal-title">${movie.title}</h2>
            <div class="modal-badges">
              <span class="badge badge-year">${getYear(movie.release_date)}</span>
              <span class="badge badge-rating"><i class="fa-solid fa-star" style="font-size:0.7rem;margin-right:3px;"></i>${rating}</span>
              ${genreTags}
            </div>
          </div>
        </div>
      </div>

      <!-- Text content -->
      <div class="modal-body">
        <p class="modal-overview">
          ${movie.overview || "No description available for this movie."}
        </p>

        <!-- Stats grid -->
        <div class="modal-stats">
          <div class="stat-card">
            <div class="stat-label">Rating</div>
            <div class="stat-value ${ratingClass}">${rating} / 10</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Votes</div>
            <div class="stat-value">${formatVotes(movie.vote_count || 0)}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Runtime</div>
            <div class="stat-value">${runtime}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Status</div>
            <div class="stat-value">${movie.status || "N/A"}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Budget</div>
            <div class="stat-value">${formatMoney(movie.budget)}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Revenue</div>
            <div class="stat-value">${formatMoney(movie.revenue)}</div>
          </div>
        </div>
      </div>
    `;

  } catch (error) {
    modalInner.innerHTML = `
      <div style="padding:60px;text-align:center;color:var(--text-secondary);">
        <i class="fa-solid fa-triangle-exclamation" style="font-size:2rem;color:var(--red);display:block;margin-bottom:14px;"></i>
        <p>Could not load movie details.</p>
      </div>
    `;
  }
}

/** closeModal — hides the modal */
function closeModal() {
  modalOverlay.classList.remove("open");
  document.body.style.overflow = ""; // Restore scrolling
}

// ─── 10. EVENT LISTENERS ─────────────────────────────────────

// Search form submit
searchForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Don't reload the page
  const query = searchInput.value.trim();
  if (query) {
    currentPage = 1;
    searchMovies(query);
    searchInput.value = ""; // Clear the input after searching
  }
});

// Filter buttons (Popular / Top Rated / etc.)
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove("active"));
    // Add active class to the clicked button
    btn.classList.add("active");

    // Show the hero section again
    heroSection.style.display = "";

    // Reset and load
    currentPage = 1;
    loadMoviesByCategory(btn.dataset.filter);
  });
});

// Load More button
loadMoreBtn.addEventListener("click", () => {
  currentPage++; // Go to next page

  if (currentQuery) {
    searchMovies(currentQuery, true);   // Append search results
  } else {
    loadMoviesByCategory(currentEndpoint, true); // Append category results
  }
});

// Close modal when clicking the X button
modalClose.addEventListener("click", closeModal);

// Close modal when clicking the dark overlay behind it
modalOverlay.addEventListener("click", (event) => {
  // Only close if clicking the overlay itself (not the modal content)
  if (event.target === modalOverlay) closeModal();
});

// Close modal with the Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

// Home button — reset to popular movies
homeBtn.addEventListener("click", (event) => {
  event.preventDefault();
  searchInput.value = "";
  currentPage       = 1;
  currentQuery      = "";
  heroSection.style.display = "";

  // Reset filter buttons
  filterBtns.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.filter === "popular");
  });

  loadMoviesByCategory("popular");
});

// ─── 11. INITIAL LOAD ────────────────────────────────────────
// When the page first opens, load popular movies automatically
loadMoviesByCategory("popular");
