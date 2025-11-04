import { memo, useMemo } from 'react';
import { Variant as VariantType } from '../../../../../api/hotel/types';
import './VariantsListItem.css';

interface VariantsListItemProps {
  variant: VariantType;
}

function VariantsListItemComponent({ variant }: VariantsListItemProps) {
  const hasDiscount = useMemo(() => {
    return variant.total_price && 
           variant.total_price.discounted_price !== variant.total_price.total_price;
  }, [variant.total_price]);

  return (
    <div className="variants-list-item">
      {variant.name && (
        <div className="variants-list-item-name">
          <strong>{variant.name}</strong>
        </div>
      )}
      
      {variant.display_properties && variant.display_properties.length > 0 && (
        <div className="variants-list-item-properties">
          {variant.display_properties.map((property, index) => (
            <div key={index} className="variants-list-item-property">
              <span className="variants-list-item-property-name">{property.display_name}:</span>
              <span className="variants-list-item-property-value">{property.value}</span>
            </div>
          ))}
        </div>
      )}
      
      {variant.total_price && (
        <div className="variants-list-item-price">
          <div className="variants-list-item-price-row">
            <span className="variants-list-item-price-label">Total Price:</span>
            <span className="variants-list-item-price-value">
              {variant.total_price.total_price} {variant.total_price.currency}
            </span>
          </div>
          {hasDiscount && (
            <div className="variants-list-item-price-row variants-list-item-price-row-discounted">
              <span className="variants-list-item-price-label">Discounted Price:</span>
              <span className="variants-list-item-price-value">
                {variant.total_price.discounted_price} {variant.total_price.currency}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export const VariantsListItem = memo(VariantsListItemComponent);

