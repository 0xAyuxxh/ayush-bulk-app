const fs = require('fs');

let content = fs.readFileSync("C:/Users/ASUS/.gemini/antigravity/scratch/ayush-bulk-app/src/BulkApp.jsx", "utf-8");

// 1. Imports
content = content.replace(
    'import { useState, useEffect, useRef } from "react";',
    'import { useState, useEffect, useRef } from "react";\nimport { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";\nimport { Droplet, Flame, Beef, Utensils, ShoppingBag, Scale, BarChart2, Check } from "lucide-react";'
);

// 2. Macros
const macros_orig = `  const eatenP = dayPlan.reduce((s, m, i) => s + (dayChecked[i] ? m.protein : 0), 0);
  const eatenC = dayPlan.reduce((s, m, i) => s + (dayChecked[i] ? m.cal : 0), 0);`;
const macros_new = macros_orig + `
  const totalCarbs = dayPlan.reduce((s, m) => s + (m.carbs || 0), 0);
  const totalFats = dayPlan.reduce((s, m) => s + (m.fats || 0), 0);
  const eatenCarbs = dayPlan.reduce((s, m, i) => s + (dayChecked[i] ? (m.carbs || 0) : 0), 0);
  const eatenFats = dayPlan.reduce((s, m, i) => s + (dayChecked[i] ? (m.fats || 0) : 0), 0);`;
content = content.replace(macros_orig, macros_new);

// 3. HomePage
const hpStart = content.indexOf("  // ── HOME PAGE");
const hpEnd = content.indexOf("  // ── MODALS ──");
const homepage_orig = content.substring(hpStart, hpEnd);

const homepage_new = `  // ── HOME PAGE ────────────────────────────────────────────────────────────
  const HomePage = () => {
    const maxMacros = Math.max(totalFats, totalCarbs, totalP, 1);
    const chartData = [
      { name: 'Fats', value: eatenFats || 0, fill: '#FF2A7A' },
      { name: 'Carbs', value: eatenCarbs || 0, fill: '#4BFF75' },
      { name: 'Protein', value: eatenP, fill: '#00F0FF' }
    ];

    return (
      <div className="pb-32 px-5 pt-8 bg-[#11111A] min-h-screen text-white font-sans selection:bg-cyan-500/30">
        
        {/* Header */}
        <div className="mb-8">
          <p className="text-zinc-400 text-xs font-bold tracking-widest uppercase mb-1">Bulk Tracker</p>
          <h1 className="text-[28px] font-bold tracking-tight text-white leading-tight">Hey Ayush 👋</h1>
          <p className="text-zinc-500 text-sm mt-0.5">55kg → 65kg</p>
        </div>

        {/* Main Radial Chart Area */}
        <div className="relative w-full flex justify-center items-center mb-6">
          <div className="absolute inset-0 bg-[#00F0FF]/5 rounded-full blur-3xl"></div>
          <div className="relative w-72 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart 
                cx="50%" cy="50%" innerRadius="50%" outerRadius="100%" barSize={12} 
                data={chartData} startAngle={220} endAngle={-40}
              >
                <PolarAngleAxis type="number" domain={[0, maxMacros * 1.2]} angleAxisId={0} tick={false} />
                <RadialBar minAngle={15} background={{ fill: 'rgba(255,255,255,0.05)' }} clockWise dataKey="value" cornerRadius={10} />
              </RadialBarChart>
            </ResponsiveContainer>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none mt-2">
              <span className="text-[#00F0FF] text-[10px] font-bold tracking-widest">Calories</span>
              <span className="text-5xl font-bold tracking-tighter text-white mt-1 mb-1">{eatenC}</span>
              <span className="text-xs text-zinc-400 font-medium">of / {totalC} kcal</span>
              
              <div className="mt-4 px-3 py-1 rounded-full bg-zinc-800/80 border border-white/5 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                <span className="text-[10px] font-bold text-[#FF2A7A]">Protein {eatenP}g</span>
              </div>
              <span className="text-[10px] text-zinc-500 mt-1">{eatenP}g / {totalP}g</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-[#1C1C26] rounded-3xl p-5 border border-white/5 shadow-xl relative overflow-hidden">
            <p className="text-xs text-zinc-400 font-medium mb-1">Meals Done</p>
            <p className="text-3xl font-bold text-white mb-4">{mealsEaten}<span className="text-lg text-zinc-600">/{dayPlan.length}</span></p>
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-zinc-600 rounded-full transition-all duration-500" style={{ width: \`\${(mealsEaten/dayPlan.length)*100}%\` }}></div>
            </div>
          </div>
          
          <div className="bg-[#1C1C26] rounded-3xl p-5 border border-white/5 shadow-xl relative overflow-hidden flex items-center">
            <div className="w-12 h-16 relative flex items-center justify-center mr-3">
               <div className="absolute w-12 h-12 bg-[#00F0FF] rounded-full blur-xl opacity-20"></div>
               <Droplet size={32} className="text-[#00F0FF] drop-shadow-lg" fill="#00F0FF" fillOpacity={0.4} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-xs text-zinc-400 font-medium mb-0.5">Water</p>
              <p className="text-2xl font-bold text-white leading-tight">{todayWater}</p>
              <p className="text-[10px] text-zinc-500 font-medium">0 of 3000ml</p>
            </div>
            <div className="absolute right-4 top-4 bottom-4 w-2 bg-zinc-800 rounded-full overflow-hidden">
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-[#00F0FF] to-[#4BFF75] rounded-full transition-all duration-500" style={{ height: \`\${Math.min((todayWater/3000)*100, 100)}%\` }}></div>
            </div>
          </div>
        </div>

        {/* Day Selector */}
        <div className="mb-8">
          <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase mb-3">TODAY</p>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-5 px-5">
            {dayNames.map((day, index) => {
              const isActive = activeDay === index;
              return (
                <button
                  key={day}
                  onClick={() => setActiveDay(index)}
                  className={\`flex items-center justify-center min-w-[3.8rem] h-11 rounded-[1.25rem] text-sm font-medium transition-all duration-300 \${
                    isActive 
                      ? 'bg-[#1C1C26] text-white border border-[#4BFF75]/50 shadow-[0_0_15px_rgba(75,255,117,0.15)]' 
                      : 'bg-[#1C1C26]/50 text-zinc-500 border border-transparent'
                  }\`}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>

        {/* Meals List */}
        <div className="mb-4">
          <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase mb-4">{fullDayNames[activeDay].toUpperCase()} MEALS</p>
          <div className="space-y-4">
            {dayPlan.map((meal, i) => {
              const done = !!(dayChecked[i]);
              const imgUrl = meal.img || "https://images.unsplash.com/photo-1554520735-0a6b8b6ce8b7?auto=format&fit=crop&w=150&q=80";
              return (
                <div 
                  key={i} 
                  className={\`relative overflow-hidden flex items-center p-3.5 rounded-3xl transition-all duration-500 \${
                    done 
                      ? 'bg-gradient-to-r from-[#4BFF75]/20 to-[#4BFF75]/5 border border-[#4BFF75]/30 shadow-[0_0_20px_rgba(75,255,117,0.1)]' 
                      : 'bg-[#1C1C26] border border-white/5 shadow-lg'
                  }\`}
                >
                  <img src={imgUrl} alt={meal.label} className="w-16 h-16 rounded-2xl object-cover bg-zinc-800 shadow-inner" />
                  
                  <div className="ml-4 flex-1">
                    <div className="flex items-center mb-1">
                      <h3 className={\`text-[15px] font-bold \${done ? 'text-white' : 'text-white'}\`}>{meal.label}</h3>
                      <span className={\`ml-2 text-[10px] font-semibold \${done ? 'text-[#4BFF75]' : 'text-zinc-500'}\`}>
                        {done ? '(COMPLETED)' : '(Pending)'}
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                          <Beef size={10} className="text-red-400" />
                        </div>
                        <div>
                          <p className="text-[9px] text-zinc-500 font-medium">Protein</p>
                          <p className={\`text-xs font-bold \${done ? 'text-[#4BFF75]/80' : 'text-white'}\`}>{meal.protein}g</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                          <Flame size={10} className="text-orange-400" />
                        </div>
                        <div>
                          <p className="text-[9px] text-zinc-500 font-medium">Calories</p>
                          <p className={\`text-xs font-bold \${done ? 'text-[#4BFF75]/80' : 'text-white'}\`}>{meal.cal}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ml-2 pr-2">
                    {done ? (
                      <div onClick={() => toggleMeal(i)} className="w-8 h-8 rounded-full bg-[#4BFF75] flex items-center justify-center shadow-[0_0_15px_rgba(75,255,117,0.4)] cursor-pointer hover:scale-105 transition-transform">
                        <Check size={18} className="text-black" strokeWidth={3} />
                      </div>
                    ) : (
                      <button 
                        onClick={() => toggleMeal(i)}
                        className="relative inline-flex h-[26px] w-[44px] items-center rounded-full bg-zinc-700/50 border border-white/5 transition-colors duration-300 focus:outline-none"
                      >
                        <span className="inline-block h-5 w-5 transform rounded-full bg-zinc-400 translate-x-1 transition-transform duration-300 shadow-md" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
`;
content = content.replace(homepage_orig, homepage_new);

