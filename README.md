# Nouveau Portfolio Documentation

## Table of Contents
1. [Introduction](#1-introduction)
2. [Getting Started](#2-getting-started)
   - 2.1 [Requirements](#21-requirements)
   - 2.2 [Installation](#22-installation)
   - 2.3 [Configuration](#23-configuration)
3. [Creating Subject Fields](#3-creating-subject-fields)
   - 3.1 [Adding a New Subject Field](#31-adding-a-new-subject-field)
   - 3.2 [Editing Subject Fields](#32-editing-subject-fields)
   - 3.3 [Deleting Subject Fields](#33-deleting-subject-fields)
   - 3.4 [Creating Tags for Subject Fields](#34-creating-tags-for-subject-fields)
4. [Customizing Content Displays via CSS](#4-customizing-content-displays-via-css)
   - 4.1 [Basic Customization](#41-basic-customization)
   - 4.2 [Advanced Customization](#42-advanced-customization)
5. [Release Notes](#5-release-notes)

---

## 1. Introduction

Welcome to the documentation for the Nouveau Portfolio! This website allows users to showcase their work and customize their portfolio with unique subject fields and content displays through CSS customization. This documentation will guide you through the setup, customization, and management of your Nouveau Portfolio website.

## 2. Getting Started

### 2.1 Requirements

Before you begin, ensure that you have the following prerequisites:

- Web hosting with Python Flask and SQLite support
- Node v19.4.0 and NPM 9.2.0
- Basic knowledge of HTML, CSS, and JavaScript

### 2.2 Installation

1. Download the latest release of the Nouveau Portfolio.
2. Extract the downloaded archive to your local machine.
3. Install the Python Flask API with `pip install -e .` from the root directory
4. Create a SQLite database and user for the website and update the configuration file (`data.sql`) with default user details. Change the user password as soon as you log in for sufficient password encryption!
5. Install the requisite node modules with `npm i`
6. Bundle website code with `npm run build`
7. Start the webserver with `./wsgi.py` and expose port 8002 to internet traffic

### 2.3 Configuration

- Once the installation is complete, you can access the admin controls by logging in with the default admin credentials that you set in installation step 4.
- It is highly recommended to change the default admin credentials immediately for security reasons.

## 3. Creating Subject Fields

### 3.1 Adding a New Subject Field

1. Log in.
2. Navigate to one of the Subject Fields in the website (Bio, Education, Experience, Projects).
3. Click the "Add New Field" button.
4. Provide a name for the subject field and select the type of content you want to display (e.g., images, text, videos).
5. Customize the field's display settings, such as layout, background color, and font style.
6. Save the new subject field.

### 3.2 Editing Subject Fields

1. Log in.
2. Click on the field you want to edit.
3. Modify the field's properties and settings as needed.
4. Save your changes.

### 3.3 Deleting Subject Fields

1. Log in.
2. Click on the field you want to delete.
3. Click the "Delete" button and confirm the action.

### 3.4 Creating Tags for Subject Fields

Tags allow you to categorize your subject fields for easy organization. Follow these steps to create tags:

1. In a selected panel, go to "Tags."
2. Click the "Add New Tag" button.
3. Provide a name for the tag (e.g., "Photography," "Web Development") and a hex-encoded color code.
4. Save the new tag.
5. After creating tags, you can associate them with your subject fields while adding or editing them.

## 4. Customizing Content Displays via CSS

### 4.1 Basic Customization

- You can customize the appearance of your Nouveau Portfolio by editing the CSS files located in the website's root directory.
- The main CSS file is named "style.css," and you can modify it to change the overall design, colors, and layout of your website.

### 4.2 Advanced Customization

- For more advanced CSS customization, you can override specific styles using inline CSS or by targeting specific elements in your HTML templates.
- Be cautious when making extensive changes to ensure that your website remains responsive and user-friendly.

## 5. Release Notes

- Check the release notes section for information about the latest updates, bug fixes, and new features added to the Nouveau Portfolio.
