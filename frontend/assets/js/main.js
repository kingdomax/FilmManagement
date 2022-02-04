function fetchAndUpdateUsername() {
    var username = (new URL(document.location)).searchParams.get("username") || 'admin1';
    
    window.username = username;
    document.getElementById('userName').innerText = username;
    document.getElementById('userAvatar').src = `assets/images/${username}.jpg`;
}

function fetchAndUpdateBundleResult() {
    // https://getbootstrap.com/docs/5.1/components/modal/
    bootstrap.Modal.getOrCreateInstance(document.getElementById('loadingModal')).show();

    // https://api.jquery.com/jquery.ajax/
    $.ajax({
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
        url: `http://localhost:5000/api/film/Get/${window.username}`,
        method: 'GET',
    }).done(function(data) {
        // update data
        console.log('data is updated.');
        console.log(data);
        window.bundleResult = data;

        // re-render UI
        setTimeout(() => {
            renderFilms(data.films);
            renderAddFilm(data.films);
            renderPersons(data.persons);
            renderAddPerson();
            renderSuggestionFilms(data.suggestionFilms);

            bootstrap.Modal.getOrCreateInstance(document.getElementById('loadingModal')).hide();
        }, 1000);
    }).fail(function(xhr, status, errorThrown) {
        document.getElementById('modal-content').innerHTML = `<div class="alert alert-danger d-flex align-items-center" role="alert" style="margin-bottom: 0px;">
                                                                ${status}, ${errorThrown}
                                                              </div>`;
    });
}

function requestToAddFilm(addedFilm) {
    bootstrap.Modal.getOrCreateInstance(document.getElementById('loadingModal')).show();
    
    $.ajax({
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
        url: `http://localhost:5000/api/film/AddFilm`,
        method: 'POST',
        contentType: 'application/json; charset=utf-8', // type of request object
        data: JSON.stringify(addedFilm),
    }).done(function(data) {
        console.log(`add film status: ${data}`);
        console.log(addedFilm);
        
        document.querySelector('.add-film-form').reset();

        fetchAndUpdateBundleResult();
    }).fail(function(xhr, status, errorThrown) {
        document.getElementById('modal-content').innerHTML = `<div class="alert alert-danger d-flex align-items-center" role="alert" style="margin-bottom: 0px;">
                                                                ${status}, ${errorThrown}
                                                              </div>`;
    });
}

function requestToDeleteFilm(deletedFilm) {
    $.ajax({
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
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
        console.log(`delete film status: ${data}`);
        console.log(deletedFilm);
        
        // Hide message modal
        bootstrap.Modal.getInstance(document.getElementById('deleteFilmModal')).hide();

        fetchAndUpdateBundleResult();
    }).fail(function(xhr, status, errorThrown) {
        document.querySelector('#deleteFilmModal .modal-body').innerHTML = `<div class="alert alert-danger d-flex align-items-center" role="alert" style="margin-bottom: 0px;">
                                                                                ${status}, ${errorThrown}
                                                                            </div>`;
    });
}

function requestToDeletePerson(deletedPerson) {
    $.ajax({
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
        url: `http://localhost:5000/api/film/DeletePerson`,
        method: 'POST',
        contentType: 'application/json; charset=utf-8', // type of request object
        data: JSON.stringify({ 
            Name: deletedPerson.name,
            Films: deletedPerson.films,
        }),
    }).done(function(data) {
        console.log(`delete person status: ${data}`);
        console.log(deletedPerson);
        
        // Hide message modal
        bootstrap.Modal.getInstance(document.getElementById('deletePersonModal')).hide();

        fetchAndUpdateBundleResult();
    }).fail(function(xhr, status, errorThrown) {
        document.querySelector('#deletePersonModal .modal-body').innerHTML = `<div class="alert alert-danger d-flex align-items-center" role="alert" style="margin-bottom: 0px;">
                                                                                ${status}, ${errorThrown}
                                                                              </div>`;
    });
}

$(document).ready(function() {
    fetchAndUpdateUsername();
    fetchAndUpdateBundleResult();
});
