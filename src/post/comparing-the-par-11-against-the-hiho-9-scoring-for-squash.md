---
title: Comparing the PAR-11 against the HiHo-9 Scoring for Squash
date: 2009-08-31
layout: post.njk
tags: post
---

## Monte Carlo Simulation: Point-A-Rally vs. Hand-In Hand-Out Scoring Debate (2009)

In 2009, the Massachusetts Squash community debated the merits of the point-a-rally (PAR) scoring system versus the traditional hand-in hand-out (Hi-Ho) scoring system. To contribute to this discussion, I developed a Monte Carlo simulation using Matlab to observe the statistical dynamics of both systems.

The Matlab script assumes a simple parametric distribution to compute the probabilities of winning a rally. It simulates 5,000 games between two players, systematically varying the probability of winning a rally to analyze outcomes across different skill levels.

[GitHub](https://github.com/ckulasekaran/PAR-11-vs-HiHo-9-Scoring-for-Squash)

## Key Findings

The results were conclusive: unless the skill gap between you and your opponent is zero, Hi-Ho scoring is generally disadvantageous. For players with even a slight skill disparity, the PAR system provides a fairer and more balanced scoring structure.

[Download PDF](/assets/pdf/par-11-vs-hiho-9-squash.pdf)