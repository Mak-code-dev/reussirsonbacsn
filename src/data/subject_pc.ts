import { Lesson } from '../types';

export const pcLessons: Lesson[] = [
  {
    id: 'pc-chimie-organique',
    title: 'i. chimie organique (très important)',
    content: `les esters et l'estérification :

notions à apprendre :
- ester : produit d'une réaction d'estérification.
- acide carboxylique : composé possédant le groupe fonctionnel carboxyle -cooh.
- alcool : composé possédant le groupe -oh lié à un carbone tétraédrique.

réaction d'estérification :
formule fondamentale :
acide carboxylique + alcool = ester + eau
(représenté par la double flèche ⇌ symbolisant l'équilibre dynamique)

caractéristiques de la réaction d'estérification :
- lente (met plusieurs heures ou jours à température ambiante)
- limitée (s'arrête avant la disparition complète des réactifs, rendement d'environ 67% pour un mélange équimolaire d'alcool primaire)
- réversible (l'ester et l'eau formés réagissent ensemble pour reformer l'acide et l'alcool).

moyens pour accélérer la réaction :
- chauffage (l'augmentation de la température est un facteur cinétique)
- catalyseur (ajout d'ions h+ sous forme d'acide sulfurique pour accélérer le processus sans modifier l'état final d'équilibre).

moyens pour augmenter le rendement de la réaction :
- utiliser un excès d'un des réactifs (souvent l'alcool ou l'acide le moins cher)
- éliminer l'un des produits au fur et à mesure de sa formation (en distillant l'ester ou l'eau par exemple pour déplacer l'équilibre).

hydrolyse d'un ester :
- définition : réaction inverse de l'estérification (ester + eau ⇌ acide carboxylique + alcool) possédant les mêmes caractéristiques (lente, limitée, réversible).

saponification d'un ester :
- réaction entre : un ester et une base forte (soude ou potasse)
- produits obtenus : un savon (carboxylate de sodium ou de potassium) et un alcool
- caractéristiques : réaction totale et rapide à chaud, non réversible.

dérivés d'acides :
- dérivés importants : chlorure d'acyle et anhydride d'acide.
- avantage d'utilisation : réagissent de façon totale et très rapide avec les alcools pour former des esters, sans former d'eau.`
  },
  {
    id: 'pc-calculs-matiere',
    title: 'ii. calculs de quantité de matière',
    content: `méthodes de calcul très fréquentes au bac :

formule de quantité de matière (solides/liquides) :
n = m / m
- n : quantité de matière (en mol)
- m : masse du produit (en g)
- m : masse molaire de l'espèce (en g/mol)

rendement (r) d'une réaction chimique :
r = (m_exp / m_th) x 100
- m_exp : masse de produit obtenue expérimentalement
- m_th : masse maximale théorique attendue si la réaction était totale

masses molaires atomiques indispensables à connaître par cœur :
- c = 12 g/mol
- h = 1 g/mol
- o = 16 g/mol`
  },
  {
    id: 'pc-polymeres-plastiques',
    title: 'iii. polymères et plastiques',
    content: `notions clés de chimie macromoléculaire (très probables) :

définitions :
- monomère : petite molécule de départ possédant une double liaison active.
- polymère : macromolécule géante résultant de l'association de nombreux monomères.
- polymérisation : réaction chimique d'addition successive de monomères.

exemples d'applications industrielles :
- polyéthylène <- éthylène (monomère de départ)
- polypropylène <- propène (monomère de départ)

concepts complémentaires :
- motif du polymère : le plus petit enchaînement d'atomes qui se répète régulièrement dans la chaîne.
- savoir reconnaître : le motif répétitif et en déduire la formule plane du monomère d'origine.
- degré de polymérisation (n) : nombre moyen de motifs présents dans une chaîne de polymère :
  n = m_polymere / m_motif
  * m_polymere : masse molaire moyenne du polymère fini
  * m_motif : masse molaire du motif unitaire de répétition.`
  },
  {
    id: 'pc-electricite',
    title: 'iv. électricité (ultra important)',
    content: `les lois fondamentales du circuit électrique (systématique au bacalauréat) :

1. effet joule :
- définition : dégagement de chaleur provoqué par le passage du courant dans un conducteur ohmique.
- formule de la puissance dissipée par effet joule :
  p_j = r x i^2
  * p_j : puissance dissipée par effet joule (en watt, w)
  * r : résistance du conducteur (en ohm, Ω)
  * i : intensité efficace du courant (en ampère, a)

- énergie électrique consommée :
  e = p x t
  * e : énergie électrique (en joule, j, ou en wattheure, wh)
  * p : puissance électrique totale de l'appareil (en watt, w)
  * t : durée de fonctionnement (en secondes, s, ou en heures, h)

transport de l'électricité à grande distance :
- problématique : minimiser les pertes d'énergie par effet joule le long des câbles de transport.
- solution technique mise en œuvre : l'électricité est transportée sous très haute tension (u élevé) et faible intensité (i très petit) car les pertes par effet joule dépendent de i au carré (p_j = r.i²).

2. puissance électrique :
- formule continue ou alternative monophasée purement résistive :
  p = u x i
  * p : puissance (en w)
  * u : tension efficace (en volt, v)
  * i : intensité efficace (en a)
- formule avec récepteur inductif (facteur de puissance) :
  p = u x i x k
  * k : facteur de puissance (cosinus de l'angle de déphasage, sans unité).

3. transformateur :
- utilité : appareil statique servant à modifier les valeurs de tension et d'intensité alternatives sans changer la fréquence.
- formule du rapport de transformation :
  u1 / u2 = n1 / n2
  * u1, u2 : tensions efficaces aux bornes du primaire et du secondaire
  * n1, n2 : nombre de spires des enroulements primaire et secondaire.
- types de transformateur :
  * abaisseur : u2 < u1 (n2 < n1)
  * élévateur : u2 > u1 (n2 > n1).`
  },
  {
    id: 'pc-ondes-optique',
    title: 'v. ondes et optique',
    content: `concepts physiques de propagation (très fréquents également) :

1. réflexion de la lumière :
- lois de snell-descartes :
  * le rayon incident, le rayon réfléchi et la normale à la surface séparatrice se situent dans le même plan appelé plan d'incidence.
  * l'angle d'incidence est rigoureusement égal à l'angle de réflexion.

2. diffraction :
- définition : comportement caractéristique des ondes qui se manifeste par un étalement de la direction de propagation lors du passage à travers une fente ou un obstacle étroit.
- caractéristiques : la diffraction augmente d'autant plus que :
  * la longueur d'onde (λ) augmente
  * la largeur de l'ouverture ou fente (a) diminue.

3. interférences lumineuses :
- définition : superposition de deux ondes lumineuses cohérentes de même fréquence issues de sources dites synchrone.
- manifestations : apparition de franges d'interférence sur l'écran :
  * franges brillantes : interférences constructives (ondes en phase)
  * franges sombres : interférences destructives (ondes en opposition de phase).`
  },
  {
    id: 'pc-physique-moderne',
    title: 'vi. physique moderne',
    content: `les théories quantiques de la lumière (très importantes) :

effet photoélectrique :
- définition : émission d'électrons par un matériau (souvent métallique) lorsqu'il est exposé à un rayonnement lumineux de fréquence suffisamment élevée.
- seuil photoélectrique (λ0) : longueur d'onde maximale du rayonnement au-dessus de laquelle l'effet photoélectrique est impossible.
- électron éjecté : l'énergie apportée par un photon incident arrache un électron lié du métal s'il surmonte le travail d'extraction.

condition d'observation de l'effet photoélectrique :
λ < λ0
(la longueur d'onde de la lumière incidente doit être strictement inférieure au seuil λ0 caractéristiques du métal pour éjecter des électrons).

formules fondamentales :
- énergie d'un photon :
  e = h x nu
  * e : énergie (en j)
  * h : constante de planck (en j.s)
  * nu : fréquence de la lumière (en hz)
- relation fréquence - longueur d'onde :
  nu = c / lambda
  * c : célérité de la lumière dans le vide (en m/s)
  * lambda : longueur d'onde de la lumière (en m).`
  },
  {
    id: 'pc-radioactivite-atome',
    title: 'vii. radioactivité et atome',
    content: `notions fondamentales de physique nucléaire :

constitution de l'atome :
- proton : particule chargée positivement logée dans le noyau.
- neutron : particule neutre de masse similaire au proton située dans le noyau.
- électron : particule légère chargée négativement gravitant autour du noyau.

nombres caractéristiques :
- numéro atomique (z) : nombre de protons présents dans le noyau (z = nombre de protons).
- nombre de masse (a) : nombre total de nucléons (protons + neutrons) présents (a = z + n, avec n = nombre de neutrons).`
  },
  {
    id: 'pc-energies',
    title: 'viii. énergies',
    content: `notions d'actualité et d'efficacité énergétique au bac :

géothermie :
- définition : exploitation de la chaleur naturelle stockée sous la surface de la terre pour produire du chauffage ou de l'électricité.
- avantages :
  * énergie renouvelable et inépuisable
  * régulière (indépendante du climat et du vent)
  * peu polluante (faibles émissions de co2).
- inconvénients :
  * dépend fortement de la structure géologique du sous-sol local
  * pertes thermiques le long des réseaux de transport
  * installation coûteuse à forer au départ.

led contre lampe à incandescence :
- led (diode électroluminescente) : faible consommation d'énergie, très longue durée de vie, faible dégagement de chaleur.
- lampe à incandescence : forte consommation d'énergie (gaspillage de 95% d'énergie sous forme de chaleur), durée de vie très courte.`
  },
  {
    id: 'pc-conseils',
    title: 'ix. questions types et conseils importants',
    content: `les questions qui reviennent tout le temps :

savoir définir impérativement :
- estérification
- hydrolyse
- polymère
- diffraction
- interférence
- effet joule

savoir compléter des phrases récurrentes :
- << le noyau de l'atome contient des protons et des neutrons. >>
- << la saponification est une réaction totale et rapide qui permet d'obtenir du savon. >>
- << l'énergie électrique est transportée sous très haute tension afin de diminuer les pertes par effet joule. >>

savoir justifier par vrai/faux :
- les propriétés des réactions d'estérification/hydrolyse
- le type de transformateur (abaisseur ou élévateur)
- le comportement des polymères thermoplastiques
- le comportement des photons incidents.

calculs à maîtriser absolument au bac :
- calculer une quantité de matière (n = m/m)
- calculer une masse finale théorique ou expérimentale
- calculer un rendement d'estérification
- calculer une puissance électrique consommée (p = u.i)
- calculer l'énergie électrique totale (e = p.t)
- calculer les pertes de ligne par effet joule (p_j = r.i²)
- calculer d'une intensité de courant efficace.

les chapitres les plus probables au bac pc :
1. estérification et saponification
2. électricité générale
3. effet joule et transport
4. led et énergies renouvelables
5. polymères et matières plastiques
6. effet photoélectrique et photons
7. interférences et diffraction
8. atome et radioactivité
9. transformateurs électriques
10. géothermie.

conseil important du correcteur :
- apprends les définitions mot à mot.
- retiens les caractéristiques expérimentales de chaque réaction de chimie.
- maîtrise parfaitement les unités du système international :
  * w : watt (puissance)
  * j : joule (énergie)
  * v : volt (tension)
  * a : ampère (intensité)
  * Ω : ohm (résistance)
  * mol : mole (quantité de matière).
- entraîne-toi régulièrement aux calculs numériques car beaucoup de points au bac viennent des applications directes des formules.`
  }
];
