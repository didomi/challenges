# Test technique Front End Digikare

# Introduction

Bienvenue chez Digikare ! Nous recherchons des développeurs front-end talentueux pour rejoindre notre équipe. Dans cet exercice, nous vous proposons de créer une application web de suivi des patients.

## Contexte

L'objectif de cet exercice est de développer une application qui permettra de créer des suivis de patients, de lister les suivis précédemment créés et de visualiser les détails d'un suivi en particulier. De plus, nous souhaitons que vous implémentiez la fonctionnalité d'annulation d'un suivi, mais uniquement si la date d'intervention n'est pas encore passée.

## **Explications de l'exercice**

Vous devez développer une application front-end avec le Framework de votre choix en Typescript (React et Angular de préférence), qui comprendra les fonctionnalités suivantes :

1. **Créer un suivi patient** : En tant qu’utilisateur “chirurgien” je peux créer un suivi patient, y compris les informations sur le patient lui-même et les détails de l'intervention. Les champs obligatoires doivent être correctement validés avant d'enregistrer les données.
    1. Un email
    2. Une date d’intervention
    3. Un prénom / Nom / Sexe
    4. Le type d’intervention
        1. Prothèse de genou
        2. Prothèse de hanche
        3. Ligament croisé Antérieur
2. **Lister les suivis précédemment créés** : Une fois qu'un suivi a été créé, il devrait être répertorié dans une vue de liste. Les informations clés telles que le nom du patient, la date d'intervention, etc., doivent être affichées pour chaque suivi.
3. **Afficher les détails d'un suivi** : Lorsque l'utilisateur sélectionne un suivi dans la liste, les détails complets du suivi doivent être affichés. Cela comprend toutes les informations fournies lors de la création du suivi.
4. **Annuler un suivi** : L'utilisateur devrait avoir la possibilité d'annuler un suivi tant que la date d'intervention n'est pas encore passée. Si la date d'intervention est déjà passée, l'option d'annulation ne doit pas être disponible.

# API :

Le fichier API Swagger décrivant l’API est disponible dans  [api-swagger.yaml](docs/api-swagger.yaml)

## **Bonus**

En tant qu'équipe chez Digikare, nous valorisons les bonnes pratiques de développement. Si vous pouvez démontrer votre compréhension et votre application des concepts suivants, cela sera considéré comme un avantage supplémentaire :

- **Clean Architecture**
- **Tests automatisés**
- **State Management**
- **Mobile first**
- **Test-Driven Development (TDD)**
- **SOLID**
- **Domain-Driven Design (DDD)**

## **Instructions supplémentaires**

- Vous êtes libre d'utiliser les bibliothèques ou les outils qui vous semblent appropriés pour mener à bien cette tâche.
- Assurez-vous de bien structurer votre code, en respectant les conventions de nommage et les bonnes pratiques.
- Veillez à ce que votre code soit propre, lisible.

## **Conclusion**

Cet exercice a pour but d'évaluer votre compétence en tant que développeur front-end et de voir comment vous abordez le développement d'une application web et d'autres pratiques de développement clés.

Si vous souhaitez ajouter des fonctionnalités supplémentaires ou démontrer vos compétences avancées, n'hésitez pas à le faire. Cependant, veuillez noter que cela n'est pas requis. L'objectif est de ne pas consacrer plus de 2 heures à ce test. Notre principale préoccupation est d'évaluer vos capacités de base dans un délai raisonnable. Notre objectif est de voir votre compréhension et votre application des concepts fondamentaux du développement front-end, plutôt que la complexité ou l'exhaustivité de l'application.

Nous sommes impatients de découvrir votre code et d'en discuter lors de notre prochain entretien technique. Bonne chance et n'hésitez pas à nous contacter si vous avez des questions supplémentaires. Nous sommes là pour vous aider !

## Glossaire

**Chirurgien :** Utilisateur avec un rôle chirurgien

**Suivi patient :** processus par lequel les professionnels de santé recueillent et enregistrent régulièrement des informations sur un patient dans le but de surveiller sa santé, d'évaluer son état et de suivre l'évolution de sa condition médicale. Le suivi contient des questionnaires à destination des patients et de son équipe médicale.
