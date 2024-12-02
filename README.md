# 🎉 Welcome to My DECOM 2024 Makers Challenge Submission!
![final_show](https://github.com/user-attachments/assets/e813e211-c222-472f-8a84-09945280f2af)

This project showcases **Card Tech+**'s logo reimagined as a captivating 3D interactive experience. Whether you prefer to sit back and admire its smooth rotation or take control spin it out crazy, this project is designed to be immersive and engaging.

**Explore. Interact. Zoom in and out. It's all in your hands right here: https://hailey-moon.github.io/DECOM-Makers-Challenge/** 


# 🚀 How I Made This
When the challenge was announced, I envisioned something interactive, visually stunning, and technically ambitious. I wanted to push my limits, so I turned to tools and technologies I’d never used before: **Three.js** and **Blender**.

## 🌟 The Journey
Here’s a behind-the-scenes look at how it all came together:

### 1️⃣ Transforming the Logo to 3D
Using Inkscape, I converted the Card Tech+ logo into an SVG (Scalable Vector Graphics) format. This ensured a crisp, scalable foundation for my work.


<img width="1094" alt="Screenshot 2024-12-01 at 5 21 05 PM" src="https://github.com/user-attachments/assets/b6b3501a-6f0c-493a-bd77-4a23a91fc329">

 
 ### 2️⃣ From 2D to 3D in Blender
Next, I imported the SVG into Blender to create a sleek 3D model, and exported as a GLB file.

<img width="921" alt="Screenshot 2024-12-01 at 4 40 07 PM" src="https://github.com/user-attachments/assets/1dc1d6f1-8971-4d1c-8799-4a832ff70a68">


### 3️⃣ Bringing It to Life with Code
Using Three.js, I programmed the interactive, 3D experience. It started as simple experimentation, evolving through iterations into something I'm proud of.

![dark mode](https://github.com/user-attachments/assets/a65baac4-9930-431e-af81-5c6e462bb0d1)

![light mode](https://github.com/user-attachments/assets/3f8670c2-eb4c-4ff1-bbc4-7d47a9860a8a)


Ultimately, I landed on a metallic design with just the right balance of realism and abstraction.


![final_show](https://github.com/user-attachments/assets/de91b93d-74bd-4c20-8a3c-52ccba4e3480)


## 🎮 Interactivity and Accessibility
I wanted everyone to enjoy this, no matter the device. Here's what you can do:

- Rotate the logo by clicking and dragging.
- Zoom in or out using your mouse scroll.
- View it on any device, thanks to responsive design.

![interactivity](https://github.com/user-attachments/assets/72b0996d-9381-472d-9f06-5008bffbf4fd)


![responsive](https://github.com/user-attachments/assets/0055683e-44b9-4413-90c9-6cc7ea65ef43)

## 📜 Technical Notes
You don't need the information below to view the project. It's just for documentation's sake.

### Running Locally
While you can view the project live without setup, here’s how to run it locally if you’re curious:

`npm install`
`npx vite`
go to http://localhost:5173/ to see the little guy spin :)

### Deploying Changes
After making all the changes and pushing them up to the repo, run the following:
`npx vite build`

You'll see the bundle in the local `dist` folder. If you want to make sure it's bundled correctly, go to `dist/index.html` and right-click to run it with the VS Code extension "Live Server."

<img width="991" alt="Screenshot 2024-12-02 at 11 43 26 AM" src="https://github.com/user-attachments/assets/e0816daf-817f-4c90-a79a-c8c7feee6557">

<img width="444" alt="Screenshot 2024-12-02 at 11 44 22 AM" src="https://github.com/user-attachments/assets/a7c0afe7-b92f-4ac7-9e46-dbe0d43bebdd">

If you see errors, check that in the html file, your paths to .js and .css files are correct. Sometimes you'll need to make them a relative path (i.e. add a period in front)

If all looks good, run `npm run deploy` to run the deployment script. After a few minutes, you'll see the changes reflected on https://hailey-moon.github.io/DECOM-Makers-Challenge/

# 💡 Final Thoughts
This project reflects my passion for creativity and technical problem-solving. I hope you enjoy exploring it as much as I enjoyed creating it. Let’s make everything a little more magical. ✨
