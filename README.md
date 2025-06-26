# Groenlandia Back-End

Dit is de github repository voor de back-end van Groenlandia. In dit README document zal ik toelichten hoe de back-end in de toekomst zou moeten veranderen en wat op dit moment mogelijk is met de bestaande code.

# Instructies en Functionaliteiten

/keygen
Voordat je kan beginnen met het gebruiken van de Groenlandia database heb je een API-key nodig. De key word aangemaakt door middel van het routen naar /keygen met een POST request. Deze key kan alleen aangemaakt worden met de admin API-key. Een nieuwe API-key kan altijd aangemaakt worden, wanneer een nieuwe key aangemaakt word zal de oude key verwijdert worden.

/classroom
Naar /classroom (en /classroom/:id) kan je een GET request sturen om de klassen op te halen en een POST request om deze aan te maken. Voor het aanmaken word op het moment alleen een naam verwacht. Automatisch word een klassencode aangemaakt die gebruikt word voor het registreren.

/pet
Naar /pet (en /pet/:id) kan je een GET request sturen om het speelgoed die de gebruiker kan maken op te halen. Met /craftable/:id kan je alle pets op halen voor de user met een extra isUnlocked parameter. De POST request verwacht een naam, een image_url, plastic, paper, food, rest

/sortingGame
Naar /sortingGame (en /sortingGame/:id) kan je een GET request sturen om de save files van de gebruikers op te halen. /user/:id kan je gebruiken om een save file te vinden voor een user, :id verwacht hier een user ID. Om een save file aan te maken of aan te passen stuur je een PATCH request naar /:id/:operator. Deze verwacht paper, food, plastic, rest en een toy (pet) ID als parameters. Aan :operator stuur je 'plus' of 'min' mee. Deze bepalen of paper, food, plastic en rest toegevoegd worden of afgenomen worden.

/user
Naar /user (en /user/:id) kan je een GET request sturen om de users op te halen. Voor het registreren (en dus aanmaken van gebruikers) word /post gebruikt. Deze route verwacht een voornaam, achternaam, wachtwoord en klassencode. Wachtwoorden worden hier gehasht en bekeken voor wachtwoord veiligheid, ook worden de gebruikers aan een klas gekoppeld. In deze route word de lege save file voor /sortingGame ook voor het eerst aangemaakt. Verder heb je in deze route /user/login. Hier stuur je een POST request naartoe om in de loggen, deze verwacht alleen een voornaam en een wachtwoord. /user/avatar verwacht een user ID en 'avatar' (de image url naar de avatar). Hiermee word deze url opgeslagen in de user en overschreven als er al een avatar bestaat. Als laatste hebben we hier /user/pet. Deze post request verwacht een user id en een pet id (als pet). Hier word de pet id opgeslagen in de user voor latere gebruik.

De login en registratie functies in de user router bevatten ook rate limiting. Dit zorgt ervoor dat een gebruiker maar een bepaalde hoeveelheid requests kan sturen voordat ze een cooldown krijgen.

# Toekomstige Functionaliteiten.

In de toekomst zouden wij als mogelijk de volgende functionaliteiten toevoegen om de website compleet te maken. 
1. Een router om leraren toe te voegen en te linken aan de klassen.
2. Routers voor de volgende twee spellen die wij toe zouden willen voegen.
3. Cookies voor de login functie.
4. 
   

