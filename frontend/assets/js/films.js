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
                            <button type='button' class='btn btn-primary btn-film btn-film-edit' data-section='${index}'>EDIT</button>
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
                            <button type='button' class='btn btn-primary btn-film btn-film-edit' data-section='${index}'>EDIT</button>
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

function bindEditFilmEvents() {
    // Rating label
    $('#editFilmRating').unbind('input');
    $('#editFilmRating').bind('input', function() { document.getElementById('editFilmRatingLabel').innerHTML = `Rating ${$(this).val()}`; });
    
    // Edit button on film list
    $('.film .btn-film-edit').unbind('click');
    $('.film .btn-film-edit').bind('click', function() {
        // set data to window object
        window.currentFilmIndex = parseInt(this.dataset.section);
        var currentFilm = window.bundleResult.films[window.currentFilmIndex];

        // re-render rating
        document.querySelector('#editFilmRatingLabel').innerHTML = `Rating ${currentFilm.rating}`;

        // re-render subordinate options
        var allFilmsExceptMe = window.bundleResult.films.filter((film) => film.id != currentFilm.id);
        var options = 'option value="" selected> </option>';
        for (var i=0; i<allFilmsExceptMe.length; i++) {
            var opt = allFilmsExceptMe[i].title;
            options += `<option value="${opt}">${opt}</option>`;
        }
        document.querySelector('#editFilmSubordinateOptions').innerHTML = options;

        // set genre
        $('.edit-film-genre').prop('checked', false);
        for (var i=0; i<currentFilm.genre.length; i++) { $(`.edit-film-genre.${currentFilm.genre[i]}`).prop('checked', true); }

        // set other values
        document.querySelector('#editFilmTitle').value = currentFilm.title;
        document.querySelector('#editFilmRating').value = currentFilm.rating;
        document.querySelector('#editFilmDistributor').value = currentFilm.distributor;
        document.querySelector('#editFilmReleased').value = currentFilm.releaseYear;
        document.querySelector('#editFilmSubordinateOptions').value = currentFilm.subordinate;
        document.querySelector('#editFilmOverview').value = currentFilm.overview;
        
        // show modal
        document.querySelector('#editFilmModal .modal-title').innerHTML = currentFilm.title;
        document.querySelector('#editFilmModal .btn-secondary').disabled = false;
        document.querySelector('#editFilmModal .btn-film-edit').disabled = false;
        bootstrap.Modal.getOrCreateInstance(document.getElementById('editFilmModal')).show();
    });

    // Edit button on modal
    $('#editFilmModal .btn-film-edit').unbind('click');
    $('#editFilmModal .btn-film-edit').bind('click', function() {
        // Validate input
        var genre = [];
        var rating = parseInt(document.querySelector('#editFilmRating').value);
        var releaseYear = parseInt(document.getElementById('editFilmReleased').value);
        $('.edit-film-genre:checked').each(function(index, element){ genre.push($(element).val()); });
        if (!$('.edit-film-form')[0].checkValidity() || genre.length == 0 || !releaseYear) { return; } 
        
        this.disabled = true;
        document.querySelector('#editFilmModal .btn-secondary').disabled = true;
        
        window.editedFilmId = window.bundleResult.films[window.currentFilmIndex].id;
        requestToEditFilm({ 
            Id: window.editedFilmId,
            Title: document.querySelector('#editFilmTitle').value,
            ReleaseYear: releaseYear,
            Subordinate: document.querySelector('#editFilmSubordinateOptions').value,
            Genre: genre,
            Distributor: document.querySelector('#editFilmDistributor').value,
            Overview: document.querySelector('#editFilmOverview').value,
            Rating: rating,
            Username: window.bundleResult.films[window.currentFilmIndex].rating != rating ? [window.username] : [], // send only when user edit rating
        });
    });
}

function bindDeleteFilmEvents() {
    // Delete button on film list
    $('.film .btn-film-delete').unbind('click');
    $('.film .btn-film-delete').bind('click', function() {
        window.currentFilmIndex = parseInt(this.dataset.section);
        var currentFilm = window.bundleResult.films[window.currentFilmIndex];
        
        document.querySelector('#deleteFilmModal .modal-body').innerHTML = `Are you sure to remove <b>"${currentFilm.title}"</b> and its related information from the database?`;

        document.querySelector('#deleteFilmModal .btn-secondary').disabled = false;
        document.querySelector('#deleteFilmModal .btn-film-delete').disabled = false;
        bootstrap.Modal.getOrCreateInstance(document.getElementById('deleteFilmModal')).show();
    });

    // Delete button on modal
    $('#deleteFilmModal .btn-film-delete').unbind('click');
    $('#deleteFilmModal .btn-film-delete').bind('click', function() {
        this.disabled = true;
        document.querySelector('#deleteFilmModal .btn-secondary').disabled = true;
        
        var deletedFilm = window.bundleResult.films[window.currentFilmIndex];
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
    bindEditFilmEvents();
    bindDeleteFilmEvents();
}
