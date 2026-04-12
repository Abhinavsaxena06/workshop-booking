# FOSSEE Workshops — A Platform for Excellence in Technical Education

A full-stack web application, where the users can discover, manage as well as book free technical workshops that are offered by the most esteemed professors of IIT’s under the FOSSEE (Free and Open Source Software for Educati0n) initiative.

---

## Table of Contents:
1. Project Overview
2. Features
3. Tech Stack
4. Setup Instructions
5. Design Principles
6. Responsiveness Strategy
7. Trade-offs
8. Challenges and Approach
9. Project Structure

---

## Project Overview:

FOSSEE Workshops is not just a booking platform rather it is a student-facing platform built to streamline how students all over the India scout, discover and register for hands-on technical workshops that are across various domains including Python, Scilab, Arduino, OpenFOAM, AI/ML, MATLAB and many others. These workshops are delivered by the renowned professors of IIT’s and that too without spending a single rupee on any workshop.

The primary goal of this project was not just to build a functional product, but to curate an experience that feels premium, accessible, eye-catching, and trustworthy.

---

## Features:

- Browse Workshops - Filter by category means which user the student wants to study, location means from which IIT the user wants to learn, and sort by date or seat availability.
- User Authentication - The user can register using his/her full name, email id and password and then the details will be stored with the help of JWS-based backend auth (MongoDB Atlas) and then he/she can login using the same credentials. 
- Student Dashboard - The user can track their enrolled workshops, assignments, deadlines. They can also track their overall progress in each workshop and they can also check for any new announcements. 
- Profile Management - The user can view his/her personal as well as academic information. It also provides an option to edit any details. The user can also check their skills, their badges and their activity history.
- Certificate Downloads - Whenever the user completes a workshop around 85% and more, an option to download a certificate to that particular workshop will be active. These are auto-generated HTML certificates.
- Dark Mode - The user can toggle the dark and light theme anytime according to their comfortability. It is done using React Context and local storage.
- Responsive design - The web page is fully optimized for devices like mobile, tablet and desktop. 
- Dynamic Workshop Interfaces - Each workshop is presented through a dedicated, information-rich page featuring instructor details, brief regarding the course, learning outcomes and a confirm booking option.

---

## Tech Stack

| Category            | Technologies                                                                 |
|--------------------|------------------------------------------------------------------------------|
| Frontend           | React 18, Tailwind CSS, Framer Motion, React Router v6                      |
| State Management   | React Context API, localStorage                                              |
| Backend            | Node.js, Express.js                                                          |
| Database           | MongoDB Atlas                                                               |
| Auth               | JWT (JSON Web Tokens), bcryptjs                                             |
| Notifications      | react-hot-toast                                                             |
| Animations         | Framer Motion                                                              |
| Icons/UI           | Emoji-based icons, custom Tailwind utilities                               |
---

## Setup Instructions

Follow the steps below to set up the project locally.

---

### 1. Clone the Repository
```
git clone <https://github.com/Abhinavsaxena06/workshop-booking>  
cd workshop_booking  
```
---

### 2. Install Dependencies

#### Backend
```
cd backend  
npm install  
```
#### Frontend
```
cd ../frontend  
npm install  
```

#### Python (Django)
```
cd ..  
pip install -r requirements.txt  
```
---

### 3. Configure Environment Variables

Create a `.env` file in the backend folder using `.sampleenv` as reference.

Note: Environment variables are not included in the repository for security reasons.

---

### 4. Run the Application

Open separate terminals and run:

#### Backend
```
cd backend  
npm run dev  
```

#### Frontend
```
cd frontend  
npm start  
```

#### Django Server
```
cd ..  
python manage.py runserver  
```
---

### 5. Access the Application

```
Frontend → http://localhost:3000  
Backend → http://localhost:5000  
Django → http://127.0.0.1:8000  
```
---

### Note

- Ensure MongoDB connection is properly configured  
- All services should be running simultaneously  
- Screenshots are provided for quick preview without setup  

## What design principles guided your improvements?

Every decision to build this platform takes into consideration the principle that Every interaction should be intentional, intuitive and effortlessly meaningful, ensuring a seamless and engaging user experience. The four core principles guided every design choice throughout the project:

- Visual Hierarchy and Clarity - Every page is thoughtfully crafted with the intention that the user should never think about where to look. Every page is structured in such a way that every important information will catch the eye of the user without even searching for it. This was achieved through deliberate usage of font weight contrast (font-black for headings vs font-medium for body text), color saturation (vibrant indigo/pink gradients for CTA’s vs muted grays for metadata), and also whitespaces as design elements rather than leaving empty spaces wherever needed. The Workshop Cards were given comfortable padding, every page begins from the top whenever you open the particular page and also every button was sized large enough to get properly noticed and understood by the user.

- Consistency vs Trust - A FOSSEE like platform which carries strong institutional credibility - IIT professors, real certificates, verified workshops. For such a high-level platform, the UI needed to be consistent and must reinforce trust through visual appearance. Every section on every page used the same glass-morphism card treatment. The same color palette, the same spacing systems, these were crafted so precisely just to define consistency. Every single card, button, badge, should look like that it belongs to the same family. This makes the user think that the product is crafted with intentions and precision rather than just assembling the pieces.

- Simplicity over Complexity - Every feature was designed to remain as simple as possible so that the user of any age-group can understand the page. Instead of loading users with too many options, the page focuses clarity and ease of use. There are no complex workflows, each process has broken down into simple steps so that even a first-time user can easily navigate and understand. 

- Performance vs Experience - While designing the web page, the thing that remains the priority always was performance. Performance was treated as the core design element. To maintain user engagement, priority was given to fast load times, smooth transitions and quick responsive interactions. 

---

## How did you ensure responsiveness across devices?

