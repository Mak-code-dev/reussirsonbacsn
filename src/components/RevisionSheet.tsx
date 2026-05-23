import React, { useState } from 'react';
import { Percent, ClipboardList, Search, BookOpen, Layers } from 'lucide-react';

export default function RevisionSheet() {
  const [searchTerm, setSearchTerm] = useState('');

  const sheets = [
    {
      category: 'mathématiques',
      formulas: [
        { name: 'trinôme du second degré', formula: 'ax² + bx + c', detail: 'relations de coefficients de l’expression polynomiale.' },
        { name: 'discriminant (delta)', formula: 'Δ = b² - 4ac', detail: 'permet de déterminer le signe du trinôme et de trouver ses racines.' },
        { name: 'racine double (si delta = 0)', formula: 'x₀ = -b / (2a)', detail: 'l’unique valeur réelle annulant la fonction si Δ vaut 0.' },
        { name: 'racines distinctes (si delta > 0)', formula: 'x₁ = (-b - √Δ)/2a  et  x₂ = (-b + √Δ)/2a', detail: 'les deux valeurs réelles annulant la fonction si Δ > 0.' },
        { name: 'factorisation (si delta > 0)', formula: 'f(x) = a(x - x₁)(x - x₂)', detail: 'écriture simplifiée sous forme de produit de deux binômes.' },
        { name: 'moyenne statistique', formula: 'x̄ = (Σ xi) / n', detail: 'moyenne arithmétique simple d’une série statistique.' },
        { name: 'variance d’une série', formula: 'Vx = (Σ xi²) / n - x̄²', detail: 'mesure de dispersion de la série par rapport à sa valeur médiane.' },
        { name: 'écart-type', formula: 'σx = √Vx', detail: 'distance d’éclatement moyenne par rapport à la moyenne.' },
        { name: 'droite de régression linéaire', formula: 'y = ax + b', detail: 'droite d’ajustement par moindres carrés.' },
        { name: 'pente de régression', formula: 'a = Cov(x, y) / Vx', detail: 'coefficient directeur directeur de la droite.' },
        { name: 'dérivée de quotient', formula: '(u / v)′ = (u′v - v′u) / v²', detail: 'formule fondamentale de dérivation des fractions rationnelles.' }
      ]
    },
    {
      category: 'physique & chimie',
      formulas: [
        { name: 'quantité de matière', formula: 'n = m / M', detail: 'relation entre la masse d’un échantillon et sa masse molaire.' },
        { name: 'rendement d’une réaction', formula: 'r = (m_exp / m_th) x 100', detail: 'pourcentage d’efficacité expérimentale de la synthèse.' },
        { name: 'degré de polymérisation', formula: 'n = M_polymère / M_motif', detail: 'nombre de motifs répétitifs de monomères dans la chaîne.' },
        { name: 'puissance effet joule', formula: 'P_j = R x I²', detail: 'puissance dissipée par échauffement thermique.' },
        { name: 'énergie électrique', formula: 'E = P x t', detail: 'travail fourni par l’échange électrique.' },
        { name: 'loi de puissance continue', formula: 'P = U x I', detail: 'produit de la tension et de l’intensité efficace.' },
        { name: 'puissance active (cos phi)', formula: 'P = U x I x k', detail: 'k désigne le facteur de puissance inductif.' },
        { name: 'rapport de transformateur', formula: 'U1 / U2 = N1 / N2', detail: 'relation de modification entre tensions d’enroulements.' },
        { name: 'énergie du photon', formula: 'E = h x ν', detail: 'quantification d’énergie du rayonnement électromagnétique.' },
        { name: 'longueur d’onde - célérité', formula: 'ν = c / λ', detail: 'relation de fréquence par rapport à la vitesse de propagation de la lumière.' },
        { name: 'nombre de masse nucléaire', formula: 'A = Z + N', detail: 'nombre total de nucléons.' }
      ]
    },
    {
      category: 'économie générale',
      formulas: [
        { name: 'solde commercial', formula: 'SC = exportations - importations', detail: 'écart de transaction des marchandises.' },
        { name: 'taux de couverture', formula: 'TC = (exportations / importations) x 100', detail: 'pourcentage d’importations couvert par l’effort d’exportation.' },
        { name: 'taux d’ouverture', formula: 'TO = (exportations + importations) / (2 x pib) x 100', detail: 'mesure de la dépendance de l’économie vis-à-vis du monde.' },
        { name: 'taux de pénétration', formula: 'TP = importations / DIB x 100', detail: 'DIB = PIB - exportations + importations.' },
        { name: 'taux d’exportation', formula: 'TX = exportations / pib x 100', detail: 'part du produit représentée par les ventes au monde.' },
        { name: 'pib (optique de production)', formula: 'PIB = VAB + TVA + DD', detail: 'somme des valeurs ajoutées brutes, de la tva et des taxes douanières.' },
        { name: 'pib (optique de dépense)', formula: 'PIB = CF + FBCF + ΔS + X - M', detail: 'consommation finale + investissements + stocks + export - import.' },
        { name: 'épargne intérieure brute', formula: 'EIB = PIB - CF', detail: 'part du produit national brut qui n’est pas consommée.' },
        { name: 'taux d’investissement', formula: 'Ti = (FBCF + ΔS) / PIB x 100', detail: 'effort d’accumulation de capital fixe et stocks.' },
        { name: 'indice de développement humain', formula: 'IDH = (VE + VS + VN) / 3', detail: 'moyenne de longévité, d’éducation et de niveau de vie d’un pays.' }
      ]
    }
  ];

  const filteredSheets = sheets.map(categorySheet => {
    const filteredFormulas = categorySheet.formulas.filter(f =>
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.detail.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...categorySheet, formulas: filteredFormulas };
  }).filter(categorySheet => categorySheet.formulas.length > 0);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400">
            <ClipboardList size={22} />
          </div>
          <div>
            <h2 className="text-xl font-display font-semibold lowercase">memento de formules bac</h2>
            <p className="text-xs text-zinc-500 lowercase">toutes les formules clés des mathématiques, de la physique-chimie et de l'économie récapitulées.</p>
          </div>
        </div>

        {/* Form Search bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="rechercher une formule..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full sm:w-60 pl-8 pr-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-500 lowercase dark:text-zinc-100"
          />
          <Search size={14} className="absolute left-2.5 top-2.5 text-zinc-400" />
        </div>
      </div>

      <div className="space-y-8">
        {filteredSheets.length === 0 ? (
          <p className="text-xs text-zinc-400 text-center py-4 lowercase">aucune formule ne correspond à votre recherche.</p>
        ) : (
          filteredSheets.map((cat, idx) => (
            <div key={idx} className="space-y-3">
              <div className="flex items-center gap-2 pb-1 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{cat.category}</span>
                <span className="text-[10px] text-zinc-300 dark:text-zinc-600 font-mono">({cat.formulas.length})</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cat.formulas.map((f, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700 transition-all flex flex-col justify-between hover:shadow-sm"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 lowercase">{f.name}</h4>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5 lowercase">{f.detail}</p>
                    </div>
                    <div className="mt-3 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                      <code className="text-xs font-mono font-semibold text-violet-700 dark:text-violet-400">{f.formula}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
