import React, { useState } from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Droplet, Flame, Beef, Utensils, ShoppingBag, Scale, BarChart2, Check } from 'lucide-react';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const mealData = [
  { id: 1, name: 'Breakfast', protein: 32, calories: 530, completed: true, icon: '🌅' },
  { id: 2, name: 'Lunch', protein: 28, calories: 585, completed: true, icon: '🎒' },
  { id: 3, name: 'Evening Snack', protein: 15, calories: 520, completed: false, icon: '🏠' },
  { id: 4, name: 'Pre-Gym', protein: 37, calories: 350, completed: false, icon: '⚡' },
  { id: 5, name: 'Dinner', protein: 36, calories: 545, completed: false, icon: '🌙' },
];

export default function BulkTrackerDashboard() {
  const [activeDay, setActiveDay] = useState(2); // Wednesday
  const [meals, setMeals] = useState(mealData);
  const [activeTab, setActiveTab] = useState('food');

  const toggleMeal = (id) => {
    setMeals(meals.map(m => m.id === id ? { ...m, completed: !m.completed } : m));
  };

  const caloriesGoal = 3000;
  const caloriesEaten = meals.filter(m => m.completed).reduce((acc, m) => acc + m.calories, 0);
  const proteinGoal = 150;
  const proteinEaten = meals.filter(m => m.completed).reduce((acc, m) => acc + m.protein, 0);
  const mealsCompletedCount = meals.filter(m => m.completed).length;

  const chartData = [
    { name: 'Calories', value: caloriesEaten, fill: '#00F0FF' } // Electric Cyan
  ];

  return (
    <div className="min-h-screen bg-[#09090B] text-white font-sans selection:bg-cyan-500/30 flex justify-center">
      <div className="w-full max-w-md bg-[#09090B] relative pb-28 shadow-2xl overflow-hidden">
        
        {/* Header / Hero */}
        <div className="px-6 pt-10 pb-6 rounded-b-[2.5rem] bg-zinc-900/40 backdrop-blur-xl border-b border-white/5 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00F0FF]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          
          <h1 className="text-3xl font-bold tracking-tight mb-1 text-white">Hey Ayush 👋</h1>
          <p className="text-zinc-400 text-sm mb-8">Ready to hit your macros today?</p>
          
          <div className="relative h-64 w-full flex items-center justify-center">
            {/* Recharts Circular Progress Ring */}
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart 
                cx="50%" 
                cy="50%" 
                innerRadius="70%" 
                outerRadius="90%" 
                barSize={16} 
                data={chartData} 
                startAngle={210} 
                endAngle={-30}
              >
                <PolarAngleAxis 
                  type="number" 
                  domain={[0, caloriesGoal]} 
                  angleAxisId={0} 
                  tick={false} 
                />
                <RadialBar 
                  minAngle={15} 
                  background={{ fill: '#27272A' }} // zinc-800
                  clockWise 
                  dataKey="value" 
                  cornerRadius={10}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            
            {/* Inner Text for Ring */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-bold tracking-tighter text-white">
                {caloriesEaten}
              </span>
              <span className="text-xs text-zinc-400 uppercase tracking-widest font-semibold mt-1">/ {caloriesGoal} kcal</span>
              
              <div className="mt-3 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md flex items-center gap-1.5">
                <Beef size={14} className="text-emerald-400" />
                <span className="text-xs font-medium text-emerald-400">{proteinEaten}g / {proteinGoal}g Pro</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="px-6 mt-6 grid grid-cols-2 gap-4">
          <div className="bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-2xl p-4 flex items-center gap-4 relative overflow-hidden shadow-lg">
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl pointer-events-none"></div>
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 border border-emerald-500/30">
              <Check size={20} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{mealsCompletedCount}<span className="text-sm text-zinc-500 font-medium">/{meals.length}</span></p>
              <p className="text-xs text-zinc-400 font-medium mt-0.5">Meals Done</p>
            </div>
          </div>
          
          <div className="bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-2xl p-4 flex items-center gap-4 relative overflow-hidden shadow-lg">
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-[#00F0FF]/10 rounded-full blur-xl pointer-events-none"></div>
            <div className="w-10 h-10 rounded-full bg-[#00F0FF]/20 flex items-center justify-center flex-shrink-0 border border-[#00F0FF]/30">
              <Droplet size={20} className="text-[#00F0FF]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">1.5<span className="text-sm text-zinc-500 font-medium">/3L</span></p>
              <p className="text-xs text-zinc-400 font-medium mt-0.5">Water Track</p>
            </div>
          </div>
        </div>

        {/* Day Selector */}
        <div className="mt-8 px-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Schedule</h2>
            <span className="text-xs text-[#00F0FF] font-medium bg-[#00F0FF]/10 px-2 py-1 rounded-md">This Week</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6">
            {days.map((day, index) => (
              <button
                key={day}
                onClick={() => setActiveDay(index)}
                className={`flex flex-col items-center justify-center min-w-[3.5rem] h-16 rounded-2xl transition-all duration-300 ${
                  activeDay === index 
                    ? 'bg-[#00F0FF] text-black shadow-[0_0_15px_rgba(0,240,255,0.4)] scale-105' 
                    : 'bg-zinc-900/60 border border-white/5 text-zinc-400 hover:bg-zinc-800'
                }`}
              >
                <span className={`text-xs font-medium mb-1 ${activeDay === index ? 'text-black/70' : 'text-zinc-500'}`}>{day}</span>
                <span className={`text-sm font-bold ${activeDay === index ? 'text-black' : 'text-white'}`}>{18 + index}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Meal List */}
        <div className="mt-4 px-6 space-y-4">
          <h2 className="text-lg font-semibold text-white mb-2">Today's Meals</h2>
          {meals.map((meal) => (
            <div 
              key={meal.id} 
              className={`flex items-center p-4 rounded-2xl transition-all duration-300 backdrop-blur-md border ${
                meal.completed 
                  ? 'bg-zinc-900/30 border-emerald-500/20 opacity-80' 
                  : 'bg-zinc-900/70 border-white/5 shadow-xl'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-2xl shadow-inner border border-white/5 flex-shrink-0">
                {meal.icon}
              </div>
              
              <div className="ml-4 flex-1">
                <h3 className={`text-base font-semibold ${meal.completed ? 'text-white/70 line-through decoration-white/30' : 'text-white'}`}>{meal.name}</h3>
                <div className="flex gap-3 mt-1.5">
                  <div className="flex items-center gap-1 text-xs font-medium text-emerald-400/90">
                    <Beef size={12} />
                    {meal.protein}g
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-[#00F0FF]/90">
                    <Flame size={12} />
                    {meal.calories}
                  </div>
                </div>
              </div>

              {/* Custom Toggle Switch */}
              <button 
                onClick={() => toggleMeal(meal.id)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 focus:ring-offset-2 focus:ring-offset-[#09090B] ${
                  meal.completed ? 'bg-emerald-500' : 'bg-zinc-700'
                }`}
              >
                <span 
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                    meal.completed ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Sticky Bottom Navigation */}
        <div className="fixed bottom-0 left-0 w-full flex justify-center pb-6 px-6 pointer-events-none z-50">
          <div className="w-full max-w-md bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-2 rounded-3xl flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.5)] pointer-events-auto">
            <NavIcon icon={<Utensils size={22} />} label="Food" active={activeTab === 'food'} onClick={() => setActiveTab('food')} />
            <NavIcon icon={<Droplet size={22} />} label="Water" active={activeTab === 'water'} onClick={() => setActiveTab('water')} />
            <NavIcon icon={<ShoppingBag size={22} />} label="Shop" active={activeTab === 'shop'} onClick={() => setActiveTab('shop')} />
            <NavIcon icon={<Scale size={22} />} label="Weight" active={activeTab === 'weight'} onClick={() => setActiveTab('weight')} />
            <NavIcon icon={<BarChart2 size={22} />} label="Stats" active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} />
          </div>
        </div>

      </div>
      
      {/* Global styles to hide scrollbar while keeping functionality */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />
    </div>
  );
}

function NavIcon({ icon, label, active = false, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${
        active ? 'bg-[#00F0FF]/10 text-[#00F0FF]' : 'text-zinc-500 hover:text-white hover:bg-white/5'
      }`}
    >
      <div className={`mb-1 transition-transform duration-300 ${active ? 'scale-110' : ''}`}>
        {icon}
      </div>
      <span className={`text-[10px] font-semibold tracking-wide ${active ? 'text-[#00F0FF]' : 'text-transparent'}`}>
        {active ? label : ''}
      </span>
    </button>
  );
}
