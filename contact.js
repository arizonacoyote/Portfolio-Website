
//document.getElementById('contactButtonHeadline').addEventListener('click', showContactForm);
document.getElementById('contactButtonTop').addEventListener('click', showContactForm);

document.getElementById('closeApptModal').addEventListener('click', () => {
  document.getElementById('contactForm').style.display = 'none';
  document.getElementById('darkOverlay').style.display = 'none';
})

function showContactForm(e) {
  e.preventDefault();
  console.log('entered function to show form');
  document.getElementById('contactForm').style.display = 'block';
  document.getElementById('darkOverlay').style.display = 'block';
  document.getElementById('contactForm').addEventListener('submit', sendData);
  document.getElementById('darkOverlay').addEventListener('click', () => {
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('darkOverlay').style.display = 'none';
  })
}

function sendData(e) {
  e.preventDefault();
  console.log('entered function to submit info to db');
  let name = document.getElementById('nameForm').value;
  let email = document.getElementById('email').value;
  let phone = document.getElementById('phone').value;
  let message = document.getElementById('message').value;

  db.collection('contactForm').add({
    name,
    email,
    phone,
    message,
    submitted: firebase.firestore.FieldValue.serverTimestamp()
  }).then((docRef) => {
    successMessage();

  }).catch((err) => {
    failedMessage();
    console.log("there was an error adding the document: ", err);
  });

}

function successMessage() {
  document.getElementById('contactSuccess').style.display = 'block';
  document.getElementById('contactForm').reset();
  document.getElementById('contactForm').style.display = 'none';
  setTimeout(function () {
    document.getElementById('contactSuccess').style.display = 'none';
    document.getElementById('darkOverlay').style.display = 'none';
  }, 6000);
}



function failedMessage() {
  document.getElementById('contactFail').style.display = 'block';
  document.getElementById('contactForm').reset();
  document.getElementById('contactForm').style.display = 'none';
  setTimeout(function () {
    document.getElementById('contactFail').style.display = 'none';
    document.getElementById('darkOverlay').style.display = 'none';
  }, 6000);
}

