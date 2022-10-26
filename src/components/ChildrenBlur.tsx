import React, { ReactNode, useCallback } from 'react'

interface IChildrenBlur {
  children: ReactNode
  onBlur: () => void
}

const ChildrenBlur = ({ children, onBlur, ...props }: IChildrenBlur): JSX.Element => {
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLDivElement, Element>) => {
      const currentTarget = e.currentTarget
      requestAnimationFrame(() => {
        if (!currentTarget.contains(document.activeElement)) onBlur()
      })
    },
    [onBlur]
  )

  return (
    <div {...props} onBlur={(e) => handleBlur(e)}>
      {children}
    </div>
  )
}

export default ChildrenBlur
