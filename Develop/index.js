const inquirer = require('inquirer');
const fs = require('fs');
const renderLicenseBadge = require('./utils/generateMarkdown.js')

const generateReadMe = ({ title, description, installation, usage, license, contributing, tests, questions }) => 
`
## ${title}
## Description
${description}
## Table of Contents
[Installation](#installation)
[Usage](#usage)
[Contributing](#contributing)
[License](#license)
[Tests](#tests)
[Questions](#questions)
## Installation
${installation}
## Usage
${usage}
## License
${renderLicenseBadge(license[0])}
## Contributing
${contributing}
## Tests
${tests}
## Questions
${questions}
`;

inquirer
.prompt([
  {
    type: 'input',
    name: 'title',
    message: 'What is the name of your project?',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Provide a short description of your project.',
  },
  {
    type: 'input',
    name: 'installation',
    message: 'What are the steps required to install your project?',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Provide instructions on how to use your project.',
  },
  {
    type: 'checkbox',
    name: 'license',
    message: 'What is the project license?',
    choices: ['MIT', 'Apache', 'GNU', 'N/A'],
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'List your collaborators, if any.',
  },
  {
    type: 'input',
    name: 'tests',
    message: 'How can you test your project?',
  },
  {
    type: 'input',
    name: 'questions',
    message: 'Provide a link to your Github profile.',
  },
])
.then((answers) => {
  const readMeContent = generateReadMe(answers);
  console.log(answers);
  fs.writeFile('README.md', readMeContent, (err) => 
  err ? console.log(err) : console.log('Successfully created README.md!')
  );
});