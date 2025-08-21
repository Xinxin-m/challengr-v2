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
  const [columns, setColumns] = useState(2);
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

    updateColumns();
    
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
      // This is a simplification - in a real scenario, you might need to
      // measure actual rendered heights or use a more sophisticated heuristic
      return Number(child.props.height || 100); // Fallback height
    }
    return 100; // Default height if no height prop
  };

  // Distribute children to columns to balance heights
  childrenArray.forEach((child) => {
    const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
    columnItems[shortestColumnIndex].push(child);
    columnHeights[shortestColumnIndex] += getElementHeight(child) + gap;
  });

  return (
    <div
      ref={containerRef}
      className={`flex justify-center ${className}`}
      style={{ gap: `${gap}px` }}
    >
      {columnItems.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className="flex flex-col transition-all duration-200 ease-out"
          style={{ 
            gap: `${gap}px`, 
            flex: `0 0 ${minColumnWidth}px`,
            maxWidth: `${minColumnWidth}px`,
            transform: 'translateZ(0)' // Force hardware acceleration
          }}
        >
          {column}
        </div>
      ))}
    </div>
  );
}
