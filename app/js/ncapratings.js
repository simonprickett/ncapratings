/* ncapratings.js */

var app = {
    API_BASE_URL: 'http://www.nhtsa.gov/webapi/api/SafetyRatings/',
    API_BASE_PARAMS: 'format=json',
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
            url: app.API_BASE_URL + '?' + app.API_BASE_PARAMS
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

        $('#pageContent').html(htmlStr);

        $('#modelYears li').click(function(e) {
                app.onModelYearSelected($(this).attr('id'));
        });
    },

    onModelYearSelected: function(modelYear) {
        $.ajax({
            cache: false,
            dataType: 'jsonp',
            error: function(xhr, status, errorMsg) {
                app.showGeneralError('Failed to load manufacturers for model year ' + modelYear + '!');
            },
            jsonp: 'callback',
            method: 'GET',
            success: app.onManufacturersLoaded,
            url: app.API_BASE_URL + '/modelyear/' + modelYear + '?' + app.API_BASE_PARAMS
        });
    },

    onManufacturersLoaded: function(data, status) {
        var n = 0,
            manufacturer = '',
            modelYear,
            htmlStr = '';


        if (data && data.Results) {
            modelYear = data.Results[0].ModelYear;

            htmlStr += ''
                + '<div class="row">'
                + '    <div class="col-md-12">'
                + '        <h2>Model Year ' + modelYear + ': Select a Manufacturer</h2>'
                + '        <ul class="list-group" id="manufacturers">';

            for (; n < data.Results.length; n++) {
                manufacturer = data.Results[n].Make;
                htmlStr += '            <li class="list-group-item" id="' + manufacturer + '">' + manufacturer + '</li>';
            }

            htmlStr = htmlStr
                + '        </ul>'
                + '    </div>'
                + '</div>';
        }

        $('#pageContent').html(htmlStr);
        $('#manufacturers li').click(function(e) {
                app.onManufacturerSelected($(this).attr('id'), modelYear);
        });      
    },

    onManufacturerSelected: function(manufacturer, modelYear) {
        $.ajax({
            cache: false,
            dataType: 'jsonp',
            error: function(xhr, status, errorMsg) {
                app.showGeneralError('Failed to load vehicle models for manufacturer ' + manufacturer + '!');
            },
            jsonp: 'callback',
            method: 'GET',
            success: app.onModelsLoaded,
            url: app.API_BASE_URL + 'modelyear/' + modelYear + '/make/' + manufacturer + '?' + app.API_BASE_PARAMS
        });
    },

    onModelsLoaded: function(data, status) {
        var n = 0,
            manufacturer = '',
            modelYear,
            htmlStr = '';

        if (data && data.Results) {
            modelYear = data.Results[0].ModelYear;
            manufacturer = data.Results[0].Make;

            htmlStr += ''
                + '<div class="row">'
                + '    <div class="col-md-12">'
                + '        <h2>' + manufacturer + ', Model Year ' + modelYear + ': Select a Vehicle</h2>'
                + '        <ul class="list-group" id="vehicles">';

            for (; n < data.Results.length; n++) {
                vehicle = data.Results[n].Model;
                htmlStr += '            <li class="list-group-item" id="' + vehicle + '">' + vehicle + '</li>';
            }

            htmlStr = htmlStr
                + '        </ul>'
                + '    </div>'
                + '</div>';
        }

        $('#pageContent').html(htmlStr);
        $('#vehicles li').click(function(e) {
                app.onVehicleSelected($(this).attr('id'), modelYear, manufacturer);
        });
    },

    onVehicleSelected: function(vehicle, modelYear, manufacturer) {
        $.ajax({
            cache: false,
            dataType: 'jsonp',
            error: function(xhr, status, errorMsg) {
                app.showGeneralError('Failed to vehicle ' + vehicle + '!');
            },
            jsonp: 'callback',
            method: 'GET',
            success: app.onVehicleLoaded,
            url: app.API_BASE_URL + 'modelyear/' + modelYear + '/make/' + manufacturer + '/model/' + vehicle + '?' + app.API_BASE_PARAMS
        });
    },

    onVehicleLoaded: function(data, status) {
        // TODO
    },

    showGeneralError(errorMsg) {
        alert(errorMsg);
    }
}

window.onload = function() {
  app.initialize();  
};