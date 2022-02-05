function renderSuggestionFilm(suggestionFilm, leftPX, topPX) {
    return  `<div class="isotope-item" style="position: absolute; left: ${leftPX}px; top: ${topPX}px;">
                <figure class="snip1321">
                    <img src="assets/images/${suggestionFilm.imgPath}" alt="sq-sample26" />
                    <figcaption>
                        <a href="assets/images/${suggestionFilm.imgPath}" data-lightbox="image-1" data-title="Caption">
                            <i>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-reels-fill" viewBox="0 0 16 16">
                                    <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                    <path d="M9 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                                    <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7z"/>
                                </svg>
                            </i>
                        </a>
                        <h4>${suggestionFilm.title}</h4>
                        <span><b>Publisher: &nbsp;</b>${suggestionFilm.distributor}</span>
                        <span><b>Release: &nbsp;</b>${suggestionFilm.releaseYear}</span>
                        ${suggestionFilm.subordinate ? `<span><b>Subordinate: &nbsp;</b>${suggestionFilm.subordinate}</span>` : ''}
                        <span><b>Genre: &nbsp;</b>${suggestionFilm.genre}</span>
                        <span><b>Producer: &nbsp;</b>${suggestionFilm.director}</span>
                        <span><b>Director: &nbsp;</b>${suggestionFilm.producer}</span>
                        <span><b>Writer: &nbsp;</b>${suggestionFilm.writer}</span>
                        <span><b>Actor: &nbsp;</b>${suggestionFilm.actor}</span>
                    </figcaption>
                </figure>
            </div>`;
}

function renderSuggestionFilms(suggestionFilms) {
    var films = '';
    
    for (var i=0; i<suggestionFilms.length; i++) { 
        var leftPx = i%2==0 ? 0 : 523;
        var topPx = Math.floor(i/2) * 435;
        films += renderSuggestionFilm(suggestionFilms[i], leftPx, topPx); 
    }
    
    var suggestionList = document.getElementById('suggestionList');
    suggestionList.innerHTML = films;
    suggestionList.setAttribute('style', `position: relative; height: ${Math.ceil(suggestionFilms.length/2)*435}px;`);
}
