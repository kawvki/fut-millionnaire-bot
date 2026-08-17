require('dotenv').config();

const {
    Client,
    GatewayIntentBits,
    ChannelType,
    PermissionFlagsBits,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder
} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

// ===============================
// CONFIGURATION FUT MILLIONNAIRE
// ===============================

const SUPPORT_ROLE_ID = '1537802947600326779';
const MEMBER_ROLE_ID = '1537803634098577501';
const CLIENT_ROLE_ID = '1537803445061419088';
const TICKET_CATEGORY_ID = '1537808090752221224';
const TICKET_CHANNEL_ID = '1537812280362926101';
const ROLES_CHANNEL_ID = '1537820354142281869';
const PC_ROLE_ID = '1537870715108466738';
const PLAYSTATION_ROLE_ID = '1537871226066964580';
const XBOX_ROLE_ID = '1537871477762822165';
const RULES_CHANNEL_ID = '1537806262761427004';

// ===============================
// BOT PRÊT
// ===============================

client.once('ready', async () => {
    console.log(`✅ Bot connecté en tant que ${client.user.tag}`);

    try {

        // ==============================
// PANNEAU DU RÈGLEMENT
// ==============================

const rulesChannel = await client.channels
    .fetch(RULES_CHANNEL_ID)
    .catch(() => null);

if (!rulesChannel) {
    console.error('❌ Salon #règlement introuvable.');
} else {

    const messages = await rulesChannel.messages.fetch({ limit: 50 });

    const rulesPanelExists = messages.some(
        message =>
            message.author.id === client.user.id &&
            message.components.some(row =>
                row.components.some(button =>
                    button.customId === 'accept_rules'
                )
            )
    );

    if (!rulesPanelExists) {

        const rulesEmbed = new EmbedBuilder()
            .setTitle('📜 Règlement — FUT MILLIONNAIRE')
            .setDescription(
                '**1. 💳 __Achat de crédits__ :**\n' +
                'Tous les achats de crédits doivent obligatoirement être effectués via un ticket sur le serveur Discord.\n' +
                '❌ Aucun paiement ne sera accepté en message privé.\n\n' +

                '**2. 📦 __Livraison__ :**\n' +
                'La livraison des crédits sera effectuée uniquement après confirmation du paiement.\n' +
                'Merci de patienter jusqu’à la prise en charge de votre commande par le staff.\n\n' +

                '**3. 🤝 __Respect__ :**\n' +
                'Le respect est obligatoire envers tous les membres et le staff.\n' +
                '❌ Les insultes, provocations, menaces ou comportements irrespectueux ne seront pas tolérés.\n\n' +

                '**4. 🎫 __Tickets__ :**\n' +
                'Merci de rester patient et de fournir les informations nécessaires dans votre ticket afin de permettre un traitement rapide de votre commande.\n\n' +

                '**5. ⚠️ __Sanctions__ :**\n' +
                'Tout non-respect du règlement peut entraîner une sanction, un retrait de rôle ou un bannissement, selon la gravité des faits.\n\n' +

                'En achetant sur **FUT MILLIONNAIRE**, vous acceptez automatiquement ce règlement.\n\n' +
                '_Merci de votre confiance et bon achat ! 💰⚽_'
            );

        const rulesRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('accept_rules')
                .setLabel("J'accepte le règlement")
                .setEmoji('✅')
                .setStyle(ButtonStyle.Success)
        );

        await rulesChannel.send({
    content:
        '**📜 Règlement — FUT MILLIONNAIRE**\n\n' +
        '**1. 💳 Achat de crédits**\n' +
        'Tous les achats de crédits doivent obligatoirement être effectués via un ticket sur le serveur.\n' +
        '❌ Aucun paiement ne sera accepté en message privé.\n\n' +

        '**2. 📦 Livraison**\n' +
        'La livraison des crédits sera effectuée uniquement après confirmation du paiement.\n' +
        'Merci de patienter jusqu’à la prise en charge de votre commande par le staff.\n\n' +

        '**3. 🤝 Respect**\n' +
        'Le respect est obligatoire envers tous les membres et le staff.\n' +
        'Les insultes, provocations, menaces ou comportements irrespectueux ne seront pas tolérés.\n\n' +

        '**4. 🎫 Tickets**\n' +
        'Soyez patient et fournissez toutes les informations nécessaires dans votre ticket.\n\n' +

        '**5. ⚠️ Sanctions**\n' +
        'Le non-respect du règlement peut entraîner une sanction, un retrait de rôle ou un bannissement.\n\n' +

        '✅ **Clique sur le bouton ci-dessous pour accepter le règlement.**',
    components: [rulesRow]
});

        console.log('✅ Panneau du règlement envoyé.');
    } else {
        console.log('ℹ️ Le panneau du règlement existe déjà.');
    }
}
       // ================================
// PANNEAU DES RÔLES PLATEFORME
// ================================

const rolesChannel = await client.channels.fetch(ROLES_CHANNEL_ID).catch(() => null);

if (!rolesChannel) {
    console.error('❌ Salon #rôles introuvable.');
    return;
}

if (!rolesChannel) {
    console.log('❌ Salon #rôles introuvable.');
    return;
}

const rolesMessages = await rolesChannel.messages.fetch({ limit: 20 });

const panelExiste = rolesMessages.some(
    message =>
        message.author.id === client.user.id &&
        message.components.some(row =>
            row.components.some(button =>
                button.customId === 'role_pc'
            )
        )
);

if (!panelExiste) {
    const rolesEmbed = new EmbedBuilder()
        .setTitle('🎮 Choisis ta plateforme')
        .setDescription(
            'Sélectionne la plateforme sur laquelle tu joues à **FUT**.\n\n' +
            '💻 **PC**\n' +
            '🎮 **PlayStation**\n' +
            '🟢 **Xbox**\n\n' +
            'Tu peux modifier ton choix à tout moment.'
        );

    const rolesRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('role_pc')
            .setLabel('PC')
            .setEmoji('💻')
            .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
            .setCustomId('role_playstation')
            .setLabel('PlayStation')
            .setEmoji('🎮')
            .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
            .setCustomId('role_xbox')
            .setLabel('Xbox')
            .setEmoji('🟢')
            .setStyle(ButtonStyle.Primary)
    );

    await rolesChannel.send({
        embeds: [rolesEmbed],
        components: [rolesRow]
    });

    console.log('✅ Panneau des rôles envoyé dans #rôles.');
} else {
    console.log('ℹ️ Le panneau des rôles existe déjà.');
}
        const ticketChannel = await client.channels.fetch(TICKET_CHANNEL_ID);

        if (!ticketChannel) {
            console.log('❌ Salon ticket introuvable.');
            return;
        }

        // Vérifie si le panneau existe déjà
       const messages = await ticketChannel.messages.fetch({ limit: 50 });

        if (!panelExiste) {
            const embed = new EmbedBuilder()
                .setTitle('🎫 Support FUT MILLIONNAIRE')
                .setDescription(
                    'Bienvenue dans le support **FUT MILLIONNAIRE**.\n\n' +
                    'Sélectionnez ci-dessous la raison de votre demande afin de créer un ticket.\n\n' +
                    '🛒 **Achat** — Pour effectuer un achat ou obtenir de l’aide concernant une commande.\n' +
                    '🆘 **Assistance** — Pour toute question ou problème.\n' +
                    '🤝 **Partenariat** — Pour toute demande de partenariat.'
                )
                .setColor(0xF1C40F)
                .setFooter({
                    text: 'FUT MILLIONNAIRE • Support'
                });

            const menu = new StringSelectMenuBuilder()
                .setCustomId('ticket_type')
                .setPlaceholder('🎫 Sélectionnez votre demande')
                .addOptions([
                    {
                        label: 'Achat',
                        description: 'Effectuer un achat ou parler d’une commande',
                        value: 'achat',
                        emoji: '🛒'
                    },
                    {
                        label: 'Assistance',
                        description: 'Obtenir de l’aide',
                        value: 'assistance',
                        emoji: '🆘'
                    },
                    {
                        label: 'Partenariat',
                        description: 'Faire une demande de partenariat',
                        value: 'partenariat',
                        emoji: '🤝'
                    }
                ]);

            const row = new ActionRowBuilder().addComponents(menu);

            await ticketChannel.send({
                embeds: [embed],
                components: [row]
            });

            console.log('✅ Panneau de tickets envoyé.');
        } else {
            console.log('ℹ️ Le panneau de tickets existe déjà.');
        }

    } catch (error) {
        console.error('❌ Erreur lors de l’installation du panneau :', error);
    }
});

