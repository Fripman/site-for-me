// app.js
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const User = require('./user');
const multer = require('multer');
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcrypt');
const upload = multer({ dest: 'public/uploads/' });
const axios = require('axios');


mongoose.connect('mongodb://127.0.0.1/perso');

const app = express();



app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(express.json());
app.use(express.static('public'));
app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false }));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});



app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('stream', { user: req.user });
})
app.get('/login', (req, res) => {
  res.render('login');
})
app.get('/register', (req, res) => {
  res.render('register');
})
app.get('/stream', async (req, res) => {
  if (req.session.userId) {
    const user = await User.findById(req.session.userId);
    if (user) {
      res.render('stream', { user });
    } else {
      res.status(400).send('User not found');
    }
  } else {
    res.status(403).send('Not logged in');
    res.render('login');
  }

})

app.post('/register', async (req, res) => {

  console.log(req.body);

  const { surname, name, username, password, confirmPassword } = req.body;

  // Check if password and confirmPassword are same
  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }

  // Check if username already exists in database
  try {
    const test_user = await User.findOne({ username });
    if (test_user) {
      req.flash('error', 'User created successfully');
    }
  } catch (error) {

  }



  // Create new user
  const newUser = new User({ surname, name, username, password });

  // Save the user to the database
  try {
    await newUser.save();
    req.flash('success', 'User created successfully');
    res.redirect('/login');
  } catch (error) {
    req.flash('error', 'Something went wrong');
    res.redirect('/register');
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    req.flash('error', 'User not found');
    return res.redirect('/login');
  }

  user.comparePassword(password, (err, isMatch) => {
    if (err) {
      req.flash('error', 'Something went wrong');
      return res.redirect('/login');
    }
    if (!isMatch) {
      req.flash('error', 'Incorrect password');
      return res.redirect('/login');
    }

    req.session.userId = user._id;
    req.flash('success', 'Logged in!');
    req.session.loggedIn = true;
    res.redirect('/stream'); // Redirect to homepage or dashboard
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/home');
    }

    res.clearCookie('sid');
    res.redirect('/login');
  });
});

app.get('/profile', async (req, res) => {
  if (req.session.userId) {
    const user = await User.findById(req.session.userId);
    if (user) {
      res.render('profile', { user });
    } else {
      res.status(400).render('error', { message: 'User not found' });
    }
  } else {
    res.status(403).render('error', { message: 'Not logged in' });
  }
});

app.post('/profile/update', upload.single('profilePicture'), async (req, res) => {
  if (req.session.userId) {
    const user = await User.findById(req.session.userId);
    if (user) {
      // Update profile picture
      if (req.file) {
        user.profilePicture = "/uploads/" + req.file.filename;
      } else {
        return res.status(400).send('File upload failed');
      }

      // Update other elements
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.username = req.body.username;

      // Handle password updates
      if (req.body.password && req.body.password.trim() !== '') {
        user.password = req.body.password; // make sure to hash the password before saving
      }

      // Save the updated user to the database
      await user.save();

      res.redirect('/profile');
    } else {
      res.status(400).send('User not found');
    }
  } else {
    res.status(403).send('Not logged in');
  }
});


const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});
const Contact = mongoose.model('Contact', ContactSchema);

app.post('/contact', (req, res) => {
  const newContact = new Contact(req.body);
  newContact.save()
    .then(() => {
      req.flash('success', 'Votre message a été envoyé avec succès. Nous vous répondrons sous peu.');
      res.redirect('/');
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

app.get('/contact', async (req, res) => {
  const user = await User.findById(req.session.userId);
  if (user && user.role === 'admin') {
    let page = req.query.page || 1; // L'utilisateur peut spécifier une page, sinon on utilise la première page par défaut.
    let limit = 10; // Le nombre de contacts à retourner par page.
    let offset = (page - 1) * limit; // Le nombre de contacts à sauter avant de commencer à retourner des résultats.

    try {
      let contacts = await Contact.find().skip(offset).limit(limit); // Récupérez les contacts de la base de données, en sautant et en limitant comme spécifié.
      let totalContacts = await Contact.countDocuments(); // Récupérez le nombre total de contacts pour la pagination.

      res.render('contacts', {
        contacts: contacts,
        currentPage: page,
        totalPages: Math.ceil(totalContacts / limit) // Calculez le nombre total de pages.
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("An error occurred while retrieving contacts.");
    }
  } else {
    res.render('contact_form', { user });
  }
});

app.get('/contacts/:id', async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id); // Récupérez le contact spécifique à partir de l'ID dans l'URL.

    res.render('re_contact', { contact: contact }); // Affichez le template 'contact' et passez le contact à afficher.
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while retrieving the contact.");
  }
});

app.post('/contacts/:id/reponse', async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id); // Récupérez le contact spécifique à partir de l'ID dans l'URL.

    // Ici, vous pourriez ajouter du code pour envoyer la réponse à l'email du contact.

    res.redirect('/contacts'); // Redirigez vers la page des contacts.
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while sending the response.");
  }
});



///////////////////////////-API-////////////////////////////////////




app.listen(3000, () => console.log('Listening on port 3000'));
