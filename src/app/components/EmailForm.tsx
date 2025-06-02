"use client";

import React, { useState } from "react";

// Taal-vertalingen
const translations = {
  Nederlands: {
    email: "Genereer nieuwe e-mail",
    reply: "Genereer antwoord op e-mail",
    newsletter: "Genereer nieuwsbrief",
    language: "Taal",
    approach: "Benadering",
    recipient: "Naam ontvanger",
    sender: "Naam afzender",

    number: "Nummer",
    numberLabel: "Nummer",                // Label boven het veld
    numberPlaceholder: "Kies nummer...",  // Eerste optie in dropdown
    numberCustomPlaceholder: "Voer zelf een nummer of referentie in", // Placeholder als "Anders..." gekozen
    numberTypes: [
      { value: "bestelnummer", label: "Bestelnummer" },
      { value: "factuurnummer", label: "Factuurnummer" },
      { value: "klantnummer", label: "Klantnummer" },
      { value: "anders", label: "Anders..." },
    ],


    subject: "Onderwerp",
    emailContent: "Waar gaat de e-mail over?",
    placeholderContent: "Beschrijf hier duidelijk het onderwerp of de inhoud van je e-mail.",
    replyPaste: "Plak hier de e-mail waarop je wilt antwoorden",
    replyWhat: "Wat wil je antwoorden op deze e-mail?",
    replyPlaceholder: "Bijvoorbeeld: Vraag om statusupdate, bedank, stel een nieuwe vraag, etc.",
    companyName: "Bedrijfsnaam of naam afzender",
    companyPlaceholder: "Bijv: Jan Janssen / TechBouw BV",
    companyType: "Wat voor soort bedrijf heb je?",
    companyTypeOptions: [
      { value: "", label: "Kies soort bedrijf..." },
      { value: "Detailhandel", label: "Detailhandel / winkel" },
      { value: "Bouw", label: "Bouw / techniek" },
      { value: "Zorg", label: "Zorg / welzijn" },
      { value: "Financieel", label: "Financieel / administratie" },
      { value: "ICT", label: "ICT / software" },
      { value: "Horeca", label: "Horeca" },
      { value: "Zakelijke dienstverlening", label: "Zakelijke dienstverlening" },
      { value: "Onderwijs", label: "Onderwijs" },
      { value: "Anders", label: "Anders..." },
    ],
    website: "Website van je bedrijf (optioneel)",
    websitePlaceholder: "https://www.jouwbedrijf.nl",
    newsletterSubject: "Onderwerp nieuwsbrief",
    newsletterSubjectPlaceholder: "Bijvoorbeeld: Juni nieuwsbrief - Zomeractie!",
    audience: "Doelgroep",
    audienceOptions: [
      { value: "", label: "Kies doelgroep..." },
      { value: "Klanten", label: "Klanten" },
      { value: "Leads", label: "Leads" },
      { value: "Collega's", label: "Collega's" },
      { value: "Partners", label: "Partners" },
      { value: "Anders", label: "Anders..." },
    ],
    style: "Stijl van de nieuwsbrief",
    styleOptions: [
      { value: "", label: "Kies stijl..." },
      { value: "Neutraal", label: "Neutraal" },
      { value: "Marketing", label: "Marketing gericht (verkoop)" },
      { value: "Informatief", label: "Informatief" },
    ],
    points: "Belangrijkste punten (waar gaat de nieuwsbrief over?)",
    pointsPlaceholder: "Beschrijf hier de onderwerpen of hoogtepunten die je wilt delen...",
    length: "Lengte van de nieuwsbrief",
    lengthOptions: [
      { value: "", label: "Kies lengte..." },
      { value: "Kort", label: "Kort (1 alinea)" },
      { value: "Gemiddeld", label: "Gemiddeld (2-3 alinea's)" },
      { value: "Lang", label: "Lang/Uitgebreid" },
    ],
    cta: "Call to action (optioneel)",
    ctaPlaceholder: "Bijv: Bezoek onze website, Bestel nu",
    generate: "Genereer e-mail",
    generateReply: "Genereer antwoord",
    generateNewsletter: "Genereer nieuwsbrief",
    copy: "Kopieer",
    copied: "Gekopieerd!",
    selectLanguage: "Kies taal...",
    selectApproach: "Kies benadering...",
    approaches: ["Zakelijk", "Vriendelijk", "Informeel", "Streng"],
    // Extra
    optioneel: "Optioneel",
    emailText: "E-mailtekst",
    noSubject: "(geen onderwerp)",
    emailPurpose: "Doel van de e-mail",

emailPurposeOptions: [
  { value: "", label: "Kies doel..." }, 
  { value: "afspraak", label: "Afspraak maken" },
  { value: "klacht", label: "Klacht" },
  { value: "vraag", label: "Vraag stellen" },
  { value: "bedankje", label: "Bedanken" },
  { value: "informatie", label: "Informatie geven" }
],

answerLength: "Lengte van het antwoord",
answerLengthOptions: [
  { value: "", label: "Kies lengte..." },
  { value: "kort", label: "Kort (1-2 zinnen)" },
  { value: "gemiddeld", label: "Gemiddeld (2-4 zinnen)" },
  { value: "lang", label: "Uitgebreid" }
],
emailLength: "Lengte van de e-mail",
emailLengthOptions: [
  { value: "", label: "Kies lengte..." },             // Nederlands
  { value: "kort", label: "Kort" },
  { value: "normaal", label: "Normaal" },
  { value: "lang", label: "Lang" },
  { value: "uitgebreid", label: "Uitgebreid" }
],


  },
Engels: {
  email: "Generate new email",
  reply: "Generate email reply",
  newsletter: "Generate newsletter",
  language: "Language",
  approach: "Approach",
  recipient: "Recipient name",
  sender: "Sender name",

  number: "Number",
  numberLabel: "Number",
  numberPlaceholder: "Choose number...",
  numberCustomPlaceholder: "Enter your own reference or number",
  numberTypes: [
    { value: "bestelnummer", label: "Order number" },
    { value: "factuurnummer", label: "Invoice number" },
    { value: "klantnummer", label: "Customer number" },
    { value: "anders", label: "Other..." },
  ],

    subject: "Subject",
    emailContent: "What is the email about?",
    placeholderContent: "Clearly describe the topic or content of your email.",
    replyPaste: "Paste the email you want to reply to",
    replyWhat: "What do you want to reply to this email?",
    replyPlaceholder: "For example: Ask for status update, thank, ask a new question, etc.",
    companyName: "Company name or sender name",
    companyPlaceholder: "Your name or company",
    companyType: "What type of company do you have?",
    companyTypeOptions: [
      { value: "", label: "Choose company type..." },
      { value: "Detailhandel", label: "Retail / Store" },
      { value: "Bouw", label: "Construction / Tech" },
      { value: "Zorg", label: "Healthcare / Welfare" },
      { value: "Financieel", label: "Finance / Admin" },
      { value: "ICT", label: "ICT / Software" },
      { value: "Horeca", label: "Hospitality" },
      { value: "Zakelijke dienstverlening", label: "Business Services" },
      { value: "Onderwijs", label: "Education" },
      { value: "Anders", label: "Other..." },
    ],
    website: "Company website (optional)",
    websitePlaceholder: "https://www.yourcompany.com",
    newsletterSubject: "Newsletter subject",
    newsletterSubjectPlaceholder: "For example: June newsletter - Summer Sale!",
    audience: "Audience",
    audienceOptions: [
      { value: "", label: "Choose audience..." },
      { value: "Klanten", label: "Customers" },
      { value: "Leads", label: "Leads" },
      { value: "Collega's", label: "Colleagues" },
      { value: "Partners", label: "Partners" },
      { value: "Anders", label: "Other..." },
    ],
    style: "Newsletter style",
    styleOptions: [
      { value: "", label: "Choose style..." },
      { value: "Neutraal", label: "Neutral" },
      { value: "Marketing", label: "Marketing (sales)" },
      { value: "Informatief", label: "Informative" },
    ],
    points: "Main points (what is the newsletter about?)",
    pointsPlaceholder: "Describe the topics or highlights you want to share...",
    length: "Newsletter length",
    lengthOptions: [
      { value: "", label: "Choose length..." },
      { value: "Kort", label: "Short (1 paragraph)" },
      { value: "Gemiddeld", label: "Medium (2-3 paragraphs)" },
      { value: "Lang", label: "Long/Extended" },
    ],
    cta: "Call to action (optional)",
    ctaPlaceholder: "Try: “Visit our site” or “Order now",
    generate: "Generate email",
    generateReply: "Generate reply",
    generateNewsletter: "Generate newsletter",
    copy: "Copy",
    copied: "Copied!",
    selectLanguage: "Choose language...",
    selectApproach: "Choose approach...",
    approaches: ["Formal", "Friendly", "Informal", "Strict"],
    // Extra
    optioneel: "Optional",
    emailText: "Email text",
    noSubject: "(no subject)",

emailPurpose: "Purpose of the email",
emailPurposeOptions: [
  { value: "", label: "Choose purpose..." },
  { value: "afspraak", label: "Schedule appointment" },
  { value: "klacht", label: "Complaint" },
  { value: "vraag", label: "Ask a question" },
  { value: "bedankje", label: "Thank you" },
  { value: "informatie", label: "Provide information" }
],

answerLength: "Reply length",
answerLengthOptions: [
  { value: "", label: "Choose length..." },
  { value: "kort", label: "Short (1-2 sentences)" },
  { value: "gemiddeld", label: "Medium (2-4 sentences)" },
  { value: "lang", label: "Long (detailed)" }
],

emailLength: "Email length",
emailLengthOptions: [
  { value: "", label: "Choose length..." },
  { value: "kort", label: "Short" },
  { value: "normaal", label: "Normal" },
  { value: "lang", label: "Long" },
  { value: "uitgebreid", label: "Extended" }
],


  },
  Duits: {
    email: "Neue E-Mail generieren",
    reply: "Antwort auf E-Mail generieren",
    newsletter: "Newsletter generieren",
    language: "Sprache",
    approach: "Ansprache",
    recipient: "Empfängername",
    sender: "Absendername",

    number: "Nummer",
    numberLabel: "Nummer",
    numberPlaceholder: "Nummer wählen...",
    numberCustomPlaceholder: "Eigene Nummer oder Referenz eingeben",
    numberTypes: [
      { value: "bestelnummer", label: "Bestellnummer" },
      { value: "factuurnummer", label: "Rechnungsnummer" },
      { value: "klantnummer", label: "Kundennummer" },
      { value: "anders", label: "Andere..." }
    ],

    subject: "Betreff",
    emailContent: "Worum geht es in der E-Mail?",
    placeholderContent: "Beschreiben Sie das Thema oder den Inhalt Ihrer E-Mail.",
    replyPaste: "Fügen Sie die E-Mail ein, auf die Sie antworten möchten",
    replyWhat: "Was möchten Sie auf diese E-Mail antworten?",
    replyPlaceholder: "Zum Beispiel: Nach Status fragen, danken, neue Frage stellen usw.",
    companyName: "Firmenname oder Absendername",
    companyPlaceholder: "z.B.: Max Mustermann / TechBouw GmbH",
    companyType: "Welcher Unternehmenstyp?",
    companyTypeOptions: [
      { value: "", label: "Unternehmenstyp wählen..." },
      { value: "Detailhandel", label: "Einzelhandel / Geschäft" },
      { value: "Bouw", label: "Bau / Technik" },
      { value: "Zorg", label: "Pflege / Gesundheit" },
      { value: "Financieel", label: "Finanzen / Verwaltung" },
      { value: "ICT", label: "IT / Software" },
      { value: "Horeca", label: "Gastronomie" },
      { value: "Zakelijke dienstverlening", label: "Dienstleistungen" },
      { value: "Onderwijs", label: "Bildung" },
      { value: "Anders", label: "Sonstiges..." },
    ],
    website: "Unternehmenswebsite (optional)",
    websitePlaceholder: "https://www.ihrunternehmen.de",
    newsletterSubject: "Newsletter-Betreff",
    newsletterSubjectPlaceholder: "Zum Beispiel: Juni-Newsletter – Sommeraktion!",
    audience: "Zielgruppe",
    audienceOptions: [
      { value: "", label: "Zielgruppe wählen..." },
      { value: "Klanten", label: "Kunden" },
      { value: "Leads", label: "Leads" },
      { value: "Collega's", label: "Kollegen" },
      { value: "Partners", label: "Partner" },
      { value: "Anders", label: "Sonstiges..." },
    ],
    style: "Newsletter-Stil",
    styleOptions: [
      { value: "", label: "Stil wählen..." },
      { value: "Neutraal", label: "Neutral" },
      { value: "Marketing", label: "Marketing (Verkauf)" },
      { value: "Informatief", label: "Informativ" },
    ],
    points: "Wichtigste Punkte (worum geht es im Newsletter?)",
    pointsPlaceholder: "Beschreiben Sie die Themen oder Highlights...",
    length: "Newsletter-Länge",
    lengthOptions: [
      { value: "", label: "Länge wählen..." },
      { value: "Kort", label: "Kurz (1 Absatz)" },
      { value: "Gemiddeld", label: "Mittel (2-3 Absätze)" },
      { value: "Lang", label: "Lang/Ausführlich" },
    ],
    cta: "Call-to-Action (optional)",
    ctaPlaceholder: "z.B.: Besuchen Sie unsere Website, Jetzt bestellen",
    generate: "E-Mail generieren",
    generateReply: "Antwort generieren",
    generateNewsletter: "Newsletter generieren",
    copy: "Kopieren",
    copied: "Kopiert!",
    selectLanguage: "Sprache wählen...",
    selectApproach: "Ansprache wählen...",
    approaches: ["Formell", "Freundlich", "Informell", "Streng"],
    // Extra
    optioneel: "Optional",
    emailText: "E-Mail-Text",
    noSubject: "(kein Betreff)",
    
emailPurpose: "Zweck der E-Mail",
emailPurposeOptions: [
  { value: "", label: "Zweck auswählen..." },
  { value: "afspraak", label: "Termin vereinbaren" },
  { value: "klacht", label: "Beschwerde" },
  { value: "vraag", label: "Frage stellen" },
  { value: "bedankje", label: "Danken" },
  { value: "informatie", label: "Information geben" }
],

answerLength: "Antwortlänge",
answerLengthOptions: [
  { value: "", label: "Länge auswählen..." },
  { value: "kort", label: "Kurz (1-2 Sätze)" },
  { value: "gemiddeld", label: "Mittel (2-4 Sätze)" },
  { value: "lang", label: "Lang (ausführlich)" }
],

emailLength: "Länge der E-Mail",
emailLengthOptions: [
  { value: "", label: "Länge wählen..." },
  { value: "kort", label: "Kurz" },
  { value: "normaal", label: "Normal" },
  { value: "lang", label: "Lang" },
  { value: "uitgebreid", label: "Ausführlich" }
],



  },
  Frans: {
    email: "Générer un nouvel e-mail",
    reply: "Générer une réponse à un e-mail",
    newsletter: "Générer une newsletter",
    language: "Langue",
    approach: "Approche",
    recipient: "Nom du destinataire",
    sender: "Nom de l'expéditeur",

    number: "Numéro",
    numberLabel: "Numéro",
    numberPlaceholder: "Choisissez le numéro...",
    numberCustomPlaceholder: "Entrez votre propre numéro ou référence",
    numberTypes: [
      { value: "bestelnummer", label: "Numéro de commande" },
      { value: "factuurnummer", label: "Numéro de facture" },
      { value: "klantnummer", label: "Numéro client" },
      { value: "anders", label: "Autre..." },
    ],

    subject: "Sujet",
    emailContent: "De quoi s'agit-il dans l'e-mail ?",
    placeholderContent: "Décrivez clairement le sujet ou le contenu de votre e-mail.",
    replyPaste: "Collez l'e-mail auquel vous souhaitez répondre",
    replyWhat: "Que voulez-vous répondre à cet e-mail ?",
    replyPlaceholder: "Par exemple : demander une mise à jour, remercier, poser une nouvelle question, etc.",
    companyName: "Nom de l'entreprise ou de l'expéditeur",
    companyPlaceholder: "ex. : Jean Dupont / TechBouw SAS",
    companyType: "Quel type d'entreprise avez-vous ?",
    companyTypeOptions: [
      { value: "", label: "Choisissez le type d'entreprise..." },
      { value: "Detailhandel", label: "Commerce de détail / boutique" },
      { value: "Bouw", label: "Bâtiment / technique" },
      { value: "Zorg", label: "Soins / bien-être" },
      { value: "Financieel", label: "Finance / administration" },
      { value: "ICT", label: "TIC / logiciel" },
      { value: "Horeca", label: "Restauration" },
      { value: "Zakelijke dienstverlening", label: "Services aux entreprises" },
      { value: "Onderwijs", label: "Éducation" },
      { value: "Anders", label: "Autre..." },
    ],
    website: "Site web de l'entreprise (facultatif)",
    websitePlaceholder: "https://www.votreentreprise.fr",
    newsletterSubject: "Sujet de la newsletter",
    newsletterSubjectPlaceholder: "Par exemple : Newsletter de juin - Offre d'été !",
    audience: "Audience",
    audienceOptions: [
      { value: "", label: "Choisissez l'audience..." },
      { value: "Klanten", label: "Clients" },
      { value: "Leads", label: "Leads" },
      { value: "Collega's", label: "Collègues" },
      { value: "Partners", label: "Partenaires" },
      { value: "Anders", label: "Autre..." },
    ],
    style: "Style de la newsletter",
    styleOptions: [
      { value: "", label: "Choisissez le style..." },
      { value: "Neutraal", label: "Neutre" },
      { value: "Marketing", label: "Marketing (vente)" },
      { value: "Informatief", label: "Informatif" },
    ],
    points: "Points principaux (de quoi parle la newsletter ?)",
    pointsPlaceholder: "Décrivez les sujets ou points forts que vous souhaitez partager...",
    length: "Longueur de la newsletter",
    lengthOptions: [
      { value: "", label: "Choisissez la longueur..." },
      { value: "Kort", label: "Court (1 paragraphe)" },
      { value: "Gemiddeld", label: "Moyenne (2-3 paragraphes)" },
      { value: "Lang", label: "Long/Étendu" },
    ],
    cta: "Call to action (facultatif)",
    ctaPlaceholder: "ex. : Visitez notre site, Commandez maintenant",
    generate: "Générer l'e-mail",
    generateReply: "Générer la réponse",
    generateNewsletter: "Générer la newsletter",
    copy: "Copier",
    copied: "Copié !",
    selectLanguage: "Choisir la langue...",
    selectApproach: "Choisir l'approche...",
    approaches: ["Formel", "Amical", "Informel", "Sévère"],
    // Extra
    optioneel: "Facultatif",
    emailText: "Texte de l'e-mail",
    noSubject: "(pas de sujet)",

emailPurpose: "But de l'e-mail",
emailPurposeOptions: [
  { value: "", label: "Choisissez le but..." },
  { value: "afspraak", label: "Prendre rendez-vous" },
  { value: "klacht", label: "Réclamation" },
  { value: "vraag", label: "Poser une question" },
  { value: "bedankje", label: "Remercier" },
  { value: "informatie", label: "Fournir des informations" }
],

answerLength: "Longueur de la réponse",
answerLengthOptions: [
  { value: "", label: "Choisir la longueur..." },
  { value: "kort", label: "Court (1-2 phrases)" },
  { value: "gemiddeld", label: "Moyen (2-4 phrases)" },
  { value: "lang", label: "Long (détaillé)" }
],
emailLength: "Longueur de l'e-mail",
emailLengthOptions: [
  { value: "", label: "Choisir la longueur..." },
  { value: "kort", label: "Court" },
  { value: "normaal", label: "Normal" },
  { value: "lang", label: "Long" },
  { value: "uitgebreid", label: "Détaillé" }
],



  },
  Spaans: {
    email: "Generar nuevo correo",
    reply: "Generar respuesta a correo",
    newsletter: "Generar boletín",
    language: "Idioma",
    approach: "Enfoque",
    recipient: "Nombre del destinatario",
    sender: "Nombre del remitente",

    number: "Número",
    numberLabel: "Número",
    numberPlaceholder: "Elija número...",
    numberCustomPlaceholder: "Introduzca su propio número o referencia",
    numberTypes: [
      { value: "bestelnummer", label: "Número de pedido" },
      { value: "factuurnummer", label: "Número de factura" },
      { value: "klantnummer", label: "Número de cliente" },
      { value: "anders", label: "Otro..." }
    ],

    subject: "Asunto",
    emailContent: "¿Sobre qué trata el correo?",
    placeholderContent: "Describe claramente el tema o contenido de tu correo.",
    replyPaste: "Pega el correo al que quieres responder",
    replyWhat: "¿Qué quieres responder a este correo?",
    replyPlaceholder: "Por ejemplo: Solicitar actualización de estado, agradecer, hacer una nueva pregunta, etc.",
    companyName: "Nombre de la empresa o remitente",
    companyPlaceholder: "ej.: Juan Pérez / TechBouw S.L.",
    companyType: "¿Qué tipo de empresa tienes?",
    companyTypeOptions: [
      { value: "", label: "Elige tipo de empresa..." },
      { value: "Detailhandel", label: "Comercio minorista / tienda" },
      { value: "Bouw", label: "Construcción / técnica" },
      { value: "Zorg", label: "Salud / bienestar" },
      { value: "Financieel", label: "Finanzas / administración" },
      { value: "ICT", label: "TIC / software" },
      { value: "Horeca", label: "Hostelería" },
      { value: "Zakelijke dienstverlening", label: "Servicios empresariales" },
      { value: "Onderwijs", label: "Educación" },
      { value: "Anders", label: "Otro..." },
    ],
    website: "Sitio web de la empresa (opcional)",
    websitePlaceholder: "https://www.tuempresa.es",
    newsletterSubject: "Asunto del boletín",
    newsletterSubjectPlaceholder: "Por ejemplo: Boletín de junio - ¡Promoción de verano!",
    audience: "Audiencia",
    audienceOptions: [
      { value: "", label: "Elige audiencia..." },
      { value: "Klanten", label: "Clientes" },
      { value: "Leads", label: "Leads" },
      { value: "Collega's", label: "Colegas" },
      { value: "Partners", label: "Socios" },
      { value: "Anders", label: "Otro..." },
    ],
    style: "Estilo del boletín",
    styleOptions: [
      { value: "", label: "Elige estilo..." },
      { value: "Neutraal", label: "Neutro" },
      { value: "Marketing", label: "Marketing (ventas)" },
      { value: "Informatief", label: "Informativo" },
    ],
    points: "Puntos principales (¿de qué trata el boletín?)",
    pointsPlaceholder: "Describe los temas o aspectos destacados que deseas compartir...",
    length: "Longitud del boletín",
    lengthOptions: [
      { value: "", label: "Elige longitud..." },
      { value: "Kort", label: "Corto (1 párrafo)" },
      { value: "Gemiddeld", label: "Medio (2-3 párrafos)" },
      { value: "Lang", label: "Largo/Extendido" },
    ],
    cta: "Llamada a la acción (opcional)",
    ctaPlaceholder: "ej.: Visita nuestro sitio, Haz tu pedido ahora",
    generate: "Generar correo",
    generateReply: "Generar respuesta",
    generateNewsletter: "Generar boletín",
    copy: "Copiar",
    copied: "¡Copiado!",
    selectLanguage: "Elige idioma...",
    selectApproach: "Elige enfoque...",
    approaches: ["Formal", "Amable", "Informal", "Estricto"],
    // Extra
    optioneel: "Opcional",
    emailText: "Texto del correo",
    noSubject: "(sin asunto)",

emailPurpose: "Propósito del correo",
emailPurposeOptions: [
  { value: "", label: "Elige propósito..." },
  { value: "afspraak", label: "Concertar cita" },
  { value: "klacht", label: "Reclamar" },
  { value: "vraag", label: "Hacer una pregunta" },
  { value: "bedankje", label: "Agradecer" },
  { value: "informatie", label: "Dar información" }
],

answerLength: "Longitud de la respuesta",
answerLengthOptions: [
  { value: "", label: "Elige longitud..." },
  { value: "kort", label: "Corto (1-2 frases)" },
  { value: "gemiddeld", label: "Medio (2-4 frases)" },
  { value: "lang", label: "Largo (detallado)" }
],
emailLength: "Longitud del correo",
emailLengthOptions: [
  { value: "", label: "Elige longitud..." },
  { value: "kort", label: "Corto" },
  { value: "normaal", label: "Normal" },
  { value: "lang", label: "Largo" },
  { value: "uitgebreid", label: "Extendido" }
],



  },
Oekraïens: {
  email: "Створити новий лист",
  reply: "Згенерувати відповідь на лист",
  newsletter: "Створити розсилку",
  language: "Мова",
  approach: "Стиль",
  recipient: "Ім'я одержувача",
  sender: "Ім'я відправника",

  number: "Номер",
  numberLabel: "Номер", // <-- toegevoegd
  numberPlaceholder: "Виберіть номер...", // <-- toegevoegd
  numberCustomPlaceholder: "Введіть власний номер або посилання", // <-- toegevoegd

  numberTypes: [
    { value: "bestelnummer", label: "Номер замовлення" },
    { value: "factuurnummer", label: "Номер рахунку" },
    { value: "klantnummer", label: "Номер клієнта" },
    { value: "anders", label: "Інше..." }
  ],
  subject: "Тема",
  emailContent: "Про що цей лист?",
  placeholderContent: "Чітко опишіть тему або зміст листа.",
  replyPaste: "Вставте лист, на який хочете відповісти",
  replyWhat: "Що ви хочете відповісти на цей лист?",
  replyPlaceholder: "Наприклад: Запитати про статус, подякувати, поставити нове запитання тощо.",
  companyName: "Назва компанії або відправника",
  companyPlaceholder: "наприклад: Іван Іванов / TechBouw ТОВ",
  companyType: "Який у вас тип компанії?",
  companyTypeOptions: [
    { value: "", label: "Оберіть тип компанії..." },
    { value: "Detailhandel", label: "Роздрібна торгівля / магазин" },
    { value: "Bouw", label: "Будівництво / техніка" },
    { value: "Zorg", label: "Охорона здоров'я / соціальна сфера" },
    { value: "Financieel", label: "Фінанси / адміністрування" },
    { value: "ICT", label: "ІТ / програмне забезпечення" },
    { value: "Horeca", label: "Готельно-ресторанний бізнес" },
    { value: "Zakelijke dienstverlening", label: "Бізнес-послуги" },
    { value: "Onderwijs", label: "Освіта" },
    { value: "Anders", label: "Інше..." },
  ],
    website: "Веб-сайт компанії (необов'язково)",
    websitePlaceholder: "https://www.yourcompany.ua",
    newsletterSubject: "Тема розсилки",
    newsletterSubjectPlaceholder: "Наприклад: Червневий бюлетень — Літня акція!",
    audience: "Аудиторія",
    audienceOptions: [
      { value: "", label: "Оберіть аудиторію..." },
      { value: "Klanten", label: "Клієнти" },
      { value: "Leads", label: "Ліди" },
      { value: "Collega's", label: "Колеги" },
      { value: "Partners", label: "Партнери" },
      { value: "Anders", label: "Інше..." },
    ],
    style: "Стиль розсилки",
    styleOptions: [
      { value: "", label: "Оберіть стиль..." },
      { value: "Neutraal", label: "Нейтральний" },
      { value: "Marketing", label: "Маркетинговий (продажі)" },
      { value: "Informatief", label: "Інформативний" },
    ],
    points: "Основні пункти (про що розсилка?)",
    pointsPlaceholder: "Опишіть теми або основні моменти, які ви хочете поділитися...",
    length: "Довжина розсилки",
    lengthOptions: [
      { value: "", label: "Оберіть довжину..." },
      { value: "Kort", label: "Коротка (1 абзац)" },
      { value: "Gemiddeld", label: "Середня (2-3 абзаци)" },
      { value: "Lang", label: "Довга/Розгорнута" },
    ],
    cta: "Заклик до дії (необов'язково)",
    ctaPlaceholder: "наприклад: Відвідайте наш сайт, Замовте зараз",
    generate: "Згенерувати лист",
    generateReply: "Згенерувати відповідь",
    generateNewsletter: "Згенерувати розсилку",
    copy: "Копіювати",
    copied: "Скопійовано!",
    selectLanguage: "Оберіть мову...",
    selectApproach: "Оберіть стиль...",
    approaches: ["Офіційний", "Дружній", "Неофіційний", "Суворий"],
    // Extra
    optioneel: "Необов'язково",
    emailText: "Текст листа",
    noSubject: "(немає теми)",

emailPurpose: "Мета листа",
emailPurposeOptions: [
  { value: "", label: "Оберіть мету..." },
  { value: "afspraak", label: "Призначити зустріч" },
  { value: "klacht", label: "Скарга" },
  { value: "vraag", label: "Поставити запитання" },
  { value: "bedankje", label: "Подякувати" },
  { value: "informatie", label: "Надати інформацію" }
],

answerLength: "Довжина відповіді",
answerLengthOptions: [
  { value: "", label: "Оберіть довжину..." },
  { value: "kort", label: "Коротка (1-2 речення)" },
  { value: "gemiddeld", label: "Середня (2-4 речення)" },
  { value: "lang", label: "Довга (детально)" }
],
emailLength: "Довжина листа",
emailLengthOptions: [
  { value: "", label: "Оберіть довжину..." },
  { value: "kort", label: "Короткий" },
  { value: "normaal", label: "Звичайний" },
  { value: "lang", label: "Довгий" },
  { value: "uitgebreid", label: "Розгорнутий" }
],



  },
} as const;

