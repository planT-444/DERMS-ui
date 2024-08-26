# User Interface for Virtual Machine 1 of the Distributed Energy Resources Management System (DERMS)

## DERMS Architecture
The DERMS will operate with two Virtual Machines (VMs) and a shared MySQL database.

VM1 ---> DATABASE <--- VM2

### VM2 (Dispatch)
This VM will be responsible for:
* Writing real-time power flow (PF) data to the database. 

### VM1 (Optimization)
This VM will be responsible for:
* Fetching the PF data from the database
* Running an optimal power flow (OPF) algorithm 
* Then sending the OPF dispatch signal back to VM2 through the database.

### DATABASE (Data transfer)
The database will include two tables. Each VM can only write to one table and will read from the other. 
* Table 1: PF data
* Table 2: OPF dispatch signal


## User Interface (UI) for VM1
### Purpose
The UI allow users to:
* Query PF data and visualize it graphically
* Monitor VM communication
* Run the OPF algorithm
* Send the OPF dispatch signal manually
* Perform all of the above without familiarity with backend APIs