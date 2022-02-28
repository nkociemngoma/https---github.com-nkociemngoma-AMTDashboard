
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBK7dn3uM1nUfAWHNMP6A0UGLOsjC4zhdI",
    authDomain: "amt-mindworx-abab4.firebaseapp.com",
    databaseURL: "https://amt-mindworx-abab4-default-rtdb.firebaseio.com",
    projectId: "amt-mindworx-abab4",
    storageBucket: "amt-mindworx-abab4.appspot.com",
    messagingSenderId: "903949252947",
    appId: "1:903949252947:web:80293e0ee02eb9be1cc9a6",
    measurementId: "G-KP6RB3C4ZR"
  };
  
  /// Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth();
  const database = firebase.database();
  
  //Set up the SignUp function
  function signup() {
    //get all the input fields
    fullname = document.getElementById("fullname").value;
    rEmail = document.getElementById("rEmail").value;
    rPass = document.getElementById("rPass").value;
    crPass = document.getElementById("crPass").value;
    checkbox = document.getElementById("checkbox").value;
  
    // Validate input fields
  
    if (validate_email(rEmail) == false) {
      alert('Email Or Password is not valid!!')
      return
      // Don't continue running the code
    }
  
    if (rPass != crPass) {
      alert('Passwords do not match!!')
      return
    }
    if ((validate_field(fullname) == false)) {
      alert('One or More Extra Fields is not valid!!')
      return
    }
  
    //   
 
    // Move on with Auth
    auth.createUserWithEmailAndPassword(rEmail, rPass)
      .then(function () {
        // Declare user variable
        var user = auth.currentUser
  
        // Add this user to Firebase Database
        var database_ref = database.ref()
  
        // Create User data
        var user_data = {
          rEmail: rEmail,
          fullname: fullname,
          last_login: Date.now()
        }
        console.log(user.uid)
        // Push to Firebase Database
        database_ref.child('users/' + user.uid).set(user_data)
  
        // DOne
        alert('User Created!!')
  
      })
      .catch(function (error) {
        // Firebase will use this to alert of its errors
        var error_code = error.code
        var error_message = error.message
  
        alert(error_message)
      })
  }
  
  
  
  
  // Set up our login function
  function login() {
    // Get all our input fields
    signInEmail = document.getElementById('signInEmail').value;
    signInpass = document.getElementById('signInpass').value;
  
    // Validate input fields
    if (validate_email(signInEmail) == false || validate_password(signInpass) == false) {
      alert('Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(signInEmail, signInpass)
      .then(function () {
        // Declare user variable
        var user = auth.currentUser
  
        // Add this user to Firebase Database
        var database_ref = database.ref()
  
        // Create User data
        var user_data = {
          last_login: Date.now()
        }
  
        // Push to Firebase Database
        database_ref.child('usersNkocie/' + user.uid).update(user_data)
  
        // DOne
        alert('User Logged In!! ')
        window.location = "index.html"
      })
      .catch(function (error) {
        // Firebase will use this to alert of its errors
        var error_code = error.code
        var error_message = error.message
  
        alert(error_message)
      })
  }
  
  
  function forgotPassword() {
    forgotPassEmail = document.getElementById("forgotPassEmail").value;
  
    // if (validate_email(forgotPassEmail)){
    //     alert('Invalid Email')
    // }
  
    auth.sendPasswordResetEmail(forgotPassEmail)
      .then(function () {
        alert('Check emails for further instructions')
        window.location = "../signup.html"
      })
      .catch(function (error) {
        // Firebase will use this to alert of its errors
        var error_code = error.code
        var error_message = error.message
  
        alert(error_message)
      })
  }
  
  //Add new client
  let clientPassword = generatePassword();
  function addNewClient() {
  
    clientName = document.getElementById("clientName").value;
    clientEmail = document.getElementById("clientEmail").value;
    clientGender = document.getElementById("clientGender").value;
    clientTitle = document.getElementById("clientTitle").value;
    companyName = document.getElementById("companyName").value;
    clientDivision = document.getElementById("clientDivision").value;
  
    document.getElementById("clientPassword").value = clientPassword;
  
    alert("CLient password is " + clientPassword)
  

    auth.sendSignInLinkToEmail(clientEmail, actionCodeSettings)
    .then(function() {
      
      window.localStorage.setItem('emailForSignIn', clientEmail);
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage)
    });
      
      database.ref('usersNkocie/' + clientEmail).set({
          clientName : clientName,
          clientEmail : clientEmail,
          clientGender : clientGender,
          companyName : companyName,
          clientTitle : clientTitle,
          clientDivision : clientDivision
      })
      alert("Client Added Successfully!")

    var actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: 'https://mindworxgrad.web.app',
      // This must be true.
      handleCodeInApp: true,
      iOS: {
        bundleId: 'com.example.ios'
      },
      android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12'
      },
      dynamicLinkDomain: 'example.page.link'
    };
  
  
    if (validate_email(clientEmail) == false) {
      alert('Email Or Password is not valid!!')
      return
      // Don't continue running the code
    }
    if ((validate_field(clientName) == false)) {
      alert('One or More Extra Fields is not valid!!')
      return
    }
  
    //   
  
    // Move on with Auth
    auth.createUserWithEmailAndPassword(clientEmail, clientPassword)
      .then(function () {
        // Declare user variable
        var user = auth.currentUser
  
        // Add this user to Firebase Database
        var database_ref = database.ref()
  
        // Create User data
        var client_data = {
  
          clientName: clientName,
          clientEmail: clientEmail,
          clientGender: clientGender,
          companyName: companyName,
          clientTitle: clientTitle,
          clientDivision: clientDivision,
          Role: "client"
  
        }
  
        // Push to Firebase Database
        database_ref.child('usersNkocie/' + user.uid).set(client_data)
  
        // DOne
  
  
        // document.getElementById('addClient')
        //   .addEventListener('button', function (event) {
        //     event.preventDefault();
  
        //       alert("inside the funct")
  
  
        //   });
        //sendEmail();
        alert('User Created!!')
  
      })
      .catch(function (error) {
        // Firebase will use this to alert of its errors
        var error_code = error.code
        var error_message = error.message
  
        alert(error_message)
      })
  
    const serviceID = 'service_4jhm5mf';
    const templateID = 'template_a0pzy7c';
    debugger
    emailjs.sendForm(serviceID, templateID, '#myForm')
      .then(() => {
        alert('Ingenile!');
      }, (err) => {
        alert(JSON.stringify(err));
      });
    // auth.sendSignInLinkToEmail(clientEmail, actionCodeSettings)
    // .then(function() {
  
    //   window.localStorage.setItem('emailForSignIn', clientEmail);
    //   // ...
    // })
    // .catch((error) => {
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   alert(errorMessage)
    // });
  
    /*database.ref('usersNkocie/' + clientEmail).set({
        clientName : clientName,
        clientEmail : clientEmail,
        clientGender : clientGender,
        companyName : companyName,
        clientTitle : clientTitle,
        clientDivision : clientDivision
    })*/
    alert("Client Added Successfully!")
  
  }
  //password generator
  function generatePassword() {
    var length = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }
  //send email with password
  
  function sendEmail() {
    let Mailbody = " Hi " + clientName + ",\nYou have a new Mindworx profile created \n Please find your password below \n Password: " +
      clientPassword + " \n Regards \n Mindworx App Team";
    Email.send({
      Host: "smtp.gmail.com",
      Username: "mindworxgrdproject@gmail.com",
      Password: "Mastermind*#",
      To: clientEmail,
      From: "mindworxgrdproject@gmail.com",
      Subject: "Mindworx Profile",
      Body: Mailbody,
    }).then(
      message => alert("Client notified via mail sent successfully")
    );
  
  }
  
  //Validate functions
  
  function validate_email(email) {
    expression = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password.length < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }
  
  function validate_checkbox(checkbox) {
    if (checkbox.checked == true) {
      return true
    } else {
      return false
    }
  }