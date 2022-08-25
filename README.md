# Hybrid-Encryption(AES+DES)
### Requirements
```
1. Install Visual Studio Code - https://code.visualstudio.com/download
2. Install Node.js - https://nodejs.org/en/download/
```
### MongoDB account
```
1. Go to MongoDB atlas sign in page - https://account.mongodb.com/account/login
2. Enter email address - test.1234.1101@gmail.com and click next.
3. Enter password - team1cybersecproject and click login.
4. Click on 'Browse Collections' to view the data.
```

### Instructions to run code
```
1. Open Hybrid-Encryption-main folder in a suitable editor(preferably VS Code)
2. Open a new terminal in VS Code 
3. Type the following commands -
  3.1 cd backend
  3.2 npm i
  3.3 node index.js
4. Open home.html in the browser.
```
### Code Flow Steps
```
1. Click on 'Register' button.
2. Enter the following details to create a new user:
  2.1 First Name: John
  2.2 Last Name: Andrews
  2.3 Email Address: john.andrews@gmail.com
  2.4 Password: qwerty
  2.5 Date of birth: <any date as per your choice>
  2.6 Gender: Male
  2.7 Phone Number: 9878675645
3. Click on submit
4. Click on return to home page link
5. Click on Login button
6. Enter the following details to login:
  6.1 Email Address: john.andrews@gmail.com
  6.2 Password: qwerty
7. Click on submit and login
8. Click on View Details button to view details of user
9. Go back using back button of chrome and Click on View Password
10. Enter the following details:
  10.1 Email Address: john.andrews@gmail.com
  10.2 Passphrase: hello1234
11. Once token is created, go back and click on Create Password
12. Enter the following details:
  12.1 Email address: john.andrews@gmail.com
  12.2 Label: Facebook
13. Click on submit and click on the back button twice in chrome
14. Click again on View Passwords and enter the following details -
  14.1 Email Address: john.andrews@gmail.com
  14.2 Passphrase: hello1234 
15. You will now be able to view passwords.
16. By logging into mongodb atlas as mentioned above, we can see the encrypted data being stored in the collections - users, passwords, and tokens.
```
