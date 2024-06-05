---
title: Ekos Production Planning
slug: ekos-production-planning
description: Brewers use Ekos to plan their brewing schedules and treat an empty fermenter as lost revenue. Easy drag-and-drop helped streamline their planning process.
stack: typescript | react | webpack | styledcomponents | reactdnd | dotnet
thumbnail: ekos-production-planner
gallery: ekos-production-planner, ekos-planning-detail
sequence: 0
---

Production planning is crucial for the operations team at a brewery. An empty fermenter represents lost revenue—it is equipment that could be producing more beer to sell. The goal of this project was to provide a clear, powerful view of the production schedule, allowing brewers to manage their plans on the fly to match production capacity and sales forecasts.

This project presented an interesting interactivity challenge. It began with a Gantt chart of all the equipment on a production floor, displaying batches as they moved from one tank to another. The timeline needed to scroll horizontally to review past activities and plan for the future. Simple paging wasn't sufficient, as certain beers have long aging processes that wouldn’t fit neatly into pages of data. Instead, we opted for infinite scrolling to ensure a smooth and continuous experience. As users scroll backwards or forwards in time, the system fetches any batch schedule within the viewable timeframe plus a buffer.

Infinite scroll can be challenging on its own—add drag-and-drop features, and it becomes even more complex. The primary use case for this planner was to allow brewers to drag batches into different tanks, extend timelines, and evaluate empty space. With many beers fermenting or conditioning at once, everything needed to be color-coded and linked together. As users move or extend bars on the chart, the information is automatically saved to the batch, with details available in a side panel.

I tested three different CSS implementations of the Gantt chart to meet all these requirements. I ultimately chose CSS Grid to build the layout. During a drag operation, the element is removed from the flow and absolutely positioned. This approach allowed me to rely on the layout to manage positioning, only needing to specify exact coordinates for a single element when dragging. This greatly improved performance compared to a solution where everything was absolutely positioned or using a table layout with too many limitations. I rigorously tested these operations to ensure that normal day-to-day actions would feel smooth, even with a packed schedule.
