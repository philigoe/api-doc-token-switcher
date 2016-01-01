# API Doc Token Switcher

A helper extension for the Nelmio API Doc Bundle that allows for developers to switch between user authentication tokens for all API endpoints. It targets the first key / value input fields under the Headers portion of the endpoints, allowing for additional header files to be used if necessary.

I made this extension because when developing REST API's in Symfony, it was tedious to keep swapping access tokens for different users when testing resource permissions across users.

With this extension a developer is able to enter in tokens once. When the developer selects to populate a token in the extension, it'll populate the token throughout all API endpoints.

![Demo of the token switcher](img/promotional/demoVid.gif?raw=true "Token switcher in action")
