'use client'
import { PORTFOLIOS } from './datasource'
import { PortfolioCard } from './portfolios-card'

export function Portfolios() {
  return (
    <div className='flex flex-col gap-8'>
      {PORTFOLIOS.map((portfolio) => (
        <PortfolioCard key={portfolio.slug} portfolio={portfolio} />
      ))}
    </div>
  )
}
