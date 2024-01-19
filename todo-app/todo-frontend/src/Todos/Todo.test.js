import React from 'react'
import '@testing-library/jest-dom'
import '@testing-library/react'
import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('Todo component renders todo correctly', () => {
    const NotDoneTodo = {
        text: 'Test todo application',
        done: false
    }

    const DoneTodo = {
        text: 'Typescript practices',
        done: true
    }
    
    const mockHandler = jest.fn()

    render(<Todo todo={NotDoneTodo} delClick={mockHandler} completeClick={mockHandler} />)
    const notDoneText = screen.getByText('Test todo application')
    const notDoneStatus = screen.getByText('This todo is not done')
    const notDoneDeleteButton = screen.getByText('Delete')
    const notDoneCompleteButton = screen.getByText('Set as done')
    expect(notDoneText).toBeDefined()
    expect(notDoneStatus).toBeDefined()
    expect(notDoneDeleteButton).toBeDefined()
    expect(notDoneCompleteButton).toBeDefined()

    const { container } = render(<Todo todo={DoneTodo} delClick={mockHandler} completeClick={mockHandler} />)
    const div = container.querySelector('.todo')
    expect(div).toHaveTextContent(
        'Typescript practices' && 'This todo is done' && 'Delete'
    )
    expect(div).not.toHaveTextContent(
        'Set as done'
    )
})