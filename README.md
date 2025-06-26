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

