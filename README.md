# TP Exercise for React.js

1. First TP : branch `FirstTPVersion`
2. Advanced : branch `AdvancedTPVersion`

**Note :** I used `react-bootstrap` components and `react-icons` for creating a UI as nice as possible.

For the Advanced version, please run `npm start` in `api/` folder to launch the mocked Web service API.
I did not manage to connect with Parse backend correctly, so to avoid being stucked for the end of the exercise, I developed a tiny REST API Endpoint for managing **users** and **costs**

I succeeded to display the content provided by the WS in the application : 
  - I set proxy up in package.json so non-static HTTP calls will be forwarded by the dev server to the API endpoint one (localhost:4000)
  - I create my API endpoint with express and a simple in-memory data model

I didn't succeed to : 
  - Add new cost. I think I'm near to make this work but it seems my code has became to messy so I'm lost

Please read comments I wrote in the createStore file to have more details about why I was getting stuck.

Thank you, 

Regards

*Fabien Le Houëdec*
