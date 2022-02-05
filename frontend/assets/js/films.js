function renderLeftPost(index, film, containerClass) {
    return `<div class='film left-image-post ${containerClass}'>
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
                            ${film.subordinate ? `<p><b>Subordinate: &nbsp;</b>${film.subordinate}</p>` : ''}
                            <p><b>Genre: &nbsp;</b>${film.genre}</p>
                            ${film.director ? `<p><b>Director: &nbsp;</b>${film.director}</p>` : ''}
                            ${film.producer ? `<p><b>Producer: &nbsp;</b>${film.producer}</p>` : ''}
                            ${film.writer ? `<p><b>Writer: &nbsp;</b>${film.writer}</p>` : ''}
                            ${film.actor ? `<p><b>Actor: &nbsp;</b>${film.actor}</p>` : ''}
                            <button type='button' class='btn btn-primary btn-film' data-section='${index}'>EDIT</button>
                            <button type="button" class='btn btn-danger btn-film btn-film-delete' data-section='${index}'>DELETE</button>
                        </div>
                    </div>
                </div>
            </div>`;
}

function renderRightPost(index, film, containerClass) {
    return `<div class='film right-image-post ${containerClass}'>
                <div class='row'>
                    <div class='col-md-6'>
                        <div class='left-text'>
                            <h4>${film.title}</h4>
                            <p>${film.overview}</p>
                            <p><b>Publisher: &nbsp;</b>${film.distributor}</p>
                            <p><b>Release: &nbsp;</b>${film.releaseYear}</p>
                            ${film.subordinate ? `<p><b>Subordinate: &nbsp;</b>${film.subordinate}</p>` : ''}
                            <p><b>Genre: &nbsp;</b>${film.genre}</p>
                            ${film.director ? `<p><b>Director: &nbsp;</b>${film.director}</p>` : ''}
                            ${film.producer ? `<p><b>Producer: &nbsp;</b>${film.producer}</p>` : ''}
                            ${film.writer ? `<p><b>Writer: &nbsp;</b>${film.writer}</p>` : ''}
                            ${film.actor ? `<p><b>Actor: &nbsp;</b>${film.actor}</p>` : ''}
                            <button type='button' class='btn btn-primary btn-film' data-section='${index}'>EDIT</button>
                            <button type="button" class='btn btn-danger btn-film btn-film-delete' data-section='${index}'>DELETE</button>
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

function renderAllFilms(films) {
    var filmList = '';
    for (var i=0; i<films.length; i++) {
        var renderFunc = i%2==0 ? renderLeftPost : renderRightPost;
        var film = renderFunc(i, films[i], i!==0 ? 'next-post' : '');
        filmList += film;
    }
    document.getElementById('filmList').innerHTML = filmList;
}

function bindDeleteFilmEvents() {
    // Delete button on movie list
    $('.film .btn-film-delete').unbind('click');
    $('.film .btn-film-delete').bind('click', function() {
        window.currentFilm = parseInt(this.dataset.section);
        
        var deleteFilmModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('deleteFilmModal'));
        document.querySelector('#deleteFilmModal .modal-body').innerHTML = `Are you sure to remove <b>"${window.bundleResult.films[window.currentFilm].title}"</b> and its related information from the database?`;
        document.querySelector('#deleteFilmModal .btn-secondary').disabled = false;
        document.querySelector('#deleteFilmModal .btn-film-delete').disabled = false;
        
        deleteFilmModal.show();
    });

    // Delete button on modal
    $('#deleteFilmModal .btn-film-delete').unbind('click');
    $('#deleteFilmModal .btn-film-delete').bind('click', function() {
        this.disabled = true;
        document.querySelector('#deleteFilmModal .btn-secondary').disabled = true;
        
        var deletedFilm = window.bundleResult.films[window.currentFilm];
        requestToDeleteFilm({ 
            Title: deletedFilm.title,
            Actor: deletedFilm.actor ? deletedFilm.actor : '',
            Writer: deletedFilm.writer ? deletedFilm.writer : '',
            Director: deletedFilm.director ? deletedFilm.director : '',
            Producer: deletedFilm.producer ? deletedFilm.producer : '',
            Subordinate: deletedFilm.subordinate ? deletedFilm.subordinate : '',
        });
    });
}

function renderFilms(films) {
    renderAllFilms(films);
    bindDeleteFilmEvents();
}
