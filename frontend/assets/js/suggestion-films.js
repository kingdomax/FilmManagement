function renderSuggestionFilm(suggestionFilm, leftPX, topPX) {
    return  `<div class="isotope-item" style="position: absolute; left: ${leftPX}px; top: ${topPX}px;">
                <figure class="snip1321">
                    <img src="assets/images/${suggestionFilm.imgPath}" alt="sq-sample26" />
                    <figcaption>
                        <a href="assets/images/${suggestionFilm.imgPath}" data-lightbox="image-1" data-title="Caption">
                            <i class="fa fa-search"></i>
                        </a>
                        <h4>${suggestionFilm.title}</h4>
                        <span><b>Publisher: &nbsp;</b>${suggestionFilm.distributor}</span>
                        <span><b>Release: &nbsp;</b>${suggestionFilm.releaseYear}</span>
                        <span><b>Subordinate: &nbsp;</b>${suggestionFilm.subordinate}</span>
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
