# BioLnk

<div align="center">
  <img src="assets/icon.png" width="150"/>
  <p>
  <a href="https://biolnk.vercel.app" target="_blank">biolnk.vercel.app</a><br/>
<b>BioLnk</b> is a simple yet powerful service for creating a personalized profile page. Add your profile image, a striking banner, and a bio that tells your story. The main feature? Seamlessly add links to all your social platforms, websites, and services in one place. Perfect for sharing across social media! 
</p>
</div>

## Contents

- [**Features**](#features)
- [**Installation**](#installation)
- [**Usage**](#usage)
- [**Gallery**](#gallery)

## Features

- **Profile Image**: Upload a profile picture that represents your personal brand.
- **Custom Banner**: Add a unique banner to make your profile stand out.
- **Bio Section**: Share a brief description about yourself or your brand.
- **Link Integration**: Add and manage links to your social media profiles, websites, and other services, all in one place.
- **Responsive Design**: Works seamlessly across mobile and desktop devices.
- **Easy Customization**: Quickly update your profile with an intuitive interface.
- **Shareable Profile**: Get a custom URL to share your profile easily across all platforms.


## Installation
This section gives an idea for self hosting / development.
#### Environment variables example
```bash
SUPABASE_URL="https://[REDACTED].supabase.co"
SUPABASE_ANON_KEY="supabase anon key"
NEXT_PUBLIC_BASE_URL=http://domain.tld
DIRECT_URL="postgresql://postgres.[REDACTED]:[REDACTED]@[REDACTED].pooler.supabase.com:5432/[REDACTED]"
DATABASE_URL="postgresql://postgres.[REDACTED]:[REDACTED]@[REDACTED].pooler.supabase.com:6543/[REDACTED]?pgbouncer=true"
SUPABASE_BUCKET_NAME="supabase storage bucket name here"
```

#### Setup
1. Clone the repository
```bash
git clone https://github.com/1337kid/biolnk.git
cd biolnk
```
2. Install dependencies
```bash
npm i
```
3. To start development server
```bash
npm run dev
```
4. To build for deployment
```bash
npx prisma generate && npm run build
```
## Usage
- BioLnk uses Google authentication. All you need is a Goolge account.
- Head over to `biolnk.vercel.app/profile` to set up your profile path, links, images & other details.
- View your profile at `biolnk.vercel.app/profilelnk`.

## Gallery

| Landing Page|Add Data|
:-:|:-:
| ![](imgs/1.png) | ![](imgs/2.png) |

| Example Profile| In Mobile View|
:-:|:-:
| ![](imgs/3.png)| ![](imgs/4.png) |
