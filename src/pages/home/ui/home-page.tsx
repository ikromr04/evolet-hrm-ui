import { useHeader } from '@/shared/lib';
import { JSX, useEffect } from 'react';
import { SectionCards } from './section-cards';
import { ChartAreaInteractive } from './chart-area-interactive';
import { DataTable } from './data-table';
import data from '../model/data.json';
import { ChartPieLabel } from './chart-pie-label';
import { ChartRadarDots } from './chart-radar-dots';
import { ChartLineInteractive } from './chart-line-interactive';

function HomePage(): JSX.Element {
  const { setTitle } = useHeader();

  useEffect(() => {
    setTitle('Главная');
  }, [setTitle]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
            <ChartPieLabel />
            <ChartRadarDots />
            <div className="col-span-2">
              <ChartLineInteractive />
            </div>
          </div>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
}

export { HomePage };
