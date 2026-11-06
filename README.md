# Black-Jack
## HIG Implementation

In the buttons section of HIG, it states to use style as the way to distinguish choice between different actions visually. This was implemented in the `Hit` and `Stand` buttons. The `Hit` button is filled gold, while the `Stand` button is outlined.
(https://developer.apple.com/design/human-interface-guidelines/buttons)

In the playing haptics section of HIG, it states that you should use haptics in your app that are used consistently and played short. This was implemented in each button in the app, where once you tap the button, a short haptic plays.
(https://developer.apple.com/design/human-interface-guidelines/playing-haptics)

In the progress indicators section of HIG, it states that you should use an indicator when tasks, such as loading, are occurring. It is preferred the activity indicator is used for showing the status of a background operation. This was implemented by showing an activity indicator spinner when the deck is being loaded.
(https://developer.apple.com/design/human-interface-guidelines/progress-indicators)
