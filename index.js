const express = require('express');  // Import the Express framework
const methodOverride = require('method-override');  // Import the method-override middleware
const app = express();  // Create an instance of the Express application
const PORT = 3000;  // Set the port number for the server to listen on

global.DEBUG = true;  // Set a global DEBUG variable to true

app.set('view engine', 'ejs');  // Set the view engine to EJS
app.use(express.static('public'));  // Serve static files from the 'public' directory
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies (important for form submissions)
app.use(methodOverride('_method'));  // Override HTTP methods with a query value '_method' (e.g., for PUT and DELETE)

app.get('/', (req, res) => {  // Define a route for the root URL ('/')
  res.render('index.ejs', { name: 'KATERYNA' });  // Render the 'index.ejs' template with data (in this case, the name 'Peter')
});
const apiRouter = require('./routes/api');  // Use the '/api' prefix for routes defined in the 'apiRouter' module

app.use('/api', apiRouter);

app.use((req, res) => {  // Handle 404 errors by rendering the '404.ejs' template
  res.status(404).render('404');
});
app.listen(PORT, () => {  // Start the server, listening on the specified port
  console.log(`Simple app running on port ${PORT}.`);
});
