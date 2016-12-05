
#Installation
npm Install

download bootstrap 
from http://v4-alpha.getbootstrap.com/

and include bootsrap script in index.html just like below example
`<link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css" >`
`<script src=assets/bootstrap/css/bootstrap.min.js"></script>`

v4-alpha bootsrap tooltips need 
Tether, A client-side library to make absolutely positioned elements attach to elements in the page efficiently.
you can download it and include the script in index.html just like below example

`<link rel="stylesheet" href="assets/tether/css/tether.min.css">`
`<script src=assets/tether/css/tether.min.js"></script>`


#Need Jquery for using v4-alpha bootstrap Components directly.
 *Download link:
    >>http://jquery.com/download/
    >>include its script on above bootstrap link and scripts on index.html

################################################

# Install and include ng-bootstrap in the app
 >>npm install --save @ng-bootstrap/ng-bootstrap

# Make sure that the ff. is included in your app module 

 >> import {NgbModule} from '@ng-bootstrap/ng-bootstrap'

 >> @NgModule({
  
  >> imports: [NgbModule.forRoot(), ...],
 
   >> })


#Guide
# How to use the app
* Use Login link to login on your existing account
* If no account or not registered used Register link for registration
* Forums will show list of ID for each list category
    >> Clicking specific category will shown a list of posts
    >> For each post, you can able to click comment link to show all list of comments in a specific Post in modal.
    >> To view a specific Post details only, click the header of the post.
    >> Under Post View you can able to Update, Delete and  or even CRUD comment.

* Use left arrow  icon on the top of the app Header besides the LOGO and Brand name 
  to move back on your previous page you visit under forum.

