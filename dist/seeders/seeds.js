var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🚀 Seeding database...");
        const passwordHash = yield bcrypt.hash("password123", 10);
        // ===== Utilisateur 1 avec ses tâches =====
        const utilisateur1 = yield prisma.user.create({
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
        const utilisateur2 = yield prisma.user.create({
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
    });
}
main()
    .catch((e) => {
    console.error("❌ Erreur de seed:", e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
//# sourceMappingURL=seeds.js.map