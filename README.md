# NCAP Ratings

NHTSA NCAP Car Safety Rating API Demo uses [NCAP Car Safety API](http://www.nhtsa.gov/webapi/Default.aspx?SafetyRatings/API/5#divAPISpecHeader).

This is a really basic throwaway JQuery / Bootstrap demo to be used as a guide when constructing example apps in:

* Ionic Framework
* Titanium Appcelerator
* React Native
* React JS
* NativeScript
* Ext JS 6

## Working Demo

A working demo can be seen [here](http://crudworks.org/ncap), note that this is best from a mobile user agent and that the Back and Restart buttons are not functional for the purposes of this demo.  These should be included in your implementation and made to work.

Sample Vehicles to try:

* All data present, has recalls: 2015 Audi A4
* All data present, no recalls: 2016 Fiat 500
* Some data missing, has recalls: 2009 Ford Explorer
* No data, no recalls: 2015 BMW 228i XDrive

## Screen Flow

* Display list of model years that data is available  for [API call](http://www.nhtsa.gov/webapi/api/SafetyRatings?format=json)
* When user picks a model year display list of manufacturers for that yet [API call assuming 2015 selected](http://www.nhtsa.gov/webapi/api/SafetyRatings/modelyear/2015?format=json)
* When user picks a manufacturer display list of model variants for that manufacturer/year [API call assuming 2015 and Audi selected](http://www.nhtsa.gov/webapi/api/SafetyRatings/modelyear/2015/make/Audi?format=json)
* When user picks a model for the selected manufacturer/year, display list of variants for that model [API call assuming 2015 and Audi and A3 selected](http://www.nhtsa.gov/webapi/api/SafetyRatings/modelyear/2015/make/Audi/model/A3?format=json)
* When user picks a variant, display actual data based on the vehicle's ID
* To get actual crash test data for the 2015 Audi A3 4 DR AWD we need to use its vehicle ID 9403 [API call for vehicle 9403](http://www.nhtsa.gov/webapi/api/SafetyRatings/VehicleId/9403?format=json)

Allow users to go back to the previous screen, or start over.

## API Implementation Notes

The government does not have CORS on for this API, but it works fine with JSONP.

## Data Items to Show for Each Vehicle

(JSON field names in parentheses)

### Vehicle Name:

* Model Year (ModelYear)
* Manufacturer (Make)
* Vehicle Model (Model)

### Star Ratings:

* Overall Rating (OverallRating)
* Front Crash Rating (OverallFrontCrashRating)
* Side Crash Rating (OverallSideCrashRating)
* Side Pole Crash Rating (SidePoleCrashRating)
* Rollover Rating (RolloverRating)

If any of these are not present, the API returns "Not Rated" in place of 1-5.

### Crash Images:

* Front Crash (FrontCrashPicture)
* Side Crash (SideCrashPicture)
* Side Pole Crash (SidePolePicture)

If any of these are not present, they will be undefined in the API - display text instead, for example:

"Side pole crash image unavailable."

### Recalls:

* Number of recalls (RecallsCount)

Handle case where there are 0, 1, >1 recalls.  Use visual warning indication when >0 recalls.

## Example data for 2015 BMW 335i XDrive GT

```
{
  Count: 1,
  Message: "Results returned successfully",
  Results: [
    {
      OverallRating: "5",
      OverallFrontCrashRating: "4",
      FrontCrashDriversideRating: "4",
      FrontCrashPassengersideRating: "5",
      OverallSideCrashRating: "5",
      SideCrashDriversideRating: "5",
      SideCrashPassengersideRating: "5",
      RolloverRating: "5",
      RolloverRating2: "Not Rated",
      RolloverPossibility: 0.095,
      RolloverPossibility2: 0,
      SidePoleCrashRating: "5",
      NHTSAForwardCollisionWarning: "Optional",
      NHTSALaneDepartureWarning: "Optional",
      ComplaintsCount: 0,
      RecallsCount: 1,
      InvestigationCount: 0,
      ModelYear: 2015,
      Make: "BMW",
      Model: "335I XDRIVE GT",
      VehicleDescription: "2015 BMW 335I Xdrive GT 5 HB AWD",
      VehicleId: 9178
    }
  ]
}
```

## Example Data with Additional Images and Video - 2016 BMW 328i

```
{
  Count: 1,
  Message: "Results returned successfully",
  Results: [
    {
      VehiclePicture: "http://www.safercar.gov/staticfiles/DOT/safercar/ncapmedia/images/2016/v07857P076.jpg",
      OverallRating: "5",
      OverallFrontCrashRating: "4",
      FrontCrashDriversideRating: "4",
      FrontCrashPassengersideRating: "5",
      FrontCrashPicture: "http://www.safercar.gov/staticfiles/DOT/safercar/ncapmedia/images/2016/v07857P077.jpg",
      FrontCrashVideo: "http://www.safercar.gov/staticfiles/DOT/safercar/ncapmedia/movies/2016/v07857C019.wmv",
      OverallSideCrashRating: "5",
      SideCrashDriversideRating: "5",
      SideCrashPassengersideRating: "5",
      SideCrashPicture: "http://www.safercar.gov/staticfiles/DOT/safercar/ncapmedia/images/2016/v07858P104.jpg",
      SideCrashVideo: "http://www.safercar.gov/staticfiles/DOT/safercar/ncapmedia/movies/2016/v07858C013.wmv",
      RolloverRating: "5",
      RolloverRating2: "Not Rated",
      RolloverPossibility: 0.095,
      RolloverPossibility2: 0,
      SidePoleCrashRating: "5",
      SidePolePicture: "http://www.safercar.gov/staticfiles/DOT/safercar/ncapmedia/images/2016/v07859P071.jpg",
      SidePoleVideo: "http://www.safercar.gov/staticfiles/DOT/safercar/ncapmedia/movies/2016/v07859C014.wmv",
      ComplaintsCount: 0,
      RecallsCount: 0,
      InvestigationCount: 0,
      ModelYear: 2016,
      Make: "BMW",
      Model: "328I",
      VehicleDescription: "2016 BMW 328 I 4 DR RWD",
      VehicleId: 10450
    }
  ]
}
```
