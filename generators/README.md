# data (log, metric, trace) generator module 

    * this module is written in go and fiber exposes an api 
    * its main job is to generate logs, metrics, and traces 
    * it is dockerized 
    * it has a mounted volume /data which has logs.txt, metrics.txt, traces.txt files and
    generated data must be saved in this files 
    this mount volume is a bind mount to /data external directory and later it shares generated data with other modules 
    * it must semiulate a microservice application consisting of the mentioned services
    * it must expose an api so:
        *  its configuration like starting and stopping data generation and generation rate cloud be updated dynamically 
        * an endpoint to report generation status 
    * it must has an api doc located in `api-docs.md` so if a user read that doc knows how and what endpoints to call 
    * each service which is being semiulated could be interrupted using api so i can semiulate anomalies 
    * i want to be able to increase response time of each service using the api for an specified period of time 
    * to build and run the generator module use `docker compose up --build`
    * endpoints are documented in `api-docs.md`

## micro services and their relationship: 

### nginx gateway:
    this service is an entry point for the whole incomming and outgoing traffic to microservices 

### kafka service: 
    this is used to connected all other services together 
    
### digital service:
    this service is responsible for handling neobank requests and uses core service for its core operations 

### core service:
    core banking operation like checking account balance and so on 

### ATM service:
    responsible to handle traffic comming from ATM's 
    
### postgres db service:
    used for holding users data
