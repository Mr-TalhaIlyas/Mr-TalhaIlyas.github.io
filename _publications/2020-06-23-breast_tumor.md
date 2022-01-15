---
title: "Tumor Detection in Breast Histopathology Images via modified Faster-RCNN"
collection: publications
permalink: /publication/2020-06-23-breast_tumor
excerpt: "An algorithm for converting classical histopathology annotations to bounding box annotations is introduced in this paper. As a result, current state-of-the-art models could be used for tumor detection without having to relabel the data."
date: 2020-06-23
venue: ICROS 35th symposium
imageurl: '/images/publications/breast_tumor.png'
paperurl: '/files/breast_tumor.pdf'
link: 'https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE10609135'
citation: 'Ilyas, T., Kim, S. & Kim, H. (2021). Tumor Detection in Breast Histopathology Images via modified Faster-RCNN. Proceedings of the domestic conference of the Control Robot System Society(ICROS), 2021.'
---

<strong>Ilyas Talha<sup>1</sup></strong>, Kim Hyongsuk<sup>1,2,*</sup>, Kim Seongchul<sup>1,2,*</sup>

<sup>1</sup>Division of Electronic Engineering, Intelligent Robots Research Center, Jeonbuk National University, Jeonju, South Korea<br>
<sup>2</sup>Division of Electronic and Information Engineering, Jeonbuk National University, Jeonju, South Korea<br>
<sup>*</sup>Corresponding author: hskim@jbnu.ac.kr<br>

<center><img src = '/images/publications/breast_tumor.png'></center>

<i>An algorithm for converting classical histopathology annotations to bounding box annotations. So, that current state-of-the-art models could be used for tumor detection, without relabeling the data. </i>

## Abstract
Biopsied tissue detection and classification within Breast Histopathology Images is a fundamental prerequisite to estimate the aggressiveness of breast cancer. The development and fully automated pipelines for tissue detections and classification enables the analysis of thousands of tissues within a whole slide histology image, which opens possibilities for analysis and prognosis of breast tumor. There are multiple annotated histology datasets available for evaluating the performance of machine learning models. The number of samples in these datasets is quite limited and usually the annotations provided are in the form of pair of points which points to the center of different types of cells. Most of the works in this field approach this problem by cropping a patch of the WSI usually 50x50 pixels (centered at given point), and then classify these patches with a simple classifier CNN. In this work we propose a method of converting the provided annotations (center points) into bounding box annotations. Then we use Faster-RCNN to detect and classify different types of cells in the WSI in a fully automated pipeline. We also propose data augmentation technique to increase the dataset size for Breast Histology images. Our proposed approach showed an average precision of 70.34% for classification and detection of tumor tissues.

## Files
- [Paper](/files//files/breast_tumor.pdf)




