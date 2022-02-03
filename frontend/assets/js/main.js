function fetchAndUpdateUsername() {
    var username = (new URL(document.location)).searchParams.get("username") || 'admin1';
    
    window.username = username;
    document.getElementById('userName').innerText = username;
    document.getElementById('userAvatar').src = `assets/images/${username}.jpg`;
}

function fetchAndUpdateBundleResult() {
    bootstrap.Modal.getOrCreateInstance(document.getElementById('loadingModal')).show(); // https://getbootstrap.com/docs/5.1/components/modal/

    $.ajax({ // https://api.jquery.com/jquery.ajax/
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
        url: `http://localhost:5000/api/film/Get/${window.username}`,
        method: 'GET',
    }).done(function(data) {
        // update data
        console.log('data is updated');
        console.log(data);
        window.bundleResult = data;

        // re-render UI
        setTimeout(() => {
            renderFilms(data.films);
            renderPersons(data.persons);
            renderSuggestionFilms(data.suggestionFilms);
            bootstrap.Modal.getOrCreateInstance(document.getElementById('loadingModal')).hide();
        }, 1000);
    }).fail(function(xhr, status, errorThrown) {
        document.getElementById('modal-content').innerHTML = `<div class="alert alert-danger d-flex align-items-center" role="alert" style="margin-bottom: 0px;">
                                                                ${status}, ${errorThrown}
                                                              </div>`;
    });
}

function requestToDeleteFilm() {
    var deletedFilm = window.bundleResult.films[window.currentFilm];
    
    $.ajax({
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
        url: `http://localhost:5000/api/film/DeleteFilm`,
        method: 'POST',
        contentType: 'application/json; charset=utf-8', // type of request object
        data: JSON.stringify({ 
            Title: deletedFilm.title,
            Actor: deletedFilm.actor ? deletedFilm.actor : '',
            Writer: deletedFilm.writer ? deletedFilm.writer : '',
            Director: deletedFilm.director ? deletedFilm.director : '',
            Producer: deletedFilm.producer ? deletedFilm.producer : '',
            Subordinate: deletedFilm.subordinate ? deletedFilm.subordinate : '',
        }),
    }).done(function(data) {
        console.log('film is deleted');
        console.log(deletedFilm);
        
        // Hide modal
        bootstrap.Modal.getInstance(document.getElementById('deleteFilmModal')).hide();
        document.querySelector('#deleteFilmModal .btn-secondary').disabled = false;
        document.querySelector('#deleteFilmModal .btn-film-delete').disabled = false;

        // Reload UI again
        fetchAndUpdateBundleResult();
    }).fail(function(xhr, status, errorThrown) {
        document.querySelector('#deleteFilmModal .modal-body').innerHTML = 
        `<div class="alert alert-danger d-flex align-items-center" role="alert" style="margin-bottom: 0px;">
            ${status}, ${errorThrown}
        </div>`;
    });
}

$(document).ready(function() {
    fetchAndUpdateUsername();
    fetchAndUpdateBundleResult();
});