// ===============================
// INTERACTIONS
// ===============================

client.on('interactionCreate', async interaction => {

    // ==============================
    // ACCEPTATION DU RÈGLEMENT
    // ==============================

    if (
        interaction.isButton() &&
        interaction.customId === 'accept_rules'
    ) {
        try {
            const memberRole = interaction.guild.roles.cache.get(MEMBER_ROLE_ID);

            if (!memberRole) {
                return interaction.reply({
                    content: '❌ Le rôle Membre est introuvable.',
                    ephemeral: true
                });
            }

            if (interaction.member.roles.cache.has(MEMBER_ROLE_ID)) {
                return interaction.reply({
                    content: 'ℹ️ Tu as déjà accepté le règlement.',
                    ephemeral: true
                });
            }

            await interaction.member.roles.add(memberRole);

            await interaction.reply({
                content: '✅ Règlement accepté ! Le rôle **Membre** t’a été attribué.',
                ephemeral: true
            });

            console.log(`✅ ${interaction.user.tag} a accepté le règlement.`);

        } catch (error) {
            console.error('❌ Erreur lors de l’attribution du rôle Membre :', error);

            if (!interaction.replied) {
                await interaction.reply({
                    content: '❌ Impossible de te donner le rôle Membre.',
                    ephemeral: true
                });
            }
        }

        return;
    }


    // ==============================
    // BOUTONS DES RÔLES PLATEFORME
    // ==============================

    if (interaction.isButton()) {

        const platformRoles = [
            PC_ROLE_ID,
            PLAYSTATION_ROLE_ID,
            XBOX_ROLE_ID
        ];

        let selectedRoleId = null;
        let platformName = '';

        if (interaction.customId === 'role_pc') {
            selectedRoleId = PC_ROLE_ID;
            platformName = 'PC';
        }

        if (interaction.customId === 'role_playstation') {
            selectedRoleId = PLAYSTATION_ROLE_ID;
            platformName = 'PLAYSTATION';
        }

        if (interaction.customId === 'role_xbox') {
            selectedRoleId = XBOX_ROLE_ID;
            platformName = 'XBOX';
        }

        if (selectedRoleId) {
            try {

                // Retire les anciens rôles plateforme
                for (const roleId of platformRoles) {
                    if (
                        roleId !== selectedRoleId &&
                        interaction.member.roles.cache.has(roleId)
                    ) {
                        await interaction.member.roles.remove(roleId);
                    }
                }

                // Ajoute le nouveau rôle
                if (!interaction.member.roles.cache.has(selectedRoleId)) {
                    await interaction.member.roles.add(selectedRoleId);
                }

                await interaction.reply({
                    content: `✅ Ton rôle **${platformName}** a été attribué !`,
                    ephemeral: true
                });

                console.log(
                    `✅ ${interaction.user.tag} a choisi ${platformName}`
                );

            } catch (error) {

                console.error(
                    "❌ Erreur lors de l'attribution du rôle plateforme :",
                    error
                );

                if (!interaction.replied) {
                    await interaction.reply({
                        content:
                            '❌ Impossible de modifier ton rôle. Vérifie que le rôle du bot est suffisamment haut dans la hiérarchie.',
                        ephemeral: true
                    });
                }
            }

            return;
        }
    }


    // ===========================
    // MENU DE CRÉATION DE TICKET
    // ===========================

    if (
        interaction.isStringSelectMenu() &&
        interaction.customId === 'ticket_type'
    ) {

        await interaction.deferReply({ ephemeral: true });

        const type = interaction.values[0];

        const noms = {
            achat: 'achat',
            assistance: 'assistance',
            partenariat: 'partenariat'
        };

        const emoji = {
            achat: '🛒',
            assistance: '🆘',
            partenariat: '🤝'
        };

        // Vérifie la catégorie
        const categorie =
            interaction.guild.channels.cache.get(TICKET_CATEGORY_ID);

        if (!categorie) {
            return interaction.editReply({
                content: '❌ La catégorie des tickets est introuvable.'
            });
        }

        // Vérifie si l'utilisateur possède déjà un ticket
        const channels = await interaction.guild.channels.fetch();

        const ticketExistant = channels.find(
            channel =>
                channel &&
                channel.parentId === TICKET_CATEGORY_ID &&
                channel.topic === `ticket-${interaction.user.id}`
        );

        if (ticketExistant) {
            return interaction.editReply({
                content: `❌ Tu as déjà un ticket ouvert : ${ticketExistant}`
            });
        }

        try {

            const ticket = await interaction.guild.channels.create({
                name: `${emoji[type]}・${noms[type]}-${interaction.user.username}`,
                type: ChannelType.GuildText,
                parent: TICKET_CATEGORY_ID,
                topic: `ticket-${interaction.user.id}`,

                permissionOverwrites: [
                    {
                        id: interaction.guild.roles.everyone.id,
                        deny: [
                            PermissionFlagsBits.ViewChannel
                        ]
                    },
                    {
                        id: interaction.user.id,
                        allow: [
                            PermissionFlagsBits.ViewChannel,
                            PermissionFlagsBits.SendMessages,
                            PermissionFlagsBits.ReadMessageHistory,
                            PermissionFlagsBits.AttachFiles,
                            PermissionFlagsBits.EmbedLinks
                        ]
                    },
                    {
                        id: SUPPORT_ROLE_ID,
                        allow: [
                            PermissionFlagsBits.ViewChannel,
                            PermissionFlagsBits.SendMessages,
                            PermissionFlagsBits.ReadMessageHistory,
                            PermissionFlagsBits.AttachFiles,
                            PermissionFlagsBits.EmbedLinks
                        ]
                    },
                    {
                        id: client.user.id,
                        allow: [
                            PermissionFlagsBits.ViewChannel,
                            PermissionFlagsBits.SendMessages,
                            PermissionFlagsBits.ReadMessageHistory,
                            PermissionFlagsBits.ManageChannels,
                            PermissionFlagsBits.ManageMessages
                        ]
                    }
                ]
            });

            const embed = new EmbedBuilder()
                .setTitle(`${emoji[type]} Ticket ${noms[type]}`)
                .setDescription(
                    `Bienvenue ${interaction.user} !\n\n` +
                    `Un membre du **SUPPORT** va prendre en charge ta demande.\n\n` +
                    `**Type :** ${noms[type]}\n` +
                    `**Créé par :** ${interaction.user}\n\n` +
                    `Merci de fournir toutes les informations nécessaires afin que le support puisse traiter ta demande rapidement.`
                )
                .setColor(0xF1C40F)
                .setFooter({
                    text: 'FUT MILLIONNAIRE • Support'
                });

            const boutons = new ActionRowBuilder()
                .addComponents(

                    new ButtonBuilder()
                        .setCustomId('claim_ticket')
                        .setLabel('Prendre en charge')
                        .setEmoji('🎯')
                        .setStyle(ButtonStyle.Primary),

                    new ButtonBuilder()
                        .setCustomId('purchase_completed')
                        .setLabel('Achat finalisé')
                        .setEmoji('🛒')
                        .setStyle(ButtonStyle.Success),

                    new ButtonBuilder()
                        .setCustomId('close_ticket')
                        .setLabel('Fermer')
                        .setEmoji('🔒')
                        .setStyle(ButtonStyle.Danger)
                );

            await ticket.send({
                content: `<@${interaction.user.id}> <@&${SUPPORT_ROLE_ID}>`,
                embeds: [embed],
                components: [boutons]
            });

            await interaction.editReply({
                content: `✅ Ton ticket a été créé : ${ticket}`
            });

        } catch (error) {

            console.error('❌ Erreur création ticket :', error);

            await interaction.editReply({
                content: '❌ Une erreur est survenue lors de la création du ticket.'
            });
        }

        return;
    }


    // ===========================
    // PRENDRE EN CHARGE
    // ===========================

    if (
        interaction.isButton() &&
        interaction.customId === 'claim_ticket'
    ) {

        const membreSupport =
            interaction.member.roles.cache.has(SUPPORT_ROLE_ID);

        if (!membreSupport) {
            return interaction.reply({
                content: '❌ Seul le rôle SUPPORT peut prendre en charge un ticket.',
                ephemeral: true
            });
        }

        await interaction.reply({
            content: `🎯 **${interaction.user}** a pris en charge ce ticket.`
        });

        return;
    }


    // ==============================
    // ACHAT FINALISÉ
    // ==============================

    if (
        interaction.isButton() &&
        interaction.customId === 'purchase_completed'
    ) {

        const estSupport =
            interaction.member.roles.cache.has(SUPPORT_ROLE_ID);

        if (!estSupport) {
            return interaction.reply({
                content: '❌ Seul le support peut valider un achat.',
                ephemeral: true
            });
        }

        const createurId =
            interaction.channel.topic?.replace('ticket-', '');

        if (!createurId) {
            return interaction.reply({
                content: '❌ Impossible de trouver le créateur de ce ticket.',
                ephemeral: true
            });
        }

        try {

            const membre =
                await interaction.guild.members.fetch(createurId);

            const roleClient =
                interaction.guild.roles.cache.get(CLIENT_ROLE_ID);

            if (!roleClient) {
                return interaction.reply({
                    content: '❌ Le rôle Client est introuvable.',
                    ephemeral: true
                });
            }

            await membre.roles.add(roleClient);

            await interaction.reply({
                content:
                    `✅ Achat finalisé ! <@${createurId}> reçoit maintenant le rôle <@&${CLIENT_ROLE_ID}>.\n` +
                    `🔒 Fermeture du ticket dans 5 secondes...`
            });

            setTimeout(async () => {
                try {
                    await interaction.channel.delete();
                } catch (error) {
                    console.error(
                        '❌ Impossible de fermer le ticket :',
                        error
                    );
                }
            }, 5000);

        } catch (error) {

            console.error(
                '❌ Erreur lors de la validation de l’achat :',
                error
            );

            if (!interaction.replied) {
                await interaction.reply({
                    content: '❌ Impossible de finaliser l’achat.',
                    ephemeral: true
                });
            }
        }

        return;
    }


    // ===========================
    // FERMER LE TICKET
    // ===========================

    if (
        interaction.isButton() &&
        interaction.customId === 'close_ticket'
    ) {

        const estSupport =
            interaction.member.roles.cache.has(SUPPORT_ROLE_ID);

        if (!estSupport) {
            return interaction.reply({
                content: '❌ Tu ne peux pas fermer ce ticket.',
                ephemeral: true
            });
        }

        await interaction.reply({
            content: '🔒 Fermeture du ticket dans 5 secondes...'
        });

        setTimeout(async () => {
            try {
                await interaction.channel.delete();
            } catch (error) {
                console.error(
                    '❌ Impossible de supprimer le ticket :',
                    error
                );
            }
        }, 5000);

        return;
    }
});
// ===============================
// CONNEXION DISCORD
// ===============================

client.login(process.env.DISCORD_TOKEN);