import React from 'react'
import Button from './Button'

describe('Button', () => {
  it('primary button', () => {
    cy.mount(
      <>
        <Button type={'primary'} label={'primary'} />
        <Button type={'secondary'} label={'secondary'} />
      </>,
    )
  })
})
