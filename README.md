# Mutant exercise

[![MP](https://sistemaglobal.com.ar/assets/images/logoTeckelBit.png)](http://mpielvitori.github.io/)

### Build docker image
docker build -t mutants --build-arg APP_ENV=test .

### Run container
docker run -p 4010:4010 --name mutants_1 -v ~/.aws:/root/.aws mutants
