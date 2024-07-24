# Tweeter

Tweeter is a twitter clone built with Next.js. This project attempts to apply clean architecture principles and explores features of Next.js 14 framework such as React Server Components, and Server actions. This project also make use of [Drizzle ORM](https://drizzle-orm.com/) for database operations, [Uploadthing](https://github.com/uploadthing/uploadthing) for uploading images and videos, and [Emoji Mart](https://github.com/missive/emoji-mart) for emoji picker.

## Structure

As mention in the description, this project uses clean architecture principles. Here is how this project structured:

- `app`: This is mainly the presentation layer of the application.
- `use-cases`: This is where all the use cases are defined. like creating an account, posting a tweet, etc..
- `use-cases/common`: this contains interfaces with implementation being delegated to the **infrastructure** folder. mostly typing database operations like getTweets, createTweet, etc..
- `infrastructure`: This is where all the infrastructure code is defined, mostly database stuff and server actions.
- `entities`: This is where all the entities are defined, like tweet, user, etc..
- `lib`: Third party libraries and utility functions.
- `db`: This is where the database connection is defined.
- `types`: This is where all the global types are defined.
