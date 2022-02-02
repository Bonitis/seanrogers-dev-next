---
title: smpl
slug: smpl
description: smpl is a coworking space management platform that provides everything a coworking owner needs to run their business.
stack: javascript | node | react | redux | materialui | firebase | stripe | zapier
thumbnail: smpl-members
gallery: smpl-profile, smpl-edit-resource, smpl-edit-plans
sequence: 0
---

smpl is a coworking space management platform that I built from the ground up alongside two cofounders, [Mike Bifulco](https://mikebifulco.com) and [Garrett Tichy](https://wearehygge.com). We bootstrapped the company and grew our customer base to thousands of users in 7 different countries. [smpl was acquired](https://thebusinesstimes.com/proximity-space-acquires-north-carolina-software-firm/) by [Proximity](https://www.proximity.space/) in 2020.

smpl is based on Create React App with Redux as state management and Material-UI for components and styling. The backend is a combination of Firebase Auth, Database, and Node functions. The core feature of the platform is to provide owners of a coworking space an easy and fast way to sign up new members and bill them every month. This was built using [Stripe Connect](https://stripe.com/connect), which allowed each space to have their own, independent Stripe account that smpl would manage on their behalf. Using webhooks from Stripe and serverless functions in Firebase, we were able to offload most of the work for payments, subscriptions, and invoices to micro-services. Utilizing webhooks with Firebase RTDB and Firestore, nearly all actions in the application were non-blocking and updates occurred seamlessly.

To extend the functionality of smpl, we utilitzed a [Zapier](https://zapier.com/) integration to let our customers build their own automation. The integration was built using a REST hooks pattern, which meant we could leverage the native database triggers from Firebase to send off events to Zapier. smpl customers used this to send messages to themselves for certain events, build out custom spreadsheets, and connect to CRM or accounting software.

After writing over 250k lines of code over several years, I am happy to know that smpl and it's customers are in the very capable hands of Josh Freed, Allison Blevins, and Josh Hudnall of [Proximity](https://www.proximity.space/).