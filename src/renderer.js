const showPassword = document.getElementById("pswshow");
const passwordLength = document.getElementById("pswLength");
const refreshBtn = document.getElementById("refresh");
const copyBtn = document.getElementById("copy");

const createPassword = () => {
    const uppercaseCheckbox = document.getElementById("uppercase");
    const lowercaseCheckbox = document.getElementById("lowercase");
    const numbersCheckbox = document.getElementById("numbers");
    const charactersCheckbox = document.getElementById("characters");

    let passwordCharacters = "";

    if (numbersCheckbox.checked) {
        passwordCharacters += "0123456789";
    }
    if (uppercaseCheckbox.checked) {
        passwordCharacters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (lowercaseCheckbox.checked) {
        passwordCharacters += "abcdefghijklmnopqrstuvwxyz";
    }
    if (charactersCheckbox.checked) {
        passwordCharacters += "~!@#$%^&*+-/.,\{}[]();:?<>";
    }

    let password = "";
    const length = parseInt(passwordLength.value);

    while(password.length < length){
        const randomIndex = crypto.getRandomValues(new Uint32Array(1))[0] % passwordCharacters.length;
        password += passwordCharacters[randomIndex];
    }

    return password;
}

const evaluatePasswordStrength = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialCharacters = /[~!@#$%^&*\-/+.,\\{}[\]();:?<>]/.test(password);

    let strengthMessage = "";
    let strengthClass = "";

    if ((hasUppercase || hasLowercase || hasNumbers) && !hasSpecialCharacters) {
        strengthMessage = "Weak";
        strengthClass = "password-weak";
    } else if ((hasUppercase && hasLowercase && hasNumbers) && hasSpecialCharacters) {
        strengthMessage = "Strong";
        strengthClass = "password-strong";
    } else {
        strengthMessage = "Medium";
        strengthClass = "password-medium";
    }

    const pswStrengthDiv = document.getElementById("pswStrength");
    pswStrengthDiv.innerText = strengthMessage;
    pswStrengthDiv.className = "password-strength " + strengthClass;
}

const copyPassword = () => {
    showPassword.select();
    navigator.clipboard.writeText(showPassword.value);
}

copyBtn.addEventListener("click", (event) => {
    event.preventDefault();
    copyPassword();
})

refreshBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const generatedPassword = createPassword();
    showPassword.value = generatedPassword;
    evaluatePasswordStrength(generatedPassword);
});
