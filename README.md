# NCAP Ratings

NHTSA NCAP Car Safety Rating API Demo uses [NCAP Car Safety API](http://www.nhtsa.gov/webapi/Default.aspx?SafetyRatings/API/5#divAPISpecHeader).

Screen flow:

* Display list of model years that data is available  for [API call](http://www.nhtsa.gov/webapi/api/SafetyRatings?format=json)
* When user picks a model year display list of manufacturers for that yet [API call assuming 2015 selected](http://www.nhtsa.gov/webapi/api/SafetyRatings/modelyear/2015?format=json)
* When user picks a manufacturer display list of model variants for that manufacturer/year [API call assuming 2015 and BMW selected](http://www.nhtsa.gov/webapi/api/SafetyRatings/modelyear/2015/make/BMW?format=json)
* When user picks a model variant for the selected manufacturer/year, display information on that model [API call assuming 2015 and BMW and 335i XDrive GT selected](http://www.nhtsa.gov/webapi/api/SafetyRatings/modelyear/2015/make/BMW/model/335I%20XDRIVE%20GT?format=json)
* To get actual crash test data for the 2015 BMW 335i XDrive GT we need to use its vehicle ID 9178 [API call for vehicle 9178](http://www.nhtsa.gov/webapi/api/SafetyRatings/VehicleId/9178?format=json)

Example data for 2015 BMW 335i XDrive GT:

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

Some vehicles will have additional data for video and images - example 2016 BMW 328i:

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
