import { useState, useEffect, useRef } from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { Droplet, Flame, Beef, Utensils, ShoppingBag, Scale, BarChart2, Check } from "lucide-react";

const C = {
  bg: "#0D0D1A", bg2: "#12122A", bg3: "#1A1A3A", card: "#181830",
  border: "rgba(99,115,255,0.18)", accent: "#3D4EFF", accent2: "#2233CC",
  blue1: "#3347FF", blue2: "#1A2A9A", blue3: "#111E6E", blue4: "#080F2E",
  text: "#E8E8FF", muted: "#7A80C0", soft: "#B0B8FF",
  green: "#4FFFB0", red: "#FF5B7F", yellow: "#FFD166", purple: "#A78BFA",
};

const noEggDays = [1, 5];
const weekendDays = [5, 6];

const defaultPlan = [
  // Monday
  [
    { label: "Breakfast", time: "8:00 AM", emoji: "🌅", items: ["Oats 60g + Milk 250ml", "1 tsp Jaggery", "5 Almonds + 5 Cashews", "1 tsp Flax seeds", "1 Banana"], protein: 23, cal: 460, carbs: 68, fats: 12 },
    { label: "Lunch", time: "12:20 PM", emoji: "🎒", items: ["Rajma sabzi (½ cup)", "3 Rotis", "1 Banana", "Dahi 100g"], protein: 28, cal: 580, carbs: 90, fats: 8 },
    { label: "Evening", time: "4:00 PM", emoji: "🏠", items: ["Rice 1 cup", "Moong dal ¾ cup", "1 tsp Ghee", "1 tsp Jaggery in dal", "1 Banana"], protein: 15, cal: 490, carbs: 86, fats: 7 },
    { label: "Pre-Gym", time: "6:30 PM", emoji: "⚡", items: ["Soya chunks 60g dry", "PB 1.5 tbsp", "Pumpkin Seeds 10g", "1 tsp Flax seeds"], protein: 40, cal: 370, carbs: 24, fats: 16 },
    { label: "Dinner", time: "10:00 PM", emoji: "🌙", items: ["3 Boiled Eggs", "2 Rotis", "Paneer 80g", "Milk 200ml + pinch Jaggery"], protein: 42, cal: 565, carbs: 45, fats: 22 },
  ],
  // Tuesday
  [
    { label: "Breakfast", time: "8:00 AM", emoji: "🌅", items: ["Oats 60g + Milk 300ml", "1 tsp Jaggery", "5 Cashews + 5 Almonds", "1 tsp Flax seeds", "1 Banana"], protein: 25, cal: 510, carbs: 72, fats: 12 },
    { label: "Lunch", time: "12:20 PM", emoji: "🎒", items: ["Paneer sabzi (80g)", "3 Rotis", "1 Banana", "Shrikhand 100g"], protein: 30, cal: 600, carbs: 88, fats: 14 },
    { label: "Evening", time: "4:00 PM", emoji: "🏠", items: ["Rice 1 cup", "Chole ¾ cup", "1 tsp Ghee", "1 Banana"], protein: 16, cal: 500, carbs: 86, fats: 7 },
    { label: "Pre-Gym", time: "6:30 PM", emoji: "⚡", items: ["Soya chunks 80g dry", "Cheese 25g", "3 Dates", "1 tsp Flax seeds"], protein: 50, cal: 440, carbs: 30, fats: 15 },
    { label: "Dinner", time: "10:00 PM", emoji: "🌙", items: ["Chana sabzi 1 cup", "2 Rotis", "Milk 250ml + pinch Jaggery"], protein: 28, cal: 520, carbs: 70, fats: 10 },
  ],
  // Wednesday
  [
    { label: "Breakfast", time: "8:00 AM", emoji: "🌅", items: ["3 Scrambled Eggs", "Milk 200ml", "PB 1.5 tbsp on roti", "1 tsp Jaggery", "3 Dates", "1 tsp Flax seeds"], protein: 32, cal: 530, carbs: 55, fats: 20 },
    { label: "Lunch", time: "12:20 PM", emoji: "🎒", items: ["Chole sabzi (¾ cup)", "3 Rotis", "1 Banana", "Dahi 100g"], protein: 28, cal: 585, carbs: 90, fats: 8 },
    { label: "Evening", time: "4:00 PM", emoji: "🏠", items: ["Rice 1 cup", "Toor dal ¾ cup", "1 tsp Ghee", "Sweet potato ½", "1 tsp Jaggery in dal"], protein: 15, cal: 520, carbs: 92, fats: 7 },
    { label: "Pre-Gym", time: "6:30 PM", emoji: "⚡", items: ["Soya chunks 60g dry", "Pumpkin Seeds 15g", "Cashews 15g", "1 tsp Flax seeds"], protein: 37, cal: 350, carbs: 20, fats: 17 },
    { label: "Dinner", time: "10:00 PM", emoji: "🌙", items: ["Rajma 1 cup", "2 Rotis", "Paneer 60g", "Milk 200ml + pinch Jaggery"], protein: 36, cal: 545, carbs: 70, fats: 14 },
  ],
  // Thursday
  [
    { label: "Breakfast", time: "8:00 AM", emoji: "🌅", items: ["Oats 60g + Milk 250ml", "PB 1.5 tbsp", "1 tsp Jaggery", "1 tsp Flax seeds", "1 Banana"], protein: 25, cal: 505, carbs: 68, fats: 15 },
    { label: "Lunch", time: "12:20 PM", emoji: "🎒", items: ["Rajma sabzi (½ cup)", "3 Rotis", "1 Banana", "Shrikhand 100g"], protein: 28, cal: 610, carbs: 95, fats: 10 },
    { label: "Evening", time: "4:00 PM", emoji: "🏠", items: ["Rice 1 cup", "Moong dal ¾ cup", "1 tsp Ghee", "1 Banana"], protein: 15, cal: 490, carbs: 86, fats: 7 },
    { label: "Pre-Gym", time: "6:30 PM", emoji: "⚡", items: ["3 Boiled Eggs", "Soya chunks 50g dry", "Almonds 15g", "1 tsp Flax seeds"], protein: 43, cal: 415, carbs: 18, fats: 21 },
    { label: "Dinner", time: "10:00 PM", emoji: "🌙", items: ["Greek Yogurt 100g", "Chole 1 cup", "2 Rotis", "Milk 200ml + pinch Jaggery"], protein: 37, cal: 570, carbs: 74, fats: 11 },
  ],
  // Friday (no eggs)
  [
    { label: "Breakfast", time: "8:00 AM", emoji: "🌅", items: ["Oats 60g + Milk 250ml", "PB 1.5 tbsp", "1 tsp Jaggery", "1 tsp Flax seeds"], protein: 25, cal: 480, carbs: 60, fats: 15 },
    { label: "Lunch", time: "12:20 PM", emoji: "🎒", items: ["Paneer sabzi (100g)", "3 Rotis", "1 Banana", "Dahi 100g"], protein: 32, cal: 600, carbs: 88, fats: 16 },
    { label: "Evening", time: "4:00 PM", emoji: "🏠", items: ["Rice 1 cup", "Toor dal ¾ cup", "1 tsp Ghee", "Sweet potato ½"], protein: 15, cal: 510, carbs: 90, fats: 7 },
    { label: "Pre-Gym", time: "6:30 PM", emoji: "⚡", items: ["Soya chunks 80g dry", "PB 1.5 tbsp", "1 Banana", "1 tsp Flax seeds"], protein: 49, cal: 450, carbs: 38, fats: 16 },
    { label: "Dinner", time: "10:00 PM", emoji: "🌙", items: ["Rajma 1 cup", "2 Rotis", "Milk 250ml + pinch Jaggery"], protein: 28, cal: 505, carbs: 72, fats: 10 },
  ],
  // Saturday (weekend, no eggs)
  [
    { label: "Brunch", time: "11:30 AM", emoji: "🌅", items: ["Oats 60g + Milk 350ml", "PB 1.5 tbsp", "1 tsp Jaggery", "1 Banana", "3 Dates", "1 tsp Flax seeds"], protein: 28, cal: 620, carbs: 94, fats: 15 },
    { label: "Lunch", time: "2:30 PM", emoji: "🍽️", items: ["Moong dal sabzi (¾ cup)", "3 Rotis", "1 Banana", "Dahi 100g"], protein: 26, cal: 570, carbs: 88, fats: 8 },
    { label: "Evening", time: "5:00 PM", emoji: "🏠", items: ["Rice 1 cup", "Moong dal ¾ cup", "1 tsp Ghee", "1 Banana"], protein: 15, cal: 490, carbs: 86, fats: 7 },
    { label: "Pre-Gym", time: "7:00 PM", emoji: "⚡", items: ["Soya chunks 80g dry", "Cashews 20g", "Pumpkin Seeds 15g", "1 tsp Flax seeds"], protein: 49, cal: 415, carbs: 22, fats: 19 },
    { label: "Dinner", time: "10:00 PM", emoji: "🌙", items: ["Rajma 1 cup", "Paneer 80g", "2 Rotis", "Milk 250ml + pinch Jaggery"], protein: 37, cal: 570, carbs: 72, fats: 14 },
  ],
  // Sunday (weekend)
  [
    { label: "Brunch", time: "11:30 AM", emoji: "🌅", items: ["2 Scrambled Eggs", "Oats 60g + Milk 200ml", "PB 1.5 tbsp", "1 tsp Jaggery", "3 Dates", "1 tsp Flax seeds"], protein: 30, cal: 560, carbs: 62, fats: 20 },
    { label: "Lunch", time: "2:30 PM", emoji: "🍽️", items: ["Paneer sabzi (100g)", "3 Rotis", "1 Banana", "Shrikhand 100g"], protein: 32, cal: 610, carbs: 88, fats: 16 },
    { label: "Evening", time: "5:00 PM", emoji: "🏠", items: ["Rice 1 cup", "Chole ¾ cup", "1 tsp Ghee", "Sweet potato ½", "2 Boiled Eggs"], protein: 28, cal: 600, carbs: 88, fats: 14 },
    { label: "Pre-Gym", time: "7:00 PM", emoji: "⚡", items: ["Soya chunks 60g dry", "Cheese 25g on roti", "Almonds 15g", "1 tsp Flax seeds"], protein: 41, cal: 400, carbs: 28, fats: 19 },
    { label: "Dinner", time: "10:00 PM", emoji: "🌙", items: ["Greek Yogurt 100g", "Chana 1 cup", "2 Rotis", "Milk 200ml + pinch Jaggery"], protein: 34, cal: 545, carbs: 70, fats: 11 },
  ],
];

