import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";

async function main() {
  console.log("🚀 Seeding database...");

  const passwordHash = await bcrypt.hash("password123", 10);

  // ===== Utilisateur 1 avec ses tâches =====
  const utilisateur1 = await prisma.user.create({
    data: {
      nom: "Soda Thiam",
      login: "SodaThiam",
      password: passwordHash,
      Taches: {
        create: [
          {
            titre: "Préparer la réunion",
            description: "Organiser la réunion du lundi matin",
            etat: "En_Cours",
          },
          {
            titre: "Réviser le code",
            description: "Faire une revue de code sur la PR #12",
            etat: "En_Cours",
          },
          {
            titre: "Former un collègue",
            description: "Expliquer Prisma et Sequelize à l'équipe",
            etat: "Termine",
          },
        ],
      },
    },
  });

  // ===== Utilisateur 2 avec ses tâches =====
  const utilisateur2 = await prisma.user.create({
    data: {
      nom: "Astou Mbow",
      login: "AstouMbow",
      password: passwordHash,
      Taches: {
        create: [
          {
            titre: "Rédiger un rapport",
            description: "Préparer le rapport mensuel des activités",
            etat: "En_Cours",
          },
          {
            titre: "Mettre à jour la documentation",
            description: "Ajouter la section Prisma au wiki interne",
            etat: "En_Cours",
          },
          {
            titre: "Déploiement app",
            description: "Déployer la nouvelle version sur Render",
            etat: "Termine",
          },
        ],
      },
    },
  });

  console.log("✅ Seeding terminé avec succès !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur de seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
