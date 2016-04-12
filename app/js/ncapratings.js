/* ncapratings.js */

var app = {
    API_BASE_URL: 'http://www.nhtsa.gov/webapi/api/SafetyRatings/?format=json',
    selectedModelYear: 0,
    selectedManufacturer: '',

    initialize: function() {
        app.displayModelYears();
    },

    displayModelYears: function() {
        $.ajax({
            cache: false,
            dataType: 'jsonp',
            error: function(xhr, status, errorMsg) {
                app.showGeneralError('Failed to load model year data!');
            },
            jsonp: 'callback',
            method: 'GET',
            success: app.onModelYearsLoaded,
            url: app.API_BASE_URL
        });
    },

    onModelYearsLoaded: function(data, status) {
        var n = 0,
            modelYear,
            htmlStr = '' 
                + '<div class="row">'
                + '    <div class="col-md-12">'
                + '        <h2>Select a Model Year</h2>'
                + '        <ul class="list-group" id="modelYears">';

        if (data && data.Results) {
            for (; n < data.Results.length; n++) {
                modelYear = data.Results[n].ModelYear;
                htmlStr += '            <li class="list-group-item" id="' + modelYear + '">' + modelYear + '</li>';
            }
        }

        htmlStr = htmlStr
            + '        </ul>'
            + '    </div>'
            + '</div>';
        console.log(data);
        $('#pageContent').html(htmlStr);

        $('#modelYears li').click(function(e) {
                app.onModelYearSelected($(this).attr('id'));
        });
    },

    onModelYearSelected: function(modelYear) {
        // TODO get manufacturers for model year
        alert('selected ' + modelYear);
        app.selectedModelYear = modelYear;
    },

    onManufacturersLoaded: function() {
        // TODO
    },

    onManufacturerSelected: function() {
        // TODO
    },

    onModelsLoaded: function() {
        // TODO
    },

    onModelSelected: function() {
        // TODO
    },

    showGeneralError(errorMsg) {
        alert(errorMsg);
    }
}

window.onload = function() {
  app.initialize();  
};