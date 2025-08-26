import React, { useEffect, useRef, useState } from 'react';

interface MasonryGridProps {
  children: React.ReactNode;
  minColumnWidth?: number;
  gap?: number;
  className?: string;
}

export function MasonryGrid({
  children,
  minColumnWidth = 300,
  gap = 24,
  className = "",
}: MasonryGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(3);
  const childrenArray = React.Children.toArray(children);

  // Calculate number of columns based on container width
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let rafId: number;
    
    const updateColumns = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const calculatedColumns = Math.max(
          1,
          Math.floor(containerWidth / minColumnWidth)
        );

        setColumns(calculatedColumns);
      }
    };

    const debouncedUpdateColumns = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateColumns, 50);
    };

    const immediateUpdateColumns = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateColumns);
    };

    // Initial update with a slight delay to ensure DOM is ready
    setTimeout(updateColumns, 100);
    
    // Use ResizeObserver for immediate updates during sidebar animation
    const resizeObserver = new ResizeObserver(() => {
      immediateUpdateColumns();
    });
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    window.addEventListener('resize', debouncedUpdateColumns);
    
    return () => {
      window.removeEventListener('resize', debouncedUpdateColumns);
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, [minColumnWidth]);

  // Distribute items to columns based on height
  const columnItems: React.ReactNode[][] = Array.from(
    { length: columns },
    () => []
  );
  const columnHeights = Array(columns).fill(0);

  // Helper to get approximate height of an element
  const getElementHeight = (child: React.ReactNode): number => {
    if (React.isValidElement(child)) {
      // Use a realistic height estimate for challenge cards to ensure proper spacing
      // Challenge cards are typically around 400-450px tall depending on content
      return Number(child.props.height || 450); // More accurate estimate for challenge cards
    }
    return 450; // Default height that matches typical challenge card height
  };

  // Distribute children to columns to balance heights
  childrenArray.forEach((child) => {
    const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
    columnItems[shortestColumnIndex].push(child);
    // Remove gap from height calculation - let CSS handle spacing consistently
    columnHeights[shortestColumnIndex] += getElementHeight(child);
  });

  return (
    <div
      ref={containerRef}
      className={`w-full flex justify-center ${className}`}
      style={{ gap: `${gap}px` }}
    >
      {columnItems.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className="flex flex-col transition-all duration-200 ease-out"
          style={{ 
            gap: `${gap}px`, 
            width: `${minColumnWidth}px`,
            flexShrink: 0,
            transform: 'translateZ(0)' // Force hardware acceleration
          }}
        >
          {column}
        </div>
      ))}
    </div>
  );
}
