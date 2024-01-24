# Support Chat

## What is this app ?

Basically Support Chat is a simple interface app for a Support Chat System.
The system is a chat that holds a interface that you can talk with authenticated members (Staff/Admins), and you only talk with them to ask some support in whatever application. Staff and Admins will be allowed to have more than one chat, becaus they need to talk with every common user, but common users will only have one chat, that any staff and admin can join it.

## Technologies Used

### Front-End

For the client side of the application, I am using React.js, and for the UI I got interessed into tailwindcss and flowbite for only for the components.

### Back-end

For the server side, I am using Express.js and MongoDB so, basically the app uses the MERN Pattern.

## How to use it

After the git clone, you must settup a little things to work in your machine

### Install NPM

You must install node modules, but not only on the root folder (server side), you also need to do it in the client side!

### Changing ENV

This app uses MERN pattern, so it has mongodb as database usage, you must go on ".env" and change the database connection key, I recommend you to creating a mongo cluster at mongo atlas website, but you can also host it in your machine.

### Feels like your done

You should have everything done, but if you still give errors, check out both package.json (client and server side) to verify if PORT, PROXY and COMMANDS are all setted up correctly.

OBS: React port and Express port must be different, the proxy in the client side package is made for setting up the connection between requests in the client side.