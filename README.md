# ReviewApp

Views:

- GET / - Home

# HomeEntry

(Loggedout, Reading entries and reviews)
When a user first enters your website (even if they are not logged in), they should be able to seelinks to the entries from newest to oldest. Since these are all entries, if I were to click on the title of one it would redirect me to the entry detail page. If a user is not currently logged in, they should only be able to read the entry and reviews. A
logged out user should NOT be able to create, edit or delete entries or reviews.

# Navbar

At the top of every page, you should have a nav bar. This navbar should contain a link back to
the home page and a link to a place where a user can login or register a new account. If the
user is logged in, the navbar should still contain a link to the home page, but also a button to
create a new entry, a button to log out and a slightly stylized reference to their username.

Register -> Loggedin
When a user first registers, they should be prompted for a username and password, and they should immediately be logged in with that account.

- GET /games/new
- POST /games create a new game

# Creating Entries

If the user clicks on the create an entry button, they should be brought to a new page with a simple form that allows them to create a new entry. This form should request the following information: a title (required), and at least 2 attributes related to the website domain all of which
should be required (for instance, if you are creating a movie app, you should ask for 2 details like director or release year). When a user submits a new entry, they should be redirected to the entry page that they just created.

- GET /games/:id get the detail game page

# Entry Detail Page

A logged out user can access an entry page but should not be able to create, edit or delete reviews. When you are on the entry page and you are logged in, there should be a form field below the entry that allows users to create a new review. When the user submits the review, the page
should NOT refresh, but rather the page should dynamically refetch all the existing reviews.
Reviews do not need to be threaded, that is, a user cannot comment or reply to another person’s review. This means that all reviews are on the same level. Reviews should be sorted by oldest on top. At this point, reviews can just be plain text. Do not worry about adding HTML, style, images.

- GET /games/:id/edit
- PUT /games/:id edit the detail game page
- DELETE /games/:id delete the detail game page

# Editing/Deleting Entries and Reviews

When a user is logged in, they should see an additional button to edit or delete entries and reviews. This button should be visible ONLY to the user that created the entry or review.
When editing a entry, you should re-use your create entry form, but ensure that all the fields are properly filled out. When you edit a review, the text field should be replaced with a form field with the current text already existing.
If a entry is deleted, all associated reviews should be deleted as well. If you try to access a
page with a deleted entry (say you stored the URL somewhere) you should be redirected back
to the home page. If a review is deleted, there should be no reference to it anywhere.

Models:
Entry

- a page that corresponds to one example. An entry is
  composed of a title, a creation timestamp of when that entry was added and at least 2 other domain specific details
  Review
- text blob appears below on the same page as the corresponding entry. text and a creation timestamp.

DB
At least 2 collections (i.e., MongoDB tables).
Additionally, your data should be secure in the ways we show in class. ???????
Passwords should be encrypted, and requests from invalid users should be rejected

Submit Early - 3pts
Submit this assignment on the Friday before the submission date to receive extra points.
Password Encryption - 3pts
Ensure that your user passwords are encrypted in the database to add an extra level of security. The walkthrough for this can be found in the slides.
Rated Reviews - 4pts
When a user submits a review, you should also include a field that the user can leave a rating of between 1-5 stars (half stars are allowed.) Then, on the entry page, show the average of all ratings.
Search Entries - 5pts
Right now, users need to manually scroll through all entries to find the page they’re looking for. Add a search bar (an input field) in the nav bar. Users should be able to search for a single string (no spaces required) and return any matches that matches some or all of the titles of the entries in your DB. This should be case insensitive and the search results should redirect users to a new page that show all the matching results. The results can be returned in any order.


backend routes:
get /games -> games
get /games/:id -> findById


post /games 
    -> async res.send(req.body)
    -> res.send(game)


put /games/:id  
    -> campground

delete /games/:id
    -> campground

/users/authenticate
/users

frontend routes:
/games <GameList />
/games/:id: <GameDetail />
/games/:id/edit <CreateGame />
/login <Login>
/register <Register>


Footer
Allow image
Form 