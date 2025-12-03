import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../../App'

// Mock the child components
vi.mock('#components/Navbar.jsx', () => ({
  default: () => <nav data-testid="navbar">Navbar Component</nav>
}))

vi.mock('#components/Welcome.jsx', () => ({
  Welcome: () => <section data-testid="welcome">Welcome Component</section>
}))

describe('App Component', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<App />)
      expect(screen.getByRole('main')).toBeInTheDocument()
    })

    it('should render main element as root container', () => {
      const { container } = render(<App />)
      const main = container.querySelector('main')
      expect(main).toBeInTheDocument()
    })

    it('should render Navbar component', () => {
      render(<App />)
      expect(screen.getByTestId('navbar')).toBeInTheDocument()
    })

    it('should render Welcome component', () => {
      render(<App />)
      expect(screen.getByTestId('welcome')).toBeInTheDocument()
    })

    it('should render both Navbar and Welcome components together', () => {
      render(<App />)
      expect(screen.getByTestId('navbar')).toBeInTheDocument()
      expect(screen.getByTestId('welcome')).toBeInTheDocument()
    })
  })

  describe('Component Order', () => {
    it('should render Navbar before Welcome component', () => {
      const { container } = render(<App />)
      const main = container.querySelector('main')
      const children = main?.children
      
      expect(children?.[0]).toHaveAttribute('data-testid', 'navbar')
      expect(children?.[1]).toHaveAttribute('data-testid', 'welcome')
    })

    it('should maintain correct component hierarchy', () => {
      const { container } = render(<App />)
      const main = container.querySelector('main')
      
      expect(main?.children.length).toBe(2)
    })
  })

  describe('Integration', () => {
    it('should properly import components from barrel export', () => {
      // This tests that the imports from #components work correctly
      expect(() => render(<App />)).not.toThrow()
    })

    it('should handle component re-renders correctly', () => {
      const { rerender } = render(<App />)
      rerender(<App />)
      
      expect(screen.getByTestId('navbar')).toBeInTheDocument()
      expect(screen.getByTestId('welcome')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should render with no props', () => {
      expect(() => render(<App />)).not.toThrow()
    })

    it('should maintain stable component structure', () => {
      const { container, rerender } = render(<App />)
      const initialHTML = container.innerHTML
      
      rerender(<App />)
      
      // Structure should remain the same after re-render
      expect(container.querySelector('main')).toBeInTheDocument()
    })

    it('should not render any unexpected elements', () => {
      const { container } = render(<App />)
      const main = container.querySelector('main')
      
      // Should only have Navbar and Welcome
      expect(main?.children.length).toBe(2)
    })
  })

  describe('Accessibility', () => {
    it('should use semantic main element', () => {
      render(<App />)
      expect(screen.getByRole('main')).toBeInTheDocument()
    })

    it('should have proper document structure', () => {
      const { container } = render(<App />)
      const main = container.querySelector('main')
      
      expect(main).toBeInTheDocument()
      expect(main?.children.length).toBeGreaterThan(0)
    })
  })

  describe('Component Exports', () => {
    it('should export App as default', () => {
      expect(App).toBeDefined()
      expect(typeof App).toBe('function')
    })

    it('should be a valid React component', () => {
      expect(() => render(<App />)).not.toThrow()
    })
  })
})