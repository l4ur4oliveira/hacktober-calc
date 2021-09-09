// The calculator magic works here

const root = document.querySelector('html');

const toolbarThemes = document.querySelector('.toolbar-option__themes');
const themesOptions = document.querySelector('.toolbar__themes');
toolbarThemes.addEventListener('click', event => {
  event.preventDefault();
  
  themesOptions.classList.toggle('open');
});

const themeItems = document.querySelectorAll('.toolbar__themes li');
themeItems.forEach(theme => {
  theme.addEventListener('click', item => {
    root.classList.replace(root.className, item.target.className);
  })
});
