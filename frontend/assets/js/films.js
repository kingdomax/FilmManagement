function renderStar(rating) {
    return rating == 0 ? '' : 
    `<span class='badge bg-warning text-dark'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" style="vertical-align:unset;">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
        &nbsp;${rating}
    </span>`;
}

function renderSubordinate(index, subordinate) {
    return !subordinate ? '' : 
    `<p>
        <button class="btn btn-success" type="button" data-bs-toggle="collapse" data-bs-target="#sub-${index}" style="text-transform:unset;padding:5px 6px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
            &nbsp;subordinate
        </button>
    </p>
    <div class="collapse collapse-horizontal" id="sub-${index}">
        <div class="card card-body card-subordinate">${subordinate}</div>
    </div>
    `;
}

function renderLeftPost(index, film, containerClass) {
    return `<div class='film left-image-post ${containerClass}'>
                <div class='row'>
                    <div class='col-md-6' style='text-align:center;'>
                        <div class='left-image'>
                            <img src='assets/images/${film.imgPath}' />
                        </div>
                        ${renderSubordinate(index, film.subordinate)}
                    </div>
                    <div class='col-md-6'>
                        <div class='right-text'>
                            <h4>${film.title} &nbsp;${renderStar(film.rating)}</h4>
                            <p>${film.overview}</p>
                            <p><b>Publisher: &nbsp;</b>${film.distributor}</p>
                            <p><b>Release: &nbsp;</b>${film.releaseYear}</p>
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
                            <h4>${film.title} &nbsp;${renderStar(film.rating)}</h4>
                            <p>${film.overview}</p>
                            <p><b>Publisher: &nbsp;</b>${film.distributor}</p>
                            <p><b>Release: &nbsp;</b>${film.releaseYear}</p>
                            <p><b>Genre: &nbsp;</b>${film.genre}</p>
                            ${film.director ? `<p><b>Director: &nbsp;</b>${film.director}</p>` : ''}
                            ${film.producer ? `<p><b>Producer: &nbsp;</b>${film.producer}</p>` : ''}
                            ${film.writer ? `<p><b>Writer: &nbsp;</b>${film.writer}</p>` : ''}
                            ${film.actor ? `<p><b>Actor: &nbsp;</b>${film.actor}</p>` : ''}
                            <button type='button' class='btn btn-primary btn-film' data-section='${index}'>EDIT</button>
                            <button type="button" class='btn btn-danger btn-film btn-film-delete' data-section='${index}'>DELETE</button>
                        </div>
                    </div>
                    <div class='col-md-6' style='text-align:center;'>
                        <div class='right-image'>
                            <img src='assets/images/${film.imgPath}' />
                            ${renderSubordinate(index, film.subordinate)}
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
