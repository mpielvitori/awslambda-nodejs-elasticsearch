# Serverless + NodeJS + ElasticSearch 
######  Sample Serverless and ElasticSearch Project with NodeJS using ECMAScript 6

[![MP](https://sistemaglobal.com.ar/assets/images/logoTeckelBit.png)](http://mpielvitori.github.io/)

### Development environment with [serverless-offline](https://github.com/dherault/serverless-offline)

#### [Virtual memory](https://www.elastic.co/guide/en/elasticsearch/reference/current/vm-max-map-count.html)
Elasticsearch uses a mmapfs directory by default to store its indices. The default operating system limits on mmap counts is likely to be too low, which may result in out of memory exceptions.
On Linux, you can increase the limits by running the following command as root:
```sh
sysctl -w vm.max_map_count=262144
```
To set this value permanently, update the vm.max_map_count setting in ```/etc/sysctl.conf```. To verify after rebooting, run sysctl vm.max_map_count.
The RPM and Debian packages will configure this setting automatically. No further configuration is required.

##### Using Docker Compose
Start ElasticSearch, Kibana and Serverless Offline
```sh
$ docker-compose up
```
##### Usage
- ###### Test ES connection -> http://localhost:4010/es/ping
- ###### Create index       -> http://localhost:4010/videogames/resetIndex
- ###### Bulk dummy data    -> http://localhost:4010/videogames/bulkDummyData
- ###### Kibana Query    -> http://localhost:5601/app/kibana#/dev_tools
```
GET /videogames/_search
{
  "query": {
    "match_all": {}
  }
}
```
#### Using Serverless locally
- [Install the Serverless Framework](https://serverless.com/framework/docs/providers/aws/guide/installation/)
- [Configure your AWS CLI](https://serverless.com/framework/docs/providers/aws/guide/credentials/)
##### Usage
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