// 4. Nav
const navStart = content.indexOf("      {/* Floating Bottom Nav */}");
const navEnd = content.indexOf("    </div>\n  );\n}\n") + "    </div>\n  );\n}\n".length;
const nav_orig = content.substring(navStart, navEnd);

const nav_new = `      {/* Floating Bottom Nav matched to the image */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-[#1C1C26]/95 backdrop-blur-2xl border-t border-white/5 pt-3 pb-8 px-6 rounded-t-[2.5rem] flex justify-between items-center z-50 shadow-[0_-20px_40px_rgba(0,0,0,0.3)]">
        {[
          { key: "home", icon: <Utensils size={24} />, label: "Food" },
          { key: "water", icon: <Droplet size={24} />, label: "Water" },
          { key: "shopping", icon: <ShoppingBag size={24} />, label: "Shop" },
          { key: "weight", icon: <Scale size={24} />, label: "Weight" },
          { key: "summary", icon: <BarChart2 size={24} />, label: "Analytics" },
        ].map(n => {
          const active = page === n.key;
          return (
            <button key={n.key} onClick={() => setPage(n.key)} className="relative flex flex-col items-center justify-center w-14 transition-all duration-300">
              {active && <div className="absolute inset-0 bg-white/10 rounded-2xl -m-2 scale-110 transition-all duration-300 pointer-events-none"></div>}
              <div className={\`mb-1 z-10 transition-colors duration-300 \${active ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-zinc-500'}\`}>
                {n.icon}
              </div>
              <span className={\`text-[9px] font-medium z-10 tracking-wide transition-colors duration-300 \${active ? 'text-white' : 'text-zinc-500'}\`}>
                {n.label}
              </span>
            </button>
          )
        })}
      </div>
      <style dangerouslySetInnerHTML={{__html: \`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        body { background: #000; }
      \`}} />
    </div>
  );
}
`;
content = content.replace(nav_orig, nav_new);

fs.writeFileSync("C:/Users/ASUS/.gemini/antigravity/scratch/ayush-bulk-app/src/BulkApp.jsx", content);
