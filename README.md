This is a full stack Student Productivity and Study platform...
I will be building this site slowly, version by version and improve it everyday


-> Added Sign up and Login feature for user

-> Defined db schema and models for User, Subjects, Notes

-> Created user authentication middleware

-> updated login jwt creation to match the middleware

-> added profile endpoint

-> added profile update enpoint for user

-> added account /delete endpoint for user.

-> Added endpoint to add subject

-> Added endpoints to get all subjects and a particular subject

-> added endpoint to update subject

-> added endpoint to delete a subject

-> fixed the DB Schema bug in Subject Schema

-> updated the delete enpoint code of userRoute, it will now delete all the subjects related to the particular user, instead of leaving all those subjects and notes permanently useless in database.


-> added endpoint to create a new note related to the particular subject

-> updated the delete endpoint of subjecRoute, it will not delete all the notes related to the particular subject, instead of leaving all those notes abandoned in Database permanently.

-> added endpoint to fetch a particular note in a subject

-> added endpoint to fetch all the notes of particular subject

-> added endpoint to update Notes

-> added endpoint to delete a particular note

-> Created frontend for Sign up endpoint with toasts

-> Updated back-end status codes and fixed some bugs