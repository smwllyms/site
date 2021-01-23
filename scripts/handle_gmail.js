//var CLIENT_ID = '202384831917-46ubk2pkgbm0sd5esigknjvh5jkcupip.apps.googleusercontent.com';
var CLIENT_ID = '743220959926-rbfvkng9igfoh9328kbbr3456hd81kld.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBBfXJ9r3I4iwLkU5hwYAH6Xr44whnYh64';

var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        gapi.auth2.getAuthInstance().signIn();
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    }, function(error) {
        console.log(JSON.stringify(error, null, 2));
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        console.log("signed in");
    } else {
        console.log("signed out");
    }
}

const message =
"From: my.email@gmail.com\r\n" + 
"To: my.email@gmail.com\r\n" +
"Subject: As basic as it gets\r\n\r\n" +
"This is the plain text body of the message.  Note the blank line between the header information and the body of the message.";


// The body needs to be base64url encoded.
const encodedMessage = btoa(message)

const reallyEncodedMessage = encodedMessage.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

document.getElementById("send_email").addEventListener("click", function() {
    gapi.client.gmail.users.messages.send({
        userId: 'me',
        resource: { // Modified
            // same response with any of these
            raw: reallyEncodedMessage
            // raw: encodedMessage
            // raw: message
        }
    }).then(function () { console.log("done!")});
});