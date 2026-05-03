---
title: Visualized Engineering
slug: visualized-engineering
description: An interactive Wolfram-Alpha-inspired site for mechanical engineering — drag a slider, watch the diagram animate and the equations show their work.
stack: typescript | react | tanstack | vite | shadcn
thumbnail: visualized-pipe-flow
gallery: visualized-home, visualized-truss, visualized-formula-trace, visualized-pid, visualized-pid-formal-math
sequence: 0
---

[Visualized](https://www.visualized.engineering) is a learning tool for mechanical engineering, built around one simple idea: when you can move a slider and watch the diagram and the math react together, hard concepts become obvious. I studied ME before ending up in software — first writing control software for industrial cooling systems, then everything since — and I've always wanted to revisit those ME concepts the way I wish I'd first learned them. The difference between staring at a textbook formula and watching that same formula respond live to my inputs is the difference between memorizing a result and *feeling* why it's true. Wolfram Alpha was the template.

Architecturally each concept is a folder of four files: a typed schema declaring the parameters, the formula DAG, the references, and the verification cases; an MDX file with the prose; an "intuition" visualization for the primary view; and a more conventional engineering diagram for the secondary view. A registry auto-discovers the folders via `import.meta.glob`, so adding the next concept is just adding a folder. The framework around them — `Pod`, `ParameterPanel`, `FormulaTrace`, `VerificationExample`, `ReferencesPod` — is what gets reused; the visualizations themselves are bespoke per concept because intuition-first visuals don't generalize.

The stack is TanStack Start on Vite, React 19, Tailwind v4, shadcn/ui, MDX for the per-concept narrative, KaTeX for equations rendered server-side and memoized, and mathjs for the formula DAG evaluator. State is per-route React Context + `useReducer` + `useSyncExternalStore` so slider drags don't cascade re-renders into siblings — no global state library. URL params are kept in sync via a debounced effect so any scenario you set up is shareable as a link.

Two engineering decisions shaped everything. First, **schema-driven concepts.** The formula DAG lives in TypeScript, not in MDX or JSX, which means the same source feeds the live "show your work" trace in the UI, the build-time unit reconciliation, and the verification tests. Second, **accuracy is non-negotiable.** Every formula carries a verified URL citation, every concept ships with at least one worked verification case backed by an expected-value check, and the build refuses to ship if a unit doesn't reconcile. The tool is useless if the numbers are wrong.

Hosted on Vercel at [visualized.engineering](https://www.visualized.engineering).
