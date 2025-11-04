import { useState, memo, useMemo, useCallback } from 'react';
import { Variant as VariantType } from '../../../../../api/hotel/types';
import { VariantsListItem } from './VariantsListItem';
import './VariantsList.css';

interface VariantsListProps {
  variants: VariantType[]
}

function VariantsListComponent({ variants }: VariantsListProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedVariants = showAll ? variants : variants.slice(0, 2);
  const hasMore = variants.length > 2;

  if (variants.length === 0) return null;

  return (
    <div className="room-variants">
      <ul className="variants-list">
        {displayedVariants.map((variant, index) => {
          const isNewlyVisible = showAll && index >= 2;
          return (
            <li 
              key={index} 
              className={`variant-item ${isNewlyVisible ? 'variant-item-enter' : ''}`}
            >
              <VariantsListItem variant={variant} />
            </li>
          );
        })}
      </ul>
      {hasMore && (
        <button 
          className="see-more-button"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'See less' : `See more (${variants.length - 2} more)`}
        </button>
      )}
    </div>
  );
}

export const VariantsList = memo(VariantsListComponent);

