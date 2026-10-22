---
title: "Inverted pendulum"
permalink: /engineering/inverted-pendulum
layout: splash
---

<h1 style="text-align: center;">Inverted Pendulum with Reaction Wheel End Effector - A Control System Algorithm Test Bench </h1>
<h10 style="text-align: left;">Fall 2020 </h10>

<br> 

For my EE 471 Design of Control Systems Course my team and I built an inverted pendulum with a reaction wheel for the end effector

<iframe width="1254" height="705" src="https://www.youtube.com/embed/xlzi8Q5G42k" title="Inverted Pendulum With Reaction Wheel End Effector" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<br> 

We modeled the physics of the system with state space and then utilized a LQR controller to perform the actual stabilization. More information about the state space modeling and LQR controller can be found in the [youtube video linked here](https://www.youtube.com/watch?v=LlYtwWM7urA). 

Solidworks was used to get mass estimates on the various parts as well as center of mass data. 

The system consists of a BLDC motor, a couple rotary encoders, 3D printed parts, and metal fasteners. For electronics, the system uses a Arduino Uno and the [simpleFOC Arduino Uno Shield](https://simplefoc.com/). 
​
The project is inspired by this [github page](https://github.com/simplefoc/Arduino-FOC-reaction-wheel-inverted-pendulum), but I have modified the CAD files to fit my particular setup.

You can checkout out our lab report here: [download pdf](/assets/ee471_final_lab_project_.pdf).





