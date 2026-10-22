---
#this page is the home page, at graysongalisky.com
layout: splash
title: home
order: 1

eng_row:
  - image_path: /assets/images/biohand.png
    url: "/engineering/"
    title: "Engineering Projects"
    excerpt: "I've worked on hardware and software projects ranging from dive computers to spacecraft."
    btn_label: "Learn More"
    btn_class: "btn--inverse"

art_row:
  - image_path: /assets/images/bull_kelp_bottom_POV.JPG
    url: "/art/"
    title: "Photography And Synth Loops"
    excerpt: 'I am a hobbyist underwater (and above water) photographer. Almost all of my underwater photos and video are taken on a breath hold while freediving. I also enjoy making simple music with synthesizers. '
    btn_label: "Learn More"
    btn_class: "btn--inverse"

about_row:
  - image_path: /assets/images/zero_g_mexico.JPEG
    url: "/about/"
    title: "About me"
    excerpt: 'Learn more about my background and passions'
    btn_label: "Learn more"
    btn_class: "btn--inverse"
---

<h1 style="text-align: center;">Welcome to my portfolio </h1>
<h3 style="text-align: center;">Check out the links below to learn more about my projects</h3>

<br> 

{% include feature_row id="eng_row" type="left" %}

{% include feature_row id="art_row" type="left" %}

{% include feature_row id="about_row" type="left" %}


