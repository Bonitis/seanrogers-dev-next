---
title: The Wed Clique
slug: the-wed-clique
description: The Wed Clique is a platform for discovering and hiring wedding vendors.
stack: typescript | node | react | sass | graphql | postgres
thumbnail: the-wed-clique-home
gallery: twc-vendor-gallery, twc-message-vendor
sequence: 7
---

The Wed Clique is a platform for discovering and hiring wedding vendors. It was built to give couples the power to find all of their vendors in one place, then hire and pay them. I joined the project as a contractor, initially set out to rework the react UI to be fully responsive, but shifted as the business model changed.

The original application was built to be totally gated and once you have an account, you can explore and communicate with vendors. The major change was to open the vendor list to the public and provide a location-based discovery experience. On top of that, there were new paid slots for vendors to get a priority spot on the page. This was a complete overhaul of how the app worked and required a new search dynamic to make sure the landing page was really good.

The Wed Clique was built with a react UI using [apollo](https://www.apollographql.com/) which connected to a graphql backend and postgresql database. All of the vendor data was built by the users themselves, so there was a challenge to get any of that content indexed by search engines. In hindsight this would have been a good opportunity to use static site generation or server rendering, but we did not have time to replatform. The solution was to [prerender](https://prerender.io/react/) the vendor profiles and portfolios, which provided a quick and easy way of getting all of the content indexed without any further rewrites.
