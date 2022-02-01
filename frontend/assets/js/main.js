function fetchAndUpdateUsername() {
    var username = (new URL(document.location)).searchParams.get("username") || 'admin1';
    
    window.username = username;
    document.getElementById('userName').innerText = username;
    $("#userAvatar").attr('src', `assets/images/${username}.jpg`);
}

function fetchAndUpdateBundleResult() {
    // https://getbootstrap.com/docs/5.1/components/modal/
    var loadingBackdrop = new bootstrap.Modal(document.getElementById('loadingBackdrop'), { keyboard: false });
    loadingBackdrop.show();

    // https://api.jquery.com/jquery.ajax/
    $.ajax({
        url: 'http://localhost:5000/api/film',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
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
            // render all persons
            // render all suggestion

            // binding add film event
            // binding add person event

            loadingBackdrop.hide();
        }, 1000);
    }).fail(function(xhr, status, errorThrown) {
        document.getElementById('modal-content').innerHTML = `<div class="alert alert-danger d-flex align-items-center" role="alert" style="margin-bottom: 0px;">
                                                                ${status}, ${errorThrown}
                                                              </div>`;
    });
}

$(document).ready(function() {
    fetchAndUpdateUsername();
    fetchAndUpdateBundleResult();
});
