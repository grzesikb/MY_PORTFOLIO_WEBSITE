
const dynamicMenu = document.querySelector('.dynamicMenu');
const menuText = document.querySelector('.menuText');
const contactBtn = document.querySelector('.contact__btn');
const contactDs = document.querySelector('.contact__description')
const aboutBtn = document.querySelector('.about__btn');
const languageBtn = document.querySelector('.language__btn');
const themeBtn = document.querySelector('.theme__btn');
const menuUtilities = document.querySelector('.menuUtilities');
// mosue over

function menuBtnsTransform(tra) {
    //transform
    themeBtn.style.transform = tra;
    aboutBtn.style.transform = tra;
    languageBtn.style.transform = tra;
}

dynamicMenu.addEventListener('mouseover', ()=> { 
    menuText.style.visibility = 'hidden';
    menuText.style.transform = 'translateY(100%)';
    menuText.style.opacity = '0';
    contactBtn.style.transform = 'translateY(0)';
    menuUtilities.style.visibility = 'visible';
    menuUtilities.style.opacity = '1';
    menuBtnsTransform('translateY(0)');
   
    // mouse out
    dynamicMenu.addEventListener('mouseout', ()=> { 
        menuText.style.visibility = 'visible';
        menuText.style.transform = 'translateY(0)';
        menuText.style.opacity = '1';
        contactBtn.style.transform = 'translateY(200%)';
        menuUtilities.style.visibility = 'hidden';
        menuUtilities.style.opacity = '0';
        menuBtnsTransform('translateY(-70%)');
    });
});
