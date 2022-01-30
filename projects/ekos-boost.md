---
title: Ekos Boost
description: Ekos helps craft beverage makers streamline inventory, production, sales, and accounting with one affordable business management software.
stack: typescript | react | webpack | sass | dotnet
thumbnail: ekos-boost-home
gallery: boost-detail, boost-order-edit
sequence: 2
---

Boost is now the core [Ekos](https://goekos.com) platform, which allows craft producers to streamline their inventory, production, sales, and accounting processes. The original codebase was written as a full-stack ASP.NET application with server rendered pages based on a custom markup syntax. As new features became increasingly complex, the need to split the business logic from the UI became apparent. The backend is now served as a .NET REST api and the UI is a React application built off of a create-react-app base.

Boost has provided a flexible UI codebase that maintains all of the existing features from the original application, while providing opportunity to build and expand that feature set. To further increase that flexibility, we introduced [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/), which allows separate teams to build micro frontends that have an independent deployment process, and seamlessly incorporate those into Boost. This has drastically improved the development experience and allows for rapid iteration while protecting the rest of the application.

In order to live the micro frontend dream, we needed to share standard UI components. Thus our component library was born. This is built in React, styled using Styled-Components, Storybook as the dev environment, and bundled with Rollup. It gets published to a private Azure npm package and is being used by all Ekos frontend projects.

All of this was built within a ~1.5 year timeframe while simultaneously designing, building, and releasing an entire new product, [Ekos Order Hub](/projects/ekos-order-hub).