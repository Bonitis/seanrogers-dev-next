---
title: TakeShape
slug: takeshape
description: TakeShape is an api mesh which allows you to combine common services or any arbitrary api into a single graphql api.
stack: typescript | node | react | redux | materialui | graphql | lambda | dynamodb
thumbnail: takeshape-api-explorer
gallery: takeshape-edit-content, takeshape-version-control
sequence: 3
---

TakeShape is an api mesh for the [Jamstack](https://jamstack.org/) allowing you to configure a hosted graphql api that combines all of your services and data into a single endpoint. I joined TakeShape right after the two founders, Mark and Andrew, had been accepted into the [Techstars Philadelphia](https://www.techstars.com/accelerators/comcast) accelerator program. The three of us moved to Philly for three months with the goals of getting an MVP of the mesh product released, and raising a round of funding.

While I was originally brought on to focus on the react/redux client application, I soon found that I was spending a lot of time helping to build out the node/graphql backend. I am particularly proud of two features that I worked on at TakeShape. The first was the initial iteration of the arbitrary graphql service. We needed a way for a developer to connect TakeShape to any graphql api and make use of any of those queries or mutations while combining it with the built-in content management system. Without revealing the details, we were able to delegate the incoming requests out to the correct services, and stitch the result back together to deliver the correct response, while keeping performance between 200ms-1s.

The second project that was a highlight of my time at TakeShape was adding a [where clause](https://app.takeshape.io/docs/api/where-filter) filter to the content api. All user modeled content stored by TakeShape is indexed with [elasticsearch](https://www.elastic.co/) to provide search and filtering. The problem was that users needed to construct those filters without any auto-complete or syntax help; they needed to know how to create an elasticsearch query. To add the where clause, a set of graphql types get generated from the user's content model, with filtering options and boolean operators based on the data types. This provides a strongly typed filtering tool that could be easily expored in the api-explorer or graphiql. Once the query is submitted, the api converts that back into an elasticsearch query, which gives the user the same performance benefit of the indexed data, while adding a much better developer experience.

While I am not at TakeShape anymore, Andrew and Mark are still at it with a team of rockstar developers. They are two of the smartest engineers and entrepreneurs I have had the pleasure of working alongside.