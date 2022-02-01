function renderLeftPost(index, film, containerClass) {
    return `<div class='left-image-post ${containerClass}'>
                <div class='row'>
                    <div class='col-md-6'>
                        <div class='left-image'>
                            <img src='assets/images/${film.imgPath}' />
                        </div>
                    </div>
                    <div class='col-md-6'>
                        <div class='right-text'>
                            <h4>${film.title}</h4>
                            <p>${film.overview}</p>
                            <p><b>Publisher: &nbsp;</b>${film.distributor}</p>
                            <p><b>Release: &nbsp;</b>${film.releaseYear}</p>
                            <p><b>Subordinate: &nbsp;</b>${film.subordinate}</p>
                            <p><b>Genre: &nbsp;</b>${film.genre}</p>
                            <p><b>Producer: &nbsp;</b>${film.director}</p>
                            <p><b>Director: &nbsp;</b>${film.producer}</p>
                            <p><b>Writer: &nbsp;</b>${film.writer}</p>
                            <p><b>Actor: &nbsp;</b>${film.actor}</p>
                            <div class='white-button' id='filmDelete' data-section='${index}'>
                                <a href='#'>DELETE</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}

function renderRightPost(index, film, containerClass) {
    return `<div class='right-image-post ${containerClass}'>
                <div class='row'>
                    <div class='col-md-6'>
                        <div class='left-text'>
                            <h4>${film.title}</h4>
                            <p>${film.overview}</p>
                            <p><b>Publisher: &nbsp;</b>${film.distributor}</p>
                            <p><b>Release: &nbsp;</b>${film.releaseYear}</p>
                            <p><b>Subordinate: &nbsp;</b>${film.subordinate}</p>
                            <p><b>Genre: &nbsp;</b>${film.genre}</p>
                            <p><b>Producer: &nbsp;</b>${film.director}</p>
                            <p><b>Director: &nbsp;</b>${film.producer}</p>
                            <p><b>Writer: &nbsp;</b>${film.writer}</p>
                            <p><b>Actor: &nbsp;</b>${film.actor}</p>
                            <div class='white-button' id='filmDelete' data-section='${index}'>
                                <a href='#'>DELETE</a>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-6'>
                        <div class='right-image'>
                            <img src='assets/images/${film.imgPath}' />
                        </div>
                    </div>
                </div>
            </div>`;
}

function bindEvents() {

}

function displayAllFilms(films) {
    var filmList = '';
    for (var i=0; i<films.length; i++) {
        var renderFunc = i%2==0 ? renderLeftPost : renderRightPost;
        var film = renderFunc(
            i,
            films[i],
            i!==0 ? 'next-post' : '');

        filmList += film;
    }
    document.getElementById('filmList').innerHTML = filmList;

    bindEvents();
}
