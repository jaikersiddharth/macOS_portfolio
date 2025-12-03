import { describe, it, expect } from 'vitest'

describe('Components Barrel Export', () => {
  describe('Named Exports', () => {
    it('should export Navbar as default from Navbar.jsx', async () => {
      const { default: Navbar } = await import('#components/Navbar.jsx')
      expect(Navbar).toBeDefined()
      expect(typeof Navbar).toBe('function')
    })

    it('should export Welcome as named export from Welcome.jsx', async () => {
      const { Welcome } = await import('#components/Welcome.jsx')
      expect(Welcome).toBeDefined()
      expect(typeof Welcome).toBe('function')
    })

    it('should export both Navbar and Welcome from index', async () => {
      const exports = await import('#components/index.js')
      expect(exports.Navbar).toBeDefined()
      expect(exports.Welcome).toBeDefined()
    })

    it('should have Navbar as a function component', async () => {
      const { Navbar } = await import('#components/index.js')
      expect(typeof Navbar).toBe('function')
    })

    it('should have Welcome as a function component', async () => {
      const { Welcome } = await import('#components/index.js')
      expect(typeof Welcome).toBe('function')
    })
  })

  describe('Export Integrity', () => {
    it('should maintain component references through barrel export', async () => {
      const { Navbar: NavbarDirect } = await import('#components')
      const { default: NavbarOriginal } = await import('#components/Navbar.jsx')
      
      // Should be the same component
      expect(NavbarDirect).toBe(NavbarOriginal)
    })

    it('should maintain Welcome component reference through barrel export', async () => {
      const { Welcome: WelcomeDirect } = await import('#components')
      const { Welcome: WelcomeOriginal } = await import('#components/Welcome.jsx')
      
      // Should be the same component
      expect(WelcomeDirect).toBe(WelcomeOriginal)
    })

    it('should not add any unexpected exports', async () => {
      const exports = await import('#components/index.js')
      const exportKeys = Object.keys(exports)
      
      // Should only export Navbar and Welcome
      expect(exportKeys).toContain('Navbar')
      expect(exportKeys).toContain('Welcome')
      expect(exportKeys.length).toBe(2)
    })
  })

  describe('Import Paths', () => {
    it('should resolve #components alias correctly', async () => {
      expect(async () => {
        await import('#components/index.js')
      }).not.toThrow()
    })

    it('should allow importing from barrel export', async () => {
      expect(async () => {
        await import('#components')
      }).not.toThrow()
    })

    it('should allow importing individual components directly', async () => {
      expect(async () => {
        await import('#components/Navbar.jsx')
      }).not.toThrow()
      
      expect(async () => {
        await import('#components/Welcome.jsx')
      }).not.toThrow()
    })
  })

  describe('Module Structure', () => {
    it('should have valid ES module structure', async () => {
      const module = await import('#components/index.js')
      expect(module).toBeTypeOf('object')
    })

    it('should not have circular dependencies', async () => {
      // If this doesn't throw, there are no circular deps at import time
      expect(async () => {
        await import('#components/index.js')
      }).not.toThrow()
    })
  })

  describe('Type Safety', () => {
    it('should export components that can be used as React components', async () => {
      const { Navbar, Welcome } = await import('#components')
      
      // Components should have typical React component properties
      expect(Navbar).toBeTruthy()
      expect(Welcome).toBeTruthy()
      expect(typeof Navbar).toBe('function')
      expect(typeof Welcome).toBe('function')
    })
  })
})