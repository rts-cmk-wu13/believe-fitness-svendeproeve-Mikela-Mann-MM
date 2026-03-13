

# Believe Fitness - Dokumentation
**Navn:** Mikela Mann  
**Hold:** [13]

---

## Introduktion
 
Believe Fitness er en lille kæde af fitnesscentre i gang med en større ekspansion. Dette projekt er en mobil web-applikation udviklet som svendeprøve, der giver kunderne mulighed for at finde og tilmelde sig fitnesshold digitalt.

Projektet dækker hovedopgaven fuldt ud samt alle tre valgfrie opgaver

## Tech stack

### Next.js 16
Next.js er et React-baseret JavaScript framework med fil-baseret routing og mulighed for at afvikle kode på serveren gennem Server Components og Server Actions.

Jeg har valgt Next.js af flere årsager. Frameworket har allerede taget en række strukturelle beslutninger for mig, herunder routing, bundling og optimering, hvilket giver mig mere tid til at fokusere på selve funktionaliteten. Det giver desuden en større beskyttelse af sensitive data, fordi API-kald med access tokens kan udføres server-side uden at eksponere tokens til browseren. I dette projekt håndteres session-validering i `proxy.ts` (middleware), som kører server-side og beskytter de routes der kræver login.

Next.js er et af de mest efterspurgte frameworks i branchen. Ifølge Stack Overflow Developer Survey 2024 er det det 6. mest populære web framework, og React-økosystemet, som det bygger på, har det største community med over 250.000 npm-pakker.

### REST API
Projektet kommunikerer med et eksisterende REST API (Believe Fitness API) der kører lokalt på `localhost:4000`. REST (Representational State Transfer) er en arkitektur-standard for web-services, som bruger HTTP-requests (GET, POST, PUT, DELETE) til at hente og manipulere data. API'et returnerer data i JSON-format og bruger JWT-tokens til autentifikation.

Alle API-kald er samlet i `lib/api.ts` - et modul per ressource (classes, users, trainers osv.) som er projektets eneste lag der kommunikerer direkte med backend. Dette gør det nemt at ændre endpoints eller skifte API uden at røre ved komponenterne.

### Tailwind CSS v4
Tailwind CSS er et utility-first CSS framework der giver mulighed for at style komponenter direkte i markup ved hjælp af utility classes. Projektet bruger Tailwind v4, som introducerer en ny `@import "tailwindcss"` syntaks frem for de tidligere `@tailwind base/components/utilities` direktiver.

Jeg har valgt Tailwind fordi det passer godt til komponent-baseret udvikling i React/Next.js. Da designet er bygget op omkring et specifikt farvesystem defineret i Figma, har jeg defineret alle design tokens som CSS custom properties i `globals.css` og kun brugt Tailwind til layout-hjælpeklasser. Design tokens som farver og spacing er holdt i CSS-variabler frem for Tailwind-konfigurationen, da de bruges på tværs af inline styles og CSS-klasser.

### TypeScript
TypeScript er et supersæt af JavaScript der tilføjer statisk type-checking. Det betyder at fejl kan fanges under development i stedet for runtime. Alle interfaces og typer er samlet i `types/index.ts`



---

## Projektstruktur

