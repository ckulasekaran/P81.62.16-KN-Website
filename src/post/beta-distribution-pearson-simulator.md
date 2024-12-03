---
title: Beta Distribution (Pearson) Simulator
date: 2020-02-27
layout: post.njk
tags: post
---

Occasionally, after the family falls asleep, I sneak away into the kitchen to play around with some math and tech. I recently built a [micro-application][1] to simulate a four-parameter beta distribution using the [Pearson system][2].

![Beta Distribution Pearson Simulator](/assets/images/pearson-simulator.png)

The [Pearson Simulator web app][1] is available for use on my server weekdays between 14:00 - 15:00 GMT. Please note that this is experimental.

## Important Notes ##
* Be mindful of combinations of moments. i.e. Kurtosis > Skewness² + 1.
* Since this is a micro-server prototype, I have limited the application to a maximum of three instances. Be patient for recomputing / refresh rates. 
* Each instance has a five minute timeout, so if you are unable to access or use the app - you will have to wait a little while until a resource is free.


[1]: https://cel.kulasekaran.com/apps/pearson
[2]: https://en.wikipedia.org/wiki/Pearson_distribution