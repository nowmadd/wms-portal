## Getting Started 

First, run the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Environment Build

Due to it's simplicity and ease in getting commited code to a built environment, AWS Amplify is being utilised to host the React front end in segregated environment builds.

Commits to the `test`, `prep` and `master` branches will trigger the Amplify app to pull the updated code and redeploy the environment automatically (this is doen on the AWS Amplify side, therefore the need for pipelines is negated).

The Amplify app/config: [Go to AWS Amplify](https://eu-west-2.console.aws.amazon.com/amplify/home/dgvy6ac45v29n#/dgvy6ac45v29n)