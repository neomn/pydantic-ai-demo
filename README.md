# pydantic ai demo 

## this project is about to demonstrate agentic ai operation and would include following features : 

  * log, metric, trace generator 
  * a ui (react app) to: 
    *  manage data (log,metric,trace) generation
    * display a graph of services and their relation to eachother 
    * display live request flow like kiali in istio among services by reading the generated data
    * manage agents and their jobs 
    * manage anomaly generation
  * ai agents: 
    * an agent for monitoring generated data and detect anomalies 
    * an agent for checking if the recently detected anomaly has seen before or its a new one 
    * an agent for sending notifications and alarms 
    * an agent for root cause analysis and documenting the result

### how project modules are connected and works together 
    * ui manages generator module directly without any backend api
