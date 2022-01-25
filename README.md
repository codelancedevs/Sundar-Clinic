# Sundar Clinic Backend Access SDK

## Installation

`npm install @codelancedevs/sundar-clinic-sdk@latest`

## Introduction

### Meta

This SDK is a part of [Codelance Devs](https://github.com/codelancedevs) created for Sundar Clinic to use in the sites frontend application.

It is not meant for the purpose of distribution. It can be installed into your projects but will not work until it meets the [requirements](#requirements) mentioned below.

### Motivation

This SDK was made for the purpose of learning how NPM Packages work and also to integrate it across Frontend Frameworks like the one used by [Sundar Clinic](https://sundar-clinic.netlify.app) React Application.

## Requirements

1. **Requires CORS Approval**. Request Origin should be added in CORS Origin options to allow requests to take place.
2. **API Key required to make requests**. It is not auto generated and is manually created by [Codelance Devs](https://github.com/codelancedevs).
3. For more details reach out to [contact@codelancedevs.com](mailto:contact@codelancedevs.com).

## Usage

After Installing the package, import it into your project and provide the **API key** that is required to make requests, without which the package will not work.

```javascript
import SundarClinicSDK from '@codelancedevs/sundar-clinic-sdk'

const sundarClinic = new SundarClinicSDK(<your-api-key-here>)
```

After importing it, you can use the following methods to create a type of request to the backend application of Sundar Clinic.

- [Default](#default)
  - [Index](#index)
- [User](#user)
  - [Is Username Unique](#is-username-unique)
  - [Is Email Unique](#is-email-unique)
- [Admin](#admin)
- [Patient](#patient)
- [Post](#post)

<mark>⚠️ Documentation in Progress</mark>

### How to Read

Description - Method - Route

Access Required: Whether the User should be logged in for this route.

```javascript
// Method to send request
sundarClinic.<method>.<variant>({data})
  .then(res => {/* do something with res */})
  .catch(err => {/* do something with err */});
```

### Default

#### Index

Involves Request to backend with `/:variant` HTTP Endpoint.

- Index Route - GET - `/`

  Access Required: **No**

  ```javascript
  sundarClinic.default.index()
    .then(res => console.log(res)) // Information about Website
    .catch(err => console.log(err));
  ```

### User

Involves Request to backend with `/user/:variant` HTTP Endpoint.

#### Is Username Unique

- Check If Username Is Unique - GET - `/api/user/isUsernameUnique`
  Access Required: **No**

  ```javascript
  sundarClinic.user.isUsernameUnique({username: "<username-here>"})
    .then(res => console.log(res))
    .catch(err => console.log(err))
  ```

#### Is Email Unique

- Check If Email Is Unique - GET - `/api/user/isEmailUnique`
  Access Required: **No**

  ```javascript
  sundarClinic.user.isEmailUnique({email: "<email-here>"})
    .then(res => console.log(res))
    .catch(err => console.log(err))
  ```

### Admin

Involves Request to backend with `/api/admin/:variant` HTTP Endpoint.

- Create New Admin - POST - `/api/admin/create`

  ```javascript
  const details = {
      firstName: "Kunal Keshan",
      email: "contact@codelancedevs.com",
      password: "KunalDev@3983", // Should follow strong password
      superPassword: "************", // Only Super Admins can create new admins
  };

  sundarClinic.admin.create(details)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  ```

- Admin Login - POST - `/api/admin/login`

  ```javascript
  const details = {
      email: "contact@codelancedevs.com",
      password: "KunalDev@3983",
  };

  sundarClinic.admin.login(details)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  ```

### Patient

Involves Request to backend with `/api/patient/:variant` HTTP Endpoint.

- Create New Patient - POST - `/api/patient/create`

  ```javascript
  const details = {
      firstName: "Kunal Keshan",
      email: "contact@codelandedevs.com",
      password: "KunalDev@3983", // Should follow strong password
  }

  sundarClinic.patient.create(details)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  ```

- Patient Login - POST - `/api/patient/login`

  ```javascript
  const details = {
      email: "contact@codelancedevs.com",
      password: "KunalDev@2983",
  }

  sundarClinic.patient.login(details)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  ```

### Post

Involves Request to backend with `/api/post/:variant` HTTP Endpoint.

- Create New Post - POST - `/api/post/create`

  ```javascript
  const details = {
      title: "Post Title",
      body: "Body of Post",
      type: "General" // Options: ["General", "Job"]
  }

  sundarClinic.post.create(details)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  ```
