import React from 'react';
import { Shield, Flame, Crown, Eye } from 'lucide-react';

export const HOUSES = [
  {
    id: 'stark',
    name: 'HOUSE STARK',
    motto: 'Winter Is Coming',
    attribute: 'Discipline & Resilience',
    accent: '#9BC7DF',
    icon: Shield
  },
  {
    id: 'targaryen',
    name: 'TARGARYEN',
    motto: 'Fire and Blood',
    attribute: 'Ambition & Power',
    accent: '#E63946',
    icon: Flame
  },
  {
    id: 'lannister',
    name: 'LANNISTER',
    motto: 'Hear Me Roar',
    attribute: 'Strategy & Intelligence',
    accent: '#C5A15B',
    icon: Crown
  },
  {
    id: 'nightswatch',
    name: "NIGHT'S WATCH",
    motto: 'Sword in Darkness',
    attribute: 'Shield of the Realm',
    accent: '#00F0FF',
    icon: Eye
  }
];

export default function HouseSelector({ activeHouse, onSelectHouse }) {
  return (
    <div className="w-full max-w-3xl mx-auto mt-10 p-5 bg-[#111318]/75 border border-[#C5A15B]/30 rounded backdrop-blur-md shadow-2xl">
      <div className="font-serif text-xs tracking-widest text-[#C5A15B] uppercase text-center mb-4">
        ⚔️ CHOOSE YOUR ALLEGIANCE TO SHAPE THE REALM ⚔️
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {HOUSES.map((house) => {
          const Icon = house.icon;
          const isActive = activeHouse === house.id;

          return (
            <button
              key={house.id}
              onClick={() => onSelectHouse(house.id)}
              className={`flex flex-col items-center gap-2 p-3 rounded transition-all border ${isActive ? 'bg-[#181B22] border-[#C5A15B] shadow-[0_0_18px_rgba(197,161,91,0.35)] scale-102' : 'bg-[#08090C]/60 border-[#C5A15B]/20 hover:border-[#C5A15B]/50 hover:bg-[#181B22]/60'}`}
            >
              <div style={{ color: house.accent }}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="font-serif text-xs font-bold tracking-wider text-[#E7E1D5] uppercase">
                {house.name}
              </div>
              <div className="text-[10px] text-[#A3A096] italic text-center leading-tight">
                {house.attribute}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