// Swap pool — alternatives for each meal slot
const swapPool = {
  Breakfast: [
    { label: "Poha + Milk", items: ["Poha 80g", "Milk 250ml", "1 Banana"], protein: 16, cal: 430, carbs: 75, fats: 8, emoji: "🌅" },
    { label: "Besan Chilla", items: ["Besan chilla x2", "Dahi 100g", "1 Banana"], protein: 22, cal: 460, carbs: 58, fats: 10, emoji: "🥞" },
    { label: "Bread PB Banana", items: ["Whole wheat bread x3", "PB 2 tbsp", "1 Banana", "Milk 200ml"], protein: 20, cal: 510, carbs: 72, fats: 16, emoji: "🍞" },
  ],
  Brunch: [
    { label: "Paneer Paratha", items: ["Paneer paratha x2", "Dahi 150g", "1 Banana"], protein: 28, cal: 620, carbs: 80, fats: 18, emoji: "🫓" },
    { label: "Egg Rice Bowl", items: ["3 Boiled Eggs", "Rice 1 cup", "Dahi 100g", "3 Dates"], protein: 34, cal: 600, carbs: 78, fats: 16, emoji: "🍚" },
  ],
  Lunch: [
    { label: "Dal Chawal", items: ["Dal ¾ cup", "Rice 1.5 cup", "1 tsp Ghee", "Dahi 100g"], protein: 24, cal: 560, carbs: 92, fats: 8, emoji: "🍛" },
    { label: "Chole Roti", items: ["Chole 1 cup", "3 Rotis", "1 Banana"], protein: 26, cal: 570, carbs: 88, fats: 9, emoji: "🫘" },
    { label: "Paneer Rice", items: ["Paneer 100g", "Rice 1 cup", "Dahi 100g", "1 Banana"], protein: 30, cal: 590, carbs: 82, fats: 14, emoji: "🧀" },
  ],
  Evening: [
    { label: "Makhana + Dal", items: ["Makhana 30g", "Dal 1 cup", "Rice ¾ cup", "1 Banana"], protein: 16, cal: 470, carbs: 80, fats: 5, emoji: "🏠" },
    { label: "Upma + Milk", items: ["Upma 1 cup", "Milk 250ml", "5 Almonds"], protein: 14, cal: 460, carbs: 72, fats: 10, emoji: "🥣" },
  ],
  "Pre-Gym": [
    { label: "Banana + PB Shake", items: ["2 Bananas", "PB 2 tbsp", "Milk 250ml"], protein: 18, cal: 420, carbs: 60, fats: 14, emoji: "⚡" },
    { label: "Soya + Curd", items: ["Soya chunks 60g dry", "Dahi 150g", "Dates 3"], protein: 40, cal: 380, carbs: 32, fats: 8, emoji: "💪" },
    { label: "Eggs + Bread", items: ["3 Boiled Eggs", "Whole wheat bread x2", "Milk 200ml"], protein: 36, cal: 400, carbs: 42, fats: 16, emoji: "🥚" },
  ],
  Dinner: [
    { label: "Dal Paneer Roti", items: ["Dal ½ cup", "Paneer 80g", "2 Rotis", "Milk 200ml"], protein: 36, cal: 530, carbs: 58, fats: 16, emoji: "🌙" },
    { label: "Egg Curry + Rice", items: ["3 Boiled Eggs", "Rice 1 cup", "Milk 250ml"], protein: 34, cal: 520, carbs: 62, fats: 18, emoji: "🍳" },
    { label: "Chole + Milk", items: ["Chole 1 cup", "2 Rotis", "Greek Yogurt 100g", "Milk 200ml"], protein: 32, cal: 540, carbs: 74, fats: 10, emoji: "🫘" },
  ],
};

