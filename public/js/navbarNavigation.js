
// contact

const about = document.querySelector('.about');
const contact = document.querySelector('.contact');
const contactContent = document.querySelector('.contact__Content');
const closeContact = document.querySelector('.close__Contact');
const divOBJ = document.querySelector('.objects3d');

contact.addEventListener('click', () => {
    contactContent.style.transform = 'translateY(0)';
    contactContent.style.borderRadius = '50px 50px 0 0';
    about.style.marginTop = '10vh';
    divOBJ.style.marginTop = '30vh';
    closeContact.addEventListener('click', () => {
        contactContent.style.transform = 'translateY(100%)';
        contactContent.style.borderRadius = '300px 300px 0 0';
        about.style.marginTop = '3vh';
        divOBJ.style.marginTop = '0';
    });
});

// works

const works = document.querySelector('.works');
const worksContent = document.querySelector('.works__Content');
const closeWorks = document.querySelector('.close__Works');
works.addEventListener('click', () => {
    // worksContent.style.transform = 'translateY(0)';
    // worksContent.style.borderRadius = '0';
    worksContent.style.opacity = '1';
    worksContent.style.visibility = 'visible';
    closeWorks.addEventListener('click', () => {
        // worksContent.style.transform = 'translateY(-100%)';
        // worksContent.style.borderRadius = '0 0 50vw 50vw';
        worksContent.style.opacity = '0';
        worksContent.style.visibility = 'hidden';
    });
});