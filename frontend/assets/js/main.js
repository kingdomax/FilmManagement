function fetchBundleResult() {
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

        // update films, person, suggestion film UI, hide backdrop
        setTimeout(() => {
            displayAllFilms(data.films);

            loadingBackdrop.hide();
        }, 1000);
    }).fail(function(xhr, status, errorThrown) {
        document.getElementById('modal-content').innerHTML = `<div class="alert alert-danger d-flex align-items-center" role="alert" style="margin-bottom: 0px;">
                                                                ${status}, ${errorThrown}
                                                              </div>`;
    });
}

$(document).ready(fetchBundleResult());
