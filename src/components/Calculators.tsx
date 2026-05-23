import React, { useState } from 'react';
import { Calculator, ArrowRight, Play, Check, Percent } from 'lucide-react';

export default function Calculators() {
  const [activeTab, setActiveTab] = useState<'math' | 'stat' | 'eco'>('math');

  // Second Degree Solver State
  const [coeffA, setCoeffA] = useState<number>(2);
  const [coeffB, setCoeffB] = useState<number>(6);
  const [coeffC, setCoeffC] = useState<number>(-20);
  const [solverResult, setSolverResult] = useState<any>(null);

  // Statistics State
  const [statInput, setStatInput] = useState<string>('10, 12, 15, 8, 14, 11');
  const [statResult, setStatResult] = useState<any>(null);

  // Economics State
  const [valStart, setValStart] = useState<number>(1320);
  const [valEnd, setValEnd] = useState<number>(1450);
  const [ecoResult, setEcoResult] = useState<any>(null);

  const solveSecondDegree = () => {
    const a = Number(coeffA);
    const b = Number(coeffB);
    const c = Number(coeffC);

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      setSolverResult({ error: 'veuillez entrer des nombres valides.' });
      return;
    }
    if (a === 0) {
      setSolverResult({ error: 'le coefficient a ne peut pas être nul.' });
      return;
    }

    const delta = b * b - 4 * a * c;
    let explanation = `étape 1: on identifie les coefficients : a = ${a}, b = ${b}, c = ${c}
étape 2: on calcule le discriminant : delta = b² - 4ac = (${b})² - 4 x (${a}) x (${c}) = ${b * b} - (${4 * a * c}) = ${delta}\n`;

    if (delta < 0) {
      explanation += `étape 3: comme delta est inférieur à 0 (${delta} < 0), l'équation n'a pas de racine réelle. f(x) n'est pas factorisable.`;
      setSolverResult({
        delta,
        status: 'negative',
        explanation,
        roots: []
      });
    } else if (delta === 0) {
      const x0 = -b / (2 * a);
      explanation += `étape 3: comme delta est égal à 0, l'équation a une racine double : x₀ = -b / 2a = -(${b}) / (2 x ${a}) = ${x0.toFixed(4)}
étape 4: la factorisation est a(x - x₀)² = ${a}(x - (${x0.toFixed(2)}))²`;
      setSolverResult({
        delta,
        status: 'zero',
        explanation,
        roots: [x0],
        factorisation: `${a}(x - ${x0 >= 0 ? x0 : `(${x0})`})²`
      });
    } else {
      const x1 = (-b - Math.sqrt(delta)) / (2 * a);
      const x2 = (-b + Math.sqrt(delta)) / (2 * a);
      explanation += `étape 3: comme delta est supérieur à 0 (${delta} > 0), l'équation a deux racines réelles distinctes :
x₁ = (-b - √delta) / 2a = (-${b} - ${Math.sqrt(delta).toFixed(2)}) / (2 x ${a}) = ${x1.toFixed(4)}
x₂ = (-b + √delta) / 2a = (-${b} + ${Math.sqrt(delta).toFixed(2)}) / (2 x ${a}) = ${x2.toFixed(4)}
étape 4: la factorisation est a(x - x₁)(x - x₂) = ${a}(x - (${x1.toFixed(2)}))(x - (${x2.toFixed(2)}))`;
      setSolverResult({
        delta,
        status: 'positive',
        explanation,
        roots: [x1, x2],
        factorisation: `${a}(x - ${x1 >= 0 ? x1.toFixed(2) : `(${x1.toFixed(2)})`})(x - ${x2 >= 0 ? x2.toFixed(2) : `(${x2.toFixed(2)})`})`
      });
    }
  };

  const calculateStats = () => {
    const values = statInput
      .split(',')
      .map(v => Number(v.trim()))
      .filter(v => !isNaN(v));

    if (values.length === 0) {
      setStatResult({ error: 'veuillez entrer une liste de nombres séparés par des virgules.' });
      return;
    }

    const n = values.length;
    const mean = values.reduce((acc, curr) => acc + curr, 0) / n;
    const variance = values.reduce((acc, curr) => acc + Math.pow(curr - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);

    let explanation = `1. nombre d'observations (n) = ${n}
2. calcul du moyenne (x̄) = (somme des xi) / n
   x̄ = (${values.join(' + ')}) / ${n} = ${mean.toFixed(4)}
3. calcul de la variance (vx) = (somme des (xi - x̄)²) / n
   vx = ${variance.toFixed(4)}
4. calcul de l'écart-type (σx) = √vx = √(${variance.toFixed(4)}) = ${stdDev.toFixed(4)}`;

    setStatResult({
      n,
      mean,
      variance,
      stdDev,
      explanation
    });
  };

  const calculateGrowth = () => {
    const start = Number(valStart);
    const end = Number(valEnd);

    if (isNaN(start) || isNaN(end) || start === 0) {
      setEcoResult({ error: 'veuillez entrer des valeurs valides de début et fin.' });
      return;
    }

    const tc = ((end - start) / start) * 100;
    const cm = end / start;

    let explanation = `1. taux de croissance (tc) :
   tc= ((va - vd) / vd) x 100 = ((${end} - ${start}) / ${start}) x 100 = ${(end - start).toFixed(2)} / ${start} x 100 = ${tc.toFixed(4)} %
2. coefficient multiplicateur (cm) :
   cm = va / vd = ${end} / ${start} = ${cm.toFixed(4)}

interprétation suggérée :
entre l'année de départ (valeur: ${start}) et l'année d'arrivée (valeur: ${end}), la variable a enregistré une ${tc >= 0 ? 'augmentation' : 'diminution'} de ${Math.abs(tc).toFixed(2)} % soit une multiplication par ${cm.toFixed(2)}.`;

    setEcoResult({
      tc,
      cm,
      explanation
    });
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
          <Calculator size={22} />
        </div>
        <div>
          <h2 className="text-xl font-display font-semibold lowercase">calculatrices d'entraînement</h2>
          <p className="text-xs text-zinc-500 lowercase">outils interactifs pour valider vos exercices mathématiques, économiques et statistiques.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-100 dark:border-zinc-800 mb-6">
        <button
          onClick={() => setActiveTab('math')}
          className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors lowercase ${
            activeTab === 'math'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-zinc-400 hover:text-zinc-600'
          }`}
        >
          trinôme second degré (maths)
        </button>
        <button
          onClick={() => setActiveTab('stat')}
          className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors lowercase ${
            activeTab === 'stat'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-zinc-400 hover:text-zinc-600'
          }`}
        >
          moyenne & variance (stats)
        </button>
        <button
          onClick={() => setActiveTab('eco')}
          className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors lowercase ${
            activeTab === 'eco'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-zinc-400 hover:text-zinc-600'
          }`}
        >
          croissance & cm (économie)
        </button>
      </div>

      {/* Content MATH */}
      {activeTab === 'math' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] text-zinc-400 lowercase mb-1">coefficient a</label>
              <input
                type="number"
                value={coeffA}
                onChange={e => setCoeffA(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-transparent dark:text-zinc-100"
              />
            </div>
            <div>
              <label className="block text-[10px] text-zinc-400 lowercase mb-1">coefficient b</label>
              <input
                type="number"
                value={coeffB}
                onChange={e => setCoeffB(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-transparent dark:text-zinc-100"
              />
            </div>
            <div>
              <label className="block text-[10px] text-zinc-400 lowercase mb-1">coefficient c</label>
              <input
                type="number"
                value={coeffC}
                onChange={e => setCoeffC(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-transparent dark:text-zinc-100"
              />
            </div>
          </div>

          <button
            onClick={solveSecondDegree}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer lowercase"
          >
            <Play size={14} /> calculer le polynôme
          </button>

          {solverResult && (
            <div className="mt-4 p-4 rounded-xl bgcolor bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 space-y-3">
              {solverResult.error ? (
                <p className="text-xs text-rose-500 lowercase">{solverResult.error}</p>
              ) : (
                <div className="space-y-3 font-mono text-[11px] text-zinc-600 dark:text-zinc-300">
                  <div className="flex gap-4">
                    <span>discriminant delta : <strong className="text-zinc-900 dark:text-zinc-100">{solverResult.delta}</strong></span>
                    <span>racines : <strong className="text-zinc-900 dark:text-zinc-100">{solverResult.roots.length}</strong></span>
                  </div>
                  {solverResult.factorisation && (
                    <div>
                      <span>forme factorisée : </span>
                      <span className="bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded font-bold">f(x) = {solverResult.factorisation}</span>
                    </div>
                  )}
                  {solverResult.roots.length > 0 && (
                    <div className="flex gap-4">
                      {solverResult.roots.map((r: number, idx: number) => (
                        <span key={idx}>x{idx + 1} = <strong className="text-zinc-900 dark:text-zinc-100">{r.toFixed(3)}</strong></span>
                      ))}
                    </div>
                  )}
                  <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 text-[10px] text-zinc-400 whitespace-pre-line lowercase">
                    {solverResult.explanation}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Content STAT */}
      {activeTab === 'stat' && (
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] text-zinc-400 lowercase mb-1">série de données (séparées par des virgules)</label>
            <input
              type="text"
              value={statInput}
              onChange={e => setStatInput(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-transparent dark:text-zinc-100"
              placeholder="ex: 10, 12, 15, 8, 14, 11"
            />
          </div>

          <button
            onClick={calculateStats}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer lowercase"
          >
            <Play size={14} /> calculer x̄ & σx
          </button>

          {statResult && (
            <div className="mt-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 space-y-3">
              {statResult.error ? (
                <p className="text-xs text-rose-500 lowercase">{statResult.error}</p>
              ) : (
                <div className="space-y-3 font-mono text-[11px] text-zinc-600 dark:text-zinc-300">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 border border-zinc-200 dark:border-zinc-800 rounded bg-white dark:bg-zinc-950">
                      <div className="text-[10px] text-zinc-400 lowercase">effectif (n)</div>
                      <div className="font-bold text-zinc-800 dark:text-zinc-100">{statResult.n}</div>
                    </div>
                    <div className="p-2 border border-zinc-200 dark:border-zinc-800 rounded bg-white dark:bg-zinc-950">
                      <div className="text-[10px] text-zinc-400 lowercase">moyenne (x̄)</div>
                      <div className="font-bold text-zinc-800 dark:text-zinc-100">{statResult.mean.toFixed(3)}</div>
                    </div>
                    <div className="p-2 border border-zinc-200 dark:border-zinc-800 rounded bg-white dark:bg-zinc-950">
                      <div className="text-[10px] text-zinc-400 lowercase">écart-type (σ)</div>
                      <div className="font-bold text-zinc-800 dark:text-zinc-100">{statResult.stdDev.toFixed(3)}</div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 text-[10px] text-zinc-400 whitespace-pre-line lowercase">
                    {statResult.explanation}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Content ECO */}
      {activeTab === 'eco' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-zinc-400 mb-1 lowercase">valeur de départ (vd)</label>
              <input
                type="number"
                value={valStart}
                onChange={e => setValStart(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-transparent dark:text-zinc-100"
              />
            </div>
            <div>
              <label className="block text-[10px] text-zinc-400 mb-1 lowercase">valeur d'arrivée (va)</label>
              <input
                type="number"
                value={valEnd}
                onChange={e => setValEnd(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-transparent dark:text-zinc-100"
              />
            </div>
          </div>

          <button
            onClick={calculateGrowth}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer lowercase"
          >
            <Play size={14} /> calculer le taux d'évolution
          </button>

          {ecoResult && (
            <div className="mt-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 space-y-3">
              {ecoResult.error ? (
                <p className="text-xs text-rose-500 lowercase">{ecoResult.error}</p>
              ) : (
                <div className="space-y-3 font-mono text-[11px] text-zinc-600 dark:text-zinc-300">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-2 border border-zinc-200 dark:border-zinc-800 rounded bg-white dark:bg-zinc-950">
                      <div className="text-[10px] text-zinc-400 lowercase">taux (tc)</div>
                      <div className="font-bold text-emerald-600 dark:text-emerald-400">{ecoResult.tc.toFixed(3)} %</div>
                    </div>
                    <div className="p-2 border border-zinc-200 dark:border-zinc-800 rounded bg-white dark:bg-zinc-950">
                      <div className="text-[10px] text-zinc-400 lowercase">coëff (cm)</div>
                      <div className="font-bold text-zinc-800 dark:text-zinc-100">x {ecoResult.cm.toFixed(3)}</div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 text-[10px] text-zinc-400 whitespace-pre-line lowercase">
                    {ecoResult.explanation}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
