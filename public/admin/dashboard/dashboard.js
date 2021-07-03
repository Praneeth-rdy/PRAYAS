const statusElement = '#request-status span';
const statusContainerElement = '#request-status';


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
    var dataToDelete = btn.getAttribute('element-delete');
    var requestUrl = btn.getAttribute('data-url');
    $(dataToDelete).toggle();
    await sendRequest({
        url: (window.location.origin + requestUrl),
        type: 'delete'
    }, () => {
        $(statusElement).text('Entry successfully deleted!');
        $(statusContainerElement).removeClass('alert-danger');
        $(statusContainerElement).addClass('alert-success');
    }, () => {
        $(statusElement).text('Oops! An error occured while deleting the entry!');
        $(statusContainerElement).addClass('alert-danger');
        $(statusContainerElement).removeClass('alert-success');
    }, () => toggleFormStatusDisplay('display', statusContainerElement));
});

(function ($) {
 
    $.fn.serialize = function (options) {
        return $.param(this.serializeArray(options));
    };

    $.fn.serializeArray = function (options) {
        var o = $.extend({
        checkboxesAsBools: false
    }, options || {});

    var rselectTextarea = /select|textarea/i;
    var rinput = /text|hidden|password|search/i;

    return this.map(function () {
        return this.elements ? $.makeArray(this.elements) : this;
    })
    .filter(function () {
        return this.name && !this.disabled &&
            (this.checked
            || (o.checkboxesAsBools && this.type === 'checkbox')
            || rselectTextarea.test(this.nodeName)
            || rinput.test(this.type));
        })
        .map(function (i, elem) {
            var val = $(this).val();
            return val == null ?
            null :
            $.isArray(val) ?
            $.map(val, function (val, i) {
                return { name: elem.name, value: val };
            }) :
            {
                name: elem.name,
                value: (o.checkboxesAsBools && this.type === 'checkbox') ? //moar ternaries!
                       (this.checked ? 'true' : 'false') :
                       val
            };
        }).get();
    };

})(jQuery);

$("button[data-method='put']").click(async (event) => {
    var btn = event.target;
    var formToSubmit = btn.getAttribute('data-form');
    var requestUrl = btn.getAttribute('data-url');
    await sendRequest({
        url: (window.location.origin + requestUrl),
        type: 'put',
        data: $(formToSubmit).serialize({
            checkboxesAsBools: true
        })
    }, () => {
        window.location.href = window.location.origin + btn.getAttribute('success-redirect');
    }, () => {
        $(statusElement).text('Oops! An error occured while updating the entry!');
        $(statusContainerElement).addClass('alert-danger');
        $(statusContainerElement).removeClass('alert-success');
        toggleFormStatusDisplay('display', statusContainerElement);
    });
});

$("button[data-method='post']").click(async (event) => {
    var btn = event.target;
    var formToSubmit = btn.getAttribute('data-form');
    await sendRequest({
        url: (window.location.href),
        type: 'post',
        data: $(formToSubmit).serialize({
            checkboxesAsBools: true
        })
    }, () => {}, () => {
        $(statusElement).text('Oops! An error occured while updating the entry!');
        $(statusContainerElement).addClass('alert-danger');
        $(statusContainerElement).removeClass('alert-success');
        toggleFormStatusDisplay('display', statusContainerElement);
    });
    window.location.reload(true);
});

function sendRequest({ url, type, data }, successCallBack, failureCallBack, alwaysCallBack) {
    request = $.ajax({
        url,
        type,
        data
    });

    // Callback handler that will be called on success
    request.done(successCallBack);

    // Callback handler that will be called on failure
    request.fail(failureCallBack);

    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(alwaysCallBack);
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