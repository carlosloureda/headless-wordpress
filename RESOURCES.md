# Linters
- [How to install eslint/prettier](https://paulintrognon.fr/blog/typescript-prettier-eslint-next-js)

# Typescript 
- [NextJS types](https://nextjs.org/learn/excel/typescript/nextjs-types)
- [Props cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example/)

# Code Structure
- [Opiniontaed folder structure](https://medium.com/@pablo.delvalle.cr/an-opinionated-basic-next-js-files-and-directories-structure-88fefa2aa759)

# Project Management
- [ZenHub + Github](https://blog.zenhub.com/how-to-use-github-agile-project-management/)

# Auth

-https://dev.to/theodorusclarence/next-js-redirect-without-flashing-content-5bio

# Previews
- Fix for JWT: https://github.com/wpengine/headless-framework/issues/191

# WpGraphql

- How to upload Images: https://github.com/wp-graphql/wp-graphql/issues/311
```
 createMediaItem(input: {filePath: "file:///Users/jasonbahl/Sites/wordpress/wp-graphql/img/wp-example-web.png", fileType: IMAGE_PNG, clientMutationId: "goo"}) {
   mediaItem {
     id
     uri
     date
   }
 }
}
```
- Plugin to upload them: https://github.com/dre1080/wp-graphql-upload
- Specs: https://github.com/jaydenseric/graphql-multipart-request-spec


## Update mutations for custom post types

Add a new input field to the mutation (createIncome / updateIncome)
When an income post is being created/updated, get the value passed in for that input field, sanitize it, and save it to the database using ACF’s update_field() or WP’s update_post_meta() — either will work.

Kellen released this video walkthrough that shows exactly how to code that up at the 19:33 mark: https://youtu.be/o-MQSKErREI?t=1173

- TODO:

[] Add our own WPPlugin to have these dependencies