The point that the site must be accessible to all across all devices was one of the main points of consideration from the beginning. To ensure that the platform works equally well from the range of 375 px mobiles to 1440 px desktop, the mobile-first approach was used.

All layouts were written and designed for the smallest screen (mobiles) and then expanded upward using Tailwind’s responsive prefixes (sm:, md:, lg). This shows that we have first thought of the constraint zones and consider mobiles as the baseline and the desktop as the enhanced experience.

To make the hero headings feel bold on each and every screen without overflowing or appearing oversized, the responsive scale was applied universally:

                 Text-3xl sm:text-4xl md:text-6xl lg:text-7xl


Grid behavior:

- Stats – grid-cols-2 lg:grid-cols-4 – two columns on mobile and four on desktop.
- Categories – grid-cols-1 sm:grid-cols-2 md:grid-cols-3 – stacked on phone, multi-column on larger screens.
- Workshop cards – grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 – single on mobile for better readability.

All buttons are created with minimum height and padding to ensure that they meet the 44px touch target guideline. The StatCard animation counter uses an IntersectionObserver meaning to trigger only when visible, this improves perceived performance on mobile.

---

## What trade-offs did you make between the design and performance?

Every meaningful design decision carries a performance cost, and every meaningful performance optimization carries a design cost. Thoughtful engineering lies in the conscious decision to give priority to what in a particular situation.

- Framer Motion Animations vs Bundle size – The platform uses framer motion animation to enable page transitions and subtle entry animations replacing rude and sudden content changes. Though due to this, a 30KB additional is added but it achieves similar animations what we can achieve using pure CSS.

- Static Data Rendering vs Dynamic API Fetching – The Workshop data is stored locally in the code as a static JavaScript array, eliminating network requests completely.

- Limited Visual Effects vs Smooth Scrolling Performance – Animations and visual effects were restricted to essential interactions only.

---

## What was the most challenging part of the task and how did you approach it?

### Challenge 1: App-Wide theme synchronization (toggle between dark and light theme)

Implementing an option to toggle the web page between light theme and dark theme was essential to ensure an unified and seamless user experience. Because in today’s time, users expect their theme preferences to persist across pages. It also ensures that the people suffering from Photophobia can easily use the platform in the dark mode.

However, a naive implementation using useState within individual components leads to state fragmentation. Each time the user switches pages, components re-mount and lose their local state, resulting in inconsistent theme behaviour.

The solution was using React Context with a ThemeProvider wrapped around the entire app.

---

### Challenge 2: Maintaining responsive design across devices

The UI initially appeared correct for desktop devices but broke on smaller screens.

Solution:
- Mobile-first design
- Tailwind responsive grids
- Flexible layouts using min-h

---

### Challenge 3: Preventing duplicate bookings

Initially, duplicate bookings were allowed due to lack of validation.

Solution:
- Retrieve existing bookings from localStorage
- Check whether the workshop ID already exists
- If duplicate → show “Already booked” and stop action

---

## Screenshots:

### BEFORE:
![Screenshot 2026-04-11 122526](https://hackmd.io/_uploads/ByRYYuv3bg.png)
![Screenshot 2026-04-11 122518](https://hackmd.io/_uploads/S1CFY_Dn-e.png)


---

### AFTER:

#### Without login
<img width="1919" height="930" alt="Screenshot 2026-04-11 123337" src="https://github.com/user-attachments/assets/60545b02-b84d-4005-bb27-f274202c9d4a" />


#### Login Page
![Screenshot 2026-04-11 132523](https://hackmd.io/_uploads/r1KfJFv3Wl.png)
![Screenshot 2026-04-11 132737](https://hackmd.io/_uploads/ByYGJYw3We.png)


#### After login
![Screenshot 2026-04-11 122950](https://hackmd.io/_uploads/BJbAF_P3Wl.png)

#### Workshop Page
![Screenshot 2026-04-11 123002](https://hackmd.io/_uploads/S1Ik5dPhWx.png)
![Screenshot 2026-04-11 123029](https://hackmd.io/_uploads/r1Sk5dv2Wg.png)
![Screenshot 2026-04-11 123012](https://hackmd.io/_uploads/Bk8Jc_D2Zg.png)
    
#### Booking a Workshop
![Screenshot 2026-04-11 132223](https://hackmd.io/_uploads/SJfSRuvhWl.png)
![Screenshot 2026-04-11 132235](https://hackmd.io/_uploads/r1GSA_Dhbx.png)
![Screenshot 2026-04-11 132245](https://hackmd.io/_uploads/rkZrCuD3-l.png)



#### Dashboard Page
![Screenshot 2026-04-11 123040](https://hackmd.io/_uploads/BkZl9_w3Zl.png)
![Screenshot 2026-04-11 123051](https://hackmd.io/_uploads/rkWg9dP3Ze.png)
![Screenshot 2026-04-11 123103](https://hackmd.io/_uploads/ByWxcdD2Wg.png)
![Screenshot 2026-04-11 123114](https://hackmd.io/_uploads/SJWe5dPhWg.png)



#### Profile Page
![Screenshot 2026-04-11 123233](https://hackmd.io/_uploads/Bk0O9dD3bx.png)
![Screenshot 2026-04-11 123246](https://hackmd.io/_uploads/ByAdqODh-l.png)
![Screenshot 2026-04-11 123300](https://hackmd.io/_uploads/rkCO9uD3Wg.png)



#### After applying dark Mode
![Screenshot 2026-04-11 123313](https://hackmd.io/_uploads/H1U55uvnZl.png)
![Screenshot 2026-04-11 123325](https://hackmd.io/_uploads/BkUqquD2Zl.png)
![Screenshot 2026-04-11 123337](https://hackmd.io/_uploads/Hk8q5dP3bg.png)

    
