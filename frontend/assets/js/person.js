function renderPerson(index, person, containerClass) {
    return  `<div class='person left-image-post ${containerClass}'>
                <div class='row'>
                    <div class='col-md-2'>
                        <div class='left-image'>
                            <img class='person-img' src='assets/images/${person.imgPath}' alt='' />
                        </div>
                    </div>
                    <div class='col-md-10'>
                        <div class='right-text'>
                            <h4>${person.name}</h4>
                            <p><b>Gender: &nbsp;</b>${person.sex}</p>
                            <p><b>Born: &nbsp;</b>${person.dob}</p>
                            <p><b>Roles: &nbsp;</b>${person.roles}</p>
                            <p><b>Films: &nbsp;</b>${person.films}</p>
                            <button type='button' class='btn btn-primary btn-person btn-person-edit' data-section='${index}'>EDIT</button>
                            <button type="button" class='btn btn-danger btn-person btn-person-delete' data-section='${index}'>DELETE</button>
                        </div>
                    </div>
                </div>
            </div>`;
}

function renderAllPersons(persons) {
    var personList = '';
    for (var i=0; i<persons.length; i++) {
        var person = renderPerson(i, persons[i], i!==0 ? 'next-post' : '');
        personList += person;
    }
    document.getElementById('personList').innerHTML = personList;
}

function bindEditPersonEvents() {
    // Edit button on person list
    $('.person .btn-person-edit').unbind('click');
    $('.person .btn-person-edit').bind('click', function() {
        // set data to window object
        window.currentPersonIndex = parseInt(this.dataset.section);
        var currentPerson = window.bundleResult.persons[window.currentPersonIndex];

        // re-render + set films
        var relatedFilms = '';
        for (var i=0; i<window.bundleResult.films.length; i++) {
            var filmName = window.bundleResult.films[i].title;
            var checked = currentPerson.films.includes(filmName) ? 'checked' : '';
            relatedFilms += `<div class="form-check form-check-inline">
                                <input type="checkbox" class="form-check-input edit-person-related-film" value="${filmName}" ${checked}>
                                <label class="form-check-label">${filmName}</label>
                            </div>`;
        }
        document.querySelector('#editPersonRelatedFilms').innerHTML = relatedFilms;

        // set roles
        $('.edit-person-role').prop('checked', false);
        for (var i=0; i<currentPerson.roles.length; i++) { $(`.edit-person-role.${currentPerson.roles[i].replace(' ','-')}`).prop('checked', true); }

        // set dob
        var dob = currentPerson.dob.split('/'); // "MM/DD/YYYY"
        dob[0] = dob[0].length == 1 ? `0${dob[0]}` : dob[0]; 
        dob[1] = dob[1].length == 1 ? `0${dob[1]}` : dob[1]; 
        document.querySelector('#editPersonDob').value = `${dob[2]}-${dob[0]}-${dob[1]}`; // "YYYY-MM-DD"

        // set other values
        document.querySelector('#editPersonName').value = currentPerson.name;
        document.querySelector('#editPersonGender').value = currentPerson.sex;

        // show modal
        document.querySelector('#editPersonModal .modal-title').innerHTML = currentPerson.name;
        document.querySelector('#editPersonModal .btn-secondary').disabled = false;
        document.querySelector('#editPersonModal .btn-person-edit').disabled = false;
        bootstrap.Modal.getOrCreateInstance(document.getElementById('editPersonModal')).show();
    });

    // Edit button on modal
    $('#editPersonModal .btn-person-edit').unbind('click');
    $('#editPersonModal .btn-person-edit').bind('click', function() {
        // Validate input
        var roles = [];
        var films = [];
        $('.edit-person-role:checked').each(function(index, element){ roles.push($(element).val()); });
        $('.edit-person-related-film:checked').each(function(index, element){ films.push($(element).val()); });
        if (!$('.edit-person-form')[0].checkValidity() || films.length == 0 || roles.length == 0 ) { return; } 
        
        this.disabled = true;
        document.querySelector('#editPersonModal .btn-secondary').disabled = true;
        
        var dob = new Date(document.querySelector('#editPersonDob').value);
        window.editedPersonId = window.bundleResult.persons[window.currentPersonIndex].id;
        requestToEditPerson({ 
            Id: window.editedPersonId,
            Name: document.querySelector('#editPersonName').value,
            Dob: `${dob.getMonth()+1}/${dob.getDate()}/${dob.getFullYear()}`,
            Sex: document.querySelector('#editPersonGender').value,
            Roles: roles,
            Films: films,
        });
    });
}

function bindDeletePersonEvents() {
    // Delete button on person
    $('.person .btn-person-delete').unbind('click');
    $('.person .btn-person-delete').bind('click', function() {
        window.currentPersonIndex = parseInt(this.dataset.section);
        var currentPerson = window.bundleResult.persons[window.currentPersonIndex];
        
        document.querySelector('#deletePersonModal .modal-body').innerHTML = `Are you sure to remove <b>"${currentPerson.name}"</b> and its related information from the database?`;
        
        document.querySelector('#deletePersonModal .btn-secondary').disabled = false;
        document.querySelector('#deletePersonModal .btn-person-delete').disabled = false;
        bootstrap.Modal.getOrCreateInstance(document.getElementById('deletePersonModal')).show();
    });

    // Delete button on modal
    $('#deletePersonModal .btn-person-delete').unbind('click');
    $('#deletePersonModal .btn-person-delete').bind('click', function() {
        this.disabled = true;
        document.querySelector('#deletePersonModal .btn-secondary').disabled = true;

        var deletedPerson = window.bundleResult.persons[window.currentPersonIndex];
        requestToDeletePerson({ 
            Name: deletedPerson.name,
            Films: deletedPerson.films,
        });
    });
}

function renderPersons(persons) {
    renderAllPersons(persons);
    bindEditPersonEvents();
    bindDeletePersonEvents();
}
