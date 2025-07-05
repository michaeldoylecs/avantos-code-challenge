# Warning

There be dragons in this code that no person should have to witness. Proceed at your own peril.
This is not an implementation that I am proud of, but one that just barely implements what is asked.
Brace your eyes for true programmer graphics.

# Usage

To run this project, first start the mock API server found in `/frontendchallengeserver`
by switching into the directory and running `npm start`. Or use your own mock server.
The API endpoint is hardcoded as `http://localhost:3000/api/v1/1/actions/blueprints/1/graph/`.

Then, run this server by running `npm run dev` from within the top-most directory.

# Notes
I did not implement global data prefills. Truthfully, I forgot about it midway through implementing
the prefillStore, and retrofitting it in is now more work than I would like to spend on this
code accessment.
