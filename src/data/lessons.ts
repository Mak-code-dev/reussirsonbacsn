import { Subject } from '../types';
import { hgLessons } from './subject_hg';
import { philoLessons } from './subject_philo';
import { francaisLessons } from './subject_francais';
import { anglaisLessons } from './subject_anglais';
import { egenLessons } from './subject_egen';
import { mathLessons } from './subject_math';
import { svtLessons } from './subject_svt';
import { pcLessons } from './subject_pc';

export const allSubjects: Subject[] = [
  {
    key: 'hg',
    label: 'histoire et géographie',
    badge: 'hg',
    icon: 'Globe',
    color: 'text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    description: 'histoire et géographie de terminale : de la guerre froide à la mondialisation du système monde, sans oublier l’économie du sénégal.',
    lessons: hgLessons
  },
  {
    key: 'philo',
    label: 'philosophie',
    badge: 'philo',
    icon: 'Brain',
    color: 'text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900',
    bgColor: 'bg-purple-50 dark:bg-purple-950/30',
    description: 'méthodologie complète de la dissertation et du commentaire de texte, accompagnée de sujets et corrigés types du baccalauréat.',
    lessons: philoLessons
  },
  {
    key: 'francais',
    label: 'français',
    badge: 'français',
    icon: 'BookOpen',
    color: 'text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900',
    bgColor: 'bg-rose-50 dark:bg-rose-950/30',
    description: 'les grandes fonctions de la littérature (le roman, la poésie, le théâtre) et les techniques clés de dissertation et résumé.',
    lessons: francaisLessons
  },
  {
    key: 'anglais',
    label: 'anglais',
    badge: 'anglais',
    icon: 'Languages',
    color: 'text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-900',
    bgColor: 'bg-orange-50 dark:bg-orange-950/30',
    description: 'méthodes infaillibles pour réussir le bac d’anglais: compréhension de texte, syntaxe, conjugaison linguistique et expression écrite.',
    lessons: anglaisLessons
  },
  {
    key: 'egen',
    label: 'économie générale',
    badge: 'éco générale',
    icon: 'TrendingUp',
    color: 'text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900',
    bgColor: 'bg-amber-50 dark:bg-amber-950/30',
    description: 'toutes les théories de croissance et développement, toutes les formules du pib, de l’idh, de la balance des paiements et d’analyse locale.',
    lessons: egenLessons
  },
  {
    key: 'math',
    label: 'mathématiques',
    badge: 'maths',
    icon: 'Calculator',
    color: 'text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
    description: 'du second degré aux compositions de fonctions, en passant par les limites d’analyse, les statistiques de régression linéaire et le dénombrement.',
    lessons: mathLessons
  },
  {
    key: 'svt',
    label: 'svt',
    badge: 'svt',
    icon: 'Dna',
    color: 'text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-900',
    bgColor: 'bg-teal-50 dark:bg-teal-950/30',
    description: 'sciences de la vie et de la terre: système nerveux de neurologie, reproduction humaine, génétique moléculaire et régulation de glycémie.',
    lessons: svtLessons
  },
  {
    key: 'pc',
    label: 'physique et chimie',
    badge: 'pc',
    icon: 'Atom',
    color: 'text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950/30',
    description: 'la chimie organique d’estérification et de saponification, les calculs de matière, l’électricité d’effet joule, l’optique ondulatoire et la géothermie.',
    lessons: pcLessons
  }
];
