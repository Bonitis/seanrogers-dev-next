---
title: Ekos Yeast Management
slug: ekos-yeast-management
description: Yeast is the most important ingredient in beer production. Tracking metrics across generations and estimating cost distribution is critical to an efficient brewery.
stack: typescript | react | webpack | styledcomponents | dotnet
thumbnail: ekos-yeast-management
gallery: ekos-yeast-management, ekos-yeast-list, ekos-yeast-vertical
sequence: 1
---

Yeast is the most important ingredient in alcohol production and can often be the most expensive. To mitigate these costs, breweries harvest, propagate, and re-pitch yeast from batch to batch. It is also a fragile ingredient. Factors such as temperature, pH, oxygen levels, and contaminants can cause the yeast to perform poorly, leading to off-flavors in the beer. Therefore, it is crucial for brewers to track these metrics, along with the cell count and viability of the yeast, to ensure it produces the best product.

This project began with a new, hierarchical data model that had not been used before at Ekos. Yeast is a unique ingredient because it can be reused multiple times, grows with each use, and fundamentally changes with each fermentation cycle. We needed to represent this hierarchy in a tree diagram that provided easy access to actions and metrics. Efficient breweries can get 15-17 generations out of a single yeast strain, so the model needed to accommodate substantial growth. We also introduced a standard codification process to match yeast in a brewer's inventory with an industry catalog.

We started by building the data model and identifying the most important properties. From there, we were able to parallelize the effort by working with mock data to develop both an API and UI. This approach allowed us to build prototypes and gather user feedback quickly. The UI was built on a zoom-pinch-pan canvas, offering maximum flexibility for handling an arbitrarily large tree diagram, whether viewed on desktop or mobile. To prevent interaction collisions, all actions were incorporated into custom right-click/long-press context menus.

The tree diagram can be oriented in multiple ways to suit different mental models of brewers. Some focus on the latest yeast pitch and prefer an inverted vertical tree, while others start at the beginning and pan horizontally. All these options were implemented and persisted so that each brewer could customize their view. At the top, rollup statistics allow the team to evaluate performance against the cost of the original inventory, enabling accurate reporting of COGS.
