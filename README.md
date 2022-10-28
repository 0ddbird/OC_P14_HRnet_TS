# Project 14 OpenClassrooms: HRNet

## Introduction

HRNet is an application built for Human Resources staff to consult the company employees and add new ones.
The goal of this project was to build a React app based on a given jQuery app.

The original app was made with 4 jQuery libraries:

- A **modal**
- A **datepicker**
- A **table**
- A **select**

### Briefing

- **Build one** of these jQuery libraries as a React stateless component
- **Share that library on NPM** and re-import it as an external dependency
- **Import equivalent React libraries** to replace the 3 others jQuery plugins
- **Build a React app** using these 4 React libraries and mocked data
- **Benchmark performances** between jQuery and React versions using Lighthouse

### Completed

| Component |  Origin | Language | NPM package name | GitHub repo | Relies on |
|--|--|--|--|--|--|
|Select| homemade | TypeScript |[react-ts-controlled-select](https://www.npmjs.com/package/react-ts-controlled-select)|[:file_folder:](https://github.com/0ddbird/react-ts-controlled-select)| - |
|Modal| homemade | TypeScript |[react-ts-simple-modal](https://www.npmjs.com/package/react-ts-simple-modal)|[:file_folder:](https://github.com/0ddbird/react-ts-modal)| - |
|Table| homemade | TypeScript |[react-ts-table](https://www.npmjs.com/package/react-ts-table)| [:file_folder:](https://github.com/0ddbird/react-ts-table)| Select |
|Datepicker| homemade | TypeScript |[react-ts-datepicker](https://www.npmjs.com/package/react-ts-datepicker)| [:file_folder:](https://github.com/0ddbird/react-ts-datepicker)| Select |

I made the frontend with **Typescript React**, using *Standard* ESlint guidelines and Sass for styling.

I built a REST API to replace mocked data with **Typescript Node**, **Express**, **MYSQL2** and a **MySQL** database.

### WIP Features

- Backend data validation
- Admin login with JWT
- Swagger for API routes
- Convert an *Import JSON file* module made in the first ReactJS version to TS
- Jest tests
- JSDoc