```
believe-fitness/
├── app/
│   ├── (auth)/                      # Route group — ingen header
│   │   ├── login/page.tsx           # Login med ?registered=true banner
│   │   └── register/page.tsx        # Opret konto med password-bekræftelse
│   │
│   ├── (main)/                      # Route group — header på alle sider
│   │   ├── layout.tsx               # Injekterer Header med isLoggedIn
│   │   ├── home/page.tsx            # Landing: Hero, News, Newsletter,
│   │   │                            # Testimonials, Kontakt, Footer
│   │   ├── classes/
│   │   │   ├── page.tsx             # Tilfældig featured class + ClassCarousel
│   │   │   └── [id]/page.tsx        # Detaljer + EnrollButton + RateButton
│   │   ├── search/
│   │   │   ├── page.tsx             # Server: henter classes + trainers
│   │   │   └── SearchContent.tsx    # Client: fritekst-filter
│   │   ├── profile/
│   │   │   ├── page.tsx             # Member: tilmeldte hold / Admin: alle hold
│   │   │   └── [classId]/participants/page.tsx
│   │   └── create-class/page.tsx    # Opret/rediger hold (instructor/admin)
│   │
│   ├── splash/page.tsx              # Standalone — ingen layout
│   ├── layout.tsx                   # Root: Poppins font, app-shell
│   ├── page.tsx                     # redirect → /splash
│   ├── not-found.tsx
│   └── globals.css                  # CSS-variabler, base-styles
│
├── components/
│   ├── ui/                          # Generiske komponenter
│   │   ├── Header.tsx               # Back-knap + hamburger menu
│   │   ├── NavMenu.tsx              # Fullscreen overlay navigation
│   │   ├── FormError.tsx
│   │   ├── BackButton.tsx
│   │   └── StarRating.tsx
│   ├── auth/
│   │   ├── LoginForm.tsx            # useActionState + loginAction
│   │   └── RegisterForm.tsx         # useActionState + registerAction
│   ├── classes/
│   │   ├── ClassCard.tsx
│   │   ├── ClassCarousel.tsx        # Horisontal scroll
│   │   ├── EnrollButton.tsx         # SIGN UP / LEAVE + fejlbeskeder
│   │   ├── RateButton.tsx           # RATE / RATED
│   │   └── RatingModal.tsx          # Stjerner + slider
│   ├── profile/
│   │   ├── MemberClassCard.tsx
│   │   ├── MemberClassList.tsx
│   │   ├── InstructorClassCard.tsx
│   │   └── InstructorClassList.tsx
│   └── landing/
│       ├── Hero.tsx
│       ├── NewsSection.tsx
│       ├── NewsletterForm.tsx
│       ├── TestimonialsCarousel.tsx
│       ├── ContactForm.tsx
│       └── Footer.tsx
│
├── lib/
│   ├── api/                         # Ét modul per API-ressource
│   │   ├── client.ts                # apiFetch — base URL, headers, fejl
│   │   ├── auth.ts                  # loginUser, getUser
│   │   ├── classes.ts               # getClasses, CRUD, enroll/leave
│   │   ├── users.ts                 # registerUser, getUserById
│   │   ├── trainers.ts
│   │   ├── news.ts
│   │   ├── testimonials.ts
│   │   ├── ratings.ts
│   │   ├── newsletter.ts
│   │   ├── messages.ts
│   │   └── assets.ts
│   ├── actions.ts                   # Alle Server Actions samlet ét sted
│   ├── dal.ts                       # Data Access Layer
│   ├── session.ts                   # getSession, setSession, clearSession
│   ├── errors.ts                    # ApiError, AuthError m.fl.
│   └── reportError.ts               # Fejl-logging utility
│
├── types/index.ts                   # Alle TypeScript-typer
└── middleware.ts                    # Beskytter /profile og /create-class
```

Strukturen er bygget op om en klar adskillelse af ansvar: `api.ts` taler med backend, `session.ts` håndterer auth, `errors.ts` klassificerer fejltyper, `actions.ts` samler alle Server Actions ét sted, og komponenter har kun ansvar for UI.

Hver side der muterer data har sin egen `actions.ts` fil med Server Actions. Det holder side-komponenterne rene, da de kun modtager data og delegerer mutations til actions, som kører server-side og har adgang til session-cookien.

Route groups med parenteser, `(auth)` og `(main)`, bruges til at styre hvilke sider der får bottom navigation uden at påvirke URL-strukturen. -->

**Begrundelse for valg af mappestruktur uden src-mappe**

Next.js understøtter begge konventioner: at placere koden direkte i roden af projektet eller at samle den under en `src/`-mappe. Jeg har valgt at placere `app/`, `components/`, `lib/` og `types/` direkte i roden, da projektet er relativt lille og overskueligt uden et ekstra abstraktionsniveau.

`src/`-mappen giver primært mening i større projekter eller monorepos, hvor man ønsker en tydelig adskillelse mellem applikationskode og konfigurationsfiler som `next.config.ts`, `tailwind.config.ts` og `package.json`. I et projekt af denne størrelse vurderede jeg at det ekstra mappeniveau ville tilføje kompleksitet uden en reel gevinst.

Havde projektet skullet skalere med fx flere udviklere, tests eller et delt komponentbibliotek, ville en `src/`-struktur have givet mere mening:

```
src/
├── app/
├── components/
├── lib/
└── types/
```

