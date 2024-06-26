---
title: Push the Pace
slug: push-the-pace
description: Push the Pace is a real-time group fitness analytics platform with in-class leaderboard.
stack: javascript | node | react | redux | firebase | raspberrypi | bluetooth
thumbnail: push-the-pace-class
gallery: ptp-workout-data, ptp-workout-setup, ptp-workout-complete
sequence: 6
---

Push the Pace was a fitness analytics platform which captured heart rate data from multiple users in a group workout and provided live statistics and a leaderboard. Unlike other technology out there today, this was not restricted by a specific type of workout. It could be used for a HIIT class, circuit training, crossfit, barre, yoga, or anything else. The key metric that we focused on was your effort score, which is based on where your current heart rate is on your personal scale from resting to max. This allows a participant to compare themselves to their classmates regardless of size, sex, and age.

All of the tech for Push the Pace was built by myself and [Mike Bifulco](https://mikebifulco.com). The UI was a simple React application that connected to a [Firebase database](https://firebase.google.com/). We chose Firebase because of the real-time capabilities through built-in support for websockets. Heart rate data was collected over bluetooth low energy to a customized Raspberry Pi that had a beefy bluetooth radio. The rPi was running a headless Node application who's only job was to pair heart rate monitors in range and send the data points to Firebase. As each new data point was added, a serverless function picked up the change, found the correct user paird to that monitor, and calculated a number of statistics using their profile information. Those statistics were then written back to Firebase and picked up by the client app.

To build the leaderboard, all we had to do was pick up the last data point that was added to the database. This is where Firebase real-time-db really shines, giving us a websocket connection that listens to only the last child added. The client application barely had to do any work besides displaying those numbers as they came in. While the whole process may sound complicated, the latency from heart rate tick data coming from the monitor to calculated stats on the leaderboard was around 100-200ms.

Ultimately this project failed for a number of reasons. This was our first time trying to start a company and we were _very_ green. Bluetooth technology was not where we needed it to be, even though we were working with a researching pushing the absolutely boundaries of the tech. Concurrent connections was the biggest downfall and we couldn't pack enough RAM on a single radio chip to get more than 16 connections at once. Our goal was 100, which means we would have needed many coordinated radios that could hand off connections while maintaining pairing info. On top of that we had a pilot program with a gym that fell through. Along with some disputes with business partners, all signs pointed to shutting the project down, which we did in 2016.