// --- Types ---
type NummerType = "" | "bestelnummer" | "factuurnummer" | "klantnummer" | "anders";
type BedrijfType =
  | ""
  | "Detailhandel"
  | "Bouw"
  | "Zorg"
  | "Financieel"
  | "ICT"
  | "Horeca"
  | "Zakelijke dienstverlening"
  | "Onderwijs"
  | "Anders";

type EmailFormData = {
  emailTekst: string;
  taal: keyof typeof translations;
  naamAfzender: string;
  naamOntvanger: string;
  benadering: string;
  nummer: string;
  nummerType: NummerType;
  context: string;
  antwoordWens: string;
  bedrijfsnaamNieuwsbrief: string;
  bedrijfTypeNieuwsbrief: BedrijfType;
  websiteNieuwsbrief: string;
  onderwerpNieuwsbrief: string;
  doelgroepNieuwsbrief: string;
  stijlNieuwsbrief: string;
  puntenNieuwsbrief: string;
  lengteNieuwsbrief: string;
  ctaNieuwsbrief: string;
  doelEmail: string;
  antwoordLengte: string;
  emailLength: string;
};

export default function EmailForm() {
  const [tab, setTab] = useState<"nieuw" | "antwoord" | "nieuwsbrief">("nieuw");
  const [formData, setFormData] = useState<EmailFormData>({
    emailTekst: "",
    taal: "Engels",
    naamAfzender: "",
    naamOntvanger: "",
    benadering: translations["Nederlands"].approaches[0],
    nummer: "",
    nummerType: "",   // <-- DIT moet je hier zo zetten, dus een lege string!
    context: "",
    antwoordWens: "",
    bedrijfsnaamNieuwsbrief: "",
    bedrijfTypeNieuwsbrief: "",
    websiteNieuwsbrief: "",
    onderwerpNieuwsbrief: "",
    doelgroepNieuwsbrief: "",
    stijlNieuwsbrief: "",
    puntenNieuwsbrief: "",
    lengteNieuwsbrief: "",
    ctaNieuwsbrief: "",
    doelEmail: "",
    antwoordLengte: "",
    emailLength: "",
  });
  const t = translations[formData.taal];

  const [gegenereerdeEmail, setGegenereerdeEmail] = useState<string>("");
  const [gegenereerdOnderwerp, setGegenereerdOnderwerp] = useState<string>("");
  const [copyFeedback, setCopyFeedback] = useState<{ type: "subject" | "body" | null }>({ type: null });

  // --- Handlers ---
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleNummerTypeChange = (value: NummerType) => {
  setFormData((prev) => ({
    ...prev,
    nummerType: value,
  }));
};


  const handleCopy = async (text: string, type: "subject" | "body") => {
    await navigator.clipboard.writeText(text);
    setCopyFeedback({ type });
    setTimeout(() => setCopyFeedback({ type: null }), 1200);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

const handleGenereer = async () => {
  setGegenereerdeEmail("");
  setGegenereerdOnderwerp("");

  const isAntwoord = tab === "antwoord";
  const isNieuwsbrief = tab === "nieuwsbrief";
  const payload = isAntwoord
    ? {
        ...formData,
        isAntwoord: true,
        naamAfzender: formData.naamOntvanger,
        naamOntvanger: formData.naamAfzender,
      }
    : {
        ...formData,
        isAntwoord: false,
        isNieuwsbrief,
      };

  // **HIER NIEUW:**
  let endpoint = "/api/genereer/email";
  if (tab === "antwoord") endpoint = "/api/genereer/reply";
  if (tab === "nieuwsbrief") endpoint = "/api/genereer/newsletter";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Error generating email.");

    setGegenereerdeEmail(data.email || "");
    setGegenereerdOnderwerp(data.onderwerp || "");
  } catch {
    alert("AI error.");
  }
};


  // --- UI Fields (dynamisch op basis van tab en taal) ---
const renderFields = () => {
  if (tab === "nieuw") {
    return (
      <>
        {/* Eerste regel: doel en benadering */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-4 md:mb-6">
          <div>
            <label className="block mb-1 md:mb-2 text-sm font-medium text-gray-700">{t.emailPurpose}</label>
            <select
              name="doelEmail"
              value={formData.doelEmail || ""}
              onChange={handleChange}
              className="w-full bg-white/90 border border-indigo-200 rounded-xl px-4 py-3 text-indigo-900 text-base shadow focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            >
              {t.emailPurposeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 md:mb-2 text-sm font-medium text-gray-700">{t.approach}</label>
            <select
              name="benadering"
              value={formData.benadering}
              onChange={handleChange}
              className="w-full bg-white/90 border border-indigo-200 rounded-xl px-4 py-3 text-indigo-900 text-base shadow focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            >
              {t.approaches.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </section>

        {/* Tweede regel: ontvanger/afzender */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-4 md:mb-6">
          <div>
            <label className="block mb-1 md:mb-2 text-sm font-medium text-gray-700">{t.recipient}</label>
            <input
              type="text"
              name="naamOntvanger"
              value={formData.naamOntvanger}
              onChange={handleChange}
              className="w-full bg-white/90 border border-indigo-200 rounded-xl px-4 py-3 text-indigo-900 text-base shadow focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            />
          </div>
          <div>
            <label className="block mb-1 md:mb-2 text-sm font-medium text-gray-700">{t.sender}</label>
            <input
              type="text"
              name="naamAfzender"
              value={formData.naamAfzender}
              onChange={handleChange}
              className="w-full bg-white/90 border border-indigo-200 rounded-xl px-4 py-3 text-indigo-900 text-base shadow focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            />
          </div>
        </section>

<section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-4 md:mb-6">
  {/* Nummer */}
  <div>
    <label className="block mb-1 md:mb-2 text-sm font-medium text-gray-700">{t.numberLabel}</label>
    <select
      name="nummerType"
      value={formData.nummerType}
      onChange={handleChange}
      className="w-full bg-white/90 border border-indigo-200 rounded-xl px-4 py-3 text-indigo-900 text-base shadow focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
    >
      <option value="">{t.numberPlaceholder}</option>
      {t.numberTypes.map((nt) => (
        <option key={nt.value} value={nt.value}>{nt.label}</option>
      ))}
    </select>
    {formData.nummerType !== "" && (
      <input
        type="text"
        name="nummer"
        value={formData.nummer}
        onChange={handleChange}
        placeholder={
          formData.nummerType === "anders"
            ? t.numberCustomPlaceholder || "Voer zelf een nummer of referentie in"
            : `Vul hier je ${t.numberTypes.find(n => n.value === formData.nummerType)?.label?.toLowerCase() || "nummer"} in`
        }
        className="mt-3 w-full bg-white/90 border border-indigo-200 rounded-xl px-4 py-3 text-indigo-900 text-base shadow focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
      />
    )}
  </div>

  {/* E-mail lengte */}
  <div>
    <label className="block mb-1 md:mb-2 text-sm font-medium text-gray-700">{t.emailLength}</label>
    <select
      name="emailLength"
      value={formData.emailLength || ""}
      onChange={handleChange}
      className="w-full bg-white/90 border border-indigo-200 rounded-xl px-4 py-3 text-indigo-900 text-base shadow focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
    >
      {t.emailLengthOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
</section>


        {/* E-mail context */}
        <section>
          <label className="block mb-1 md:mb-2 text-sm font-medium text-gray-700">{t.emailContent}</label>
          <textarea
            name="context"
            value={formData.context}
            onChange={handleChange}
            rows={3}
            className="w-full bg-white/90 border border-indigo-200 rounded-xl px-4 py-3 text-indigo-900 text-base shadow focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            placeholder={t.placeholderContent}
          />
        </section>
      </>
    );
  }

if (tab === "antwoord") {
  return (
    <>
      {/* 1. Bovenaan: textarea voor ontvangen e-mail */}
      <section>
        <label className="block mb-1 md:mb-2 text-base font-semibold text-gray-700">{t.replyPaste}</label>
        <textarea
          name="emailTekst"
          value={formData.emailTekst}
          onChange={handleChange}
          rows={8}
          className="w-full bg-white/95 border border-indigo-300 rounded-xl px-4 py-3 text-indigo-900 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition placeholder:text-indigo-300"
          required
        />
      </section>

      {/* 2. Naam ontvanger + afzender */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-4 md:mb-6">
        <div>
          <label className="block mb-1 md:mb-2 text-sm font-medium text-gray-700">{t.recipient}</label>
          <input
            type="text"
            name="naamOntvanger"
            value={formData.naamOntvanger}
            onChange={handleChange}
            className="w-full bg-white/90 border border-indigo-200 rounded-xl px-4 py-3 text-indigo-900 text-base shadow focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
          />
        </div>
        <div>
          <label className="block mb-1 md:mb-2 text-sm font-medium text-gray-700">{t.sender}</label>
          <input
            type="text"
            name="naamAfzender"
            value={formData.naamAfzender}
            onChange={handleChange}
            className="w-full bg-white/90 border border-indigo-200 rounded-xl px-4 py-3 text-indigo-900 text-base shadow focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
          />
        </div>
      </section>

      {/* 3. Lengte van het antwoord + benadering */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-4 md:mb-6">
        <div>
          <label className="block mb-1 md:mb-2 text-sm font-medium text-gray-700">{t.answerLength}</label>
          <select
            name="antwoordLengte"
            value={formData.antwoordLengte || ""}
            onChange={handleChange}
            className="w-full bg-white/90 border border-indigo-200 rounded-xl px-4 py-3 text-indigo-900 text-base shadow focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
          >
            {t.answerLengthOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 md:mb-2 text-sm font-medium text-gray-700">{t.approach}</label>
          <select
            name="benadering"
            value={formData.benadering}
            onChange={handleChange}
            className="w-full bg-white/90 border border-indigo-200 rounded-xl px-4 py-3 text-indigo-900 text-base shadow focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
          >
            {t.approaches.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </section>

      {/* 4. Nummer dropdown (optioneel input erbij als "anders" is gekozen) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-4 md:mb-6">
        <div>
          <label className="block mb-1 md:mb-2 text-sm font-medium text-gray-700">{t.numberLabel}</label>
          <select
            name="nummerType"
            value={formData.nummerType}
            onChange={handleChange}
            className="w-full bg-white/90 border border-indigo-200 rounded-xl px-4 py-3 text-indigo-900 text-base shadow focus:outline-none focus:ring-2 focus:ring-indigo-300 transition md:w-full"
          >
            <option value="">{t.numberPlaceholder}</option>
            {t.numberTypes.map((nt) => (
              <option key={nt.value} value={nt.value}>{nt.label}</option>
            ))}
          </select>
          {formData.nummerType !== "" && (
            <input
              type="text"
              name="nummer"
              value={formData.nummer}
              onChange={handleChange}
              placeholder={
                formData.nummerType === "anders"
                  ? t.numberCustomPlaceholder || "Voer zelf een nummer of referentie in"
                  : `Vul hier je ${t.numberTypes.find(n => n.value === formData.nummerType)?.label?.toLowerCase() || "nummer"} in`
              }
              className="mt-3 w-full bg-white/90 border border-indigo-200 rounded-xl px-4 py-3 text-indigo-900 text-base shadow focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            />
          )}
        </div>
        {/* Hier zou je eventueel nog een extra veld naast Nummer kunnen plaatsen */}
      </section>

      {/* 5. Wat wil je antwoorden */}
      <section>
        <label className="block mb-1 md:mb-2 text-sm font-medium text-gray-700">{t.replyWhat}</label>
        <textarea
          name="antwoordWens"
          value={formData.antwoordWens}
          onChange={handleChange}
          rows={4}
          placeholder={t.replyPlaceholder}
          className="w-full bg-white/90 border border-indigo-200 rounded-xl px-4 py-3 text-indigo-900 text-base shadow focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
        />
      </section>
    </>
  );
}


  if (tab === "nieuwsbrief") {
    return (
      <>
        <section>
          <label className="block mb-1 md:mb-2 text-sm font-medium text-gray-700">{t.companyName}</label>
          <input
            type="text"
            name="bedrijfsnaamNieuwsbrief"
            value={formData.bedrijfsnaamNieuwsbrief}
            onChange={handleChange}
            className="w-full bg-white/90 border border-indigo-200 rounded-xl px-4 py-3 text-indigo-900 text-base shadow focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            placeholder={t.companyPlaceholder}
          />
        </section>
        <section>
          <label className="block mb-1 md:mb-2 text-sm font-medium text-gray-700">{t.companyType}</label>
          <select
            name="bedrijfTypeNieuwsbrief"
            value={formData.bedrijfTypeNieuwsbrief}
            onChange={handleChange}
            className="w-full bg-white/90 border border-indigo-200 rounded-xl px-4 py-3 text-indigo-900 text-base shadow focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
          >
            {t.companyTypeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </section>
        <section>
          <label className="block mb-1 md:mb-2 text-sm font-medium text-gray-700">{t.website}</label>
          <input
            type="text"
            name="websiteNieuwsbrief"
            value={formData.websiteNieuwsbrief}
            onChange={handleChange}
            className="w-full bg-white/90 border border-indigo-200 rounded-xl px-4 py-3 text-indigo-900 text-base shadow focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            placeholder={t.websitePlaceholder}
          />
        </section>
        <section>
          <label className="block mb-1 md:mb-2 text-sm font-medium text-gray-700">{t.newsletterSubject}</label>
          <input
            type="text"
            name="onderwerpNieuwsbrief"
            value={formData.onderwerpNieuwsbrief || ""}
            onChange={handleChange}
            className="w-full bg-white/90 border border-indigo-200 rounded-xl px-4 py-3 text-indigo-900 text-base shadow focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            placeholder={t.newsletterSubjectPlaceholder}
          />
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-4 md:mb-6">
          <div>
            <label className="block mb-1 md:mb-2 text-sm font-medium text-gray-700">{t.audience}</label>
            <select
              name="doelgroepNieuwsbrief"
              value={formData.doelgroepNieuwsbrief || ""}
              onChange={handleChange}
              className="w-full bg-white/90 border border-indigo-200 rounded-xl px-4 py-3 text-indigo-900 text-base shadow focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            >
              {t.audienceOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 md:mb-2 text-sm font-medium text-gray-700">{t.style}</label>
            <select
              name="stijlNieuwsbrief"
              value={formData.stijlNieuwsbrief || ""}
              onChange={handleChange}
              className="w-full bg-white/90 border border-indigo-200 rounded-xl px-4 py-3 text-indigo-900 text-base shadow focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            >
              {t.styleOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </section>
        <section>
          <label className="block mb-1 md:mb-2 text-sm font-medium text-gray-700">{t.points}</label>
          <textarea
            name="puntenNieuwsbrief"
            value={formData.puntenNieuwsbrief || ""}
            onChange={handleChange}
            rows={4}
            placeholder={t.pointsPlaceholder}
            className="w-full bg-white/90 border border-indigo-200 rounded-xl px-4 py-3 text-indigo-900 text-base shadow focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
          />
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-4 md:mb-6">
          <div>
            <label className="block mb-1 md:mb-2 text-sm font-medium text-gray-700">{t.length}</label>
            <select
              name="lengteNieuwsbrief"
              value={formData.lengteNieuwsbrief || ""}
              onChange={handleChange}
              className="w-full bg-white/90 border border-indigo-200 rounded-xl px-4 py-3 text-indigo-900 text-base shadow focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            >
              {t.lengthOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 md:mb-2 text-sm font-medium text-gray-700">{t.cta}</label>
            <input
              type="text"
              name="ctaNieuwsbrief"
              value={formData.ctaNieuwsbrief || ""}
              onChange={handleChange}
              className="w-full bg-white/90 border border-indigo-200 rounded-xl px-4 py-3 text-indigo-900 text-base shadow focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
              placeholder={t.ctaPlaceholder}
            />
          </div>
        </section>
      </>
    );
  }

  return null;
};


  // --- UI ---
  return (
<form
  onSubmit={handleSubmit}
  className="
    w-full
    max-w-xl
    sm:max-w-2xl
    md:max-w-3xl
    lg:max-w-4xl
    xl:max-w-5xl
    2xl:max-w-6xl
    mx-auto
    my-8 sm:my-16
    bg-white/80
    rounded-3xl
    shadow-[0_8px_64px_0_rgba(70,50,200,0.13)]
    border border-white/30
    px-3 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-12
    space-y-7 sm:space-y-10
    backdrop-blur-2xl
    transition-all
    duration-300
    "

  style={{ fontFamily: "Inter, Arial, sans-serif" }}
>
<div className="flex flex-col md:flex-row justify-center gap-2 md:gap-4 mb-6">
  <button
    type="button"
    onClick={() => setTab("nieuw")}
    className={`flex-1 text-lg md:text-xl font-bold px-4 md:px-8 py-2 md:py-4 rounded-t-xl md:rounded-t-none md:rounded-l-xl border-b-4 md:border-b-0 md:border-r-4 ${
      tab === "nieuw"
        ? "bg-blue-600 text-white border-blue-800 shadow-lg z-10"
        : "bg-gray-100 text-gray-800 border-transparent hover:bg-blue-50"
    } transition-all duration-200`}
  >
    {t.email}
  </button>
  <button
    type="button"
    onClick={() => setTab("antwoord")}
    className={`flex-1 text-lg md:text-xl font-bold px-4 md:px-8 py-2 md:py-4 border-b-4 md:border-b-0 md:border-r-4 ${
      tab === "antwoord"
        ? "bg-green-600 text-white border-green-800 shadow-lg z-10"
        : "bg-gray-100 text-gray-800 border-transparent hover:bg-green-50"
    } transition-all duration-200`}
  >
    {t.reply}
  </button>
  <button
    type="button"
    onClick={() => setTab("nieuwsbrief")}
    className={`flex-1 text-lg md:text-xl font-bold px-4 md:px-8 py-2 md:py-4 rounded-b-xl md:rounded-b-none md:rounded-r-xl border-b-4 md:border-b-0 ${
      tab === "nieuwsbrief"
        ? "bg-purple-600 text-white border-purple-800 shadow-lg z-10"
        : "bg-gray-100 text-gray-800 border-transparent hover:bg-purple-50"
    } transition-all duration-200`}
  >
    {t.newsletter}
  </button>
</div>

{/* Universele Taalkeuze */}
<div className="flex justify-center mb-2 sm:mb-6">
  <select
    name="taal"
    value={formData.taal}
    onChange={e =>
      setFormData(prev => ({
        ...prev,
        taal: e.target.value as keyof typeof translations,
        benadering: translations[e.target.value as keyof typeof translations].approaches[0],
      }))
    }
    className="w-48 bg-white/95 border border-indigo-300 rounded-xl px-4 py-3 text-indigo-900 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
  >
    <option value="Engels">English</option>
    <option value="Nederlands">Nederlands</option>
    <option value="Duits">Deutsch</option>
    <option value="Frans">Français</option>
    <option value="Spaans">Español</option>
    <option value="Oekraïens">Українська</option>
  </select>
</div>

{renderFields()}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-3 sm:pt-4">
        <button
          type="button"
          onClick={handleGenereer}
          className={`w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 rounded-xl font-semibold ${
            tab === "nieuw"
              ? "bg-blue-600 hover:bg-blue-700"
              : tab === "antwoord"
              ? "bg-green-600 hover:bg-green-700"
              : "bg-purple-600 hover:bg-purple-700"
          } text-white transition`}
        >
          {tab === "nieuw"
            ? t.generate
            : tab === "antwoord"
            ? t.generateReply
            : t.generateNewsletter}
        </button>
      </div>
      {gegenereerdeEmail && (
        <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <label className="block mb-1 font-semibold text-gray-700">{t.subject}</label>
              <span className="block text-base text-gray-800 font-medium break-words">{gegenereerdOnderwerp || t.noSubject}</span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(gegenereerdOnderwerp, "subject")}
              className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold transition"
            >
              {copyFeedback.type === "subject" ? t.copied : t.copy}
            </button>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2">
              <label className="font-semibold text-gray-700">{t.emailText}</label>
              <button
                type="button"
                onClick={() => handleCopy(gegenereerdeEmail, "body")}
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold transition"
              >
                {copyFeedback.type === "body" ? t.copied : t.copy}
              </button>
            </div>
            <textarea
              value={gegenereerdeEmail}
              readOnly
              rows={8}
              className="w-full border-none bg-gray-50 px-3 py-2 text-gray-800 resize-none"
            />
          </div>
        </div>
      )}
    </form>
  );
}