Det ville have holdt roden renere og gjort det tydeligere at skelne mellem projektkonfiguration og applikationskode. En yderligere forbedring ville have været at opdele `components/` i `components/ui/` til generiske, genbrugelige komponenter og `components/features/` til domænespecifikke komponenter som `activities/` og `profile/`, da det skalerer bedre når komponentmappen vokser.

## Designbeslutning: Navigation

Kravspecifikationen beskriver en back-knap der altid sender brugeren til Home. Jeg har valgt at implementere den med `router.back()` i stedet, så den sender brugeren tilbage til den side de kom fra. Det giver en mere intuitiv brugeroplevelse — hvis man navigerer fra Classes til en class-detalje og trykker tilbage, er det naturligt at lande på Classes igen og ikke på Home. En knap der altid går til Home hører semantisk hjemme som et logo, ikke en back-knap.

---

### Login-flow
 
```
1.  Bruger udfylder formular → form action kører server-side
2.  loginAction() validerer felter → returnerer fejlstate hvis invalid
3.  loginUser() POST /auth/token → modtager JWT + userId + role
4.  getUser() GET /api/v1/users/:id → henter userFirstName, userLastName
5.  setSession() gemmer alt i httpOnly cookie
6.  redirect('/profile') — Next.js håndterer 303-redirect
```

## Kodeeksempel

```typescript
// lib/actions.ts
export async function enrollAction(classId: number): Promise<ActionResult> {
  try {
    const session = await requireSession();
 
    const { getClassesById } = await import("@/lib/api/classes");
    const { getUserById }    = await import("@/lib/api/users");
 
    const [targetClass, user] = await Promise.all([
      getClassesById(classId),
      getUserById(session.userId, session.token),
    ]);
 
    // Regel 1: Max-deltagere nået?
    if (
      targetClass.maxParticipants !== undefined &&
      (targetClass.users?.length ?? 0) >= targetClass.maxParticipants
    ) {
      return { error: "This class is full" };
    }
 
    // Regel 2: Allerede tilmeldt på samme ugedag?
    const hasConflict = (user.classes ?? []).some(
      (c) => c.classDay?.toLowerCase() === targetClass.classDay?.toLowerCase()
    );
    if (hasConflict) {
      return { error: `You already have a class on ${targetClass.classDay}` };
    }
 
    await enrollInClass(classId, session.userId, session.token);
    revalidatePath(`/classes/${classId}`);
    revalidatePath("/profile");
    return {};
 
  } catch (err) {
    reportError(err, "enrollAction");
    return { error: "Could not sign up for class" };
  }
}
```

**Hvad er det?**
En Next.js Server Action der håndterer tilmelding til et hold

**Hvad er formålet?**
At validere om en bruger må tilmelde sig et hold baseret på max-deltagere og ugedag, og udføre selve tilmeldingen uden at eksponere JWT-token eller forretningslogik til klienten.

**Hvordan sker det?**
Funktionen er markeret med `"use server"` direktivet, hvilket betyder den udelukkende kører på serveren og aldrig i browseren. Det er afgørende fordi JWT-tokenet er gemt i en httpOnly cookie, som JavaScript i browseren ikke kan tilgå af sikkerhedsmæssige årsager.

Sessionen hentes med `requireSession()`, som læser cookien via Next.js' server-side cookies() API og kaster en fejl hvis brugeren ikke er logget ind — et tidligt guard-mønster der holder resten af funktionen ren.
De to API-kald, `getClassesById` og `getUserById`, udføres parallelt med Promise.all frem for sekventielt. Det halverer ventetiden, da begge kald er uafhængige af hinanden.

Valideringen sker i applikationslaget frem for at stole på API'ets fejlkoder, fordi begge forretningsregler kræver data fra to uafhængige ressourcer simultaneously: holdet for at tjekke `maxParticipants`, og brugeren for at tjekke eksisterende tilmeldinger på samme ugedag. Det er ikke muligt at udtrykke begge regler via API-fejlkoder alene.

Til sidst kalder funktionen revalidatePath, som fortæller Next.js at invalidere den cachede version af de berørte sider, så siderne automatisk re-renderes med det opdaterede tilmeldingsstatus næste gang de besøges.

---

## Kendte API-begrænsninger
 