const skipAlts = [
  { name: "Protein bar", cal: 200, protein: 20, icon: "🍫" },
  { name: "Protein shake (milk)", cal: 180, protein: 22, icon: "🥛" },
  { name: "Handful nuts + dates", cal: 160, protein: 5, icon: "🥜" },
  { name: "Greek yogurt + banana", cal: 200, protein: 14, icon: "🍌" },
  { name: "Boiled eggs (2)", cal: 140, protein: 12, icon: "🥚" },
  { name: "Paneer cubes 100g", cal: 265, protein: 18, icon: "🧀" },
];

const dayNames = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const fullDayNames = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

const initialWeights = [
  { date: "Week 1", weight: 55 },
  { date: "Week 2", weight: 55.3 },
  { date: "Week 3", weight: 55.8 },
  { date: "Week 4", weight: 56.2 },
];

function useStorage(key, init) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; }
    catch { return init; }
  });
  const set = (v) => {
    const next = typeof v === "function" ? v(val) : v;
    setVal(next);
    try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
  };
  return [val, set];
}

// ── CONFETTI ────────────────────────────────────────────────────────────────
function Confetti({ active }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const pieces = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      r: Math.random() * 7 + 3,
      d: Math.random() * 2 + 1,
      color: ["#3D4EFF","#4FFFB0","#FFD166","#A78BFA","#FF5B7F","#5BE0FF"][Math.floor(Math.random()*6)],
      tilt: Math.random() * 10 - 5,
      tiltSpeed: Math.random() * 0.1 + 0.05,
    }));
    let frame;
    let elapsed = 0;
    const animate = () => {
      elapsed++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.r, p.r * 0.4, p.tilt, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.fill();
        p.y += p.d * 3;
        p.tilt += p.tiltSpeed;
        p.x += Math.sin(elapsed * 0.02 + p.tilt) * 1.5;
        if (p.y > canvas.height) { p.y = -10; p.x = Math.random() * canvas.width; }
      });
      if (elapsed < 180) frame = requestAnimationFrame(animate);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [active]);
  if (!active) return null;
  return <canvas ref={canvasRef} style={{ position:"fixed", inset:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:200 }} />;
}

