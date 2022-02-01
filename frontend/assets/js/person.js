function renderPerson(index, person, containerClass) {
    return  `<div class='left-image-post ${containerClass}'>
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
                            <div class='white-button' id='personDelete' data-section='${index}'>
                                <a href='#'>DELETE</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}

function bindPersonEvents() {

}

function renderPersons(persons) {
    var personList = '';
    
    for (var i=0; i<persons.length; i++) {
        var person = renderPerson(i, persons[i], i!==0 ? 'next-post' : '');
        personList += person;
    }
    
    document.getElementById('personList').innerHTML = personList;
    bindPersonEvents();
}
