# Serverless-NodeJS-ElasticSearch
Sample Serverless and ElasticSearch Project with NodeJS using ECMAScript 6

### Requirements

- [Install the Serverless Framework](https://serverless.com/framework/docs/providers/aws/guide/installation/)
- [Configure your AWS CLI](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

### Install environment

###### DockerCompose
docker-compose up

###### Test ES connection http://localserver:4010/es/ping
###### Create index http://localhost:4010/videogames/resetIndex
###### Bulk dummy data http://localhost:4010/videogames/bulkDummyData
###### Kibana Query on http://localserver:5601/app/kibana#/dev_tools
GET /videogames/_search
{
  "size": 273,
  "query": {
    "match_all": {}
  }
}

###### Docker
######## Start local ElasticSearch then start Dockerfile
docker build .
docker run --network host -e APP_ENV="local" -e "ELASTICSEARCH_ENDPOINT=http://<elasticsearchIP>:9200" -p 4010:4010 <SLSProjectID>

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
