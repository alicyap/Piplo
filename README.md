# 🚀 Piplo CRM - Full SaaS Pipeline Management

**Piplo** est une solution CRM moderne conçue pour simplifier la gestion commerciale, le suivi des contacts et l'automatisation des processus de vente. Développé avec une architecture Cloud native, le projet offre une expérience fluide de la prospection à la signature.

---

## 🛠️ Stack Technique

* **Frontend :** Next.js 15 (App Router), Tailwind CSS
* **Backend & Database :** Supabase (PostgreSQL)
* **Authentification :** Supabase Auth (Middleware sécurisé)
* **Déploiement :** Vercel (CI/CD via GitHub)

---

## ✨ Fonctionnalités Clés

* **Dashboard Intelligent :** Vue d'ensemble des KPI (Contacts, Tâches, Pipeline).
* **Gestion CRUD Complète :**
    * **Entreprises :** Centralisation des organisations partenaires.
    * **Contacts :** Gestion détaillée des interlocuteurs.
    * **Tâches :** Suivi des actions à mener pour chaque dossier.
* **Pipeline de Vente :** Visualisation de l'avancement des opportunités par étapes.

---

## 🏗️ Architecture du Projet

Le projet suit une architecture Serverless moderne pour garantir scalabilité et performance.


### Schéma de la Base de Données
La base de données PostgreSQL est structurée pour optimiser les relations entre les entités commerciales :

* **Users :** Gérés par Supabase Auth.
* **Companies :** Table parente contenant les informations morales.
* **Contacts :** Liés via une clé étrangère à `companies`.
* **Tasks/Leads :** Liés aux contacts pour un suivi historique.

---

## 📋 Installation et Configuration

### 1. Cloner le projet
```bash
git clone [https://github.com/alicyap/Piplo.git](https://github.com/alicyap/Piplo.git)
```

## 🌍 Déploiement
Le projet utilise un pipeline CI/CD : chaque modification sur la branche main déclenche un build automatique sur Vercel.

Lien du projet : [https://piplo-ashy.vercel.app/](https://piplo-ashy.vercel.app/)