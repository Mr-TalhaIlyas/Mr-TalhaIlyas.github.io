---
permalink: /software/
title: "Software"
---

As one of my two research agendas involves improving the tools we use to study peace and conflict. Below you'll find some toolkits and software whihc might prove helpful to other researchers in machine learning field.

# <span style="color:teal">Fully Connected CRF</span>
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) ![PyPI](https://img.shields.io/pypi/v/a) [![Downloads](https://pepy.tech/badge/seg-crf)](https://pepy.tech/project/seg-crf) [![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FMr-TalhaIlyas%2FConditional-Random-Fields-CRF&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

This repo implements CRF as described in Deeplab paper it takes about 0.2 seconds per image. Following image is taken form **DeepLab** paper

<img src="https://github.com/Mr-TalhaIlyas/Conditional-Random-Fields-CRF/raw/master/screens/img1.png" width="350" height="250">

**Intallation**

```r
pip install seg-crf
```

[![](https://github.com/Mr-TalhaIlyas/Mr-TalhaIlyas.github.io/raw/master/images/git.png "Github")](https://github.com/Mr-TalhaIlyas/Conditional-Random-Fields-CRF) [![](https://github.com/Mr-TalhaIlyas/Mr-TalhaIlyas.github.io/raw/master/images/pngegg%20(3).png "PyPi")](https://pypi.org/project/seg-crf/)

# <span style="color:teal">Converting-Grayscale-Semantic-Masks-to-Color</span>
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) ![PyPI](https://img.shields.io/pypi/v/five?color=green&label=pypi%20project) [![DOI](https://zenodo.org/badge/357129295.svg)](https://zenodo.org/badge/latestdoi/357129295) [![Downloads](https://pepy.tech/badge/gray2color)](https://pepy.tech/project/gray2color) [![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FMr-TalhaIlyas%2FConverting-Grayscale-Semantic-Masks-to-Color&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

This lib converts the grayscale semantic masks obtained at the output a CNN and fills it with colors for example in case of cityscape dataset you have 30 channels at the output of CNN and after using argmax to create one channel semantic mask you get the following output

<img src="https://github.com/Mr-TalhaIlyas/Converting-Grayscale-Semantic-Masks-to-Color/raw/master/screens/gray.png" width="150" height="100"> <img src="https://github.com/Mr-TalhaIlyas/Converting-Grayscale-Semantic-Masks-to-Color/raw/master/screens/rgb.png" width="150" height="100">

**Intallation**

```r
pip install gray2color
```

[![](https://github.com/Mr-TalhaIlyas/Mr-TalhaIlyas.github.io/raw/master/images/git.png "Github")](https://github.com/Mr-TalhaIlyas/Converting-Grayscale-Semantic-Masks-to-Color) [![](https://github.com/Mr-TalhaIlyas/Mr-TalhaIlyas.github.io/raw/master/images/pngegg%20(3).png "PyPi")](https://pypi.org/project/gray2color/)

# <span style="color:teal">Tensorflow/ Keras Model Profiler</span>
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<img alt="Keras" src="https://img.shields.io/badge/Keras%20-%23D00000.svg?&style=for-the-badge&logo=Keras&logoColor=white"/> <img alt="TensorFlow" src="https://img.shields.io/badge/TensorFlow%20-%23FF6F00.svg?&style=for-the-badge&logo=TensorFlow&logoColor=white" /> [![Downloads](https://pepy.tech/badge/model-profiler)](https://pepy.tech/project/model-profiler) [![Generic badge](https://img.shields.io/badge/Version-1.1.8-<COLOR>.svg)](https://shields.io/)

Gives you some basic but important information about your `tf` or `keras` model like,

* Model Parameters
* Model memory requirement on GPU
* Memory required to store parameters `model weights`.
* GPU availability and GPU IDs if available

**Intallation**

```r
pip install gray2color
```
**Output**
```
| Model Profile                    | Value         | Unit    |
|----------------------------------|---------------|---------|
| Selected GPUs                    | ['0', '1']    | GPU IDs |
| No. of FLOPs                     | 1.5651        | BFLOPs  |
| GPU Memory Requirement           | 41.7385       | GB      |
| Model Parameters                 | 12.3205       | Million |
| Memory Required by Model Weights | 46.9991       | MB      |
```
[![](https://github.com/Mr-TalhaIlyas/Mr-TalhaIlyas.github.io/raw/master/images/git.png "Github")](https://github.com/Mr-TalhaIlyas/Tensorflow-Keras-Model-Profiler) [![](https://github.com/Mr-TalhaIlyas/Mr-TalhaIlyas.github.io/raw/master/images/pngegg%20(3).png "PyPi")](https://pypi.org/project/model-profiler/)

# <span style="color:teal">Plants Data Uploader</span>
[![made-with-python](https://img.shields.io/badge/Made%20with-Python-1f425f.svg)](https://www.python.org/)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)

Made for uploading the data to any FTP server, provided that correct credientials are known. Also analyze the statistics of data, e.g. how many images are available, and which person has collected more images.

<img src="https://github.com/Mr-TalhaIlyas/PlantsDataUploader/blob/master/screens/ezgif.com-gif-maker%20(1).gif" width="350" height="250">
[![Alt text](https://github.com/Mr-TalhaIlyas/PlantsDataUploader/blob/master/screens/ezgif.com-gif-maker%20(1).gif)](https://www.youtube.com/watch?v=FLjeoDETX1U)

**Intallation**
Read the instruction on follwing links for usage, installation and download.

[![](https://github.com/Mr-TalhaIlyas/Mr-TalhaIlyas.github.io/raw/master/images/git.png "Github")](https://github.com/Mr-TalhaIlyas/PlantsDataUploader) [![](https://github.com/Mr-TalhaIlyas/Mr-TalhaIlyas.github.io/blob/master/images/g%20drive.png "G Drive")](https://drive.google.com/drive/u/2/folders/1PYbKXt1IecuZO_rHEOOolLGP_W7Y8WSM)
