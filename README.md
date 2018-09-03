# Serverless-NodeJS-ElasticSearch
Sample Serverless and ElasticSearch Project with NodeJS using ECMAScript 6 

### Requirements

- [Install the Serverless Framework](https://serverless.com/framework/docs/providers/aws/guide/installation/)
- [Configure your AWS CLI](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

### Usage

Run a function locally

``` bash
$ yarn local-function <functionName>
```

Simulate API Gateway locally using [serverless-offline](https://github.com/dherault/serverless-offline)

``` bash
$ yarn offline <stage>
```

Deploy the project

``` bash
$ yarn deploy <stage>
```

