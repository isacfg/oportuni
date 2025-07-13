import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: string
  email: string
  fullName: string
  avatarUrl?: string
  emailVerified: boolean
}

export interface AuthToken {
  type: 'Bearer'
  value: string
  expiresAt: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(false)

  // Computed properties
  const isAuthenticated = computed(() => !!user.value && !!token.value)
  const isGuest = computed(() => !isAuthenticated.value)

  // Initialize from localStorage
  const initializeAuth = () => {
    const savedToken = localStorage.getItem('auth_token')
    const savedUser = localStorage.getItem('auth_user')

    if (savedToken && savedUser) {
      token.value = savedToken
      user.value = JSON.parse(savedUser)
    }
  }

  // Login with Google OAuth
  const loginWithGoogle = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3333'
    window.location.href = `${backendUrl}/auth/google/redirect`
  }

  // Handle OAuth callback (call this when returning from OAuth)
  const handleOAuthCallback = async (callbackUrl: string) => {
    try {
      isLoading.value = true

      const response = await fetch(callbackUrl, {
        method: 'GET',
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Authentication failed')
      }

      const data = await response.json()

      if (data.token && data.user) {
        setAuth(data.user, data.token.value)
        return { success: true, user: data.user }
      } else {
        throw new Error('Invalid response format')
      }
    } catch (error) {
      console.error('OAuth callback error:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Authentication failed' }
    } finally {
      isLoading.value = false
    }
  }

  // Set authentication data
  const setAuth = (userData: User, authToken: string) => {
    user.value = userData
    token.value = authToken

    // Save to localStorage
    localStorage.setItem('auth_token', authToken)
    localStorage.setItem('auth_user', JSON.stringify(userData))
  }

  // Get current user from backend
  const fetchUser = async () => {
    if (!token.value) return

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3333'
      const response = await fetch(`${backendUrl}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.user) {
          user.value = data.user
          localStorage.setItem('auth_user', JSON.stringify(data.user))
        }
      } else if (response.status === 401) {
        // Token expired or invalid
        logout()
      }
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }

  // Logout
  const logout = async () => {
    try {
      if (token.value) {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3333'
        await fetch(`${backendUrl}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token.value}`,
            'Content-Type': 'application/json',
          }
        })
      }
    } catch (error) {
      console.error('Error logging out:', error)
    } finally {
      // Clear state regardless of API call success
      user.value = null
      token.value = null
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
    }
  }

  // Check if token is expired
  const isTokenExpired = (tokenData: AuthToken) => {
    if (!tokenData.expiresAt) return false
    return new Date(tokenData.expiresAt) < new Date()
  }

  return {
    // State
    user,
    token,
    isLoading,

    // Getters
    isAuthenticated,
    isGuest,

    // Actions
    initializeAuth,
    loginWithGoogle,
    handleOAuthCallback,
    setAuth,
    fetchUser,
    logout,
    isTokenExpired
  }
})
