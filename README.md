# API Node.js Dockerisée avec MongoDB, InfluxDB et Zod

## Description

Ce projet est une API backend Node.js organisée en architecture modulaire, entièrement dockerisée. Elle intègre :

* **Node.js** pour le backend
* **Zod** pour la validation des schémas (validation et parsing des données)
* **MongoDB** pour la base de données principale (NoSQL)
* **InfluxDB** pour la base de données temporelle (time-series)
* **Mongoose** comme ORM pour MongoDB
* **Docker** et **Docker Compose** pour orchestrer et isoler les services

---

## Arborescence du projet

```
.
├── src/
│   ├── controllers/         # Gestion des requêtes HTTP, appel des services
│   ├── services/            # Logique métier, interaction avec la DB
│   ├── models/              # Modèles Mongoose (MongoDB)
│   ├── schemas/             # Schémas Zod pour validation
│   ├── routes/              # Définition des routes Express
│   ├── config/              # Configuration DB (connexion MongoDB, InfluxDB)
│   └── index.ts             # Point d’entrée de l’application
├── docker-compose.yml       # Orchestration des services (API + MongoDB + InfluxDB)
├── Dockerfile               # Image Docker de l’API Node.js
├── .env                    # Variables d’environnement (non versionné)
└── README.md                # Documentation du projet (ce fichier)
```

---

## Installation & Lancement

1. Cloner le dépôt

```bash
git clone https://github.com/Toure18/rattrapages-MongoDB.git
```

2. Créer un fichier `.env` avec les variables suivantes :

```
PORT=3000

MONGO_URI=mongodb://mongo:27017/ma_db

INFLUX_URL=http://influxdb:8086
INFLUX_TOKEN=ton_token_influx
INFLUX_ORG=ton_org
INFLUX_BUCKET=ton_bucket
```

3. Lancer les conteneurs Docker

```bash
docker-compose up --build
```

---

## Description des services Docker

* **API Node.js** : écoute sur le port 3000, utilise Express, connecte MongoDB et InfluxDB
* **MongoDB** : base NoSQL, stocke les données principales, persistance via volume Docker
* **InfluxDB** : base temps réel (time-series), persistance via volume Docker

---

## Flux de données

1. **Client → Contrôleur**
   Les requêtes HTTP arrivent au contrôleur (ex: création utilisateur).

2. **Contrôleur → Service**
   Le contrôleur appelle la couche service qui contient la logique métier.

3. **Service → Modèle / DB**
   Le service valide les données avec Zod, interagit avec MongoDB via Mongoose et écrit dans InfluxDB pour les métriques.

4. **Réponse**
   Les données ou erreurs sont retournées au contrôleur puis au client.

---

## Choix techniques

* **Node.js + Express** : framework léger et populaire pour API backend.
* **Zod** : validation claire, typée et sûre des données entrantes.
* **MongoDB + Mongoose** : base NoSQL flexible, ORM simple pour manipuler les données.
* **InfluxDB** : base temps réel adaptée pour stocker des événements ou métriques.
* **Docker** : isolement complet, reproductibilité et déploiement facile.

---

## Remarques

* Le token InfluxDB doit être généré dans l’interface InfluxDB ou via CLI et conservé dans `.env`.
* Un volume Docker est configuré pour MongoDB et InfluxDB afin de persister les données.
* En cas de suppression du volume, les données et tokens sont perdus (à prévoir dans les sauvegardes).
