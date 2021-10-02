let verifyReferral = document.getElementById('verify-referral');
let referralElement = document.getElementById('referral');
let paymentOptions = document.getElementById('payment-options');
let referralOptions = document.getElementById('referral-options');
let errorMsg = document.getElementById('error-msg');
let verificationLoader = document.getElementById('verification-loader');

verifyReferral.addEventListener('click', function (e) {
    errorMsg.textContent = '';
    verificationLoader.classList.remove('d-none');
    let referrals = [1, 2, 3, 4];
    fetch('http://localhost:5050/kmc/getKmcReferral')
        .then((data) => data.json())
        .then((data) => {
            if (data.indexOf(referralElement.value) != -1) {
                referralOptions.classList.toggle('d-none');
                paymentOptions.classList.toggle('d-none');
            } else {
                errorMsg.textContent = 'Invalid Referral';
            }
            verificationLoader.classList.add('d-none');
        });
})