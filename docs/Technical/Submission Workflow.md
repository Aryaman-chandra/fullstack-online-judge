## Submission Workflow

A sequence of procedures occurs when a user initiates a submission 

 - User hits the submit button
 - A new source code is generated from the editor along with lang selected 
 - The frontend makes post request to the '/submissions/new' endpoint 
 - The server validates request 
 - A new file is created on the server source code 
 - A new submission with user_id , source is created 
 - Created Files is compiled and executed in the server
 - Depending upon the output and the solution text , verdict is decided.
 - Verdict is sent to frontend as a response.

![[Attachments/Excalidraw/Drawing 2024-06-29 03.41.04.md#^group=-UAU6AKEDZvlbzlFs4DzQ|submission-workflow]]


<div style="page-break-after: always;"></div>


## Submission Architecture

The frontend sends an http request to hosted server Application on port 3000 which performs validation and to compile and execute the submission 
The server application makes an http request to port 5000 where our isolated compiler resides , which returns an output which is tested against 
the testcases solution  , to generate a verdict which then is send as a response to the client.

![[Attachments/Excalidraw/App_Architecture.md#^frame=X8ZAKKpGq_e08UYRForcR|Submission Architecture|500]]
