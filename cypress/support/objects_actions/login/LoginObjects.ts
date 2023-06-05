class LoginObjects {

    constructor() {
    }

    inputUsername = () => '#userName'
    inputPassword = () => '#password'
    btnLogin = () => '#login'
    btnNewUser = () => '#newUser'
    btnLogout = () => '#submit'
    btnGoToBookStore = () => '#gotoStore'

    inputFirstName = () => '#firstname'
    inputLastName = () => '#lastname'
    btnRegister = () => '#register'
    btnBackToLogin = () => '#gotologin'

    recaptchaFrame = () => '#g-recaptcha *> iframe'
    recaptcahCheckConfirmation = () => '.recaptcha-checkbox-border'
    lblLoginError = () => '#name'
    lblUsername = () => '#userName-value'
}
export default LoginObjects