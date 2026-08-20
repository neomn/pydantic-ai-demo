# services and their relation 

## this project contains the following services 

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
