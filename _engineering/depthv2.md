---
title: "Depth V2"
permalink: /engineering/depthv2
layout: splash
---

<h1 style="text-align: center;">Depth V2 - A Next Generation Audio Freediving Computer</h1>
<h10 style="text-align: left;">March 2021 - Present  </h10>
<br>

[Freediving](https://en.wikipedia.org/wiki/Freediving) - the sport or activity of diving underwater without the use of breathing apparatus, especially in deep water.

## What is Depthv2?
Depth V2 is a head mounted audio freediving computer and music player designed for the underwater adventurer. Users can set configurable dive notifications, listen to their favorite music, and record their dives. It is the second iteration of the [Depth V1 dive computer](/engineering/depthv1)
, and it is available for purchase here: [Depth V2](https://www.https://www.depthdiving.com)

Depth was developed by myself and my Co-Founder [Fran](https://www.linkedin.com/in/fransheska-colon/). I designed and built the casing, electronics, firmware, python test tools, pressure testing chamber, and assembly jigs. Fran developed the mobile app.

Why do you need a freediving computer? 
- Keep track of surface interval to prevent shallow water blackouts
- Stay informed about your depth, dive speed, dive time, and other metrics
- Log dives for future review + training

What makes Depth novel?
- Audio interface only, no screen (audio is transferred via bone conduction transducer)
- Fully wireless (Data transfer over Bluetooth, charging is wireless on Qi charging pads)
- Head mounted 

![image](/assets/images/depthv2_head_mounted.JPG)

![image](/assets/images/depth_timeline.png)

### Firmware

The firmware for Depth V2 is as a state machine with 4 major states: Sleep, Dive, Music Player, and Bluetooth:

![image](/assets/images/depth_fw_state_machine.png){: width="700" }

Depth V2's firmware has many new features including:

- Over the air firmware updates via Bluetooth Low Energy from a laptop or mobile device (IOS or Android)
- Several configurable in dive notifications for depth, time and velocity
- A music player
- 2hz, 4hz, and 8hz dive logging
- tap detection for skipping songs or triggering a notification
- Lower power consumption in sleep mode and dive mode
- and much more

High level firmware info: 
- Firmware written in C++
- Code runs as a state machine, spending most of the time in sleep mode to conserve energy
- Platform.io tool chain used for compilation and uploading FW
- Pressure and temperature sampling rate is dynamically adjusted depending on mode to conserve energy

Since the new firmware featured OTA and bluetooth interactions I needed to map out how all the different pieces of software interacted with each other:  

### Software Overview

Leveraged open source software
- Wrote over the air update + file transfer firmware/software from scratch
- Created Python test tool to simulate, debug, and prototype Mobile App x firmware interactions
- Mobile app written in javascript using Reactive native framework by Fran


![image](/assets/images/depth_sw_arch.png){: width="700" }

We had 2 main pieces of software: mobile app and the BLE test tool. I wrote the BLE test tool to enable development of firmware and potential mobile app features. After a feature had been debugged on the BLE test tool, Fran and I worked on porting over the code to JS (the mobile app uses [React Native](https://reactnative.dev)). The workflow enabled the firmware development to be asynchronous with mobile app development, allowing Fran and I to work at our own pace.

#### Electronics

- 4 layer PCB, Designed in KiCAD
- Hardware design improved over 4 iterations
- Developed remote programming PCB and micro bed of nails tester
- Design driven by small form factor (15mm x 20mm x 0.8mm) and supply chain challenges

![](/assets/images/pcbav2.png){: width="500" }  |  ![](/assets/images/pcbav3.png){: width="500" } | ![](/assets/images/pcbav4.png){: width="500" } 
![](/assets/images/depth_pcb_panel.png){: width="500" } 

Hardware updates include:
- New IMU with tap detection
- New MCU - ESP32 S3 Mini (smaller form factor)
- Hall effect sensor as part of water proof button assembly
- Audio electronics for driving speaker
- On board wireless charging electronics and coil
- Indication LED
- Smaller form factor.

![image](/assets/images/depth_ee_highlevel.png){: width="700" }

### Mechanical Design

- Casings prototyped with SLA 3D printing (SLA prints are waterproof) and designed in Solidworks
- 3D printed mask clip allows Depth to be used on top of a hood
- Two casing halves are epoxied together 
- Non destructive pressure testing to 150m rating as per [EN13319](https://standards.iteh.ai/catalog/standards/cen/5d35e933-ca50-4d80-8c9d-631f5597b784/en-13319-2000) with custom build pressure chamber
- Performed destructive pressure testing to understand weakest casing sections
- Did not use FAE due to non standard pressure vessel geometry

![image](/assets/images/depth_mechE.png){: width="700" } | ![image](/assets/images/depth_pressure_chamber.png){: width="700" } 
![image](/assets/images/casing%20prototyping.png){: width="700" } | ![image](/assets/images/depth5x.png){: width="700" } 

### Lessons Learned

- Commercializing a hobby project is much more difficult than just building it for yourself or a limited technical user group
- Balancing limited resources and executing an ambitious vision is very difficult; Make sure to reevaluate priorities often to ensure you are working on the highest value tasks
- When managing so many different goals, staying organized is critical
- Communicate with customers as often as possible and continuously encourage critical feedback
- Hand assembling circuit boards is fine for prototyping, but for production always use a CM (DIY vs buy)




