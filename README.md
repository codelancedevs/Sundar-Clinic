# Sundar Clinic Backend Access SDK

# Installation 

`npm install @codelancedevs/sundar-clinic-sdk@latest`
# Introduction 

## Meta

This SDK is a part of [Codelance Devs](https://github.com/codelancedevs) created for Sundar Clinic to use in the sites frontend application.

It is not meant for the purpose of distribution. It can be installed into your projects but will not work until it meets the [requirements](#requirements) mentioned below.

## Motivation

This SDK was made for the purpose of learning how NPM Packages work and also to integrate it across Frontend Frameworks like the one used by [Sundar Clinic](https://sundar-clinic.netlify.app) React Application.
# Requirements

1. **Requires CORS Approval**. Request Origin should be added in CORS Origin options to allow requests to take place. 
2. **API Key required to make requests**. It is not auto generated and is manually created by [Codelance Devs](https://github.com/codelancedevs).
3. For more details reach out to [contact@codelancedevs.com](mailto:contact@codelancedevs.com). 

# Usage

After Installing the package, import it into your project and provide the **API key** that is required to make requests, without which the package will not work.

```
import SundarClinicSDK from '@codelancedevs/sundar-clinic-sdk'

const sundarClinic = new SundarClinicSDK(<your-api-key-here>)
```

After importing it, you can use the following methods to create a type of request to the backend application of Sundar Clinic. 

- [Default](#-default)
- [Admin](#-admin)
- [Patient](#-patient)
- [Post](#-post)

<mark>⚠️ Documentation in Progress</mark>
## Default
---
## Admin
---
## Patient
---
## Post
---