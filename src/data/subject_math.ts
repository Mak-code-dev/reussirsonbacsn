import { Lesson } from '../types';

export const mathLessons: Lesson[] = [
  {
    id: 'math-polynome-2nd-degre',
    title: '1. factoriser un polynôme du 2nd degré',
    content: `factorisation d'un trinôme du second degré :

un polynôme du second degré est toujours de la forme :
ax² + bx + c
(avec a, b et c des réels, a différent de 0)

la méthode de factorisation est toujours la même en 3 étapes :

étape 1 : identifier les coefficients a, b, c
exemple : f(x) = 2x² + 6x - 20
ici -> a = 2, b = 6, c = -20

étape 2 : calculer le discriminant (delta, Δ)
formule essentielle :
delta = b² - 4ac
dans notre exemple :
delta = 6² - 4 x 2 x (-20) = 36 + 160 = 196

étape 3 : analyser le signe de delta et factoriser
- cas 1 — delta < 0 : pas de racine réelle, le polynôme n'est pas factorisable dans l'ensemble r.
- cas 2 — delta = 0 : une racine double réelle unique :
  x0 = -b / 2a
  formule de la factorisation : a(x - x0)²
- cas 3 — delta > 0 : deux racines réelles distinctes :
  x1 = (-b - √delta) / 2a
  x2 = (-b + √delta) / 2a
  formule de la factorisation : a(x - x1)(x - x2)

dans notre exemple :
le discriminant vaut delta = 196 (avec de plus √196 = 14)
calcul des deux racines réelles :
x1 = (-6 - 14) / 4 = -5
x2 = (-6 + 14) / 4 = 2
factorisation finale de la fonction f(x) :
f(x) = 2(x + 5)(x - 2)`
  },
  {
    id: 'math-signe-trinome',
    title: "2. signe d'un trinôme du 2nd degré",
    content: `déterminer quand le polynôme ax² + bx + c est positif ou négatif :

la méthode dépend directement du signe du discriminant (delta, Δ) :

- cas 1 — delta < 0 :
  * pas de racine réelle, le polynôme ne s'annule jamais.
  * le signe de ax² + bx + c est le même que le signe du coefficient a sur tout l'ensemble r.
  * exemple : f(x) = -x² + x - 2
    delta = 1² - 4 x (-1) x (-2) = 1 - 8 = -7 < 0
    le trinôme est strictement négatif sur tout r (car a = -1 < 0).

- cas 2 — delta = 0 :
  * une racine double x0.
  * le signe est le même que le signe du coefficient a partout (sauf en x0 où il est nul, s'annule).
  * exemple : f(x) = 9x² - 6x + 1
    delta = (-6)² - 4 x 9 x 1 = 36 - 36 = 0
    la racine double est x0 = 6 / 18 = 1/3
    le trinôme est strictement positif sur tout r sauf en 1/3 (car a = 9 > 0).

- cas 3 — delta > 0 :
  * deux racines réelles distinctes x1 < x2.
  * le trinôme est du signe de a à l'extérieur des racines (sur ]-infini, x1[ et ]x2, +infini[) et du signe opposé de a entre les racines (sur ]x1, x2[).
  * tableau de signes types :
    x     | -infini      x1      x2      +infini
    Signe |   signe de a  |  0  -a  |  0  signe de a
  * exemple : f(x) = x² + x - 2
    delta = 1² - 4 x 1 x (-2) = 1 + 8 = 9 > 0
    racines : x1 = -2, x2 = 1 (avec a = 1 > 0)
    le trinôme est positif sur ]-infini, -2] u [1, +infini[ et négatif sur l'intervalle [-2, 1].`
  },
  {
    id: 'math-equations-2nd-degre',
    title: '3. équations du second degré',
    content: `résoudre des équations de la forme ax² + bx + c = 0 :

la recherche des solutions de l'équation s'appuie sur la même méthode que la factorisation (calcul de delta et des racines) :
- si delta < 0 -> l'ensemble des solutions est vide, s = ∅
- si delta = 0 -> une solution unique s = {-b / 2a}
- si delta > 0 -> deux solutions réelles distinctes s = {x1; x2}

astuce produit nul :
si un produit de facteurs est nul, alors au moins un des facteurs est nul (a x b x c = 0 <=> a = 0 ou b = 0 ou c = 0).
- exemple : (4 - 3x)(2x² - 6x + 4)(x - 1) = 0
  on résout séparément chaque facteur :
  * 4 - 3x = 0 <=> x = 4/3
  * 2x² - 6x + 4 = 0 (delta = 36 - 32 = 4, racines x1 = 1, x2 = 2)
  * x - 1 = 0 <=> x = 1
  l'ensemble complet des solutions est s = {4/3; 1; 2}.

astuce équation rationnelle :
si on a l'égalité de deux fractions rationnelles, on applique le produit en croix pour supprimer les dénominateurs, puis on développe et on résout.`
  },
  {
    id: 'math-composition-fonctions',
    title: '4. composition de fonctions',
    content: `comprendre et appliquer la composition de deux fonctions :

notions fondamentales :
- gof(x) : se lit << g rond f de x >>, cela signifie qu'on remplace la variable x dans l'expression de la fonction g par toute l'expression de la fonction f(x) (gof(x) = g(f(x))).
- fog(x) : se lit << f rond g de x >>, cela signifie qu'on remplace la variable x dans l'expression de la fonction f par toute l'expression de la fonction g(x) (fog(x) = f(g(x))).

méthode de calcul pas à pas :
1. écrire la fonction extérieure en premier
2. y remplacer toutes les apparitions de x par l'expression de la fonction intérieure
3. développer et simplifier au maximum.

exemple d'application au bac :
soit f(x) = 3x² - 5 et g(x) = (2x - 3) / (x + 1)
- calcul de gof(x) :
  gof(x) = g(f(x)) = (2(3x² - 5) - 3) / ((3x² - 5) + 1)
  gof(x) = (6x² - 10 - 3) / (3x² - 4)
  gof(x) = (6x² - 13) / (3x² - 4)

- calcul de fog(x) :
  fog(x) = f(g(x)) = 3((2x - 3) / (x + 1))² - 5

pour calculer la valeur d'une composition pour une valeur réelle x0 :
- méthode 1 : utiliser directement l'expression de la composition simplifiée trouvée
- méthode 2 : calculer l'image f(x0) en premier, puis calculer l'image de ce résultat intermédiaire par g.`
  },
  {
    id: 'math-statistiques-regression',
    title: '5. statistiques & régression',
    content: `les formules à retenir pour les statistiques à deux variables :

- moyenne d'une série xi :
  x_bar = (somme des xi) / n
- moyenne d'une série yi :
  y_bar = (somme des yi) / n

- variance (vx) d'une série :
  vx = (somme des xi²) / n - (x_bar)²

- écart-type (sigma_x) :
  sigma_x = √vx

- covariance (cov(x,y)) :
  cov(x,y) = (somme des xi.yi) / n - (x_bar) x (y_bar)

- coefficient de corrélation linéaire de bravais-pearson (r) :
  r = cov(x,y) / (sigma_x x sigma_y)
  interprétation de la valeur absolue de r :
  * si r est proche de 1 ou de -1 (ex: |r| >= 0,85) -> corrélation linéaire forte, l'ajustement linéaire est justifié.
  * si r est proche de 0 -> corrélation linéaire faible, l'ajustement linéaire n'est pas justifié.

- droite de régression linéaire de y en x (méthode de moindres carrés) :
  la droite possède une équation de la forme :
  y = ax + b
  formule pour le coefficient directeur (a) :
  a = cov(x,y) / vx
  formule pour l'ordonnée à l'origine (b) :
  b = y_bar - a x (x_bar)

pour réaliser une estimation de la variable y à partir d'une valeur de x :
il suffit de remplacer x par la valeur proposée dans l'équation de la droite y = ax + b.`
  },
  {
    id: 'math-limites-continuite',
    title: '6. limites & continuité',
    content: `règles fondamentales pour lever les indéterminations :

règle fondamentale en l'infini :
- pour trouver la limite en l'infini d'un polynôme du second degré ou supérieur, on garde uniquement le terme possédant le plus haut degré.
  * exemple : limite quand x tend vers +infini de (2x² + 4x + 1) = limite de (2x²) = +infini

règle pour une fraction rationnelle en l'infini :
- pour trouver la limite en l'infini d'une fraction rationnelle (quotient de deux polynômes), on garde uniquement le quotient des termes dominants du haut et du bas.
  * exemple : limite quand x tend vers -infini de (2x² - 5x + 1) / (x² + 4) = limite de (2x² / x²) = 2

formes indéterminées classiques à connaître absolument :
- infini / infini (∞ / ∞)
- infini moins infini (∞ - ∞)
- zéro fois infini (0 x ∞)
- zéro sur zéro (0 / 0)

quand on rencontre une forme indéterminée aux calculs, il faut lever l'indétermination en factorisant par le terme de plus haut degré ou en simplifiant l'expression de départ.`
  },
  {
    id: 'math-etude-fonctions',
    title: '7. étude de fonctions',
    content: `le chapitre le plus lourd du programme, à réviser étape par étape :

étape 1 : domaine de définition (df)
- la fonction existe si le dénominateur est différent de zéro (u(x) != 0).
- si présence d'une racine carrée √u, la fonction existe si u(x) >= 0.
- si présence d'un logarithme ln(u), la fonction existe si u(x) > 0.

étape 2 : limites aux bornes et asymptotes
- on calcule la limite de f(x) en chaque borne du domaine de définition.
- asymptote verticale (av) : si la limite de f(x) vaut +infini ou -infini quand x tend vers une valeur de borne finie a, alors la droite d'équation x = a est asymptote verticale à la courbe.
- asymptote horizontale (ah) : si la limite de f(x) vaut un nombre réel fini l quand x tend vers l'infini (+infini ou -infini), alors la droite d'équation y = l est asymptote horizontale à la courbe en l'infini.
- asymptote oblique (ao) : si la limite en l'infini de [f(x) - (ax+b)] vaut 0, alors la droite d'équation y = ax+b est asymptote oblique à la courbe. on trouve l'expression ax+b par division euclidienne du polynôme.

étape 3 : position relative par rapport à l'asymptote oblique (ao)
- on calcule la différence f(x) - (ax+b) et on étudie son signe :
  * si le résultat de la différence est positif (+) -> la courbe de f est située au-dessus de l'asymptote.
  * si le résultat de la différence est négatif (-) -> la courbe de f est située en dessous de l'asymptote.

étape 4 : calcul de la dérivée f'(x)
les formules fondamentales d'analyse à connaître par cœur :
- (u / v)' = (u'v - v'u) / v²
- (u x v)' = u'v + v'u
- (x^n)' = n x x^(n-1)
- (ln u)' = u' / u

étape 5 : signe de la dérivée f'(x) et sens de variation
- si f'(x) > 0 sur un intervalle -> la fonction f est strictement croissante.
- si f'(x) < 0 sur un intervalle -> la fonction f est strictement décroissante.

étape 6 : tableau de variations complet
- on rassemble dans un tableau ordonné : le signe de f'(x), les flèches de variations de f, et les valeurs limites trouvées aux bornes du domaine.

étape 7 : équation de la tangente
- l'équation de la tangente à la courbe au point d'abscisse x0 est donnée par :
  y = f'(x0)(x - x0) + f(x0)`
  },
  {
    id: 'math-logarithme-neperien',
    title: '8. logarithme népérien (ln)',
    content: `propriétés fondamentales à appliquer dans les calculs analytiques :

propriétés algébriques :
- ln(a x b) = ln(a) + ln(b)
- ln(a / b) = ln(a) - ln(b)
- ln(a^n) = n x ln(a)
- ln(1 / a) = -ln(a)
- ln(1) = 0
- ln(e) = 1
- ln(x) = k  <=>  x = e^k

domaine de définition :
- l'expression ln(u) existe si et seulement si u(x) > 0. il faut résoudre cette inéquation et dresser un tableau de signes si nécessaire.

résoudre des équations comportant ln :
- ln(a) = ln(b)  <=>  a = b (avec obligatoirement les conditions a > 0 et b > 0)
- ln(a) = 0  <=>  a = 1
- ln(a) = k  <=>  a = e^k

résoudre des inégalités comportant ln :
- ln(a) < ln(b)  <=>  a < b (car la fonction ln est strictement croissante sur son domaine ]0, +infini[)

calcul de dérivée :
- la dérivée de la fonction de base ln(x) est 1 / x.
- la dérivée d'une fonction composée ln(u) est u'/u.

limites usuelles à retenir impérativement :
- limite de ln(x) quand x tend vers 0 par valeurs supérieures (0+) = -infini
- limite de ln(x) quand x tend vers +infini = +infini
- limite du produit x.ln(x) quand x tend vers 0+ = 0 (croissances comparées)
- limite du quotient ln(x) / x quand x tend vers +infini = 0 (croissances comparées)`
  },
  {
    id: 'math-denombrement-probabilites',
    title: '9. dénombrement & probabilités',
    content: `les outils de calcul pour réussir les exercices de tirages :

les trois types de tirages d'urnes classiques :
- tirage simultané (sans ordre et sans répétition d'éléments) :
  * outil de calcul des cas : les combinaisons
  * formule : C(n, p) (ou coefficients binomiaux) = n! / [p! x (n-p)!]
  * ordre important : non
  * répétition possible : non

- tirage successif sans remise (avec ordre et sans répétition d'éléments) :
  * outil de calcul des cas : les arrangements
  * formule : A(n, p) = n! / (n-p)!
  * ordre important : oui
  * répétition possible : non

- tirage successif avec remise (avec ordre et avec répétition d'éléments possible) :
  * outil de calcul des cas : les p-listes
  * formule : n^p
  * ordre important : oui
  * répétition possible : oui
  (nb : n! se lit << factorielle de n >>, exemple : 3! = 3 x 2 x 1 = 6, avec par définition 0! = 1)

formules cardinales fondamentales :
- cardinal du réunion de deux événements :
  card(a u b) = card(a) + card(b) - card(a n b)
- cardinal du complémentaire (événement contraire) :
  card(non_a) = card(e) - card(a)

calcul de probabilité dans l'hypothèse d'équiprobabilité :
- p(a) = nombre de cas favorables pour a / nombre de cas possibles au total = card(a) / card(omega)

événement contraire :
- p(non_a) = 1 - p(a)

astuce du << au moins >> :
- lorsque la question contient l'expression << au moins >>, il est presque toujours beaucoup plus rapide de faire le calcul en passant par son événement contraire.
- exemple : << obtenir au moins une boule rouge >> -> l'événement contraire est << n'obtenir aucune boule rouge >>. la probabilité recherchée vaut p = 1 - p(aucune rouge).

règle des probabilités pour l'union :
- p(a u b) = p(a) + p(b) - p(a n b)`
  },
  {
    id: 'math-resume-general',
    title: '10. résumé général - ce qu\'il faut retenir absolument',
    content: `mémento des formules indispensables du baccalauréat :

- polynômes : discriminant delta = b² - 4ac
- signes : tableau de signes complet du trinôme selon le signe de delta.
- équations : delta, racines réelles, recherche des valeurs d'annulation.
- composition : expressions composites gof(x) et fog(x).
- statistiques : coefficients a et b de la droite d'ajustement par moindres carrés.
- limites : conservation uniquement du terme possédant le plus haut degré en l'infini.
- étude de f : domaine de définition (df), calcul de f'(x), variations de la courbe.
- ln : propriétés analytiques dont ln(a.b) = ln(a) + ln(b) et calcul de dérivée u'/u.
- probabilités : méthode de calcul des probabilités, tirages simultanés ou successifs.`
  }
];
