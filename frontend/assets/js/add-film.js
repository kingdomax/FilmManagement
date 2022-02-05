function updateSubordinateOptions(films) {
    var options = '<option value="" selected>Subordinate (optional)</option>';
    for (var i=0; i<films.length; i++) {
        var filmName = films[i].title;
        options += `<option value="${filmName}">${filmName}</option>`;
    }
    document.getElementById('filmSubordinateOptions').innerHTML = options;
}

function bindAddFilmEvents() {
    $('#addFilmBtn').unbind('click');
    $('#addFilmBtn').bind('click', function() {
        var genre = [];
        var releaseYear = parseInt(document.getElementById('filmReleased').value);
        $('.input-film-genre:checked').each(function(index, element){ genre.push($(element).val()); });

        if (!$('.add-film-form')[0].checkValidity() || genre.length == 0 || !releaseYear) { return; } // If form is not valid

        bootstrap.Modal.getOrCreateInstance(document.getElementById('loadingModal')).show();
        requestToAddFilm({
            Title: document.getElementById('filmTitle').value,
            ReleaseYear: releaseYear,
            Subordinate: document.getElementById('filmSubordinateOptions').value,
            Genre: genre,
            Distributor: document.getElementById('filmDistributor').value,
            Overview: document.getElementById('filmOverview').value,
        });
    });
}

function renderAddFilm(films) {
    updateSubordinateOptions(films);
    bindAddFilmEvents();
}
