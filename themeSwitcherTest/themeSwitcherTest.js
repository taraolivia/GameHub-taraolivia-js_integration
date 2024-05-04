document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light'; // default to 'light' if nothing saved
    const savedIcon = localStorage.getItem('themeIcon') || 'default-icon.png'; // use a valid default icon path
    applyTheme(savedTheme, savedIcon);

    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            const iconSrc = this.getAttribute('data-icon');
            applyTheme(theme, iconSrc);
            localStorage.setItem('theme', theme);
            localStorage.setItem('themeIcon', iconSrc);
        });
    });
});

function applyTheme(theme, iconSrc) {
    document.documentElement.setAttribute('data-theme', theme);
    console.log("Applying theme:", theme, "with icon:", iconSrc); // Debug output

    const currentThemeIcon = document.getElementById('current-theme-icon');
    currentThemeIcon.src = iconSrc;
    currentThemeIcon.alt = theme + " theme icon";
}

document.querySelectorAll('.theme-option').forEach(option => {
    option.addEventListener('mouseenter', function() {
        // Exclude current theme from the picker
        const currentTheme = document.documentElement.dataset.theme;
        if (this.dataset.theme === currentTheme) {
            return;
        }
        // Apply fading effect to other themes
        document.querySelectorAll('.theme-option').forEach(otherOption => {
            if (otherOption !== this) {
                otherOption.style.opacity = '0.5';
            }
        });
        // Enlarge the hovered theme
        this.style.transform = 'scale(1.2)';
    });

    option.addEventListener('mouseleave', function() {
        // Reset styles on mouse leave
        document.querySelectorAll('.theme-option').forEach(otherOption => {
            otherOption.style.opacity = '1';
            otherOption.style.transform = 'scale(1)';
        });
    });

    option.addEventListener('click', function() {
        const theme = this.getAttribute('data-theme');
        const iconSrc = this.getAttribute('data-icon');
        applyTheme(theme, iconSrc);
        localStorage.setItem('theme', theme);
        localStorage.setItem('themeIcon', iconSrc);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const themeDisplay = document.querySelector('.theme-display');
    const themePicker = document.querySelector('.theme-picker');
  
    // Add event listener to toggle the 'open' class on the theme picker when the theme display is clicked
    themeDisplay.addEventListener('click', function() {
      themePicker.classList.toggle('open');
    });
  });
  