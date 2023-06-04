// uni, clg, course --> static and pre-added values (COLLEGE AND UNIVERSITY LOGIN)
// students ---> request to join uni, clg, course (the one in which he is enrolled currently) SIGNUP & LOGIN
// college ---> allow/approve student on the portal

// student ---> start migration (only related course)
// student's request ---> university (validates the certificates MARKSHEET, MIGRATION, NOC, TRANSFER CERTIFICATE)
// univerity ---> student's request ---> college
// college ---> in 3 days time ---> allows the migration otherwise fails

// arrays
// university []
// each uni. will have college[] and each college have course[]
// each course have enrolledStud[] and also requestedStud[]

// mappings
// uni -> clg[]
// uni -> clg -> course[]
// uni -> clg -> course -> all info
// addr -> org (enter address and get related college or university | set and get both) - set while adding static data
// addr -> related course or college or university for all
// uni/clg/course -> applications (maybe address => string mapping)

// functions
// signup
// approve & reject signup
// send request application to university
// validate docs (at university level)
// forward application
