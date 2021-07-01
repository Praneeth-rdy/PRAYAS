$('.form-control').change((event) => {
    let input = event.target;
    if (input.checkValidity()) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
    }
});

$("button[data-method='delete']").click(async (event) => {
    var btn = event.target;
    console.log(btn)
    var dataToDelete = btn.getAttribute('data-delete');
    var requestUrl = btn.getAttribute('data-url');
    $(dataToDelete).toggle();
    await sendRequest({
        url: (window.location.origin + requestUrl),
        type: 'delete'
    },
        'Entry successfully deleted!',
        'Oops! An error occured while deleting the entry!',
        '#request-status', '#request-status span'
    );
});

function sendRequest({ url, type, data }, successMsg, failureMsg, statusContainerElement, statusElement) {
    request = $.ajax({
        url,
        type,
        data
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR) {
        // Log a message to the console
        $(statusElement).text(successMsg);
        $(statusContainerElement).removeClass('alert-danger');
        $(statusContainerElement).addClass('alert-success');
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown) {
        // Log the error to the console
        $(statusElement).text(failureMsg);
        $(statusContainerElement).addClass('alert-danger');
        $(statusContainerElement).removeClass('alert-success');
    });

    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        // Reenable the inputs
        toggleFormStatusDisplay('display', statusContainerElement);
    });
}


function toggleFormStatusDisplay(action, statusContainerElement) {
    if (action === 'hide') {
        $(statusContainerElement).removeClass('d-flex');
        $(statusContainerElement).addClass('d-none');
    } else {
        $(statusContainerElement).addClass('d-flex');
        $(statusContainerElement).removeClass('d-none');
    }

}