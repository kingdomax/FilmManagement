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
                            <button type='button' class='btn btn-primary btn-person' data-section='${index}'>EDIT</button>
                            <button type="button" class='btn btn-danger btn-person btn-person-delete' data-section='${index}'>DELETE</button>
                        </div>
                    </div>
                </div>
            </div>`;
}

function bindDeletePersonEvents() {
    // Delete button on person
    $('.person .btn-person-delete').unbind('click');
    $('.person .btn-person-delete').bind('click', function() {
        window.currentPerson = parseInt(this.dataset.section);
        
        var deletePersonModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('deletePersonModal'));
        document.querySelector('#deletePersonModal .modal-body').innerHTML = `Are you sure to remove <b>"${window.bundleResult.persons[window.currentPerson].name}"</b> and its related information from the database?`;
        deletePersonModal.show();
    });

    // Delete button on modal
    $('#deletePersonModal .btn-person-delete').unbind('click');
    $('#deletePersonModal .btn-person-delete').bind('click', function() {
        this.disabled = true;
        document.querySelector('#deletePersonModal .btn-secondary').disabled = true;
        requestToDeletePerson();
    });
}

function renderPersons(persons) {
    var personList = '';
    for (var i=0; i<persons.length; i++) {
        var person = renderPerson(i, persons[i], i!==0 ? 'next-post' : '');
        personList += person;
    }
    document.getElementById('personList').innerHTML = personList;

    bindDeletePersonEvents();
}