// ── MAIN APP ────────────────────────────────────────────────────────────────
export default function BulkApp() {
  const [page, setPage] = useState("home");
  const [activeDay, setActiveDay] = useStorage("activeDay", new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
  const [checked, setChecked] = useStorage("checked", {});
  const [water, setWater] = useStorage("water", {});
  const [weights, setWeights] = useStorage("weights", initialWeights);
  const [newWeight, setNewWeight] = useState("");
  const [customPlan, setCustomPlan] = useStorage("customPlan", defaultPlan);
  const [expandedMeal, setExpandedMeal] = useState(null);
  const [skipModal, setSkipModal] = useState(null);
  const [swapModal, setSwapModal] = useState(null);
  const [editModal, setEditModal] = useState(null); // {dayIdx, mealIdx}
  const [editDraft, setEditDraft] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const prevAllDone = useRef(false);

  const todayKey = `${activeDay}`;
  const dayChecked = checked[todayKey] || {};
  const todayWater = water[todayKey] || 0;
  const dayPlan = customPlan[activeDay];
  const totalP = dayPlan.reduce((s, m) => s + m.protein, 0);
  const totalC = dayPlan.reduce((s, m) => s + m.cal, 0);
  const eatenP = dayPlan.reduce((s, m, i) => s + (dayChecked[i] ? m.protein : 0), 0);
  const eatenC = dayPlan.reduce((s, m, i) => s + (dayChecked[i] ? m.cal : 0), 0);
  const totalCarbs = dayPlan.reduce((s, m) => s + (m.carbs || 0), 0);
  const totalFats = dayPlan.reduce((s, m) => s + (m.fats || 0), 0);
  const eatenCarbs = dayPlan.reduce((s, m, i) => s + (dayChecked[i] ? (m.carbs || 0) : 0), 0);
  const eatenFats = dayPlan.reduce((s, m, i) => s + (dayChecked[i] ? (m.fats || 0) : 0), 0);
  const mealsEaten = Object.values(dayChecked).filter(Boolean).length;
  const allDone = mealsEaten === dayPlan.length;

  // Streak: count consecutive days (0-indexed Mon–Sun) with all meals checked
  const streak = (() => {
    let count = 0;
    let d = activeDay;
    for (let i = 0; i < 7; i++) {
      const k = `${d}`;
      const dc = checked[k] || {};
      const done = Object.values(dc).filter(Boolean).length;
      if (done === customPlan[d].length && done > 0) { count++; d = (d + 6) % 7; }
      else break;
    }
    return count;
  })();

  // Confetti trigger
  useEffect(() => {
    if (allDone && !prevAllDone.current) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3500);
    }
    prevAllDone.current = allDone;
  }, [allDone]);

  const waterPct = Math.round((todayWater / 3000) * 100);
  const isWeekend = weekendDays.includes(activeDay);
  const isNoEgg = noEggDays.includes(activeDay);

  const daysWithData = Math.max(1, Object.keys(checked).filter(k => Object.values(checked[k]).some(v => v)).length);
  const weeklyAvgP = Math.round(customPlan.reduce((s,d,i) => s + d.reduce((ss,m,idx) => ss + ((checked[`${i}`]||{})[idx] ? m.protein : 0), 0), 0) / daysWithData);
  const weeklyAvgC = Math.round(customPlan.reduce((s,d,i) => s + d.reduce((ss,m,idx) => ss + ((checked[`${i}`]||{})[idx] ? m.cal : 0), 0), 0) / daysWithData);

  const chartH = 100; const chartW = 280;

  const toggleMeal = (i) => {
    setChecked(prev => ({
      ...prev,
      [todayKey]: { ...(prev[todayKey]||{}), [i]: !((prev[todayKey]||{})[i]) }
    }));
  };
  const addWater = (amt) => setWater(prev => ({ ...prev, [todayKey]: Math.min((prev[todayKey]||0)+amt,4000) }));
  const addWeight = () => {
    if (!newWeight) return;
    const w = parseFloat(newWeight);
    if (isNaN(w)) return;
    setWeights(prev => [...prev, { date: `Week ${prev.length+1}`, weight: w }]);
    setNewWeight("");
  };

  const applySwap = (dayIdx, mealIdx, swap) => {
    setCustomPlan(prev => {
      const next = prev.map(d => d.map(m => ({...m, items:[...m.items]})));
      const orig = next[dayIdx][mealIdx];
      next[dayIdx][mealIdx] = { ...orig, items: swap.items, protein: swap.protein, cal: swap.cal, carbs: swap.carbs, fats: swap.fats };
      return next;
    });
    setSwapModal(null);
  };

  const openEdit = (dayIdx, mealIdx) => {
    const m = customPlan[dayIdx][mealIdx];
    setEditDraft({ items: [...m.items], protein: m.protein, cal: m.cal });
    setEditModal({ dayIdx, mealIdx });
  };

  const saveEdit = () => {
    const { dayIdx, mealIdx } = editModal;
    setCustomPlan(prev => {
      const next = prev.map(d => d.map(m => ({...m, items:[...m.items]})));
      next[dayIdx][mealIdx] = { ...next[dayIdx][mealIdx], ...editDraft };
      return next;
    });
    setEditModal(null);
  };

  // ── UI helpers ──
  const card = (children, extra={}) => (
    <div className="glass-card" style={{ padding:"16px", marginBottom:"12px", ...extra }}>{children}</div>
  );
  const lbl = (text) => (
    <div className="text-xs font-mono tracking-wide text-muted" style={{ marginBottom:"8px", textTransform:"uppercase" }}>{text}</div>
  );

  // ── SHOPPING LIST ────────────────────────────────────────────────────────
  const ShoppingPage = () => {
    const raw = {};
    customPlan.forEach(day => day.forEach(meal => meal.items.forEach(item => {
      const key = item.toLowerCase().trim();
      raw[key] = (raw[key] || 0) + 1;
    })));
    const grouped = {
      "🥛 Dairy & Eggs": [], "🌾 Grains & Legumes": [], "🥦 Produce": [], "🥜 Nuts & Seeds": [], "🫙 Others": []
    };
    const rules = [
      { keys: ["milk","dahi","paneer","yogurt","cheese","shrikhand","ghee","egg"], cat: "🥛 Dairy & Eggs" },
      { keys: ["oats","rice","roti","rajma","dal","chana","chole","soya","bread","poha","besan","upma"], cat: "🌾 Grains & Legumes" },
      { keys: ["banana","dates","sweet potato","makhana"], cat: "🥦 Produce" },
      { keys: ["almond","cashew","pumpkin","peanut","pb","nuts"], cat: "🥜 Nuts & Seeds" },
    ];
    Object.entries(raw).forEach(([item]) => {
      let placed = false;
      for (const r of rules) {
        if (r.keys.some(k => item.includes(k))) { grouped[r.cat].push(item); placed = true; break; }
      }
      if (!placed) grouped["🫙 Others"].push(item);
    });
    const [ticked, setTicked] = useState({});
    return (
      <div className="pb-32 px-5 pt-8 bg-[#11111A] min-h-screen text-white font-sans selection:bg-cyan-500/30">
        <div className="mb-8">
          <p className="text-zinc-500 text-xs font-bold tracking-widest uppercase mb-1">Weekly</p>
          <h1 className="text-[28px] font-bold tracking-tight text-white leading-tight">Shopping List 🛒</h1>
          <p className="text-zinc-400 text-sm mt-0.5">Auto-generated from your 7-day plan</p>
        </div>
        
        {Object.entries(grouped).map(([cat, items]) => items.length === 0 ? null : (
          <div key={cat} className="mb-6">
            <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase mb-3">{cat}</p>
            <div className="bg-[#1C1C26] rounded-3xl p-5 border border-white/5 shadow-xl">
              {[...new Set(items)].map((item, i, arr) => (
                <div key={item} onClick={() => setTicked(p => ({...p,[item]:!p[item]}))}
                  className={`flex items-center gap-3 py-3 cursor-pointer transition-all duration-200 ${i < arr.length - 1 ? 'border-b border-white/5' : ''}`}
                >
                  <div className={`flex items-center justify-center w-6 h-6 rounded-lg border-2 flex-shrink-0 transition-all duration-300 ${ticked[item] ? 'bg-[#4BFF75] border-[#4BFF75] shadow-[0_0_10px_rgba(75,255,117,0.3)]' : 'border-zinc-600 bg-transparent'}`}>
                    {ticked[item] && <Check size={14} className="text-black" strokeWidth={3} />}
                  </div>
                  <span className={`text-[15px] font-medium capitalize transition-all duration-200 ${ticked[item] ? 'text-zinc-500 line-through' : 'text-white'}`}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <button onClick={() => setTicked({})} className="w-full py-4 mt-2 rounded-2xl bg-[#1C1C26] text-zinc-400 font-medium border border-white/5 shadow-lg active:scale-95 transition-all duration-200">
          Clear all ticks
        </button>
      </div>
    );
  };

  // ── WEIGHT PAGE ──────────────────────────────────────────────────────────
  const WeightPage = () => {
    const latest = weights.length > 0 ? weights[weights.length-1].weight : 55;
    const startWeight = weights.length > 0 ? weights[0].weight : 55;
    const gain = (latest - startWeight).toFixed(1);
    // projection: weekly rate
    const rate = weights.length >= 2
      ? (latest - startWeight) / (weights.length - 1)
      : 0.3;
    const targetWeight = 65;
    const weeksLeft = rate > 0 ? Math.ceil((targetWeight - latest) / rate) : null;
    const projPoints = rate > 0 && weights.length > 0 ? Array.from({length:6},(_,i)=>({
      date:`W+${i+1}`, weight: parseFloat((latest + rate*(i+1)).toFixed(1))
    })) : [];
    const allPoints = [...weights, ...projPoints];
    const allW = allPoints.map(w=>w.weight);
    const pMax = allW.length > 0 ? Math.max(...allW) + 0.5 : 60;
    const pMin = allW.length > 0 ? Math.min(...allW) - 0.5 : 50;
    const range = pMax - pMin || 1;
    const totalPts = allPoints.length;
    const pts = allPoints.map((w,i)=>({
      x: Math.round(20 + (i / Math.max(totalPts-1,1)) * (chartW-40)),
      y: Math.round(chartH-10 - ((w.weight-pMin)/range)*(chartH-20)),
    }));
    const realCount = weights.length;
    const realPath = realCount > 1 ? pts.slice(0,realCount).map((p,i)=>`${i===0?"M":"L"} ${p.x} ${p.y}`).join(" ") : "";
    const projPath = realCount > 0 ? pts.slice(realCount-1).map((p,i)=>`${i===0?"M":"L"} ${p.x} ${p.y}`).join(" ") : "";

    return (
      <div className="pb-32 px-5 pt-8 bg-[#11111A] min-h-screen text-white font-sans selection:bg-cyan-500/30">
        <div className="mb-8">
          <p className="text-zinc-500 text-xs font-bold tracking-widest uppercase mb-1">Progress</p>
          <h1 className="text-[28px] font-bold tracking-tight text-white leading-tight">Weight Log ⚖️</h1>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            { label:"Start", val:`${startWeight.toFixed(1)} kg`, color:'text-zinc-400' },
            { label:"Current", val:`${latest} kg`, color:'text-[#4BFF75]' },
            { label:"Total gain", val:`${gain >= 0 ? '+' : ''}${gain} kg`, color:gain >= 0 ? 'text-[#00F0FF]' : 'text-red-400' },
            { label:"Weeks logged", val:`${weights.length}`, color:'text-white' },
          ].map((s,i)=>(
            <div key={i} className="bg-[#1C1C26] rounded-3xl p-5 border border-white/5 shadow-xl">
              <div className="text-xs text-zinc-500 font-medium mb-1">{s.label}</div>
              <div className={`text-2xl font-bold ${s.color}`}>{s.val}</div>
            </div>
          ))}
        </div>

        {weeksLeft && (
          <div className="bg-gradient-to-r from-[#00F0FF]/10 to-[#4BFF75]/10 rounded-3xl p-5 mb-6 border border-[#00F0FF]/20 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F0FF]/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
            <div className="text-sm font-bold text-white mb-1">📈 Projection to 65 kg</div>
            <div className="text-[11px] text-zinc-400 font-medium mb-3">At current pace (~{rate.toFixed(2)}kg/week)</div>
            <div className="text-[17px] font-bold text-[#00F0FF] mb-1 drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">You'll hit 65 kg in ~{weeksLeft} weeks</div>
            <div className="text-xs text-[#4BFF75] font-medium">Keep the surplus going 💪</div>
          </div>
        )}

        <div className="bg-[#1C1C26] rounded-3xl p-5 mb-8 border border-white/5 shadow-xl">
          <div className="text-sm font-bold text-white mb-4">Weight chart (kg) <span className="text-[10px] text-zinc-500 font-normal">— dashed = projected</span></div>
          <svg width="100%" viewBox={`0 0 ${chartW+40} ${chartH+20}`} className="drop-shadow-lg overflow-visible">
            {realPath && <path d={realPath} fill="none" stroke="#00F0FF" strokeWidth="3" strokeLinecap="round" style={{ filter:"drop-shadow(0 0 6px rgba(0,240,255,0.5))" }}/>}
            {projPath && <path d={projPath} fill="none" stroke="#FF2A7A" strokeWidth="2" strokeDasharray="5 5" strokeLinecap="round" opacity={0.6}/>}
            {pts.map((p,i)=>(
              <g key={i}>
                <circle cx={p.x} cy={p.y} r={i<realCount?5:3.5} fill={i<realCount?'#00F0FF':'#FF2A7A'} opacity={i<realCount?1:0.7} className={i<realCount ? "drop-shadow-[0_0_5px_rgba(0,240,255,0.8)]" : ""}/>
                <text x={p.x} y={chartH+18} textAnchor="middle" fontSize="9" fill="#71717A" fontWeight="500">{allPoints[i].date}</text>
                {i<realCount && <text x={p.x} y={p.y-10} textAnchor="middle" fontSize="10" fill="#FFFFFF" fontWeight="bold">{allPoints[i].weight}</text>}
              </g>
            ))}
          </svg>
        </div>

        <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase mb-3">Log This Week</p>
        <div className="flex gap-2 mb-8">
          <input value={newWeight} onChange={e=>setNewWeight(e.target.value)} placeholder="e.g. 56.5" type="number" step="0.1"
            className="flex-1 bg-[#1C1C26] border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#00F0FF]/50 transition-colors" />
          <button onClick={addWeight} className="bg-[#00F0FF] text-black font-bold px-6 py-3 rounded-2xl shadow-[0_0_15px_rgba(0,240,255,0.3)] active:scale-95 transition-transform">Log</button>
        </div>
        
        <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase mb-3">History</p>
        <div className="bg-[#1C1C26] rounded-3xl p-5 border border-white/5 shadow-xl">
          {[...weights].reverse().map((w,i)=>(
            <div key={i} className={`flex justify-between items-center py-3 ${i !== weights.length - 1 ? 'border-b border-white/5' : ''}`}>
              <span className="text-sm text-zinc-400 font-medium">{w.date}</span>
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-white">{w.weight} kg</span>
                <button onClick={() => setWeights(weights.filter((_, idx) => idx !== weights.length - 1 - i))} className="w-6 h-6 flex items-center justify-center rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">×</button>
              </div>
            </div>
          ))}
          {weights.length === 0 && <div className="text-sm text-zinc-500 text-center py-2">No logs yet</div>}
        </div>
      </div>
    );
  };

  // ── WATER PAGE ───────────────────────────────────────────────────────────
  const WaterPage = () => (
    <div className="pb-32 px-5 pt-8 bg-[#11111A] min-h-screen text-white font-sans selection:bg-cyan-500/30">
      <div className="mb-8">
        <p className="text-zinc-500 text-xs font-bold tracking-widest uppercase mb-1">Hydration</p>
        <h1 className="text-[28px] font-bold tracking-tight text-white leading-tight">Water Tracker 💧</h1>
      </div>
      
      <div className="flex flex-col items-center mb-10 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative w-52 h-52">
          <svg width="208" height="208" viewBox="0 0 208 208" className="overflow-visible">
            <circle cx="104" cy="104" r="90" fill="none" stroke="#1C1C26" strokeWidth="16"/>
            <circle cx="104" cy="104" r="90" fill="none" stroke="#00F0FF" strokeWidth="16"
              strokeDasharray={`${2*Math.PI*90}`}
              strokeDashoffset={`${2*Math.PI*90*(1-waterPct/100)}`}
              strokeLinecap="round" transform="rotate(-90 104 104)"
              className="transition-all duration-1000 ease-out drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]"/>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="font-bold text-[#00F0FF] text-4xl mb-1">{todayWater}<span className="text-xl ml-1">ml</span></div>
            <div className="text-sm text-zinc-400 font-medium">of 3000ml</div>
          </div>
        </div>
        <div className={`mt-6 px-4 py-2 rounded-full border backdrop-blur-md font-semibold text-sm transition-colors ${waterPct>=100 ? 'bg-[#4BFF75]/10 text-[#4BFF75] border-[#4BFF75]/30' : 'bg-[#1C1C26] text-zinc-400 border-white/5'}`}>
          {waterPct>=100 ? "Goal reached! 🎉" : `${Math.max(3000-todayWater, 0)}ml remaining`}
        </div>
      </div>
      
      <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase mb-3">Quick Add</p>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[150,250,350,500].map(amt=>(
          <button key={amt} onClick={()=>addWater(amt)} className="bg-[#1C1C26] text-white font-medium py-4 rounded-2xl border border-white/5 shadow-lg active:scale-95 transition-all duration-200 hover:bg-white/5 flex items-center justify-center gap-2">
            <Droplet size={16} className="text-[#00F0FF]" fill="#00F0FF" fillOpacity={0.4} />
            + {amt}ml
          </button>
        ))}
      </div>
      
      <button onClick={()=>setWater(prev=>({...prev,[todayKey]:0}))} className="w-full py-4 rounded-2xl text-zinc-500 font-medium active:scale-95 transition-transform hover:text-white mb-6">
        Reset today
      </button>
      
      <div className="bg-[#1C1C26] rounded-3xl p-5 border border-white/5 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#00F0FF]/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="text-sm font-bold text-white mb-3">Hydration tips for bulking</div>
        {["Drink 500ml right after waking up","Have a glass before every meal","Sip during gym, not just after","3L/day minimum when bulking hard"].map((t,i)=>(
          <div key={i} className={`text-sm text-zinc-400 py-2.5 ${i<3 ? 'border-b border-white/5' : ''}`}>
            <span className="text-[#00F0FF] mr-2">•</span> {t}
          </div>
        ))}
      </div>
    </div>
  );

  // ── SUMMARY PAGE ─────────────────────────────────────────────────────────
  const SummaryPage = () => {
    const actualDayProteins = customPlan.map((d, i) => d.reduce((s, m, idx) => s + ((checked[`${i}`]||{})[idx] ? m.protein : 0), 0));
    const actualDayCals = customPlan.map((d, i) => d.reduce((s, m, idx) => s + ((checked[`${i}`]||{})[idx] ? m.cal : 0), 0));
    
    const plannedDayProteins = customPlan.map(d=>d.reduce((s,m)=>s+m.protein,0));
    const plannedDayCals = customPlan.map(d=>d.reduce((s,m)=>s+m.cal,0));

    const maxP = Math.max(...plannedDayProteins, 1);
    const maxCal = Math.max(...plannedDayCals, 1);

    return (
      <div className="pb-32 px-5 pt-8 bg-[#11111A] min-h-screen text-white font-sans selection:bg-cyan-500/30">
        <div className="mb-8">
          <p className="text-zinc-500 text-xs font-bold tracking-widest uppercase mb-1">Overview</p>
          <h1 className="text-[28px] font-bold tracking-tight text-white leading-tight">Weekly Summary 📊</h1>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[
            { label:"Avg protein eaten", val:`${weeklyAvgP}g/day`, color:'text-[#4BFF75]' },
            { label:"Avg calories eaten", val:`${weeklyAvgC}/day`, color:'text-[#FFD166]' },
            { label:"Current weight", val:`${weights.length > 0 ? weights[weights.length-1].weight : 55} kg`, color:'text-[#00F0FF]' },
            { label:"Target protein", val:"130–150g", color:'text-white' },
          ].map((s,i)=>(
            <div key={i} className="bg-[#1C1C26] rounded-3xl p-5 border border-white/5 shadow-xl">
              <div className="text-xs text-zinc-500 font-medium mb-1">{s.label}</div>
              <div className={`text-xl font-bold ${s.color}`}>{s.val}</div>
            </div>
          ))}
        </div>

        <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase mb-3">Protein Per Day (Actual / Planned)</p>
        <div className="bg-[#1C1C26] rounded-3xl p-5 mb-6 border border-white/5 shadow-xl">
          {actualDayProteins.map((p,i)=>(
            <div key={i} className="flex items-center gap-4 mb-3">
              <div className="text-sm text-zinc-400 font-medium w-8">{dayNames[i]}</div>
              <div className="flex-1 h-2 bg-zinc-800 rounded-full relative overflow-hidden">
                <div className="absolute h-full bg-white/10 rounded-full" style={{ width:`${Math.round((plannedDayProteins[i]/maxP)*100)}%` }}/>
                <div className={`absolute h-full rounded-full transition-all duration-500 ${noEggDays.includes(i) ? 'bg-[#A78BFA] shadow-[0_0_8px_rgba(167,139,250,0.6)]' : 'bg-[#00F0FF] shadow-[0_0_8px_rgba(0,240,255,0.6)]'}`} style={{ width:`${Math.round((p/maxP)*100)}%` }}/>
              </div>
              <div className="text-[11px] text-[#4BFF75] font-bold w-14 text-right">{p} / {plannedDayProteins[i]}g</div>
            </div>
          ))}
          <div className="text-[10px] text-zinc-500 mt-2">Faint bar = planned target</div>
        </div>

        <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase mb-3">Calories Per Day (Actual / Planned)</p>
        <div className="bg-[#1C1C26] rounded-3xl p-5 mb-6 border border-white/5 shadow-xl">
          {actualDayCals.map((c,i)=>(
            <div key={i} className="flex items-center gap-4 mb-3">
              <div className="text-sm text-zinc-400 font-medium w-8">{dayNames[i]}</div>
              <div className="flex-1 h-2 bg-zinc-800 rounded-full relative overflow-hidden">
                <div className="absolute h-full bg-white/10 rounded-full" style={{ width:`${Math.round((plannedDayCals[i]/maxCal)*100)}%` }}/>
                <div className="absolute h-full rounded-full bg-[#FFD166] shadow-[0_0_8px_rgba(255,209,102,0.6)] transition-all duration-500" style={{ width:`${Math.round((c/maxCal)*100)}%` }}/>
              </div>
              <div className="text-[11px] text-[#FFD166] font-bold w-14 text-right">{c} / {plannedDayCals[i]}</div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#1C1C26] to-[#1C1C26]/80 rounded-3xl p-5 mb-6 border border-white/5 shadow-xl">
          <div className="text-[15px] font-bold text-white mb-4">Bulk checkup</div>
          {[
            { check:weeklyAvgP>=130, label:"Avg protein eaten ≥ 130g/day" },
            { check:weeklyAvgC>=2800, label:"Avg calories eaten ≥ 2800/day" },
            { check:weights.length>=2&&weights[weights.length-1].weight>weights[0].weight, label:"Weight going up" },
          ].map((c,i)=>(
            <div key={i} className={`flex items-center gap-3 py-3 ${i<2 ? 'border-b border-white/5' : ''}`}>
              <div className={`flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0 transition-all ${c.check ? 'bg-[#4BFF75]/20 text-[#4BFF75] border border-[#4BFF75]/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'}`}>
                {c.check ? <Check size={14} strokeWidth={3} /> : "!"}
              </div>
              <span className={`text-[13px] font-medium ${c.check ? 'text-white' : 'text-zinc-500'}`}>{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── HOME PAGE ────────────────────────────────────────────────────────────
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
              <div className="h-full bg-zinc-600 rounded-full transition-all duration-500" style={{ width: `${(mealsEaten/dayPlan.length)*100}%` }}></div>
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
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-[#00F0FF] to-[#4BFF75] rounded-full transition-all duration-500" style={{ height: `${Math.min((todayWater/3000)*100, 100)}%` }}></div>
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
                  className={`flex items-center justify-center min-w-[3.8rem] h-11 rounded-[1.25rem] text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? 'bg-[#1C1C26] text-white border border-[#4BFF75]/50 shadow-[0_0_15px_rgba(75,255,117,0.15)]' 
                      : 'bg-[#1C1C26]/50 text-zinc-500 border border-transparent'
                  }`}
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
                  className={`relative overflow-hidden flex items-center p-3.5 rounded-3xl transition-all duration-500 ${
                    done 
                      ? 'bg-gradient-to-r from-[#4BFF75]/20 to-[#4BFF75]/5 border border-[#4BFF75]/30 shadow-[0_0_20px_rgba(75,255,117,0.1)]' 
                      : 'bg-[#1C1C26] border border-white/5 shadow-lg'
                  }`}
                >
                  <img src={imgUrl} alt={meal.label} className="w-16 h-16 rounded-2xl object-cover bg-zinc-800 shadow-inner" />
                  
                  <div className="ml-4 flex-1">
                    <div className="flex items-center mb-1">
                      <h3 className={`text-[15px] font-bold ${done ? 'text-white' : 'text-white'}`}>{meal.label}</h3>
                      <span className={`ml-2 text-[10px] font-semibold ${done ? 'text-[#4BFF75]' : 'text-zinc-500'}`}>
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
                          <p className={`text-xs font-bold ${done ? 'text-[#4BFF75]/80' : 'text-white'}`}>{meal.protein}g</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                          <Flame size={10} className="text-orange-400" />
                        </div>
                        <div>
                          <p className="text-[9px] text-zinc-500 font-medium">Calories</p>
                          <p className={`text-xs font-bold ${done ? 'text-[#4BFF75]/80' : 'text-white'}`}>{meal.cal}</p>
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

  // ── MODALS ───────────────────────────────────────────────────────────────
  const modalWrap = (children, onClose) => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end z-[100] transition-all duration-300" onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} className="bg-[#1C1C26] border border-white/10 border-b-0 rounded-t-[32px] w-full max-w-md mx-auto p-6 pb-12 max-h-[85vh] overflow-y-auto shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
        <div className="w-12 h-1.5 bg-zinc-700 rounded-full mx-auto mb-6"></div>
        {children}
      </div>
    </div>
  );

  const pages = { home:<HomePage/>, water:<WaterPage/>, shopping:<ShoppingPage/>, weight:<WeightPage/>, summary:<SummaryPage/> };

  return (
    <div className="bg-black min-h-screen text-white w-full max-w-md mx-auto relative overflow-hidden">
      <Confetti active={showConfetti}/>
      <div className="h-full overflow-y-auto scrollbar-hide">{pages[page]}</div>

      {/* Skip Modal */}
      {skipModal !== null && modalWrap(<>
        <div className="text-xl font-bold text-white mb-1">Skipping {dayPlan[skipModal]?.label}?</div>
        <div className="text-sm text-zinc-400 mb-6">Cover up with one of these quick options 👇</div>
        {skipAlts.map((alt,i)=>(
          <div key={i} onClick={()=>setSkipModal(null)} className="bg-[#11111A] border border-white/5 rounded-2xl p-4 flex items-center gap-4 mb-3 cursor-pointer active:scale-95 transition-all">
            <span className="text-3xl">{alt.icon}</span>
            <div className="flex-1">
              <div className="text-[15px] font-bold text-white mb-0.5">{alt.name}</div>
              <div className="text-xs text-[#00F0FF] font-medium">{alt.protein}g protein <span className="text-zinc-500 mx-1">·</span> {alt.cal} kcal</div>
            </div>
          </div>
        ))}
      </>, ()=>setSkipModal(null))}

      {/* Swap Modal */}
      {swapModal !== null && modalWrap(<>
        <div className="text-xl font-bold text-white mb-1">Swap {swapModal.meal.label} 🔄</div>
        <div className="text-sm text-zinc-400 mb-6">Choose an alternative meal below</div>
        {(swapPool[swapModal.meal.label]||swapPool["Dinner"]).map((swap,i)=>(
          <div key={i} onClick={()=>applySwap(swapModal.dayIdx,swapModal.mealIdx,swap)} className="bg-[#11111A] border border-white/5 rounded-2xl p-5 mb-4 cursor-pointer active:scale-95 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{swap.emoji}</span>
              <span className="text-lg font-bold text-white">{swap.label}</span>
            </div>
            <div className="text-sm text-zinc-400 mb-4">{swap.items.join(" · ")}</div>
            <div className="flex flex-wrap gap-2">
              {[{l:"P",v:swap.protein+"g",c:"text-[#4BFF75]",bg:"bg-[#4BFF75]/10"},{l:"C",v:swap.carbs+"g",c:"text-[#FFD166]",bg:"bg-[#FFD166]/10"},{l:"F",v:swap.fats+"g",c:"text-[#FF2A7A]",bg:"bg-[#FF2A7A]/10"},{l:"kcal",v:swap.cal,c:"text-white",bg:"bg-white/10"}].map(m=>(
                <div key={m.l} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${m.c} ${m.bg}`}>{m.l}: {m.v}</div>
              ))}
            </div>
          </div>
        ))}
      </>, ()=>setSwapModal(null))}

      {/* Edit Modal */}
      {editModal !== null && editDraft && modalWrap(<>
        <div className="text-xl font-bold text-white mb-1">
          ✏️ Edit {customPlan[editModal.dayIdx][editModal.mealIdx].label}
        </div>
        <div className="text-sm text-zinc-400 mb-6">{fullDayNames[editModal.dayIdx]}</div>
        
        <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase mb-3">Food Items</p>
        <div className="space-y-3 mb-4">
          {editDraft.items.map((item,i)=>(
            <div key={i} className="flex gap-2">
              <input value={item} onChange={e=>{const arr=[...editDraft.items]; arr[i]=e.target.value; setEditDraft(p=>({...p,items:arr}));}} className="flex-1 bg-[#11111A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00F0FF]/50 transition-colors" />
              <button onClick={()=>setEditDraft(p=>({...p,items:p.items.filter((_,ii)=>ii!==i)}))} className="w-12 flex items-center justify-center rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">×</button>
            </div>
          ))}
        </div>
        <button onClick={()=>setEditDraft(p=>({...p,items:[...p.items,""]}))} className="w-full py-3 rounded-xl border border-dashed border-zinc-600 text-zinc-400 font-medium hover:text-white hover:border-zinc-400 transition-colors mb-8">+ Add item</button>
        
        <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase mb-3">Nutrition</p>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[["protein","Protein (g)"],["cal","Calories"]].map(([k,label])=>(
            <div key={k}>
              <div className="text-xs text-zinc-400 font-medium mb-2">{label}</div>
              <input type="number" value={editDraft[k]} onChange={e=>setEditDraft(p=>({...p,[k]:parseInt(e.target.value)||0}))} className="w-full bg-[#11111A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00F0FF]/50 transition-colors" />
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={saveEdit} className="flex-1 bg-[#00F0FF] text-black font-bold py-4 rounded-xl shadow-[0_0_15px_rgba(0,240,255,0.3)] active:scale-95 transition-transform">Save</button>
          <button onClick={()=>setEditModal(null)} className="flex-1 bg-[#11111A] text-white font-bold py-4 rounded-xl border border-white/10 active:scale-95 transition-transform">Cancel</button>
        </div>
      </>, ()=>setEditModal(null))}

      {/* Floating Bottom Nav matched to the image */}
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
              <div className={`mb-1 z-10 transition-colors duration-300 ${active ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-zinc-500'}`}>
                {n.icon}
              </div>
              <span className={`text-[9px] font-medium z-10 tracking-wide transition-colors duration-300 ${active ? 'text-white' : 'text-zinc-500'}`}>
                {n.label}
              </span>
            </button>
          )
        })}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        body { background: #000; }
      `}} />
    </div>
  );
}
