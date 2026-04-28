import React from 'react'
import Image from 'next/image'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const StackLogos: React.FC<{ logos?: string[]; size: number }> = ({
  logos,
  size,
}) => {
  if (!logos || logos.length < 1) return null
  return (
    <>
      {logos.map((key: string) => (
        <Tooltip key={key}>
          <TooltipTrigger asChild>
            <span
              tabIndex={0}
              aria-label={key}
              className="inline-flex p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              <Image
                src={`/assets/logos/${key}-logo.png`}
                alt={key}
                height={size}
                width={size}
                sizes="100vw"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </span>
          </TooltipTrigger>
          <TooltipContent>{key}</TooltipContent>
        </Tooltip>
      ))}
    </>
  )
}

export default StackLogos
