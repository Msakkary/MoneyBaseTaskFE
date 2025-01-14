# MoneybaseTask

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.7.

## About the Project

MoneybaseTask is a stock tracking application that demonstrates two approaches for handling and visualizing stock data:

1. **Mock Data**: This version uses mock data to simulate stock price changes at short intervals, providing a quick and dynamic way to observe how the application handles updates in a real-time-like environment.
2. **Real-Time Data**: This version integrates with the [Finnhub API](https://finnhub.io/) to fetch and display real-time stock data. The real-time approach utilizes WebSockets for continuous updates, ensuring up-to-date information is displayed.

The mock data version serves as a testing environment, while the real-time integration showcases the application's ability to handle live data. These two approaches provide flexibility for users to explore the application's behavior under different scenarios.

---

## Development Server

To start a local development server, run:

```bash
ng serve

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```


## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
