```bash
.API
├── index.js                                # It starts the Express.js server
├── package.json                            # Contains metadata about the project and lists dependencies.
├── package-lock.json                       # Contains the specifications of the dependency versions
├── README.md                               # Information about the project.
└── src                                     # Source code directory
    ├── app.js                              # It sets up the Express.js server.
    ├── controllers                         # Controllers directory.
    │   └── characterController.js          # 
    ├── db.js                               # It establishes a connection to the database
    ├── models                              # Models directory
    │   └── Character.js                    # Define the data models for Character
    ├── routes                              # Routes directory
    │   ├── character.route.js              # Defines the character route.
    │   └── index.js                        # Import the routers.
    ├── services                            # Services directory
    │   └── character.service.js            # 
    └── swagger.js                          # Swagger configuration.

```