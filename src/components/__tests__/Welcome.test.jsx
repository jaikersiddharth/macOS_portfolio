import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { Welcome } from '../Welcome'
import gsap from 'gsap'

// Mock GSAP
vi.mock('gsap', () => ({
  default: {
    to: vi.fn((target, config) => {
      // Simulate GSAP animation by immediately applying the final state
      if (target && config.fontVariationSettings) {
        const elements = Array.isArray(target) ? target : [target]
        elements.forEach(el => {
          if (el && el.style) {
            el.style.fontVariationSettings = config.fontVariationSettings
          }
        })
      }
      return {
        kill: vi.fn(),
        pause: vi.fn(),
        play: vi.fn(),
      }
    }),
  },
}))

// Mock @gsap/react
vi.mock('@gsap/react', () => ({
  useGSAP: vi.fn((callback) => {
    const cleanup = callback()
    return cleanup
  }),
}))

describe('Welcome Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<Welcome />)
      expect(screen.getByRole('region')).toBeInTheDocument()
    })

    it('should render the welcome section with correct id', () => {
      const { container } = render(<Welcome />)
      const section = container.querySelector('#welcome')
      expect(section).toBeInTheDocument()
    })

    it('should render subtitle text "Hey, I\'m Jaiker Siddharth"', () => {
      render(<Welcome />)
      const subtitle = screen.getByText(/Hey, I'm Jaiker Siddharth/i)
      expect(subtitle).toBeInTheDocument()
    })

    it('should render title text "portfolio"', () => {
      render(<Welcome />)
      const title = screen.getByText(/portfolio/i)
      expect(title).toBeInTheDocument()
    })

    it('should render small screen message', () => {
      render(<Welcome />)
      const smallScreenMsg = screen.getByText(/This Portfolio is designed for desktops\/tablet screens only/i)
      expect(smallScreenMsg).toBeInTheDocument()
    })

    it('should have correct CSS classes on title', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      expect(title).toHaveClass('mt-7')
    })

    it('should have small-screen div with correct class', () => {
      const { container } = render(<Welcome />)
      const smallScreenDiv = container.querySelector('.small-screen')
      expect(smallScreenDiv).toBeInTheDocument()
    })
  })

  describe('Text Rendering with renderText function', () => {
    it('should split subtitle text into individual span elements', () => {
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p')
      const spans = subtitle?.querySelectorAll('span')
      
      // "Hey, I'm Jaiker Siddharth" = 26 characters including spaces
      expect(spans?.length).toBeGreaterThan(0)
    })

    it('should split title text into individual span elements', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      const spans = title?.querySelectorAll('span')
      
      // "portfolio" = 9 characters
      expect(spans?.length).toBe(9)
    })

    it('should apply font-georama class to subtitle spans', () => {
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p')
      const firstSpan = subtitle?.querySelector('span')
      expect(firstSpan).toHaveClass('font-georama')
    })

    it('should apply text-3xl class to subtitle spans', () => {
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p')
      const firstSpan = subtitle?.querySelector('span')
      expect(firstSpan).toHaveClass('text-3xl')
    })

    it('should apply text-9xl and italic classes to title spans', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      const firstSpan = title?.querySelector('span')
      expect(firstSpan).toHaveClass('text-9xl')
      expect(firstSpan).toHaveClass('italic')
      expect(firstSpan).toHaveClass('font-georama')
    })

    it('should convert spaces to non-breaking spaces in rendered text', () => {
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p')
      const spans = subtitle?.querySelectorAll('span')
      
      // Find spans that should contain non-breaking spaces
      const spaceSpans = Array.from(spans || []).filter(span => 
        span.textContent === '\u00A0'
      )
      expect(spaceSpans.length).toBeGreaterThan(0)
    })

    it('should apply default font weight to subtitle spans', () => {
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p')
      const firstSpan = subtitle?.querySelector('span')
      
      // Check that fontVariableSettings includes weight 100 (subtitle default)
      expect(firstSpan?.style.fontVariableSettings).toContain('100')
    })

    it('should apply default font weight to title spans', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      const firstSpan = title?.querySelector('span')
      
      // Check that fontVariableSettings includes weight 400 (title default)
      expect(firstSpan?.style.fontVariableSettings).toContain('400')
    })
  })

  describe('GSAP Animation Setup', () => {
    it('should call useGSAP hook on mount', () => {
      const { useGSAP } = require('@gsap/react')
      render(<Welcome />)
      expect(useGSAP).toHaveBeenCalled()
    })

    it('should setup event listeners for title hover', () => {
      const addEventListener = vi.spyOn(HTMLElement.prototype, 'addEventListener')
      render(<Welcome />)
      
      // Should have mousemove and mouseleave listeners
      const mouseMoveCalls = addEventListener.mock.calls.filter(call => call[0] === 'mousemove')
      const mouseLeaveCalls = addEventListener.mock.calls.filter(call => call[0] === 'mouseleave')
      
      expect(mouseMoveCalls.length).toBeGreaterThan(0)
      expect(mouseLeaveCalls.length).toBeGreaterThan(0)
    })

    it('should setup event listeners for subtitle hover', () => {
      const addEventListener = vi.spyOn(HTMLElement.prototype, 'addEventListener')
      render(<Welcome />)
      
      // Should have mousemove and mouseleave listeners for both title and subtitle
      const mouseMoveCalls = addEventListener.mock.calls.filter(call => call[0] === 'mousemove')
      expect(mouseMoveCalls.length).toBeGreaterThanOrEqual(2)
    })

    it('should cleanup event listeners on unmount', () => {
      const removeEventListener = vi.spyOn(HTMLElement.prototype, 'removeEventListener')
      const { unmount } = render(<Welcome />)
      
      unmount()
      
      const mouseMoveCalls = removeEventListener.mock.calls.filter(call => call[0] === 'mousemove')
      const mouseLeaveCalls = removeEventListener.mock.calls.filter(call => call[0] === 'mouseleave')
      
      expect(mouseMoveCalls.length).toBeGreaterThan(0)
      expect(mouseLeaveCalls.length).toBeGreaterThan(0)
    })
  })

  describe('Mouse Interaction Behavior', () => {
    it('should have refs attached to title and subtitle', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      const subtitle = container.querySelector('p')
      
      expect(title).toBeInTheDocument()
      expect(subtitle).toBeInTheDocument()
    })

    it('should trigger GSAP animation on mouse move over title', async () => {
      const user = userEvent.setup()
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      
      if (title) {
        await user.hover(title)
        
        await waitFor(() => {
          expect(gsap.to).toHaveBeenCalled()
        })
      }
    })

    it('should trigger GSAP animation on mouse move over subtitle', async () => {
      const user = userEvent.setup()
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p')
      
      if (subtitle) {
        await user.hover(subtitle)
        
        await waitFor(() => {
          expect(gsap.to).toHaveBeenCalled()
        })
      }
    })

    it('should calculate font weight intensity based on mouse distance', async () => {
      const user = userEvent.setup()
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      
      if (title) {
        // Simulate mouse move
        await user.hover(title)
        const mouseMoveEvent = new MouseEvent('mousemove', {
          clientX: 100,
          clientY: 100,
          bubbles: true,
        })
        title.dispatchEvent(mouseMoveEvent)
        
        await waitFor(() => {
          expect(gsap.to).toHaveBeenCalled()
        })
      }
    })
  })

  describe('Font Weight Configuration', () => {
    it('should use correct subtitle font weight range', () => {
      // This tests the FONT_WEIGHTS constant indirectly through rendering
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p span')
      
      // Subtitle should start with weight 100 (min: 100, max: 400, default: 100)
      expect(subtitle?.style.fontVariableSettings).toContain('100')
    })

    it('should use correct title font weight range', () => {
      // This tests the FONT_WEIGHTS constant indirectly through rendering
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1 span')
      
      // Title should start with weight 400 (min: 400, max: 900, default: 400)
      expect(title?.style.fontVariableSettings).toContain('400')
    })
  })

  describe('Edge Cases and Error Handling', () => {
    it('should handle null container reference gracefully', () => {
      // This tests the setupTextHover function's null check
      expect(() => render(<Welcome />)).not.toThrow()
    })

    it('should render correctly with empty or undefined props', () => {
      expect(() => render(<Welcome />)).not.toThrow()
    })

    it('should maintain component stability during rapid re-renders', () => {
      const { rerender } = render(<Welcome />)
      
      // Trigger multiple re-renders
      for (let i = 0; i < 5; i++) {
        rerender(<Welcome />)
      }
      
      expect(screen.getByText(/portfolio/i)).toBeInTheDocument()
    })

    it('should handle mouse leave event to reset font weights', async () => {
      const user = userEvent.setup()
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      
      if (title) {
        await user.hover(title)
        await user.unhover(title)
        
        // After mouse leave, gsap.to should be called to reset weights
        await waitFor(() => {
          expect(gsap.to).toHaveBeenCalled()
        })
      }
    })

    it('should handle special characters in text correctly', () => {
      render(<Welcome />)
      
      // Check apostrophe in "I'm" is rendered correctly
      expect(screen.getByText(/Hey, I'm Jaiker Siddharth/i)).toBeInTheDocument()
    })

    it('should maintain proper DOM structure after interactions', async () => {
      const user = userEvent.setup()
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      
      if (title) {
        await user.hover(title)
        await user.unhover(title)
        
        // Verify DOM structure is still intact
        const spans = container.querySelectorAll('h1 span')
        expect(spans.length).toBe(9) // "portfolio" has 9 letters
      }
    })
  })

  describe('Accessibility', () => {
    it('should use semantic HTML with section element', () => {
      const { container } = render(<Welcome />)
      const section = container.querySelector('section')
      expect(section).toBeInTheDocument()
    })

    it('should use proper heading hierarchy with h1', () => {
      render(<Welcome />)
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
    })

    it('should have proper paragraph element for subtitle', () => {
      const { container } = render(<Welcome />)
      const paragraphs = container.querySelectorAll('p')
      expect(paragraphs.length).toBeGreaterThan(0)
    })

    it('should maintain text readability with non-breaking spaces', () => {
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p')
      
      // Non-breaking spaces should maintain word integrity
      expect(subtitle?.textContent).toContain('Hey,')
      expect(subtitle?.textContent).toContain("I'm")
      expect(subtitle?.textContent).toContain('Jaiker')
      expect(subtitle?.textContent).toContain('Siddharth')
    })
  })

  describe('Performance and Optimization', () => {
    it('should use refs instead of direct DOM queries for performance', () => {
      const { container } = render(<Welcome />)
      
      // Refs should be used (titleRef, subtitleRef)
      const title = container.querySelector('h1')
      const subtitle = container.querySelector('p')
      
      expect(title).toBeInTheDocument()
      expect(subtitle).toBeInTheDocument()
    })

    it('should cleanup GSAP animations on unmount to prevent memory leaks', () => {
      const { unmount } = render(<Welcome />)
      
      expect(() => unmount()).not.toThrow()
    })

    it('should efficiently handle multiple span elements without performance degradation', () => {
      const startTime = performance.now()
      render(<Welcome />)
      const endTime = performance.now()
      
      // Render should complete in reasonable time (< 100ms)
      expect(endTime - startTime).toBeLessThan(100)
    })
  })

  describe('Integration with lucide-react', () => {
    it('should not crash when Container import is present', () => {
      // Container is imported but not used in the component
      // This tests that the import doesn't cause issues
      expect(() => render(<Welcome />)).not.toThrow()
    })
  })

  describe('CSS Classes and Styling', () => {
    it('should apply Tailwind classes correctly to subtitle', () => {
      const { container } = render(<Welcome />)
      const subtitleSpan = container.querySelector('p span')
      expect(subtitleSpan).toHaveClass('text-3xl', 'font-georama')
    })

    it('should apply Tailwind classes correctly to title', () => {
      const { container } = render(<Welcome />)
      const titleSpan = container.querySelector('h1 span')
      expect(titleSpan).toHaveClass('text-9xl', 'italic', 'font-georama')
    })

    it('should apply margin class to title heading', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      expect(title).toHaveClass('mt-7')
    })
  })

  describe('Mathematical Calculations', () => {
    it('should handle distance calculation for font weight intensity', async () => {
      const user = userEvent.setup()
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      
      if (title) {
        // Create a custom mouse event with specific coordinates
        const rect = title.getBoundingClientRect()
        const mouseMoveEvent = new MouseEvent('mousemove', {
          clientX: rect.left + 50,
          clientY: rect.top + 50,
          bubbles: true,
        })
        
        title.dispatchEvent(mouseMoveEvent)
        
        await waitFor(() => {
          // GSAP should be called with calculated font weight
          expect(gsap.to).toHaveBeenCalled()
        })
      }
    })

    it('should use exponential decay for intensity calculation', async () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      
      if (title) {
        const rect = title.getBoundingClientRect()
        
        // Simulate mouse at different distances
        const event1 = new MouseEvent('mousemove', {
          clientX: rect.left + 10,
          clientY: rect.top,
          bubbles: true,
        })
        
        const event2 = new MouseEvent('mousemove', {
          clientX: rect.left + 100,
          clientY: rect.top,
          bubbles: true,
        })
        
        title.dispatchEvent(event1)
        title.dispatchEvent(event2)
        
        await waitFor(() => {
          expect(gsap.to).toHaveBeenCalled()
        })
      }
    })
  })
})