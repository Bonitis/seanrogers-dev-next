---
title: Ekos Order Hub
slug: ekos-order-hub
description: Ekos Order Hub is a digital portal for your distributors and customer accounts to see available inventory and enter and manage orders.
stack: typescript | react | nextjs | styledcomponents | dotnet | azure
thumbnail: ekos-order-hub-products
gallery: orderhub-home, orderhub-cart, orderhub-order
sequence: 1
---

[Ekos Order Hub](https://www.goekos.com/orderhub/) is a digital portal for distributors and customer accounts of craft producers to see available inventory and enter and manage orders. It is built using [nextjs](https://nextjs.org/) as a progressive web app, and connects to a REST api built in .NET hosted on Azure. Authentication is provided by Azure B2C which allowed us to authenticate new users outside of the [Ekos Core](/projects/ekos-boost) platform.

Order Hub went from concept to first production release within 3 months of intense work. We wanted to get this product out for a specific conference which provided the best opportunity to show it off to all of our customers at once. Even though we had a short amount of time to get the product out the door, we managed to emphasize performance in every decision. I'm particularly proud that the project has maintained a lighthouse performance score of 99 despite lots of changes and new features.

Order Hub allowed our team to build a greenfield project while also establishing a new reference architecture for future projects. It was a forcing function to do many of the things I had planned to do, but weren't a priority yet. The first major task was moving all common UI components to our own component library in a private npm package. That one change has drastically sped up development across all teams. I also helped build the CICD pipeline for all UI projects when there was no automation previously. Since then, we have been able to iterate on the product faster than ever before, with a pipeline that gives us greater confidence in everything we ship.