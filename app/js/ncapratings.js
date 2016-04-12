/* ncapratings.js */

var app = {
    API_BASE_URL: 'http://www.nhtsa.gov/webapi/api/SafetyRatings/',
    API_BASE_PARAMS: 'format=json',
    API_JSONP_CALLBACK: 'callback',
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
            jsonp: app.API_JSONP_CALLBACK,
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
                + '        <h3>Select Model Year</h3>'
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
            jsonp: app.API_JSONP_CALLBACK,
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
            $('#navButtons').show();

            modelYear = data.Results[0].ModelYear;

            htmlStr += ''
                + '<div class="row">'
                + '    <div class="col-md-12">'
                + '        <h3>' + modelYear + '</h3>'
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
            jsonp: app.API_JSONP_CALLBACK,
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
                + '        <h3>' + modelYear + ' ' + manufacturer + '</h3>'
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
                app.showGeneralError('Failed to load vehicle ' + vehicle + '!');
            },
            jsonp: app.API_JSONP_CALLBACK,
            method: 'GET',
            success: app.onVehicleLoaded,
            url: app.API_BASE_URL + 'modelyear/' + modelYear + '/make/' + manufacturer + '/model/' + vehicle + '?' + app.API_BASE_PARAMS
        });
    },

    onVehicleLoaded: function(data, status) {
        var vehicleId = '';

        // Nothing to display yet as we have to use VehicleId from data
        // to get details...

        if (data && data.Results) {
            vehicleId = data.Results[0].VehicleId;

            $.ajax({
                cache: false,
                dataType: 'jsonp',
                error: function(xhr, status, errorMsg) {
                    app.showGeneralError('Failed to load vehicle details for ' + data.Results[0].VehicleDescription);
                },
                jsonp: app.API_JSONP_CALLBACK,
                method: 'GET',
                success: app.onVehicleDetailLoaded,
                url: app.API_BASE_URL + 'VehicleId/' + vehicleId + '?' + app.API_BASE_PARAMS 
            });
        }
    },

    onVehicleDetailLoaded: function(data, status) {
        var vehicleDetails = undefined,
            numRecalls = 0,
            htmlStr = '';

        if (data && data.Results && data.Results.length === 1) {
            vehicleDetails = data.Results[0];

            htmlStr += '<div class="row">';
            htmlStr += '  <div class="col-md-12">';
            htmlStr += '    <h3>' + vehicleDetails.ModelYear + ' ' + vehicleDetails.Make + ' ' + vehicleDetails.Model + '</h3>';
            htmlStr += '  </div>';
            htmlStr += '</div>';

            if (vehicleDetails.VehiclePicture) {
                htmlStr += '<div class="row">';
                htmlStr += '  <div class="col-md-12">';
                htmlStr += '    <img alt="Car Image" class="img-responsive" src="' + vehicleDetails.VehiclePicture + '">';
                htmlStr += '  </div>';
                htmlStr += '</div>';
            }

            htmlStr += '<br/>';

            // Star Ratings

            htmlStr += '<div class="panel panel-primary">';
            htmlStr += '  <div class="panel-heading">';
            htmlStr += '    <h3 class="panel-title">Star Ratings</h3>';
            htmlStr += '  </div>';
            htmlStr += '  <div class="panel-body">';
            htmlStr += '    <table class="table">';
            htmlStr += '      <tbody>';
            htmlStr += '        <tr>';
            htmlStr += '          <td><strong>Overall</strong></td><td>' + app.generateStarRating(vehicleDetails.OverallRating) + '</td>';
            htmlStr += '        </tr>';
            htmlStr += '        <tr>';
            htmlStr += '          <td><strong>Front Crash</strong></td><td>' + app.generateStarRating(vehicleDetails.OverallFrontCrashRating) + '</td>';            
            htmlStr += '        </tr>';
            htmlStr += '        <tr>';
            htmlStr += '          <td><strong>Side Crash</strong></td><td>' + app.generateStarRating(vehicleDetails.OverallSideCrashRating) + '</td>';            
            htmlStr += '        </tr>';
            htmlStr += '        <tr>';
            htmlStr += '          <td><strong>Side Pole Crash</strong></td><td>' + app.generateStarRating(vehicleDetails.SidePoleCrashRating) + '</td>';
            htmlStr += '        </tr>';
            htmlStr += '        <tr>';
            htmlStr += '          <td><strong>Rollover</strong></td><td>' + app.generateStarRating(vehicleDetails.RolloverRating) + '</td>';
            htmlStr += '        </tr>';
            htmlStr += '      </tbody>';
            htmlStr += '    </table>';
            htmlStr += '  </div>';
            htmlStr += '</div>';

            // Images

            htmlStr += '<div class="panel panel-primary">';
            htmlStr += '  <div class="panel-heading">';
            htmlStr += '    <h3 class="panel-title">Crash Test Pictures</h3>';
            htmlStr += '  </div>';
            htmlStr += '  <div class="panel-body">';
            if (vehicleDetails.FrontCrashPicture) {
                htmlStr += '<img alt="Front Crash Image" class="img-responsive crash-image center-block" src="' + vehicleDetails.FrontCrashPicture + '">';
            } else {
                htmlStr += '<p class="text-center">Front crash image unavailable.</p>';
            }

            if (vehicleDetails.SideCrashPicture) {
                htmlStr += '<img alt="Side Crash Image" class="img-responsive crash-image center-block" src="' + vehicleDetails.SideCrashPicture + '">';
            } else {
                htmlStr += '<p class="text-center">Side crash image unavailable.</p>';
            }

            if (vehicleDetails.SidePolePicture) {
                htmlStr += '<img alt="Side Pole Crash Image" class="img-responsive crash-image center-block" src="' + vehicleDetails.SidePolePicture + '">';
            } else {
                htmlStr += '<p class="text-center">Side pole crash image unavailable.</p>';
            }

            htmlStr += '  </div>';
            htmlStr += '</div>';
            // Recalls
            numRecalls = vehicleDetails.RecallsCount;

            htmlStr += '<div class="panel ' + (numRecalls === 0 ? 'panel-primary' : 'panel-danger') + '">';
            htmlStr += '  <div class="panel-heading">';
            htmlStr += '    <h3 class="panel-title">Recalls</h3>';
            htmlStr += '  </div>';
            htmlStr += '  <div class="panel-body">';  

            switch(numRecalls) {
                case 0:
                    htmlStr += '<p>There are no known recalls affecting this vehicle.</p>';
                    break;
                case 1:
                    htmlStr += '<p>This vehicle is subject to 1 recall.</p>';
                    break;
                default:
                    htmlStr += '<p>This vehicle is subject to ' + numRecalls + ' recalls.</p>';
            }      

            htmlStr += '  </div>';
            htmlStr += '</div>';
        }

        $('#pageContent').html(htmlStr);
    },

    generateStarRating(numStars) {
        var n = 0,
            htmlStars = '';

        if (numStars === 'Not Rated') {
            return numStars;
        }

        for (; n < numStars; n++) {
            htmlStars += '<i class="fa fa-star"></i>';
        }

        return htmlStars;
    },

    showGeneralError(errorMsg) {
        alert(errorMsg);
    }
}

window.onload = function() {
  app.initialize();  
};