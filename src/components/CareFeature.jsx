import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import { CARE_GUIDE_DATA } from '../data/wigData';
import GoldStroke from './GoldStroke';

export default function CareFeature({ onOpenCareGuide }) {
  return (
    <section id="wig-care-guide" className="section-wrapper" aria-label="Wig Care Guide Feature">
      <div className="container-editorial">
        <div className="care-feature-card">
          <div className="care-feature-content">
            <h2 className="care-heading">Love your wig to keep <GoldStroke>the look</GoldStroke></h2>
            
            <button 
              type="button" 
              className="care-action-btn"
              onClick={onOpenCareGuide}
            >
              <BookOpen size={16} />
              <span>Read the care guide</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="care-feature-image-wrap">
            <img 
              src={CARE_GUIDE_DATA.image} 
              alt="House of Nina Wig Maintenance and Care" 
              className="care-feature-img"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
