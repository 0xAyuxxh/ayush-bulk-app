import { useState, useEffect, useRef } from "react";

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
      <div style={{ padding:"0 16px" }}>
        <div style={{ padding:"24px 0 20px" }}>
          <div className="text-sm text-muted font-mono tracking-wide">WEEKLY</div>
          <div className="text-2xl font-display font-bold text-main" style={{ marginTop:"4px" }}>Shopping List 🛒</div>
          <div className="text-base text-muted" style={{ marginTop:"4px" }}>Auto-generated from your 7-day plan</div>
        </div>
        {Object.entries(grouped).map(([cat, items]) => items.length === 0 ? null : (
          <div key={cat} style={{ marginBottom:"16px" }}>
            {lbl(cat)}
            {card(<>
              {[...new Set(items)].map((item, i, arr) => (
                <div key={item} onClick={() => setTicked(p => ({...p,[item]:!p[item]}))}
                  className="flex items-center gap-3"
                  style={{ padding:"12px 0", borderBottom: i<arr.length-1?`1px solid var(--border-light)`:"none", cursor:"pointer", transition:"all 0.2s" }}>
                  <div className="flex items-center justify-center text-xs" style={{ width:"20px", height:"20px", borderRadius:"6px", border:`2px solid ${ticked[item]?'var(--green)':'var(--border-color)'}`, background:ticked[item]?'var(--green)':"transparent", flexShrink:0, transition:"all 0.2s" }}>
                    {ticked[item] && <span style={{ color:"var(--bg-primary)" }}>✓</span>}
                  </div>
                  <span className={`text-base ${ticked[item]?'text-muted':'text-main'}`} style={{ textDecoration:ticked[item]?"line-through":"none", textTransform:"capitalize", transition:"all 0.2s" }}>{item}</span>
                </div>
              ))}
            </>)}
          </div>
        ))}
        <button onClick={() => setTicked({})} className="btn-secondary w-full" style={{ marginBottom:"24px" }}>Clear all ticks</button>
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
      <div style={{ padding:"0 16px" }}>
        <div style={{ padding:"24px 0 20px" }}>
          <div className="text-sm text-muted font-mono tracking-wide">PROGRESS</div>
          <div className="text-2xl font-display font-bold text-main" style={{ marginTop:"4px" }}>Weight Log ⚖️</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginBottom:"20px" }}>
          {[
            { label:"Start", val:`${startWeight.toFixed(1)} kg`, color:'var(--text-muted)' },
            { label:"Current", val:`${latest} kg`, color:'var(--yellow)' },
            { label:"Total gain", val:`${gain >= 0 ? '+' : ''}${gain} kg`, color:gain >= 0 ? 'var(--green)' : 'var(--red)' },
            { label:"Weeks logged", val:`${weights.length}`, color:'var(--accent)' },
          ].map((s,i)=>(
            <div key={i} className="glass-panel" style={{ padding:"16px" }}>
              <div className="text-xs text-muted" style={{ marginBottom:"6px" }}>{s.label}</div>
              <div className="text-xl font-bold" style={{ color:s.color }}>{s.val}</div>
            </div>
          ))}
        </div>

        {weeksLeft && card(<>
          <div className="text-base font-semibold text-soft" style={{ marginBottom:"6px" }}>📈 Projection to 65 kg</div>
          <div className="text-sm text-green">At current pace (~{rate.toFixed(2)}kg/week)</div>
          <div className="text-xl font-bold text-accent" style={{ marginTop:"4px", textShadow:"0 0 10px var(--accent-glow)" }}>You'll hit 65 kg in ~{weeksLeft} weeks</div>
          <div className="text-xs text-muted" style={{ marginTop:"4px" }}>Keep the surplus going 💪</div>
        </>)}

        {card(<>
          <div className="text-base font-semibold text-soft" style={{ marginBottom:"12px" }}>Weight chart (kg) <span className="text-xs text-muted font-normal">— dashed = projected</span></div>
          <svg width="100%" viewBox={`0 0 ${chartW+40} ${chartH+20}`} style={{ filter:"drop-shadow(0 4px 6px rgba(0,0,0,0.3))" }}>
            {realPath && <path d={realPath} fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" style={{ filter:"drop-shadow(0 0 4px var(--accent-glow))" }}/>}
            {projPath && <path d={projPath} fill="none" stroke="var(--purple)" strokeWidth="2.5" strokeDasharray="6 5" strokeLinecap="round"/>}
            {pts.map((p,i)=>(
              <g key={i}>
                <circle cx={p.x} cy={p.y} r={i<realCount?4.5:3.5} fill={i<realCount?'var(--accent)':'var(--purple)'} opacity={i<realCount?1:0.7}/>
                <text x={p.x} y={chartH+16} textAnchor="middle" fontSize="9" fill="var(--text-muted)">{allPoints[i].date}</text>
                {i<realCount && <text x={p.x} y={p.y-10} textAnchor="middle" fontSize="10" fill="var(--text-soft)" fontWeight="600">{allPoints[i].weight}</text>}
              </g>
            ))}
          </svg>
        </>)}

        {lbl("LOG THIS WEEK")}
        <div className="flex gap-2" style={{ marginBottom:"20px" }}>
          <input value={newWeight} onChange={e=>setNewWeight(e.target.value)} placeholder="e.g. 56.5" type="number" step="0.1"
            className="input-field w-full" />
          <button onClick={addWeight} className="btn-primary">Log</button>
        </div>
        {lbl("HISTORY")}
        {[...weights].reverse().map((w,i)=>(
          <div key={i} className="flex justify-between items-center" style={{ padding:"12px 0", borderBottom:`1px solid var(--border-light)` }}>
            <span className="text-sm text-muted">{w.date}</span>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-main">{w.weight} kg</span>
              <button onClick={() => setWeights(weights.filter((_, idx) => idx !== weights.length - 1 - i))} className="btn-secondary" style={{ padding:"4px 8px", fontSize:"16px", color:"var(--red)", border:"none", background:"transparent" }}>×</button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // ── WATER PAGE ───────────────────────────────────────────────────────────
  const WaterPage = () => (
    <div style={{ padding:"0 16px" }}>
      <div style={{ padding:"24px 0 20px" }}>
        <div className="text-sm text-muted font-mono tracking-wide">HYDRATION</div>
        <div className="text-2xl font-display font-bold text-main" style={{ marginTop:"4px" }}>Water Tracker 💧</div>
      </div>
      <div className="flex flex-col items-center" style={{ marginBottom:"32px" }}>
        <div style={{ position:"relative", width:"180px", height:"180px" }}>
          <svg width="180" height="180" viewBox="0 0 180 180">
            <circle cx="90" cy="90" r="80" fill="none" stroke="var(--bg-tertiary)" strokeWidth="14"/>
            <circle cx="90" cy="90" r="80" fill="none" stroke="var(--cyan)" strokeWidth="14"
              strokeDasharray={`${2*Math.PI*80}`}
              strokeDashoffset={`${2*Math.PI*80*(1-waterPct/100)}`}
              strokeLinecap="round" transform="rotate(-90 90 90)"
              className="water-ring" style={{ filter: "drop-shadow(0 0 8px rgba(91, 224, 255, 0.4))" }}/>
          </svg>
          <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", textAlign:"center" }}>
            <div className="font-display font-bold text-cyan" style={{ fontSize:"32px" }}>{todayWater}<span className="text-lg">ml</span></div>
            <div className="text-sm text-muted">of 3000ml</div>
          </div>
        </div>
        <div className={`text-base font-semibold ${waterPct>=100?'text-green':'text-muted'}`} style={{ marginTop:"16px" }}>
          {waterPct>=100?"Goal reached! 🎉":`${3000-todayWater}ml remaining`}
        </div>
      </div>
      {lbl("QUICK ADD")}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginBottom:"20px" }}>
        {[150,250,350,500].map(amt=>(
          <button key={amt} onClick={()=>addWater(amt)} className="btn-secondary">+ {amt}ml</button>
        ))}
      </div>
      <button onClick={()=>setWater(prev=>({...prev,[todayKey]:0}))} className="btn-secondary w-full" style={{ border:"none", background:"transparent", marginBottom:"20px" }}>Reset today</button>
      {card(<>
        <div className="text-base font-semibold text-soft" style={{ marginBottom:"8px" }}>Hydration tips for bulking</div>
        {["Drink 500ml right after waking up","Have a glass before every meal","Sip during gym, not just after","3L/day minimum when bulking hard"].map((t,i)=>(
          <div key={i} className="text-sm text-muted" style={{ padding:"6px 0", borderBottom:i<3?`1px solid var(--border-light)`:"none" }}>· {t}</div>
        ))}
      </>)}
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
      <div style={{ padding:"0 16px" }}>
        <div style={{ padding:"24px 0 20px" }}>
          <div className="text-sm text-muted font-mono tracking-wide">OVERVIEW</div>
          <div className="text-2xl font-display font-bold text-main" style={{ marginTop:"4px" }}>Weekly Summary 📊</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginBottom:"20px" }}>
          {[
            { label:"Avg protein eaten", val:`${weeklyAvgP}g/day`, color:'var(--green)' },
            { label:"Avg calories eaten", val:`${weeklyAvgC}/day`, color:'var(--yellow)' },
            { label:"Current weight", val:`${weights.length > 0 ? weights[weights.length-1].weight : 55} kg`, color:'var(--accent)' },
            { label:"Target protein", val:"130–150g", color:'var(--text-soft)' },
          ].map((s,i)=>(
            <div key={i} className="glass-panel" style={{ padding:"16px" }}>
              <div className="text-xs text-muted" style={{ marginBottom:"6px" }}>{s.label}</div>
              <div className="text-xl font-bold" style={{ color:s.color }}>{s.val}</div>
            </div>
          ))}
        </div>
        {lbl("PROTEIN PER DAY (ACTUAL / PLANNED)")}
        {card(<>
          {actualDayProteins.map((p,i)=>(
            <div key={i} className="flex items-center gap-3" style={{ marginBottom:"10px" }}>
              <div className="text-sm text-muted font-mono" style={{ width:"28px" }}>{dayNames[i]}</div>
              <div className="flex-1" style={{ height:"8px", background:"var(--bg-tertiary)", borderRadius:"99px", overflow:"hidden", position:"relative", boxShadow:"inset 0 1px 3px rgba(0,0,0,0.5)" }}>
                <div style={{ position:"absolute", height:"100%", width:`${Math.round((plannedDayProteins[i]/maxP)*100)}%`, background:"rgba(255,255,255,0.05)", borderRadius:"99px" }}/>
                <div className="progress-bar-fill" style={{ position:"absolute", height:"100%", width:`${Math.round((p/maxP)*100)}%`, background:noEggDays.includes(i)?'var(--purple)':'var(--accent)', borderRadius:"99px", boxShadow:`0 0 8px ${noEggDays.includes(i)?'var(--purple)':'var(--accent)'}` }}/>
              </div>
              <div className="text-xs text-green font-mono" style={{ width:"60px", textAlign:"right" }}>{p} / {plannedDayProteins[i]}g</div>
            </div>
          ))}
          <div className="text-xs text-muted" style={{ marginTop:"6px" }}>Faint bar = planned target</div>
        </>)}
        {lbl("CALORIES PER DAY (ACTUAL / PLANNED)")}
        {card(<>
          {actualDayCals.map((c,i)=>(
            <div key={i} className="flex items-center gap-3" style={{ marginBottom:"10px" }}>
              <div className="text-sm text-muted font-mono" style={{ width:"28px" }}>{dayNames[i]}</div>
              <div className="flex-1" style={{ height:"8px", background:"var(--bg-tertiary)", borderRadius:"99px", overflow:"hidden", position:"relative", boxShadow:"inset 0 1px 3px rgba(0,0,0,0.5)" }}>
                <div style={{ position:"absolute", height:"100%", width:`${Math.round((plannedDayCals[i]/maxCal)*100)}%`, background:"rgba(255,255,255,0.05)", borderRadius:"99px" }}/>
                <div className="progress-bar-fill" style={{ position:"absolute", height:"100%", width:`${Math.round((c/maxCal)*100)}%`, background:"var(--yellow)", borderRadius:"99px", boxShadow:"0 0 8px var(--yellow-glow)" }}/>
              </div>
              <div className="text-xs text-yellow font-mono" style={{ width:"70px", textAlign:"right" }}>{c} / {plannedDayCals[i]}</div>
            </div>
          ))}
        </>)}
        {card(<>
          <div className="text-base font-semibold text-soft" style={{ marginBottom:"10px" }}>Bulk checkup</div>
          {[
            { check:weeklyAvgP>=130, label:"Avg protein eaten ≥ 130g/day" },
            { check:weeklyAvgC>=2800, label:"Avg calories eaten ≥ 2800/day" },
            { check:weights.length>=2&&weights[weights.length-1].weight>weights[0].weight, label:"Weight going up" },
          ].map((c,i)=>(
            <div key={i} className="flex items-center gap-3" style={{ padding:"8px 0", borderBottom:i<2?`1px solid var(--border-light)`:"none" }}>
              <div className="flex items-center justify-center text-xs font-bold" style={{ width:"20px", height:"20px", borderRadius:"50%", background:c.check?'var(--green)':'var(--red)', color:"var(--bg-primary)", flexShrink:0, boxShadow:c.check?'0 0 8px var(--green-glow)':'' }}>{c.check?"✓":"!"}</div>
              <span className={`text-sm ${c.check?'text-soft':'text-muted'}`}>{c.label}</span>
            </div>
          ))}
        </>)}
      </div>
    );
  };

  // ── HOME PAGE ────────────────────────────────────────────────────────────
  const HomePage = () => (
    <div style={{ padding:"0 16px" }}>
      <div style={{ padding:"24px 0 20px" }}>
        <div className="text-sm text-muted font-mono tracking-wide">BULK TRACKER</div>
        <div className="flex items-center justify-between" style={{ marginTop:"4px" }}>
          <div className="text-2xl font-display font-bold text-main">Hey Ayush 👋</div>
          {streak > 0 && (
            <div className="flex items-center gap-1" style={{ background:"rgba(255,209,102,0.12)", border:`1px solid rgba(255,209,102,0.4)`, borderRadius:"20px", padding:"4px 10px", boxShadow:"0 0 10px var(--yellow-glow)" }}>
              <span className="text-lg">🔥</span>
              <span className="text-xs font-bold text-yellow">{streak} day{streak>1?"s":""}</span>
            </div>
          )}
        </div>
        <div className="text-base text-muted" style={{ marginTop:"4px" }}>55kg → 65kg goal. Stay consistent.</div>
      </div>

      {allDone && (
        <div className="glass-card flex justify-center items-center" style={{ background:"rgba(79,255,176,0.1)", border:`1px solid rgba(79,255,176,0.4)`, padding:"12px 16px", marginBottom:"12px", boxShadow:"0 0 12px var(--green-glow)" }}>
          <span className="text-base font-bold text-green">🎉 All meals done for today!</span>
        </div>
      )}

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginBottom:"16px" }}>
        {[
          { label:"Eaten today", val:`${eatenP}g`, sub:`of ~${totalP}g protein`, color:'var(--green)' },
          { label:"Calories", val:`${eatenC}`, sub:`of ~${totalC} kcal`, color:'var(--yellow)' },
          { label:"Meals done", val:`${mealsEaten}/5`, sub:`${5-mealsEaten} remaining`, color:'var(--accent)' },
          { label:"Water", val:`${todayWater}ml`, sub:"of 3000ml", color:'var(--cyan)' },
        ].map((s,i)=>(
          <div key={i} className="glass-panel" style={{ padding:"16px" }}>
            <div className="text-xs text-muted" style={{ marginBottom:"4px" }}>{s.label}</div>
            <div className="text-2xl font-bold" style={{ color:s.color }}>{s.val}</div>
            <div className="text-xs text-muted" style={{ marginTop:"4px" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Protein progress */}
      <div className="glass-card" style={{ padding:"16px", marginBottom:"16px" }}>
        <div className="flex justify-between" style={{ marginBottom:"10px" }}>
          <span className="text-sm font-semibold text-soft">Protein progress</span>
          <span className="text-sm font-bold text-green">{Math.round((eatenP/totalP)*100)}%</span>
        </div>
        <div style={{ height:"8px", background:"var(--bg-tertiary)", borderRadius:"99px", overflow:"hidden", boxShadow:"inset 0 1px 3px rgba(0,0,0,0.5)" }}>
          <div className="progress-bar-fill" style={{ height:"100%", width:`${Math.min(Math.round((eatenP/totalP)*100),100)}%`, background:`linear-gradient(90deg,var(--blue1),var(--green))`, borderRadius:"99px", boxShadow:"0 0 8px var(--green-glow)" }}/>
        </div>
        <div className="flex justify-between" style={{ marginTop:"8px" }}>
          <span className="text-xs text-muted">Eaten: {eatenP}g</span>
          <span className="text-xs text-muted">Target: {totalP}g</span>
        </div>
      </div>

      {/* Day selector */}
      <div className="text-sm text-muted font-mono tracking-wide" style={{ marginBottom:"8px" }}>TODAY</div>
      <div className="flex gap-2" style={{ overflowX:"auto", scrollbarWidth:"none", paddingBottom:"8px", marginBottom:"16px" }}>
        {dayNames.map((d,i)=>(
          <button key={i} onClick={()=>{ setActiveDay(i); setExpandedMeal(null); }} 
            className={`font-mono text-sm ${activeDay===i ? 'font-bold text-main' : 'text-muted'}`}
            style={{
            flex:"0 0 auto", padding:"8px 14px", borderRadius:"12px",
            border:`1px solid ${activeDay===i?'var(--accent)':'var(--border-color)'}`,
            background:activeDay===i?'var(--accent)':'var(--bg-tertiary)',
            cursor:"pointer", position:"relative", transition:"all 0.2s ease"
          }}>
            {d}
            {noEggDays.includes(i) && <span style={{ position:"absolute", top:"-4px", right:"-4px", width:"8px", height:"8px", background:"var(--purple)", borderRadius:"50%", boxShadow:"0 0 6px var(--purple)" }}/>}
          </button>
        ))}
      </div>

      <div className="text-sm text-muted font-mono tracking-wide" style={{ marginBottom:"12px" }}>
        {fullDayNames[activeDay].toUpperCase()} MEALS
        {isNoEgg && <span className="text-purple" style={{ marginLeft:"8px" }}>· NO EGGS</span>}
        {isWeekend && <span className="text-purple" style={{ marginLeft:"8px" }}>· WAKE 11AM</span>}
      </div>

      {dayPlan.map((meal, i) => {
        const done = !!(dayChecked[i]);
        const isOpen = expandedMeal === i;
        const swaps = swapPool[meal.label] || swapPool["Dinner"];
        return (
          <div key={i} className={`glass-card meal-card ${done ? 'done' : ''}`} style={{ padding:"16px", marginBottom:"12px" }}>
            <div className="flex items-center gap-3">
              <button onClick={()=>toggleMeal(i)} style={{ width:"28px", height:"28px", borderRadius:"50%", flexShrink:0, border:`2px solid ${done?'var(--accent)':'var(--border-color)'}`, background:done?'var(--accent)':"transparent", color:"#fff", fontSize:"14px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s", boxShadow:done?'0 0 10px var(--accent-glow)':'' }}>
                {done?"✓":""}
              </button>
              <div style={{ flex:1, cursor:"pointer" }} onClick={()=>setExpandedMeal(isOpen?null:i)}>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{meal.emoji}</span>
                  <span className={`text-base font-semibold ${done?'text-soft':'text-main'}`}>{meal.label}</span>
                  <span className="text-xs font-mono text-accent" style={{ background:"rgba(61,78,255,0.15)", padding:"2px 8px", borderRadius:"20px" }}>{meal.time}</span>
                </div>
                <div className="text-xs text-muted" style={{ marginTop:"4px" }}>{meal.protein}g protein · {meal.cal} kcal</div>
              </div>
              <button onClick={()=>setSkipModal(i)} className="btn-secondary text-xs font-mono" style={{ padding:"6px 10px", borderRadius:"8px", background:"transparent" }}>SKIP?</button>
            </div>
            {isOpen && (
              <div className="accordion-content" style={{ marginTop:"12px", paddingTop:"12px", borderTop:`1px solid var(--border-light)` }}>
                {meal.items.map((item,ii)=>(
                  <div key={ii} className="flex items-center gap-2" style={{ padding:"4px 0" }}>
                    <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:"var(--accent)", flexShrink:0, boxShadow:"0 0 4px var(--accent-glow)" }}/>
                    <span className="text-sm text-soft">{item}</span>
                  </div>
                ))}
                {/* Macros */}
                <div className="flex gap-2" style={{ marginTop:"12px", paddingTop:"12px", borderTop:`1px solid var(--border-light)` }}>
                  {[
                    { label:"Protein", val:`${meal.protein}g`, color:'var(--green)' },
                    { label:"Carbs", val:`${meal.carbs}g`, color:'var(--yellow)' },
                    { label:"Fats", val:`${meal.fats}g`, color:'var(--purple)' },
                    { label:"Calories", val:`${meal.cal}`, color:'var(--text-soft)' },
                  ].map(m=>(
                    <div key={m.label} className="flex-1 glass-panel" style={{ padding:"8px 4px", textAlign:"center" }}>
                      <div className="text-sm font-bold" style={{ color:m.color }}>{m.val}</div>
                      <div className="text-xs text-muted" style={{ marginTop:"2px" }}>{m.label}</div>
                    </div>
                  ))}
                </div>
                {/* Actions */}
                <div className="flex gap-2" style={{ marginTop:"12px" }}>
                  <button onClick={()=>setSwapModal({dayIdx:activeDay,mealIdx:i,meal})} className="btn-secondary flex-1" style={{ background:"rgba(61,78,255,0.08)", color:"var(--accent)", borderColor:"rgba(61,78,255,0.3)" }}>🔄 Swap meal</button>
                  <button onClick={()=>openEdit(activeDay,i)} className="btn-secondary flex-1" style={{ background:"transparent" }}>✏️ Edit</button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  // ── MODALS ───────────────────────────────────────────────────────────────
  const modalWrap = (children, onClose) => (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", backdropFilter:"blur(6px)", WebkitBackdropFilter:"blur(6px)", display:"flex", alignItems:"flex-end", zIndex:100, transition:"all 0.3s" }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"var(--bg-secondary)", border:`1px solid var(--border-color)`, borderBottom:"none", borderRadius:"24px 24px 0 0", width:"100%", padding:"24px 20px 40px", maxWidth:"420px", margin:"0 auto", maxHeight:"85vh", overflowY:"auto", boxShadow:"var(--shadow-lg)" }}>
        {children}
      </div>
    </div>
  );

  const pages = { home:<HomePage/>, water:<WaterPage/>, shopping:<ShoppingPage/>, weight:<WeightPage/>, summary:<SummaryPage/> };
  const navItems = [
    { key:"home", icon:"🏠", label:"Meals" },
    { key:"water", icon:"💧", label:"Water" },
    { key:"shopping", icon:"🛒", label:"Shop" },
    { key:"weight", icon:"⚖️", label:"Weight" },
    { key:"summary", icon:"📊", label:"Stats" },
  ];

  return (
    <div style={{ background:"var(--bg-primary)", minHeight:"100vh", color:"var(--text-main)", maxWidth:"420px", margin:"0 auto", position:"relative", paddingBottom:"100px" }}>
      <Confetti active={showConfetti}/>
      <div style={{ overflowY:"auto" }}>{pages[page]}</div>

      {/* Skip Modal */}
      {skipModal !== null && modalWrap(<>
        <div className="text-lg font-bold text-main" style={{ marginBottom:"4px" }}>Skipping {dayPlan[skipModal]?.label}?</div>
        <div className="text-sm text-muted" style={{ marginBottom:"16px" }}>Cover up with one of these quick options 👇</div>
        {skipAlts.map((alt,i)=>(
          <div key={i} onClick={()=>setSkipModal(null)} className="glass-panel flex items-center gap-3" style={{ padding:"12px 16px", marginBottom:"8px", cursor:"pointer", transition:"transform 0.2s" }}>
            <span className="text-2xl">{alt.icon}</span>
            <div className="flex-1">
              <div className="text-sm font-bold text-main">{alt.name}</div>
              <div className="text-xs text-muted" style={{ marginTop:"2px" }}>{alt.protein}g protein · {alt.cal} kcal</div>
            </div>
          </div>
        ))}
      </>, ()=>setSkipModal(null))}

      {/* Swap Modal */}
      {swapModal !== null && modalWrap(<>
        <div className="text-lg font-bold text-main" style={{ marginBottom:"4px" }}>Swap {swapModal.meal.label} 🔄</div>
        <div className="text-sm text-muted" style={{ marginBottom:"16px" }}>Choose an alternative meal below</div>
        {(swapPool[swapModal.meal.label]||swapPool["Dinner"]).map((swap,i)=>(
          <div key={i} onClick={()=>applySwap(swapModal.dayIdx,swapModal.mealIdx,swap)} className="glass-panel" style={{ padding:"16px", marginBottom:"10px", cursor:"pointer", transition:"transform 0.2s" }}>
            <div className="flex items-center gap-2" style={{ marginBottom:"8px" }}>
              <span className="text-2xl">{swap.emoji}</span>
              <span className="text-base font-bold text-main">{swap.label}</span>
            </div>
            <div className="text-sm text-muted" style={{ marginBottom:"10px" }}>{swap.items.join(" · ")}</div>
            <div className="flex gap-2">
              {[{l:"P",v:swap.protein+"g",c:"var(--green)"},{l:"C",v:swap.carbs+"g",c:"var(--yellow)"},{l:"F",v:swap.fats+"g",c:"var(--purple)"},{l:"kcal",v:swap.cal,c:"var(--text-soft)"}].map(m=>(
                <div key={m.l} style={{ background:"var(--bg-primary)", borderRadius:"8px", padding:"4px 8px", fontSize:"11px", color:m.c, fontWeight:"600", border:"1px solid var(--border-light)" }}>{m.l}: {m.v}</div>
              ))}
            </div>
          </div>
        ))}
      </>, ()=>setSwapModal(null))}

      {/* Edit Modal */}
      {editModal !== null && editDraft && modalWrap(<>
        <div className="text-lg font-bold text-main" style={{ marginBottom:"4px" }}>
          ✏️ Edit {customPlan[editModal.dayIdx][editModal.mealIdx].label}
        </div>
        <div className="text-sm text-muted" style={{ marginBottom:"16px" }}>{fullDayNames[editModal.dayIdx]}</div>
        {lbl("FOOD ITEMS")}
        {editDraft.items.map((item,i)=>(
          <div key={i} className="flex gap-2" style={{ marginBottom:"8px" }}>
            <input value={item} onChange={e=>{const arr=[...editDraft.items]; arr[i]=e.target.value; setEditDraft(p=>({...p,items:arr}));}} className="input-field flex-1" />
            <button onClick={()=>setEditDraft(p=>({...p,items:p.items.filter((_,ii)=>ii!==i)}))} className="btn-secondary" style={{ padding:"10px 14px", color:"var(--red)", border:"none", background:"transparent" }}>×</button>
          </div>
        ))}
        <button onClick={()=>setEditDraft(p=>({...p,items:[...p.items,""]}))} className="btn-secondary w-full" style={{ border:"1px dashed var(--border-color)", background:"transparent", marginBottom:"20px" }}>+ Add item</button>
        {lbl("NUTRITION")}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginBottom:"24px" }}>
          {[["protein","Protein (g)"],["cal","Calories"]].map(([k,label])=>(
            <div key={k}>
              <div className="text-xs text-muted" style={{ marginBottom:"6px" }}>{label}</div>
              <input type="number" value={editDraft[k]} onChange={e=>setEditDraft(p=>({...p,[k]:parseInt(e.target.value)||0}))} className="input-field w-full" />
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={saveEdit} className="btn-primary flex-1">Save</button>
          <button onClick={()=>setEditModal(null)} className="btn-secondary flex-1" style={{ background:"transparent" }}>Cancel</button>
        </div>
      </>, ()=>setEditModal(null))}

      {/* Floating Bottom Nav */}
      <div className="floating-dock">
        {navItems.map(n=>(
          <button key={n.key} onClick={()=>setPage(n.key)} className={`nav-btn ${page===n.key ? 'active' : ''}`}>
            <span className="nav-icon" style={{ fontSize:"22px", transition:"transform 0.3s ease" }}>{n.icon}</span>
            <span className={`text-xs font-mono tracking-wide ${page===n.key ? 'text-accent font-bold' : 'text-muted'}`}>{n.label}</span>
            <div className="nav-indicator" />
          </button>
        ))}
      </div>
    </div>
  );
}
