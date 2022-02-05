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
        var ids = data.suggestionFilms.map(o => o.id);
        var uniqueSuggestionFilms = data.suggestionFilms.filter(({id}, index) => !ids.includes(id, index + 1));
        window.bundleResult = { ...data, suggestionFilms: uniqueSuggestionFilms };
        console.log('data is updated.');
        console.log(window.bundleResult);

        // re-render UI
        setTimeout(() => {
            renderFilms(window.bundleResult.films);
            renderAddFilm(window.bundleResult.films);
            renderPersons(window.bundleResult.persons);
            renderAddPerson(window.bundleResult.films);
            renderSuggestionFilms(window.bundleResult.suggestionFilms);

            bootstrap.Modal.getOrCreateInstance(document.getElementById('loadingModal')).hide();
        }, 1000);
    }).fail(function(xhr, status, errorThrown) {
        document.getElementById('modal-content').innerHTML = `<div class="alert alert-danger d-flex align-items-center" role="alert" style="margin-bottom: 0px;">
                                                                ${status}, ${errorThrown}
                                                              </div>`;
    });
}

function requestToAddFilm(addedFilm) {
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

function requestToAddPerson(addedPerson) {
    $.ajax({
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
        url: `http://localhost:5000/api/film/AddPerson`,
        method: 'POST',
        contentType: 'application/json; charset=utf-8', // type of request object
        data: JSON.stringify(addedPerson),
    }).done(function(data) {
        console.log(`add person status: ${data}`);
        console.log(addedPerson);
        
        document.querySelector('.add-person-form').reset();

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
        data: JSON.stringify(deletedFilm),
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
        data: JSON.stringify(deletedPerson),
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
