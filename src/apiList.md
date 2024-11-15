#DevTinder APIS

Auth Router

- POST /Signup
- POST /Login
- POST /Logout

profile Router

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

ConnectionRequestRouter

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestID
- POST /request/review/rejected/:requestID

user Router

- GET /user/connections
- GET /user/requests/received
- GET /user/feed - gets you the profiles of other users on platform

status : ignore , interested , accepted , rejected
