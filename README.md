# Gastronomy Module

## Prerequisites

* If your project depends on the Lib4all to execute the client's methods, please download and import it to your project.
    * Last tested versions: 
        * Android: v1.24.15
        * iOS: v1.24.19

# Getting Started

- [React Native](#react-native)
    + [Installation](#installation-react-native)
    + [Properties](#properties)
    + [Android](#additional-android-setup)
    + [iOS](#additional-ios-setup)

# React Native

### Installation react native

Put the module as dependency on the project`s package.json. 

```
"gastronomy-module" : "git://github.com/4alltecnologia/gastronomy-module.git#v1.2.6"
```

Run ```npm i``` to install

After the installation, import the module on your component

```
import { MainContainer } from "gastronomy-module"
```

Then you can call the module using the imported component

```
return (
	<MainContainer homolog = { homolog }
	               appName = { appName }
                   orderType = { orderType }
                   googleApiKey = { googleApiKey }
                   apiHeaders = { apiHeaders }
                   stylesDictionary = { stylesDictionary }
                   unityId = { unityId }
                   shouldGoToCart = { shouldGoToCart }
                   shouldGoToOrderStatus = { shouldGoToOrderStatus }
                   shouldGoToOrderTypeSelection = { shouldGoToOrderTypeSelection }
                   shouldGoToOffers = { shouldGoToOffers }
                   showUnityHeaderWithInfo = { showUnityHeaderWithInfo }
                   hideMainBackButton = { hideMainBackButton }
                   hideButtonNoOrders = { hideButtonNoOrders }
                   checkNumber = { checkNumber }
                   startLogin = { startLogin }
                   hasUserLogged = { hasUserLogged }
                   getUserLogged = { getUserLogged }
                   hasUserDataCompleted = { hasUserDataCompleted }
                   getCardID = { getCardID }
                   logout = { logout }
                   closeModule = { closeModule }
	/>
)
```

### Properties

`OBS.:` Examples on react-native. 

Set the app's environment (Homolog = true / Production = false) 
```
let homolog = true
```

Set the client app name (It will appear on some screens of the module)
```
let appName = "Client's app name"
```

Set if the module should accept only delivery (2) orders or takeaway (1), voucher (3) and/or short delivery (4) (You must not send delivery (2) along with others types, it always must be sent alone)
```
let orderType = [1, 3]
```
	
Set the Google Places key, to allow access to Google Places web services. You can get one at: https://developers.google.com/places/web-service/get-api-key). After getting the key, you have to activate some APIs to make it work properly (Geocoding API, Geolocation API,Maps SDK for Android, Places API for Web).
```
let googleApiKey = "YOUR_GOOGLE_PLACES_KEY"
```

Set the API header. If `homolog` is set to true, you must send the homolog's environment token, if `homolog` is set to false, you must send the production's environment token
```
let apiHeaders = {
	"Authorization":"Bearer YOUR_TOKEN"
}
```
	
Set app theme with background color, font color and font family
```
let stylesDictionary = {
    backgroundColor: {
        primary: '#1E90FF',
        secondary: '#1E90FF',
        gradient: '#1E90FF'
    },
    fontColor: {
        primary: '#FFFFFF',
        secondary: '#000000'
    },
    fontFamily: {
        font: 'System'
    }
}
 ```

###### Background Color
| backgroundColor   | Default          | Options     |
| :------------     |:-----------      |:----------  |
| primary           | '#4FA444'        | -           |
| secondary         | '#4FA444'        | -           |
| gradient          | '#4FA444'        | - (Optional, if not set, it will assume the primary color)|
 
###### Font Color 
| fontColor         | Default         | Options              |
| :------------     |:-----------     |:-----------          |
| primary           | '#FFFFFF'       | '#FFFFFF', '#000000' |
| secondary         | '#000000'       | '#FFFFFF', '#000000' |

###### Font Family

| fontFamily    | Default       | Options                                           | 
| :------------ |:-----------   | :--------                                         |
| font          | 'System'      | 'Arial', 'Dosis', 'Helvetica', 'Rambla', 'System' (San Francisco/Roboto) | 

Set if the module should open the Unity Details screen, you must send the id from the unity (Send null, 0, or "" if it shouldn't open)
```
let unityId = "1289"
```

Set if the module should open the Cart screen
```
let shouldGoToCart = true
```

Set if the module should open the Order History screen
```
let shouldGoToOrderStatus = true
```

Set if the module should open the Order Type Selection screen (The user can choose between Delivery and Takeaway)
```
let shouldGoToOrderTypeSelection = true
```

Set if the module should open the Offers screen
```
let shouldGoToOffers = true
```

Set if the module should hide the back button on main screen
```
let hideMainBackButton = true
```

Set if the module should hide the button to open the Unity List screen in Order History screen when the user doesn't have any order
```
let hideButtonNoOrders = true
```

Set if the unity details screen should show the unity information tab 
```
let showUnityHeaderWithInfo  = true
```

Set if you want to enter the module as Check Mode
```
let checkNumber = 123
```

`ATTENTION.:` The methods below must be implemented by the client app.

Method to login and register user. The method should return the user's session token, email address and phone number inside a dictionary
```
function startLogin() {
	...
	
	let userInfo = {
		sessionToken: "SESSION_TOKEN",
		emailAddress: "EMAIL_ADDRESS",
		phoneNumber: "PHONE_NUMBER",
		fullName: "FULL_NAME"
	}
		
	return userInfo
}
```

Method to check if the user is currently logged in
```
function hasUserLogged() {
	...
	
	return true/false
}
```

Method to get logged user's information. The method must return the user's session token, email address and phone number inside a dictionary
```
function getUserLogged() {
    ...
    
	let userInfo = {
		sessionToken: "SESSION_TOKEN",
		emailAddress: "EMAIL_ADDRESS",
		phoneNumber: "PHONE_NUMBER"
	}
	
	return userInfo
}
```

Method to check if the user has the data needed to make a transaction
```
function hasUserDataCompleted() {
	...
	
	return true/false
}
```

Method to get and register the user's credit cards. If the user register and/or select a credit card, it must return the card ID
```
function getCardID() {
    ...
    
	return "cardId"
}
```
	
Method to logout the user
```
function logout() {
	...
}
```

//Method to close the module
```
function closeModule() {
	...
}
```

### Additional Android Setup

When importing, it's required to execute ```react-native link``` (usually this is enough, but you have to check if all libs where actually imported)

Manually, you can add the following lines to the app's ```build.gradle```

```
implementation project(':gastronomy-module')
implementation project(':react-native-device-info')
implementation project(':react-native-maps')
implementation project(':react-native-fetch-blob')
implementation project(':react-native-linear-gradient')
implementation project(':react-native-android-settings-library')
implementation project(':react-native-default-preference')
implementation(project(':react-native-geolocation-service')) {
    exclude group: 'com.google.android.gms', module: 'play-services-location'
}
```

Then, these lines bellow to ```settings.gradle```

```
include ':react-native-geolocation-service'
project(':react-native-geolocation-service').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-geolocation-service/android')
include ':react-native-default-preference'
project(':react-native-default-preference').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-default-preference/android')
include ':react-native-android-settings-library'
project(':react-native-android-settings-library').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-android-settings-library/android')
include ':react-native-device-info'
project(':react-native-device-info').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-device-info/android')
include ':react-native-maps'
project(':react-native-maps').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-maps/lib/android')
include ':react-native-fetch-blob'
project(':react-native-fetch-blob').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-fetch-blob/android')
include ':react-native-linear-gradient'
project(':react-native-linear-gradient').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-linear-gradient/android')
include ':gastronomy-module'
project(':gastronomy-module').projectDir = new File(rootProject.projectDir, '../node_modules/gastronomy-module/android')
```

And finally, the following lines to ```MainApplication.java```

```
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.reactlibrary.RNDefaultPreferencePackage;
import com.reactlibrary.androidsettings.RNANAndroidSettingsLibraryPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.airbnb.android.react.maps.MapsPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.fourall.gastronomymodule.GastronomyNativePackage;


[...]


@Override
protected List<ReactPackage> getPackages() {
  return Arrays.<ReactPackage>asList(
        [...]
        new RNDefaultPreferencePackage(),
        new RNANAndroidSettingsLibraryPackage(),
        new LinearGradientPackage(),
        new GastronomyNativePackage(),
        new RNDeviceInfo(),
        new MapsPackage(),
        new RNFetchBlobPackage(),
        new Gastronomy4allPackage(),
        new RNFusedLocationPackage()
  );
}
```

On "AndroidManifest", add the following permissions
```
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

Also on "AndroidManifest", it's required to add a Google Maps key (you can get one at: https://developers.google.com/maps/documentation/android-api/signup?hl=pt-br), to allow the application to show maps

### Additional iOS Setup

After running the ```npm i``` command, it's important to execute the ```react-native link``` command to link all dependencies to your project.

Sometimes it's needed to run specific links like ```react-native link react-native-maps```.

# Authors

* [Bruno Rovéa](__)
* [Jáder Nunes](https://github.com/jadernunes)
* [Juliano Abrantes](__)

# License

 © 2018 4all.com
