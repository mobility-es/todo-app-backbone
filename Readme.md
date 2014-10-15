AIQ & Backbone TODO Application
-------------------------------
> Simple HTML5 mobile TODO Application to showcase Backbone to the AIQ platform integration. 

>* The "todo" folder contains a vanilla version of a ToDo app without AIQ integration.
>* The "todo+aiq" folder contains the same app with additional integration to AIQ datasynchronization which synchronizes the data automatically between devices.



## Dependencies
* [AppearIQ Mobile HTML5 SDK](https://www.npmjs.org/package/aiq)

## Included libraries
* aiq-api.js **v1.2.0**
* Backbone **v1.1.2**
* Lodash **v2.4.1**
* jQuery **v2.0.3**
* FastClick **v1.0.3**
* RequireJS **v2.1.14** (with _Text_ plugin)

## Getting started
In order to be able to use [AIQ Dev Cloud](https://www.appeariq.com/content/welcome-appear-iq) you need to [Sing Up](https://www.appeariq.com/sign-up) then deploy [Generic JAVA IA](https://github.com/appear/generic-integration-adapter) following instructions from the [README.md](https://github.com/appear/generic-integration-adapter/blob/master/README.md) file.

### To run in a browser
* Clone the repo
* Go to "todo" or "todo+aiq" folder.
* Run `aiq run` inside that folder and follow its instructions

### To run on a device
* Clone the repo
* Connect to the AIQ Dev Cloud

        aiq login --orgName <YourOrganizaion> --username <YourUsername> --password <YourPassword>

* Deploy HTML5 App to the device by going to its folder and running `aiq publish` within the selected folder.
* Depending on your device OS, you should get AppearIQ client from [Google Play](https://play.google.com/store/apps/details?id=com.appearnetworks.appeardev) or [App Store](https://itunes.apple.com/us/app/appear-for-developers/id627420742?mt=8)
* Run the client and log in using your credentials

## Useful resources
* [Getting Started with AIQ Cloud](https://www.appeariq.com/content/getting-started)
* [Javascript API](https://www.appeariq.com/content/aiq-javascript-api)
* [Integration Java SDK](https://www.appeariq.com/content/integration-java-sdk)
