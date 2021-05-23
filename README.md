# Wordpress Headless (with NextJs)

This is more a work & show while I am learning WP and Headless using:

- WpGraphql
- NextJS

We are builing a `boilerplate` for our company **webstantly**, this is the **canary** version to test and learn.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Conventions](#conventions)
- [Support](#support)
- [Contributing](#contributing)

## Installation

- For the **frontend** This is a `nextjs` bootstrapped project, so download this repository to your local machine:

```sh
cd [project_folder]
yarn install
yarn run dev
```

- For the **backend** we are going to use Wordpress, I will leave a list of WP plugins and configuration on a section of this README, but also a **.zip** file to import a pre-installed wordpress version to easily hook up. (check `backend` folder for this)

- You need to have some **environment** variables defined, copy the **.env-EXAMPLE** file and rename it to **.env.local** and add the proper configuration variables.


## Usage
### JWT Authorization

You need to add into  `wp-config.php` the following:

```php
  define( 'GRAPHQL_JWT_AUTH_SECRET_KEY', 'super-secret-key' );
  define('JWT_AUTH_CORS_ENABLE', true);
```

Also  need to allow user registration: wp > settings > Membership -  Anyone can register

- To override the forgot password emails and so on you can use this [plugin](https://github.com/carlosloureda/wbs-headless-auth-plugin), also uploaded in the `backend` folder.


## Conventions

- For commits we will follow [conventionalcommits](https://www.conventionalcommits.org/en/v1.0.0/)

## Support

Please [open an issue](https://github.com/carlosloureda/headless-wordpress/issues/new) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/carlosloureda/headless-wordpress/compare/).
