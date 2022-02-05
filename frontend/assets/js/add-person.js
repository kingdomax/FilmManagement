function updatePersonRelatedFilms(films) {
    var relatedFilms = '';
    for (var i=0; i<films.length; i++) {
        var filmName = films[i].title;
        relatedFilms += `<div class="form-check form-check-inline">
                            <input type="checkbox" class="form-check-input input-person-related-film" value="${filmName}">
                            <label class="form-check-label">${filmName}</label>
                        </div>`;
    }
    document.getElementById('personRelatedFilms').innerHTML = relatedFilms;
}

function bindAddPersonEvents() {
    $('#addPersonBtn').unbind('click');
    $('#addPersonBtn').bind('click', function() {
        var roles = [];
        var relatedFilms = [];
        var dob = new Date(document.getElementById('personDob').value);
        $('.input-person-role:checked').each(function(index, element){ roles.push($(element).val()); });
        $('.input-person-related-film:checked').each(function(index, element){ relatedFilms.push($(element).val()); });

        if (!$('.add-person-form')[0].checkValidity() || roles.length==0 || relatedFilms.length==0) { return; } // If form is not valid, do nothing

        bootstrap.Modal.getOrCreateInstance(document.getElementById('loadingModal')).show();
        requestToAddPerson({
            Name: document.getElementById('personName').value,
            Dob: `${dob.getDate()}/${dob.getMonth()+1}/${dob.getFullYear()}`,
            Sex: document.getElementById('personGender').value,
            Roles: roles,
            Films: relatedFilms,
        });
    });
}

function renderAddPerson(films) {
    updatePersonRelatedFilms(films);
    bindAddPersonEvents();
}