**Brugernavn gemmes, navn gør ikke.**
Ved oprettelse af en ny bruger via `POST /api/v1/users` accepterer API'et `userFirstName` og `userLastName` i request body og returnerer HTTP 200 — men felterne gemmes ikke. Efterfølgende kald til `GET /api/v1/users/:id` returnerer `userFirstName: null` og `userLastName: null` uanset hvad der blev sendt.
 
Konsekvensen er at nyoprettede brugere vises uden navn i profil-visningen. Fejlen ligger i API'et og er ikke mulig at omgå på frontend uden at gemme navnet lokalt, hvilket ville være inkonsistent med resten af session-håndteringen. Eksisterende brugere oprettet direkte i databasen er ikke påvirket.

## Security & Best Practices

**httpOnly cookie-baseret autentifikation**
Sessions gemmes i `httpOnly` cookies sat server-side via `setSession()` i `lib/session.ts`. `httpOnly` betyder at JavaScript i browseren ikke kan læse cookien, den er kun tilgængelig for serveren. Det beskytter mod XSS-angreb, hvor ondsindet JavaScript ellers ville kunne stjæle brugerens token. Alle API-kald der kræver et token sker derfor via Server Actions.

**Route protection** 
`proxy.ts` kører server-side på alle requests og beskytter `/profile` og `/create-class` ved at parse session-cookien og redirecte brugere uden gyldigt token. `/create-class` validerer desuden brugerens rolle og redirecter ikke-instruktører til profil-siden.

**Rollebaseret UI**
Instruktører og medlemmer ser forskelligt indhold på profil-siden. Rolletjekket sker server-side baseret på `session.role` fra cookien.
 
**Centraliseret fejlhåndtering**
`lib/errors.ts` definerer custom error-klasser (`ApiError`, `AuthError`) som `apiFetch` kaster ved forskellige fejlscenarier. `reportError.ts` sikrer at alle fejl logges struktureret.

---

# Perspektivering

**Deployment**
Projektet skal deployes på Vercel, som er den anbefalede hosting-platform for Next.js. Vercel håndterer automatisk server-side rendering og CDN-distribution globalt. Deployment sker automatisk ved push til main-branchen via GitHub-integration.

**Sentry fejlmonitorering**
Projektet er sat op med Sentry til fejlmonitorering i production. Fejl rapporteres automatisk via `lib/reportError.ts`, som wrapper Sentrys SDK. `global-error.tsx` fanger ubehandlede fejl på applikationsniveau. Dette giver overblik over fejl i production uden at brugeren behøver at rapportere dem manuelt.

**Skalering og vedligeholdelse**
Kodebasen er struktureret med klar adskillelse, da API-kald, auth-logik og UI-komponenter er separeret. Alle design tokens er defineret som CSS custom properties i ét sted (`globals.css`), så farver og spacing kan opdateres globalt. Alle TypeScript-typer er samlet i `types/index.ts`, så datamodeller kun vedligeholdes ét sted.

---

## Refleksion

Dette projekt har givet mig praktisk erfaring med Next.js App Router og den fundamentale forskel på Client og Server Components, ikke bare teoretisk, men som en arkitekturel beslutning der påvirkede hele projektet.

Det mest lærerige var arbejdet med `httpOnly` cookies og session-håndtering. Det lød enkelt at gemme en session i en cookie, men valget om at bruge `httpOnly` for sikkerhedens skyld betød at al kode der brugte JWT-tokenet måtte omskrives fra client components til Server Actions, fordi browseren ikke kan læse en `httpOnly` cookie. Det var en god lære om at sikkerhedsbeslutninger har arkitekturelle konsekvenser, og at det er vigtigere at forstå *hvorfor* man vælger en løsning end blot at implementere den.

Jeg blev også mere bevidst om vigtigheden af at læse API-dokumentation grundigt inden man begynder at kode. Flere fejl skyldtes at jeg antog at endpoints og content-types fulgte REST-konventioner, som det konkrete API afveg fra, fx `application/x-www-form-urlencoded` på user-oprettelse, `/auth/token` uden `/api/v1/`-præfikset, og at list-endpointet for aktiviteter ikke returnerede trainerdata som enkelt-endpointet gjorde. Det kostede en del refaktorering undervejs.

**Hvad ville jeg gøre anderledes?**
Jeg ville sætte proxy og auth-arkitekturen op fra start, da det er svært at refaktorere senere. Jeg ville også skrive et simpelt test-script der verificerer alle API-endpoints inden komponenterne bygges.