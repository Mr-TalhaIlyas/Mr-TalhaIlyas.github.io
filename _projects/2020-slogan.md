---
title: "SloGAN: Character Level Adversarial Lyric Generation"
collection: projects
excerpt: "Rap lyric generation using deep learning."
imageurl: '/images/projects/seqgan.png'
date: 2020-05-31
paperurl: '/files/SloGAN.pdf'
---

Aidan Cookson, <strong>Krish Kabra</strong>, and Auguste Hirth <br>
Course: CS 263 - Natural Language Processing <br>
Instructor: Prof. Kai-Wei Chang <br> 
Quarter: Spring 2020

<iframe width="1180" height="664" src="https://www.youtube.com/embed/6ge25s78bDc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Abstract 
This paper explores the application of a deep learning models for the task of rap lyric generation. We first propose a generative LSTM
character-level model that contrasts with recent word-level approaches. We rigorously compare the effectiveness of a character-level
models with their word-level counterparts using BLEU, RhymeAnalyzer, and human authenticity prediction metrics. Secondly, we
attempt to implement a SeqGAN for the rap lyric generation task in order to combat pitfalls of traditional maximum-likelihood estimation
methods. Unfortunately, our SeqGAN model fails to converge. We provide reasons and possible solutions to improve the rap lyric generation
task using adversarially trained networks.

## Files
- [Paper](/files/SloGAN.pdf)