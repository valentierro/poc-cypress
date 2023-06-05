<img src="https://learn.cypress.io/images/logo/logo.svg">  <img src="https://i.pinimg.com/originals/df/9b/06/df9b0688eef574c8c776adcd60d9c094.png" width="12%">   <img src="https://www.kelvinsantiago.com.br/wp-content/uploads/2019/05/node-1.png" width="6%">

<img alt="npm" src="https://img.shields.io/badge/Cypress-12.13.0-green"> <img alt="npm" src="https://img.shields.io/badge/Languages-Typescript-orange"> <img alt="npm" src="https://img.shields.io/badge/-Cucumber-green">
<img alt="npm" src="https://img.shields.io/badge/GitlabCI-Ready!-blue">

# Cypress POC
POC using Cypress, Cucumber and typescript.

## Table of content

- [Pre-requisites](#prerequisites)
- [Project setup](#project-setup)
- [Running tests](#running-tests)
- [Approach](#approach)
    - [Cucumber](#cucumber)
    - [Page Objects](#page-objects)
    - [Actions](#page-objects)
- [Project Structure](#project-structure)
- [Main libs](#main-libs)
- [Avaiable Reports](#avaiable-reports)
- [Authors](#authors)


## Prerequisites:

This project needs pre settings to work properly:

- NodeJs installed;
```
//ubuntu installation

$ sudo apt update
$ sudo apt install nodejs 

//verify version
$ nodejs -v

output:
v10.19.0

```

- Git installed
```
//ubuntu installation

$ sudo apt update
$ sudo sudo apt install git 

//verify version
$ git --version

output:
git version 2.25.1
```

- VSCODE (or another source code editor)


## Project setup:

Create a folder of your choice, clone the solution:

```
git clone https://github.com/valentierro/cypress-base-project.git
```

Open the folder in your source code editor and install the npm packages

```
//install packages

npm i
```

Note: On the `config` folder you can configure your environment variables, creating different env files for each environment.

## Running tests:

After all packages has been installed, you can execute the following command to open the cypress runner:

```
npx cypress open

//See possible arguments here: https://docs.cypress.io/guides/guides/command-line.html#cypress-open
```

You can also execute the tests using cypress CLI commands. The CLI commands will execute the scripts created in your `package.json` file.

`package.json` file example:
```
{
  "scripts": {
    "run-all-ui": "npx cypress run --spec 'cypress/e2e/**/*.feature'"
  }
}
```

To execute the script `run-all-ui` you should pass the following command:
```
npx run run-all-ui
```

To run passing the environment file (config folder):
```
npx run run-all-ui --env configFile=cypress/config/example.cypress.config.ts
```


note: You can add as many scripts as you want to your `package.json` file.

See more about cypress CLI commands here: https://docs.cypress.io/guides/guides/command-line.html

## Approach:

This POC was developed using BDD approach with Cucumber, organized in layers (Tests layers, Business logic layer and Page Objects layer), to make sure the reuse of elements, methods and the maintenance as well.

### Cucumber

BDD is meant to be collaborative. Everyone from the customer to the tester should be able to easily engage in product development. And anyone can write behavior scenarios because they are written in plain language. Scenarios are:

- Requirements for product owners
- Acceptance criteria for developers
- Test cases for testers
- Scripts for automators
- Description for other stakeholders

### Page Objects

Page Object Pattern provides flexibility to writing code by splitting into different classes and also keeps the test scripts separate from the locators.

- Code reusability – The same page class can be used in different tests and all the locators and their methods can be re-used across various test cases.
- Code maintainability – There is a clean separation between test code which can be our functional scenarios and page-specific code such as locators and methods. So, if some structural change happens on the web page, it will just impact the page object and will not have any impacts on the test scripts.

### Actions

In this folder all the actions classes are created, for each system/app page will be created a class with possible actions.

For example, `RegistrationActs.ts`:

```
registerNewAccount(name,email,pass:string){

    this.getInputName().type(name)
    this.getInputEmail().type(email)
    this.getInputPass().type(pass)
    this.getInputPassCheck().type(pass)

  }
```

These actions will be called in your step definitions classes.

```
const registrationActs = new RegistrationActs();

Given("I fill the fields {string},{string} and {string}", (name, email, pass: string) => {
    
    registrationActs.registerNewAccount(name,email,pass)

});
```

## Project Structure:

    Cypress
    ├── fixtures                       # Fixture root folder
    ├── config                         # Config folfer (env files)
    ├── e2e                            # E2E tests folder
    │   ├── feature1.feature           # Feature file
    │   ├── feature2.feature           # Feature file
    │   ├── ...                        # other feature files...
    ├── support                        # Support root folder (to reusable components)
    │   ├── objects_actions            # Mapped web elements / Business logic layer
    │   ├── step_definitions           # Features step definitions
    │   ├── ProjectHelper.ts           # Default reusable class
    └── ...
    package.json                       # Json with dev dependencies and scripts
    ...
    
 
## Main libs:

| Lib Name  | Base version  | Description  |
| :------------ |:---------------:|:---------------:|
| cypress      | <img src="https://img.shields.io/badge/-12.13.0-green"> | Framework de testes automatizados ponta a ponta usando JavaScript |
| typescript      | <img src="https://img.shields.io/badge/-5.0.4-green"> | Open-source language which builds on JavaScript |
| cypress-cucumber-preprocessor      | <img src="https://img.shields.io/badge/-17.2.0-green">        | adds support for using feature files when testing with Cypress. |


## Avaiable report:

This project will generate the HTML report automatically after tests execution. After execution a report file named `cucumber-report.html` will be generated in the root folder.

- HTML report:

![](https://i.ibb.co/XDh4wdR/report.jpg)



## Authors

- Erick Henrique Valentin dos Santos

<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white">  https://br.linkedin.com/in/erick-valentin-qa-automation-engineer

