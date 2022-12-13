# CAPS

## Project: Caps

## Author: Seth P. Pierce

### Problem Domain

### Phase 1

- As a vendor, I want to alert the system when I have a package to be picked up.
- As a driver, I want to be notified when there is a package to be delivered.
- As a driver, I want to alert the system when I have picked up a package and it is in transit.
- As a driver, I want to alert the system when a package has been delivered.
- As a vendor, I want to be notified when my package has been delivered.

And as developers, here are some of the development stories that are relevant to the above.

- As a developer, I want to use industry standards for managing the state of each package.
- As a developer, I want to create an event driven system so that I can write code that happens in response to events, in real time.

### Phase 1 features

![Phase 1](lab11.png)

- hub - sends a new package out to be picked up
- vendorhandler - lets driver know that there is a new package
- driverhandler - picks up and begins delivery
- driverdelivered - finishs delivery and notifies vendor
- vendordelived - thanks driver for delivering package
